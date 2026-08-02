/*
 * 617 East Trust — Server-Side SEO Injection
 * Central fix for Wave 1: emits route-specific JSON-LD, meta tags, and
 * crawlable noscript content into the served HTML so search engines and
 * social crawlers see structured data without JS execution.
 *
 * Every route gets its own canonical URL, title, description, and JSON-LD
 * block injected into <head> before the React SPA boots. The React app
 * still renders the interactive experience; this only adds crawler-visible
 * HTML that the bare SPA shell was missing.
 */

export type RouteMeta = {
  path: string;
  title: string;
  description: string;
  canonical: string;
  jsonLd: object | object[];
  noscriptH1?: string;
  noscriptBody?: string;
};

export type InjectionOptions = {
  analyticsEnabled: boolean;
  analyticsEndpoint: string;
  analyticsWebsiteId: string;
  ga4Id?: string;
  clarityId?: string;
  /** Google Tag Manager container ID e.g. GTM-XXXX */
  gtmId?: string;
  /** CallRail company swap path segment (consent-gated client load) */
  callrailSwapId?: string;
};

const BASE = "https://617east.com";

const PROFESSIONAL_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "617 East Trust",
  "description": "Business formation, SBA loan consulting, credit repair, bookkeeping, and fractional CFO services in North Carolina. The advisor who tells you what not to do.",
  "url": BASE,
  "telephone": "+19103151800",
  "email": "info@617east.com",
  "image": `${BASE}/manus-storage/og-image-617east_43177b90.jpg`,
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "NC",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 35.1955,
    "longitude": -79.8906
  },
  "areaServed": [
    { "@type": "City", "name": "Pinehurst", "addressRegion": "NC" },
    { "@type": "City", "name": "Southern Pines", "addressRegion": "NC" },
    { "@type": "City", "name": "Charlotte", "addressRegion": "NC" },
    { "@type": "City", "name": "Fayetteville", "addressRegion": "NC" },
    { "@type": "City", "name": "Raleigh", "addressRegion": "NC" },
    { "@type": "AdministrativeArea", "name": "Sandhills Region", "addressRegion": "NC" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Business Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "LLC Formation in North Carolina" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SBA Loan Consulting" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Credit Repair" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bookkeeping" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fractional CFO" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Design & SEO" } }
    ]
  },
  "founder": {
    "@type": "Person",
    "name": "Lamont Legrand"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "description": "By appointment, 7 days a week"
  }
};

const HOME_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do I qualify for an SBA loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SBA loan eligibility depends on your business size, time in operation, credit history, and the specific loan program. We assess your situation honestly and tell you upfront whether you qualify — and if not, what needs to change first."
      }
    },
    {
      "@type": "Question",
      "name": "How long does credit repair take in North Carolina?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most clients see meaningful improvement within 3–6 months. The timeline depends on the number and type of negative items. We do not make guarantees — we make honest assessments."
      }
    },
    {
      "@type": "Question",
      "name": "Can you guarantee results from credit repair?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Anyone who guarantees specific credit score increases is misleading you. We can tell you what is legally disputable, what the process looks like, and what realistic outcomes are. That honesty is what distinguishes us."
      }
    }
  ]
};

const CROA_DISCLOSURE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Consumer Rights & CROA Disclosures — 617 East Trust",
  "description": "Your federal credit-repair rights under the Credit Repair Organizations Act: no advance fees, written contract, 3-day cancellation right, and accurate disclosures.",
  "about": {
    "@type": "Legislation",
    "name": "Credit Repair Organizations Act (CROA)",
    "legislationJurisdiction": "US"
  }
};

