/*
 * 617 EAST TRUST — TERMS OF SERVICE PAGE
 * Midnight Ledger design system.
 */

import Layout from "@/components/Layout";

const TERMS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Terms of Service — 617 East Trust",
  "description": "Terms of service for 617east.com and 617 East Trust advisory services.",
  "url": "https://617east.com/terms"
};

export default function Terms() {
  return (
    <Layout
      pageSchema={TERMS_SCHEMA}
      title="Terms of Service | 617 East Trust"
      description="Terms of service for 617east.com and 617 East Trust advisory services."
      canonical="https://617east.com/terms"
    >
      <section className="pt-32 pb-24" style={{ background: "oklch(0.10 0.008 240)" }}>
        <div className="container max-w-3xl">
          <span className="section-label">Legal</span>
          <div className="gold-rule" />
          <h1 className="text-4xl font-semibold mb-4" style={{ color: "oklch(0.94 0.005 80)" }}>
            Terms of Service
          </h1>
          <p className="text-sm mb-12" style={{ color: "oklch(0.45 0.007 80)" }}>
            Last updated: July 2026
          </p>

          <div className="space-y-10" style={{ color: "oklch(0.62 0.010 80)" }}>
            {[
              {
                title: "Nature of Services",
                body: "617 East Trust provides business advisory, financial consulting, and administrative services. We are not a law firm and do not provide legal advice. We are not a CPA firm and do not provide tax advice. Our services are advisory in nature."
              },
              {
                title: "No Guarantees",
                body: "We do not guarantee specific outcomes, including but not limited to: credit score increases, loan approvals, business formation timelines (beyond our control of the NC Secretary of State), or revenue increases from web design or SEO services. We provide honest assessments and professional service."
              },
              {
                title: "Fees and Payment",
                body: "Service fees are disclosed prior to engagement. Monthly retainer services (bookkeeping, credit repair, fractional CFO) are billed monthly and may be cancelled with 30 days written notice. Project-based fees are due per the agreed payment schedule."
              },
              {
                title: "Confidentiality",
                body: "We treat all client information as confidential and do not share it with third parties except as required to provide our services (e.g., filing with the NC Secretary of State) or as required by law."
              },
              {
                title: "Limitation of Liability",
                body: "617 East Trust's liability for any claim arising from our services is limited to the fees paid for the specific service giving rise to the claim. We are not liable for indirect, consequential, or incidental damages."
              },
              {
                title: "Governing Law",
                body: "These terms are governed by the laws of the State of North Carolina. Any disputes shall be resolved in the courts of Moore County, North Carolina."
              },
              {
                title: "Contact",
                body: "For questions about these terms, contact us at info@617east.com or (910) 315-1800."
              }
            ].map((section) => (
              <div key={section.title}>
                <h2 className="text-lg font-semibold mb-3" style={{ color: "oklch(0.88 0.008 80)" }}>
                  {section.title}
                </h2>
                <p className="text-sm leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

