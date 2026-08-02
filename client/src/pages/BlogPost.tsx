/*
 * 617 EAST TRUST — BLOG POST DETAIL PAGE
 * Midnight Ledger design system.
 * Full SEO content with FAQ schema for each post.
 */

import Layout from "@/components/Layout";
import { getBlogPostBySlug } from "@/data/blog";
import { useReveal } from "@/hooks/useReveal";
import { useParams } from "wouter";
import NotFound from "./NotFound";

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(params.slug || "");
  const heroRef = useReveal(0.1);
  const contentRef = useReveal(0.05);

  if (!post) return <NotFound />;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a }
    }))
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.h1,
    "description": post.metaDescription,
    "author": {
      "@type": "Person",
      "name": "Lamont Legrand",
      "jobTitle": "Founder & Principal Advisor",
      "worksFor": { "@type": "Organization", "name": "617 East Trust" }
    },
    "publisher": {
      "@type": "Organization",
      "name": "617 East Trust",
      "url": "https://617east.com"
    },
    "datePublished": "2026-07-01",
    "url": post.canonical
  };

  return (
    <Layout
      pageSchema={articleSchema}
      title={post.seoTitle}
      description={post.metaDescription}
      canonical={post.canonical}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* BreadcrumbList schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://617east.com/" },
              { "@type": "ListItem", "position": 2, "name": "Resources", "item": "https://617east.com/blog" },
              { "@type": "ListItem", "position": 3, "name": post.title, "item": post.canonical },
            ]
          })
        }}
      />

      {/* Hero */}
      <section
        className="relative pt-32 pb-16"
        style={{ background: "oklch(0.10 0.008 240)" }}
        ref={heroRef as React.RefObject<HTMLElement>}
      >
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 70% 30%, oklch(0.78 0.12 80 / 0.04) 0%, transparent 60%)" }}
        />
        <div className="container relative z-10 max-w-4xl">
          <nav className="flex items-center gap-2 text-xs mb-8 reveal" style={{ color: "oklch(0.45 0.007 80)" }}>
            <a href="/" style={{ color: "oklch(0.45 0.007 80)" }}>Home</a>
            <span>›</span>
            <a href="/blog" style={{ color: "oklch(0.45 0.007 80)" }}>Resources</a>
            <span>›</span>
            <span style={{ color: "oklch(0.78 0.12 80)" }}>{post.category}</span>
          </nav>

          <div className="flex items-center gap-4 mb-5 reveal">
            <span
              className="text-xs font-mono px-3 py-1"
              style={{
                background: "oklch(0.78 0.12 80 / 0.12)",
                color: "oklch(0.78 0.12 80)",
                border: "1px solid oklch(0.78 0.12 80 / 0.3)",
              }}
            >
              {post.category.toUpperCase()}
            </span>
            <span className="text-xs font-mono" style={{ color: "oklch(0.45 0.007 80)" }}>
              {post.readTime} · {post.publishDate}
            </span>
          </div>

          <h1
            className="font-display text-4xl md:text-5xl reveal reveal-delay-1"
            style={{ color: "oklch(0.94 0.005 80)", lineHeight: "1.1", marginBottom: "1.5rem", maxWidth: "760px" }}
          >
            {post.h1}
          </h1>

          <p
            className="text-lg reveal reveal-delay-2"
            style={{ color: "oklch(0.62 0.010 80)", maxWidth: "640px", lineHeight: "1.75" }}
          >
            {post.intro}
          </p>

          {/* Author */}
          <div className="flex items-center gap-4 mt-8 pt-8 reveal reveal-delay-3" style={{ borderTop: "1px solid oklch(0.18 0.008 240)" }}>
            <img
              src="/images/lamont-legrand-founder_d88b26c8.jpg"
              alt="Lamont Legrand"
              className="rounded-full object-cover flex-shrink-0"
              style={{ width: "44px", height: "44px", objectPosition: "top center" }}
            />
            <div>
              <p className="text-sm font-medium" style={{ color: "oklch(0.88 0.008 80)" }}>Lamont Legrand</p>
              <p className="text-xs font-mono" style={{ color: "oklch(0.45 0.007 80)", letterSpacing: "0.06em" }}>
                FOUNDER & PRINCIPAL ADVISOR · 617 EAST TRUST
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section
        className="py-16"
        style={{ background: "oklch(0.13 0.009 240)" }}
        ref={contentRef as React.RefObject<HTMLElement>}
      >
        <div className="container">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Main content */}
            <article className="md:col-span-3">
              {post.sections.map((section, i) => (
                <div key={section.heading}>
                  <div
                    className={`mb-12 reveal reveal-delay-${Math.min(i + 1, 4)}`}
                    style={{ borderTop: i > 0 ? "1px solid oklch(0.18 0.008 240)" : "none", paddingTop: i > 0 ? "2.5rem" : 0 }}
                  >
                    <h2
                      className="text-xl font-semibold mb-4"
                      style={{ color: "oklch(0.92 0.006 80)", lineHeight: "1.3" }}
                    >
                      {section.heading}
                    </h2>
                    {section.body.split("\n\n").map((para, j) => (
                      <p
                        key={j}
                        className="text-base leading-relaxed mb-4"
                        style={{ color: "oklch(0.65 0.010 80)", lineHeight: "1.85" }}
                      >
                        {para}
                        {/* Contextual in-text service link on first half section */}
                        {i === 0 && j === 0 && post.relatedService && (
                          <>
                            {" "}
                            <a
                              href={post.relatedService.href}
                              style={{ color: "oklch(0.78 0.12 80)", textDecoration: "underline" }}
                            >
                              Related service: {post.relatedService.label}
                            </a>
                            .
                          </>
                        )}
                      </p>
                    ))}
                  </div>
                  {/* Inline mid-article CTA (Wave 2.3) — after halfway section */}
                  {i === Math.floor(post.sections.length / 2) - 1 && (
                    <div
                      className="my-10 p-6 rounded-sm reveal"
                      style={{
                        background: "oklch(0.10 0.008 240)",
                        border: "1px solid oklch(0.28 0.010 80 / 0.5)",
                      }}
                    >
                      <p
                        className="text-sm font-medium mb-3"
                        style={{ color: "oklch(0.88 0.008 80)" }}
                      >
                        Have questions about your specific situation?
                      </p>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: "oklch(0.58 0.010 80)" }}>
                        {post.ctaBody}
                      </p>
                      <div className="flex flex-wrap gap-3 items-center">
                        <a
                          href="/contact#schedule"
                          className="btn-gold px-5 py-2.5 rounded-sm text-sm inline-flex items-center gap-2"
                        >
                          Schedule a Call
                        </a>
                        {post.relatedService && (
                          <a
                            href={post.relatedService.href}
                            className="text-sm"
                            style={{ color: "oklch(0.78 0.12 80)" }}
                          >
                            {post.relatedService.label} →
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* FAQ */}
              <div className="mt-16 pt-12" style={{ borderTop: "1px solid oklch(0.22 0.008 240)" }}>
                <span className="section-label">FAQ</span>
                <div className="gold-rule" />
                <h2
                  className="text-2xl font-semibold mb-8"
                  style={{ color: "oklch(0.94 0.005 80)" }}
                >
                  Frequently Asked Questions
                </h2>
                <div className="space-y-0">
                  {post.faqs.map((faq, i) => (
                    <details
                      key={i}
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
            </article>

            {/* Sidebar */}
            <aside className="md:col-span-1">
              <div
                className="p-6 sticky top-24"
                style={{
                  background: "oklch(0.10 0.008 240)",
                  border: "1px solid oklch(0.22 0.008 240)",
                }}
              >
                <span className="section-label">Get Started</span>
                <div className="gold-rule" />
                <p className="text-sm leading-relaxed mb-5" style={{ color: "oklch(0.58 0.010 80)" }}>
                  {post.ctaBody}
                </p>
                <a
                  href="/contact"
                  className="btn-gold w-full py-3 rounded-sm text-sm flex items-center justify-center gap-2 mb-3"
                >
                  Free Consultation
                </a>
                <a
                  href="tel:9103151800"
                  className="btn-ghost-gold w-full py-3 rounded-sm text-sm flex items-center justify-center"
                >
                  (910) 315-1800
                </a>
              </div>
            </aside>
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
            {post.ctaHeading}
          </h2>
          <p className="text-base mb-8" style={{ color: "oklch(0.58 0.010 80)" }}>
            {post.ctaBody}
          </p>
          <a href="/contact" className="btn-gold px-8 py-4 rounded-sm text-sm inline-flex items-center gap-2">
            Book Free Consultation
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>
    </Layout>
  );
}
