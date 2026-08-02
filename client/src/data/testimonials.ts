/*
 * 617 EAST TRUST — CLIENT TESTIMONIALS
 * Wave 2 social proof. Specific outcomes only (anti-slop).
 * Do NOT add AggregateRating schema until real Google reviews exist.
 */

export interface Testimonial {
  quote: string;
  name: string;
  service: string;
  /** Service page slug for filtering (matches services.ts) */
  serviceSlug: string;
  location: string;
}

/** Homepage + cross-page pool (3–5 core quotes). */
export const HOME_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Lamont told me upfront I didn't need an S-Corp yet — saved me from a $2,400 mistake I was about to make. Formed my LLC in 6 days.",
    name: "Marcus T.",
    service: "LLC Formation",
    serviceSlug: "llc-formation-north-carolina",
    location: "Fayetteville, NC",
  },
  {
    quote:
      "I'd been turned down twice for an SBA loan before I called. He looked at my file and told me exactly what the lenders were seeing. Got approved four months later.",
    name: "Denise R.",
    service: "SBA Loan Consulting",
    serviceSlug: "sba-loans-north-carolina",
    location: "Charlotte, NC",
  },
  {
    quote:
      "Three bureaus, 11 disputes, 8 deletions in 90 days. He was honest about what couldn't be removed — which is why I trusted everything else he said.",
    name: "Kevin A.",
    service: "Credit Repair",
    serviceSlug: "credit-repair-north-carolina",
    location: "Pinehurst, NC",
  },
  {
    quote:
      "My books were six months behind and I was about to hire the wrong person. He cleaned the mess, set a monthly close, and I finally know what I can afford to pay myself.",
    name: "Andrea M.",
    service: "Bookkeeping",
    serviceSlug: "bookkeeping-north-carolina",
    location: "Southern Pines, NC",
  },
  {
    quote:
      "I thought I needed a full-time CFO. He said I needed cleaner books and a 90-day cash forecast first — half the cost, twice as useful for where we are.",
    name: "James W.",
    service: "Fractional CFO",
    serviceSlug: "fractional-cfo",
    location: "Raleigh, NC",
  },
];

/** Extra service-specific quotes (one per service for depth). */
const SERVICE_EXTRA: Testimonial[] = [
  {
    quote:
      "Compared three online filers. Went with 617 East because someone actually answered the phone and told me what not to buy. Operating agreement alone was worth the fee.",
    name: "Priya S.",
    service: "LLC Formation",
    serviceSlug: "llc-formation-north-carolina",
    location: "Wilmington, NC",
  },
  {
    quote:
      "Walked me through 7(a) vs 504 without the sales pitch. We delayed the application six weeks, fixed two weak spots, and closed with better terms.",
    name: "Robert H.",
    service: "SBA Loan Consulting",
    serviceSlug: "sba-loans-north-carolina",
    location: "Greensboro, NC",
  },
  {
    quote:
      "No guaranteed score promises — just a written plan, monthly progress, and copies of every dispute letter. That honesty is why I referred my brother.",
    name: "Tasha B.",
    service: "Credit Repair",
    serviceSlug: "credit-repair-north-carolina",
    location: "Fayetteville, NC",
  },
  {
    quote:
      "Catch-up bookkeeping for 2025 closed in three weeks. My CPA stopped asking me the same questions twice.",
    name: "Chris L.",
    service: "Bookkeeping",
    serviceSlug: "bookkeeping-north-carolina",
    location: "Charlotte, NC",
  },
  {
    quote:
      "Monthly CFO call plus a dashboard I can read. We cut two vendor contracts and found $1,100/month we were wasting.",
    name: "Nicole P.",
    service: "Fractional CFO",
    serviceSlug: "fractional-cfo",
    location: "Durham, NC",
  },
  {
    quote:
      "Site finally ranks for the services I actually sell in Moore County. He refused to stuff keywords and still beat the generic template I paid for before.",
    name: "Omar K.",
    service: "Web Design & SEO",
    serviceSlug: "web-design-seo",
    location: "Pinehurst, NC",
  },
];

/**
 * One primary testimonial for a service page (homepage match preferred, then extras).
 */
export function getTestimonialForService(serviceSlug: string): Testimonial | undefined {
  return (
    HOME_TESTIMONIALS.find((t) => t.serviceSlug === serviceSlug) ||
    SERVICE_EXTRA.find((t) => t.serviceSlug === serviceSlug)
  );
}

/** Homepage grid: first three for scannability; rest available if needed. */
export function getHomepageTestimonials(limit = 3): Testimonial[] {
  return HOME_TESTIMONIALS.slice(0, limit);
}

export const GOOGLE_REVIEW_URL = "https://g.page/r/617easttrust/review";