export const ROUTES: RouteMeta[] = [
  {
    path: "/",
    title: "617 East Trust | Business Formation & SBA Loans — NC",
    description: "617 East Trust — Business formation, SBA loans, credit repair, bookkeeping, and fractional CFO services in North Carolina. The advisor who tells you what not to do.",
    canonical: `${BASE}/`,
    jsonLd: [PROFESSIONAL_SERVICE_SCHEMA, HOME_FAQ_SCHEMA],
    noscriptH1: "617 East Trust — Business Formation, SBA Loans & Credit Repair in North Carolina",
    noscriptBody:
      "Business formation, SBA loan consulting, credit repair, bookkeeping, and fractional CFO services across the Sandhills region, Charlotte, Fayetteville, Pinehurst, Southern Pines, and Raleigh NC. " +
      "The advisor who tells you what not to do. Call (910) 315-1800 or email info@617east.com for a free consultation."
  },
  {
    path: "/services",
    title: "Our Services — 617 East Trust | NC Business Consulting",
    description: "LLC formation, SBA loans, credit repair, bookkeeping, fractional CFO, and web design & SEO services for North Carolina businesses.",
    canonical: `${BASE}/services`,
    jsonLd: PROFESSIONAL_SERVICE_SCHEMA,
    noscriptH1: "Services — 617 East Trust",
    noscriptBody:
      "Six core services: LLC Formation in North Carolina ($499, 5–10 days), SBA Loan Consulting, Credit Repair, Bookkeeping, Fractional CFO, and Web Design & SEO. " +
      "By appointment — call (910) 315-1800."
  },
  {
    path: "/about",
    title: "About 617 East Trust — The Advisor Who Tells You What Not To Do",
    description: "Meet 617 East Trust: business consulting built on candor, not guarantees. Sandhills-rooted, NC-serving, honest-advice first.",
    canonical: `${BASE}/about`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About 617 East Trust",
      "description": "Business consulting built on candor. Founder Lamont Legrand serves North Carolina businesses with formation, loans, credit, books, and CFO services.",
      "mainEntity": {
        "@type": "Organization",
        "name": "617 East Trust",
        "founder": { "@type": "Person", "name": "Lamont Legrand" }
      }
    },
    noscriptH1: "About 617 East Trust",
    noscriptBody:
      "617 East Trust is a North Carolina business consulting practice serving the Sandhills region, Charlotte, Fayetteville, and Raleigh. " +
      "Founded by Lamont Legrand, the firm's core promise: the advisor who tells you what not to do."
  },
  {
    path: "/contact",
    title: "Contact 617 East Trust — Free Consultation",
    description: "Contact 617 East Trust for a free consultation on business formation, SBA loans, credit repair, bookkeeping, or fractional CFO services.",
    canonical: `${BASE}/contact`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact 617 East Trust",
      "description": "Free consultation for business formation, SBA loans, credit repair, bookkeeping, or fractional CFO services in North Carolina.",
      "mainEntity": {
        "@type": "ContactPoint",
        "telephone": "+19103151800",
        "email": "info@617east.com",
        "contactType": "customer service",
        "areaServed": "NC",
        "availableLanguage": "English",
        "hoursAvailable": { "@type": "OpeningHoursSpecification", "description": "By appointment, 7 days. Response within 24 hours." }
      }
    },
    noscriptH1: "Contact 617 East Trust",
    noscriptBody: "Call (910) 315-1800 or email info@617east.com. By appointment, 7 days a week. Free consultation."
  },
  {
    path: "/consumer-rights",
    title: "Consumer Rights & CROA Disclosures — 617 East Trust",
    description: "Your federal credit-repair rights: no advance fees, written contract, 3-day cancellation right, and full disclosure under the Credit Repair Organizations Act.",
    canonical: `${BASE}/consumer-rights`,
    jsonLd: CROA_DISCLOSURE_SCHEMA,
    noscriptH1: "Your Consumer Rights — CROA Disclosures",
    noscriptBody:
      "Under the federal Credit Repair Organizations Act (CROA), you have the right to: (1) receive a written contract before paying any fees; " +
      "(2) a 3-day right to cancel the contract at no cost; (3) no advance fees for credit-repair services before they are fully performed; " +
      "(4) accurate, complete disclosures about what 617 East Trust can and cannot do; and (5) the right to sue or report violations to the CFPB or FTC."
  },
  {
    path: "/blog",
    title: "Blog & Resources — 617 East Trust",
    description: "Practical guidance on North Carolina business formation, SBA loans, credit repair, and financial clarity from 617 East Trust.",
    canonical: `${BASE}/blog`,
    jsonLd: { "@context": "https://schema.org", "@type": "Blog", "name": "617 East Trust Blog", "url": `${BASE}/blog` },
    noscriptH1: "Blog — 617 East Trust",
    noscriptBody: "Practical guides on NC business formation, SBA loans, and credit. Updated regularly."
  },
  {
    path: "/privacy",
    title: "Privacy Policy — 617 East Trust",
    description: "How 617 East Trust collects, uses, and protects client information across business formation, credit, and consulting services.",
    canonical: `${BASE}/privacy`,
    jsonLd: { "@context": "https://schema.org", "@type": "WebPage", "name": "Privacy Policy — 617 East Trust" },
    noscriptH1: "Privacy Policy — 617 East Trust",
    noscriptBody:
      "Last updated: July 2026. We collect name, email, phone, and message content you submit through our contact form, plus standard server logs. " +
      "We use Google Analytics 4 (Google LLC) and Microsoft Clarity (Microsoft Corporation) only after cookie consent. " +
      "Neither tool is used to sell personal data. You may opt out of Google Analytics at https://tools.google.com/dlpage/gaoptout and Microsoft Clarity via Microsoft privacy settings. " +
      "California residents (CCPA): you have the right to know, delete, and opt out of sale of personal information. 617 East Trust does not sell personal information. " +
      "Privacy contact: info@617east.com or (910) 315-1800."
  },
  {
    path: "/terms",
    title: "Terms of Service — 617 East Trust",
    description: "Terms governing engagements with 617 East Trust, including CROA compliance, cancellation rights, and advance-fee disclosures.",
    canonical: `${BASE}/terms`,
    jsonLd: { "@context": "https://schema.org", "@type": "WebPage", "name": "Terms of Service — 617 East Trust" },
    noscriptH1: "Terms of Service — 617 East Trust",
    noscriptBody:
      "Last updated: July 2026. 617 East Trust provides business advisory and administrative services; we are not a law firm or CPA firm and do not guarantee specific outcomes. " +
      "Credit Repair Organizations Act (CROA) terms: (1) written service agreement before work begins; " +
      "(2) 3 business day right to cancel without penalty; (3) no advance fees — fees collected only after services for the billing period are fully performed; " +
      "(4) no guaranteed credit score increases or removal of accurate information. Contact: info@617east.com · (910) 315-1800."
  },
  {
    path: "/how-it-works",
    title: "How It Works | 617 East Trust — Our Process",
    description: "How 617 East Trust works with North Carolina business owners. Free consultation, honest assessment, defined engagement, and ongoing partnership. No surprises.",
    canonical: `${BASE}/how-it-works`,
    jsonLd: { "@context": "https://schema.org", "@type": "WebPage", "name": "How It Works — 617 East Trust", "url": `${BASE}/how-it-works` },
    noscriptH1: "How It Works — 617 East Trust",
    noscriptBody:
      "Free consultation, honest assessment of fit, written engagement terms, and clear deliverables. " +
      "Four-step process: free consultation, honest assessment, defined engagement, ongoing partnership. " +
      "For credit repair: CROA consumer rights disclosure and a 3 business day cancellation right. Call (910) 315-1800."
  }
];

