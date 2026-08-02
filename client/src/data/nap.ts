/*
 * 617 EAST TRUST — NAP + brand contact (Wave 4)
 * Single source of truth for citations, schema, footer, and call tracking.
 * Keep directory listings identical to these values.
 */

export const BUSINESS_NAME = "617 East Trust";

/** Primary public phone (E.164 without + for tel: links use PHONE_TEL). */
export const PHONE_DISPLAY = "(910) 315-1800";
export const PHONE_E164 = "+19103151800";
export const PHONE_TEL = "tel:+19103151800";
/** Digits-only for tel: shortcuts that still work on mobile. */
export const PHONE_DIGITS = "9103151800";

/**
 * Optional call-tracking display number (CallRail / CTM swap).
 * When set at build time via VITE_CALL_TRACKING_DISPLAY, UI can show it;
 * tracking scripts still swap DOM numbers dynamically when configured.
 */
export const CALL_TRACKING_DISPLAY =
  (typeof import.meta !== "undefined" &&
    (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_CALL_TRACKING_DISPLAY) ||
  "";

export const EMAIL = "info@617east.com";
export const WEBSITE = "https://617east.com";

/** Locality for citations — service-area business, not storefront retail. */
export const ADDRESS = {
  streetAddress: "", // no public storefront street (by appointment)
  addressLocality: "Sandhills",
  addressRegion: "NC",
  postalCode: "",
  addressCountry: "US",
  /** One-line NAP for directories that require a single field */
  formatted: "617 East Trust · Sandhills Region, NC · (910) 315-1800 · info@617east.com",
};

export const GEO = {
  latitude: 35.1854,
  longitude: -79.4695,
};

export const AREA_SERVED = [
  "Sandhills Region, NC",
  "Pinehurst, NC",
  "Southern Pines, NC",
  "Charlotte, NC",
  "Fayetteville, NC",
  "Raleigh, NC",
] as const;

export const HOURS_NOTE = "By appointment. Response within 24 hours.";

/**
 * Social / entity URLs for schema sameAs + footer.
 * Replace LINKEDIN_COMPANY / LINKEDIN_FOUNDER once profiles are live.
 * Empty strings are omitted from schema.
 */
export const SOCIAL = {
  googleBusiness: "https://g.page/r/617easttrust/review",
  linkedinCompany:
    (typeof import.meta !== "undefined" &&
      (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_LINKEDIN_COMPANY) ||
    "https://www.linkedin.com/company/617-east-trust",
  linkedinFounder:
    (typeof import.meta !== "undefined" &&
      (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_LINKEDIN_FOUNDER) ||
    "",
  facebook:
    (typeof import.meta !== "undefined" &&
      (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_FACEBOOK_URL) ||
    "",
};

export function sameAsList(): string[] {
  return [SOCIAL.googleBusiness, SOCIAL.linkedinCompany, SOCIAL.linkedinFounder, SOCIAL.facebook].filter(
    Boolean
  ) as string[];
}

/** Phone shown in UI — prefers tracking display if configured. */
export function displayPhone(): string {
  return CALL_TRACKING_DISPLAY || PHONE_DISPLAY;
}

export function telHref(): string {
  if (CALL_TRACKING_DISPLAY) {
    const digits = CALL_TRACKING_DISPLAY.replace(/\D/g, "");
    return digits ? `tel:+1${digits}` : PHONE_TEL;
  }
  return PHONE_TEL;
}
