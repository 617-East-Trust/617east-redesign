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

async function startServer() {
  const app = express();
  const server = createServer(app);

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

  // Handle client-side routing — serve index.html with injected SEO for all routes
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