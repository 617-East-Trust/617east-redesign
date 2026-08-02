import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";

// ─── All static routes for SSG pre-rendering ─────────────────────────────────
export const SSG_ROUTES = [
  "/",
  "/services",
  "/services/llc-formation-north-carolina",
  "/services/sba-loans-north-carolina",
  "/services/credit-repair-north-carolina",
  "/services/bookkeeping-north-carolina",
  "/services/fractional-cfo-north-carolina",
  "/services/web-design-seo-north-carolina",
  "/how-it-works",
  "/about",
  "/contact",
  "/blog",
  "/blog/how-to-form-an-llc-in-north-carolina",
  "/blog/sba-7a-vs-504-loans-north-carolina",
  "/blog/credit-repair-timeline-north-carolina",
  "/blog/fractional-cfo-vs-bookkeeper-north-carolina",
  "/blog/how-to-open-a-business-bank-account-north-carolina",
  "/blog/when-does-a-small-business-need-a-fractional-cfo-north-carolina",
  "/blog/bookkeeping-vs-accounting-north-carolina",
  "/privacy",
  "/terms",
];

const plugins = [react(), tailwindcss(), jsxLocPlugin()];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false, // Will find next available port if 3000 is busy
    host: true,
    allowedHosts: ["localhost", "127.0.0.1"],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
