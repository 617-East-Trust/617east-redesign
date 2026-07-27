/*
 * 617 EAST TRUST — HOME PAGE
 * Midnight Ledger design system.
 * Narrative arc: Skepticism → Recognition → Trust → Partnership → Action
 * Sections: Hero | Philosophy | Services | Stats | Process | CTA
 */

import Layout from "@/components/Layout";
import { useReveal } from "@/hooks/useReveal";
import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";

const HOME_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do I qualify for an SBA loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SBA loan eligibility depends on your business size, time in operation, credit history, and the specific loan program. We assess your situation honestly and tell you upfront whether you qualify — and if not, what needs to change first."
      }
    },
    {
      "@type": "Question",
      "name": "How long does credit repair take in North Carolina?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most clients see meaningful improvement within 3–6 months. The timeline depends on the number and type of negative items. We do not make guarantees — we make honest assessments."
      }
    },
    {
      "@type": "Question",
      "name": "Can you guarantee results from credit repair?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Anyone who guarantees specific credit score increases is misleading you. We can tell you what is legally disputable, what the process looks like, and what realistic outcomes are. That honesty is what distinguishes us."
      }
    }
  ]
};

const SERVICES = [
  {
    slug: "llc-formation-north-carolina",
    label: "LLC Formation",
    price: "$499",
    time: "5–10 days",
    description: "North Carolina LLC formation with registered agent, operating agreement, and EIN. We tell you what structure actually fits your situation.",
  },
  {
    slug: "sba-loans-north-carolina",
    label: "SBA Loans",
    price: "Consulting",
    time: "Assessment first",
    description: "SBA 7(a) and 504 loan consulting from someone who has worked inside the lending process. We tell you if you qualify before you waste time applying.",
  },
  {
    slug: "credit-repair-north-carolina",
    label: "Credit Repair",
    price: "Starting $199/mo",
    time: "3–6 months",
    description: "Dispute inaccurate items, build positive history, and understand your credit profile. No guarantees — just honest, legal, effective work.",
  },
  {
    slug: "bookkeeping-north-carolina",
    label: "Bookkeeping",
    price: "$199/mo",
    time: "Monthly",
    description: "Clean books, reconciled accounts, and financial clarity. The foundation every business needs before it can grow.",
  },
  {
    slug: "fractional-cfo",
    label: "Fractional CFO",
    price: "$1,200/mo",
    time: "Ongoing",
    description: "Strategic financial leadership without a full-time hire. Cash flow, forecasting, and the financial decisions that actually matter.",
  },
  {
    slug: "web-design-seo",
    label: "Web Design & SEO",
    price: "From $1,500",
    time: "4–6 weeks",
    description: "Websites that rank and convert. Built for search engines and real humans — not just to look good in a screenshot.",
  },
];

const STATS = [
  { value: "$125", label: "NC State Filing Fee", note: "We charge $499 total" },
  { value: "5–10", label: "Business Days to Form", note: "Or $200 to expedite" },
  { value: "3–6", label: "Months for Credit Repair", note: "Realistic, not promised" },
  { value: "6", label: "Services Under One Roof", note: "Formation to funding" },
];

