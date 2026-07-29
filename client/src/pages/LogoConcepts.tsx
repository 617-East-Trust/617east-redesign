/*
 * 617 EAST TRUST — LOGO CONCEPTS GALLERY
 * Internal review page for logo design concepts.
 * Midnight Ledger design system.
 */

import Layout from "@/components/Layout";

const FINALS = [
  {
    id: "A",
    name: "Hybrid Final — Variation A",
    description: "Circular seal format with double-ring border. Fine-line engraving texture throughout. Charlotte skyline rising from pine cone crown, needle branches spreading wide, root system below. All gold on dark.",
    src: "/images/logo-final-B-transparent_bbde9f45.png",
    bg: "oklch(0.10 0.008 240)",
  },
  {
    id: "B",
    name: "Hybrid Final — Variation B",
    description: "Single bold ring with inner accent ring. Tighter circular composition, skyline grows directly from pine cone top. Slightly warmer gold tone. More compact — ideal for small sizes like favicon and app icon.",
    src: "/images/logo-final-B_78ad86f2.png",
    bg: "oklch(0.10 0.008 240)",
  },
];

const CONCEPTS = [
  {
    id: "01",
    name: "Fine Line Engraving",
    style: "Intaglio / Currency Print",
    description: "Single-color warm gold on black. Ultra-fine crosshatch engraving texture — the aesthetic of premium bank notes and historic seals. The Charlotte skyline grows directly from the pine cone crown. Most distinctive and ownable of the four concepts.",
    bestFor: "Header mark, dark backgrounds, embossed print materials",
    src: "/images/logo-v1-dark-bg_5d10085c.png",
    bg: "oklch(0.10 0.008 240)",
  },
  {
    id: "02",
    name: "Geometric Crest",
    style: "Modern Architectural / Shield",
    description: "Two-color burgundy and gold crest. The skyline and pine cone are reduced to clean geometric shapes — angular buildings, stacked diamond pine scales. Strong and bold at small sizes. Feels like a financial institution or private equity firm.",
    bestFor: "App icon, business cards, embossed letterhead",
    src: "/images/logo-v1-dark-bg_5d10085c.png",
    bg: "oklch(0.97 0.005 80)",
  },
  {
    id: "03",
    name: "Institutional Seal",
    style: "Circular Emblem / Notary Stamp",
    description: "The original logo concept refined — circular seal with arched type, detailed skyline, gold pine cone, and root system. Burgundy and gold two-color. Communicates deep institutional credibility. Closest to the existing brand mark.",
    bestFor: "Official documents, website hero, trust-building contexts",
    src: "/images/logo-final-B-transparent_bbde9f45.png",
    bg: "oklch(0.97 0.005 80)",
  },
  {
    id: "04",
    name: "Editorial Wordmark",
    style: "Typography-Forward / Private Equity",
    description: "The brand name is the hero. Large serif '617 EAST' with a compact icon — pine cone with skyline rising from its tip. Cream background. Looks like a family office or private wealth firm. Extremely legible at all sizes.",
    bestFor: "Website header, email signature, professional documents",
    src: "/images/logo-final-B-transparent_bbde9f45.png",
    bg: "oklch(0.97 0.005 80)",
  },
];

