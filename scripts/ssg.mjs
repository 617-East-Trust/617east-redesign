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
export const ROUTES = [
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
    path: "/services/fractional-cfo-north-carolina",
    title: "Fractional CFO North Carolina | 617 East Trust — Strategic Financial Leadership",
    description: "Fractional CFO services in North Carolina. Cash flow, forecasting, and the financial decisions that actually matter. Starting $1,200/mo.",
    canonical: "https://617east.com/services/fractional-cfo-north-carolina",
  },
  {
    path: "/services/web-design-seo-north-carolina",
    title: "Web Design & SEO North Carolina | 617 East Trust — Sites That Rank",
    description: "Web design and SEO services in North Carolina. Websites built for search engines and real humans — not just to look good in a screenshot.",
    canonical: "https://617east.com/services/web-design-seo-north-carolina",
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
  // ── Wave 3: New blog posts ────────────────────────────────────────────────────
  {
    path: "/blog/north-carolina-llc-annual-report-guide",
    title: "NC LLC Annual Report 2026: Due Date, Cost & How to File | 617 East Trust",
    description: "North Carolina LLC annual report guide: $200 fee, April 15 deadline, and what happens if you miss it. How to file and how to avoid administrative dissolution.",
    canonical: "https://617east.com/blog/north-carolina-llc-annual-report-guide",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "NC LLC Annual Report 2026: Complete Guide", "author": { "@type": "Person", "name": "Lamont Legrand" }, "publisher": { "@type": "Organization", "name": "617 East Trust" } }
  },
  {
    path: "/blog/what-is-a-registered-agent-north-carolina",
    title: "Registered Agent North Carolina: What It Is & Why You Need One | 617 East Trust",
    description: "What is a registered agent in North Carolina? Requirements, costs, and whether you can be your own. Complete guide for NC LLC owners.",
    canonical: "https://617east.com/blog/what-is-a-registered-agent-north-carolina",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "What Is a Registered Agent in North Carolina?", "author": { "@type": "Person", "name": "Lamont Legrand" }, "publisher": { "@type": "Organization", "name": "617 East Trust" } }
  },
  {
    path: "/blog/sba-loan-requirements-north-carolina-2026",
    title: "SBA Loan Requirements NC 2026: What Lenders Look For | 617 East Trust",
    description: "SBA loan requirements in North Carolina for 2026. Credit score, time in business, revenue, collateral, and the real reasons applications get denied.",
    canonical: "https://617east.com/blog/sba-loan-requirements-north-carolina-2026",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "SBA Loan Requirements in North Carolina (2026)", "author": { "@type": "Person", "name": "Lamont Legrand" }, "publisher": { "@type": "Organization", "name": "617 East Trust" } }
  },
  {
    path: "/blog/how-to-build-business-credit-north-carolina",
    title: "How to Build Business Credit NC: Step-by-Step Guide 2026 | 617 East Trust",
    description: "How to build business credit in North Carolina. EIN, DUNS number, business bank account, net-30 accounts, and business credit cards. A practical step-by-step guide.",
    canonical: "https://617east.com/blog/how-to-build-business-credit-north-carolina",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "How to Build Business Credit in North Carolina", "author": { "@type": "Person", "name": "Lamont Legrand" }, "publisher": { "@type": "Organization", "name": "617 East Trust" } }
  },
  {
    path: "/blog/bookkeeping-mistakes-small-business-north-carolina",
    title: "5 Bookkeeping Mistakes NC Small Businesses Make | 617 East Trust",
    description: "The 5 most common bookkeeping mistakes North Carolina small businesses make — and how to fix them before they cost you an SBA loan or a tax penalty.",
    canonical: "https://617east.com/blog/bookkeeping-mistakes-small-business-north-carolina",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "5 Bookkeeping Mistakes That Cost NC Small Businesses Money", "author": { "@type": "Person", "name": "Lamont Legrand" }, "publisher": { "@type": "Organization", "name": "617 East Trust" } }
  },
  {
    path: "/blog/credit-score-needed-for-sba-loan-north-carolina",
    title: "Credit Score for SBA Loan NC: Minimums & How to Improve | 617 East Trust",
    description: "What credit score do you need for an SBA loan in North Carolina? Minimums by loan type, what else lenders look at, and how to improve your score before applying.",
    canonical: "https://617east.com/blog/credit-score-needed-for-sba-loan-north-carolina",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "What Credit Score Do You Need for an SBA Loan in NC?", "author": { "@type": "Person", "name": "Lamont Legrand" }, "publisher": { "@type": "Organization", "name": "617 East Trust" } }
  },
  {
    path: "/blog/north-carolina-business-formation-guide-2026",
    title: "NC Business Formation 2026: LLC vs S-Corp vs C-Corp | 617 East Trust",
    description: "North Carolina business formation guide for 2026. Compare LLC, S-Corp, and C-Corp structures. Costs, taxes, liability, and which is right for your situation.",
    canonical: "https://617east.com/blog/north-carolina-business-formation-guide-2026",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "NC Business Formation Guide 2026: LLC vs S-Corp vs C-Corp", "author": { "@type": "Person", "name": "Lamont Legrand" }, "publisher": { "@type": "Organization", "name": "617 East Trust" } }
  },
  {
    path: "/blog/how-to-open-a-business-bank-account-north-carolina",
    title: "Open a Business Bank Account in NC (2026 Checklist) | 617 East Trust",
    description: "How to open a business bank account in North Carolina: documents banks require, EIN vs SSN, LLC tips, and how to keep your liability shield intact.",
    canonical: "https://617east.com/blog/how-to-open-a-business-bank-account-north-carolina",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "How to Open a Business Bank Account in North Carolina (2026)", "author": { "@type": "Person", "name": "Lamont Legrand" }, "publisher": { "@type": "Organization", "name": "617 East Trust" } }
  },
  {
    path: "/blog/when-does-a-small-business-need-a-fractional-cfo-north-carolina",
    title: "When to Hire a Fractional CFO (NC Small Business Guide) | 617 East Trust",
    description: "Signs your North Carolina business needs a fractional CFO: cash flow chaos, growth decisions, lender prep, and the bookkeeper-vs-CFO line.",
    canonical: "https://617east.com/blog/when-does-a-small-business-need-a-fractional-cfo-north-carolina",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "When Does a Small Business Need a Fractional CFO?", "author": { "@type": "Person", "name": "Lamont Legrand" }, "publisher": { "@type": "Organization", "name": "617 East Trust" } }
  },
  {
    path: "/blog/bookkeeping-vs-accounting-north-carolina",
    title: "Bookkeeping vs Accounting (NC Small Business) | 617 East Trust",
    description: "Bookkeeping vs accounting explained for North Carolina owners: who does what, costs, and when you need each.",
    canonical: "https://617east.com/blog/bookkeeping-vs-accounting-north-carolina",
    schema: { "@context": "https://schema.org", "@type": "Article", "headline": "Bookkeeping vs Accounting: What NC Small Businesses Actually Need", "author": { "@type": "Person", "name": "Lamont Legrand" }, "publisher": { "@type": "Organization", "name": "617 East Trust" } }
  },
  // ── Wave 3: Process page ──────────────────────────────────────────────────────
  {
    path: "/how-it-works",
    title: "How It Works | 617 East Trust — Our Process",
    description: "How 617 East Trust works with North Carolina business owners. Free consultation, honest assessment, defined engagement, and ongoing partnership. No surprises.",
    canonical: "https://617east.com/how-it-works",
    schema: { "@context": "https://schema.org", "@type": "WebPage", "name": "How It Works — 617 East Trust", "url": "https://617east.com/how-it-works" }
  },
  {
    path: "/consumer-rights",
    title: "Consumer Rights & CROA Disclosures — 617 East Trust",
    description: "Your federal credit-repair rights: no advance fees, written contract, 3-day cancellation right, and full disclosure under the Credit Repair Organizations Act.",
    canonical: "https://617east.com/consumer-rights",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Consumer Rights & CROA Disclosures — 617 East Trust",
      "description": "Your federal credit-repair rights under the Credit Repair Organizations Act.",
      "url": "https://617east.com/consumer-rights"
    }
  },
  {
    path: "/privacy",
    title: "Privacy Policy | 617 East Trust",
    description: "Privacy policy for 617east.com. How we collect, use, and protect your information. Names Google Analytics, Microsoft Clarity, and CCPA rights.",
    canonical: "https://617east.com/privacy",
  },
  {
    path: "/terms",
    title: "Terms of Service | 617 East Trust",
    description: "Terms of service for 617east.com and 617 East Trust advisory services, including CROA compliance.",
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

  // Keep sitemap.xml in lockstep with ROUTES (was lagging at 17 URLs)
  const today = new Date().toISOString().slice(0, 10);
  const priority = (p) => {
    if (p === "/") return "1.0";
    if (p === "/services") return "0.9";
    if (p.startsWith("/services/")) return "0.8";
    if (p === "/contact" || p === "/about" || p === "/how-it-works") return "0.8";
    if (p === "/blog" || p.startsWith("/blog/")) return "0.7";
    if (p === "/privacy" || p === "/terms" || p === "/consumer-rights") return "0.3";
    return "0.5";
  };
  const changefreq = (p) => {
    if (p === "/" || p === "/blog") return "weekly";
    if (p.startsWith("/blog/")) return "monthly";
    return "monthly";
  };
  const urls = ROUTES.map((r) => {
    const loc = r.path === "/" ? "https://617east.com/" : `https://617east.com${r.path}`;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq(r.path)}</changefreq>
    <priority>${priority(r.path)}</priority>
  </url>`;
  }).join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  const sitemapPath = path.join(DIST, "sitemap.xml");
  fs.writeFileSync(sitemapPath, sitemap, "utf-8");
  // Also refresh source-of-truth public copy when present
  const publicSitemap = path.resolve(__dirname, "../client/public/sitemap.xml");
  try {
    fs.writeFileSync(publicSitemap, sitemap, "utf-8");
  } catch { /* optional */ }
  console.log(`✅ sitemap.xml → ${sitemapPath} (${ROUTES.length} URLs)`);

  console.log(`\n🎉 SSG complete — ${count} routes pre-rendered.`);
  console.log(`\nVerification:\n  curl -s http://localhost:3000/services/llc-formation-north-carolina | grep "<title>"`);
}

run().catch((err) => {
  console.error("SSG failed:", err);
  process.exit(1);
});
