# Wave 2 Server-Side Changes Required
## CSP allowlist for Calendly embed (2.5)
## These changes are made on the VPS Caddy edge, not in the app container alone.

---

## Live status (2026-08-02)

| Item | Status |
|------|--------|
| 2.5 Calendly on `/contact#schedule` | **Live** (`f3c15f8` + CSP reload) |
| CSP `frame-src` includes calendly.com | **Done** 2026-08-02 |
| CSP `script-src` includes assets.calendly.com | **Done** 2026-08-02 |

---

## Content-Security-Policy — Calendly (required for scheduling widget)

**File:** `/opt/n8n/Caddyfile` — block `617east.com { ... header { Content-Security-Policy "..." } }`

**Problem:** Current CSP has `frame-src 'self'` and no Calendly hosts. Browser blocks the inline embed even though the React page loads the widget markup.

**Replace the CSP value with** (single line, keep other directives):

```
default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.clarity.ms https://assets.calendly.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://assets.calendly.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.googletagmanager.com https://www.clarity.ms https://calendly.com https://api.calendly.com https://assets.calendly.com blob: data:; frame-src 'self' https://calendly.com https://www.calendly.com; form-action 'self'; base-uri 'self'
```

**Apply:**
```bash
ssh debian@40.160.233.147
# edit /opt/n8n/Caddyfile as above
docker exec n8n-caddy-1 caddy reload --config /etc/caddy/Caddyfile
```

**Acceptance:**
```bash
curl -sI https://617east.com/contact | grep -i content-security-policy
# Must include: assets.calendly.com AND frame-src ... calendly.com

# Manual browser: open https://617east.com/contact#schedule
# Calendly iframe loads; booking flow works
```

**Fallback if embed still blocked:** page already links to
`https://calendly.com/617easttrust/30min` in a new tab (event slug verified 2026-08-02; `/free-consultation` 404s).

---

## Manual ops (not code)

| Item | Owner | Action |
|------|-------|--------|
| 2.1c Google review campaign | Principal | Email past clients → `https://g.page/r/CXfFFmoLNC7sEBI/review` — target 10 in 30 days |
| 2.1d AggregateRating schema | Code after reviews | Add only when GBP shows real rating + count |
| 2.2a–e GBP polish | Principal | Website → apex; hours by appointment; description + photos |
| GA4 / Clarity IDs | VPS `.env` | Measurement pillar (Wave 4 adjacency) |
