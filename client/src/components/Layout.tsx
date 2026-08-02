/*
 * 617 EAST TRUST — LAYOUT COMPONENT
 * Midnight Ledger design system.
 * Nav: transparent over hero → dark/blur on scroll.
 * Footer: structured with service links, contact, legal.
 * Schema: ProfessionalService JSON-LD injected globally.
 */

import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "wouter";

// GA4 click-to-call tracking
function trackCall() {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "click_to_call", { phone: "+19103151800" });
  }
}

// Compass rose SVG mark — 8-point star, gold
function CompassMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M16 2 L17.5 13 L28 16 L17.5 19 L16 30 L14.5 19 L4 16 L14.5 13 Z"
        fill="oklch(0.78 0.12 80)"
      />
      <path
        d="M16 6 L17 13.5 L22 16 L17 18.5 L16 26 L15 18.5 L10 16 L15 13.5 Z"
        fill="oklch(0.10 0.008 240)"
        opacity="0.5"
      />
      <circle cx="16" cy="16" r="2" fill="oklch(0.10 0.008 240)" />
    </svg>
  );
}
// Real 617 East Trust logo mark (circular badge) — for header icon slot
function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <img
      src="/images/logo-seal.svg"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
    />
  );
}

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

const SERVICE_LINKS = [
  { href: "/services/llc-formation-north-carolina", label: "LLC Formation" },
  { href: "/services/sba-loans-north-carolina", label: "SBA Loans" },
  { href: "/services/credit-repair-north-carolina", label: "Credit Repair" },
  { href: "/services/bookkeeping-north-carolina", label: "Bookkeeping" },
  { href: "/services/fractional-cfo", label: "Fractional CFO" },
  { href: "/services/web-design-seo", label: "Web Design & SEO" },
];

// Global ProfessionalService schema
const SCHEMA_ORG = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "617 East Trust",
  "description": "Business formation, SBA loan consulting, credit repair, bookkeeping, fractional CFO, and web design services in North Carolina.",
  "url": "https://617east.com",
  "telephone": "+19103151800",
  "email": "info@617east.com",
  "priceRange": "$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "17:00",
    "description": "By appointment. Response within 24 hours."
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Sandhills",
    "addressRegion": "NC",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 35.1854,
    "longitude": -79.4695
  },
  "areaServed": [
    { "@type": "City", "name": "Pinehurst", "addressRegion": "NC" },
    { "@type": "City", "name": "Southern Pines", "addressRegion": "NC" },
    { "@type": "City", "name": "Charlotte", "addressRegion": "NC" },
    { "@type": "City", "name": "Fayetteville", "addressRegion": "NC" },
    { "@type": "City", "name": "Raleigh", "addressRegion": "NC" },
    { "@type": "AdministrativeArea", "name": "Sandhills Region", "addressRegion": "NC" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "617 East Trust Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "LLC Formation in North Carolina" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SBA Loan Consulting" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Credit Repair" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bookkeeping" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fractional CFO" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Design & SEO" } }
    ]
  },
  "founder": {
    "@type": "Person",
    "name": "Lamont Legrand",
    "jobTitle": "Founder & Principal Advisor",
    "knowsAbout": ["Commercial Banking", "SBA Lending", "Business Formation", "Credit Repair", "Small Business Consulting", "Financial Planning"]
  }
};

interface LayoutProps {
  children: React.ReactNode;
  pageSchema?: object;
  title?: string;
  description?: string;
  canonical?: string;
}

