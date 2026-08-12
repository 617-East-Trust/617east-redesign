/*
 * 617 EAST TRUST — Opportunity Review landing page
 * Message-matched lander for Visibility Gap / Local SEO report traffic.
 * Query params: client, city, rating, reviews, token, source, utm_*
 * Form → n8n contact webhook with source=opportunity_review (3 fields).
 */

import Layout from "@/components/Layout";
import { PHONE_DISPLAY, PHONE_E164, EMAIL, telHref } from "@/data/nap";
import { useReveal } from "@/hooks/useReveal";
import {
  useHeroEntrance,
  heroLabelStyle,
  heroRuleStyle,
  heroHeadlineOuter,
  heroHeadlineInner,
  heroSubtextStyle,
} from "@/hooks/useHeroEntrance";
import {
  trackCall,
  trackLead,
  trackScheduleClick,
  trackEvent,
  trackOpportunityReviewView,
  trackOpportunityReviewCta,
} from "@/lib/analytics";
import { useEffect, useMemo, useRef, useState } from "react";

const CALENDLY_EVENT_URL = "https://calendly.com/617easttrust/30min";
const CONTACT_WEBHOOK = "https://n8n.617east.com/webhook/617east-contact";

const JOURNEY = [
  {
    title: "Urgency utility bar",
    body: "Need help now? Call + hours cue — fastest path for high-intent visitors.",
  },
  {
    title: "Trust-led hero",
    body: "Clear local headline, real rating/review proof, authentic local imagery.",
  },
  {
    title: "Primary action pair",
    body: "Call Now + Request Service — immediate and considered leads both served.",
  },
  {
    title: "Service quick-select",
    body: "Plain-language services so search visitors recognize their need in one tap.",
  },
  {
    title: "Proof + short form",
    body: "Why choose you, then name / phone / need — five fields or fewer.",
  },
  {
    title: "Persistent mobile CTA",
    body: "Fixed call + request bar so nobody scrolls back to act.",
  },
] as const;

const REVIEW_STEPS = [
  "Confirm goals, service area, and where calls are being lost.",
  "Walk the three highest-value mobile and local fixes.",
  "Leave with scope options, timeline, and a measurement plan.",
] as const;

type FormState = "idle" | "submitting" | "success" | "error";

function readParams() {
  if (typeof window === "undefined") {
    return {
      client: "",
      city: "",
      rating: "",
      reviews: "",
      token: "",
      source: "",
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
    };
  }
  const q = new URLSearchParams(window.location.search);
  return {
    client: (q.get("client") || "").trim(),
    city: (q.get("city") || "").trim(),
    rating: (q.get("rating") || "").trim(),
    reviews: (q.get("reviews") || "").trim(),
    token: (q.get("token") || "").trim(),
    source: (q.get("source") || "").trim(),
    utm_source: (q.get("utm_source") || "").trim(),
    utm_medium: (q.get("utm_medium") || "").trim(),
    utm_campaign: (q.get("utm_campaign") || "").trim(),
    utm_content: (q.get("utm_content") || "").trim(),
  };
}

