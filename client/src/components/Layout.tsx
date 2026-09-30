/*
 * 617 EAST TRUST — SHARED LAYOUT
 * Blacklight Ledger system: floating navigation, staged seal motion,
 * high-contrast action surfaces, and the existing SEO/contact infrastructure.
 */

import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "wouter";
import BrandLogo from "@/components/BrandLogo";
import { trackCall } from "@/lib/analytics";
import {
  BUSINESS_NAME,
  EMAIL,
  PHONE_DISPLAY,
  PHONE_E164,
  SOCIAL,
  displayPhone,
  sameAsList,
  telHref,
} from "@/data/nap";
import {
  BRAND_PROMISE,
  FOOTER_DESCRIPTOR,
  LEGAL_DISCLOSURE,
} from "@/data/brandCopy";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

const SERVICE_LINKS = [
  { href: "/services/llc-formation-north-carolina", label: "LLC Formation" },
  { href: "/services/sba-loans-north-carolina", label: "SBA Loans" },
  { href: "/services/credit-repair-north-carolina", label: "Credit Repair" },
  { href: "/services/bookkeeping-north-carolina", label: "Bookkeeping" },
  { href: "/services/fractional-cfo-north-carolina", label: "Fractional CFO" },
  {
    href: "/services/web-design-seo-north-carolina",
    label: "Web Design & SEO",
  },
];

const SCHEMA_ORG = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: BUSINESS_NAME,
  description:
    "Business formation, SBA loan consulting, credit repair, bookkeeping, fractional CFO, and web design services in North Carolina.",
  url: "https://617east.com",
  telephone: PHONE_E164,
  email: EMAIL,
  priceRange: "$$",
  sameAs: sameAsList(),
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "17:00",
    description: "By appointment. Response within 24 hours.",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sandhills",
    addressRegion: "NC",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 35.1854,
    longitude: -79.4695,
  },
  areaServed: [
    { "@type": "City", name: "Pinehurst", addressRegion: "NC" },
    { "@type": "City", name: "Southern Pines", addressRegion: "NC" },
    { "@type": "City", name: "Charlotte", addressRegion: "NC" },
    { "@type": "City", name: "Fayetteville", addressRegion: "NC" },
    { "@type": "City", name: "Raleigh", addressRegion: "NC" },
    {
      "@type": "AdministrativeArea",
      name: "Sandhills Region",
      addressRegion: "NC",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "617 East Trust Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "LLC Formation in North Carolina",
        },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "SBA Loan Consulting" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Credit Repair" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Bookkeeping" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Fractional CFO" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Web Design & SEO" },
      },
    ],
  },
  founder: {
    "@type": "Person",
    name: "Lamont Legrand",
    jobTitle: "Founder & Principal Advisor",
    knowsAbout: [
      "Commercial Banking",
      "SBA Lending",
      "Business Formation",
      "Credit Repair",
      "Small Business Consulting",
      "Financial Planning",
    ],
    ...(SOCIAL.linkedinFounder ? { sameAs: [SOCIAL.linkedinFounder] } : {}),
  },
};

interface LayoutProps {
  children: React.ReactNode;
  pageSchema?: object | object[];
  title?: string;
  description?: string;
  canonical?: string;
}

