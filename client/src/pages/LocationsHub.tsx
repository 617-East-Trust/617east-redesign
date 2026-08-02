/*
 * 617 EAST TRUST — Service areas hub
 */

import Layout from "@/components/Layout";
import { LOCATIONS } from "@/data/locations";
import { useReveal } from "@/hooks/useReveal";
import {
  useHeroEntrance,
  heroLabelStyle,
  heroRuleStyle,
  heroHeadlineOuter,
  heroHeadlineInner,
  heroSubtextStyle,
} from "@/hooks/useHeroEntrance";
import { Link } from "wouter";

const HUB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Service Areas — 617 East Trust",
  description:
    "North Carolina markets served by 617 East Trust: Pinehurst, Southern Pines, Charlotte, Fayetteville, and Raleigh.",
  url: "https://617east.com/locations",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: LOCATIONS.map((loc, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: loc.marketLabel,
      url: loc.canonical,
    })),
  },
};

export default function LocationsHub() {
  const heroRef = useReveal(0.1);
  const listRef = useReveal(0.1);
  const heroStarted = useHeroEntrance();

  return (
    <Layout
      pageSchema={HUB_SCHEMA}
      title="Service Areas North Carolina | 617 East Trust"
      description="617 East Trust serves Pinehurst, Southern Pines, Charlotte, Fayetteville, Raleigh, and the Sandhills region with business formation, SBA loans, credit repair, and more."
      canonical="https://617east.com/locations"
    >
      <section
        className="relative pt-32 pb-16"
        style={{ background: "oklch(0.10 0.008 240)" }}
        ref={heroRef as React.RefObject<HTMLElement>}
      >
        <div className="container relative z-10 max-w-4xl">
          <span className="section-label" style={heroLabelStyle(heroStarted)}>
            North Carolina
          </span>
          <div className="gold-rule" style={heroRuleStyle(heroStarted)} />
          <h1
            className="font-display text-4xl md:text-5xl"
            style={{ color: "oklch(0.94 0.005 80)", lineHeight: "1.1" }}
          >
            <span style={heroHeadlineOuter}>
              <span style={heroHeadlineInner(heroStarted, 500)}>Where we work</span>
            </span>
          </h1>
          <p
            className="text-lg mt-6"
            style={{
              color: "oklch(0.62 0.010 80)",
              maxWidth: "560px",
              lineHeight: "1.75",
              ...heroSubtextStyle(heroStarted),
            }}
          >
            Sandhills-rooted. Statewide reach. Local pages for the markets we serve most.
          </p>
        </div>
      </section>

      <section
        className="py-20"
        style={{ background: "oklch(0.13 0.009 240)" }}
        ref={listRef as React.RefObject<HTMLElement>}
      >
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6">
            {LOCATIONS.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="p-8 block reveal"
                style={{
                  background: "oklch(0.10 0.008 240)",
                  border: "1px solid oklch(0.22 0.008 240)",
                }}
              >
                <p
                  className="text-xs font-mono mb-2"
                  style={{ color: "oklch(0.45 0.007 80)", letterSpacing: "0.1em" }}
                >
                  {loc.region.toUpperCase()}
                </p>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "oklch(0.94 0.005 80)" }}>
                  {loc.marketLabel}
                </h2>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "oklch(0.58 0.010 80)" }}>
                  {loc.intro.slice(0, 140)}…
                </p>
                <span className="text-xs" style={{ color: "oklch(0.78 0.12 80)" }}>
                  View {loc.city} page →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