/** Canonical live IA slugs (must match sitemap + client router). */
const SERVICE_SLUGS = [
  "llc-formation-north-carolina",
  "sba-loans-north-carolina",
  "credit-repair-north-carolina",
  "bookkeeping-north-carolina",
  "fractional-cfo-north-carolina",
  "web-design-seo-north-carolina"
] as const;

/** Short orphans → long canonical (301 on server; SEO alias resolves meta). */
export const SERVICE_SLUG_ALIASES: Record<string, string> = {
  "sba-loans": "sba-loans-north-carolina",
  "credit-repair": "credit-repair-north-carolina",
  "bookkeeping": "bookkeeping-north-carolina",
  "fractional-cfo": "fractional-cfo-north-carolina",
  "web-design-seo": "web-design-seo-north-carolina",
};

const CROA_CREDIT_NOSCRIPT =
  "Credit Repair Organizations Act (CROA) consumer rights: " +
  "(1) You have a right to dispute inaccurate credit report information free of charge with the credit bureaus. " +
  "(2) Written service agreement before any credit-repair work begins. " +
  "(3) 3 business day right to cancel the contract at no cost or obligation. " +
  "(4) No advance fees — 617 East Trust does not charge or collect payment for credit repair services before those services are fully performed for the applicable billing period. " +
  "(5) Accurate disclosures; no guaranteed score increases or removal of accurate, timely information. " +
  "Violations may be reported to the CFPB or FTC. Full rights: https://617east.com/consumer-rights. Call (910) 315-1800.";

