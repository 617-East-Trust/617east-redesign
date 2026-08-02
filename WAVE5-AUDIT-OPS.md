# Wave 5 — Audit Verification & Ops Follow-through
**Date:** 2026-08-02  
**Source audits:** `Records/audits/617east_20260802_ultimate-audit.md` (Zo, 70/100) + Manus upload (92/100)

## Claim verification (live + source)

| Audit claim | Verified status | Action |
|-------------|-----------------|--------|
| No contact form on `/contact` | **False** — form + n8n webhook + Calendly `#schedule` exist in SPA | Improved crawler noscript to mention form + Calendly URL |
| No canonical in SSR | **False** — `<link rel="canonical">` present on all key routes | No code change needed |
| No BreadcrumbList | **Partial** — already on service pages | Added breadcrumbs for contact, blog posts, locations |
| No Service/Offer schema | **Partial** — Service existed; Offers incomplete | Added Offer prices for priced services |
| AggregateRating missing | **Correct to omit** until real Google reviews exist | Documented; do not fabricate stars |
| No city landing pages | **True** | Added `/locations` + 5 city pages |
| Author E-E-A-T thin | **Partial** — byline existed | Added full author bio block on blog posts |
| Accessibility sparse | **Mostly true** | Skip link, form `htmlFor`/`aria-*`, mobile nav ARIA |
| DMARC `p=none` | **True** | DNS change required at Ionos (below) |
| SPF `~all` | **True** | Softfail is OK short-term; tighten after DMARC monitoring |
| CSP `unsafe-inline`/`unsafe-eval` | **True** | Deferred (high effort; React/GTM/Calendly) |
| GBP unreviewed / citations | **External** | Ops checklist below |
| GA4 empty | **By design** (principal) | Leave `GA4_ID` empty; optional GTM tag later |

## Shipped in this wave (code)

1. City hub + 5 location pages (Pinehurst, Southern Pines, Charlotte, Fayetteville, Raleigh)
2. Footer internal links to location pages
3. Skip-to-content link + contact form a11y + mobile nav a11y
4. Blog author bio (E-E-A-T)
5. SSR: contact noscript, service Offers, blog/location breadcrumbs
6. Sitemap + route manifest expanded (29 → 35 URLs)

## DNS (Ionos) — DMARC / SPF

Current (verified 2026-08-02):
```
TXT 617east.com:        v=spf1 include:_spf-us.ionos.com ~all
TXT _dmarc.617east.com: v=DMARC1; p=none;
```

**Recommended change (after 7–14 days of reports if possible):**

1. Add/update `_dmarc.617east.com` TXT:
   ```
   v=DMARC1; p=quarantine; rua=mailto:dmarc@617east.com; pct=100; adkim=r; aspf=r
   ```
2. Create mailbox or alias `dmarc@617east.com` for aggregate reports (or use a free DMARC inbox).
3. Keep SPF `~all` until no legitimate senders fail; then consider `-all`.
4. Do **not** jump to `p=reject` until quarantine is clean for 2+ weeks.

Ionos path: Domains → 617east.com → DNS → TXT records.

## GBP (Google Business Profile) — principal action

1. Claim/verify listing for **617 East Trust** (Sandhills / service-area business if no storefront).
2. Categories: Business consultant; Secondary: Credit counseling service / Website designer as accurate.
3. NAP must match site:
   - Name: `617 East Trust`
   - Phone: `(910) 315-1800`
   - Email: `info@617east.com`
   - Website: `https://617east.com`
   - Service area: Pinehurst, Southern Pines, Charlotte, Fayetteville, Raleigh, Sandhills NC
4. Add 10+ photos (founder, workspace, docs-with-consent, logo).
5. Weekly Google post for 4 weeks.
6. Solicit reviews from real clients only — link: set in `GOOGLE_REVIEW_URL` / footer.
7. **Only after ≥5 real Google reviews** consider `AggregateRating` schema wired to live rating (never invent).

## Citation kit (exact NAP)

Use **identical** strings on every directory:

| Field | Value |
|-------|--------|
| Business name | 617 East Trust |
| Phone | (910) 315-1800 |
| Email | info@617east.com |
| Website | https://617east.com |
| Address | Sandhills Region, NC (service area — no public storefront street) |
| Hours | By appointment |

**Submit (priority order):**
1. Google Business Profile (if not verified)
2. Apple Business Connect
3. Bing Places
4. BBB (if eligible)
5. Yelp
6. Facebook Business Page
7. LinkedIn Company (already linked in footer when live)
8. NC-specific: Chamber / local Sandhills directories

Track submissions in a sheet: directory | date | URL | status.

## Content calendar (next 30 days)

| Week | Asset | Target keyword angle |
|------|-------|----------------------|
| 1 | GBP posts ×2 + review asks | Brand / local pack |
| 1 | Confirm city pages index (GSC URL inspection) | city + service |
| 2 | Blog: NC sales tax / nexus for new LLCs | "NC LLC sales tax" |
| 2 | Internal link pass: services ↔ cities ↔ 3 blogs | equity |
| 3 | Blog: veteran-owned business formation NC | Fayetteville / military |
| 3 | Case-style page draft (anonymized outcomes) | E-E-A-T |
| 4 | Citation batch 1 (Apple, Bing, Yelp) | NAP |
| 4 | Measure: Search Console queries for location URLs | baseline |

## Explicit non-goals this wave

- Fake AggregateRating / star schema
- Full CSP nonce migration
- Activating GA4 Measurement ID (principal hold)
- Automatic GBP claim (requires principal Google login)
