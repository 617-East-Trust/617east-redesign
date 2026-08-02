/*
 * Reusable testimonial cards — homepage + service pages.
 */

import type { Testimonial } from "@/data/testimonials";
import { GOOGLE_REVIEW_URL } from "@/data/testimonials";

interface TestimonialsProps {
  items: Testimonial[];
  /** Section eyebrow label */
  label?: string;
  heading?: string;
  showGoogleCta?: boolean;
  /** Compact single-card layout for service pages */
  compact?: boolean;
}

export default function Testimonials({
  items,
  label = "Client Results",
  heading = "What clients say after working with us.",
  showGoogleCta = true,
  compact = false,
}: TestimonialsProps) {
  if (!items.length) return null;

  return (
    <section
      className={compact ? "py-16" : "py-24"}
      style={{
        background: "oklch(0.10 0.008 240)",
        borderTop: "1px solid oklch(0.18 0.008 240)",
      }}
      aria-label="Client testimonials"
    >
      <div className={compact ? "container max-w-3xl" : "container"}>
        <span className="section-label reveal">{label}</span>
        <div className="gold-rule reveal reveal-delay-1" />
        <h2
          className={`font-display reveal reveal-delay-1 ${compact ? "text-2xl" : "text-3xl md:text-4xl"}`}
          style={{ color: "oklch(0.94 0.005 80)", marginBottom: compact ? "1.5rem" : "3rem" }}
        >
          {heading}
        </h2>

        <div className={compact ? "grid gap-6" : "grid md:grid-cols-3 gap-6"}>
          {items.map((t, i) => (
            <div
              key={`${t.name}-${t.serviceSlug}`}
              className={`reveal reveal-delay-${Math.min(i + 1, 4)} p-8 rounded-sm flex flex-col`}
              style={{
                background: "oklch(0.13 0.009 240)",
                border: "1px solid oklch(0.22 0.008 240)",
              }}
            >
              <span
                className="font-display text-4xl leading-none mb-4"
                style={{ color: "oklch(0.78 0.12 80)", opacity: 0.7 }}
                aria-hidden="true"
              >
                &#8220;
              </span>
              <p
                className="text-sm leading-relaxed flex-1 mb-6"
                style={{ color: "oklch(0.72 0.008 80)" }}
              >
                {t.quote}
              </p>
              <div style={{ borderTop: "1px solid oklch(0.22 0.008 240)", paddingTop: "1rem" }}>
                <p className="text-sm font-medium" style={{ color: "oklch(0.88 0.008 80)" }}>
                  {t.name}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "oklch(0.78 0.12 80)" }}>
                  {t.service}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "oklch(0.45 0.007 80)" }}>
                  {t.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {showGoogleCta && (
          <p className="text-xs text-center mt-10 reveal" style={{ color: "oklch(0.40 0.006 80)" }}>
            Leave us a review on{" "}
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "oklch(0.78 0.12 80)", textDecoration: "underline" }}
            >
              Google
            </a>
            {" "}
            — it helps other North Carolina business owners find honest advice.
          </p>
        )}
      </div>
    </section>
  );
}