export default function OpportunityReview() {
  const heroRef = useReveal(0.1);
  const journeyRef = useReveal(0.1);
  const bookRef = useReveal(0.1);
  const heroStarted = useHeroEntrance();
  const formStarted = useRef(false);

  const [params, setParams] = useState(readParams);
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    business: "",
  });

  useEffect(() => {
    const p = readParams();
    setParams(p);
    trackOpportunityReviewView({
      client: p.client,
      city: p.city,
      source: p.source || "direct",
      token: p.token,
    });
  }, []);

  const eyebrow = useMemo(() => {
    if (params.client && params.city) {
      return `${params.client} · ${params.city} · Opportunity Review`;
    }
    if (params.client) return `${params.client} · Opportunity Review`;
    return "Web Design & Local SEO · Opportunity Review";
  }, [params.client, params.city]);

  const headline = params.client
    ? `${params.client} already earns trust. The website should turn it into calls.`
    : "Your reviews earn trust. Your mobile site should turn that trust into calls.";

  const calendlyUrl = useMemo(() => {
    const u = new URL(CALENDLY_EVENT_URL);
    if (params.utm_source) u.searchParams.set("utm_source", params.utm_source);
    if (params.utm_medium) u.searchParams.set("utm_medium", params.utm_medium);
    if (params.utm_campaign) u.searchParams.set("utm_campaign", params.utm_campaign);
    if (params.utm_content) u.searchParams.set("utm_content", params.utm_content);
    if (params.client) u.searchParams.set("a1", params.client);
    return u.toString();
  }, [params]);

  const hostedBriefUrl = params.token
    ? `https://discover.617east.com/r/${encodeURIComponent(params.token)}`
    : null;

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Local Growth Opportunity Review",
    description:
      "Book a 20-minute Opportunity Review for web design and local SEO with 617 East Trust.",
    url: "https://617east.com/opportunity-review",
    provider: {
      "@type": "ProfessionalService",
      name: "617 East Trust",
      telephone: PHONE_E164,
      url: "https://617east.com",
    },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formStarted.current) {
      formStarted.current = true;
      trackEvent("opportunity_review_form_start", {
        client: params.client || "generic",
        source: params.source || "direct",
        event_category: "conversion",
      });
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const contact = formData.contact.trim();
    if (!formData.name.trim() || !contact) return;

    const looksEmail = contact.includes("@");
    const email = looksEmail ? contact : "";
    const phone = looksEmail ? "" : contact;

    setFormState("submitting");
    try {
      const payload = {
        name: formData.name.trim(),
        email,
        phone,
        business: formData.business.trim(),
        website: formData.business.trim(),
        service: "web-design-seo-north-carolina",
        message: [
          "Opportunity Review request",
          params.client ? `Client context: ${params.client}` : "",
          params.city ? `City: ${params.city}` : "",
          params.token ? `Miner token: ${params.token}` : "",
          formData.business ? `Business/website: ${formData.business.trim()}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
        source: "opportunity_review",
        client: params.client,
        city: params.city,
        token: params.token,
        report_source: params.source,
        utm_source: params.utm_source,
        utm_medium: params.utm_medium,
        utm_campaign: params.utm_campaign,
        utm_content: params.utm_content,
      };

      const res = await fetch(CONTACT_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setFormState("success");
        trackLead("opportunity_review", "web-design-seo-north-carolina");
        setFormData({ name: "", contact: "", business: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  const scrollToBook = (ctaId: string) => {
    trackOpportunityReviewCta(ctaId, {
      client: params.client,
      source: params.source || "direct",
    });
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Layout
      pageSchema={pageSchema}
      title="Local Growth Opportunity Review | Web Design & Local SEO — 617 East Trust"
      description="Book a 20-minute Opportunity Review. See the mobile conversion path for your local business website — clear priorities, no pressure. Sandhills NC."
      canonical="https://617east.com/opportunity-review"
    >
      {/* Hero */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        style={{ background: "oklch(0.10 0.008 240)" }}
        ref={heroRef as React.RefObject<HTMLElement>}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 75% 30%, oklch(0.78 0.12 80 / 0.06) 0%, transparent 55%)",
          }}
        />
        <div className="container relative z-10 max-w-4xl">
          <span className="section-label" style={heroLabelStyle(heroStarted)}>
            {eyebrow}
          </span>
          <div className="gold-rule" style={heroRuleStyle(heroStarted)} />
          <h1
            className="font-display text-4xl md:text-5xl"
            style={{ color: "oklch(0.94 0.005 80)", lineHeight: "1.15", maxWidth: "720px" }}
          >
            <span style={heroHeadlineOuter}>
              <span style={heroHeadlineInner(heroStarted, 500)}>{headline}</span>
            </span>
          </h1>
          <p
            className="text-lg mt-6"
            style={{
              color: "oklch(0.62 0.010 80)",
              maxWidth: "540px",
              lineHeight: "1.7",
              ...heroSubtextStyle(heroStarted),
            }}
          >
            In 20 minutes we walk the three highest-value changes, show the proposed mobile
            experience, and leave you with a clear next step. No obligation. No generic sales
            deck.
          </p>

          <div className="flex flex-wrap gap-4 mt-10" style={heroSubtextStyle(heroStarted)}>
            <button
              type="button"
              className="btn-gold px-6 py-3.5 rounded-sm text-sm"
              onClick={() => scrollToBook("hero_book")}
            >
              Book Your 20-Minute Opportunity Review
            </button>
            <a
              href={telHref()}
              className="px-6 py-3.5 rounded-sm text-sm font-medium border transition-colors"
              style={{
                borderColor: "oklch(0.35 0.02 80)",
                color: "oklch(0.85 0.04 80)",
              }}
              onClick={() => trackCall(PHONE_E164)}
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>
          <p className="text-sm mt-4" style={{ color: "oklch(0.48 0.008 80)" }}>
            You leave with a priority list, a conversion path, and a recommended next step.
          </p>

          {hostedBriefUrl && (
            <p className="text-sm mt-3">
              <a
                href={hostedBriefUrl}
                className="underline underline-offset-4"
                style={{ color: "oklch(0.78 0.12 80)" }}
                onClick={() =>
                  trackEvent("opportunity_review_hosted_brief_click", {
                    token: params.token,
                    event_category: "engagement",
                  })
                }
              >
                Open your hosted visibility preview →
              </a>
            </p>
          )}
        </div>
      </section>

      {/* Opportunity snapshot */}
      <section className="py-16" style={{ background: "oklch(0.12 0.008 240)" }}>
        <div className="container max-w-5xl">
          <span className="section-label">Opportunity snapshot</span>
          <div className="gold-rule mb-10" />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                k: "Trust equity",
                v:
                  params.rating && params.reviews
                    ? `${params.rating} Google rating · ${params.reviews} reviews in this snapshot`
                    : "Your Google reviews are already an asset competitors envy.",
              },
              {
                k: "Mobile friction",
                v: "Homeowners decide on phones. Slow or unclear paths lose the call before the quote.",
              },
              {
                k: "What we fix",
                v: "Click-to-call, proof above the fold, short service paths, and measurable follow-up.",
              },
            ].map((card) => (
              <div
                key={card.k}
                className="p-6 rounded-sm"
                style={{
                  background: "oklch(0.10 0.008 240)",
                  border: "1px solid oklch(0.22 0.008 240)",
                }}
              >
                <p
                  className="text-xs font-mono mb-3"
                  style={{ color: "oklch(0.78 0.12 80)", letterSpacing: "0.08em" }}
                >
                  {card.k.toUpperCase()}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "oklch(0.78 0.01 80)" }}>
                  {card.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer journey */}
      <section
        className="py-20"
        style={{ background: "oklch(0.10 0.008 240)" }}
        ref={journeyRef as React.RefObject<HTMLElement>}
      >
        <div className="container max-w-5xl">
          <span className="section-label reveal">The conversion system</span>
          <div className="gold-rule reveal reveal-delay-1" />
          <h2
            className="font-display text-3xl md:text-4xl mt-4 mb-4 reveal reveal-delay-1"
            style={{ color: "oklch(0.94 0.005 80)", maxWidth: "640px" }}
          >
            The customer journey we will build
          </h2>
          <p
            className="text-base mb-12 reveal reveal-delay-2"
            style={{ color: "oklch(0.58 0.01 80)", maxWidth: "560px", lineHeight: "1.7" }}
          >
            Not a feature checklist — a mobile path that makes a local homeowner confident enough
            to call immediately.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {JOURNEY.map((item, i) => (
              <div
                key={item.title}
                className="p-5 reveal"
                style={{
                  background: "oklch(0.13 0.009 240)",
                  border: "1px solid oklch(0.22 0.008 240)",
                  borderTop: "3px solid oklch(0.78 0.12 80)",
                }}
              >
                <span
                  className="text-xs font-mono"
                  style={{ color: "oklch(0.55 0.08 80)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="text-base font-semibold mt-2 mb-2"
                  style={{ color: "oklch(0.92 0.005 80)" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "oklch(0.58 0.01 80)" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <p
            className="text-xs mt-10 max-w-2xl leading-relaxed"
            style={{ color: "oklch(0.45 0.008 80)" }}
          >
            Website and on-site SEO improvements strengthen conversion and local foundations.
            Map-pack placement is not guaranteed by site work alone — we measure calls, forms,
            engagement, and visibility after launch.
          </p>
        </div>
      </section>

      {/* What happens */}
      <section className="py-16" style={{ background: "oklch(0.12 0.008 240)" }}>
        <div className="container max-w-3xl">
          <span className="section-label">The review</span>
          <div className="gold-rule mb-8" />
          <h2
            className="font-display text-3xl mb-8"
            style={{ color: "oklch(0.94 0.005 80)" }}
          >
            What happens in 20 minutes
          </h2>
          <ol className="space-y-5">
            {REVIEW_STEPS.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                  style={{
                    background: "oklch(0.78 0.12 80)",
                    color: "oklch(0.12 0.02 80)",
                  }}
                >
                  {i + 1}
                </span>
                <p className="text-base pt-1" style={{ color: "oklch(0.75 0.01 80)" }}>
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Book */}
      <section
        id="book"
        className="py-20"
        style={{ background: "oklch(0.10 0.008 240)" }}
        ref={bookRef as React.RefObject<HTMLElement>}
      >
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-2">
              <span className="section-label reveal">Next step</span>
              <div className="gold-rule reveal reveal-delay-1" />
              <h2
                className="font-display text-3xl mt-4 mb-4 reveal reveal-delay-1"
                style={{ color: "oklch(0.94 0.005 80)" }}
              >
                Book your Opportunity Review
              </h2>
              <p
                className="text-sm leading-relaxed mb-8 reveal reveal-delay-2"
                style={{ color: "oklch(0.58 0.01 80)" }}
              >
                Three fields. Or call. Or pick a time on the calendar. Same outcome: a clear
                priority list for your local site.
              </p>
              <div className="space-y-4 reveal reveal-delay-2">
                <div>
                  <p
                    className="text-xs font-mono mb-1"
                    style={{ color: "oklch(0.45 0.007 80)", letterSpacing: "0.1em" }}
                  >
                    PHONE
                  </p>
                  <a
                    href={telHref()}
                    className="text-xl font-semibold"
                    style={{ color: "oklch(0.78 0.12 80)" }}
                    onClick={() => trackCall(PHONE_E164)}
                  >
                    {PHONE_DISPLAY}
                  </a>
                </div>
                <div>
                  <p
                    className="text-xs font-mono mb-1"
                    style={{ color: "oklch(0.45 0.007 80)", letterSpacing: "0.1em" }}
                  >
                    EMAIL
                  </p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-sm"
                    style={{ color: "oklch(0.72 0.008 80)" }}
                  >
                    {EMAIL}
                  </a>
                </div>
                <p className="text-xs" style={{ color: "oklch(0.45 0.008 80)" }}>
                  Sandhills · Pinehurst · Southern Pines · Fayetteville · Raleigh · Charlotte
                </p>
              </div>
            </div>

            <div className="md:col-span-3 reveal reveal-delay-2">
              <div
                className="p-8 md:p-10"
                style={{
                  background: "oklch(0.13 0.009 240)",
                  border: "1px solid oklch(0.22 0.008 240)",
                }}
              >
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: "oklch(0.94 0.005 80)" }}
                >
                  Request the review
                </h3>
                <p className="text-sm mb-8" style={{ color: "oklch(0.52 0.008 80)" }}>
                  Name, business, and how to reach you. Qualifying details come after the meeting
                  is set.
                </p>

                {formState === "success" ? (
                  <div className="py-10 text-center">
                    <div className="text-2xl mb-4" style={{ color: "oklch(0.78 0.12 80)" }}>
                      ◆
                    </div>
                    <h4
                      className="text-lg font-semibold mb-2"
                      style={{ color: "oklch(0.94 0.005 80)" }}
                    >
                      Request received.
                    </h4>
                    <p className="text-sm mb-6" style={{ color: "oklch(0.58 0.01 80)" }}>
                      We&apos;ll confirm within 24 hours — or pick a time below.
                    </p>
                    <a
                      href={calendlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold inline-block px-6 py-3 rounded-sm text-sm"
                      onClick={() => trackScheduleClick()}
                    >
                      Open calendar
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" aria-label="Opportunity Review form">
                    <div>
                      <label
                        htmlFor="or-name"
                        className="text-xs font-mono block mb-2"
                        style={{ color: "oklch(0.52 0.008 80)", letterSpacing: "0.08em" }}
                      >
                        NAME *
                      </label>
                      <input
                        id="or-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="form-input w-full px-4 py-3 rounded-sm text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="or-business"
                        className="text-xs font-mono block mb-2"
                        style={{ color: "oklch(0.52 0.008 80)", letterSpacing: "0.08em" }}
                      >
                        BUSINESS / WEBSITE
                      </label>
                      <input
                        id="or-business"
                        name="business"
                        type="text"
                        autoComplete="organization"
                        value={formData.business}
                        onChange={handleChange}
                        placeholder={params.client || "Business name or website"}
                        className="form-input w-full px-4 py-3 rounded-sm text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="or-contact"
                        className="text-xs font-mono block mb-2"
                        style={{ color: "oklch(0.52 0.008 80)", letterSpacing: "0.08em" }}
                      >
                        PHONE OR EMAIL *
                      </label>
                      <input
                        id="or-contact"
                        name="contact"
                        type="text"
                        required
                        autoComplete="tel"
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder="(910) 000-0000 or you@business.com"
                        className="form-input w-full px-4 py-3 rounded-sm text-sm"
                      />
                    </div>

                    {formState === "error" && (
                      <p className="text-sm" role="alert" style={{ color: "oklch(0.65 0.18 27)" }}>
                        Something went wrong. Call us at {PHONE_DISPLAY}.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={formState === "submitting"}
                      aria-busy={formState === "submitting"}
                      className="btn-gold w-full py-4 rounded-sm text-sm"
                    >
                      {formState === "submitting"
                        ? "Sending…"
                        : "Book Your 20-Minute Opportunity Review"}
                    </button>
                  </form>
                )}

                <div
                  className="mt-8 pt-8"
                  style={{ borderTop: "1px solid oklch(0.22 0.008 240)" }}
                >
                  <p
                    className="text-xs font-mono mb-3"
                    style={{ color: "oklch(0.45 0.007 80)", letterSpacing: "0.08em" }}
                  >
                    OR SCHEDULE DIRECTLY
                  </p>
                  <a
                    href={calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium underline underline-offset-4"
                    style={{ color: "oklch(0.78 0.12 80)" }}
                    onClick={() => trackScheduleClick()}
                  >
                    Open Calendly — 30 minute meeting
                  </a>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-xs mt-12" style={{ color: "oklch(0.42 0.008 80)" }}>
            Prefer the full service overview?{" "}
            <a
              href="/services/web-design-seo-north-carolina"
              className="underline underline-offset-2"
              style={{ color: "oklch(0.55 0.04 80)" }}
            >
              Web Design &amp; SEO
            </a>
          </p>
        </div>
      </section>
    </Layout>
  );
}
