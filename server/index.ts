import express from "express";
import { createServer } from "http";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { injectSeoIntoHtml, findRoute } from "./seo.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read analytics configuration from environment
const ANALYTICS_ENDPOINT = process.env.ANALYTICS_ENDPOINT || "";
const ANALYTICS_WEBSITE_ID = process.env.ANALYTICS_WEBSITE_ID || "";
const ANALYTICS_ENABLED = !!(ANALYTICS_ENDPOINT && ANALYTICS_WEBSITE_ID);

function rateLimitWindow(ms: number, max: number) {
  const hits = new Map<string, number[]>();
  return (ip: string): boolean => {
    const now = Date.now();
    const window = hits.get(ip) ?? [];
    const fresh = window.filter((t) => now - t < ms);
    if (fresh.length >= max) return false;
    fresh.push(now);
    hits.set(ip, fresh);
    return true;
  };
}
const contactRate = rateLimitWindow(60_000, 3); // 3 POSTs/min per IP

async function startServer() {
  const app = express();
  const server = createServer(app);

  // ── Security headers ─────────────────────────────────────
  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "0");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload"
    );
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");
    // CSP: allow self, Calendly widget, Google Fonts, images media and Umami analytics
    res.setHeader(
      "Content-Security-Policy",
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' https://assets.calendly.com https://fonts.googleapis.com https://www.googletagmanager.com https://www.clarity.ms https://*.umami.is https://analytics.617east.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://assets.calendly.com",
        "img-src 'self' data: blob: https://*.clarity.ms https://www.google-analytics.com https://analytics.617east.com",
        "connect-src 'self' https://n8n.617east.com https://*.clarity.ms https://www.google-analytics.com https://analytics.617east.com https://calendly.com",
        "frame-src 'self' https://calendly.com https://assets.calendly.com",
        "font-src 'self' https://fonts.gstatic.com",
        "manifest-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
      ].join("; ")
    );
    next();
  });

  // Resolve static path
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  // Cache the base index.html template in memory (read once)
  let indexTemplate: string | null = null;
  const indexHtmlPath = path.join(staticPath, "index.html");

  function getIndexTemplate(): string {
    if (!indexTemplate) {
      indexTemplate = fs.readFileSync(indexHtmlPath, "utf-8");
    }
    return indexTemplate;
  }

  // Analytics proxy: serves the Umami script from the configured endpoint
  // and replaces the placeholder website ID on the fly.
  app.get("/__analytics__/umami", async (req, res) => {
    if (!ANALYTICS_ENABLED) {
      res.status(204).end();
      return;
    }

    const scriptUrl = `${ANALYTICS_ENDPOINT.replace(/\/+$/, "")}/umami`;
    try {
      const scriptResp = await fetch(scriptUrl, {
        headers: { "User-Agent": "617east-server/1.0" },
      });

      if (!scriptResp.ok) {
        res.status(502).type("text").send("/* analytics unavailable */");
        return;
      }

      let script = await scriptResp.text();
      // Replace the placeholder website ID with the real one
      script = script.replace(/data-website-id="([^"]*)"/g, `data-website-id="${ANALYTICS_WEBSITE_ID}"`);

      res
        .type("application/javascript")
        .set("Cache-Control", "public, max-age=3600")
        .send(script);
    } catch {
      res.status(502).type("text").send("/* analytics unavailable */");
    }
  });

  // Serve static files (JS, CSS, images, fonts)
  app.use(express.static(staticPath, { index: false }));
  // Parse JSON bodies for contact endpoint
  app.use(express.json());

  // Handle client-side routing — serve index.html with injected SEO for all routes
  // Contact form submission — validates input, rate-limits, proxies to n8n
  app.post("/api/contact", async (req, res) => {
    const ip = req.ip || req.socket.remoteAddress || "unknown";
    if (!contactRate(ip)) {
      return res.status(429).json({ error: "Too many requests. Please wait a moment." });
    }

    const { name, email, phone, service, message } = req.body || {};

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return res.status(400).json({ error: "Name is required (min 2 characters)." });
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "A valid email address is required." });
    }
    if (phone && typeof phone === "string" && phone.replace(/\D/g, "").length < 7) {
      return res.status(400).json({ error: "Please enter a valid phone number (or leave blank)." });
    }
    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return res.status(400).json({ error: "Message is required (min 10 characters)." });
    }
    if (!service || typeof service !== "string") {
      return res.status(400).json({ error: "Please select a service interest." });
    }

    // Honeypot check: reject if a hidden field was filled (bot)
    if (req.body.website) {
      return res.status(200).json({ ok: true }); // pretend success
    }

    try {
      const n8nResp = await fetch("https://n8n.617east.com/webhook/617east-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone ? phone.trim() : "",
          service: service.trim(),
          message: message.trim(),
          source: "617east.com",
          submitted_at: new Date().toISOString(),
        }),
      });

      if (n8nResp.ok) {
        res.status(200).json({ ok: true });
      } else {
        console.error("n8n webhook error:", n8nResp.status, await n8nResp.text().catch(() => ""));
        res.status(502).json({ error: "Failed to send message. Please call (910) 315-1800." });
      }
    } catch (err) {
      console.error("n8n webhook fetch failed:", err);
      res.status(502).json({ error: "Failed to send message. Please call (910) 315-1800." });
    }
  });

  app.get("*", (req, res) => {
    const route = findRoute(req.path);
    const html = injectSeoIntoHtml(getIndexTemplate(), route, {
      analyticsEnabled: ANALYTICS_ENABLED,
      analyticsEndpoint: ANALYTICS_ENDPOINT,
      analyticsWebsiteId: ANALYTICS_WEBSITE_ID,
    });
    res.type("html").send(html);
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    if (ANALYTICS_ENABLED) {
      console.log(`Analytics endpoint: ${ANALYTICS_ENDPOINT}`);
    } else {
      console.log("Analytics: disabled (set ANALYTICS_ENDPOINT and ANALYTICS_WEBSITE_ID to enable)");
    }
  });
}

startServer().catch(console.error);