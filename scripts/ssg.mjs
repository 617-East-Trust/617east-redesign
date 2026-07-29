/**
 * 617 EAST TRUST — CUSTOM SSG POST-BUILD SCRIPT
 *
 * Runs AFTER `vite build` to pre-render each route to a unique HTML file.
 * Uses a headless Node.js environment with jsdom + React renderToString.
 *
 * Strategy:
 *   1. Read the Vite-built dist/public/index.html as the HTML shell
 *   2. For each route, inject the correct <title>, <meta description>,
 *      <link rel="canonical">, and <script type="application/ld+json"> tags
 *      directly into the shell using string replacement
 *   3. Write the result to dist/public/<route>/index.html
 *
 * This approach is reliable for React SPAs with wouter routing because:
 *   - It does not require server-side React rendering (no hydration mismatch risk)
 *   - It injects the SEO-critical head tags that Google needs for indexing
 *   - The JS bundle still handles all client-side interactivity
 *   - Each URL gets a unique HTML file with correct meta tags
 *
 * Acceptance criteria (per audit):
 *   curl -s https://617east.com/services/llc-formation-north-carolina | grep "<title>"
 *   → "LLC Formation North Carolina | 617 East Trust — $499 Total"
 *
 *   curl -s https://617east.com/services/llc-formation-north-carolina | grep "canonical"
 *   → https://617east.com/services/llc-formation-north-carolina
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "../dist/public");

// ─── Route SEO data ───────────────────────────────────────────────────────────
// Mirrors the data in client/src/data/services.ts and client/src/data/blog.ts
const ROUTES = [
  {
    path: "/",
    title: "617 East Trust | Business Formation & SBA Loans — NC",
    description: "617 East Trust — Business formation, SBA loans, credit repair, bookkeeping, and fractional CFO services in North Carolina. The advisor who tells you what not to do.",
    canonical: "https://617east.com/",
    schema: {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "617 East Trust",
      "url": "https://617east.com",
      "telephone": "+19103151800",
      "email": "info@617east.com",
      "address": { "@type": "PostalAddress", "addressLocality": "Sandhills", "addressRegion": "NC", "addressCountry": "US" },
      "areaServed": [
        { "@type": "City", "name": "Pinehurst", "addressRegion": "NC" },
        { "@type": "City", "name": "Southern Pines", "addressRegion": "NC" },
        { "@type": "City", "name": "Charlotte", "addressRegion": "NC" },
        { "@type": "City", "name": "Fayetteville", "addressRegion": "NC" },
        { "@type": "City", "name": "Raleigh", "addressRegion": "NC" }
      ]
    }
  },
  {
    path: "/services",
    title: "Business Services | 617 East Trust — North Carolina",
    description: "LLC formation, SBA loans, credit repair, bookkeeping, fractional CFO, and web design services in North Carolina. Six services. One advisor. No handoffs.",
    canonical: "https://617east.com/services",
  },
  {
    path: "/services/llc-formation-north-carolina",
    title: "LLC Formation North Carolina | 617 East Trust — $499 Total",
    description: "Form an LLC in North Carolina with registered agent, operating agreement, and EIN. $499 total including $125 state fee. We tell you what structure fits your situation.",
    canonical: "https://617east.com/services/llc-formation-north-carolina",
    schema: { "@context": "https://schema.org", "@type": "Service", "name": "LLC Formation in North Carolina", "provider": { "@type": "ProfessionalService", "name": "617 East Trust" }, "offers": { "@type": "Offer", "price": "499", "priceCurrency": "USD" } }
  },
  {
    path: "/services/sba-loans-north-carolina",
    title: "SBA Loan Consultant North Carolina | 617 East Trust",
    description: "SBA 7(a) and 504 loan consulting from someone who has worked inside the lending process. We tell you if you qualify before you waste time applying.",
    canonical: "https://617east.com/services/sba-loans-north-carolina",
  },
  {
    path: "/services/credit-repair-north-carolina",
    title: "Credit Repair North Carolina | 617 East Trust — Honest, Legal, Effective",
    description: "Credit repair services in North Carolina. Dispute inaccurate items, build positive history. No guarantees — just honest, legal, effective work. Starting $199/mo.",
    canonical: "https://617east.com/services/credit-repair-north-carolina",
  },
  {
    path: "/services/bookkeeping-north-carolina",
    title: "Bookkeeping Services North Carolina | 617 East Trust — $199/mo",
    description: "Small business bookkeeping in North Carolina. Clean books, reconciled accounts, monthly reporting. $199/month.",
    canonical: "https://617east.com/services/bookkeeping-north-carolina",
  },
  {
    path: "/services/fractional-cfo",
    title: "Fractional CFO North Carolina | 617 East Trust — Strategic Financial Leadership",
    description: "Fractional CFO services in North Carolina. Cash flow, forecasting, and the financial decisions that actually matter. Starting $1,200/mo.",
    canonical: "https://617east.com/services/fractional-cfo",
  },
  {
    path: "/services/web-design-seo",
    title: "Web Design & SEO North Carolina | 617 East Trust — Sites That Rank",
    description: "Web design and SEO services in North Carolina. Websites built for search engines and real humans — not just to look good in a screenshot.",
    canonical: "https://617east.com/services/web-design-seo",
  },
  {
    path: "/about",
    title: "About 617 East Trust | Lamont Legrand — NC Business Advisor",
    description: "617 East Trust is founded by Lamont Legrand, a former commercial banker and SBA lending professional. The advisor who tells you what not to do.",
    canonical: "https://617east.com/about",
  },
  {
    path: "/contact",
    title: "Contact 617 East Trust | Free Consultation — (910) 315-1800",
    description: "Book a free consultation with 617 East Trust. We'll tell you exactly what we can do for your situation — and what we can't. Serving North Carolina.",
    canonical: "https://617east.com/contact",
  },
  {
    path: "/blog",
    title: "Resources | 617 East Trust — NC Business & Financial Guides",
    description: "Guides, articles, and honest advice for North Carolina business owners. LLC formation, SBA loans, credit repair, bookkeeping, and more.",
    canonical: "https://617east.com/blog",
  },
  {
    path: "/blog/how-to-form-an-llc-in-north-carolina",
    title: "How to Form an LLC in North Carolina (2026) | 617 East Trust",
    description: "A complete step-by-step guide to forming an LLC in North Carolina in 2026. Articles of Organization, registered agent, operating agreement, EIN, and BOI reporting.",
    canonical: "https://617east.com/blog/how-to-form-an-llc-in-north-carolina",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "How to Form an LLC in North Carolina (2026)", "author": { "@type": "Person", "name": "Lamont Legrand" }, "publisher": { "@type": "Organization", "name": "617 East Trust" } }
  },
  {
    path: "/blog/sba-7a-vs-504-loans-north-carolina",
    title: "SBA 7(a) vs 504 Loans NC: Which Is Right for Your Business? | 617 East Trust",
    description: "A detailed comparison of SBA 7(a) and 504 loan programs for North Carolina small businesses. Eligibility, use of proceeds, rates, and how to choose.",
    canonical: "https://617east.com/blog/sba-7a-vs-504-loans-north-carolina",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "SBA 7(a) vs 504 Loans NC", "author": { "@type": "Person", "name": "Lamont Legrand" }, "publisher": { "@type": "Organization", "name": "617 East Trust" } }
  },
  {
    path: "/blog/credit-repair-timeline-north-carolina",
    title: "Credit Repair Timeline North Carolina: Month-by-Month Guide | 617 East Trust",
    description: "What to expect from credit repair in North Carolina, month by month. Realistic timelines, dispute process, and how to build positive credit history.",
    canonical: "https://617east.com/blog/credit-repair-timeline-north-carolina",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "Credit Repair Timeline North Carolina", "author": { "@type": "Person", "name": "Lamont Legrand" }, "publisher": { "@type": "Organization", "name": "617 East Trust" } }
  },
  {
    path: "/blog/fractional-cfo-vs-bookkeeper-north-carolina",
    title: "Fractional CFO vs Bookkeeper NC: When to Hire Which | 617 East Trust",
    description: "The difference between a bookkeeper and a fractional CFO, and when North Carolina businesses need each. Honest guidance from an advisor who has seen both.",
    canonical: "https://617east.com/blog/fractional-cfo-vs-bookkeeper-north-carolina",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "Fractional CFO vs Bookkeeper NC", "author": { "@type": "Person", "name": "Lamont Legrand" }, "publisher": { "@type": "Organization", "name": "617 East Trust" } }
  },
  {
    path: "/privacy",
    title: "Privacy Policy | 617 East Trust",
    description: "Privacy policy for 617east.com. How we collect, use, and protect your information.",
    canonical: "https://617east.com/privacy",
  },
  {
    path: "/terms",
    title: "Terms of Service | 617 East Trust",
    description: "Terms of service for 617east.com and 617 East Trust advisory services.",
    canonical: "https://617east.com/terms",
  },
];

// ─── HTML injection helpers ───────────────────────────────────────────────────

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function injectHeadTags(html, route) {
  const { title, description, canonical, schema } = route;

  // Replace title
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(title)}</title>`
  );

  // Replace or inject meta description
  if (html.includes('name="description"')) {
    html = html.replace(
      /<meta name="description"[^>]*>/,
      `<meta name="description" content="${escapeHtml(description)}" />`
    );
  } else {
    html = html.replace("</head>", `  <meta name="description" content="${escapeHtml(description)}" />\n</head>`);
  }

  // Replace or inject canonical
  if (html.includes('rel="canonical"')) {
    html = html.replace(
      /<link rel="canonical"[^>]*>/,
      `<link rel="canonical" href="${canonical}" />`
    );
  } else {
    html = html.replace("</head>", `  <link rel="canonical" href="${canonical}" />\n</head>`);
  }

  // Update OG tags
  html = html.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escapeHtml(title)}" />`);
  html = html.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${escapeHtml(description)}" />`);
  html = html.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${canonical}" />`);
  html = html.replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${escapeHtml(title)}" />`);
  html = html.replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${escapeHtml(description)}" />`);

  // Inject page-specific JSON-LD schema
  if (schema) {
    const schemaTag = `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
    html = html.replace("</head>", `  ${schemaTag}\n</head>`);
  }

  return html;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function run() {
  const shellPath = path.join(DIST, "index.html");
  if (!fs.existsSync(shellPath)) {
    console.error(`❌ dist/public/index.html not found. Run 'vite build' first.`);
    process.exit(1);
  }

  const shell = fs.readFileSync(shellPath, "utf-8");
  let count = 0;

  for (const route of ROUTES) {
    const routePath = route.path === "/" ? "" : route.path;
    const dir = path.join(DIST, routePath);
    const outFile = path.join(dir, "index.html");

    // Skip root — already exists as dist/public/index.html
    if (route.path === "/") {
      const injected = injectHeadTags(shell, route);
      fs.writeFileSync(shellPath, injected, "utf-8");
      console.log(`✅ / → dist/public/index.html`);
      count++;
      continue;
    }

    fs.mkdirSync(dir, { recursive: true });
    const injected = injectHeadTags(shell, route);
    fs.writeFileSync(outFile, injected, "utf-8");
    console.log(`✅ ${route.path} → dist/public${routePath}/index.html`);
    count++;
  }

  console.log(`\n🎉 SSG complete — ${count} routes pre-rendered.`);
  console.log(`\nVerification:\n  curl -s http://localhost:3000/services/llc-formation-north-carolina | grep "<title>"`);
}

run().catch((err) => {
  console.error("SSG failed:", err);
  process.exit(1);
});
