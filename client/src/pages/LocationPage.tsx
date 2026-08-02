/*
 * 617 EAST TRUST — City / location landing page
 * Local SEO pages for primary NC markets.
 */

import Layout from "@/components/Layout";
import { getLocationBySlug, LOCATIONS } from "@/data/locations";
import { useReveal } from "@/hooks/useReveal";
import {
  useHeroEntrance,
  heroLabelStyle,
  heroRuleStyle,
  heroHeadlineOuter,
  heroHeadlineInner,
  heroSubtextStyle,
} from "@/hooks/useHeroEntrance";
import { Link, useParams } from "wouter";
import NotFound from "./NotFound";

export default function LocationPage() {
  const params = useParams<{ slug: string }>();
  const loc = getLocationBySlug(params.slug || "");
  const heroRef = useReveal(0.1);
  const bodyRef = useReveal(0.1);
  const heroStarted = useHeroEntrance();

  if (!loc) return <NotFound />;

  const pageSchema = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "617 East Trust",
      url: "https://617east.com",
      telephone: "+19103151800",
      email: "info@617east.com",
      areaServed: {
        "@type": "City",
        name: loc.city,
        addressRegion: loc.state,
        addressCountry: "US",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Sandhills",
        addressRegion: "NC",
        addressCountry: "US",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://617east.com/" },
        { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://617east.com/locations" },
        { "@type": "ListItem", position: 3, name: loc.marketLabel, item: loc.canonical },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: loc.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ];

  return (
    <Layout
      pageSchema={pageSchema}
      title={loc.seoTitle}
      description={loc.metaDescription}
      canonical={loc.canonical}
    >
      <section
        className="relative pt-32 pb-16"
        style={{ background: "oklch(0.10 0.008 240)" }}
        ref={heroRef as React.RefObject<HTMLElement>}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 70% 30%, oklch(0.78 0.12 80 / 0.05) 0%, transparent 60%)",
          }}
        />
        <div className="container relative z-10 max-w-4xl">
          <nav
            className="flex flex-wrap items-center gap-2 text-xs mb-8"
            aria-label="Breadcrumb"
            style={{ color: "oklch(0.45 0.007 80)" }}
          >
            <Link href="/" style={{ color: "oklch(0.45 0.007 80)" }}>
              Home
            </Link>
            <span aria-hidden="true">›</span>
            <Link href="/locations" style={{ color: "oklch(0.45 0.007 80)" }}>
              Service Areas
            </Link>
            <span aria-hidden="true">›</span>
            <span style={{ color: "oklch(0.78 0.12 80)" }}>{loc.marketLabel}</span>
          </nav>

          <span className="section-label" style={heroLabelStyle(heroStarted)}>
            {loc.region} · {loc.state}
          </span>
          <div className="gold-rule" style={heroRuleStyle(heroStarted)} />
          <h1
            className="font-display text-4xl md:text-5xl"
            style={{ color: "oklch(0.94 0.005 80)", lineHeight: "1.1", maxWidth: "720px" }}
          >
            <span style={heroHeadlineOuter}>
              <span style={heroHeadlineInner(heroStarted, 500)}>{loc.h1}</span>
            </span>
          </h1>
          <p
            className="text-lg mt-6"
            style={{
              color: "oklch(0.62 0.010 80)",
              maxWidth: "640px",
              lineHeight: "1.75",
              ...heroSubtextStyle(heroStarted),
            }}
          >
            {loc.intro}
          </p>
          <div className="flex flex-wrap gap-3 mt-8" style={heroSubtextStyle(heroStarted)}>
            <a href="/contact#schedule" className="btn-gold px-6 py-3 rounded-sm text-sm">
              Book Free Consultation
            </a>
            <a href="tel:+19103151800" className="btn-ghost-gold px-6 py-3 rounded-sm text-sm">
              (910) 315-1800
            </a>
          </div>
        </div>
      </section>

      <section
        className="py-20"
        style={{ background: "oklch(0.13 0.009 240)" }}
        ref={bodyRef as React.RefObject<HTMLElement>}
      >
        <div className="container max-w-4xl">
          <span className="section-label reveal">Local Focus</span>
          <div className="gold-rule reveal" />
          <h2
            className="text-2xl font-semibold mb-6 reveal"
            style={{ color: "oklch(0.94 0.005 80)" }}
          >
            Why {loc.city} clients work with us
          </h2>
          <ul className="space-y-4 mb-16">
            {loc.localNotes.map((note) => (
              <li
                key={note}
                className="text-base leading-relaxed pl-4 reveal"
                style={{
                  color: "oklch(0.65 0.010 80)",
                  borderLeft: "2px solid oklch(0.78 0.12 80 / 0.5)",
                }}
              >
                {note}
              </li>
            ))}
          </ul>

          <span className="section-label reveal">Services</span>
          <div className="gold-rule reveal" />
          <h2
            className="text-2xl font-semibold mb-8 reveal"
            style={{ color: "oklch(0.94 0.005 80)" }}
          >
            Core services for {loc.marketLabel}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {loc.focusServices.map((svc) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="p-6 block reveal transition-colors"
                style={{
                  background: "oklch(0.10 0.008 240)",
                  border: "1px solid oklch(0.22 0.008 240)",
                }}
              >
                <h3 className="text-lg font-semibold mb-2" style={{ color: "oklch(0.88 0.008 80)" }}>
                  {svc.label}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "oklch(0.58 0.010 80)" }}>
                  {svc.blurb}
                </p>
                <span className="text-xs mt-4 inline-block" style={{ color: "oklch(0.78 0.12 80)" }}>
                  View service →
                </span>
              </Link>
            ))}
          </div>

          <span className="section-label reveal">FAQ</span>
          <div className="gold-rule reveal" />
          <h2
            className="text-2xl font-semibold mb-8 reveal"
            style={{ color: "oklch(0.94 0.005 80)" }}
          >
            {loc.city} FAQ
          </h2>
          <div className="space-y-0 mb-16">
            {loc.faqs.map((faq) => (
              <details
                key={faq.q}
                style={{ borderBottom: "1px solid oklch(0.18 0.008 240)" }}
              >
                <summary
                  className="py-5 text-sm font-medium cursor-pointer"
                  style={{ color: "oklch(0.88 0.008 80)", listStyle: "none" }}
                >
                  {faq.q}
                </summary>
                <p className="pb-5 text-sm leading-relaxed" style={{ color: "oklch(0.58 0.010 80)" }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>

          <span className="section-label reveal">Nearby</span>
          <div className="gold-rule reveal" />
          <h2
            className="text-xl font-semibold mb-4 reveal"
            style={{ color: "oklch(0.94 0.005 80)" }}
          >
            Other service areas
          </h2>
          <div className="flex flex-wrap gap-3 reveal">
            {loc.nearby.map((n) => (
              <Link
                key={n.slug}
                href={`/locations/${n.slug}`}
                className="text-sm px-4 py-2 rounded-sm"
                style={{
                  color: "oklch(0.78 0.12 80)",
                  border: "1px solid oklch(0.28 0.010 80 / 0.4)",
                }}
              >
                {n.name}
              </Link>
            ))}
            {LOCATIONS.filter((l) => l.slug !== loc.slug && !loc.nearby.some((n) => n.slug === l.slug)).map(
              (l) => (
                <Link
                  key={l.slug}
                  href={`/locations/${l.slug}`}
                  className="text-sm px-4 py-2 rounded-sm"
                  style={{
                    color: "oklch(0.58 0.010 80)",
                    border: "1px solid oklch(0.22 0.008 240)",
                  }}
                >
                  {l.city}
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      <section
        className="py-20"
        style={{
          background: "oklch(0.10 0.008 240)",
          borderTop: "1px solid oklch(0.18 0.008 240)",
        }}
      >
        <div className="container max-w-2xl text-center">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: "oklch(0.94 0.005 80)" }}>
            Ready to talk about your {loc.city} business?
          </h2>
          <p className="text-base mb-8" style={{ color: "oklch(0.58 0.010 80)" }}>
            Free consultation. We will tell you what we can do — and what we will not sell you.
          </p>
          <a
            href="/contact#schedule"
            className="btn-gold px-8 py-4 rounded-sm text-sm inline-flex items-center gap-2"
          >
            Book Free Consultation
          </a>
        </div>
      </section>
    </Layout>
  );
}