export default function LogoConcepts() {
  return (
    <Layout
      title="Logo Design Concepts | 617 East Trust"
      description="Internal review: logo design concepts for 617 East Trust."
    >
      {/* Header */}
      <section className="pt-32 pb-8" style={{ background: "oklch(0.10 0.008 240)" }}>
        <div className="container">
          <span className="section-label">Internal Review</span>
          <div className="gold-rule" />
          <h1
            className="font-display text-4xl md:text-5xl mb-4"
            style={{ color: "oklch(0.94 0.005 80)", lineHeight: "1.1" }}
          >
            Logo Design Concepts
          </h1>
          <p className="text-base mb-2" style={{ color: "oklch(0.58 0.010 80)", maxWidth: "560px" }}>
            Hybrid finals combining the circular seal format (Concept 03) with the fine-line engraving style (Concept 01). Two variations below, followed by all four source concepts.
          </p>
          <p className="text-sm font-mono" style={{ color: "oklch(0.45 0.007 80)" }}>
            Reply with A or B for the hybrid, or a source concept number (01–04) with any refinements.
          </p>
        </div>
      </section>

      <section className="py-16" style={{ background: "oklch(0.10 0.008 240)" }}>
        <div className="container">

          {/* Hybrid Finals */}
          <div className="mb-4">
            <span className="section-label">Hybrid Finals</span>
            <div className="gold-rule" />
            <p className="text-sm mb-8" style={{ color: "oklch(0.52 0.008 80)" }}>
              Concepts 01 + 03 merged — circular seal with engraving texture, all gold on dark.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {FINALS.map((f) => (
              <div
                key={f.id}
                className="overflow-hidden"
                style={{ border: "2px solid oklch(0.78 0.12 80 / 0.5)" }}
              >
                <div
                  className="flex items-center justify-center p-12"
                  style={{ background: f.bg, minHeight: "360px" }}
                >
                  <img
                    src={f.src}
                    alt={f.name}
                    style={{ maxWidth: "300px", maxHeight: "300px", objectFit: "contain" }}
                  />
                </div>
                <div className="p-8" style={{ background: "oklch(0.13 0.009 240)" }}>
                  <span className="font-mono text-xs" style={{ color: "oklch(0.78 0.12 80)" }}>
                    VARIATION {f.id}
                  </span>
                  <h2 className="text-lg font-semibold mt-1 mb-3" style={{ color: "oklch(0.94 0.005 80)" }}>
                    {f.name}
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: "oklch(0.62 0.010 80)" }}>
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Source Concepts */}
          <div
            className="mb-8"
            style={{ borderTop: "1px solid oklch(0.22 0.008 240)", paddingTop: "3rem" }}
          >
            <span className="section-label">Source Concepts</span>
            <div className="gold-rule" />
            <p className="text-sm mb-8" style={{ color: "oklch(0.52 0.008 80)" }}>
              The original four concepts for reference.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {CONCEPTS.map((concept) => (
              <div
                key={concept.id}
                className="overflow-hidden"
                style={{ border: "1px solid oklch(0.22 0.008 240)" }}
              >
                <div
                  className="flex items-center justify-center p-12"
                  style={{ background: concept.bg, minHeight: "320px" }}
                >
                  <img
                    src={concept.src}
                    alt={`Logo concept ${concept.id}: ${concept.name}`}
                    style={{ maxWidth: "280px", maxHeight: "280px", objectFit: "contain" }}
                  />
                </div>
                <div className="p-8" style={{ background: "oklch(0.13 0.009 240)" }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="font-mono text-xs" style={{ color: "oklch(0.78 0.12 80)" }}>
                        CONCEPT {concept.id}
                      </span>
                      <h2 className="text-xl font-semibold mt-1" style={{ color: "oklch(0.94 0.005 80)" }}>
                        {concept.name}
                      </h2>
                    </div>
                    <span
                      className="text-xs font-mono px-3 py-1 rounded-sm"
                      style={{
                        background: "oklch(0.10 0.008 240)",
                        color: "oklch(0.58 0.010 80)",
                        border: "1px solid oklch(0.22 0.008 240)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {concept.style}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "oklch(0.62 0.010 80)" }}>
                    {concept.description}
                  </p>
                  <div
                    className="flex items-start gap-3 px-4 py-3 rounded-sm"
                    style={{ background: "oklch(0.10 0.008 240)", border: "1px solid oklch(0.22 0.008 240)" }}
                  >
                    <span className="text-xs font-mono mt-0.5 flex-shrink-0" style={{ color: "oklch(0.78 0.12 80)" }}>
                      BEST FOR
                    </span>
                    <span className="text-xs" style={{ color: "oklch(0.52 0.008 80)" }}>
                      {concept.bestFor}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selection prompt */}
          <div
            className="mt-12 p-8 text-center"
            style={{
              background: "oklch(0.13 0.009 240)",
              border: "1px solid oklch(0.22 0.008 240)",
              borderTop: "3px solid oklch(0.78 0.12 80)",
            }}
          >
            <p className="font-display text-xl mb-2" style={{ color: "oklch(0.94 0.005 80)", fontStyle: "italic" }}>
              Which variation speaks to the brand?
            </p>
            <p className="text-sm" style={{ color: "oklch(0.58 0.010 80)" }}>
              Reply with <strong style={{ color: "oklch(0.78 0.12 80)" }}>A</strong> or <strong style={{ color: "oklch(0.78 0.12 80)" }}>B</strong> for the hybrid finals, or a source concept number (01–04) with any refinements. I'll implement it site-wide immediately.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
