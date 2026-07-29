/*
 * 617 EAST TRUST — HOW WE WORK PAGE
 * Midnight Ledger design system.
 * Detailed process walkthrough with trust signals and objection handling.
 * SEO target: "how does 617 east trust work", "business advisor process NC"
 */

import Layout from "@/components/Layout";
import { useReveal } from "@/hooks/useReveal";
import { Link } from "wouter";

const HOW_WE_WORK_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "How We Work — 617 East Trust",
  "description": "How 617 East Trust works with North Carolina business owners. Our process: free consultation, honest assessment, defined engagement, ongoing partnership.",
  "url": "https://617east.com/how-we-work",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://617east.com/" },
      { "@type": "ListItem", "position": 2, "name": "How We Work", "item": "https://617east.com/how-we-work" }
    ]
  }
};

const STEPS = [
  {
    number: "01",
    title: "Free Consultation",
    duration: "30–60 minutes",
    description: "We talk. You explain your situation — what you are trying to do, what you have already tried, and what is not working. We listen without selling.",
    whatHappens: [
      "You describe your business, your goals, and your current challenges",
      "We ask questions to understand your full picture — not just the presenting problem",
      "We tell you honestly whether we can help and what that would look like",
      "If we are not the right fit, we tell you that too — and point you toward who is",
    ],
    whatWeDoNot: "We do not pitch services, quote prices, or pressure you to engage. The consultation is genuinely free — no strings.",
  },
  {
    number: "02",
    title: "Honest Assessment",
    duration: "1–5 business days",
    description: "If the consultation suggests we can help, we do a deeper review of your specific situation before recommending anything.",
    whatHappens: [
      "For LLC formation: we review your business structure, revenue expectations, and whether an LLC is actually the right choice",
      "For SBA loans: we review your credit, financials, and business profile against lender requirements",
      "For credit repair: we review all three credit reports and identify what is disputable and what is not",
      "For bookkeeping: we review your current financial infrastructure and identify the gaps",
    ],
    whatWeDoNot: "We do not recommend services you do not need. If your books are fine, we tell you. If your credit is not repairable in the timeframe you need, we tell you that too.",
  },
  {
    number: "03",
    title: "Defined Engagement",
    duration: "Before any work begins",
    description: "If we proceed, you know exactly what we are doing, what it costs, and what the realistic outcome looks like — before you pay anything.",
    whatHappens: [
      "We provide a written service agreement describing the scope of work",
      "We disclose all fees upfront — no hidden charges, no upsells mid-engagement",
      "We set realistic timelines and explain what factors are outside our control",
      "For credit repair: you receive the required CROA consumer rights disclosure and have 3 business days to cancel",
    ],
    whatWeDoNot: "We do not start work before you have signed an agreement. We do not collect payment before services are performed for that period.",
  },
  {
    number: "04",
    title: "Ongoing Partnership",
    duration: "As long as you need us",
    description: "Most clients stay for multiple services over time. We become the advisor you call before you make a financial or business decision.",
    whatHappens: [
      "Monthly check-ins for retainer services (bookkeeping, credit repair, fractional CFO)",
      "Proactive outreach when we see something you should know about",
      "Annual report reminders for every LLC we have formed",
      "Priority access when you need a quick answer or a second opinion",
    ],
    whatWeDoNot: "We do not disappear after the initial engagement. We do not lock you into long-term contracts you cannot exit.",
  },
];

const TRUST_SIGNALS = [
  {
    label: "No advance fees",
    detail: "For credit repair services, we collect payment after services are performed — not before. This is required by federal law and it is how we operate for all retainer services.",
  },
  {
    label: "Written agreements before work begins",
    detail: "Every engagement starts with a written service agreement. You know exactly what you are getting, what it costs, and what your cancellation rights are.",
  },
  {
    label: "3-day cancellation right",
    detail: "For credit repair services, you have the right to cancel within 3 business days of signing — no penalty, no obligation. This right is required by the Credit Repair Organizations Act.",
  },
  {
    label: "No guaranteed outcomes",
    detail: "We do not promise specific credit score increases, loan approvals, or revenue results. Anyone who does is misleading you. We promise honest work and transparent communication.",
  },
  {
    label: "Not a law firm or CPA firm",
    detail: "We are business advisors. We do not provide legal advice or tax advice. We tell you when you need a lawyer or a CPA — and we do not try to replace them.",
  },
  {
    label: "Direct access to the principal",
    detail: "You work with Lamont Legrand directly — not an account manager, not a junior associate. The person who assessed your situation is the person doing the work.",
  },
];

