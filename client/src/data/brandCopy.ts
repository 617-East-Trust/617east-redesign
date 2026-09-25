/*
 * 617 EAST TRUST — BRAND COPY (single source of truth)
 *
 * Master message architecture (approved 2026-09-25):
 *   Hero ............ See the full picture. Move forward with confidence.
 *   Founder quote ... You bring the vision. We bring clear guidance, honest
 *                     answers, and follow-through you can count on.
 *   Promise ......... Clear advice. Shared decisions. Follow-through.
 *   Values .......... Accountability, Trust, Transparency, Partnership.
 *
 * The founder quote and short promise live ONLY here so Home, About, and
 * Layout cannot drift. The old "what not to do" / "most advisors" /
 * client-mistake framing is retired — do not reintroduce it.
 *
 * NOTE: search + social descriptions are duplicated as literals in three
 * places that cannot import this module: client/index.html (SPA shell),
 * scripts/ssg.mjs (prerendered HTML), and server/seo.ts (runtime injection).
 * Keep all three in sync with the constants below.
 */

export const BRAND_PROMISE = "Clear advice. Shared decisions. Follow-through.";

export const FOUNDER_QUOTE =
  "You bring the vision. We bring clear guidance, honest answers, and follow-through you can count on.";

export const FOUNDER_QUOTE_ATTRIBUTION = "Lamont Legrand, Founder & Principal Advisor";

/**
 * Direct replacement for the retired "what not to do" proposition.
 * Philosophy / process sections only — never the hero.
 */
export const READINESS_PROMISE =
  "Our job is to help you understand your options, be candid about the tradeoffs, and move forward with confidence.";

// ── Home ─────────────────────────────────────────────────────────────────────

export const HOME_TITLE = "617 East Trust | Business Formation & SBA Loans — NC";

export const HOME_DESCRIPTION =
  "Business formation, SBA loans, credit repair, bookkeeping, and fractional CFO services in North Carolina. See the full picture. Move forward with confidence.";

export const HOME_OG_DESCRIPTION =
  "Business formation, SBA loans, credit repair, and fractional CFO services in North Carolina. Clear advice. Shared decisions. Follow-through.";

export const HERO_HEADLINE_WORDS = ["See", "the", "full", "picture."];
export const HERO_HEADLINE_EM = "Move forward with confidence.";

export const HERO_SUPPORTING =
  "617 East Trust helps North Carolina founders and individuals understand their options, prepare for the next step, and make decisions they can stand behind.";

export const HERO_TRUST_INDICATORS = [
  "Direct Advisor",
  "Banking & SBA Lending Experience",
  "Transparent Scope, Fees & Timelines",
  "Guidance That Stays With You",
];

export const PHILOSOPHY_HEADING = "Experience that helps you prepare.";
export const PHILOSOPHY_HEADING_EM = "Not just react.";

export const PHILOSOPHY_BODY_1 =
  "Lamont Legrand brings commercial banking and SBA lending experience to the moments that shape a business. He understands the questions lenders ask, the records that matter, and the preparation a strong next step requires.";

export const PHILOSOPHY_BODY_2 =
  "When you work with 617 East Trust, you get more than a filing or a checklist. You get a clear view of where you are, what your options are, and how to move forward with intention.";

export const CLOSING_CTA_HEADING = "Build your next step on ";
export const CLOSING_CTA_HEADING_EM = "a clear picture.";
export const CLOSING_CTA_BODY =
  "Start with a conversation about where you are, what you want to accomplish, and what a well-prepared next step looks like. No pressure. No hidden terms. Just a clear place to begin.";
export const CLOSING_CTA_LABEL = "Start a Conversation";

// ── Values (Home pillars + About values grid) ────────────────────────────────

export const BRAND_VALUES_HEADING = "Accountability. Trust. Transparency. Partnership.";