const SERVICE_TITLES: Record<string, { title: string; desc: string; serviceName: string }> = {
  "llc-formation-north-carolina": {
    title: "LLC Formation North Carolina | 617 East Trust — $499 Total",
    desc: "Form your North Carolina LLC with registered agent, operating agreement, and EIN for $499 total (includes $125 state fee). We tell you what structure actually fits.",
    serviceName: "LLC Formation in North Carolina",
  },
  "sba-loans-north-carolina": {
    title: "SBA Loan Consultant North Carolina | 617 East Trust",
    desc: "Honest SBA 7(a) and 504 loan eligibility assessment and packaging for North Carolina businesses. No false promises — only the loans that fit.",
    serviceName: "SBA Loan Consulting",
  },
  "credit-repair-north-carolina": {
    title: "Credit Repair North Carolina | 617 East Trust — Honest, CROA-Compliant",
    desc: "CROA-compliant credit repair in North Carolina. No advance fees, written contract, 3-day cancellation right, no guarantees of outcomes.",
    serviceName: "Credit Repair in North Carolina",
  },
  "bookkeeping-north-carolina": {
    title: "Bookkeeping Services North Carolina | 617 East Trust",
    desc: "Monthly bookkeeping for North Carolina small businesses. Clean books, real numbers, no surprises at tax time.",
    serviceName: "Bookkeeping Services",
  },
  "fractional-cfo-north-carolina": {
    title: "Fractional CFO Services North Carolina | 617 East Trust",
    desc: "Part-time CFO guidance for NC businesses that need strategy, not just bookkeeping. Cash flow, forecasting, and growth planning.",
    serviceName: "Fractional CFO Services",
  },
  "web-design-seo-north-carolina": {
    title: "Web Design & SEO North Carolina | 617 East Trust",
    desc: "Conversion-focused web design and SEO for NC small businesses. Built to rank and convert, not just to look pretty.",
    serviceName: "Web Design & SEO",
  },
};

function breadcrumbForService(slug: string, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE}/` },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BASE}/services` },
      { "@type": "ListItem", "position": 3, "name": name, "item": `${BASE}/services/${slug}` },
    ],
  };
}

for (const slug of SERVICE_SLUGS) {
  const meta = SERVICE_TITLES[slug];
  const isCredit = slug === "credit-repair-north-carolina";
  ROUTES.push({
    path: `/services/${slug}`,
    title: meta.title,
    description: meta.desc,
    canonical: `${BASE}/services/${slug}`,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": meta.serviceName,
        "serviceType": meta.serviceName,
        "provider": { "@type": "ProfessionalService", "name": "617 East Trust", "url": BASE },
        "areaServed": "NC",
        "url": `${BASE}/services/${slug}`,
      },
      breadcrumbForService(slug, meta.serviceName),
      ...(isCredit ? [CROA_DISCLOSURE_SCHEMA] : []),
    ],
    noscriptH1: meta.serviceName + " — 617 East Trust",
    noscriptBody: isCredit
      ? meta.desc + " " + CROA_CREDIT_NOSCRIPT
      : meta.desc + " Call (910) 315-1800 to schedule a consultation.",
  });
}

