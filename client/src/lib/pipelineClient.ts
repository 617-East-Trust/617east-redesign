/*
 * First-party analytics pipeline client (617-East-Trust/analytics-pipeline).
 * Posts consent-gated event batches to same-origin /__analytics__/collect.
 * The server proxy attaches the Bearer token — never expose the collect secret in the browser.
 *
 * Does NOT attach its own click/scroll listeners — EngagementTracker + trackEvent own those
 * so we avoid double-counting. This client handles IDs, page_view, dual-write, unload flush.
 */

export type PipelineCategory = "necessary" | "analytics" | "behavioral" | "fingerprint";

interface PipelineEvent {
  event_type: string;
  event_action?: string;
  event_label?: string;
  event_value?: number;
  page_url: string;
  page_path: string;
  page_title: string;
  referrer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  user_id: string;
  session_id: string;
  user_agent: string;
  screen_resolution: string;
  viewport_size: string;
  device_type: string;
  browser: string;
  os: string;
  language: string;
  timezone: string;
  is_bot: number;
  consent_version: string;
  consent_categories: string;
  timestamp: number;
  canvas_hash?: string;
  webgl_renderer?: string;
  webgl_vendor?: string;
  metadata?: Record<string, unknown>;
}

const CONSENT_VERSION = "2026-08-04-site";
const RETRY_KEY = "617east_pipeline_retry";
const RETRY_MAX = 200;
const UID_KEY = "analytics_uid";
const SID_KEY = "analytics_sid";
const SID_TS_KEY = "analytics_sid_ts";
const FP_KEY = "617east_fingerprint_optin";

declare global {
  interface Window {
    __PIPELINE_COLLECT__?: string;
    __pipelineClient?: PipelineClient;
  }
}

class PipelineClient {
  private endpoint = "";
  private queue: PipelineEvent[] = [];
  private userId = "";
  private sessionId = "";
  private categories: PipelineCategory[] = ["necessary"];
  private granted = false;
  private flushTimer: number | null = null;
  private fingerprint: { canvas_hash: string; webgl_renderer: string; webgl_vendor: string } | null =
    null;
  private readonly maxBatch = 40;
  private readonly flushMs = 8000;

