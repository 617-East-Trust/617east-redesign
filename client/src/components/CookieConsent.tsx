/*
 * 617 EAST TRUST — COOKIE CONSENT BANNER
 * Umami only, self-hosted, no cookies for tracking.
 * Consent stored in localStorage; banner suppressed on return visits.
 * GDPR / CCPA compliant.
 */

import { useEffect, useState } from "react";

const CONSENT_KEY = "617east_cookie_consent";
const CONSENT_VERSION = "2";

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
  const endpoint = (window as any).__UMAMI_ENDPOINT__ || "";
  const id = (window as any).__UMAMI_WEBSITE_ID__ || "";
  if (endpoint && id && !(window as any).umamiLoaded) {
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = endpoint;
    script.setAttribute("data-website-id", id);
    document.head.appendChild(script);
    (window as any).umamiLoaded = true;
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
        We use self-hosted{" "}
        <strong style={{ color: "oklch(0.88 0.008 80)" }}>Umami Analytics</strong>{" "}
        to understand aggregate usage patterns. Umami does not track individuals,
        does not use cookies for tracking, and collects no personal data. You can
        decline and the site will work normally.{" "}
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