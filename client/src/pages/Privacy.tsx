/*
 * 617 EAST TRUST — PRIVACY POLICY PAGE
 * Midnight Ledger design system.
 */

import Layout from "@/components/Layout";

const PRIVACY_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Privacy Policy — 617 East Trust",
  "description": "Privacy policy for 617east.com. How we collect, use, and protect your information.",
  "url": "https://617east.com/privacy"
};

export default function Privacy() {
  return (
    <Layout
      pageSchema={PRIVACY_SCHEMA}
      title="Privacy Policy | 617 East Trust"
      description="Privacy policy for 617east.com. How we collect, use, and protect your information."
      canonical="https://617east.com/privacy"
    >
      <section className="pt-32 pb-24" style={{ background: "oklch(0.10 0.008 240)" }}>
        <div className="container max-w-3xl">
          <span className="section-label">Legal</span>
          <div className="gold-rule" />
          <h1 className="text-4xl font-semibold mb-4" style={{ color: "oklch(0.94 0.005 80)" }}>
            Privacy Policy
          </h1>
          <p className="text-sm mb-12" style={{ color: "oklch(0.45 0.007 80)" }}>
            Last updated: July 2026
          </p>

          <div className="space-y-10" style={{ color: "oklch(0.62 0.010 80)" }}>
            {[
              {
                title: "Information We Collect",
                body: "We collect information you provide directly to us, including your name, email address, phone number, and the content of messages you send through our contact form. We also collect standard server logs including IP addresses and browser information."
              },
              {
                title: "How We Use Your Information",
                body: "We use the information you provide to respond to your inquiries, provide our services, and communicate with you about your engagement with 617 East Trust. We do not sell, rent, or share your personal information with third parties for marketing purposes."
              },
              {
                title: "Contact Form Data",
                body: "Information submitted through our contact form is transmitted to our internal systems via a secure webhook. This data is used solely to respond to your inquiry and is not shared with third parties."
              },
              {
                title: "Analytics",
                body: "We use privacy-respecting analytics to understand how visitors use our website. This data is aggregated and does not identify individual visitors."
              },
              {
                title: "Data Retention",
                body: "We retain contact form submissions and client communications for the duration of our business relationship and as required by applicable law."
              },
              {
                title: "Your Rights",
                body: "You have the right to request access to, correction of, or deletion of your personal information. To exercise these rights, contact us at info@617east.com."
              },
              {
                title: "Contact",
                body: "For privacy-related questions, contact us at info@617east.com or (910) 315-1800."
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
