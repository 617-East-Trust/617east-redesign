/*
 * 617 EAST TRUST — BLOG / RESOURCES PAGE
 * Midnight Ledger design system.
 * Placeholder for P1 content strategy (4 targeted blog posts).
 */

import Layout from "@/components/Layout";
import { useReveal } from "@/hooks/useReveal";

const BLOG_POSTS = [
  {
    slug: "llc-formation-north-carolina-guide",
    title: "How to Form an LLC in North Carolina (2026 Step-by-Step Guide)",
    excerpt: "Everything you need to know about forming an LLC in North Carolina — from choosing a name to filing Articles of Organization, getting your EIN, and staying compliant.",
    category: "Business Formation",
    date: "Coming soon",
    readTime: "12 min read",
  },
  {
    slug: "sba-7a-vs-504-north-carolina",
    title: "SBA 7(a) vs 504 Loans in NC: Which Fits Your Business?",
    excerpt: "The two most common SBA loan programs explained — what they're for, how they differ, and how to know which one your business should pursue.",
    category: "SBA Loans",
    date: "Coming soon",
    readTime: "10 min read",
  },
  {
    slug: "credit-repair-timeline-nc",
    title: "Credit Repair Timeline in NC: What to Expect Month by Month",
    excerpt: "A realistic, month-by-month breakdown of what happens during credit repair — what changes, what doesn't, and what you need to do on your end.",
    category: "Credit Repair",
    date: "Coming soon",
    readTime: "8 min read",
  },
  {
    slug: "fractional-cfo-vs-bookkeeper-nc",
    title: "Fractional CFO vs Bookkeeper: When to Hire Which (NC Guide)",
    excerpt: "The difference between a bookkeeper, accountant, and CFO — and how to know when your business has outgrown its current financial support.",
    category: "Financial Advisory",
    date: "Coming soon",
    readTime: "9 min read",
  },
];

export default function Blog() {
  const heroRef = useReveal(0.1);
  const gridRef = useReveal(0.1);

  return (
    <Layout
      title="Resources | 617 East Trust — NC Business & Financial Guides"
      description="Free guides on LLC formation, SBA loans, credit repair, and financial planning in North Carolina. Written by 617 East Trust."
      canonical="https://617east.com/blog"
    >
      {/* Hero */}
      <section
        className="relative pt-32 pb-20"
        style={{ background: "oklch(0.10 0.008 240)" }}
        ref={heroRef as React.RefObject<HTMLElement>}
      >
        <div className="container">
          <span className="section-label reveal">Resources</span>
          <div className="gold-rule reveal reveal-delay-1" />
          <h1
            className="font-display text-5xl md:text-6xl reveal reveal-delay-1"
            style={{ color: "oklch(0.94 0.005 80)", lineHeight: "1.1", maxWidth: "560px" }}
          >
            Guides for North Carolina{" "}
            <em style={{ color: "oklch(0.78 0.12 80)" }}>founders & individuals.</em>
          </h1>
          <p
            className="text-lg mt-6 reveal reveal-delay-2"
            style={{ color: "oklch(0.62 0.010 80)", maxWidth: "480px", lineHeight: "1.7" }}
          >
            Practical, honest guides on business formation, SBA loans, credit repair, and financial planning. No fluff. No upsells.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section
        className="py-20"
        style={{ background: "oklch(0.13 0.009 240)" }}
        ref={gridRef as React.RefObject<HTMLElement>}
      >
        <div className="container">
          <div className="grid md:grid-cols-2 gap-px" style={{ background: "oklch(0.22 0.008 240)" }}>
            {BLOG_POSTS.map((post, i) => (
              <div
                key={post.slug}
                className={`p-10 reveal reveal-delay-${Math.min(i + 1, 4)}`}
                style={{ background: "oklch(0.13 0.009 240)" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs font-mono"
                    style={{ color: "oklch(0.78 0.12 80)", letterSpacing: "0.08em" }}
                  >
                    {post.category.toUpperCase()}
                  </span>
                  <span className="text-xs" style={{ color: "oklch(0.40 0.006 80)" }}>
                    {post.date}
                  </span>
                </div>
                <h2
                  className="text-lg font-semibold mb-3"
                  style={{ color: "oklch(0.88 0.008 80)", lineHeight: "1.4" }}
                >
                  {post.title}
                </h2>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "oklch(0.52 0.008 80)" }}>
                  {post.excerpt}
                </p>
                <span
                  className="text-xs font-mono"
                  style={{ color: "oklch(0.40 0.006 80)" }}
                >
                  {post.readTime} · Publishing soon
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20"
        style={{ background: "oklch(0.10 0.008 240)", borderTop: "1px solid oklch(0.18 0.008 240)" }}
      >
        <div className="container max-w-2xl text-center">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: "oklch(0.94 0.005 80)" }}>
            Have a specific question?
          </h2>
          <p className="text-base mb-8" style={{ color: "oklch(0.58 0.010 80)" }}>
            Skip the articles. Book a free consultation and get a direct answer about your situation.
          </p>
          <a href="/contact" className="btn-gold px-8 py-4 rounded-sm text-sm inline-flex items-center gap-2">
            Book Free Consultation
          </a>
        </div>
      </section>
    </Layout>
  );
}
