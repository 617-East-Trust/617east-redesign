/*
 * 617 EAST TRUST — APPROVED LOGO REFERENCE
 * Midnight Ledger design system.
 */

import Layout from "@/components/Layout";
import BrandLogo from "@/components/BrandLogo";

const DETAILS = [
  {
    label: "Format",
    value: "Circular seal",
    description: "A complete, self-contained mark for navigation, social profiles, documents, and small-format applications.",
  },
  {
    label: "Visual language",
    value: "Gold engraving on midnight",
    description: "Charlotte's skyline, pinecone, needles, and roots express regional grounding, growth, and financial stewardship.",
  },
  {
    label: "Production assets",
    value: "AVIF, WebP, PNG, ICO",
    description: "The site serves responsive AVIF/WebP sources with a PNG fallback; the favicon and touch icon use the same approved seal.",
  },
];

export default function LogoConcepts() {
  return (
    <Layout
      title="Approved Brand Mark | 617 East Trust"
      description="The approved 617 East Trust brand mark and usage reference."
    >
      <section className="pt-32 pb-20" style={{ background: "oklch(0.10 0.008 240)" }}>
        <div className="container">
          <span className="section-label">Brand Reference</span>
          <div className="gold-rule" />
          <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-12 lg:gap-20 items-center">
            <div
              className="flex items-center justify-center p-8 sm:p-12"
              style={{
                background: "oklch(0.08 0.006 240)",
                border: "1px solid oklch(0.78 0.12 80 / 0.4)",
                boxShadow: "0 24px 80px oklch(0 0 0 / 0.35)",
              }}
            >
              <BrandLogo size={360} alt="617 East Trust circular seal" />
            </div>

            <div>
              <p className="font-mono text-xs mb-3" style={{ color: "oklch(0.78 0.12 80)", letterSpacing: "0.16em" }}>
                APPROVED MARK
              </p>
              <h1 className="font-display text-4xl md:text-5xl mb-5" style={{ color: "oklch(0.94 0.005 80)", lineHeight: 1.08 }}>
                617 East Trust
              </h1>
              <p className="text-base leading-relaxed mb-8" style={{ color: "oklch(0.62 0.010 80)", maxWidth: "600px" }}>
                The 617 East Trust seal is the production identity across the website. It brings together Charlotte's skyline, a pinecone, living roots, and pine needles in a fine-line, gold-on-midnight composition.
              </p>

              <div className="space-y-5">
                {DETAILS.map((detail) => (
                  <div key={detail.label} className="pl-5" style={{ borderLeft: "2px solid oklch(0.78 0.12 80 / 0.65)" }}>
                    <p className="font-mono text-xs mb-1" style={{ color: "oklch(0.78 0.12 80)", letterSpacing: "0.12em" }}>
                      {detail.label.toUpperCase()} · {detail.value.toUpperCase()}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "oklch(0.58 0.010 80)" }}>
                      {detail.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