  init(endpoint: string) {
    if (!endpoint) return;
    this.endpoint = endpoint;
    this.loadRetryQueue();
    if (!this.flushTimer) {
      this.flushTimer = window.setInterval(() => this.flush(), this.flushMs);
    }
    window.addEventListener("beforeunload", () => this.flush(true));
    window.addEventListener("pagehide", () => this.flush(true));
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") this.flush(true);
    });
  }

  isConfigured(): boolean {
    return Boolean(this.endpoint);
  }

  grant(categories: PipelineCategory[] = ["analytics", "behavioral"], fingerprint = false) {
    const cats = new Set<PipelineCategory>(["necessary", ...categories]);
    if (fingerprint) {
      cats.add("fingerprint");
      try {
        localStorage.setItem(FP_KEY, "1");
      } catch {
        /* ignore */
      }
    } else {
      try {
        localStorage.removeItem(FP_KEY);
      } catch {
        /* ignore */
      }
    }
    this.categories = Array.from(cats);
    this.granted = this.categories.includes("analytics");
    if (this.granted) {
      this.ensureIds();
      if (this.categories.includes("fingerprint")) this.collectFingerprint();
      else this.fingerprint = null;
      // page_view is emitted by initAnalytics → trackEvent (single path, no double fire)
    }
  }

  deny() {
    this.granted = false;
    this.categories = ["necessary"];
    this.queue = [];
    this.fingerprint = null;
    try {
      localStorage.removeItem(FP_KEY);
      localStorage.removeItem(RETRY_KEY);
    } catch {
      /* ignore */
    }
  }

  wantsFingerprint(): boolean {
    try {
      return localStorage.getItem(FP_KEY) === "1";
    } catch {
      return false;
    }
  }

  track(
    eventType: string,
    action = "",
    label = "",
    value = 0,
    metadata?: Record<string, unknown>,
  ) {
    if (!this.endpoint || !this.granted) return;
    // page_view / conversion require analytics; engagement requires behavioral
    const needsBehavioral = !["page_view", "conversion", "generate_lead", "consent"].includes(
      eventType,
    );
    if (needsBehavioral && !this.categories.includes("behavioral")) return;
    if (!this.categories.includes("analytics") && eventType !== "consent") return;

    this.ensureIds();
    const event = this.buildEvent(eventType, action, label, value, metadata);
    this.queue.push(event);
    if (this.queue.length >= this.maxBatch) this.flush();
  }

  private buildEvent(
    eventType: string,
    action: string,
    label: string,
    value: number,
    metadata?: Record<string, unknown>,
  ): PipelineEvent {
    const params = new URLSearchParams(location.search);
    const ua = navigator.userAgent;
    const { browser, os, device_type } = parseUA(ua);
    const evt: PipelineEvent = {
      event_type: eventType,
      event_action: action,
      event_label: label,
      event_value: value,
      page_url: location.href,
      page_path: location.pathname,
      page_title: document.title,
      referrer: document.referrer,
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_content: params.get("utm_content") || "",
      utm_term: params.get("utm_term") || "",
      user_id: this.userId,
      session_id: this.sessionId,
      user_agent: ua,
      screen_resolution: `${screen.width}x${screen.height}`,
      viewport_size: `${innerWidth}x${innerHeight}`,
      device_type,
      browser,
      os,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      is_bot: isBot(ua) ? 1 : 0,
      consent_version: CONSENT_VERSION,
      consent_categories: this.categories.join(","),
      timestamp: Date.now(),
      canvas_hash: "",
      webgl_renderer: "",
      webgl_vendor: "",
      metadata,
    };
    if (this.fingerprint && this.categories.includes("fingerprint")) {
      evt.canvas_hash = this.fingerprint.canvas_hash;
      evt.webgl_renderer = this.fingerprint.webgl_renderer;
      evt.webgl_vendor = this.fingerprint.webgl_vendor;
    }
    return evt;
  }

  private ensureIds() {
    let uid = localStorage.getItem(UID_KEY);
    if (!uid) {
      uid = uuid();
      localStorage.setItem(UID_KEY, uid);
    }
    this.userId = uid;

    const now = Date.now();
    const last = parseInt(localStorage.getItem(SID_TS_KEY) || "0", 10);
    let sid = localStorage.getItem(SID_KEY);
    if (!sid || now - last > 30 * 60 * 1000) {
      sid = uuid();
      localStorage.setItem(SID_KEY, sid);
    }
    localStorage.setItem(SID_TS_KEY, String(now));
    this.sessionId = sid;
  }

  private collectFingerprint() {
    try {
      const canvas_hash = canvasHash();
      const { renderer, vendor } = webglInfo();
      this.fingerprint = {
        canvas_hash,
        webgl_renderer: renderer,
        webgl_vendor: vendor,
      };
    } catch {
      this.fingerprint = { canvas_hash: "", webgl_renderer: "", webgl_vendor: "" };
    }
  }

  private loadRetryQueue() {
    try {
      const raw = localStorage.getItem(RETRY_KEY);
      if (!raw) return;
      const pending = JSON.parse(raw) as PipelineEvent[];
      if (Array.isArray(pending) && pending.length) {
        this.queue.unshift(...pending.slice(0, RETRY_MAX));
      }
      localStorage.removeItem(RETRY_KEY);
    } catch {
      /* ignore */
    }
  }

  private persistRetry(batch: PipelineEvent[]) {
    try {
      const raw = localStorage.getItem(RETRY_KEY);
      const existing: PipelineEvent[] = raw ? JSON.parse(raw) : [];
      const merged = [...batch, ...(Array.isArray(existing) ? existing : [])].slice(0, RETRY_MAX);
      localStorage.setItem(RETRY_KEY, JSON.stringify(merged));
    } catch {
      /* ignore */
    }
  }

  private async flush(keepalive = false) {
    if (!this.endpoint || this.queue.length === 0) return;
    const batch = this.queue.splice(0, this.maxBatch);
    const body = JSON.stringify(batch);

    if (keepalive && typeof navigator.sendBeacon === "function") {
      const blob = new Blob([body], { type: "application/json" });
      const ok = navigator.sendBeacon(this.endpoint, blob);
      if (!ok) {
        this.queue.unshift(...batch);
        this.persistRetry(batch);
      }
      return;
    }

    try {
      const res = await fetch(this.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive,
        credentials: "omit",
      });
      if (!res.ok) {
        this.queue.unshift(...batch);
        this.persistRetry(batch);
      }
    } catch {
      this.queue.unshift(...batch);
      this.persistRetry(batch);
    }
  }
}

