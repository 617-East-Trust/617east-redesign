// Shared route manifest for 617 East Trust
// Single source of truth for SSG output, sitemap, redirect validation, and crawler smoke tests
// Do not let sitemap, SSG, and router definitions drift

export const PUBLIC_ROUTES = [
  "/",
  "/services/",
  "/services/llc-formation-north-carolina/",
  "/services/sba-loans-north-carolina/",
  "/services/credit-repair-north-carolina/",
  "/services/bookkeeping-north-carolina/",
  "/services/fractional-cfo-north-carolina/",
  "/services/web-design-seo-north-carolina/",
  "/how-it-works/",
  "/about/",
  "/contact/",
  "/locations/",
  "/locations/pinehurst-nc/",
  "/locations/southern-pines-nc/",
  "/locations/charlotte-nc/",
  "/locations/fayetteville-nc/",
  "/locations/raleigh-nc/",
  "/consumer-rights/",
  "/blog/",
  "/privacy/",
  "/terms/",
] as const;

export type PublicRoute = (typeof PUBLIC_ROUTES)[number];