const BLOG_ROUTES: Array<{ path: string; title: string; desc: string }> = [
  {
    path: "/blog/how-to-form-an-llc-in-north-carolina",
    title: "How to Form an LLC in North Carolina (2026) | 617 East Trust",
    desc: "A complete step-by-step guide to forming an LLC in North Carolina in 2026. Articles of Organization, registered agent, operating agreement, EIN, and BOI reporting.",
  },
  {
    path: "/blog/sba-7a-vs-504-loans-north-carolina",
    title: "SBA 7(a) vs 504 Loans NC: Which Is Right for Your Business? | 617 East Trust",
    desc: "A detailed comparison of SBA 7(a) and 504 loan programs for North Carolina small businesses. Eligibility, use of proceeds, rates, and how to choose.",
  },
  {
    path: "/blog/credit-repair-timeline-north-carolina",
    title: "Credit Repair Timeline North Carolina: Month-by-Month Guide | 617 East Trust",
    desc: "What to expect from credit repair in North Carolina, month by month. Realistic timelines, dispute process, and how to build positive credit history.",
  },
  {
    path: "/blog/fractional-cfo-vs-bookkeeper-north-carolina",
    title: "Fractional CFO vs Bookkeeper NC: When to Hire Which | 617 East Trust",
    desc: "The difference between a bookkeeper and a fractional CFO, and when North Carolina businesses need each.",
  },
  {
    path: "/blog/north-carolina-llc-annual-report-guide",
    title: "NC LLC Annual Report 2026: Due Date, Cost & How to File | 617 East Trust",
    desc: "North Carolina LLC annual report guide: $200 fee, April 15 deadline, and what happens if you miss it.",
  },
  {
    path: "/blog/what-is-a-registered-agent-north-carolina",
    title: "Registered Agent North Carolina: What It Is & Why You Need One | 617 East Trust",
    desc: "What is a registered agent in North Carolina? Requirements, costs, and whether you can be your own.",
  },
  {
    path: "/blog/sba-loan-requirements-north-carolina-2026",
    title: "SBA Loan Requirements NC 2026: What Lenders Look For | 617 East Trust",
    desc: "SBA loan requirements in North Carolina for 2026. Credit score, time in business, revenue, collateral, and denial reasons.",
  },
  {
    path: "/blog/how-to-build-business-credit-north-carolina",
    title: "How to Build Business Credit NC: Step-by-Step Guide 2026 | 617 East Trust",
    desc: "How to build business credit in North Carolina. EIN, DUNS, bank account, net-30 accounts, and business credit cards.",
  },
  {
    path: "/blog/bookkeeping-mistakes-small-business-north-carolina",
    title: "5 Bookkeeping Mistakes NC Small Businesses Make | 617 East Trust",
    desc: "The 5 most common bookkeeping mistakes North Carolina small businesses make — and how to fix them.",
  },
  {
    path: "/blog/credit-score-needed-for-sba-loan-north-carolina",
    title: "Credit Score for SBA Loan NC: Minimums & How to Improve | 617 East Trust",
    desc: "What credit score you need for an SBA loan in North Carolina. Minimums by loan type and how to improve before applying.",
  },
  {
    path: "/blog/north-carolina-business-formation-guide-2026",
    title: "NC Business Formation 2026: LLC vs S-Corp vs C-Corp | 617 East Trust",
    desc: "North Carolina business formation guide for 2026. Compare LLC, S-Corp, and C-Corp structures, costs, taxes, and liability.",
  },
  {
    path: "/blog/how-to-open-a-business-bank-account-north-carolina",
    title: "Open a Business Bank Account in NC (2026 Checklist) | 617 East Trust",
    desc: "How to open a business bank account in North Carolina: documents banks require, EIN vs SSN, LLC tips, and how to keep your liability shield intact.",
  },
  {
    path: "/blog/when-does-a-small-business-need-a-fractional-cfo-north-carolina",
    title: "When to Hire a Fractional CFO (NC Small Business Guide) | 617 East Trust",
    desc: "Signs your North Carolina business needs a fractional CFO: cash flow chaos, growth decisions, lender prep, and the bookkeeper-vs-CFO line.",
  },
  {
    path: "/blog/bookkeeping-vs-accounting-north-carolina",
    title: "Bookkeeping vs Accounting (NC Small Business) | 617 East Trust",
    desc: "Bookkeeping vs accounting explained for North Carolina owners: who does what, costs, and when you need each.",
  },
];