export default function Layout({ children, pageSchema, title, description, canonical }: LayoutProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  // Helmet handles SSG-safe head injection — no manual DOM manipulation needed.

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "oklch(0.10 0.008 240)" }}>
      {/* Helmet: per-page <head> injection — serialized to static HTML by vite-ssg */}
      <Helmet>
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
        {canonical && <link rel="canonical" href={canonical} />}
        {canonical && <meta property="og:url" content={canonical} />}
        {title && <meta property="og:title" content={title} />}
        {description && <meta property="og:description" content={description} />}
        <script type="application/ld+json">{JSON.stringify(SCHEMA_ORG)}</script>
        {pageSchema && (
          <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
        )}
      </Helmet>

      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "oklch(0.10 0.008 240 / 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid oklch(0.22 0.008 240)" : "1px solid transparent",
        }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-18" style={{ height: "72px" }}>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group" aria-label="617 East Trust — Home">
              {/* Full wordmark logo — skyline + pine cone */}
              <img
                src="/images/logo-wordmark.svg"
                alt="617 East Trust"
                height={52}
                style={{ height: "52px", width: "auto", objectFit: "contain" }}
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="relative text-sm font-medium transition-colors duration-200"
                  style={{
                    color: isActive(href) ? "oklch(0.78 0.12 80)" : "oklch(0.75 0.008 80)",
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: "0.02em",
                  }}
                >
                  {label}
                  {isActive(href) && (
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-px"
                      style={{ background: "oklch(0.78 0.12 80)" }}
                    />
                  )}
                </Link>
              ))}
              <a
                href="/contact#schedule"
                className="btn-gold px-5 py-2.5 text-sm rounded-sm"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Schedule a Call
              </a>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              style={{ color: "oklch(0.78 0.12 80)" }}
            >
              {mobileOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div
            className="md:hidden"
            style={{
              background: "oklch(0.10 0.008 240)",
              borderTop: "1px solid oklch(0.22 0.008 240)",
            }}
          >
            <div className="container py-6 flex flex-col gap-4">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-base font-medium py-2"
                  style={{
                    color: isActive(href) ? "oklch(0.78 0.12 80)" : "oklch(0.75 0.008 80)",
                    borderBottom: "1px solid oklch(0.18 0.008 240)",
                  }}
                >
                  {label}
                </Link>
              ))}
              <a
                href="/contact#schedule"
                className="btn-gold px-5 py-3 text-sm rounded-sm text-center mt-2"
              >
                Schedule a Call
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Sticky mobile CTA: schedule + call (Wave 2.5) */}
      <div
        className="fixed bottom-0 left-0 right-0 md:hidden z-40 flex phone-bar-wrap"
        style={{
          background: "oklch(0.10 0.008 240 / 0.97)",
          borderTop: "1px solid oklch(0.22 0.008 240)",
          backdropFilter: "blur(12px)",
          padding: "0.65rem 0.85rem",
          gap: "0.65rem",
        }}
      >
        <a
          href="/contact#schedule"
          className="btn-gold flex-1 py-2.5 rounded-sm text-sm text-center font-medium"
        >
          Schedule a Call
        </a>
        <a
          href="tel:9103151800"
          className="btn-ghost-gold px-3 py-2.5 rounded-sm text-sm flex items-center gap-1.5"
          aria-label="Call 617 East Trust"
          onClick={trackCall}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M13.5 10.5c-.8-.8-1.8-1.3-2.8-1.3-.5 0-1 .1-1.4.4L8 10.9C6.6 9.8 5.2 8.4 4.1 7L5.4 5.7c.3-.4.4-.9.4-1.4 0-1-.5-2-1.3-2.8L3.3 1C3 .7 2.6.5 2.2.5 1.3.5.5 1.3.5 2.2c0 7.3 6 13.3 13.3 13.3.9 0 1.7-.8 1.7-1.7 0-.4-.2-.8-.5-1.1l-1.5-1.2z" fill="currentColor"/>
          </svg>
          Call
        </a>
      </div>

      {/* Footer */}
      <footer style={{ background: "oklch(0.08 0.006 240)", borderTop: "1px solid oklch(0.18 0.008 240)" }}>
        <div className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <img
                  src="/images/logo-seal.svg"
                  alt="617 East Trust"
                  width={52}
                  height={52}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "oklch(0.52 0.008 80)" }}>
                The advisor who tells you what not to do. Serving founders and individuals across North Carolina.
              </p>
              <div className="flex flex-col gap-2">
              <a
                href="tel:9103151800"
                className="text-sm font-medium transition-colors"
                style={{ color: "oklch(0.78 0.12 80)" }}
                onClick={trackCall}
              >
                (910) 315-1800
              </a>
                <a
                  href="mailto:info@617east.com"
                  className="text-sm transition-colors"
                  style={{ color: "oklch(0.52 0.008 80)" }}
                >
                  info@617east.com
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <span className="section-label">Services</span>
              <ul className="space-y-3">
                {SERVICE_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm transition-colors"
                      style={{ color: "oklch(0.52 0.008 80)" }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <span className="section-label">Company</span>
              <ul className="space-y-3">
                {[
                  { href: "/about", label: "About Us" },
                  { href: "/blog", label: "Resources" },
                  { href: "/contact", label: "Contact" },
                  { href: "/privacy", label: "Privacy Policy" },
                  { href: "/terms", label: "Terms of Service" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm transition-colors"
                      style={{ color: "oklch(0.52 0.008 80)" }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Area */}
            <div>
              <span className="section-label">Service Area</span>
              <ul className="space-y-2">
                {["Sandhills Region", "Pinehurst, NC", "Southern Pines, NC", "Charlotte, NC", "Fayetteville, NC", "Raleigh, NC"].map((city) => (
                  <li key={city} className="text-sm" style={{ color: "oklch(0.52 0.008 80)" }}>
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderTop: "1px solid oklch(0.18 0.008 240)" }}
          >
            <p className="text-xs" style={{ color: "oklch(0.40 0.006 80)" }}>
              © 2026 617 East Trust. All rights reserved. North Carolina.
            </p>
            <p className="text-xs" style={{ color: "oklch(0.35 0.005 80)" }}>
              Not a law firm. Not a CPA firm. An advisor who tells you what not to do.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
