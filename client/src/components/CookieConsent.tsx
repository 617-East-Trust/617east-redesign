/*
 * 617 EAST TRUST — COOKIE CONSENT BANNER
 * GDPR / CCPA compliant.
 * - Names Google Analytics and Microsoft Clarity explicitly.
 * - Analytics scripts fire ONLY after consent is granted.
 * - Consent stored in localStorage; banner suppressed on return visits.
 * - Matches Midnight Ledger design system (dark/gold).
 */

import { useEffect, useState } from "react";

const CONSENT_KEY = "617east_cookie_consent";
const CONSENT_VERSION = "1";

type ConsentState = "granted" | "denied" | null;

function loadConsent(): ConsentState {
 if (typeof window === "undefined") return null;
 try {
 const stored = localStorage.getItem(CONSENT_KEY);
 if (!stored) return null;
 const { version, state } = JSON.parse(stored);
 if (version !== CONSENT_VERSION) return null;
 return state as ConsentState;
 } catch {
 return null;
 }
}

function saveConsent(state: ConsentState) {
 if (typeof window === "undefined") return;
 localStorage.setItem(CONSENT_KEY, JSON.stringify({ version: CONSENT_VERSION, state }));
}

function initAnalytics() {
 if (typeof window === "undefined") return;
 // Date: 2026-08-01
 // Patch: analytics gate — no cookie, no tracking
 try {
 const raw = localStorage.getItem(CONSENT_KEY);
 if (!raw) return;
 const { state } = JSON.parse(raw) as { state: ConsentState };
 if (state !== "granted") return;
 } catch { return; }
 // Google Analytics 4 — fire only after consent (set by server-side seo.ts)
 const gaId = (window as any).__GA_ID__;
 const script = document.createElement("script");
 script.async = true;
 script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
 document.head.appendChild(script);
 (window as any).dataLayer = (window as any).dataLayer || [];
 (window as any).gtag = function () { (window as any).dataLayer.push(arguments); };
 (window as any).gtag("js", new Date());
 (window as any).gtag("config", gaId);
 (window as any).gaInitialized = true;
 // Microsoft Clarity — fire only after consent (set by server-side seo.ts)
 const clarityId = (window as any).__CLARITY_ID__;
 if (clarityId && !(window as any).clarityInitialized) {
 (function (c: any, l: any, a: any, r: any, i: any) {
 c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
 const t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
 const y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
 })(window, document, "clarity", "script", clarityId);
 (window as any).clarityInitialized = true;
 }
}

export default function CookieConsent() {
 const [consent, setConsent] = useState<ConsentState>(null);
 const [visible, setVisible] = useState(false);

 useEffect(() => {
 const stored = loadConsent();
 setConsent(stored);
 if (stored === "granted") {
 initAnalytics();
 }
 // Show banner after 800ms if no prior consent
 if (stored === null) {
 const timer = setTimeout(() => setVisible(true), 800);
 return () => clearTimeout(timer);
 }
 }, []);

 function handleAccept() {
 saveConsent("granted");
 setConsent("granted");
 setVisible(false);
 initAnalytics();
 }

 function handleDecline() {
 saveConsent("denied");
 setConsent("denied");
 setVisible(false);
 }

 if (!visible || consent !== null) return null;

 return (
 <div
 role="dialog"
 aria-label="Cookie consent"
 aria-live="polite"
 style={{
 position: "fixed",
 bottom: "1.5rem",
 left: "50%",
 transform: "translateX(-50%)",
 zIndex: 9999,
 width: "min(92vw, 560px)",
 background: "oklch(0.13 0.009 240)",
 border: "1px solid oklch(0.28 0.010 80 / 0.5)",
 borderRadius: "4px",
 padding: "1.25rem 1.5rem",
 boxShadow: "0 8px 32px oklch(0 0 0 / 0.5)",
 }}
 >
 <p
 className="text-sm leading-relaxed mb-4"
 style={{ color: "oklch(0.65 0.010 80)" }}
 >
 We use{" "}
 <strong style={{ color: "oklch(0.88 0.008 80)" }}>Google Analytics</strong> and{" "}
 <strong style={{ color: "oklch(0.88 0.008 80)" }}>Microsoft Clarity</strong> to
 understand how visitors use this site. No personal data is sold. You can decline
 and the site will work normally.{" "}
 <a
 href="/privacy"
 style={{ color: "oklch(0.78 0.12 80)", textDecoration: "underline" }}
 >
 Privacy Policy
 </a>
 </p>
 <div className="flex items-center gap-3 flex-wrap">
 <button
 onClick={handleAccept}
 className="btn-gold px-5 py-2 rounded-sm text-sm font-medium"
 style={{
 background: "oklch(0.78 0.12 80)",
 color: "oklch(0.10 0.008 240)",
 border: "none",
 cursor: "pointer",
 fontFamily: "'DM Sans', sans-serif",
 }}
 >
 Accept
 </button>
 <button
 onClick={handleDecline}
 className="text-sm"
 style={{
 background: "transparent",
 border: "1px solid oklch(0.28 0.008 240)",
 color: "oklch(0.52 0.008 80)",
 padding: "0.5rem 1.25rem",
 borderRadius: "4px",
 cursor: "pointer",
 fontFamily: "'DM Sans', sans-serif",
 }}
 >
 Decline
 </button>
 <p className="text-xs ml-auto" style={{ color: "oklch(0.40 0.006 80)" }}>
 California residents may opt out under CCPA.
 </p>
 </div>
 </div>
 );
}