export const BRAND_VALUES = [
  {
    title: "Accountability",
    body: "We are clear about our role, our scope, and what we will deliver. You always know what to expect, and we follow through.",
  },
  {
    title: "Trust",
    body: "We listen first, offer context without pressure, and earn confidence through consistent, straightforward guidance.",
  },
  {
    title: "Transparency",
    body: "Our fees, timelines, requirements, and limitations are explained before work begins — so you can decide with clarity.",
  },
  {
    title: "Partnership",
    body: "Your business keeps moving after one transaction. We stay available for the questions and decisions that come next.",
  },
];

// ── About ────────────────────────────────────────────────────────────────────

export const ABOUT_TITLE = "About 617 East Trust | Lamont Legrand — NC Business Advisor";

export const ABOUT_META_DESCRIPTION =
  "617 East Trust was founded by Lamont Legrand, a former commercial banker and SBA lending professional. We help North Carolina founders and individuals understand their options, prepare the next step, and make decisions they can stand behind.";

export const ABOUT_HERO_HEADING = "Your business. Your decision.";
export const ABOUT_HERO_HEADING_EM = "A clear way forward.";

export const ABOUT_HERO_SUPPORTING =
  "617 East Trust exists to give North Carolina founders and individuals a clear picture of their options — the requirements, the tradeoffs, and the next step — before they commit time, money, or credibility.";

export const ABOUT_STORY_BODY_1 =
  "Lamont Legrand spent years inside commercial banking and SBA lending — reviewing loan applications, underwriting business credit, and assessing business viability. He has sat on both sides of the table: as the person deciding whether to approve a loan, and as the advisor helping clients prepare to ask for one.";

export const ABOUT_STORY_BODY_2 =
  "He founded 617 East Trust to be the advisor he wished founders had access to before they walked into a bank. Someone who could tell them what the lender was actually looking for. What their credit profile said about them. Whether their LLC structure would hold up. What to prepare before they applied — and when the better move is to wait.";

export const ABOUT_STORY_BODY_3 =
  'The name "617 East" reflects the directional nature of the work: we help you find your bearing, understand where you are, and navigate toward where you want to go — without spending time on paths that will not get you there.';

export const ABOUT_CTA_HEADING = "Ready to see ";
export const ABOUT_CTA_HEADING_EM = "the full picture?";
export const ABOUT_CTA_BODY =
  "Start with a conversation about where you are, what you want to accomplish, and what a well-prepared next step looks like.";

// ── How It Works ─────────────────────────────────────────────────────────────

export const PROCESS_HERO_HEADING = "No surprises.";
export const PROCESS_HERO_HEADING_EM = "A clear way forward.";

export const PROCESS_INTRO =
  "Every engagement starts with a conversation about your goals, your context, and what is possible. We listen first, explain the path ahead clearly, and help you decide whether working together is the right next step.";

// ── Contact ──────────────────────────────────────────────────────────────────

export const CONTACT_HERO_HEADING = "Start with a conversation.";
export const CONTACT_HERO_HEADING_EM = "We meet you where you stand.";

export const CONTACT_HERO_SUPPORTING =
  "One free consultation. We will be clear about what we recommend, what it costs, and what happens next.";

// ── Blog ─────────────────────────────────────────────────────────────────────

export const BLOG_AUTHOR_BIO =
  "Former commercial banking and SBA lending professional. Lamont founded 617 East Trust to give North Carolina operators a clear read on their options — formation structure, loan readiness, credit disputes, and financial clarity without the processing mill.";

export const BLOG_CTA_BODY =
  "Free consultation for North Carolina founders. We will map structure, banking, books, credit, and capital — and tell you what to prepare before you commit. Strong fit for Fayetteville and Sandhills operators.";

// ── Locations ────────────────────────────────────────────────────────────────

export const PINEHURST_INTRO =
  "617 East Trust is based in the Sandhills. If you are forming an LLC, preparing an SBA loan, addressing credit, or getting books under control in Pinehurst, you get a human advisor who will lay out your options and the tradeoffs — not a national filing mill.";

// ── Global ───────────────────────────────────────────────────────────────────

export const FOOTER_DESCRIPTOR = "Clear guidance for the decisions that shape your business.";

export const LEGAL_DISCLOSURE =
  "Not a law firm. Not a CPA firm. Advisory services only — scope, fees, and limitations disclosed in writing.";
