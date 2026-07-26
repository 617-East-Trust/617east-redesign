/*
 * 617 EAST TRUST — SERVICE DETAIL PAGE
 * Midnight Ledger design system.
 * Dynamic page for all 6 service slugs with full SEO schema.
 */

import Layout from "@/components/Layout";
import { getServiceBySlug } from "@/data/services";
import { useReveal } from "@/hooks/useReveal";
import { useParams } from "wouter";
import NotFound from "./NotFound";

export default function ServiceDetail() {
  const params = useParams<{ slug: string }>();
  const service = getServiceBySlug(params.slug || "");
  const heroRef = useReveal(0.1);
  const contentRef = useReveal(0.1);
  const faqRef = useReveal(0.1);

  if (!service) return <NotFound />;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a }
    }))
  };

  return (
    <Layout pageSchema={service.schema} title={service.seoTitle} description={service.metaDescription} canonical={service.canonical}>
      {/* Page-level FAQ schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section
        className="relative pt-32 pb-20"
        style={{ background: "oklch(0.10 0.008 240)" }}
        ref={heroRef as React.RefObject<HTMLElement>}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 80% 50%, oklch(0.78 0.12 80 / 0.04) 0%, transparent 60%)"
          }}
        />
        <div className="container relative z-10 max-w-4xl">
          <nav className="flex items-center gap-2 text-xs mb-8 reveal" style={{ color: "oklch(0.45 0.007 80)" }}>
            <a href="/" style={{ color: "oklch(0.45 0.007 80)" }}>Home</a>
            <span>›</span>
            <a href="/services" style={{ color: "oklch(0.45 0.007 80)" }}>Services</a>
            <span>›</span>
            <span style={{ color: "oklch(0.78 0.12 80)" }}>{service.title}</span>
          </nav>

          <span className="section-label reveal">617 East Trust</span>
          <div className="gold-rule reveal reveal-delay-1" />
          <h1
            className="font-display text-4xl md:text-6xl reveal reveal-delay-1"
            style={{ color: "oklch(0.94 0.005 80)", lineHeight: "1.1", marginBottom: "1.25rem" }}
          >
            {service.h1}
          </h1>
          <p
            className="text-lg reveal reveal-delay-2"
            style={{ color: "oklch(0.65 0.010 80)", maxWidth: "540px", lineHeight: "1.7", marginBottom: "2rem" }}
          >
            {service.tagline}
          </p>

          {/* Price + Timeline badges */}
          <div className="flex flex-wrap gap-4 reveal reveal-delay-3">
            <div
              className="flex items-center gap-3 px-5 py-3 rounded-sm"
              style={{ background: "oklch(0.13 0.009 240)", border: "1px solid oklch(0.22 0.008 240)" }}
            >
              <span className="font-mono text-lg font-medium" style={{ color: "oklch(0.78 0.12 80)" }}>
                {service.price}
              </span>
              <span className="text-xs" style={{ color: "oklch(0.45 0.007 80)" }}>
                {service.priceNote}
              </span>
            </div>
            <div
              className="flex items-center gap-3 px-5 py-3 rounded-sm"
              style={{ background: "oklch(0.13 0.009 240)", border: "1px solid oklch(0.22 0.008 240)" }}
            >
              <span className="font-mono text-sm" style={{ color: "oklch(0.78 0.12 80)" }}>⏱</span>
              <span className="text-sm" style={{ color: "oklch(0.65 0.010 80)" }}>
                {service.timeline}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section
        className="py-20"
        style={{ background: "oklch(0.13 0.009 240)" }}
        ref={contentRef as React.RefObject<HTMLElement>}
      >
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="md:col-span-2">
              <div className="mb-10 reveal">
                <span className="section-label">Overview</span>
                <div className="gold-rule" />
                <p className="text-base leading-relaxed" style={{ color: "oklch(0.65 0.010 80)", lineHeight: "1.85" }}>
                  {service.intro}
                </p>
              </div>

              <div className="reveal reveal-delay-1">
                <span className="section-label">What's Included</span>
                <div className="gold-rule" />
                <ul className="space-y-4">
                  {service.whatsIncluded.map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="font-mono text-xs mt-1 flex-shrink-0" style={{ color: "oklch(0.78 0.12 80)" }}>◆</span>
                      <span className="text-sm leading-relaxed" style={{ color: "oklch(0.72 0.008 80)" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {service.notIncluded && (
                <div className="mt-10 reveal reveal-delay-2">
                  <span className="section-label">Not Included</span>
                  <div className="gold-rule" />
                  <ul className="space-y-3">
                    {service.notIncluded.map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="text-xs mt-1 flex-shrink-0" style={{ color: "oklch(0.45 0.007 80)" }}>—</span>
                        <span className="text-sm leading-relaxed" style={{ color: "oklch(0.52 0.008 80)" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar CTA */}
            <div className="reveal reveal-delay-2">
              <div
                className="p-8 rounded-sm sticky top-24"
                style={{
                  background: "oklch(0.10 0.008 240)",
                  border: "1px solid oklch(0.22 0.008 240)",
                }}
              >
                <span className="section-label">Get Started</span>
                <div className="gold-rule" />
                <p className="text-sm leading-relaxed mb-6" style={{ color: "oklch(0.58 0.010 80)" }}>
                  Start with a free consultation. We'll assess your situation and tell you exactly what we can do — and what we can't.
                </p>
                <a
                  href="/contact"
                  className="btn-gold w-full py-3.5 rounded-sm text-sm flex items-center justify-center gap-2 mb-4"
                >
                  Book Free Consultation
                </a>
                <a
                  href="tel:9103151800"
                  className="btn-ghost-gold w-full py-3.5 rounded-sm text-sm flex items-center justify-center gap-2"
                >
                  (910) 315-1800
                </a>
                <p className="text-xs text-center mt-4" style={{ color: "oklch(0.40 0.006 80)" }}>
                  Response within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="py-20"
        style={{ background: "oklch(0.10 0.008 240)" }}
        ref={faqRef as React.RefObject<HTMLElement>}
      >
        <div className="container max-w-3xl">
          <span className="section-label reveal">FAQ</span>
          <div className="gold-rule reveal reveal-delay-1" />
          <h2
            className="text-2xl font-semibold mb-10 reveal reveal-delay-1"
            style={{ color: "oklch(0.94 0.005 80)" }}
          >
            Common questions about {service.title.toLowerCase()}
          </h2>

          <div className="space-y-0">
            {service.faqs.map((faq, i) => (
              <details
                key={i}
                className={`reveal reveal-delay-${Math.min(i + 2, 5)}`}
                style={{ borderBottom: "1px solid oklch(0.18 0.008 240)" }}
              >
                <summary
                  className="py-5 text-sm font-medium cursor-pointer flex items-center justify-between gap-4"
                  style={{ color: "oklch(0.88 0.008 80)", listStyle: "none" }}
                >
                  {faq.q}
                  <span style={{ color: "oklch(0.78 0.12 80)", flexShrink: 0 }}>+</span>
                </summary>
                <p
                  className="pb-5 text-sm leading-relaxed"
                  style={{ color: "oklch(0.58 0.010 80)" }}
                >
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      <section
        className="py-16"
        style={{ background: "oklch(0.13 0.009 240)", borderTop: "1px solid oklch(0.18 0.008 240)" }}
      >
        <div className="container">
          <p className="text-xs tracking-widest mb-6" style={{ color: "oklch(0.45 0.007 80)", letterSpacing: "0.15em" }}>
            OTHER SERVICES
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { slug: "llc-formation-north-carolina", label: "LLC Formation" },
              { slug: "sba-loans-north-carolina", label: "SBA Loans" },
              { slug: "credit-repair-north-carolina", label: "Credit Repair" },
              { slug: "bookkeeping-north-carolina", label: "Bookkeeping" },
              { slug: "fractional-cfo", label: "Fractional CFO" },
              { slug: "web-design-seo", label: "Web Design & SEO" },
            ]
              .filter(s => s.slug !== service.slug)
              .map(s => (
                <a
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="px-4 py-2 rounded-sm text-sm transition-colors"
                  style={{
                    border: "1px solid oklch(0.22 0.008 240)",
                    color: "oklch(0.65 0.010 80)",
                  }}
                >
                  {s.label}
                </a>
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

