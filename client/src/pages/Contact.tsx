/*
 * 617 EAST TRUST — CONTACT PAGE
 * Midnight Ledger design system.
 * Form submits to n8n webhook: https://n8n.617east.com/webhook/617east-contact
 */

import Layout from "@/components/Layout";
import { useReveal } from "@/hooks/useReveal";
import { useHeroEntrance, heroLabelStyle, heroRuleStyle, heroHeadlineOuter, heroHeadlineInner, heroSubtextStyle } from "@/hooks/useHeroEntrance";
import { useState } from "react";

const CONTACT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact 617 East Trust",
  "description": "Contact 617 East Trust for a free consultation on business formation, SBA loans, credit repair, bookkeeping, or fractional CFO services in North Carolina.",
  "mainEntity": {
    "@type": "ContactPoint",
    "telephone": "+19103151800",
    "email": "info@617east.com",
    "contactType": "customer service",
    "areaServed": "NC",
    "availableLanguage": "English",
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "description": "By appointment. Response within 24 hours."
    }
  }
};

const SERVICE_OPTIONS = [
  { value: "llc-formation", label: "LLC Formation" },
  { value: "sba-loans", label: "SBA Loans" },
  { value: "credit-repair", label: "Credit Repair" },
  { value: "bookkeeping", label: "Bookkeeping" },
  { value: "fractional-cfo", label: "Fractional CFO" },
  { value: "web-design-seo", label: "Web Design & SEO" },
  { value: "not-sure", label: "Not sure yet" },
];

