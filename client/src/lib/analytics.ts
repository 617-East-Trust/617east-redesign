/*
 * 617 EAST TRUST — Measurement layer (Wave 4)
 * Consent-gated. Prefer GTM when __GTM_ID__ is set; else direct GA4 + Clarity.
 * Events: generate_lead, click_to_call, scroll_depth, blog_read_complete, outbound_click, schedule_click
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
    __GA_ID__?: string;
    __CLARITY_ID__?: string;
    __GTM_ID__?: string;
    __CALLRAIL_SWAP__?: string;
    gaInitialized?: boolean;
    clarityInitialized?: boolean;
    gtmInitialized?: boolean;
    analytics?: { track: (event: string, props?: Record<string, unknown>) => void };
  }
}

const CONSENT_KEY = "617east_cookie_consent";

export type ConsentState = "granted" | "denied" | null;

export function getConsent(): ConsentState {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const { state } = JSON.parse(raw) as { state: ConsentState };
    return state ?? null;
  } catch {
    return null;
  }
}

function pushDataLayer(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

/** Fire a named conversion / engagement event to GA4 (via gtag) and GTM dataLayer. */
export function trackEvent(eventName: string, properties: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  if (getConsent() !== "granted") return;

  pushDataLayer({ event: eventName, ...properties });

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, properties);
  }

  // Optional Zo forensic / segment-style bridge
  if (window.analytics?.track) {
    try {
      window.analytics.track(eventName, properties);
    } catch {
      /* ignore */
    }
  }
}

export function trackCall(phone = "+19103151800") {
  trackEvent("click_to_call", { phone, event_category: "engagement", event_label: phone });
}

export function trackLead(formName: string, serviceInterest?: string) {
  trackEvent("generate_lead", {
    form_name: formName,
    service_interest: serviceInterest || "unspecified",
    event_category: "conversion",
  });
}

export function trackScheduleClick() {
  trackEvent("schedule_click", { event_category: "conversion", event_label: "calendly_or_contact" });
}

function loadScript(src: string, id: string) {
  if (document.getElementById(id)) return;
  const s = document.createElement("script");
  s.id = id;
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function initGtm(containerId: string) {
  if (window.gtmInitialized) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  loadScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(containerId)}`, "gtm-js");
  // noscript iframe is optional for SPA; dataLayer events still work
  window.gtmInitialized = true;
}

function initGa4(gaId: string) {
  if (window.gaInitialized || !gaId) return;
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`, "ga4-js");
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", gaId, { anonymize_ip: true, send_page_view: true });
  window.gaInitialized = true;
}

function initClarity(clarityId: string) {
  if (window.clarityInitialized || !clarityId) return;
  (function (c: Window, l: Document, a: string, r: string, i: string) {
    const w = c as Window & { [key: string]: unknown };
    w[a] =
      w[a] ||
      function (...args: unknown[]) {
        ((w[a] as { q?: unknown[] }).q = (w[a] as { q?: unknown[] }).q || []).push(args);
      };
    const t = l.createElement(r) as HTMLScriptElement;
    t.async = true;
    t.src = "https://www.clarity.ms/tag/" + i;
    const y = l.getElementsByTagName(r)[0];
    y?.parentNode?.insertBefore(t, y);
  })(window, document, "clarity", "script", clarityId);
  window.clarityInitialized = true;
}

function initCallRail(swapId: string) {
  if (!swapId || document.getElementById("callrail-swap")) return;
  // CallRail dynamic number insertion — only after consent (marketing tag)
  const s = document.createElement("script");
  s.id = "callrail-swap";
  s.type = "text/javascript";
  s.async = true;
  s.src = `https://cdn.callrail.com/companies/${encodeURIComponent(swapId)}/12/swap.js`;
  document.head.appendChild(s);
}

/**
 * Load measurement stack after explicit consent.
 * Preference: GTM (hosts GA4/Clarity tags in container) → else direct GA4 + Clarity.
 */
export function initAnalytics() {
  if (typeof window === "undefined") return;
  if (getConsent() !== "granted") return;

  const gtmId = window.__GTM_ID__ || "";
  const gaId = window.__GA_ID__ || "";
  const clarityId = window.__CLARITY_ID__ || "";
  const callrail = window.__CALLRAIL_SWAP__ || "";

  if (gtmId) {
    initGtm(gtmId);
    // When GTM owns tags, still expose gtag shim for direct trackEvent calls
    if (!window.gtag) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer!.push(args);
      };
    }
    window.gaInitialized = true;
  } else if (gaId) {
    initGa4(gaId);
  }

  // Clarity can run alongside GTM if not loaded via container
  if (clarityId && !gtmId) {
    initClarity(clarityId);
  }

  if (callrail) {
    initCallRail(callrail);
  }

  // Lightweight first-party page_view for GTM-only setups
  trackEvent("page_view", {
    page_path: window.location.pathname,
    page_title: document.title,
  });
}

/** Scroll depth + outbound + blog completion observers (safe to call once per app mount). */
export function bindEngagementTracking() {
  if (typeof window === "undefined") return () => {};
  if ((window as unknown as { __engagementBound?: boolean }).__engagementBound) {
    return () => {};
  }
  (window as unknown as { __engagementBound?: boolean }).__engagementBound = true;

  const marks = new Set<number>();
  const onScroll = () => {
    if (getConsent() !== "granted") return;
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop;
    const height = doc.scrollHeight - window.innerHeight;
    if (height <= 0) return;
    const pct = Math.min(100, Math.round((scrollTop / height) * 100));
    for (const threshold of [25, 50, 75, 100]) {
      if (pct >= threshold && !marks.has(threshold)) {
        marks.add(threshold);
        trackEvent("scroll_depth", {
          percent: threshold,
          page_path: window.location.pathname,
          event_category: "engagement",
        });
      }
    }
  };

  const onClick = (e: MouseEvent) => {
    if (getConsent() !== "granted") return;
    const target = (e.target as HTMLElement | null)?.closest?.("a") as HTMLAnchorElement | null;
    if (!target?.href) return;

    const href = target.href;
    const path = window.location.pathname;

    // tel:
    if (href.startsWith("tel:")) {
      trackCall(href.replace("tel:", ""));
      return;
    }

    // schedule CTAs
    if (href.includes("#schedule") || href.includes("calendly.com")) {
      trackScheduleClick();
    }

    // outbound
    try {
      const url = new URL(href, window.location.origin);
      if (url.origin !== window.location.origin) {
        trackEvent("outbound_click", {
          link_url: url.href,
          link_text: (target.textContent || "").trim().slice(0, 120),
          page_path: path,
          event_category: "engagement",
        });
      }
    } catch {
      /* ignore */
    }
  };

  // Blog read completion (~90% of article)
  let blogDone = false;
  const onBlogScroll = () => {
    if (blogDone || getConsent() !== "granted") return;
    if (!window.location.pathname.startsWith("/blog/")) return;
    const article = document.querySelector("article");
    if (!article) return;
    const rect = article.getBoundingClientRect();
    const articleTop = window.scrollY + rect.top;
    const articleHeight = article.scrollHeight;
    const progress = (window.scrollY + window.innerHeight - articleTop) / articleHeight;
    if (progress >= 0.9) {
      blogDone = true;
      trackEvent("blog_read_complete", {
        page_path: window.location.pathname,
        event_category: "engagement",
        percent: 90,
      });
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("scroll", onBlogScroll, { passive: true });
  document.addEventListener("click", onClick, true);

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("scroll", onBlogScroll);
    document.removeEventListener("click", onClick, true);
    (window as unknown as { __engagementBound?: boolean }).__engagementBound = false;
  };
}