export default function HowWeWork() {
  const heroRef = useReveal(0.1);
  const processRef = useReveal(0.05);
  const trustRef = useReveal(0.1);

  return (
    <Layout
      pageSchema={HOW_WE_WORK_SCHEMA}
      title="How We Work | 617 East Trust — Our Process"
      description="How 617 East Trust works with North Carolina business owners. Free consultation, honest assessment, defined engagement, and ongoing partnership. No surprises."
      canonical="https://617east.com/how-we-work"
    >
      {/* Hero */}
      <section
        className="relative pt-32 pb-20"
        style={{ background: "oklch(0.10 0.008 240)" }}
        ref={heroRef as React.RefObject<HTMLElement>}
      >
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 60% 40%, oklch(0.78 0.12 80 / 0.04) 0%, transparent 60%)" }}
        />
        <div className="container relative z-10 max-w-3xl">
          <nav className="flex items-center gap-2 text-xs mb-8 reveal" style={{ color: "oklch(0.45 0.007 80)" }}>
            <Link href="/" style={{ color: "oklch(0.45 0.007 80)" }}>Home</Link>
            <span>›</span>
            <span style={{ color: "oklch(0.78 0.12 80)" }}>How We Work</span>
          </nav>
          <span className="section-label reveal">Our Process</span>
          <div className="gold-rule reveal reveal-delay-1" />
          <h1
            className="font-display text-4xl md:text-6xl reveal reveal-delay-1"
            style={{ color: "oklch(0.94 0.005 80)", lineHeight: "1.1", marginBottom: "1.5rem" }}
          >
            No surprises.{" "}
            <em style={{ color: "oklch(0.78 0.12 80)" }}>No pressure.</em>
          </h1>
          <p
            className="text-lg reveal reveal-delay-2"
            style={{ color: "oklch(0.62 0.010 80)", maxWidth: "520px", lineHeight: "1.7", marginBottom: "2.5rem" }}
          >
            Most advisors tell you what you want to hear. We tell you what you need to know —
            including when we are not the right fit. Here is exactly how we work.
          </p>
          <div className="flex flex-wrap gap-4 reveal reveal-delay-3">
            <Link href="/contact" className="btn-gold px-8 py-4 rounded-sm text-sm inline-flex items-center gap-2">
              Start with a Free Consultation
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section
        className="py-24"
        style={{ background: "oklch(0.13 0.009 240)" }}
        ref={processRef as React.RefObject<HTMLElement>}
      >
        <div className="container max-w-4xl">
          <span className="section-label reveal">The Four Steps</span>
          <div className="gold-rule reveal reveal-delay-1" />
          <div className="space-y-16 mt-12">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className={`reveal reveal-delay-${Math.min(i + 1, 4)}`}
                style={{
                  paddingTop: i > 0 ? "4rem" : 0,
                  borderTop: i > 0 ? "1px solid oklch(0.18 0.008 240)" : "none",
                }}
              >
                <div className="flex items-start gap-6">
                  <span
                    className="font-mono text-4xl font-medium flex-shrink-0"
                    style={{ color: "oklch(0.78 0.12 80)", opacity: 0.5, lineHeight: "1" }}
                  >
                    {step.number}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h2
                        className="font-display text-2xl md:text-3xl"
                        style={{ color: "oklch(0.94 0.005 80)" }}
                      >
                        {step.title}
                      </h2>
                      <span
                        className="text-xs font-mono px-3 py-1 rounded-sm"
                        style={{
                          background: "oklch(0.78 0.12 80 / 0.1)",
                          color: "oklch(0.78 0.12 80)",
                          border: "1px solid oklch(0.78 0.12 80 / 0.25)",
                        }}
                      >
                        {step.duration}
                      </span>
                    </div>
                    <p
                      className="text-base leading-relaxed mb-6"
                      style={{ color: "oklch(0.65 0.010 80)", lineHeight: "1.8" }}
                    >
                      {step.description}
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs font-mono mb-3" style={{ color: "oklch(0.45 0.007 80)", letterSpacing: "0.1em" }}>
                          WHAT HAPPENS
                        </p>
                        <ul className="space-y-2">
                          {step.whatHappens.map((item, j) => (
                            <li key={j} className="flex items-start gap-3">
                              <span className="font-mono text-xs mt-1 flex-shrink-0" style={{ color: "oklch(0.78 0.12 80)" }}>◆</span>
                              <span className="text-sm leading-relaxed" style={{ color: "oklch(0.72 0.008 80)" }}>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div
                        className="p-5 rounded-sm"
                        style={{
                          background: "oklch(0.10 0.008 240)",
                          border: "1px solid oklch(0.22 0.008 240)",
                        }}
                      >
                        <p className="text-xs font-mono mb-3" style={{ color: "oklch(0.45 0.007 80)", letterSpacing: "0.1em" }}>
                          WHAT WE DO NOT DO
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: "oklch(0.52 0.008 80)" }}>
                          {step.whatWeDoNot}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section
        className="py-24"
        style={{ background: "oklch(0.10 0.008 240)", borderTop: "1px solid oklch(0.18 0.008 240)" }}
        ref={trustRef as React.RefObject<HTMLElement>}
      >
        <div className="container max-w-4xl">
          <span className="section-label reveal">Our Commitments</span>
          <div className="gold-rule reveal reveal-delay-1" />
          <h2
            className="font-display text-3xl md:text-4xl reveal reveal-delay-1"
            style={{ color: "oklch(0.94 0.005 80)", marginBottom: "3rem" }}
          >
            What you can hold us to.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {TRUST_SIGNALS.map((signal, i) => (
              <div
                key={i}
                className={`p-6 rounded-sm reveal reveal-delay-${Math.min(i + 1, 4)}`}
                style={{
                  background: "oklch(0.13 0.009 240)",
                  border: "1px solid oklch(0.22 0.008 240)",
                }}
              >
                <p
                  className="text-sm font-semibold mb-2"
                  style={{ color: "oklch(0.88 0.008 80)" }}
                >
                  {signal.label}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "oklch(0.58 0.010 80)" }}>
                  {signal.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="py-20"
        style={{ background: "oklch(0.13 0.009 240)", borderTop: "1px solid oklch(0.18 0.008 240)" }}
      >
        <div className="container max-w-3xl">
          <span className="section-label reveal">Common Questions</span>
          <div className="gold-rule reveal reveal-delay-1" />
          <div className="space-y-0">
            {[
              {
                q: "How long does the first consultation take?",
                a: "Usually 30–60 minutes, depending on the complexity of your situation. We do not rush it. If we need more time to give you an honest answer, we take more time.",
              },
              {
                q: "Do I need to prepare anything before the consultation?",
                a: "No formal preparation required. If you have specific documents — credit reports, financial statements, business filings — it helps to have them available, but it is not required. We will tell you what we need after we understand your situation.",
              },
              {
                q: "What if I need help with multiple services?",
                a: "Most clients work with us on more than one service. We assess each need separately and are honest about what makes sense to address first. We do not bundle services to increase revenue — we sequence them in the order that makes the most sense for your situation.",
              },
              {
                q: "How do I reach you after we start working together?",
                a: "Direct email and phone. You have Lamont's direct contact information from day one. We respond within 24 hours, same-day for inquiries before 3 PM EST.",
              },
              {
                q: "What if I am not satisfied with the work?",
                a: "We address it directly. If we made an error, we correct it. If expectations were not set correctly, we reset them. We do not hide behind fine print. If a situation cannot be resolved, we refund fees for unperformed work.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className={`reveal reveal-delay-${Math.min(i + 1, 4)}`}
                style={{ borderBottom: "1px solid oklch(0.18 0.008 240)" }}
              >
                <summary
                  className="py-5 text-sm font-medium cursor-pointer flex items-center justify-between gap-4"
                  style={{ color: "oklch(0.88 0.008 80)", listStyle: "none" }}
                >
                  {faq.q}
                  <span style={{ color: "oklch(0.78 0.12 80)", flexShrink: 0 }}>+</span>
                </summary>
                <p className="pb-5 text-sm leading-relaxed" style={{ color: "oklch(0.58 0.010 80)" }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24"
        style={{ background: "oklch(0.10 0.008 240)", borderTop: "1px solid oklch(0.18 0.008 240)" }}
      >
        <div className="container max-w-2xl text-center">
          <span className="section-label reveal">Ready to Begin</span>
          <div className="gold-rule mx-auto reveal reveal-delay-1" />
          <h2
            className="font-display text-4xl reveal reveal-delay-1"
            style={{ color: "oklch(0.94 0.005 80)", lineHeight: "1.15", marginBottom: "1.5rem" }}
          >
            The first conversation costs nothing.
          </h2>
          <p className="text-base leading-relaxed reveal reveal-delay-2" style={{ color: "oklch(0.58 0.010 80)", marginBottom: "2.5rem" }}>
            One free consultation. We will tell you exactly what we can do for your situation — and what we cannot.
          </p>
          <div className="flex flex-wrap gap-4 justify-center reveal reveal-delay-3">
            <Link href="/contact" className="btn-gold px-8 py-4 rounded-sm text-sm inline-flex items-center gap-2">
              Book Free Consultation
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a href="tel:9103151800" className="btn-ghost-gold px-8 py-4 rounded-sm text-sm inline-flex items-center gap-2">
              (910) 315-1800
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
