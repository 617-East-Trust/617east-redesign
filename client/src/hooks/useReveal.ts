/*
 * useReveal — Intersection Observer hook for scroll-triggered fade-in-up animations.
 * Attaches 'visible' class to elements with 'reveal' class when they enter viewport.
 */

import { useEffect, useRef } from "react";

export function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold }
    );

    // Observe all .reveal children
    const targets = el.querySelectorAll(".reveal");
    targets.forEach((t) => observer.observe(t));

    // Also observe the element itself if it has .reveal
    if (el.classList.contains("reveal")) observer.observe(el);

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

// Hook for a single element
export function useRevealSingle(threshold = 0.15) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref as React.RefObject<HTMLElement>;
}
