/* Reusable testimonial cards — homepage + service pages. */

import type { Testimonial } from "@/data/testimonials";
import { GOOGLE_REVIEW_URL } from "@/data/testimonials";
import { useReveal } from "@/hooks/useReveal";

interface TestimonialsProps {
  items: Testimonial[];
  label?: string;
  heading?: string;
  showGoogleCta?: boolean;
  compact?: boolean;
}

export default function Testimonials({
  items,
  label = "Client Results",
  heading = "What clients say after working with us.",
  showGoogleCta = true,
  compact = false,
}: TestimonialsProps) {
  const sectionRef = useReveal(0.1);
  if (!items.length) return null;

  return (
    <section
      className={compact ? "py-20" : "py-28 lg:py-36"}
      ref={sectionRef as React.RefObject<HTMLElement>}
      aria-label="Client testimonials"
    >
      <div className={compact ? "container max-w-3xl" : "container"}>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="section-label reveal">{label}</span>
            <div className="gold-rule reveal reveal-delay-1" />
            <h2
              className={`font-display leading-[1] tracking-[-0.035em] text-[oklch(0.95_0.01_85)] reveal reveal-delay-1 ${compact ? "text-4xl" : "max-w-2xl text-5xl md:text-6xl"}`}
            >
              {heading}
            </h2>
          </div>
          {showGoogleCta && (
            <p className="max-w-xs text-sm leading-6 text-[oklch(0.6_0.025_85)] reveal reveal-delay-2 md:text-right">
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[oklch(0.76_0.13_210)] underline decoration-[oklch(0.76_0.13_210/0.5)] underline-offset-4"
              >
                Leave a Google review
              </a>{" "}
              to help other North Carolina business owners find clear advice.
            </p>
          )}
        </div>

        <div
          className={`mt-12 grid gap-4 ${compact ? "grid-cols-1" : "md:grid-cols-3"}`}
        >
          {items.map((testimonial, index) => (
            <article
              key={`${testimonial.name}-${testimonial.serviceSlug}`}
              className={`blacklight-shell reveal reveal-delay-${Math.min(index + 1, 4)}`}
            >
              <div className="blacklight-core flex min-h-[22rem] flex-col p-7 sm:p-8">
                <span className="font-display text-6xl leading-none text-[oklch(0.8_0.12_80)]">
                  “
                </span>
                <p className="mt-5 flex-1 text-sm leading-7 text-[oklch(0.76_0.025_85)]">
                  {testimonial.quote}
                </p>
                <div className="mt-8 border-t border-[oklch(0.48_0.055_285/0.42)] pt-5">
                  <p className="text-sm font-medium text-[oklch(0.92_0.01_85)]">
                    {testimonial.name}
                  </p>
                  <p className="mt-1 text-xs text-[oklch(0.76_0.13_210)]">
                    {testimonial.service}
                  </p>
                  <p className="mt-1 text-xs text-[oklch(0.51_0.022_85)]">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
