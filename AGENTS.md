# 617 East Trust — Site Source
**Last updated:** 2026-08-02

## Architecture (canonical)

```
Zo workspace  ──edit/commit/push──►  GitHub repo  ──pull/build──►  VPS live site
```

| Layer | Location | Role |
|-------|----------|------|
| **Workspace copy** | Zo: `/home/workspace/Projects/617east-source` | Edit here only. Not a host. |
| **Source of truth** | GitHub: [`617-East-Trust/617east-redesign`](https://github.com/617-East-Trust/617east-redesign) | `main` branch |
| **Production host** | VPS `40.160.233.147` (`617east`) | Live `https://617east.com` |
| **VPS checkout** | `/opt/617east-redesign` | Clone of redesign repo; Docker build source |
| **Runtime** | Docker `617east-web` (`617east-redesign-app`) on port 3000 | Proxied by Caddy |

**Do not host 617east.com on Zo.** Zo is a working copy only. Live traffic stays on the VPS.

### Archived (do not deploy from)
- GitHub `617-East-Trust/617-trust` — archive through Wave 4 commit `27af03e`
- Zo paths: `Projects/617east-site`, `Projects/617east-rebuild`, `Projects/_backup_617east_*`, `Projects/Web/617-trust`

## Current alignment (verified 2026-08-02)
- Workspace HEAD = `dcdecfd` (Wave 6 ship)
- GitHub `origin/main` = `dcdecfd`
- VPS `/opt/617east-redesign` HEAD = `dcdecfd`
- Live: `https://617east.com` → HTTP 200 via Caddy → `617east-web:3000`
- Wave 1: long service URLs + blogs unique titles; CROA/privacy/cookie curl-visible
- Wave 2: testimonials, Calendly `#schedule`, blog CTAs, Schedule sticky CTA; CSP allows calendly.com
- Calendly event URL: `https://calendly.com/617easttrust/30min` (not `/free-consultation` — that 404s)
- Wave 3: all services geo-slugged; `/how-it-works`; +3 priority posts
- Wave 4: GTM/GA4/Clarity/CallRail consent-gated hooks; engagement events; NAP + LinkedIn footer; CSP for GTM/CallRail
- Wave 5: audit claim verification; `/locations` + 5 city landers; skip-link/a11y; blog author bio; Service `Offer` prices; breadcrumbs. Ops: `WAVE5-AUDIT-OPS.md` (DMARC done). **GBP Business Profile ID:** `8360-7639-2608-2674-046`; review URL `https://g.page/r/CXfFFmoLNC7sEBI/review` → `Projects/Infrastructure/gbp-617east.md`. Wired in `nap.ts` + `testimonials.ts`. **Do not add AggregateRating until real Google reviews exist.**
- Wave 6 (2026-08-02): service→location internal links; blogs NC sales-tax/nexus + veteran-owned formation; sitemap **37** URLs; citations kit `Projects/Infrastructure/citations-617east.md`; GBP automations recreated (weekly post + daily review replies). Live HEAD `dcdecfd`.
- **Measurement IDs (VPS `.env`, 2026-08-02):** `GTM_ID=GTM-WXLXT7FV`, `CLARITY_ID=xw4guexwib`, `CALLRAIL_SWAP_ID=691070475/f396…` (from CallRail `script_url`). **`GA4_ID` left empty by design (principal: leave GA4 empty for now)** — no direct gtag load; do not set numeric property `543882709` as `GA4_ID` (not a Measurement ID). Optional later: add GA4 Measurement ID (`G-…`) inside GTM UI, not env. CallRail `ctrk_…` is API key (not browser swap id).

VPS-only (not in git): `.env` secrets; local `compose.yaml` pin of `N8N_WEBHOOK_URL` value (repo has the var name only).

## Git remotes (workspace)
```
origin  git@github.com:617-East-Trust/617east-redesign.git
```
Branch: `main` tracks `origin/main`.

## Day-to-day workflow
1. Edit on Zo in `Projects/617east-source`
2. `git add` / `git commit` / `git push origin main`
3. On VPS:
   ```bash
   ssh debian@40.160.233.147
   cd /opt/617east-redesign
   git pull origin main
   docker compose build --no-cache app && docker compose up -d app
   ```
4. Verify: `curl -sI https://617east.com | head -5` → HTTP 200

Edge reload (only if Caddyfile changed):
```bash
docker exec n8n-caddy-1 caddy reload --config /etc/caddy/Caddyfile
```
Caddyfile host path: `/opt/n8n/Caddyfile`.

## Stack
- React 19 + Vite + Tailwind + R3F
- SSG via `scripts/ssg.mjs`
- Node server (`server/index.ts`) for production static + API
- pnpm lockfile; multi-stage `Dockerfile`

## Key product notes
- Narrative: "the advisor who tells you what not to do"
- Contact webhook: `https://n8n.617east.com/webhook/617east-contact`
- Analytics: consent-gated GA4 + Clarity (`CookieConsent.tsx`)
- www → apex 301 handled in Caddy
