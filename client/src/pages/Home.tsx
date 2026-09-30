/*
 * 617 EAST TRUST — HOME
 * Blacklight Ledger: a signal-rich, editorial experience that turns the
 * approved promise into a visual system without changing brand copy.
 */

import Layout from "@/components/Layout";
import BrandLogo from "@/components/BrandLogo";
import Testimonials from "@/components/Testimonials";
import {
  BRAND_PROMISE,
  BRAND_VALUES,
  CLOSING_CTA_BODY,
  CLOSING_CTA_HEADING,
  CLOSING_CTA_HEADING_EM,
  CLOSING_CTA_LABEL,
  FOUNDER_QUOTE,
  FOUNDER_QUOTE_ATTRIBUTION,
  HERO_HEADLINE_EM,
  HERO_HEADLINE_WORDS,
  HERO_SUPPORTING,
  HERO_TRUST_INDICATORS,
  PHILOSOPHY_BODY_1,
  PHILOSOPHY_BODY_2,
  PHILOSOPHY_HEADING,
  PHILOSOPHY_HEADING_EM,
  READINESS_PROMISE,
} from "@/data/brandCopy";
import { SERVICES } from "@/data/services";
import { getHomepageTestimonials } from "@/data/testimonials";
import { useReveal } from "@/hooks/useReveal";
import { Link } from "wouter";
import { useEffect, useState } from "react";

const HOME_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I qualify for an SBA loan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SBA loan eligibility depends on your business size, time in operation, credit history, and the specific loan program. We assess your situation honestly and tell you upfront whether you qualify — and if not, what needs to change first.",
      },
    },
    {
      "@type": "Question",
      name: "How long does credit repair take in North Carolina?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most clients see meaningful improvement within 3–6 months. The timeline depends on the number and type of negative items. We do not make guarantees — we make honest assessments.",
      },
    },
    {
      "@type": "Question",
      name: "Can you guarantee results from credit repair?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Anyone who guarantees specific credit score increases is misleading you. We can tell you what is legally disputable, what the process looks like, and what realistic outcomes are. That honesty is what distinguishes us.",
      },
    },
  ],
};

const PROCESS = [
  {
    step: "01",
    title: "Start with context",
    body: "You explain where you are, what you want to accomplish, and what is already in motion.",
  },
  {
    step: "02",
    title: "See the options",
    body: "We map the requirements, tradeoffs, and practical paths so there is a full picture to work from.",
  },
  {
    step: "03",
    title: "Define the engagement",
    body: "If we proceed, the scope, fees, timeline, and realistic next steps are clear before work begins.",
  },
  {
    step: "04",
    title: "Move with support",
    body: "You have an advisor who stays available as the next decision comes into view.",
  },
];

function ArrowIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8h9M8.5 3.5 13 8l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  const heroRef = useReveal(0.1);
  const philosophyRef = useReveal(0.12);
  const servicesRef = useReveal(0.1);
  const processRef = useReveal(0.1);
  const ctaRef = useReveal(0.1);
  const [heroStarted, setHeroStarted] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      setHeroStarted(true);
      return;
    }
    const timer = window.setTimeout(() => setHeroStarted(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <Layout pageSchema={HOME_SCHEMA}>
      <section className="relative flex min-h-[100dvh] items-center overflow-hidden pt-24">
        <div className="signal-grid pointer-events-none absolute inset-0 opacity-80" />
        <div className="pointer-events-none absolute -right-40 top-16 h-[34rem] w-[34rem] rounded-full bg-[oklch(0.46_0.15_293/0.18)] blur-3xl" />
        <div className="pointer-events-none absolute -left-48 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.45_0.12_208/0.12)] blur-3xl" />

        <div
          className="container relative z-10 py-20 lg:py-28"
          ref={heroRef as React.RefObject<HTMLDivElement>}
        >
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7 xl:col-span-6">
              <span
                className="section-label"
                style={{
                  opacity: heroStarted ? 1 : 0,
                  transition: "opacity 700ms cubic-bezier(0.16,1,0.3,1) 160ms",
                }}
              >
                Business Formation &amp; Financial Advisory — North Carolina
              </span>
              <div
                className="gold-rule"
                style={{
                  transform: heroStarted ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition:
                    "transform 850ms cubic-bezier(0.16,1,0.3,1) 320ms",
                }}
              />
              <h1 className="font-display max-w-4xl text-[clamp(4rem,9vw,8.5rem)] leading-[0.84] tracking-[-0.055em] text-[oklch(0.95_0.01_85)]">
                {HERO_HEADLINE_WORDS.map((word, index) => (
                  <span
                    key={word}
                    className="mr-[0.19em] inline-block"
                    style={{
                      opacity: heroStarted ? 1 : 0,
                      transform: heroStarted
                        ? "translateY(0)"
                        : "translateY(42px)",
                      transition: `opacity 900ms cubic-bezier(0.16,1,0.3,1) ${440 + index * 90}ms, transform 900ms cubic-bezier(0.16,1,0.3,1) ${440 + index * 90}ms`,
                    }}
                  >
                    {word}
                  </span>
                ))}
                <em
                  className="mt-4 block pr-4 text-[clamp(2.8rem,6.5vw,6.5rem)] leading-[0.92] text-[oklch(0.8_0.12_80)]"
                  style={{
                    opacity: heroStarted ? 1 : 0,
                    transform: heroStarted
                      ? "translateY(0)"
                      : "translateY(36px)",
                    transition:
                      "opacity 1000ms cubic-bezier(0.16,1,0.3,1) 860ms, transform 1000ms cubic-bezier(0.16,1,0.3,1) 860ms",
                  }}
                >
                  {HERO_HEADLINE_EM}
                </em>
              </h1>
              <p
                className="mt-8 max-w-xl text-base leading-8 text-[oklch(0.74_0.03_85)] md:text-lg"
                style={{
                  opacity: heroStarted ? 1 : 0,
                  transform: heroStarted ? "translateY(0)" : "translateY(22px)",
                  transition:
                    "opacity 900ms cubic-bezier(0.16,1,0.3,1) 1120ms, transform 900ms cubic-bezier(0.16,1,0.3,1) 1120ms",
                }}
              >
                {HERO_SUPPORTING}
              </p>
              <div
                className="mt-9 flex flex-wrap gap-3"
                style={{
                  opacity: heroStarted ? 1 : 0,
                  transform: heroStarted ? "translateY(0)" : "translateY(18px)",
                  transition:
                    "opacity 800ms cubic-bezier(0.16,1,0.3,1) 1280ms, transform 800ms cubic-bezier(0.16,1,0.3,1) 1280ms",
                }}
              >
                <a
                  href="/contact#schedule"
                  className="btn-gold px-6 py-3.5 text-sm"
                >
                  Book a free consultation
                  <ArrowIcon />
                </a>
                <a
                  href="tel:9103151800"
                  className="btn-ghost-gold px-6 py-3.5 text-sm"
                >
                  (910) 315-1800
                  <ArrowIcon />
                </a>
              </div>
              <p className="mt-8 font-mono text-[0.65rem] tracking-[0.14em] text-[oklch(0.66_0.075_208)]">
                {BRAND_PROMISE}
              </p>
            </div>

            <div
              className="lg:col-span-5 xl:col-span-6"
              style={{
                opacity: heroStarted ? 1 : 0,
                transform: heroStarted
                  ? "translateY(0) rotate(0deg)"
                  : "translateY(28px) rotate(1.5deg)",
                transition:
                  "opacity 1100ms cubic-bezier(0.16,1,0.3,1) 760ms, transform 1100ms cubic-bezier(0.16,1,0.3,1) 760ms",
              }}
            >
              <div className="blacklight-shell mx-auto max-w-xl">
                <div className="blacklight-core relative min-h-[31rem] overflow-hidden p-5 sm:p-7">
                  <div className="signal-grid absolute inset-0 opacity-50" />
                  <div className="relative flex items-center justify-between border-b border-[oklch(0.48_0.055_285/0.48)] pb-4">
                    <div>
                      <p className="font-mono text-[0.58rem] tracking-[0.18em] text-[oklch(0.7_0.09_210)]">
                        THE DECISION ROOM
                      </p>
                      <p className="mt-1 text-xs text-[oklch(0.63_0.025_85)]">
                        A clearer view before the next move.
                      </p>
                    </div>
                    <span className="data-chip flex items-center gap-2 px-3 py-1.5 font-mono text-[0.58rem] tracking-[0.12em] text-[oklch(0.76_0.13_210)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.76_0.13_210)] shadow-[0_0_11px_oklch(0.76_0.13_210/0.8)]" />
                      READY TO REVIEW
                    </span>
                  </div>

                  <div className="signal-orbit relative mx-auto mt-5 flex aspect-square w-full max-w-[19rem] items-center justify-center">
                    <div className="absolute inset-[2%] rounded-full border border-[oklch(0.78_0.12_80/0.18)]" />
                    <div className="absolute inset-[13%] rounded-full border border-dashed border-[oklch(0.76_0.13_210/0.24)]" />
                    <div className="relative z-10 rounded-full border border-[oklch(0.8_0.12_80/0.25)] bg-[oklch(0.12_0.025_284/0.8)] p-5 shadow-[inset_0_1px_0_oklch(1_0_0/0.1),0_0_56px_oklch(0.42_0.13_293/0.24)]">
                      <BrandLogo
                        size={142}
                        animated
                        className="brand-logo--hero"
                      />
                    </div>
                    <span className="absolute left-0 top-[18%] data-chip px-3 py-2 font-mono text-[0.55rem] tracking-[0.12em] text-[oklch(0.8_0.12_80)]">
                      CONTEXT
                    </span>
                    <span className="absolute bottom-[16%] right-[-2%] data-chip px-3 py-2 font-mono text-[0.55rem] tracking-[0.12em] text-[oklch(0.76_0.13_210)]">
                      OPTIONS
                    </span>
                  </div>

                  <div className="relative mt-4 grid grid-cols-2 gap-3">
                    {HERO_TRUST_INDICATORS.map((indicator, index) => (
                      <div
                        key={indicator}
                        className="rounded-2xl border border-[oklch(0.48_0.055_285/0.42)] bg-[oklch(0.11_0.022_284/0.76)] p-3 shadow-[inset_0_1px_0_oklch(1_0_0/0.06)]"
                      >
                        <span className="font-mono text-[0.55rem] tracking-[0.12em] text-[oklch(0.7_0.09_210)]">
                          0{index + 1}
                        </span>
                        <p className="mt-1.5 text-xs leading-5 text-[oklch(0.8_0.018_85)]">
                          {indicator}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative py-28 lg:py-36"
        ref={philosophyRef as React.RefObject<HTMLElement>}
      >
        <div className="container">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <span className="section-label reveal">
                The advantage of a full picture
              </span>
              <div className="gold-rule reveal reveal-delay-1" />
              <h2 className="font-display max-w-3xl text-5xl leading-[0.98] tracking-[-0.04em] text-[oklch(0.95_0.01_85)] md:text-6xl lg:text-7xl reveal reveal-delay-1">
                {PHILOSOPHY_HEADING}
                <br />
                <em className="text-[oklch(0.76_0.13_210)]">
                  {PHILOSOPHY_HEADING_EM}
                </em>
              </h2>
              <div className="mt-10 grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
                <p className="text-base leading-8 text-[oklch(0.7_0.03_85)] reveal reveal-delay-2">
                  {PHILOSOPHY_BODY_1}
                </p>
                <p className="border-l border-[oklch(0.76_0.13_210/0.55)] pl-6 font-display text-2xl leading-9 italic text-[oklch(0.87_0.018_85)] reveal reveal-delay-3">
                  {READINESS_PROMISE}
                </p>
              </div>
              <p className="mt-8 max-w-2xl text-base leading-8 text-[oklch(0.65_0.025_85)] reveal reveal-delay-3">
                {PHILOSOPHY_BODY_2}
              </p>
              <Link
                href="/about"
                className="btn-ghost-gold mt-9 px-6 py-3 text-sm reveal reveal-delay-4"
              >
                Meet Lamont Legrand <ArrowIcon />
              </Link>
            </div>

            <div className="lg:col-span-5 reveal reveal-delay-2">
              <div className="blacklight-shell">
                <div className="blacklight-core overflow-hidden p-3">
                  <div className="relative overflow-hidden rounded-[1.5rem]">
                    <img
                      src="/images/lamont-legrand-founder_d88b26c8.jpg"
                      alt="Lamont Legrand, Founder of 617 East Trust — commercial banking and SBA lending professional"
                      className="h-[28rem] w-full object-cover object-top sm:h-[34rem]"
                      style={{
                        filter:
                          "contrast(1.04) saturate(0.82) brightness(0.82)",
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[oklch(0.09_0.02_284/0.98)] via-[oklch(0.09_0.02_284/0.56)] to-transparent p-6 pt-24">
                      <p className="font-mono text-[0.6rem] tracking-[0.15em] text-[oklch(0.76_0.13_210)]">
                        FOUNDER &amp; PRINCIPAL ADVISOR
                      </p>
                      <p className="mt-2 font-display text-3xl text-[oklch(0.95_0.01_85)]">
                        Lamont Legrand
                      </p>
                    </div>
                  </div>
                  <blockquote className="p-6 font-display text-2xl leading-9 italic text-[oklch(0.84_0.02_85)]">
                    “{FOUNDER_QUOTE}”
                    <cite className="mt-4 block font-mono text-[0.58rem] not-italic tracking-[0.12em] text-[oklch(0.76_0.13_210)]">
                      — {FOUNDER_QUOTE_ATTRIBUTION}
                    </cite>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-3 md:grid-cols-4">
            {BRAND_VALUES.map((value, index) => (
              <div
                key={value.title}
                className={`blacklight-shell reveal reveal-delay-${Math.min(index + 1, 4)}`}
              >
                <div className="blacklight-core p-6">
                  <span className="font-mono text-xs tracking-[0.14em] text-[oklch(0.76_0.13_210)]">
                    0{index + 1}
                  </span>
                  <h3 className="mt-8 text-lg font-semibold text-[oklch(0.94_0.01_85)]">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[oklch(0.63_0.025_85)]">
                    {value.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden py-28 lg:py-36"
        ref={servicesRef as React.RefObject<HTMLElement>}
      >
        <div className="pointer-events-none absolute right-0 top-12 h-80 w-80 rounded-full bg-[oklch(0.42_0.13_293/0.12)] blur-3xl" />
        <div className="container relative">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="section-label reveal">
                A connected advisory system
              </span>
              <div className="gold-rule reveal reveal-delay-1" />
              <h2 className="max-w-2xl text-4xl font-semibold leading-tight text-[oklch(0.95_0.01_85)] md:text-5xl reveal reveal-delay-1">
                Six ways to build a more prepared next step.
              </h2>
            </div>
            <Link
              href="/services"
              className="btn-ghost-gold w-fit px-5 py-3 text-sm reveal reveal-delay-2"
            >
              Explore all services <ArrowIcon />
            </Link>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={`service-card block p-7 sm:p-8 reveal reveal-delay-${Math.min(index + 1, 5)} ${index === 0 || index === 4 ? "lg:col-span-2" : ""}`}
              >
                <div className="flex items-start justify-between gap-4 pr-5">
                  <span className="font-mono text-[0.6rem] tracking-[0.14em] text-[oklch(0.76_0.13_210)]">
                    0{index + 1} / 06
                  </span>
                  <span className="font-mono text-xs text-[oklch(0.8_0.12_80)]">
                    {service.price}
                  </span>
                </div>
                <h3 className="mt-12 max-w-md text-2xl font-semibold text-[oklch(0.95_0.01_85)]">
                  {service.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-6 text-[oklch(0.65_0.025_85)]">
                  {service.tagline}
                </p>
                <div className="mt-8 flex items-center justify-between border-t border-[oklch(0.48_0.055_285/0.42)] pt-4">
                  <span className="font-mono text-[0.6rem] tracking-[0.1em] text-[oklch(0.56_0.03_85)]">
                    {service.timeline}
                  </span>
                  <span className="flex items-center gap-2 text-xs font-medium text-[oklch(0.76_0.13_210)]">
                    VIEW SERVICE <ArrowIcon size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-28 lg:py-36"
        ref={processRef as React.RefObject<HTMLElement>}
      >
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <span className="section-label reveal">How we work together</span>
              <div className="gold-rule reveal reveal-delay-1" />
              <h2 className="font-display text-5xl leading-[0.96] tracking-[-0.04em] text-[oklch(0.95_0.01_85)] md:text-6xl reveal reveal-delay-1">
                Careful from the first conversation.{" "}
                <em className="text-[oklch(0.8_0.12_80)]">
                  Clear at every turn.
                </em>
              </h2>
              <p className="mt-7 max-w-md text-base leading-8 text-[oklch(0.66_0.025_85)] reveal reveal-delay-2">
                There is no black box. The work moves in visible stages so you
                know what is being considered and what is coming next.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:col-span-7">
              {PROCESS.map((item, index) => (
                <article
                  key={item.step}
                  className={`blacklight-shell reveal reveal-delay-${Math.min(index + 1, 4)}`}
                >
                  <div className="blacklight-core min-h-56 p-7 sm:p-8">
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-xl tracking-[-0.06em] text-[oklch(0.8_0.12_80)]">
                        {item.step}
                      </span>
                      <span className="h-2 w-2 rounded-full bg-[oklch(0.76_0.13_210)] shadow-[0_0_14px_oklch(0.76_0.13_210/0.7)]" />
                    </div>
                    <h3 className="mt-14 text-xl font-semibold text-[oklch(0.94_0.01_85)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[oklch(0.65_0.025_85)]">
                      {item.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Testimonials items={getHomepageTestimonials(3)} />

      <section
        className="relative overflow-hidden py-28 lg:py-36"
        ref={ctaRef as React.RefObject<HTMLElement>}
      >
        <div className="pointer-events-none absolute inset-x-1/4 top-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.76_0.13_210/0.8)] to-transparent" />
        <div className="container max-w-5xl">
          <div className="blacklight-shell reveal">
            <div className="blacklight-core relative overflow-hidden px-6 py-16 text-center sm:px-12 lg:px-20 lg:py-24">
              <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.48_0.14_293/0.24)] blur-3xl" />
              <div className="relative">
                <span className="section-label mx-auto w-fit reveal reveal-delay-1">
                  Ready when you are
                </span>
                <div className="gold-rule mx-auto reveal reveal-delay-1" />
                <h2 className="font-display text-5xl leading-[0.98] tracking-[-0.04em] text-[oklch(0.95_0.01_85)] md:text-6xl reveal reveal-delay-2">
                  {CLOSING_CTA_HEADING}
                  <em className="text-[oklch(0.76_0.13_210)]">
                    {CLOSING_CTA_HEADING_EM}
                  </em>
                </h2>
                <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[oklch(0.68_0.025_85)] reveal reveal-delay-3">
                  {CLOSING_CTA_BODY}
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-3 reveal reveal-delay-4">
                  <a
                    href="/contact#schedule"
                    className="btn-gold px-7 py-4 text-sm"
                  >
                    {CLOSING_CTA_LABEL} <ArrowIcon />
                  </a>
                  <a
                    href="tel:9103151800"
                    className="btn-ghost-gold px-7 py-4 text-sm"
                  >
                    (910) 315-1800 <ArrowIcon />
                  </a>
                </div>
                <p className="mt-8 font-mono text-[0.6rem] tracking-[0.14em] text-[oklch(0.62_0.06_208)] reveal reveal-delay-4">
                  Response within 24 hours. Same-day for inquiries before 3 PM
                  EST.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
