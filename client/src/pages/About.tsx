/*
 * 617 EAST TRUST — ABOUT PAGE
 * Midnight Ledger design system.
 * E-E-A-T: Founder profile, credentials, philosophy.
 */

import Layout from "@/components/Layout";
import { useReveal } from "@/hooks/useReveal";
import { useHeroEntrance, heroLabelStyle, heroRuleStyle, heroHeadlineOuter, heroHeadlineInner, heroSubtextStyle } from "@/hooks/useHeroEntrance";
import {
  ABOUT_CTA_BODY,
  ABOUT_CTA_HEADING,
  ABOUT_CTA_HEADING_EM,
  ABOUT_HERO_HEADING,
  ABOUT_HERO_HEADING_EM,
  ABOUT_HERO_SUPPORTING,
  ABOUT_META_DESCRIPTION,
  ABOUT_STORY_BODY_1,
  ABOUT_STORY_BODY_2,
  ABOUT_STORY_BODY_3,
  ABOUT_TITLE,
  BRAND_PROMISE,
  BRAND_VALUES,
  BRAND_VALUES_HEADING,
  CLOSING_CTA_LABEL,
  FOUNDER_QUOTE,
  FOUNDER_QUOTE_ATTRIBUTION,
} from "@/data/brandCopy";

const ABOUT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About 617 East Trust",
  "description": "617 East Trust was founded by Lamont Legrand, a commercial banking and SBA lending professional, to provide honest financial advisory services to North Carolina founders and individuals.",
  "mainEntity": {
    "@type": "Person",
    "name": "Lamont Legrand",
    "jobTitle": "Founder & Principal Advisor",
    "worksFor": { "@type": "Organization", "name": "617 East Trust" },
    "knowsAbout": [
      "Commercial Banking",
      "SBA Lending",
      "Business Formation",
      "Credit Repair",
      "Small Business Consulting",
      "Financial Planning",
      "Bookkeeping",
      "Fractional CFO Services"
    ],
    "alumniOf": { "@type": "CollegeOrUniversity", "name": "UNC Charlotte" }
  }
};

