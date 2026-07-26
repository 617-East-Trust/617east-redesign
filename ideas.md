# 617 East Trust — Design Philosophy

## Three Approaches Considered

**1. Carved Stone / Institutional Weight** (p: 0.07)
Deep charcoal, serif type, heavy editorial grid — law firm gravity. Communicates permanence but risks feeling inaccessible to first-generation entrepreneurs.

**2. Warm Cartography / Navigator's Study** (p: 0.08)
Aged parchment tones, topographic line motifs, compass imagery — the 617 East name is literally directional. Communicates wisdom and guidance without coldness.

**3. Midnight Ledger / Banker's Precision** (p: 0.06)
Near-black with burnished gold accents, monospaced numerals, architectural grid — the aesthetic of a private bank's annual report. Communicates earned trust through restraint.

---

## Chosen Direction: Midnight Ledger / Banker's Precision

**Why:** The brand's core truth is "we tell you what not to do" — that is the voice of someone who has seen the inside of institutions and knows where the traps are. The aesthetic of a private bank's annual report communicates exactly that: earned authority, financial literacy, and the confidence to say no. It also directly differentiates from the bright-green, badge-heavy aesthetic of automated filers (ZenBusiness, LegalZoom) who are the primary competitors for attention.

---

## Design System

### Design Movement
Modernist financial publishing meets private banking identity. Reference: Vanguard's 2019 annual report, Stripe's 2020 brand, and the editorial restraint of The Economist.

### Core Principles
1. **Restraint signals authority.** Every element earns its place. No decorative flourishes without purpose.
2. **Typographic hierarchy is the layout.** Type scale and weight do the heavy lifting; color is secondary.
3. **Gold is earned, not given.** The amber/gold accent appears only at moments of emphasis — CTAs, key data points, section markers. Never as decoration.
4. **Negative space is trust.** Generous whitespace communicates that the brand is not desperate for attention.

### Color Philosophy
- **Background:** Near-black `oklch(0.10 0.008 240)` — the color of a closed ledger, not a screen. Warm-dark, not cold-dark.
- **Surface:** `oklch(0.14 0.010 240)` — slightly elevated, like paper under a banker's lamp.
- **Gold accent:** `oklch(0.78 0.12 80)` — burnished amber, not bright yellow. The color of old money, not new money.
- **Text primary:** `oklch(0.94 0.005 80)` — warm white, not pure white. Easier to read, more human.
- **Text secondary:** `oklch(0.60 0.010 80)` — warm gray for supporting copy.
- **Border:** `oklch(0.22 0.008 240)` — barely visible, structural only.

### Layout Paradigm
Asymmetric editorial grid. Hero: full-bleed with a strong left-anchored text column and a right-side geometric motif. Sections alternate between full-width editorial moments and contained card grids. No centered hero text — that is the LegalZoom pattern.

### Signature Elements
1. **Thin gold rule lines** — 1px horizontal rules in gold that appear before section headings, like a ledger column separator.
2. **Monospaced numerals** — pricing, statistics, and step numbers rendered in a monospaced font to evoke financial precision.
3. **Compass rose mark** — a minimal geometric compass/star mark used as the brand icon, referencing the "East" in the name and the navigation metaphor.

### Interaction Philosophy
Deliberate and unhurried. Hover states reveal rather than transform. Scroll triggers fade-in-up animations that feel like pages turning, not elements flying. No parallax for its own sake.

### Animation
- **Entrance:** `opacity: 0 → 1` + `translateY(24px → 0)` over 600ms `cubic-bezier(0.23, 1, 0.32, 1)` — staggered 80ms per element.
- **Hover on cards:** `translateY(-4px)` + subtle gold border glow, 200ms ease-out.
- **CTA buttons:** Scale `0.97` on press, 160ms ease-out. Gold shimmer on hover.
- **Nav:** Transparent over hero, transitions to `bg-surface/90 backdrop-blur` at 80px scroll.
- **Reduced motion:** All transforms disabled; opacity-only transitions at 200ms.

### Typography System
- **Display / Hero:** `Cormorant Garamond` — high-contrast serif, editorial authority. Used only for H1 and pull quotes.
- **Headings:** `DM Sans` — geometric sans, 600–700 weight. Modern, readable, not generic.
- **Body:** `DM Sans` — 400 weight, 1.7 line height. Generous and readable.
- **Numerals / Data:** `DM Mono` — monospaced for prices, statistics, step numbers.
- **Scale:** 12 / 14 / 16 / 18 / 22 / 28 / 36 / 48 / 64 / 80px

### Brand Essence
**617 East Trust: The advisor who tells you what not to do — for founders who want a partner, not a processor.**
Personality: Authoritative. Candid. Unflappable.

### Brand Voice
Headlines sound like a trusted banker speaking plainly. No hype, no urgency theater.
- "The most important thing we do is tell you what not to do."
- "You don't need a filer. You need someone who's seen the inside."

### Wordmark & Logo
A minimal compass rose — 8-point star with alternating long/short points, rendered as a single SVG path in gold. The wordmark is "617 EAST TRUST" in DM Sans 700, tracked wide, with the compass mark to the left.

### Signature Brand Color
Burnished amber gold: `oklch(0.78 0.12 80)` — unmistakably 617 East Trust.

---

## Style Decisions
- Dark theme is the default and only theme — no light mode toggle.
- Gold accent is used for: CTA buttons, active nav indicator, section rule lines, hover states, key data points.
- Cormorant Garamond is used ONLY for hero H1 and pull quotes — never for body or navigation.
- All section headings use a thin gold rule above them (1px, 40px wide).
- Service cards use a left-border gold accent on hover, not a full border change.
- The contact form submits to `https://n8n.617east.com/webhook/617east-contact` (verified working).
- Phone number `(910) 315-1800` is always clickable as `tel:9103151800`.
