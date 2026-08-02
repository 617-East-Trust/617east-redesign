/**
 * 617 EAST TRUST — Centralized JSON-LD Schema Factories
 *
 * Single source of truth for all structured data markup.
 * Each factory returns a plain object; the SSG script and inline <Helmet>
 * each call them via `JSON.stringify()`.
 *
 * Naming: exported functions = lowercase, camelCase, noun-first.
 *   e.g. professionalServiceSchema(), websiteSchema()
 */

// ─── Shared shapes ───────────────────────────────────────────────────────────

const ORGANIZATION = {
  "@type": "ProfessionalService",
  name: "617 East Trust",
  url: "https://617east.com",
  telephone: "+19103151800",
  email: "info@617east.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sandhills",
    addressRegion: "NC",
    addressCountry: "US",
  },
};

const AREA_SERVED = [
  { "@type": "City", name: "Pinehurst", addressRegion: "NC" },
  { "@type": "City", name: "Southern Pines", addressRegion: "NC" },
  { "@type": "City", name: "Charlotte", addressRegion: "NC" },
  { "@type": "City", name: "Fayetteville", addressRegion: "NC" },
  { "@type": "City", name: "Raleigh", addressRegion: "NC" },
];

// ─── Page-level schema factories ─────────────────────────────────────────────

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "617 East Trust",
    url: "https://617east.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://617east.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    ...ORGANIZATION,
    areaServed: AREA_SERVED,
    // By appointment — not "open 24 hours" (Wave 2.2 alignment with GBP)
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "09:00",
      closes: "17:00",
      description: "By appointment. Response within 24 hours.",
    },
    priceRange: "$$",
  };
}

/**
 * One service detail page.
 * Fill in the service-specific fields from `ServiceData.schema`.
 */
export function serviceSchema(overrides: Record<string, unknown> = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: ORGANIZATION,
    areaServed: AREA_SERVED,
    ...overrides,
  };
}

/**
 * /services hub — ItemList of 6 services.
 */
export function servicesItemListSchema(services: { name: string; url: string; description: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.name,
        url: s.url,
        description: s.description,
        provider: ORGANIZATION,
      },
    })),
  };
}

/**
 * /blog hub — Blog + ItemList of posts.
 */
export function blogSchema(posts: { headline: string; url: string; datePublished: string; description: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "617 East Trust Resources",
    url: "https://617east.com/blog",
    description: "Guides, articles, and honest advice for North Carolina business owners.",
    publisher: ORGANIZATION,
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.headline,
      url: p.url,
      datePublished: p.datePublished,
      description: p.description,
      author: { "@type": "Person", name: "Lamont Legrand" },
      publisher: ORGANIZATION,
    })),
  };
}

/**
 * Single blog post — BlogPosting.
 */
export function blogPostSchema(overrides: Record<string, unknown> = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    author: { "@type": "Person", name: "Lamont Legrand" },
    publisher: ORGANIZATION,
    ...overrides,
  };
}

/**
 * BreadcrumbList — supply an array of {name, url}.
 */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * /contact — ContactPage + ContactPoint.
 */
export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact 617 East Trust",
    url: "https://617east.com/contact",
    description: "Book a free consultation with 617 East Trust.",
    mainEntity: {
      "@type": "Organization",
      ...ORGANIZATION,
      areaServed: AREA_SERVED,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+19103151800",
        contactType: "customer support",
        email: "info@617east.com",
        areaServed: ["Sandhills", "Charlotte", "Fayetteville", "Pinehurst", "Southern Pines", "Raleigh", "NC"],
        availableLanguage: ["English"],
      },
    },
  };
}

/**
 * /about — AboutPage + optional Person.
 */
export function aboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About 617 East Trust",
    url: "https://617east.com/about",
    description: "617 East Trust is founded by Lamont Legrand, a former commercial banker and SBA lending professional.",
    mainEntity: {
      "@type": "Person",
      name: "Lamont Legrand",
      jobTitle: "Owner, 617 East Trust",
      worksFor: {
        "@type": "Organization",
        name: "617 East Trust",
      },
    },
  };
}

/**
 * Generic WebPage — for /privacy, /terms, /how-we-work.
 */
export function webPageSchema(overrides: Record<string, unknown> = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    ...overrides,
  };
}