export default function About() {
  const heroRef = useReveal(0.1);
  const storyRef = useReveal(0.1);
  const valuesRef = useReveal(0.1);
  const heroStarted = useHeroEntrance();

  return (
    <Layout
      pageSchema={ABOUT_SCHEMA}
      title={ABOUT_TITLE}
      description={ABOUT_META_DESCRIPTION}
      canonical="https://617east.com/about"
    >
      {/* Hero */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        style={{
          backgroundImage: `url('/images/617east-about-hero_58b6f866.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" style={{ background: "oklch(0.10 0.008 240 / 0.88)" }} />
        <div className="container relative z-10" ref={heroRef as React.RefObject<HTMLDivElement>}>
          <span className="section-label" style={heroLabelStyle(heroStarted)}>Our Story</span>
          <div className="gold-rule" style={heroRuleStyle(heroStarted)} />
          <h1
            className="font-display text-5xl md:text-6xl"
            style={{ color: "oklch(0.94 0.005 80)", lineHeight: "1.1", maxWidth: "640px" }}
          >
            <span style={heroHeadlineOuter}>
              <span style={heroHeadlineInner(heroStarted, 500)}>
                {ABOUT_HERO_HEADING}{" "}
                <em style={{ color: "oklch(0.78 0.12 80)" }}>{ABOUT_HERO_HEADING_EM}</em>
              </span>
            </span>
          </h1>
          <p
            className="text-lg mt-6"
            style={{ color: "oklch(0.62 0.010 80)", maxWidth: "500px", lineHeight: "1.7", ...heroSubtextStyle(heroStarted) }}
          >
            {ABOUT_HERO_SUPPORTING}
          </p>
        </div>
      </section>

      {/* Founder story */}
      <section
        className="py-24"
        style={{ background: "oklch(0.13 0.009 240)" }}
        ref={storyRef as React.RefObject<HTMLElement>}
      >
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <span className="section-label reveal">The Founder</span>
              <div className="gold-rule reveal reveal-delay-1" />
              <h2
                className="text-3xl font-semibold mb-6 reveal reveal-delay-1"
                style={{ color: "oklch(0.94 0.005 80)" }}
              >
                Lamont Legrand
              </h2>
              <p
                className="text-sm font-mono mb-6 reveal reveal-delay-2"
                style={{ color: "oklch(0.78 0.12 80)", letterSpacing: "0.06em" }}
              >
                Founder & Principal Advisor
              </p>

              <div className="space-y-5 reveal reveal-delay-2">
                <p className="text-base leading-relaxed" style={{ color: "oklch(0.62 0.010 80)" }}>
                  {ABOUT_STORY_BODY_1}
                </p>
                <p className="text-base leading-relaxed" style={{ color: "oklch(0.62 0.010 80)" }}>
                  {ABOUT_STORY_BODY_2}
                </p>
                <p className="text-base leading-relaxed" style={{ color: "oklch(0.62 0.010 80)" }}>
                  {ABOUT_STORY_BODY_3}
                </p>
              </div>
              <div className="mt-8 reveal reveal-delay-3 flex flex-wrap gap-3">
                <a
                  href="/how-it-works"
                  className="btn-ghost-gold px-6 py-3 rounded-sm text-sm inline-flex items-center gap-2"
                >
                  See how we work with clients
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/617-east-trust"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost-gold px-6 py-3 rounded-sm text-sm inline-flex items-center gap-2"
                >
                  LinkedIn — 617 East Trust
                </a>
              </div>
            </div>

            <div className="reveal reveal-delay-3">
              {/* Founder portrait */}
              <div className="relative">
                {/* Gold accent frame */}
                <div
                  className="absolute -top-3 -left-3 w-full h-full"
                  style={{ border: "1px solid oklch(0.78 0.12 80 / 0.3)", borderRadius: "2px", zIndex: 0 }}
                />
                <div className="relative" style={{ zIndex: 1 }}>
                  <img
                    src="/images/lamont-legrand-founder_d88b26c8.jpg"
                    alt="Lamont Legrand, Founder of 617 East Trust — commercial banking and SBA lending professional"
                    className="w-full object-cover"
                    style={{
                      aspectRatio: "3/4",
                      objectPosition: "top center",
                      filter: "contrast(1.04) brightness(0.97)",
                    }}
                  />
                  {/* Name plate overlay */}
                  <div
                    className="absolute bottom-0 left-0 right-0 px-6 py-5"
                    style={{
                      background: "linear-gradient(to top, oklch(0.10 0.008 240 / 0.95) 0%, oklch(0.10 0.008 240 / 0.6) 60%, transparent 100%)",
                    }}
                  >
                    <p className="font-display text-lg" style={{ color: "oklch(0.94 0.005 80)" }}>
                      Lamont Legrand
                    </p>
                    <p className="font-mono text-xs mt-0.5" style={{ color: "oklch(0.78 0.12 80)", letterSpacing: "0.08em" }}>
                      FOUNDER & PRINCIPAL ADVISOR
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quote + Credentials below the grid */}
          <div className="grid md:grid-cols-2 gap-10 mt-16">
            {/* Quote */}
            <div className="reveal reveal-delay-2">
              <blockquote
                className="font-display text-xl"
                style={{
                  color: "oklch(0.78 0.008 80)",
                  fontStyle: "italic",
                  lineHeight: "1.6",
                  borderLeft: "3px solid oklch(0.78 0.12 80)",
                  paddingLeft: "1.5rem",
                  margin: 0,
                }}
              >
                "{FOUNDER_QUOTE}"
              </blockquote>
              <cite
                className="text-sm not-italic block mt-4"
                style={{ color: "oklch(0.58 0.010 80)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em" }}
              >
                — {FOUNDER_QUOTE_ATTRIBUTION}
              </cite>
              <p
                className="font-mono text-xs mt-5"
                style={{ color: "oklch(0.78 0.12 80)", letterSpacing: "0.14em" }}
              >
                {BRAND_PROMISE}
              </p>
            </div>

            {/* Credentials */}
            <div
              className="p-8 reveal reveal-delay-3"
              style={{
                background: "oklch(0.10 0.008 240)",
                border: "1px solid oklch(0.22 0.008 240)",
                borderLeft: "3px solid oklch(0.78 0.12 80)",
              }}
            >
              <span className="section-label">Expertise</span>
              <div className="gold-rule" />
              <ul className="space-y-3">
                {[
                  "Commercial Banking",
                  "SBA 7(a) & 504 Lending",
                  "Business Formation & Structure",
                  "Credit Analysis & Repair",
                  "Small Business Financial Planning",
                  "Bookkeeping & CFO Advisory",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span style={{ color: "oklch(0.78 0.12 80)", fontSize: "0.6rem" }}>◆</span>
                    <span className="text-sm" style={{ color: "oklch(0.72 0.008 80)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="py-24"
        style={{ background: "oklch(0.10 0.008 240)" }}
        ref={valuesRef as React.RefObject<HTMLElement>}
      >
        <div className="container">
          <span className="section-label reveal">What We Stand For</span>
          <div className="gold-rule reveal reveal-delay-1" />
          <h2
            className="text-3xl font-semibold mb-14 reveal reveal-delay-1"
            style={{ color: "oklch(0.94 0.005 80)", maxWidth: "400px" }}
          >
            {BRAND_VALUES_HEADING}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BRAND_VALUES.map((value, i) => (
              <div
                key={value.title}
                className={`reveal reveal-delay-${Math.min(i + 1, 5)}`}
                style={{ borderTop: "1px solid oklch(0.22 0.008 240)", paddingTop: "1.5rem" }}
              >
                <div className="font-mono text-3xl font-medium mb-4" style={{ color: "oklch(0.78 0.12 80)" }}>
                  0{i + 1}
                </div>
                <h3 className="text-base font-semibold mb-3" style={{ color: "oklch(0.88 0.008 80)" }}>
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "oklch(0.52 0.008 80)" }}>
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20"
        style={{ background: "oklch(0.13 0.009 240)", borderTop: "1px solid oklch(0.18 0.008 240)" }}
      >
        <div className="container max-w-2xl text-center">
          <h2 className="text-3xl font-semibold mb-4" style={{ color: "oklch(0.94 0.005 80)" }}>
            {ABOUT_CTA_HEADING}
            <em style={{ color: "oklch(0.78 0.12 80)" }}>{ABOUT_CTA_HEADING_EM}</em>
          </h2>
          <p className="text-base mb-8" style={{ color: "oklch(0.58 0.010 80)" }}>
            {ABOUT_CTA_BODY}
          </p>
          <a href="/contact#schedule" className="btn-gold px-8 py-4 rounded-sm text-sm inline-flex items-center gap-2">
            {CLOSING_CTA_LABEL}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>
    </Layout>
  );
}
