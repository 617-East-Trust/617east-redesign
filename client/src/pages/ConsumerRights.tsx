/*
 * 617 EAST TRUST — CONSUMER RIGHTS / CROA DISCLOSURES
 * Crawlable + interactive page for Wave 1 Legal gate.
 */

import Layout from "@/components/Layout";

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Consumer Rights & CROA Disclosures — 617 East Trust",
  description:
    "Your federal credit-repair rights under the Credit Repair Organizations Act: no advance fees, written contract, 3-day cancellation right, and accurate disclosures.",
  url: "https://617east.com/consumer-rights",
  about: {
    "@type": "Legislation",
    name: "Credit Repair Organizations Act (CROA)",
    legislationJurisdiction: "US",
  },
};

const RIGHTS = [
  {
    title: "Dispute free with the credit bureaus",
    body: "You have a right to dispute inaccurate information in your credit report by contacting the credit bureau directly, at no charge. You do not need to pay anyone to dispute information on your behalf.",
  },
  {
    title: "Written service agreement",
    body: "Any credit repair company you hire must give you a copy of Consumer Credit File Rights Under State and Federal Law before you sign a contract. 617 East Trust provides a written service agreement describing services, total cost, estimated timeline, and cancellation rights before any credit-repair work begins.",
  },
  {
    title: "3 business day right to cancel",
    body: "You have the right to cancel your contract with 617 East Trust for any reason within 3 business days from the date you signed it — without penalty or obligation. Cancellation must be submitted in writing to info@617east.com.",
  },
  {
    title: "No advance fees",
    body: "617 East Trust will not charge or collect any money from you before the promised credit-repair services for that billing period have been fully performed. Monthly fees are collected after services are delivered for that month, not in advance.",
  },
  {
    title: "Accurate disclosures — no guarantees of outcomes",
    body: "Under the Credit Repair Organizations Act, no credit repair organization may guarantee the removal of accurate, timely information from your credit report or guarantee a specific score increase. 617 East Trust makes no such guarantee.",
  },
  {
    title: "Right to report violations",
    body: "You may report suspected violations to the Consumer Financial Protection Bureau (CFPB) or the Federal Trade Commission (FTC).",
  },
];

export default function ConsumerRights() {
  return (
    <Layout
      pageSchema={SCHEMA}
      title="Consumer Rights & CROA Disclosures — 617 East Trust"
      description="Your federal credit-repair rights: no advance fees, written contract, 3-day cancellation right, and full disclosure under the Credit Repair Organizations Act."
      canonical="https://617east.com/consumer-rights"
    >
      <section className="pt-32 pb-24" style={{ background: "oklch(0.10 0.008 240)" }}>
        <div className="container max-w-3xl">
          <span className="section-label">Legal</span>
          <div className="gold-rule" />
          <h1 className="text-4xl font-semibold mb-4" style={{ color: "oklch(0.94 0.005 80)" }}>
            Your Consumer Rights — CROA Disclosures
          </h1>
          <p className="text-sm mb-10" style={{ color: "oklch(0.45 0.007 80)" }}>
            Credit Repair Organizations Act, 15 U.S.C. § 1679 et seq. · North Carolina Credit Repair
            Services Act, N.C. Gen. Stat. § 66-220 et seq.
          </p>

          <div className="space-y-8" style={{ color: "oklch(0.62 0.010 80)" }}>
            {RIGHTS.map((item) => (
              <div key={item.title}>
                <h2 className="text-lg font-semibold mb-2" style={{ color: "oklch(0.88 0.008 80)" }}>
                  {item.title}
                </h2>
                <p className="text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-sm" style={{ background: "oklch(0.13 0.009 240)", border: "1px solid oklch(0.22 0.008 240)" }}>
            <p className="text-sm" style={{ color: "oklch(0.65 0.010 80)" }}>
              Questions about credit repair or these rights?{" "}
              <a href="/services/credit-repair-north-carolina" style={{ color: "oklch(0.78 0.12 80)" }}>
                Credit repair service page
              </a>
              {" · "}
              <a href="tel:+19103151800" style={{ color: "oklch(0.78 0.12 80)" }}>
                (910) 315-1800
              </a>
              {" · "}
              <a href="mailto:info@617east.com" style={{ color: "oklch(0.78 0.12 80)" }}>
                info@617east.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
