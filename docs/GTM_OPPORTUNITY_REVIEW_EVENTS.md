# GTM mapping — Opportunity Review funnel
**Author:** Zo (for Monsuier Legrand)  
**Date:** 2026-08-12  
**Project:** 617east  
**Status:** final (container live; configure tags in GTM UI)  
**Container:** `GTM-WXLXT7FV`  
**Site events:** consent-gated via `client/src/lib/analytics.ts` → `dataLayer`

---

## TL;DR

Site already pushes these Custom Events after cookie Accept. Map them in GTM → GA4 (or Ads) when a Measurement ID is available. **`GA4_ID` env stays empty by design** — add GA4 only inside GTM with a real `G-…` ID.

---

## Events fired by the site

| dataLayer `event` | When | Key params |
|---|---|---|
| `opportunity_review_view` | `/opportunity-review` mount | `client`, `city`, `source`, `token`, `event_category=funnel` |
| `opportunity_review_cta_click` | Primary CTA (hero/sticky book) | `cta_id` (`hero_book` \| `sticky_book`), `client`, `source` |
| `opportunity_review_form_start` | First form field focus | `client`, `source` |
| `generate_lead` | Form success | `form_name=opportunity_review`, `service_interest=web-design-seo-north-carolina` |
| `schedule_click` | Calendly open | `event_category=conversion` |
| `click_to_call` | Phone tap | `phone`, `event_category=engagement` |
| `opportunity_review_hosted_brief_click` | Link back to hosted brief | `token` |

Shared contact form (other pages) also fires `generate_lead` with other `form_name` values — filter on `form_name` when building the Opportunity Review conversion.

---

## Recommended GTM setup (paste checklist)

### 1. Variables (Data Layer Variables)
Create DLVs for:

- `client`
- `city`
- `source`
- `token`
- `cta_id`
- `form_name`
- `service_interest`
- `event_category`
- `phone`

### 2. Triggers (Custom Event)

| Trigger name | Event name | Optional filter |
|---|---|---|
| CE - opportunity_review_view | `opportunity_review_view` | — |
| CE - opportunity_review_cta_click | `opportunity_review_cta_click` | — |
| CE - opportunity_review_form_start | `opportunity_review_form_start` | — |
| CE - generate_lead_opportunity_review | `generate_lead` | `form_name` equals `opportunity_review` |
| CE - schedule_click | `schedule_click` | — |
| CE - click_to_call | `click_to_call` | — |

### 3. Tags (GA4 Event) — requires GA4 Config tag first

If not present:

1. **GA4 Configuration** — Measurement ID `G-…` — All Pages (site already gates consent before GTM loads).
2. For each CE trigger above, create **GA4 Event** tag:
   - Event name = same as Custom Event (recommended for BigQuery parity)
   - Event parameters: map DLVs (`client`, `source`, `token`, `cta_id`, `form_name`, …)

### 4. Conversions (mark in GA4 Admin)

Mark as key events / conversions:

1. `generate_lead` (primary)  
2. `schedule_click` (secondary)  
3. `click_to_call` (secondary)  
4. Optional funnel assist: `opportunity_review_cta_click`

Do **not** mark `opportunity_review_view` as a conversion.

### 5. Optional Google Ads

If running lead ads later: import GA4 key events `generate_lead` and `schedule_click` — or fire Ads conversion tags on the same CE triggers.

---

## Preview / QA

1. GTM Preview → open  
   `https://617east.com/opportunity-review?client=QA&city=Aberdeen&source=smoke&utm_campaign=visibility-gap`
2. Accept cookies.
3. Confirm `opportunity_review_view` in dataLayer.
4. Click primary CTA → `opportunity_review_cta_click`.
5. Focus a form field → `opportunity_review_form_start`.
6. Submit test lead (source already `opportunity_review`) → `generate_lead`.
7. Publish container workspace when green.

First-party pipeline also receives the same event names via `/__analytics__/collect` (independent of GTM).

---

## Notes

- Clarity / CallRail load from site env — **do not** duplicate as GTM tags.
- CSP already allows `googletagmanager.com` / `google-analytics.com`.
- Miner hosted-brief events (`report_open`, `cta_click`, `book_intent`) live on `discover.617east.com` — separate surface; not in this GTM container unless a second container is added later.
