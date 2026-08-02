/*
 * 617 EAST TRUST — City / area-served landing pages
 * Local SEO hub pages for primary NC markets.
 */

export interface LocationPageData {
  slug: string;
  city: string;
  region: string;
  state: string;
  /** Short market name for H1/meta */
  marketLabel: string;
  seoTitle: string;
  metaDescription: string;
  canonical: string;
  h1: string;
  intro: string;
  /** Local-specific bullets (real ops notes, not fluff) */
  localNotes: string[];
  /** Nearby cities for internal links */
  nearby: { name: string; slug: string }[];
  /** Primary service angles for this market */
  focusServices: {
    slug: string;
    label: string;
    blurb: string;
  }[];
  faqs: { q: string; a: string }[];
}

const BASE = "https://617east.com";

export const LOCATIONS: LocationPageData[] = [
  {
    slug: "pinehurst-nc",
    city: "Pinehurst",
    region: "Sandhills",
    state: "NC",
    marketLabel: "Pinehurst, NC",
    seoTitle: "Business Consulting Pinehurst NC | 617 East Trust",
    metaDescription:
      "LLC formation, SBA loans, credit repair, bookkeeping, and fractional CFO services in Pinehurst, NC. Local advisor based in the Sandhills — free consultation.",
    canonical: `${BASE}/locations/pinehurst-nc`,
    h1: "Business Consulting in Pinehurst, NC",
    intro:
      "617 East Trust is based in the Sandhills. If you are forming an LLC, packing an SBA loan, cleaning credit, or getting books under control in Pinehurst, you get a human advisor who will tell you what not to do — not a national filing mill.",
    localNotes: [
      "Home market — same-day response and in-person consultations available by appointment.",
      "Strong mix of professional practices, hospitality, and service businesses around the Village.",
      "Registered agent and formation work for Pinehurst addresses handled electronically with NC SOS.",
    ],
    nearby: [
      { name: "Southern Pines", slug: "southern-pines-nc" },
      { name: "Fayetteville", slug: "fayetteville-nc" },
      { name: "Charlotte", slug: "charlotte-nc" },
    ],
    focusServices: [
      {
        slug: "llc-formation-north-carolina",
        label: "LLC Formation",
        blurb: "$499 total including NC state fee, operating agreement, EIN, and first-year registered agent.",
      },
      {
        slug: "sba-loans-north-carolina",
        label: "SBA Loan Consulting",
        blurb: "Honest eligibility review before you waste months on the wrong loan package.",
      },
      {
        slug: "bookkeeping-north-carolina",
        label: "Bookkeeping",
        blurb: "Monthly close and clean books for small operators who need numbers they can trust.",
      },
    ],
    faqs: [
      {
        q: "Do you meet clients in person in Pinehurst?",
        a: "Yes — by appointment. Many engagements are fully remote; local founders often prefer an initial in-person consult.",
      },
      {
        q: "Can you form an LLC for a Pinehurst address?",
        a: "Yes. We file with the NC Secretary of State, provide registered agent service for the first year, and deliver an operating agreement and EIN as part of the $499 package.",
      },
    ],
  },
  {
    slug: "southern-pines-nc",
    city: "Southern Pines",
    region: "Sandhills",
    state: "NC",
    marketLabel: "Southern Pines, NC",
    seoTitle: "Business Consulting Southern Pines NC | 617 East Trust",
    metaDescription:
      "Business formation, SBA loan consulting, credit repair, and bookkeeping for Southern Pines, NC. Sandhills-based advisor. Free consultation — (910) 315-1800.",
    canonical: `${BASE}/locations/southern-pines-nc`,
    h1: "Business Consulting in Southern Pines, NC",
    intro:
      "Southern Pines founders get the same Sandhills-based advisory as Pinehurst: formation done right, loan packages that match lender reality, credit work that stays CROA-compliant, and books that close on time.",
    localNotes: [
      "Minutes from our home base — in-person or remote, your call.",
      "Common needs: sole props converting to LLC, short-term rental entities, and professional practices.",
      "We coordinate with your CPA or attorney when tax or legal questions fall outside advisory scope.",
    ],
    nearby: [
      { name: "Pinehurst", slug: "pinehurst-nc" },
      { name: "Fayetteville", slug: "fayetteville-nc" },
      { name: "Raleigh", slug: "raleigh-nc" },
    ],
    focusServices: [
      {
        slug: "llc-formation-north-carolina",
        label: "LLC Formation",
        blurb: "Structure guidance first — then filing, EIN, operating agreement, and BOI reporting.",
      },
      {
        slug: "credit-repair-north-carolina",
        label: "Credit Repair",
        blurb: "CROA-compliant disputes. No advance fees. No score guarantees.",
      },
      {
        slug: "fractional-cfo-north-carolina",
        label: "Fractional CFO",
        blurb: "Cash forecasts and decision support when bookkeeping alone is no longer enough.",
      },
    ],
    faqs: [
      {
        q: "Is 617 East Trust local to Southern Pines?",
        a: "Yes. We serve the Sandhills region including Southern Pines and Pinehurst, with remote coverage statewide.",
      },
      {
        q: "How fast can I start?",
        a: "Book a free consultation online or call (910) 315-1800. We typically respond within 24 hours; same-day before 3 PM EST.",
      },
    ],
  },
  {
    slug: "charlotte-nc",
    city: "Charlotte",
    region: "Metrolina",
    state: "NC",
    marketLabel: "Charlotte, NC",
    seoTitle: "Business Consulting Charlotte NC | LLC, SBA & Credit | 617 East Trust",
    metaDescription:
      "LLC formation, SBA loan consulting, credit repair, bookkeeping, and fractional CFO services for Charlotte, NC businesses. Remote-first with NC filings handled end-to-end.",
    canonical: `${BASE}/locations/charlotte-nc`,
    h1: "Business Consulting in Charlotte, NC",
    intro:
      "Charlotte moves fast. National filers will sell you a checkbox LLC; banks will take a complete SBA package. We sit in the middle as the advisor who tells you what not to file, what not to apply for, and what to fix first.",
    localNotes: [
      "Remote-first engagement with electronic NC SOS filings and registered agent coverage.",
      "Common work: multi-member LLCs, SBA packaging after bank turndowns, catch-up bookkeeping for growing operators.",
      "We understand Charlotte lender expectations without pretending every file is bankable on day one.",
    ],
    nearby: [
      { name: "Raleigh", slug: "raleigh-nc" },
      { name: "Fayetteville", slug: "fayetteville-nc" },
      { name: "Pinehurst", slug: "pinehurst-nc" },
    ],
    focusServices: [
      {
        slug: "sba-loans-north-carolina",
        label: "SBA Loan Consulting",
        blurb: "7(a) vs 504 fit, credit and cash-flow readiness, packaging support after honest eligibility review.",
      },
      {
        slug: "llc-formation-north-carolina",
        label: "LLC Formation",
        blurb: "Flat $499 including state fee — with structure advice, not just a filing receipt.",
      },
      {
        slug: "web-design-seo-north-carolina",
        label: "Web Design & SEO",
        blurb: "Conversion-focused sites for service businesses that need local Charlotte visibility.",
      },
    ],
    faqs: [
      {
        q: "Do I need to be in Charlotte for meetings?",
        a: "No. Consultations are phone or video by default. In-person can be arranged when it materially helps the engagement.",
      },
      {
        q: "Can you help after a Charlotte bank declined my SBA loan?",
        a: "Often. We review the file, name the real blockers, and only re-engage lenders when the package is stronger — not sooner.",
      },
    ],
  },
  {
    slug: "fayetteville-nc",
    city: "Fayetteville",
    region: "Cape Fear",
    state: "NC",
    marketLabel: "Fayetteville, NC",
    seoTitle: "Business Consulting Fayetteville NC | 617 East Trust",
    metaDescription:
      "LLC formation, SBA loans, credit repair, and bookkeeping for Fayetteville and Fort Liberty-area entrepreneurs. Honest NC business advisory — free consultation.",
    canonical: `${BASE}/locations/fayetteville-nc`,
    h1: "Business Consulting in Fayetteville, NC",
    intro:
      "Fayetteville and the Fort Liberty corridor produce serious operators — veterans, contractors, and service businesses that need clean entities, usable credit, and lender-ready numbers. We give straight answers, not sales scripts.",
    localNotes: [
      "Frequent work with veteran-owned and military-spouse businesses (entity choice, credit, SBA readiness).",
      "Close enough for coordinated Sandhills in-person when needed; remote always available.",
      "BOI reporting and annual-report cadence built into formation follow-through.",
    ],
    nearby: [
      { name: "Pinehurst", slug: "pinehurst-nc" },
      { name: "Southern Pines", slug: "southern-pines-nc" },
      { name: "Raleigh", slug: "raleigh-nc" },
    ],
    focusServices: [
      {
        slug: "llc-formation-north-carolina",
        label: "LLC Formation",
        blurb: "Right entity first. Then Articles, EIN, operating agreement, and registered agent.",
      },
      {
        slug: "credit-repair-north-carolina",
        label: "Credit Repair",
        blurb: "Dispute inaccurate items the right way. Written plan. No advance fees.",
      },
      {
        slug: "sba-loans-north-carolina",
        label: "SBA Loan Consulting",
        blurb: "Eligibility truth before application. Packaging when you are actually ready.",
      },
    ],
    faqs: [
      {
        q: "Do you work with veteran-owned businesses in Fayetteville?",
        a: "Yes. Formation, credit readiness, and SBA packaging for veteran and military-family operators are a regular part of our work.",
      },
      {
        q: "How much is LLC formation?",
        a: "$499 total including the $125 NC state filing fee, first-year registered agent, operating agreement, EIN, and BOI guidance.",
      },
    ],
  },
  {
    slug: "raleigh-nc",
    city: "Raleigh",
    region: "Triangle",
    state: "NC",
    marketLabel: "Raleigh, NC",
    seoTitle: "Business Consulting Raleigh NC | LLC, SBA & CFO | 617 East Trust",
    metaDescription:
      "Business formation, SBA consulting, credit repair, bookkeeping, and fractional CFO services for Raleigh and Triangle founders. Advisor-led — free consultation.",
    canonical: `${BASE}/locations/raleigh-nc`,
    h1: "Business Consulting in Raleigh, NC",
    intro:
      "Triangle founders often need speed without sloppiness: correct entity structure, bankable financials, and SEO that ranks for services you actually sell. 617 East Trust is the advisor who will slow you down when that is the cheaper path.",
    localNotes: [
      "Remote-first for Raleigh / Durham / Chapel Hill; statewide NC filings handled electronically.",
      "Typical clients: consultants, tech-adjacent operators, professional services, multi-entity owners.",
      "Fractional CFO engagements usually start after books are clean — we will say so if you are not there yet.",
    ],
    nearby: [
      { name: "Charlotte", slug: "charlotte-nc" },
      { name: "Fayetteville", slug: "fayetteville-nc" },
      { name: "Pinehurst", slug: "pinehurst-nc" },
    ],
    focusServices: [
      {
        slug: "fractional-cfo-north-carolina",
        label: "Fractional CFO",
        blurb: "Cash flow, forecasts, and growth decisions without a full-time CFO salary.",
      },
      {
        slug: "llc-formation-north-carolina",
        label: "LLC Formation",
        blurb: "Formation with operating agreement and post-filing checklist — not a bare SOS receipt.",
      },
      {
        slug: "web-design-seo-north-carolina",
        label: "Web Design & SEO",
        blurb: "Sites built to convert Triangle buyers, not to look like a template.",
      },
    ],
    faqs: [
      {
        q: "Do you serve the whole Triangle?",
        a: "Yes — Raleigh, Durham, Chapel Hill, Cary, and surrounding markets via remote engagement with NC-compliant filings.",
      },
      {
        q: "When do I need a fractional CFO vs a bookkeeper?",
        a: "Bookkeeping records history. A fractional CFO drives decisions from that history. If cash is chaotic and books are messy, we fix books first.",
      },
    ],
  },
];

export function getLocationBySlug(slug: string): LocationPageData | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}

export function locationPath(slug: string): string {
  return `/locations/${slug}`;
}
