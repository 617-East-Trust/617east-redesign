/*
 * 617 EAST TRUST — SERVICE DATA
 * Single source of truth for all service content, schema, and SEO metadata.
 */

export interface ServiceData {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  canonical: string;
  h1: string;
  tagline: string;
  price: string;
  priceNote: string;
  timeline: string;
  intro: string;
  whatsIncluded: string[];
  notIncluded?: string[];
  faqs: { q: string; a: string }[];
  schema: object;
}

const BASE_PROVIDER = {
  "@type": "Organization",
  "name": "617 East Trust",
  "url": "https://617east.com",
  "telephone": "+19103151800",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Sandhills",
    "addressRegion": "NC",
    "addressCountry": "US"
  }
};

const AREA_SERVED = [
  { "@type": "City", "name": "Pinehurst", "addressRegion": "NC" },
  { "@type": "City", "name": "Southern Pines", "addressRegion": "NC" },
  { "@type": "City", "name": "Charlotte", "addressRegion": "NC" },
  { "@type": "City", "name": "Fayetteville", "addressRegion": "NC" },
  { "@type": "City", "name": "Raleigh", "addressRegion": "NC" }
];

export const SERVICES: ServiceData[] = [
  {
    slug: "llc-formation-north-carolina",
    title: "LLC Formation in North Carolina",
    seoTitle: "LLC Formation North Carolina | 617 East Trust — $499 Total",
    metaDescription: "Form your North Carolina LLC with 617 East Trust. $499 total (includes $125 NC state fee). Operating agreement, EIN, registered agent. 5–10 business days.",
    canonical: "https://617east.com/services/llc-formation-north-carolina",
    h1: "LLC Formation in North Carolina",
    tagline: "The right structure for your situation — not the easiest one to sell you.",
    price: "$499",
    priceNote: "Total cost including $125 NC state filing fee. Expedited: +$200.",
    timeline: "5–10 business days standard. 1–3 days expedited.",
    intro: "Forming an LLC in North Carolina costs $125 in state fees. We charge $499 total — and for that, you get more than a filing. You get an advisor who will tell you if an LLC is actually the right structure for your situation, what your operating agreement needs to say, and what you need to do after formation to protect your liability shield.",
    whatsIncluded: [
      "Articles of Organization filed with NC Secretary of State",
      "Registered agent service (first year)",
      "Custom operating agreement",
      "EIN application with the IRS",
      "Initial BOI (Beneficial Ownership Information) report",
      "NC annual report reminder and guidance",
      "Post-formation checklist and next steps",
    ],
    notIncluded: [
      "Legal advice (we are not a law firm)",
      "Tax advice (we are not a CPA firm)",
      "Business licenses (varies by industry and municipality)",
    ],
    faqs: [
      { q: "How much does it cost to form an LLC in North Carolina?", a: "The NC Secretary of State charges $125 to file Articles of Organization. 617 East Trust charges $499 total, which includes the state fee, registered agent service for the first year, operating agreement, and EIN." },
      { q: "How long does LLC formation take in NC?", a: "Standard processing is 5–10 business days. Expedited processing (add $200) takes 1–3 business days." },
      { q: "Do I need an operating agreement in North Carolina?", a: "NC does not legally require an operating agreement, but you should have one. Without it, your LLC is governed by default NC statutes, which may not reflect your intentions. We include a custom operating agreement in every formation." },
      { q: "What is BOI reporting and do I need it?", a: "The Corporate Transparency Act requires most LLCs to file a Beneficial Ownership Information report with FinCEN. We handle this as part of your formation." },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "LLC Formation in North Carolina",
      "description": "North Carolina LLC formation service including Articles of Organization, registered agent, operating agreement, EIN, and BOI report.",
      "provider": BASE_PROVIDER,
      "areaServed": AREA_SERVED,
      "offers": {
        "@type": "Offer",
        "price": "499",
        "priceCurrency": "USD",
        "description": "Total cost including $125 NC state filing fee"
      }
    }
  },
  {
    slug: "sba-loans-north-carolina",
    title: "SBA Loan Consulting in North Carolina",
    seoTitle: "SBA Loan Consultant North Carolina | 617 East Trust",
    metaDescription: "SBA 7(a) and 504 loan consulting in North Carolina. We tell you if you qualify before you waste time applying. Banking background, honest assessment.",
    canonical: "https://617east.com/services/sba-loans-north-carolina",
    h1: "SBA Loan Consulting in North Carolina",
    tagline: "We tell you if you qualify before you waste time applying.",
    price: "Consulting",
    priceNote: "Fee discussed after initial assessment. No charge for the first consultation.",
    timeline: "Assessment first. Application support varies by loan type.",
    intro: "SBA loans are not for everyone. The application process is extensive, the requirements are specific, and the most common outcome for unprepared applicants is rejection — which can damage your credit and your relationship with lenders. We start with an honest assessment of your eligibility before we recommend you apply for anything.",
    whatsIncluded: [
      "SBA 7(a) and 504 loan eligibility assessment",
      "Business and personal financial review",
      "Lender matching and introduction",
      "Application preparation and documentation support",
      "Business plan review and financial projection guidance",
      "Ongoing communication with lender on your behalf",
    ],
    faqs: [
      { q: "What is an SBA 7(a) loan?", a: "The SBA 7(a) is the most common SBA loan program, offering up to $5 million for working capital, equipment, real estate, and business acquisition. The SBA guarantees a portion of the loan, reducing lender risk and making approval more accessible for small businesses." },
      { q: "What is the difference between SBA 7(a) and 504 loans?", a: "SBA 7(a) loans are flexible and can be used for most business purposes. SBA 504 loans are specifically for major fixed assets like real estate and heavy equipment, and are structured with a bank, a Certified Development Company, and the borrower." },
      { q: "What credit score do I need for an SBA loan?", a: "Most SBA lenders want to see a personal credit score of at least 650–680. However, credit score is just one factor. Business revenue, time in business, collateral, and industry all matter. We assess your complete picture." },
      { q: "How long does the SBA loan process take?", a: "SBA 7(a) loans typically take 60–90 days from application to funding. SBA Express loans can close in 30–45 days. We help you prepare so you don't add unnecessary time to the process." },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "SBA Loan Consulting in North Carolina",
      "description": "SBA 7(a) and 504 loan consulting, eligibility assessment, and application support for North Carolina small businesses.",
      "provider": BASE_PROVIDER,
      "areaServed": AREA_SERVED
    }
  },
  {
    slug: "credit-repair-north-carolina",
    title: "Credit Repair in North Carolina",
    seoTitle: "Credit Repair North Carolina | 617 East Trust — Honest, Legal, Effective",
    metaDescription: "Credit repair services in North Carolina. Dispute inaccurate items, build positive history. No guarantees — just honest, legal, effective work. Starting $199/mo.",
    canonical: "https://617east.com/services/credit-repair-north-carolina",
    h1: "Credit Repair in North Carolina",
    tagline: "No guarantees. Just honest, legal, effective work.",
    price: "Starting $199/mo",
    priceNote: "Monthly retainer. Cancel anytime. No long-term contracts.",
    timeline: "Most clients see meaningful improvement in 3–6 months.",
    intro: "Credit repair is legal, regulated, and effective — when done correctly. We dispute inaccurate, incomplete, or unverifiable items on your credit report under the Fair Credit Reporting Act. We do not promise specific score increases. We do not use illegal tactics. We tell you exactly what is disputable, what the realistic outcome looks like, and what you need to do on your end to build positive history.",
    whatsIncluded: [
      "Full credit report review (all three bureaus)",
      "Identification of disputable negative items",
      "Dispute letters drafted and submitted on your behalf",
      "Bureau follow-up and escalation",
      "Monthly progress reporting",
      "Credit-building strategy and guidance",
      "Debt validation requests where applicable",
    ],
    notIncluded: [
      "Guaranteed score increases (no one can legally promise this)",
      "Removal of accurate, verifiable negative items",
      "Legal representation",
    ],
    faqs: [
      { q: "Can credit repair remove accurate negative items?", a: "No. Accurate, verifiable negative information cannot be legally removed from your credit report. Anyone who claims otherwise is misleading you. We dispute inaccurate, incomplete, or unverifiable items — which is your legal right under the FCRA." },
      { q: "How long does credit repair take in North Carolina?", a: "Most clients see meaningful improvement within 3–6 months. The timeline depends on the number and type of negative items, how quickly the bureaus respond, and whether creditors verify or delete disputed items." },
      { q: "What is the Fair Credit Reporting Act (FCRA)?", a: "The FCRA is the federal law that governs credit reporting. It gives you the right to dispute inaccurate information, requires bureaus to investigate disputes within 30 days, and mandates that unverifiable items be removed." },
      { q: "Do I need a credit repair company, or can I do it myself?", a: "You can dispute items yourself for free. We provide value through experience, volume, and follow-through — we know which disputes are worth filing, how to escalate, and how to build a strategy around your specific profile." },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Credit Repair in North Carolina",
      "description": "Credit repair services in North Carolina. FCRA-compliant dispute process, bureau follow-up, and credit-building strategy.",
      "provider": BASE_PROVIDER,
      "areaServed": AREA_SERVED,
      "offers": {
        "@type": "Offer",
        "price": "199",
        "priceCurrency": "USD",
        "priceSpecification": { "@type": "UnitPriceSpecification", "unitCode": "MON" },
        "description": "Monthly retainer, cancel anytime"
      }
    }
  },
  {
    slug: "bookkeeping-north-carolina",
    title: "Bookkeeping Services in North Carolina",
    seoTitle: "Bookkeeping Services North Carolina | 617 East Trust — $199/mo",
    metaDescription: "Small business bookkeeping in North Carolina. Clean books, reconciled accounts, monthly reporting. $199/month. The financial foundation every business needs.",
    canonical: "https://617east.com/services/bookkeeping-north-carolina",
    h1: "Bookkeeping Services in North Carolina",
    tagline: "Clean books are the foundation of every financial decision you'll make.",
    price: "$199/mo",
    priceNote: "Monthly retainer. Includes up to 150 transactions/month.",
    timeline: "Monthly. Catch-up bookkeeping available for prior periods.",
    intro: "Most small business owners know their bookkeeping is behind. The problem is that messy books don't just cause stress — they make it impossible to get an SBA loan, work with a Fractional CFO, or make informed decisions about your business. We provide clean, accurate, monthly bookkeeping so you always know where you stand.",
    whatsIncluded: [
      "Monthly transaction categorization and reconciliation",
      "Bank and credit card account reconciliation",
      "Monthly Profit & Loss statement",
      "Monthly Balance Sheet",
      "Accounts payable and receivable tracking",
      "Year-end financial package for your CPA",
      "Catch-up bookkeeping for prior periods (quoted separately)",
    ],
    faqs: [
      { q: "What accounting software do you use?", a: "We work in QuickBooks Online, which is the standard for small business bookkeeping and integrates with most payroll, banking, and tax platforms." },
      { q: "Do I need bookkeeping if I have an accountant?", a: "Yes. Your accountant or CPA prepares your taxes — they need clean books to do that. Bookkeeping is the ongoing process of recording and categorizing transactions. Your accountant uses that work at tax time." },
      { q: "What is catch-up bookkeeping?", a: "If your books are behind by months or years, catch-up bookkeeping brings them current. We quote catch-up work separately based on the volume of transactions and the state of your records." },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Bookkeeping Services in North Carolina",
      "description": "Monthly small business bookkeeping in North Carolina. QuickBooks Online, reconciliation, P&L, balance sheet.",
      "provider": BASE_PROVIDER,
      "areaServed": AREA_SERVED,
      "offers": {
        "@type": "Offer",
        "price": "199",
        "priceCurrency": "USD",
        "priceSpecification": { "@type": "UnitPriceSpecification", "unitCode": "MON" }
      }
    }
  },
  {
    slug: "fractional-cfo",
    title: "Fractional CFO Services",
    seoTitle: "Fractional CFO North Carolina | 617 East Trust — Strategic Financial Leadership",
    metaDescription: "Fractional CFO services in North Carolina. Strategic financial leadership without a full-time hire. Cash flow, forecasting, and the decisions that matter. $1,200/mo.",
    canonical: "https://617east.com/services/fractional-cfo",
    h1: "Fractional CFO Services",
    tagline: "Strategic financial leadership. Without the full-time cost.",
    price: "$1,200/mo",
    priceNote: "Monthly retainer. Scope and hours defined at engagement start.",
    timeline: "Ongoing engagement. Minimum 3-month commitment.",
    intro: "A Fractional CFO is a senior financial executive who works with your business part-time. You get the strategic financial leadership of a CFO — cash flow management, financial forecasting, lender relationships, and high-stakes financial decisions — without the $150,000+ annual salary. We work with businesses that have outgrown their bookkeeper but aren't ready for a full-time CFO.",
    whatsIncluded: [
      "Monthly financial review and strategic advisory",
      "Cash flow forecasting and management",
      "Financial modeling and scenario planning",
      "Budget development and variance analysis",
      "Lender and investor relationship support",
      "KPI development and dashboard reporting",
      "Support for SBA loan applications and due diligence",
    ],
    faqs: [
      { q: "What is the difference between a bookkeeper, accountant, and CFO?", a: "A bookkeeper records transactions. An accountant prepares financial statements and tax returns. A CFO provides strategic financial leadership — interpreting the numbers, forecasting, managing cash flow, and advising on major financial decisions. A Fractional CFO does CFO-level work on a part-time basis." },
      { q: "When does a business need a Fractional CFO?", a: "Typically when revenue exceeds $500K–$1M annually, when you're preparing for a significant loan or investment, when cash flow is unpredictable, or when you're making financial decisions without a clear picture of your numbers." },
      { q: "Do you work with businesses outside North Carolina?", a: "Yes. Fractional CFO work is largely remote. We serve clients across NC and can work with businesses in other states." },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Fractional CFO Services",
      "description": "Part-time strategic financial leadership for North Carolina small businesses. Cash flow, forecasting, lender relationships.",
      "provider": BASE_PROVIDER,
      "areaServed": AREA_SERVED,
      "offers": {
        "@type": "Offer",
        "price": "1200",
        "priceCurrency": "USD",
        "priceSpecification": { "@type": "UnitPriceSpecification", "unitCode": "MON" }
      }
    }
  },
  {
    slug: "web-design-seo",
    title: "Web Design & SEO Services",
    seoTitle: "Web Design & SEO North Carolina | 617 East Trust — Sites That Rank",
    metaDescription: "Web design and SEO services in North Carolina. Sites that rank on Google and convert visitors. From $1,500. Built for search engines and real humans.",
    canonical: "https://617east.com/services/web-design-seo",
    h1: "Web Design & SEO Services",
    tagline: "Built for search engines and real humans — not just to look good in a screenshot.",
    price: "From $1,500",
    priceNote: "Project-based pricing. SEO retainers from $500/mo.",
    timeline: "4–6 weeks for new sites. SEO results in 3–6 months.",
    intro: "We build websites that rank on Google and convert visitors into clients. That means technical SEO built in from day one — not added as an afterthought. Static site generation so every page has unique, indexable content. Schema markup so Google understands what you do. And copy that sounds like a real business, not a template.",
    whatsIncluded: [
      "Custom design and development (React + Vite + Tailwind)",
      "Static site generation for full SEO indexability",
      "On-page SEO: titles, meta, headings, schema markup",
      "Google Search Console and Analytics setup",
      "Contact form with n8n webhook integration",
      "Mobile-responsive, accessible, fast-loading",
      "Sitemap, robots.txt, OG images",
    ],
    faqs: [
      { q: "Why do most small business websites not rank on Google?", a: "The most common reason is that they are single-page applications (SPAs) — Google sees one page for every URL. We build with static site generation so every page has unique, indexable HTML content." },
      { q: "How long does SEO take to show results?", a: "Meaningful organic traffic typically takes 3–6 months for a new site. Technical SEO fixes (like fixing an SPA problem) can show results faster. We set realistic expectations from day one." },
      { q: "Do you offer ongoing SEO services?", a: "Yes. SEO retainers start at $500/month and include content strategy, technical monitoring, and reporting." },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Web Design & SEO Services",
      "description": "Custom web design and SEO services in North Carolina. Static site generation, schema markup, and conversion-focused design.",
      "provider": BASE_PROVIDER,
      "areaServed": AREA_SERVED,
      "offers": {
        "@type": "Offer",
        "price": "1500",
        "priceCurrency": "USD",
        "description": "Starting price for new website projects"
      }
    }
  }
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES.find(s => s.slug === slug);
}
