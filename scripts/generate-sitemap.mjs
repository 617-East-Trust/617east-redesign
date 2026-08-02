#!/usr/bin/env node
/**
 * 617 East Trust — SSG: Route-based sitemap.xml generator
 *
 * Generates sitemap.xml from the ROUTES array in ssg.mjs.
 * Run after `pnpm build` to keep the sitemap in sync.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "../dist/public");

const BASE = "https://617east.com";

function priorityForPath(p) {
  if (p === "/") return "1.0";
  if (p === "/services") return "0.9";
  if (p === "/about") return "0.8";
  if (p === "/contact") return "0.8";
  if (p === "/how-it-works") return "0.8";
  if (p === "/locations") return "0.8";
  if (p.startsWith("/locations/")) return "0.75";
  if (p === "/blog") return "0.7";
  if (p.startsWith("/services/")) return "0.8";
  if (p.startsWith("/blog/")) return "0.7";
  if (p === "/privacy" || p === "/terms" || p === "/consumer-rights") return "0.3";
  return "0.5";
}

function changefreqForPath(p) {
  if (p === "/") return "weekly";
  if (p === "/blog") return "weekly";
  if (p.startsWith("/blog/")) return "monthly";
  if (p.startsWith("/services/")) return "monthly";
  return "monthly";
}

// Import routes from ssg.mjs by reading its ROUTES export
import("../scripts/ssg.mjs").then((mod) => {
  const routes = mod.ROUTES || [];

  const urls = routes.map(
    (r) => `  <url>
    <loc>${BASE}${r.path === "/" ? "" : r.path}</loc>
    <priority>${priorityForPath(r.path)}</priority>
    <changefreq>${changefreqForPath(r.path)}</changefreq>
  </url>`,
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  const outPath = path.join(DIST, "sitemap.xml");
  fs.writeFileSync(outPath, sitemap, "utf-8");
  console.log(`✅ sitemap.xml → ${outPath} (${routes.length} URLs)`);
}).catch((err) => {
  console.error("❌ Failed to generate sitemap:", err.message);
  process.exit(1);
});