export default function Home() {
  const heroRef = useReveal(0.1);
  const philosophyRef = useReveal(0.15);
  const servicesRef = useReveal(0.1);
  const statsRef = useReveal(0.15);
  const processRef = useReveal(0.1);
  const ctaRef = useReveal(0.15);

  // ── Hybrid hero animation (Concepts 01 + 03) ──
  const [heroStarted, setHeroStarted] = useState(false);
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLButtonElement>(null);

  // Entrance sequence on load (Concept 01)
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setHeroStarted(true);
      return;
    }
    const t = setTimeout(() => setHeroStarted(true), 120);
    return () => clearTimeout(t);
  }, []);

  // Scroll-linked parallax + fade (Concept 03)
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const section = heroSectionRef.current;
        const bg = heroBgRef.current;
        const content = heroContentRef.current;
        if (!section || !bg || !content) return;
        const rect = section.getBoundingClientRect();
        const h = rect.height || 1;
        // progress: 0 when hero top at viewport top, 1 when hero fully scrolled past
        const p = Math.min(Math.max(-rect.top / h, 0), 1);
        // Background parallax: drifts up slower than scroll + slight zoom continues
        bg.style.transform = `translateY(${p * 60}px) scale(${1.0 + p * 0.04})`;
        // Content: drifts up faster + fades as user scrolls away
        content.style.transform = `translateY(${p * -40}px)`;
        content.style.opacity = String(1 - p * 1.4);
        // Scroll hint: dissolves quickly once the user starts scrolling
        const hint = scrollHintRef.current;
        if (hint) {
          hint.style.opacity = p > 0.02 ? "0" : "";
          hint.style.pointerEvents = p > 0.02 ? "none" : "";
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const heroWords = ["The", "most", "important", "thing", "we", "do", "is", "tell", "you"];

  return (
    <Layout pageSchema={HOME_SCHEMA}>
      {/* ── HERO ────────────────────────────────────────────── */}
      <section
        ref={heroSectionRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ paddingTop: "72px" }}
      >
        {/* Background image */}
        <div
          ref={heroBgRef}
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/manus-storage/617east-hero-v2_1ca341a7.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center right",
            backgroundRepeat: "no-repeat",
            animation: heroStarted ? "kenburns-drift 24s cubic-bezier(0.23, 1, 0.32, 1) forwards" : "none",
            willChange: "transform",
          }}
        />
        {/* Gradient overlay — left-heavy for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(105deg, oklch(0.10 0.008 240 / 0.97) 0%, oklch(0.10 0.008 240 / 0.92) 45%, oklch(0.10 0.008 240 / 0.55) 75%, oklch(0.10 0.008 240 / 0.35) 100%)",
          }}
        />

        <div className="container relative z-10 py-24" ref={heroContentRef} style={{ willChange: "transform, opacity" }}>
          <div className="max-w-2xl" ref={heroRef as React.RefObject<HTMLDivElement>}>
            {/* Section label */}
            <span
              className="section-label"
              style={{
                opacity: heroStarted ? 1 : 0,
                transition: "opacity 600ms ease 200ms",
              }}
            >
              Business Formation & Financial Advisory — North Carolina
            </span>
            <div
              className="gold-rule"
              style={{
                width: heroStarted ? undefined : "0px",
                transition: "width 600ms cubic-bezier(0.23,1,0.32,1) 400ms",
              }}
            />

            {/* Hero headline — display font */}
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(2.8rem, 6vw, 5rem)",
                lineHeight: "1.08",
                color: "oklch(0.94 0.005 80)",
                fontWeight: 600,
                marginBottom: "1.75rem",
                letterSpacing: "-0.01em",
              }}
            >
              {heroWords.map((w, i) => (
                <span
                  key={i}
                  className="inline-block mr-[0.26em]"
                  style={{
                    opacity: heroStarted ? 1 : 0,
                    transform: heroStarted ? "translateY(0)" : "translateY(16px)",
                    transition: `opacity 550ms cubic-bezier(0.23,1,0.32,1) ${450 + i * 65}ms, transform 550ms cubic-bezier(0.23,1,0.32,1) ${450 + i * 65}ms`,
                  }}
                >
                  {w}
                </span>
              ))}
              <em
                className="block mt-1"
                style={{
                  color: "oklch(0.78 0.12 80)",
                  fontStyle: "italic",
                  opacity: heroStarted ? 1 : 0,
                  transform: heroStarted ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 750ms cubic-bezier(0.23,1,0.32,1) 1300ms, transform 750ms cubic-bezier(0.23,1,0.32,1) 1300ms",
                }}
              >
                what not to do.
              </em>
            </h1>

            <p
              className="text-lg leading-relaxed"
              style={{
                color: "oklch(0.72 0.008 80)", maxWidth: "520px", marginBottom: "2.5rem",
                opacity: heroStarted ? 1 : 0,
                transition: "opacity 800ms ease 1750ms",
              }}
            >
              617 East Trust is a North Carolina advisory firm for founders and individuals who want a partner — not a processor. We handle LLC formation, SBA loans, credit repair, bookkeeping, and more.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-4"
              style={{
                opacity: heroStarted ? 1 : 0,
                transform: heroStarted ? "scale(1)" : "scale(0.96)",
                transition: "opacity 500ms cubic-bezier(0.23,1,0.32,1) 2050ms, transform 500ms cubic-bezier(0.23,1,0.32,1) 2050ms",
              }}
            >
              <a
                href="/contact"
                className="btn-gold px-7 py-3.5 rounded-sm text-sm inline-flex items-center gap-2"
              >
                Book a Free Consultation
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="tel:9103151800"
                className="btn-ghost-gold px-7 py-3.5 rounded-sm text-sm inline-flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 2.5A1.5 1.5 0 013.5 1h1.879a1 1 0 01.958.713l.9 3a1 1 0 01-.27 1.02L5.5 7.207a9.03 9.03 0 004.293 4.293l1.474-1.467a1 1 0 011.02-.27l3 .9A1 1 0 0116 11.62V13.5A1.5 1.5 0 0114.5 15C7.044 15 1 8.956 1 1.5A1.5 1.5 0 012.5 0H3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                (910) 315-1800 — We answer.
              </a>
            </div>

            {/* Trust indicators */}
            <div
              className="flex flex-wrap gap-6 mt-10"
              style={{ borderTop: "1px solid oklch(0.22 0.008 240)", paddingTop: "1.5rem" }}
            >
              {["NC Registered", "Banking Background", "No Automated Filers", "Real Advisor"].map((item, i) => (
                <div
                  key={item}
                  className="flex items-center gap-2"
                  style={{
                    opacity: heroStarted ? 1 : 0,
                    transform: heroStarted ? "translateX(0)" : "translateX(-14px)",
                    transition: `opacity 500ms cubic-bezier(0.23,1,0.32,1) ${2300 + i * 90}ms, transform 500ms cubic-bezier(0.23,1,0.32,1) ${2300 + i * 90}ms`,
                  }}
                >
                  <span style={{ color: "oklch(0.78 0.12 80)", fontSize: "0.7rem" }}>◆</span>
                  <span className="text-xs tracking-wide" style={{ color: "oklch(0.58 0.010 80)" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Animated scroll-down arrow */}
        <button
          ref={scrollHintRef}
          onClick={() => {
            const section = heroSectionRef.current;
            if (section) {
              window.scrollTo({ top: section.offsetHeight - 60, behavior: "smooth" });
            }
          }}
          aria-label="Scroll down to explore"
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          style={{
            background: "transparent",
            border: "none",
            color: "oklch(0.52 0.010 80)",
            opacity: heroStarted ? 1 : 0,
            transition: "opacity 900ms ease 2800ms",
          }}
        >
          <span
            className="text-xs tracking-widest"
            style={{ fontSize: "0.6rem", letterSpacing: "0.24em" }}
          >
            SCROLL
          </span>
          <span className="scroll-arrow-bob flex flex-col items-center">
            <svg width="18" height="26" viewBox="0 0 18 26" fill="none" aria-hidden="true">
              <path
                d="M9 2v18M3 15l6 6 6-6"
                stroke="oklch(0.78 0.12 80)"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </section>

      {/* ── PHILOSOPHY ──────────────────────────────────────── */}
      <section
        className="py-24"
        style={{ background: "oklch(0.13 0.009 240)" }}
        ref={philosophyRef as React.RefObject<HTMLElement>}
      >
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label reveal">Our Philosophy</span>
              <div className="gold-rule reveal reveal-delay-1" />
              <h2
                className="font-display text-4xl md:text-5xl reveal reveal-delay-1"
                style={{ color: "oklch(0.94 0.005 80)", lineHeight: "1.15", marginBottom: "1.5rem" }}
              >
                You don't need a filer.{" "}
                <br />
                <em style={{ color: "oklch(0.78 0.12 80)" }}>You need someone who's seen the inside.</em>
              </h2>
              <p className="text-base leading-relaxed reveal reveal-delay-2" style={{ color: "oklch(0.58 0.010 80)", marginBottom: "1.25rem" }}>
                Lamont Legrand built 617 East Trust after years inside commercial banking and SBA lending. He has seen the applications that get approved, the ones that don't, and — more importantly — the ones that should never have been submitted.
              </p>
              <p className="text-base leading-relaxed reveal reveal-delay-3" style={{ color: "oklch(0.58 0.010 80)", marginBottom: "2rem" }}>
                That institutional knowledge is what you're hiring when you work with us. Not a form. Not a chatbot. A person who will tell you the truth about your situation — including when the answer is "not yet."
              </p>
              <Link
                href="/about"
                className="btn-ghost-gold px-6 py-3 rounded-sm text-sm inline-flex items-center gap-2 reveal reveal-delay-4"
              >
                Meet Lamont Legrand
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            {/* Right: founder portrait + quote */}
            <div className="reveal reveal-delay-2">
              {/* Portrait */}
              <div className="relative mb-8">
                <div
                  className="absolute -top-2 -right-2 w-full h-full"
                  style={{ border: "1px solid oklch(0.78 0.12 80 / 0.25)", borderRadius: "2px", zIndex: 0 }}
                />
                <div className="relative" style={{ zIndex: 1 }}>
                  <img
                    src="/manus-storage/lamont-legrand-founder_d88b26c8.jpg"
                    alt="Lamont Legrand, Founder of 617 East Trust — commercial banking and SBA lending professional"
                    className="w-full object-cover"
                    style={{ maxHeight: "320px", objectPosition: "top center", filter: "contrast(1.03) brightness(0.96)" }}
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 px-5 py-4"
                    style={{ background: "linear-gradient(to top, oklch(0.10 0.008 240 / 0.92) 0%, transparent 100%)" }}
                  >
                    <p className="font-mono text-xs" style={{ color: "oklch(0.78 0.12 80)", letterSpacing: "0.08em" }}>
                      LAMONT LEGRAND — FOUNDER & PRINCIPAL ADVISOR
                    </p>
                  </div>
                </div>
              </div>
              {/* Quote */}
              <div style={{ borderLeft: "3px solid oklch(0.78 0.12 80)", paddingLeft: "1.5rem", marginBottom: "2.5rem" }}>
                <blockquote
                  className="font-display text-xl"
                  style={{ color: "oklch(0.88 0.008 80)", lineHeight: "1.5", fontStyle: "italic", marginBottom: "0.75rem" }}
                >
                  "Most people come to us after they've already made a mistake. Our goal is to become the call they make before they make one."
                </blockquote>
                <cite className="text-sm not-italic" style={{ color: "oklch(0.58 0.010 80)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em" }}>
                  — Lamont Legrand, Founder
                </cite>
              </div>
              {/* Three pillars */}
              <div className="space-y-6">
                {[
                  { title: "Accountability", body: "We tell you what we can and can't do. No overpromising." },
                  { title: "Trust", body: "Built over time, through honest advice — including the advice you didn't want to hear." },
                  { title: "Transparency", body: "Every fee, every timeline, every limitation — disclosed upfront." },
                ].map((pillar, i) => (
                  <div key={pillar.title} className={`reveal reveal-delay-${i + 2}`}>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-xs" style={{ color: "oklch(0.78 0.12 80)" }}>0{i + 1}</span>
                      <span className="text-sm font-semibold" style={{ color: "oklch(0.88 0.008 80)" }}>{pillar.title}</span>
                    </div>
                    <p className="text-sm leading-relaxed pl-8" style={{ color: "oklch(0.52 0.008 80)" }}>{pillar.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────────── */}
      <section
        className="py-24"
        style={{ background: "oklch(0.10 0.008 240)" }}
        ref={servicesRef as React.RefObject<HTMLElement>}
      >
        <div className="container">
          <div className="mb-14">
            <span className="section-label reveal">What We Do</span>
            <div className="gold-rule reveal reveal-delay-1" />
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2
                className="text-3xl md:text-4xl font-semibold reveal reveal-delay-1"
                style={{ color: "oklch(0.94 0.005 80)", maxWidth: "480px", lineHeight: "1.2" }}
              >
                Six services. One advisor. No handoffs.
              </h2>
              <Link
                href="/services"
                className="text-sm reveal reveal-delay-2 inline-flex items-center gap-2"
                style={{ color: "oklch(0.78 0.12 80)" }}
              >
                View all services
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "oklch(0.22 0.008 240)" }}>
            {SERVICES.map((service, i) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={`service-card p-8 block reveal reveal-delay-${Math.min(i + 1, 5)}`}
                style={{ background: "oklch(0.10 0.008 240)" }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="font-mono text-xs" style={{ color: "oklch(0.78 0.12 80)" }}>
                    0{i + 1}
                  </span>
                  <span
                    className="font-mono text-xs"
                    style={{ color: "oklch(0.40 0.006 80)" }}
                  >
                    {service.time}
                  </span>
                </div>
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{ color: "oklch(0.94 0.005 80)" }}
                >
                  {service.label}
                </h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "oklch(0.52 0.008 80)" }}>
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm" style={{ color: "oklch(0.78 0.12 80)" }}>
                    {service.price}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: "oklch(0.40 0.006 80)" }}>
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────────── */}
      <section
        className="py-20"
        style={{ background: "oklch(0.13 0.009 240)", borderTop: "1px solid oklch(0.18 0.008 240)", borderBottom: "1px solid oklch(0.18 0.008 240)" }}
        ref={statsRef as React.RefObject<HTMLElement>}
      >
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div key={stat.label} className={`reveal reveal-delay-${i + 1}`}>
                <div className="stat-number mb-2">{stat.value}</div>
                <div className="text-sm font-medium mb-1" style={{ color: "oklch(0.88 0.008 80)" }}>
                  {stat.label}
                </div>
                <div className="text-xs" style={{ color: "oklch(0.45 0.007 80)" }}>
                  {stat.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ─────────────────────────────────────────── */}
      <section
        className="py-24"
        style={{ background: "oklch(0.10 0.008 240)" }}
        ref={processRef as React.RefObject<HTMLElement>}
      >
        <div className="container">
          <div className="mb-14">
            <span className="section-label reveal">How It Works</span>
            <div className="gold-rule reveal reveal-delay-1" />
            <h2
              className="text-3xl md:text-4xl font-semibold reveal reveal-delay-1"
              style={{ color: "oklch(0.94 0.005 80)", maxWidth: "480px", lineHeight: "1.2" }}
            >
              We start with an honest assessment.
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Free Consultation", body: "We talk. You explain your situation. We tell you what's realistic — including if we're not the right fit." },
              { step: "02", title: "Honest Assessment", body: "We review your financials, credit, or business structure and give you a clear picture. No upsells, no pressure." },
              { step: "03", title: "Defined Engagement", body: "If we proceed, you know exactly what we're doing, what it costs, and what the realistic outcome looks like." },
              { step: "04", title: "Ongoing Partnership", body: "Most clients stay for multiple services. We become the advisor you call before you make a decision." },
            ].map((step, i) => (
              <div
                key={step.step}
                className={`reveal reveal-delay-${i + 1}`}
                style={{
                  borderTop: "1px solid oklch(0.22 0.008 240)",
                  paddingTop: "1.5rem",
                }}
              >
                <div className="font-mono text-3xl font-medium mb-4" style={{ color: "oklch(0.78 0.12 80)" }}>
                  {step.step}
                </div>
                <h3 className="text-base font-semibold mb-3" style={{ color: "oklch(0.88 0.008 80)" }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "oklch(0.52 0.008 80)" }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: "oklch(0.13 0.009 240)" }}
        ref={ctaRef as React.RefObject<HTMLElement>}
      >
        {/* Subtle gold glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
          style={{ background: "linear-gradient(90deg, transparent, oklch(0.78 0.12 80 / 0.6), transparent)" }}
        />
        <div className="container max-w-3xl text-center">
          <span className="section-label reveal">Ready to Begin</span>
          <div className="gold-rule mx-auto reveal reveal-delay-1" />
          <h2
            className="font-display text-4xl md:text-5xl reveal reveal-delay-1"
            style={{ color: "oklch(0.94 0.005 80)", lineHeight: "1.15", marginBottom: "1.5rem" }}
          >
            Stop being processed.{" "}
            <em style={{ color: "oklch(0.78 0.12 80)" }}>Start being partnered with.</em>
          </h2>
          <p className="text-base leading-relaxed reveal reveal-delay-2" style={{ color: "oklch(0.58 0.010 80)", marginBottom: "2.5rem" }}>
            One free consultation. No commitment. We'll tell you exactly what we can do for your situation — and what we can't.
          </p>
          <div className="flex flex-wrap gap-4 justify-center reveal reveal-delay-3">
            <a href="/contact" className="btn-gold px-8 py-4 rounded-sm text-sm inline-flex items-center gap-2">
              Book Free Consultation
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="tel:9103151800" className="btn-ghost-gold px-8 py-4 rounded-sm text-sm inline-flex items-center gap-2">
              (910) 315-1800
            </a>
          </div>
          <p className="text-xs mt-6 reveal reveal-delay-4" style={{ color: "oklch(0.40 0.006 80)" }}>
            Response within 24 hours. Same-day for inquiries before 3 PM EST.
          </p>
        </div>
      </section>
    </Layout>
  );
}