for (const post of BLOG_ROUTES) {
  const headline = post.title.split(" | ")[0];
  ROUTES.push({
    path: post.path,
    title: post.title,
    description: post.desc,
    canonical: `${BASE}${post.path}`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": headline,
      "description": post.desc,
      "url": `${BASE}${post.path}`,
      "author": { "@type": "Person", "name": "Lamont Legrand" },
      "publisher": { "@type": "Organization", "name": "617 East Trust", "url": BASE },
      "mainEntityOfPage": `${BASE}${post.path}`,
    },
    noscriptH1: headline,
    noscriptBody: post.desc + " More at https://617east.com/blog. Call (910) 315-1800.",
  });
}

export function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  const bare = pathname.split("?")[0].split("#")[0];
  return bare.length > 1 && bare.endsWith("/") ? bare.slice(0, -1) : bare;
}

export function findRoute(pathname: string): RouteMeta | null {
  let normalized = normalizePath(pathname);

  // Resolve short service aliases to long canonical paths
  if (normalized.startsWith("/services/")) {
    const slug = normalized.slice("/services/".length);
    const canonicalSlug = SERVICE_SLUG_ALIASES[slug] || slug;
    normalized = `/services/${canonicalSlug}`;
  }

  if (normalized === "/") return ROUTES.find((r) => r.path === "/") || null;
  return ROUTES.find((r) => r.path === normalized) || null;
}

/** If short service slug, return long path for 301; else null. */
export function serviceRedirectTarget(pathname: string): string | null {
  const normalized = normalizePath(pathname);
  if (!normalized.startsWith("/services/")) return null;
  const slug = normalized.slice("/services/".length);
  const canonical = SERVICE_SLUG_ALIASES[slug];
  return canonical ? `/services/${canonical}` : null;
}

/** Non-service permanent redirects (Wave 3: how-we-work → how-it-works). */
const PATH_REDIRECTS: Record<string, string> = {
  "/how-we-work": "/how-it-works",
};

/** Any path that should 301 to a canonical URL. */
export function pathRedirectTarget(pathname: string): string | null {
  const service = serviceRedirectTarget(pathname);
  if (service) return service;
  const normalized = normalizePath(pathname);
  return PATH_REDIRECTS[normalized] || null;
}

