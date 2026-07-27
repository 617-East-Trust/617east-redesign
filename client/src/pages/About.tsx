/*
 * 617 EAST TRUST — ABOUT PAGE
 * Midnight Ledger design system.
 * E-E-A-T: Founder profile, credentials, philosophy.
 */

import Layout from "@/components/Layout";
import { useReveal } from "@/hooks/useReveal";
import { useHeroEntrance, heroLabelStyle, heroRuleStyle, heroHeadlineOuter, heroHeadlineInner, heroSubtextStyle } from "@/hooks/useHeroEntrance";

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
      title="About 617 East Trust | Lamont Legrand — NC Business Advisor"
      description="617 East Trust was founded by Lamont Legrand, a commercial banking and SBA lending professional. We tell you what not to do — and why that matters."
      canonical="https://617east.com/about"
    >
      {/* Hero */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        style={{
          backgroundImage: `url('/manus-storage/617east-about-hero_58b6f866.jpg')`,
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
                Built by someone who's seen{" "}
                <em style={{ color: "oklch(0.78 0.12 80)" }}>the inside.</em>
              </span>
            </span>
          </h1>
          <p
            className="text-lg mt-6"
            style={{ color: "oklch(0.62 0.010 80)", maxWidth: "500px", lineHeight: "1.7", ...heroSubtextStyle(heroStarted) }}
          >
            617 East Trust exists because the advice most small business owners need is the advice they can't find anywhere else: what not to do.
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
                  Lamont Legrand spent years inside commercial banking and SBA lending — reviewing loan applications, assessing business viability, and watching founders make the same preventable mistakes over and over.
                </p>
                <p className="text-base leading-relaxed" style={{ color: "oklch(0.62 0.010 80)" }}>
                  He founded 617 East Trust to be the advisor he wished those founders had access to before they walked into a bank. Someone who could tell them what the lender was actually looking for. What their credit profile said about them. Whether their LLC structure would hold up. What to fix before they applied.
                </p>
                <p className="text-base leading-relaxed" style={{ color: "oklch(0.62 0.010 80)" }}>
                  The name "617 East" reflects the directional nature of the work: we help you find your bearing, understand where you are, and navigate toward where you want to go — without wasting time on paths that won't get you there.
                </p>
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
                    src="/manus-storage/lamont-legrand-founder_d88b26c8.jpg"
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
            <blockquote
              className="font-display text-xl reveal reveal-delay-2"
              style={{
                color: "oklch(0.78 0.008 80)",
                fontStyle: "italic",
                lineHeight: "1.6",
                borderLeft: "3px solid oklch(0.78 0.12 80)",
                paddingLeft: "1.5rem",
              }}
            >
              "Most people come to us after they've already made a mistake. Our goal is to become the call they make before they make one."
            </blockquote>

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
            Accountability. Trust. Transparency.
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                n: "01",
                title: "Accountability",
                body: "We tell you what we can do, what we can't do, and what the realistic outcome looks like. We don't overpromise. We don't disappear after you pay.",
              },
              {
                n: "02",
                title: "Trust",
                body: "Trust is built through honest advice — including the advice you didn't want to hear. We will tell you if your business idea has a fatal flaw. We will tell you if you're not ready for an SBA loan. That honesty is the service.",
              },
              {
                n: "03",
                title: "Transparency",
                body: "Every fee, every timeline, every limitation — disclosed upfront. No hidden charges. No surprise scope creep. No vague deliverables.",
              },
            ].map((value, i) => (
              <div
                key={value.n}
                className={`reveal reveal-delay-${i + 2}`}
                style={{ borderTop: "1px solid oklch(0.22 0.008 240)", paddingTop: "1.5rem" }}
              >
                <div className="font-mono text-3xl font-medium mb-4" style={{ color: "oklch(0.78 0.12 80)" }}>
                  {value.n}
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
            Ready to work with someone who tells you the truth?
          </h2>
          <p className="text-base mb-8" style={{ color: "oklch(0.58 0.010 80)" }}>
            Start with a free consultation. No commitment. No sales pitch.
          </p>
          <a href="/contact" className="btn-gold px-8 py-4 rounded-sm text-sm inline-flex items-center gap-2">
            Book Free Consultation
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>
    </Layout>
  );
}
