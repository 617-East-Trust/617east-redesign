# Wave 4 — Ops Runbook (Measurement & Authority)
**Author:** Zo (for Monsuier Legrand)  
**Date:** 2026-08-02  
**Project:** 617east  
**Status:** final (code shipped; external accounts require principal)

Code loads tags only after cookie **Accept**. Configure IDs in VPS `/opt/617east-redesign/.env` and ensure `compose.yaml` passes them (Wave 4 does).

---

## 4.1 Google Tag Manager + events

### A. Create GTM container (if not already)
1. [tagmanager.google.com](https://tagmanager.google.com) → New container → Web → 617east.com  
2. Copy container ID `GTM-XXXXXXX`  
3. On VPS `.env`: `GTM_ID=GTM-XXXXXXX`  
4. Redeploy app: `docker compose up -d --build app` (or rebuild)

### B. Tags inside GTM (recommended)
| Tag | Trigger |
|-----|---------|
| GA4 Configuration | All Pages (consent already handled by site) |
| Clarity | All Pages (or Consent Initialization if using Consent Mode later) |
| Optional: Conversion Linker | All Pages |

### C. Site-fired events (dataLayer / gtag)
These fire automatically after consent:

| Event | When |
|-------|------|
| `page_view` | After Accept / return visitor with consent |
| `generate_lead` | Contact form success |
| `click_to_call` | `tel:` clicks |
| `schedule_click` | `#schedule` or Calendly links |
| `scroll_depth` | 25 / 50 / 75 / 100% |
| `blog_read_complete` | ~90% through `<article>` on blog posts |
| `outbound_click` | External links |

In GTM: create Custom Event triggers matching those names → GA4 Event tags.

### D. Without GTM
Leave `GTM_ID` empty; set `GA4_ID` + `CLARITY_ID` for direct load after consent.

### E. Pass env into Docker
`compose.yaml` now includes `GA4_ID`, `CLARITY_ID`, `GTM_ID`, `CALLRAIL_SWAP_ID`, `CONSENT_RECORDER_URL`.  
VPS already had `CLARITY_ID` in `.env` but it was **not** passed to the container before Wave 4 — rebuild after pull.

---

## 4.2 Call tracking (two numbers)

| Number | Use |
|--------|-----|
| **Website tracking** | CallRail/CTM swap number shown on site (after consent) |
| **GBP listing** | Keep primary business line or dedicated GBP forwarding number |

### CallRail
1. Create company + website source for 617east.com  
2. Create tracking number pool for NC  
3. Enable DNI (swap)  
4. Set `.env` `CALLRAIL_SWAP_ID=` to the company ID used in  
   `https://cdn.callrail.com/companies/{ID}/12/swap.js`  
5. Rebuild app; confirm CSP allows `cdn.callrail.com`  
6. Do **not** put the tracking number as the only GBP number without a coherent dual setup

### Acceptance
- Accept cookies → CallRail script in Network  
- Click-to-call still dials; CallRail dashboard shows sessions/calls after traffic

---

## 4.3 Local citation profile (NAP)

**Canonical NAP** (from `client/src/data/nap.ts`):

```
Name:     617 East Trust
Phone:    (910) 315-1800
Email:    info@617east.com
Website:  https://617east.com   (apex — not www)
Locality: Sandhills Region, NC
Hours:    By appointment
```

### Directories (create/claim; identical NAP)

| Platform | Priority |
|----------|----------|
| Google Business Profile | P0 — already exists; website → apex; hours by appointment |
| Bing Places | P0 |
| Apple Business Connect | P1 |
| Yelp | P1 |
| Facebook Business Page | P1 |
| LinkedIn Company Page | P0 (Wave 4.4) |
| BBB | P2 |
| YellowPages | P2 |
| Nextdoor Business | P2 |

Checklist: name exact · phone exact · website apex · category matches services · no 24-hour hours.

---

## 4.4 LinkedIn

1. Create **Company Page**: “617 East Trust”  
2. URL target: `https://www.linkedin.com/company/617-east-trust` (or actual slug)  
3. Complete About, logo, website, location Sandhills/NC  
4. Lamont personal profile: headline + link to company + Featured → 617east.com  
5. Site already links footer + About to company URL; set  
   `VITE_LINKEDIN_FOUNDER=https://www.linkedin.com/in/...` and rebuild if you want founder link  
6. Schema `sameAs` includes company + Google review URL when present

---

## CSP (Caddy) — required for GTM + CallRail

Ensure `/opt/n8n/Caddyfile` CSP for `617east.com` includes:

```
script-src … https://www.googletagmanager.com https://tagmanager.google.com https://cdn.callrail.com
connect-src … https://www.google-analytics.com https://analytics.google.com https://*.google-analytics.com https://www.googletagmanager.com https://cdn.callrail.com https://api.callrail.com
img-src … https://www.googletagmanager.com
```

Reload: `docker exec n8n-caddy-1 caddy reload --config /etc/caddy/Caddyfile`

---

## Quick VPS apply

```bash
ssh debian@40.160.233.147
cd /opt/617east-redesign
# edit .env → GTM_ID=…  GA4_ID=…  (CLARITY_ID already set)
git pull origin main
docker compose build --no-cache app && docker compose up -d app
```
