/* 617 EAST TRUST — PRIVACY POLICY PAGE
 * Last updated: July 2026
 * Midnight Ledger design system. Umami-only analytics, no third-party tracking.
 */

import Layout from "@/components/Layout";

const PRIVACY_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Privacy Policy — 617 East Trust",
  "description": "How 617 East Trust collects, uses, and protects your information.",
  "url": "https://617east.com/privacy"
};

const sections = [
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
    body: "Information submitted through our contact form is transmitted to our internal systems via a secure endpoint. This data is used solely to respond to your inquiry and is not shared with third parties."
  },
  {
    title: "Data Sharing",
    body: "617 East Trust does not sell, rent, or share your personal information with third parties for any purpose. We use no advertising networks, no retargeting, and no third-party trackers."
  },
  {
    title: "Analytics and Tracking",
    body: "We use Umami Analytics, a privacy-respecting analytics platform that does not track individual users across sites, does not use cookies for tracking, and collects no personal information. The data we see includes pages visited, browser type, and device category at an aggregate level only. Umami is self-hosted on our infrastructure and no data is shared with third parties."
  },
  {
    title: "Cookies and Consent",
    body: "This website uses Umami Analytics for anonymous usage statistics. Umami does not use cookies and does not track individual visitors. A consent banner is displayed on your first visit for transparency. If you decline, no analytics scripts are loaded. Your consent preference is stored in your browser's localStorage and expires when you clear your browser data. You may change your preference at any time by clearing your browser's localStorage for 617east.com."
  },
  {
    title: "Third-Party Services",
    body: "This website uses no third-party analytics, advertising, or tracking services other than the self-hosted Umami instance described above. No data is sold to any third party."
  },
  {
    title: "Your Rights",
    body: "You have the right to request access to, correction of, or deletion of your personal information. To exercise these rights, contact us at info@617east.com."
  },
  {
    title: "California Residents (CCPA)",
    body: "If you are a California resident, you have the right to know what personal information we collect, the right to delete your personal information, and the right to opt out of the sale of personal information. 617 East Trust does not sell personal information. To exercise your rights under the California Consumer Privacy Act, contact us at info@617east.com."
  },
  {
    title: "Data Retention",
    body: "We retain contact form submissions and client communications for the duration of our business relationship and as required by applicable law."
  },
  {
    title: "Contact",
    body: "For privacy-related questions, contact us at info@617east.com or (910) 315-1800."
  },
];

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
            {sections.map((s, i) => (
              <div key={i}>
                <h2 className="text-xl font-medium mb-2" style={{ color: "oklch(0.85 0.008 80)" }}>
                  {s.title}
                </h2>
                <p className="text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