type FormState = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const heroRef = useReveal(0.1);
  const formRef = useReveal(0.1);
  const heroStarted = useHeroEntrance();

  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    try {
      const res = await fetch("https://n8n.617east.com/webhook/617east-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormState("success");
        // GA4 conversion event
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "generate_lead", {
            form_name: "contact",
            service_interest: formData.service,
          });
        }
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <Layout
      pageSchema={CONTACT_SCHEMA}
      title="Contact 617 East Trust | Free Consultation — (910) 315-1800"
      description="Contact 617 East Trust for a free consultation. Business formation, SBA loans, credit repair, bookkeeping, and more. (910) 315-1800 — We answer."
      canonical="https://617east.com/contact"
    >
      {/* Hero */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        style={{
          backgroundImage: `url('/images/617east-contact-bg_0da87a4e.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" style={{ background: "oklch(0.10 0.008 240 / 0.92)" }} />
        <div className="container relative z-10" ref={heroRef as React.RefObject<HTMLDivElement>}>
          <span className="section-label" style={heroLabelStyle(heroStarted)}>Get in Touch</span>
          <div className="gold-rule" style={heroRuleStyle(heroStarted)} />
          <h1
            className="font-display text-5xl md:text-6xl"
            style={{ color: "oklch(0.94 0.005 80)", lineHeight: "1.1", maxWidth: "560px" }}
          >
            <span style={heroHeadlineOuter}>
              <span style={heroHeadlineInner(heroStarted, 500)}>
                Stop being processed.{" "}
                <em style={{ color: "oklch(0.78 0.12 80)" }}>Start being partnered with.</em>
              </span>
            </span>
          </h1>
          <p
            className="text-lg mt-6"
            style={{ color: "oklch(0.62 0.010 80)", maxWidth: "460px", lineHeight: "1.7", ...heroSubtextStyle(heroStarted) }}
          >
            One free consultation. We'll tell you exactly what we can do for your situation — and what we can't.
          </p>
        </div>
      </section>

      {/* Contact section */}
      <section
        className="py-24"
        style={{ background: "oklch(0.10 0.008 240)" }}
        ref={formRef as React.RefObject<HTMLElement>}
      >
        <div className="container">
          <div className="grid md:grid-cols-5 gap-16">
            {/* Contact info */}
            <div className="md:col-span-2">
              <span className="section-label reveal">Contact</span>
              <div className="gold-rule reveal reveal-delay-1" />

              <div className="space-y-8 reveal reveal-delay-2">
                <div>
                  <p className="text-xs font-mono mb-2" style={{ color: "oklch(0.45 0.007 80)", letterSpacing: "0.1em" }}>PHONE</p>
                  <a
                    href="tel:9103151800"
                    className="text-2xl font-semibold transition-colors"
                    style={{ color: "oklch(0.78 0.12 80)" }}
                  >
                    (910) 315-1800
                  </a>
                  <p className="text-sm mt-1" style={{ color: "oklch(0.45 0.007 80)" }}>We answer.</p>
                </div>

                <div>
                  <p className="text-xs font-mono mb-2" style={{ color: "oklch(0.45 0.007 80)", letterSpacing: "0.1em" }}>EMAIL</p>
                  <a
                    href="mailto:info@617east.com"
                    className="text-base transition-colors"
                    style={{ color: "oklch(0.72 0.008 80)" }}
                  >
                    info@617east.com
                  </a>
                </div>

                <div>
                  <p className="text-xs font-mono mb-2" style={{ color: "oklch(0.45 0.007 80)", letterSpacing: "0.1em" }}>SERVICE AREA</p>
                  <p className="text-sm leading-relaxed" style={{ color: "oklch(0.58 0.010 80)" }}>
                    Sandhills Region, NC<br />
                    Charlotte · Fayetteville<br />
                    Raleigh · Pinehurst<br />
                    Southern Pines
                  </p>
                </div>

                <div>
                  <p className="text-xs font-mono mb-2" style={{ color: "oklch(0.45 0.007 80)", letterSpacing: "0.1em" }}>RESPONSE TIME</p>
                  <p className="text-sm" style={{ color: "oklch(0.58 0.010 80)" }}>
                    Within 24 hours.<br />
                    Same-day before 3 PM EST.
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-3 reveal reveal-delay-2">
              <div
                className="p-10"
                style={{
                  background: "oklch(0.13 0.009 240)",
                  border: "1px solid oklch(0.22 0.008 240)",
                }}
              >
                <h2 className="text-xl font-semibold mb-2" style={{ color: "oklch(0.94 0.005 80)" }}>
                  Book a Free Consultation
                </h2>
                <p className="text-sm mb-8" style={{ color: "oklch(0.52 0.008 80)" }}>
                  Tell us about your situation. We'll respond within 24 hours.
                </p>

                {formState === "success" ? (
                  <div
                    className="py-12 text-center"
                    style={{ borderTop: "1px solid oklch(0.22 0.008 240)" }}
                  >
                    <div className="text-2xl mb-4" style={{ color: "oklch(0.78 0.12 80)" }}>◆</div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: "oklch(0.94 0.005 80)" }}>
                      Message received.
                    </h3>
                    <p className="text-sm" style={{ color: "oklch(0.58 0.010 80)" }}>
                      We'll be in touch within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="text-xs font-mono block mb-2" style={{ color: "oklch(0.52 0.008 80)", letterSpacing: "0.08em" }}>
                        NAME *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="form-input w-full px-4 py-3 rounded-sm text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono block mb-2" style={{ color: "oklch(0.52 0.008 80)", letterSpacing: "0.08em" }}>
                          EMAIL *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="you@example.com"
                          className="form-input w-full px-4 py-3 rounded-sm text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono block mb-2" style={{ color: "oklch(0.52 0.008 80)", letterSpacing: "0.08em" }}>
                          PHONE
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(910) 000-0000"
                          className="form-input w-full px-4 py-3 rounded-sm text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono block mb-2" style={{ color: "oklch(0.52 0.008 80)", letterSpacing: "0.08em" }}>
                        SERVICE INTEREST *
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="form-input w-full px-4 py-3 rounded-sm text-sm"
                      >
                        <option value="" style={{ background: "oklch(0.17 0.010 240)", color: "oklch(0.94 0.005 80)" }}>Select a service</option>
                        {SERVICE_OPTIONS.map(opt => (
                          <option key={opt.value} value={opt.value} style={{ background: "oklch(0.17 0.010 240)", color: "oklch(0.94 0.005 80)" }}>{opt.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-mono block mb-2" style={{ color: "oklch(0.52 0.008 80)", letterSpacing: "0.08em" }}>
                        MESSAGE *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="Tell us about your situation..."
                        className="form-input w-full px-4 py-3 rounded-sm text-sm resize-none"
                      />
                    </div>

                    {formState === "error" && (
                      <p className="text-sm" style={{ color: "oklch(0.65 0.18 27)" }}>
                        Something went wrong. Please call us at (910) 315-1800.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={formState === "submitting"}
                      className="btn-gold w-full py-4 rounded-sm text-sm flex items-center justify-center gap-2"
                    >
                      {formState === "submitting" ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 animate-spin" style={{ borderColor: "oklch(0.10 0.008 240 / 0.3)", borderTopColor: "oklch(0.10 0.008 240)" }} />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendly scheduling widget */}
      <section
        className="py-20"
        style={{ background: "oklch(0.13 0.009 240)", borderTop: "1px solid oklch(0.18 0.008 240)" }}
      >
        <div className="container max-w-4xl">
          <span className="section-label reveal">Schedule Directly</span>
          <div className="gold-rule reveal reveal-delay-1" />
          <h2
            className="font-display text-3xl reveal reveal-delay-1"
            style={{ color: "oklch(0.94 0.005 80)", marginBottom: "0.75rem" }}
          >
            Prefer to pick a time now?
          </h2>
          <p className="text-sm reveal reveal-delay-2" style={{ color: "oklch(0.58 0.010 80)", marginBottom: "2rem" }}>
            Book directly on the calendar below. Availability is limited to 5 new consultations per week.
          </p>
          {/* Calendly inline embed */}
          <div
            className="calendly-inline-widget reveal reveal-delay-2"
            data-url="https://calendly.com/617easttrust/free-consultation?hide_gdpr_banner=1&background_color=1a1f2e&text_color=d4c9a8&primary_color=c9a84c"
            style={{ minWidth: "320px", height: "700px" }}
          />
          <script
            type="text/javascript"
            src="https://assets.calendly.com/assets/external/widget.js"
            async
          />
        </div>
      </section>

      {/* Sticky mobile CTA bar */}
      <div
        className="fixed bottom-0 left-0 right-0 md:hidden z-40 flex"
        style={{
          background: "oklch(0.10 0.008 240 / 0.97)",
          borderTop: "1px solid oklch(0.22 0.008 240)",
          backdropFilter: "blur(12px)",
          padding: "0.75rem 1rem",
          gap: "0.75rem",
        }}
      >
        <a
          href="/contact"
          className="btn-gold flex-1 py-3 rounded-sm text-sm text-center font-medium"
        >
          Free Consultation
        </a>
        <a
          href="tel:9103151800"
          className="btn-ghost-gold px-4 py-3 rounded-sm text-sm flex items-center gap-2"
          aria-label="Call 617 East Trust"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M13.5 10.5c-.8-.8-1.8-1.3-2.8-1.3-.5 0-1 .1-1.4.4L8 10.9C6.6 9.8 5.2 8.4 4.1 7L5.4 5.7c.3-.4.4-.9.4-1.4 0-1-.5-2-1.3-2.8L3.3 1C3 .7 2.6.5 2.2.5 1.3.5.5 1.3.5 2.2c0 7.3 6 13.3 13.3 13.3.9 0 1.7-.8 1.7-1.7 0-.4-.2-.8-.5-1.1l-1.5-1.2z" fill="currentColor"/>
          </svg>
          Call
        </a>
      </div>
    </Layout>
  );
}
