import express from "express";
import { createServer } from "http";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { injectSeoIntoHtml, findRoute } from "./seo.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// ── Environment config ──────────────────────────────────────────────────────────
const ANALYTICS_ENDPOINT    = process.env.ANALYTICS_ENDPOINT    || "";
const ANALYTICS_WEBSITE_ID  = process.env.ANALYTICS_WEBSITE_ID  || "";
const GA4_ID                = process.env.GA4_ID                || "";
const CLARITY_ID            = process.env.CLARITY_ID            || "";
const CONSENT_RECORDER_URL  = process.env.CONSENT_RECORDER_URL  || "";
const ANALYTICS_ENABLED     = !!(ANALYTICS_ENDPOINT && ANALYTICS_WEBSITE_ID);

async function startServer() {
  const app    = express();
  const server = createServer(app);

  // Resolve static path
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  // Cache the base index.html template in memory
  let indexTemplate: string | null = null;
  const indexHtmlPath = path.join(staticPath, "index.html");

  function getIndexTemplate(): string {
    if (!indexTemplate) indexTemplate = fs.readFileSync(indexHtmlPath, "utf-8");
    return indexTemplate;
  }

  // ── Umami analytics proxy ────────────────────────────────────────────────────
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
      script = script.replace(
        /data-website-id="([^"]*)"/g,
        `data-website-id="${ANALYTICS_WEBSITE_ID}"`
      );
      res.type("application/javascript")
         .set("Cache-Control", "public, max-age=3600")
         .send(script);
    } catch {
      res.status(502).type("text").send("/* analytics unavailable */");
    }
  });

  // ── Consent event recorder (fire-and-forget webhook) ─────────────────────────
  // CookieConsent.tsx POSTs here on accept/decline so external dashboards can
  // log consent events without blocking the user's navigation.
  app.use(express.json({ limit: "8kb" }));
  app.post("/__analytics__/consent", async (req, res) => {
    if (!CONSENT_RECORDER_URL) {
      res.status(204).end();
      return;
    }
    try {
      fetch(CONSENT_RECORDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...req.body,
          receivedAt:   new Date().toISOString(),
          userAgent:    req.headers["user-agent"],
          forwardedFor: req.headers["x-forwarded-for"],
        }),
      }).catch(() => {});
      res.status(204).end();
    } catch {
      res.status(204).end();
    }
  });

  // ── Static assets ────────────────────────────────────────────────────────────
  app.use(express.static(staticPath, { index: false }));

  // ── Client-side routing with injected SEO + analytics ────────────────────────
  app.get("*", (req, res) => {
    const route = findRoute(req.path);
    const html  = injectSeoIntoHtml(getIndexTemplate(), route, {
      analyticsEnabled:   ANALYTICS_ENABLED,
      analyticsEndpoint:  ANALYTICS_ENDPOINT,
      analyticsWebsiteId: ANALYTICS_WEBSITE_ID,
      ga4Id:              GA4_ID,
      clarityId:          CLARITY_ID,
    });
    res.type("html").send(html);
  });

  const port = parseInt(process.env.PORT || "3000", 10);
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    if (ANALYTICS_ENABLED) {
      console.log(`Analytics: Umami → ${ANALYTICS_ENDPOINT} (id: ${ANALYTICS_WEBSITE_ID.slice(0, 8)}…)`);
    } else {
      console.log("Analytics: disabled (set ANALYTICS_ENDPOINT and ANALYTICS_WEBSITE_ID)");
    }
    if (GA4_ID)     console.log(`Analytics: GA4 ID  → ${GA4_ID.slice(0, 10)}… (consent-gated)`);
    if (CLARITY_ID) console.log(`Analytics: Clarity → ${CLARITY_ID.slice(0, 10)}… (consent-gated)`);
    if (CONSENT_RECORDER_URL) console.log(`Consent log: ${CONSENT_RECORDER_URL}`);
  });
}

startServer().catch(console.error);
