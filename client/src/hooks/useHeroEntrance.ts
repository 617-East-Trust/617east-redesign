/*
 * 617 EAST TRUST — SHARED HERO ENTRANCE CHOREOGRAPHY
 * Matches the Home page motion language:
 * label fade → self-drawing gold rule → masked headline reveal → subtext fade.
 * Respects prefers-reduced-motion.
 */

import { useEffect, useState } from "react";

export function useHeroEntrance(): boolean {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStarted(true);
      return;
    }
    const t = setTimeout(() => setStarted(true), 120);
    return () => clearTimeout(t);
  }, []);

  return started;
}

/* Shared style factories for the choreography steps */
export const heroLabelStyle = (started: boolean): React.CSSProperties => ({
  opacity: started ? 1 : 0,
  transition: "opacity 600ms ease 150ms",
});

export const heroRuleStyle = (started: boolean): React.CSSProperties => ({
  width: started ? undefined : "0px",
  transition: "width 600ms cubic-bezier(0.23,1,0.32,1) 350ms",
});

/* Masked line reveal — wrap the h1 content in a block with overflow hidden */
export const heroHeadlineOuter: React.CSSProperties = {
  overflow: "hidden",
  display: "block",
};

export const heroHeadlineInner = (started: boolean, delay = 500): React.CSSProperties => ({
  display: "block",
  opacity: started ? 1 : 0,
  transform: started ? "translateY(0)" : "translateY(100%)",
  transition: `opacity 650ms cubic-bezier(0.23,1,0.32,1) ${delay}ms, transform 650ms cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
});

export const heroSubtextStyle = (started: boolean, delay = 1100): React.CSSProperties => ({
  opacity: started ? 1 : 0,
  transition: `opacity 750ms ease ${delay}ms`,
});