function escapeHtml(s: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return s.replace(/[&<>"']/g, (c) => map[c] ?? c);
}


/**
 * Inject route-specific SEO metadata, JSON-LD, noscript crawlable content,
 * and analytics script into the index.html template before serving.
 * Returns the modified HTML.
 */
export function injectSeoIntoHtml(
  htmlTemplate: string,
  route: RouteMeta | null,
  opts?: InjectionOptions,
): string {
  let result = htmlTemplate;

  if (route) {
    const titleTag = `    <title>${escapeHtml(route.title)}</title>`;
    const descTag = `    <meta name="description" content="${escapeHtml(route.description)}" />`;
    const canonTag = `    <link rel="canonical" href="${route.canonical}" />`;
    const ogTitle = `    <meta property="og:title" content="${escapeHtml(route.title)}" />`;
    const ogDesc = `    <meta property="og:description" content="${escapeHtml(route.description)}" />`;
    const ogUrl = `    <meta property="og:url" content="${route.canonical}" />`;
    const twitterTitle = `    <meta name="twitter:title" content="${escapeHtml(route.title)}" />`;
    const twitterDesc = `    <meta name="twitter:description" content="${escapeHtml(route.description)}" />`;

    // JSON-LD must be raw JSON (not HTML-entity-escaped) so parsers read it cleanly.
    // Only neutralize </script> breakouts.
    const jsonLdBlocks = (Array.isArray(route.jsonLd) ? route.jsonLd : [route.jsonLd])
      .map((obj) => {
        const raw = JSON.stringify(obj).replace(/</g, "\\u003c");
        return `    <script type="application/ld+json">${raw}</script>`;
      })
      .join("\n");

    const noscript = route.noscriptBody
      ? `  <noscript>
    <h1>${escapeHtml(route.noscriptH1 || "")}</h1>
    <p>${escapeHtml(route.noscriptBody)}</p>
    <p><a href="tel:+19103151800">(910) 315-1800</a> &middot; <a href="mailto:info@617east.com">info@617east.com</a></p>
  </noscript>`
      : "";

    // Crawl-visible cookie disclosure (banner UI is still client-side).
    // Ensures legal/audit gates can verify cookie notice without executing JS.
    const cookieStatic = `  <div id="cookie-consent-static" role="region" aria-label="Cookie notice" style="position:relative;z-index:1;padding:0.75rem 1rem;font-size:0.8125rem;line-height:1.5;background:#0f1419;color:#c8c4b8;border-bottom:1px solid #2a2f36;">
    This site uses cookies for <strong>Google Analytics</strong> and <strong>Microsoft Clarity</strong> only after you consent. See our <a href="/privacy" style="color:#d4a84b;">Privacy Policy</a>. Use Accept/Decline in the consent banner when JavaScript is enabled.
  </div>`;

    // Replace title
    result = result.replace(/<title>[^<]*<\/title>/, titleTag.trim());

    // Replace description meta
    result = result.replace(/<meta name="description" content="[^"]*" \/>/, descTag.trim());

    // Replace canonical link
    result = result.replace(/<link rel="canonical" href="[^"]*" \/>/, canonTag.trim());

    // Replace OG tags (title, desc, url — preserve type and image)
    result = result.replace(/<meta property="og:title" content="[^"]*" \/>/, ogTitle.trim());
    result = result.replace(/<meta property="og:description" content="[^"]*" \/>/, ogDesc.trim());
    result = result.replace(/<meta property="og:url" content="[^"]*" \/>/, ogUrl.trim());

    // Replace Twitter tags (title, desc — preserve card and image)
    result = result.replace(/<meta name="twitter:title" content="[^"]*" \/>/, twitterTitle.trim());
    result = result.replace(/<meta name="twitter:description" content="[^"]*" \/>/, twitterDesc.trim());

    // Append JSON-LD blocks before </head>
    if (jsonLdBlocks) {
      result = result.replace(/(<\/head>)/, `${jsonLdBlocks}\n  $1`);
    }

    // Add cookie notice + noscript crawlable content right after <body>
    const bodyInject = [cookieStatic, noscript].filter(Boolean).join("\n");
    if (bodyInject) {
      result = result.replace(/(<body[^>]*>)/, `$1\n${bodyInject}`);
    }
  } else {
    // Even without a matched route, keep cookie disclosure crawlable
    const cookieStatic = `  <div id="cookie-consent-static" role="region" aria-label="Cookie notice">This site uses cookies for Google Analytics and Microsoft Clarity only after you consent. See <a href="/privacy">Privacy Policy</a>.</div>`;
    result = result.replace(/(<body[^>]*>)/, `$1\n${cookieStatic}`);
  }

  // Analytics injection: replace placeholders with actual values
  // Umami analytics
  const analyticsMarkup = opts?.analyticsEnabled
    ? `      src="/__analytics__/umami"\n      data-website-id="${escapeHtml(opts.analyticsWebsiteId)}"></script>`
    : `      src="/__analytics__/umami"\n      data-website-id="">`;
  result = result.replace(
    /src="\/__analytics__\/umami"\s+data-website-id="[^"]*"><\/script>/,
    analyticsMarkup,
  );

  // Measurement IDs only — scripts load after cookie consent (client/lib/analytics.ts).
  // Do NOT inject live gtag/Clarity/GTM tags here (that bypasses consent).
  const ga4Id = opts?.ga4Id || "";
  const clarityId = opts?.clarityId || "";
  const gtmId = opts?.gtmId || "";
  const callrail = opts?.callrailSwapId || "";
  if (ga4Id || clarityId || gtmId || callrail) {
    const cfg = `    <script>
      window.__GA_ID__=${JSON.stringify(ga4Id)};
      window.__CLARITY_ID__=${JSON.stringify(clarityId)};
      window.__GTM_ID__=${JSON.stringify(gtmId)};
      window.__CALLRAIL_SWAP__=${JSON.stringify(callrail)};
    </script>`;
    result = result.replace("</head>", `${cfg}
  </head>`);
  }

  return result;
}
