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
    noscriptH1: "Privacy Policy — 617 East Trust"
  },
  {
    path: "/terms",
    title: "Terms of Service — 617 East Trust",
    description: "Terms governing engagements with 617 East Trust, including CROA compliance, cancellation rights, and advance-fee disclosures.",
    canonical: `${BASE}/terms`,
    jsonLd: { "@context": "https://schema.org", "@type": "WebPage", "name": "Terms of Service — 617 East Trust" },
    noscriptH1: "Terms of Service — 617 East Trust"
  }
];

const SERVICE_SLUGS = [
  "llc-formation-north-carolina",
  "sba-loans",
  "credit-repair",
  "bookkeeping",
  "fractional-cfo",
  "web-design-seo"
];

const SERVICE_TITLES: Record<string, { title: string; desc: string }> = {
  "llc-formation-north-carolina": {
    title: "LLC Formation in North Carolina — $499, 5–10 Days | 617 East Trust",
    desc: "Form your North Carolina LLC with registered agent, operating agreement, and EIN for $499. We tell you what structure actually fits."
  },
  "sba-loans": {
    title: "SBA Loan Consulting in NC — 7(a), Express, Microloan | 617 East Trust",
    desc: "Honest SBA loan eligibility assessment and packaging for North Carolina businesses. No false promises — only the loans that fit."
  },
  "credit-repair": {
    title: "Credit Repair in North Carolina — Honest, CROA-Compliant | 617 East Trust",
    desc: "CROA-compliant credit repair in North Carolina. No advance fees, written contract, 3-day cancellation, no guarantees of outcomes."
  },
  "bookkeeping": {
    title: "Bookkeeping Services in North Carolina | 617 East Trust",
    desc: "Monthly bookkeeping for North Carolina small businesses. Clean books, real numbers, no surprises at tax time."
  },
  "fractional-cfo": {
    title: "Fractional CFO Services in North Carolina | 617 East Trust",
    desc: "Part-time CFO guidance for NC businesses that need strategy, not just bookkeeping. Cash flow, forecasting, and growth planning."
  },
  "web-design-seo": {
    title: "Web Design & SEO in North Carolina | 617 East Trust",
    desc: "Conversion-focused web design and SEO for NC small businesses. Built to rank and convert, not just to look pretty."
  }
};

for (const slug of SERVICE_SLUGS) {
  const meta = SERVICE_TITLES[slug];
  ROUTES.push({
    path: `/services/${slug}`,
    title: meta.title,
    description: meta.desc,
    canonical: `${BASE}/services/${slug}`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": meta.title.split(" — ")[0],
      "provider": { "@type": "ProfessionalService", "name": "617 East Trust", "url": BASE },
      "areaServed": "NC",
      "url": `${BASE}/services/${slug}`
    },
    noscriptH1: meta.title.split(" — ")[0] + " — 617 East Trust",
    noscriptBody: meta.desc + " Call (910) 315-1800 to schedule a consultation."
  });
}

export function findRoute(pathname: string): RouteMeta | null {
  // Normalize: strip trailing slash, keep root "/"
  const normalized = pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;

  if (normalized === "/") return ROUTES.find((r) => r.path === "/") || null;

  if (normalized.startsWith("/services/")) {
    const slug = normalized.replace("/services/", "");
    return ROUTES.find((r) => r.path === `/services/${slug}`) || null;
  }

  return ROUTES.find((r) => r.path === normalized) || null;
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

    const jsonLdBlocks = (Array.isArray(route.jsonLd) ? route.jsonLd : [route.jsonLd])
      .map(
        (obj) =>
          `    <script type="application/ld+json">\n      ${escapeHtml(JSON.stringify(obj))}\n    </script>`
      )
      .join("\n");

    const noscript = route.noscriptBody
      ? `  <noscript>
    <h1>${escapeHtml(route.noscriptH1 || "")}</h1>
    <p>${escapeHtml(route.noscriptBody)}</p>
    <p><a href="tel:+19103151800">(910) 315-1800</a> &middot; <a href="mailto:info@617east.com">info@617east.com</a></p>
  </noscript>`
      : "";

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

    // Add noscript crawlable content right after <body> tag
    if (noscript) {
      result = result.replace(/(<body>)/, `$1\n${noscript}`);
    }
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

  // GA4 snippet — only inject when a real GA4_ID is provided
  const ga4Id = opts?.ga4Id;
  if (ga4Id) {
    const ga4Script = `<!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${escapeHtml(ga4Id)}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${escapeHtml(ga4Id)}');
    </script>`;
    result = result.replace("</head>", `${ga4Script}
  </head>`);
  }

  // Microsoft Clarity snippet — only inject when a real CLARITY_ID is provided
  const clarityId = opts?.clarityId;
  if (clarityId) {
    const clarityScript = `<!-- Microsoft Clarity -->
    <script type="text/javascript">
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${escapeHtml(clarityId)}");
    </script>`;
    result = result.replace("</head>", `${clarityScript}
  </head>`);
  }

  return result;
}