function uuid(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function isBot(ua: string): boolean {
  return /bot|crawl|spider|slurp|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegram/i.test(
    ua,
  );
}

function parseUA(ua: string) {
  let browser = "unknown",
    os = "unknown",
    device_type = "desktop";
  if (/mobile|android|iphone|ipad/i.test(ua))
    device_type = /ipad|tablet/i.test(ua) ? "tablet" : "mobile";
  if (/chrome|crios/i.test(ua) && !/edge|edg/i.test(ua)) browser = "Chrome";
  else if (/firefox|fxios/i.test(ua)) browser = "Firefox";
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = "Safari";
  else if (/edg/i.test(ua)) browser = "Edge";
  if (/windows/i.test(ua)) os = "Windows";
  else if (/macintosh|mac os/i.test(ua)) os = "macOS";
  else if (/android/i.test(ua)) os = "Android";
  else if (/iphone|ipad|ipod/i.test(ua)) os = "iOS";
  else if (/linux/i.test(ua)) os = "Linux";
  return { browser, os, device_type };
}

function canvasHash(): string {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 50;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";
    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial'";
    ctx.fillStyle = "#f60";
    ctx.fillRect(0, 0, 200, 50);
    ctx.fillStyle = "#069";
    ctx.fillText("617east-fp", 2, 15);
    const data = canvas.toDataURL();
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      hash = (hash << 5) - hash + data.charCodeAt(i);
      hash |= 0;
    }
    return "c" + (hash >>> 0).toString(16);
  } catch {
    return "";
  }
}

function webglInfo(): { renderer: string; vendor: string } {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return { renderer: "", vendor: "" };
    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
    if (!dbg) return { renderer: "", vendor: "" };
    return {
      renderer: String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) || "").slice(0, 120),
      vendor: String(gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL) || "").slice(0, 80),
    };
  } catch {
    return { renderer: "", vendor: "" };
  }
}

const client = new PipelineClient();

/** Call once after consent granted (or on return visit with prior grant). */
export function initPipeline(fingerprint = false) {
  if (typeof window === "undefined") return;
  const endpoint = window.__PIPELINE_COLLECT__ || "";
  if (!endpoint) return;
  client.init(endpoint);
  window.__pipelineClient = client;
  // Restore fingerprint preference if previously opted in
  const fp = fingerprint || client.wantsFingerprint();
  client.grant(["analytics", "behavioral"], fp);
}

export function denyPipeline() {
  if (typeof window === "undefined") return;
  client.deny();
}

export function trackPipeline(
  eventType: string,
  properties: Record<string, unknown> = {},
) {
  if (typeof window === "undefined") return;
  if (!client.isConfigured()) return;
  const action = String(properties.event_action ?? properties.action ?? "");
  const label = String(
    properties.event_label ?? properties.label ?? properties.page_path ?? "",
  );
  const value = Number(properties.value ?? properties.percent ?? properties.event_value ?? 0) || 0;
  client.track(eventType, action, label, value, properties);
}

export function isPipelineEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(window.__PIPELINE_COLLECT__);
}
