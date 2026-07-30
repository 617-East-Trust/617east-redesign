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
const BASE_ADDR = { "@type": "PostalAddress", addressLocality: "Sandhills", addressRegion: "NC", addressCountry: "US" };
const ORG = { "@type": "ProfessionalService", name: "617 East Trust", url: "https://617east.com", telephone: "+19103151800", email: "info@617east.com", address: BASE_ADDR };
const AREA = [
  { "@type": "City", name: "Pinehurst", addressRegion: "NC" },
  { "@type": "City", name: "Southern Pines", addressRegion: "NC" },
  { "@type": "City", name: "Charlotte", addressRegion: "NC" },
  { "@type": "City", name: "Fayetteville", addressRegion: "NC" },
  { "@type": "City", name: "Raleigh", addressRegion: "NC" },
];
const AUTHOR = { "@type": "Person", name: "Lamont Legrand" };

const ROUTES = [
  {
    path: "/",
    title: "617 East Trust | Business Formation & SBA Loans — NC",
    description: "617 East Trust — Business formation, SBA loans, credit repair, bookkeeping, and fractional CFO services in North Carolina. The advisor who tells you what not to do.",
    canonical: "https://617east.com/",
    schema: [
      { "@context": "https://schema.org", "@type": "ProfessionalService", ...ORG, areaServed: AREA, openingHours: "Mo-Su 00:00-23:59", priceRange: "$$" },
      { "@context": "https://schema.org", "@type": "WebSite", name: "617 East Trust", url: "https://617east.com", potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: "https://617east.com/search?q={search_term_string}" }, "query-input": "required name=search_term_string" } },
      { "@context": "https://schema.org", "@type": "FAQPage", name: "617 East Trust — FAQ", url: "https://617east.com", mainEntity: [{ "@type": "Question", name: "What does 617 East Trust do?", acceptedAnswer: { "@type": "Answer", text: "617 East Trust helps North Carolina business owners form LLCs, secure SBA loans, repair credit, manage books, and access fractional CFO services — with one advisor start to finish." } }, { "@type": "Question", name: "Who is Lamont Legrand?", acceptedAnswer: { "@type": "Answer", text: "Lamont Legrand is a former commercial banker and SBA lending professional who founded 617 East Trust to provide honest, unbiased business advisory services in North Carolina." } }, { "@type": "Question", name: "How much does LLC formation cost with 617 East Trust?", acceptedAnswer: { "@type": "Answer", text: "$499 total including the $125 North Carolina state filing fee. Registered agent, operating agreement, and EIN included." } }, { "@type": "Question", name: "Do you offer free consultations?", acceptedAnswer: { "@type": "Answer", text: "Yes, 617 East Trust offers a free initial consultation to understand your situation and recommend the right path forward with no obligation." } }, { "@type": "Question", name: "Where does 617 East Trust serve?", acceptedAnswer: { "@type": "Answer", text: "We serve business owners throughout North Carolina, including Pinehurst, Southern Pines, Charlotte, Fayetteville, and Raleigh." } }] },
    ],
  },
  {
    path: "/services",
    title: "Business Services | 617 East Trust — North Carolina",
    description: "LLC formation, SBA loans, credit repair, bookkeeping, fractional CFO, and web design services in North Carolina. Six services. One advisor. No handoffs.",
    canonical: "https://617east.com/services",
    schema: [{
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: [
        { "@type": "ListItem", position: 1, item: { "@type": "Service", name: "LLC Formation", url: "https://617east.com/services/llc-formation-north-carolina", provider: ORG } },
        { "@type": "ListItem", position: 2, item: { "@type": "Service", name: "SBA Loan Consulting", url: "https://617east.com/services/sba-loans-north-carolina", provider: ORG } },
        { "@type": "ListItem", position: 3, item: { "@type": "Service", name: "Credit Repair", url: "https://617east.com/services/credit-repair-north-carolina", provider: ORG } },
        { "@type": "ListItem", position: 4, item: { "@type": "Service", name: "Bookkeeping", url: "https://617east.com/services/bookkeeping-north-carolina", provider: ORG } },
        { "@type": "ListItem", position: 5, item: { "@type": "Service", name: "Fractional CFO", url: "https://617east.com/services/fractional-cfo", provider: ORG } },
        { "@type": "ListItem", position: 6, item: { "@type": "Service", name: "Web Design & SEO", url: "https://617east.com/services/web-design-seo", provider: ORG } },
      ],
    }],
  },
  {
    path: "/services/llc-formation-north-carolina",
    title: "LLC Formation North Carolina | 617 East Trust — $499 Total",
    description: "Form an LLC in North Carolina with registered agent, operating agreement, and EIN. $499 total including $125 state fee. We tell you what structure fits your situation.",
    canonical: "https://617east.com/services/llc-formation-north-carolina",
    schema: [{ "@context": "https://schema.org", "@type": "Service", "name": "LLC Formation in North Carolina", "provider": { "@type": "ProfessionalService", "name": "617 East Trust" }, "offers": { "@type": "Offer", "price": "499", "priceCurrency": "USD" } }]
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
    schema: [{
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About 617 East Trust",
      url: "https://617east.com/about",
      description: "617 East Trust is founded by Lamont Legrand, a former commercial banker and SBA lending professional.",
      mainEntity: { "@type": "Person", name: "Lamont Legrand", jobTitle: "Owner, 617 East Trust", worksFor: { "@type": "Organization", name: "617 East Trust" } },
    }],
  },
  {
    path: "/contact",
    title: "Contact 617 East Trust | Free Consultation — (910) 315-1800",
    description: "Book a free consultation with 617 East Trust. We'll tell you exactly what we can do for your situation — and what we can't. Serving North Carolina.",
    canonical: "https://617east.com/contact",
    schema: [{
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact 617 East Trust",
      url: "https://617east.com/contact",
      description: "Book a free consultation with 617 East Trust.",
      mainEntity: { "@type": "Organization", ...ORG, areaServed: AREA, contactPoint: { "@type": "ContactPoint", telephone: "+19103151800", contactType: "sales", email: "hello@617east.com", availableLanguage: ["English"], areaServed: AREA } },
    }],
  },
  {
    path: "/blog",
    title: "Resources | 617 East Trust — NC Business & Financial Guides",
    description: "Guides, articles, and honest advice for North Carolina business owners. LLC formation, SBA loans, credit repair, bookkeeping, and more.",
    canonical: "https://617east.com/blog",
    schema: [{
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "617 East Trust Resources",
      url: "https://617east.com/blog",
      description: "Guides, articles, and honest advice for NC business owners.",
      publisher: ORG,
      blogPost: [
        // ... existing code: blog posts ...
      ],
    }],
  },
  {
    path: "/blog/how-to-form-an-llc-in-north-carolina",
    title: "How to Form an LLC in North Carolina (2026) | 617 East Trust",
    description: "A complete step-by-step guide to forming an LLC in North Carolina in 2026. Articles of Organization, registered agent, operating agreement, EIN, and BOI reporting.",
    canonical: "https://617east.com/blog/how-to-form-an-llc-in-north-carolina",
    schema: [{ "@context": "https://schema.org", "@type": "Article", "headline": "How to Form an LLC in North Carolina (2026)", "author": { "@type": "Person", "name": "Lamont Legrand" }, "publisher": { "@type": "Organization", "name": "617 East Trust" } }]
  },
  {
    path: "/blog/sba-7a-vs-504-loans-north-carolina",
    title: "SBA 7(a) vs 504 Loans NC: Which Is Right for Your Business? | 617 East Trust",
    description: "A detailed comparison of SBA 7(a) and 504 loan programs for North Carolina small businesses. Eligibility, use of proceeds, rates, and how to choose.",
    canonical: "https://617east.com/blog/sba-7a-vs-504-loans-north-carolina",
    schema: [{ "@context": "https://schema.org", "@type": "Article", "headline": "SBA 7(a) vs 504 Loans NC", "author": { "@type": "Person", "name": "Lamont Legrand" }, "publisher": { "@type": "Organization", "name": "617 East Trust" } }]
  },
  {
    path: "/blog/credit-repair-timeline-north-carolina",
    title: "Credit Repair Timeline North Carolina: Month-by-Month Guide | 617 East Trust",
    description: "What to expect from credit repair in North Carolina, month by month. Realistic timelines, dispute process, and how to build positive credit history.",
    canonical: "https://617east.com/blog/credit-repair-timeline-north-carolina",
    schema: [{ "@context": "https://schema.org", "@type": "Article", "headline": "Credit Repair Timeline North Carolina", "author": { "@type": "Person", "name": "Lamont Legrand" }, "publisher": { "@type": "Organization", "name": "617 East Trust" } }]
  },
  {
    path: "/blog/fractional-cfo-vs-bookkeeper-north-carolina",
    title: "Fractional CFO vs Bookkeeper NC: When to Hire Which | 617 East Trust",
    description: "The difference between a bookkeeper and a fractional CFO, and when North Carolina businesses need each. Honest guidance from an advisor who has seen both.",
    canonical: "https://617east.com/blog/fractional-cfo-vs-bookkeeper-north-carolina",
    schema: [{ "@context": "https://schema.org", "@type": "Article", "headline": "Fractional CFO vs Bookkeeper NC", "author": { "@type": "Person", "name": "Lamont Legrand" }, "publisher": { "@type": "Organization", "name": "617 East Trust" } }]
  },
  // ── Wave 3: New blog posts ────────────────────────────────────────────────────
  {
    path: "/blog/north-carolina-llc-annual-report-guide",
    title: "NC LLC Annual Report 2026: Due Date, Cost & How to File | 617 East Trust",
    description: "North Carolina LLC annual report guide: $200 fee, April 15 deadline, and what happens if you miss it. How to file and how to avoid administrative dissolution.",
    canonical: "https://617east.com/blog/north-carolina-llc-annual-report-guide",
    schema: [{ "@context": "https://schema.org", "@type": "Article", "headline": "NC LLC Annual Report 2026: Complete Guide", "author": { "@type": "Person", "name": "Lamont Legrand" }, "publisher": { "@type": "Organization", "name": "617 East Trust" } }]
  },
  {
    path: "/blog/what-is-a-registered-agent-north-carolina",
    title: "Registered Agent North Carolina: What It Is & Why You Need One | 617 East Trust",
    description: "What is a registered agent in North Carolina? Requirements, costs, and whether you can be your own. Complete guide for NC LLC owners.",
    canonical: "https://617east.com/blog/what-is-a-registered-agent-north-carolina",
    schema: [{ "@context": "https://schema.org", "@type": "Article", "headline": "What Is a Registered Agent in North Carolina?", "author": { "@type": "Person", "name": "Lamont Legrand" }, "publisher": { "@type": "Organization", "name": "617 East Trust" } }]
  },
  {
    path: "/blog/sba-loan-requirements-north-carolina-2026",
    title: "SBA Loan Requirements NC 2026: What Lenders Look For | 617 East Trust",
    description: "SBA loan requirements in North Carolina for 2026. Credit score, time in business, revenue, collateral, and the real reasons applications get denied.",
    canonical: "https://617east.com/blog/sba-loan-requirements-north-carolina-2026",
    schema: [{ "@context": "https://schema.org", "@type": "Article", "headline": "SBA Loan Requirements in North Carolina (2026)", "author": { "@type": "Person", "name": "Lamont Legrand" }, "publisher": { "@type": "Organization", "name": "617 East Trust" } }]
  },
  {
    path: "/blog/how-to-build-business-credit-north-carolina",
    title: "How to Build Business Credit NC: Step-by-Step Guide 2026 | 617 East Trust",
    description: "How to build business credit in North Carolina. EIN, DUNS number, business bank account, net-30 accounts, and business credit cards. A practical step-by-step guide.",
    canonical: "https://617east.com/blog/how-to-build-business-credit-north-carolina",
    schema: [{ "@context": "https://schema.org", "@type": "Article", "headline": "How to Build Business Credit in North Carolina", "author": { "@type": "Person", "name": "Lamont Legrand" }, "publisher": { "@type": "Organization", "name": "617 East Trust" } }]
  },
  {
    path: "/blog/bookkeeping-mistakes-small-business-north-carolina",
    title: "5 Bookkeeping Mistakes NC Small Businesses Make | 617 East Trust",
    description: "The 5 most common bookkeeping mistakes North Carolina small businesses make — and how to fix them before they cost you an SBA loan or a tax penalty.",
    canonical: "https://617east.com/blog/bookkeeping-mistakes-small-business-north-carolina",
    schema: [{ "@context": "https://schema.org", "@type": "Article", "headline": "5 Bookkeeping Mistakes That Cost NC Small Businesses Money", "author": { "@type": "Person", "name": "Lamont Legrand" }, "publisher": { "@type": "Organization", "name": "617 East Trust" } }]
  },
  {
    path: "/blog/credit-score-needed-for-sba-loan-north-carolina",
    title: "Credit Score for SBA Loan NC: Minimums & How to Improve | 617 East Trust",
    description: "What credit score do you need for an SBA loan in North Carolina? Minimums by loan type, what else lenders look at, and how to improve your score before applying.",
    canonical: "https://617east.com/blog/credit-score-needed-for-sba-loan-north-carolina",
    schema: [{ "@context": "https://schema.org", "@type": "Article", "headline": "What Credit Score Do You Need for an SBA Loan in NC?", "author": { "@type": "Person", "name": "Lamont Legrand" }, "publisher": { "@type": "Organization", "name": "617 East Trust" } }]
  },
  {
    path: "/blog/north-carolina-business-formation-guide-2026",
    title: "NC Business Formation 2026: LLC vs S-Corp vs C-Corp | 617 East Trust",
    description: "North Carolina business formation guide for 2026. Compare LLC, S-Corp, and C-Corp structures. Costs, taxes, liability, and which is right for your situation.",
    canonical: "https://617east.com/blog/north-carolina-business-formation-guide-2026",
    schema: [{ "@context": "https://schema.org", "@type": "Article", "headline": "NC Business Formation Guide 2026: LLC vs S-Corp vs C-Corp", "author": { "@type": "Person", "name": "Lamont Legrand" }, "publisher": { "@type": "Organization", "name": "617 East Trust" } }]
  },
  // ── Wave 3: New pages ─────────────────────────────────────────────────────────
  {
    path: "/how-we-work",
    title: "How We Work | 617 East Trust — Our Process",
    description: "How 617 East Trust works with North Carolina business owners. Free consultation, honest assessment, defined engagement, and ongoing partnership. No surprises.",
    canonical: "https://617east.com/how-we-work",
    schema: [{ "@context": "https://schema.org", "@type": "WebPage", "name": "How We Work — 617 East Trust", "url": "https://617east.com/how-we-work" }]
  },
  {
    path: "/privacy",
    title: "Privacy Policy | 617 East Trust",
    description: "Privacy policy for 617east.com. How we collect, use, and protect your information.",
    canonical: "https://617east.com/privacy",
    schema: [{ "@context": "https://schema.org", "@type": "WebPage", name: "Privacy Policy — 617 East Trust", url: "https://617east.com/privacy" }],
  },
  {
    path: "/terms",
    title: "Terms of Service | 617 East Trust",
    description: "Terms of service for 617east.com and 617 East Trust advisory services.",
    canonical: "https://617east.com/terms",
    schema: [{ "@context": "https://schema.org", "@type": "WebPage", name: "Terms of Service — 617 East Trust", url: "https://617east.com/terms" }],
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
    for (const schemaObj of schema) {
      const schemaTag = `<script type="application/ld+json">${JSON.stringify(schemaObj)}</script>`;
      html = html.replace("</head>", `  ${schemaTag}\n</head>`);
    }
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

  // ─── Sitemap generation ────────────────────────────────────────────────────────

  const sitemapUrl = "https://617east.com";
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(r => `  <url>
    <loc>${r.canonical}</loc>
    <changefreq>weekly</changefreq>
    <priority>${r.path === "/" ? "1.0" : r.path.startsWith("/services/") || r.path.startsWith("/blog/") ? "0.8" : "0.6"}</priority>
  </url>`).join("\n")}
</urlset>`;

  const sitemapPath = path.resolve(DIST, "sitemap.xml");
  fs.writeFileSync(sitemapPath, sitemap, "utf-8");
  const sitemapUrlCount = ROUTES.length;
  console.log(`\n✅ sitemap.xml → ${sitemapPath} (${sitemapUrlCount} URLs)\n`);

  console.log(`\nVerification:`);
}

run().catch((err) => {
  console.error("SSG failed:", err);
  process.exit(1);
});
