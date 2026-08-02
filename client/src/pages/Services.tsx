/*
 * 617 EAST TRUST — SERVICES OVERVIEW PAGE
 * Midnight Ledger design system.
 * All 6 services with pricing, timeline, and links to detail pages.
 */

import Layout from "@/components/Layout";
import { SERVICES } from "@/data/services";
import { useReveal } from "@/hooks/useReveal";
import { useHeroEntrance, heroLabelStyle, heroRuleStyle, heroHeadlineOuter, heroHeadlineInner, heroSubtextStyle } from "@/hooks/useHeroEntrance";
import { Link } from "wouter";

const SERVICES_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "617 East Trust Services",
  "description": "Business formation, SBA loans, credit repair, bookkeeping, fractional CFO, and web design services in North Carolina.",
  "itemListElement": SERVICES.map((s, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": s.title,
    "url": `https://617east.com/services/${s.slug}`
  }))
};

export default function Services() {
  const heroRef = useReveal(0.1);
  const gridRef = useReveal(0.1);
  const heroStarted = useHeroEntrance();

  return (
    <Layout
      pageSchema={SERVICES_SCHEMA}
      title="Services | 617 East Trust — Business Formation, SBA Loans & More"
      description="Six services under one roof: LLC formation, SBA loans, credit repair, bookkeeping, fractional CFO, and web design. North Carolina."
    >
      {/* Hero */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        style={{
          backgroundImage: `url('/images/617east-services-bg_e2c7bd98.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "oklch(0.10 0.008 240 / 0.92)" }}
        />
        <div className="container relative z-10" ref={heroRef as React.RefObject<HTMLDivElement>}>
          <span className="section-label" style={heroLabelStyle(heroStarted)}>Our Services</span>
          <div className="gold-rule" style={heroRuleStyle(heroStarted)} />
          <h1
            className="font-display text-5xl md:text-6xl"
            style={{ color: "oklch(0.94 0.005 80)", lineHeight: "1.1", maxWidth: "600px" }}
          >
            <span style={heroHeadlineOuter}>
              <span style={heroHeadlineInner(heroStarted, 500)}>
                Six services.{" "}
                <em style={{ color: "oklch(0.78 0.12 80)" }}>One advisor.</em>
              </span>
            </span>
          </h1>
          <p
            className="text-lg mt-6"
            style={{ color: "oklch(0.62 0.010 80)", maxWidth: "520px", lineHeight: "1.7", ...heroSubtextStyle(heroStarted) }}
          >
            From formation to funding, bookkeeping to credit repair — we handle the financial infrastructure of your business so you can focus on running it.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section
        className="py-24"
        style={{ background: "oklch(0.10 0.008 240)" }}
        ref={gridRef as React.RefObject<HTMLElement>}
      >
        <div className="container">
          <div className="grid md:grid-cols-2 gap-px" style={{ background: "oklch(0.22 0.008 240)" }}>
            {SERVICES.map((service, i) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={`service-card p-10 block reveal reveal-delay-${Math.min(i + 1, 4)}`}
                style={{ background: "oklch(0.10 0.008 240)" }}
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="font-mono text-xs" style={{ color: "oklch(0.78 0.12 80)" }}>
                    0{i + 1}
                  </span>
                  <div className="text-right">
                    <div className="font-mono text-sm" style={{ color: "oklch(0.78 0.12 80)" }}>
                      {service.price}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "oklch(0.40 0.006 80)" }}>
                      {service.timeline}
                    </div>
                  </div>
                </div>

                <h2
                  className="text-xl font-semibold mb-3"
                  style={{ color: "oklch(0.94 0.005 80)" }}
                >
                  {service.title}
                </h2>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "oklch(0.52 0.008 80)" }}
                >
                  {service.tagline}
                </p>

                <div className="flex items-center gap-2" style={{ color: "oklch(0.78 0.12 80)" }}>
                  <span className="text-xs font-medium tracking-wide">Learn more</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>
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
          <h2
            className="text-3xl font-semibold mb-4"
            style={{ color: "oklch(0.94 0.005 80)" }}
          >
            Not sure which service you need?
          </h2>
          <p className="text-base mb-8" style={{ color: "oklch(0.58 0.010 80)" }}>
            Start with a free consultation. We'll assess your situation and tell you exactly what makes sense — including if nothing does right now.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="/contact#schedule" className="btn-gold px-8 py-4 rounded-sm text-sm inline-flex items-center gap-2">
              Schedule Free Consultation
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="tel:9103151800" className="btn-ghost-gold px-8 py-4 rounded-sm text-sm inline-flex items-center gap-2">
              (910) 315-1800
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