export default function Layout({
  children,
  pageSchema,
  title,
  description,
  canonical,
}: LayoutProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const scrollSentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = scrollSentinelRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <div className="site-shell relative min-h-screen flex flex-col overflow-x-clip">
      <Helmet>
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
        {canonical && <link rel="canonical" href={canonical} />}
        {canonical && <meta property="og:url" content={canonical} />}
        {title && <meta property="og:title" content={title} />}
        {description && (
          <meta property="og:description" content={description} />
        )}
        <script type="application/ld+json">{JSON.stringify(SCHEMA_ORG)}</script>
        {pageSchema &&
          (Array.isArray(pageSchema) ? (
            pageSchema.map((block, i) => (
              <script key={i} type="application/ld+json">
                {JSON.stringify(block)}
              </script>
            ))
          ) : (
            <script type="application/ld+json">
              {JSON.stringify(pageSchema)}
            </script>
          ))}
      </Helmet>

      <div
        ref={scrollSentinelRef}
        aria-hidden="true"
        className="absolute top-20 h-px w-px"
      />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
        <div
          className={`nav-island pointer-events-auto ${scrolled ? "nav-island--scrolled" : ""}`}
        >
          <div className="flex h-[64px] items-center justify-between px-3 sm:px-5">
            <Link
              href="/"
              className="flex items-center gap-3"
              aria-label="617 East Trust — Home"
            >
              <BrandLogo size={46} animated />
              <span className="hidden text-[0.6rem] font-mono tracking-[0.18em] text-[oklch(0.74_0.03_85)] sm:block">
                617 EAST TRUST
              </span>
            </Link>

            <nav
              className="hidden items-center gap-6 lg:flex"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className="nav-link text-xs font-medium tracking-[0.03em]"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              <a
                href="tel:9103151800"
                className="text-xs font-mono tracking-wide text-[oklch(0.71_0.04_208)]"
              >
                {PHONE_DISPLAY}
              </a>
              <a
                href="/contact#schedule"
                className="btn-gold px-4 py-2 text-xs"
              >
                Start a conversation
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <button
              className="relative flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
              onClick={() => setMobileOpen(open => !open)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              style={{
                border: "1px solid oklch(0.48 0.055 285 / 0.52)",
                background: "oklch(0.13 0.025 284 / 0.78)",
              }}
            >
              <span className="sr-only">Menu</span>
              <span
                className="absolute h-px w-4 bg-[oklch(0.93_0.01_85)]"
                style={{
                  transform: mobileOpen ? "rotate(45deg)" : "translateY(-3px)",
                  transition: "transform 600ms cubic-bezier(0.16,1,0.3,1)",
                }}
              />
              <span
                className="absolute h-px w-4 bg-[oklch(0.93_0.01_85)]"
                style={{
                  transform: mobileOpen ? "rotate(-45deg)" : "translateY(3px)",
                  transition: "transform 600ms cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          id="mobile-nav"
          className="mobile-nav-overlay"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="mobile-nav-panel">
            <p className="mb-4 text-[0.62rem] font-mono tracking-[0.18em] text-[oklch(0.72_0.08_210)]">
              NAVIGATE
            </p>
            <div>
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className="mobile-nav-link"
                >
                  <span>{label}</span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-base text-[oklch(0.76_0.13_210)]"
                  >
                    ↗
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <a
                href="/contact#schedule"
                className="btn-gold px-4 py-3 text-center text-xs"
              >
                Schedule
              </a>
              <a
                href={telHref()}
                onClick={() => trackCall(PHONE_E164)}
                className="btn-ghost-gold px-4 py-3 text-center text-xs"
              >
                Call us
              </a>
            </div>
          </div>
        </div>
      )}

      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>

      <div
        className="fixed inset-x-0 bottom-3 z-30 mx-auto flex w-[calc(100%-1rem)] max-w-sm gap-2 rounded-full p-1.5 md:hidden"
        style={{
          border: "1px solid oklch(0.48 0.055 285 / 0.52)",
          background: "oklch(0.1 0.022 284 / 0.94)",
          boxShadow:
            "inset 0 1px 0 oklch(1 0 0 / 0.08), 0 16px 42px oklch(0.02 0.01 285 / 0.3)",
          backdropFilter: "blur(14px)",
        }}
      >
        <a
          href="/contact#schedule"
          className="btn-gold flex-1 py-2.5 text-center text-xs"
        >
          Schedule
        </a>
        <a
          href={telHref()}
          className="btn-ghost-gold px-4 py-2.5 text-xs"
          aria-label={`Call ${BUSINESS_NAME}`}
          onClick={() => trackCall(PHONE_E164)}
        >
          Call
        </a>
      </div>

      <footer className="relative overflow-hidden border-t border-[oklch(0.48_0.055_285/0.35)] bg-[oklch(0.07_0.016_285)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.76_0.13_210/0.7)] to-transparent" />
        <div className="container py-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
            <div className="md:col-span-1">
              <div className="mb-5 flex items-center gap-3">
                <BrandLogo size={70} alt={BUSINESS_NAME} loading="lazy" />
              </div>
              <p className="mb-6 text-sm leading-relaxed text-[oklch(0.62_0.025_85)]">
                {FOOTER_DESCRIPTOR}
              </p>
              <p className="mb-6 text-xs font-mono tracking-[0.08em] text-[oklch(0.76_0.13_210)]">
                {BRAND_PROMISE}
              </p>
              <div className="flex flex-col gap-2">
                <p className="text-xs text-[oklch(0.53_0.025_85)]">
                  Sandhills Region, NC · By appointment
                </p>
                <a
                  href={telHref()}
                  className="text-sm font-medium text-[oklch(0.8_0.12_80)]"
                  onClick={() => trackCall(PHONE_E164)}
                >
                  {displayPhone() || PHONE_DISPLAY}
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-sm text-[oklch(0.65_0.025_85)]"
                >
                  {EMAIL}
                </a>
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-[oklch(0.76_0.13_210)]">
                  {SOCIAL.linkedinCompany && (
                    <a
                      href={SOCIAL.linkedinCompany}
                      target="_blank"
                      rel="noopener noreferrer me"
                    >
                      LinkedIn
                    </a>
                  )}
                  {SOCIAL.linkedinFounder && (
                    <a
                      href={SOCIAL.linkedinFounder}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lamont on LinkedIn
                    </a>
                  )}
                  {SOCIAL.googleBusiness && (
                    <a
                      href={SOCIAL.googleBusiness}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google reviews
                    </a>
                  )}
                </div>
              </div>
            </div>

            <FooterColumn label="Services" links={SERVICE_LINKS} />
            <FooterColumn
              label="Company"
              links={[
                { href: "/about", label: "About Us" },
                { href: "/how-it-works", label: "How It Works" },
                { href: "/blog", label: "Resources" },
                { href: "/contact", label: "Contact" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
              ]}
            />
            <FooterColumn
              label="Service Area"
              links={[
                { href: "/locations", label: "All service areas" },
                { href: "/locations/pinehurst-nc", label: "Pinehurst, NC" },
                {
                  href: "/locations/southern-pines-nc",
                  label: "Southern Pines, NC",
                },
                { href: "/locations/charlotte-nc", label: "Charlotte, NC" },
                {
                  href: "/locations/fayetteville-nc",
                  label: "Fayetteville, NC",
                },
                { href: "/locations/raleigh-nc", label: "Raleigh, NC" },
              ]}
            />
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[oklch(0.48_0.055_285/0.35)] pt-8 md:flex-row">
            <p className="text-xs text-[oklch(0.48_0.022_85)]">
              © 2026 617 East Trust. All rights reserved. North Carolina.
            </p>
            <p className="max-w-xl text-center text-xs text-[oklch(0.42_0.018_85)] md:text-right">
              {LEGAL_DISCLOSURE}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterColumn({
  label,
  links,
}: {
  label: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <span className="section-label">{label}</span>
      <ul className="space-y-3">
        {links.map(({ href, label: linkLabel }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-sm text-[oklch(0.62_0.025_85)] transition-colors hover:text-[oklch(0.76_0.13_210)]"
            >
              {linkLabel}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
