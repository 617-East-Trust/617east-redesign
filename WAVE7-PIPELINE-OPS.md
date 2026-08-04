# Wave 7 — First-party analytics pipeline (site integration)
**Date:** 2026-08-04  
**Repo HEAD after ship:** (see git log)  
**Depends on:** [617-East-Trust/analytics-pipeline](https://github.com/617-East-Trust/analytics-pipeline) HEAD `bdc8b4d+`

## What shipped in 617east-redesign

- Same-origin collect proxy: `POST /__analytics__/collect` → `ANALYTICS_COLLECT_URL` with server-side Bearer
- Client: `client/src/lib/pipelineClient.ts` dual-writes consent-gated events
- Cookie banner: names first-party analytics; optional fingerprint checkbox (off by default)
- Privacy + crawlable cookie notice updated
- Env: `ANALYTICS_COLLECT_URL`, `ANALYTICS_COLLECT_TOKEN`

## VPS deploy (617east.com)

### 1. Deploy analytics-pipeline (if not already)

On the analytics host (or same VPS if you co-locate):

```bash
# From analytics-pipeline checkout
cp .env.example .env
# openssl rand -base64 48 for each CHANGE_ME
docker compose up -d
```

Ensure reverse proxy enforces Bearer + TLS on the collect path (see pipeline `config/caddy/Caddyfile`).

### 2. Site `.env` on VPS (`/opt/617east-redesign/.env`)

Add (adjust URL to where Vector is reachable from the site container):

```bash
# If Vector is on the same host loopback (compose binds 127.0.0.1:8080):
# site container may need host network or docker host gateway — prefer a
# docker network alias or public collect URL.
ANALYTICS_COLLECT_URL=http://172.17.0.1:8080
# or https://collect.617east.com/collect once Caddy is wired
ANALYTICS_COLLECT_TOKEN=<same as VECTOR_API_TOKEN>
```

**Network note:** `617east-web` cannot reach `127.0.0.1:8080` on the host unless you use `host.docker.internal` / `extra_hosts` / shared network. Prefer putting Vector on the same Docker network or proxying via Caddy on the host and using `https://collect.617east.com/collect` from the app.

### 3. Pull + rebuild site

```bash
ssh debian@40.160.233.147
cd /opt/617east-redesign
git pull origin main
# ensure .env has ANALYTICS_COLLECT_* 
docker compose build --no-cache app && docker compose up -d app
```

### 4. Verify

```bash
# Proxy accepts empty upstream gracefully when URL unset; when set:
curl -sI https://617east.com | head -3
# HTML should contain: window.__PIPELINE_COLLECT__="/__analytics__/collect"
curl -s https://617east.com/ | grep -o '__PIPELINE_COLLECT__[^;]*'

# After Accept in browser, events hit collect; or smoke:
curl -s -o /dev/null -w '%{http_code}\n' -X POST https://617east.com/__analytics__/collect \
  -H 'Content-Type: application/json' \
  -d '[{"event_type":"page_view","user_id":"test","session_id":"test","timestamp":'"$(date +%s000)"',"page_url":"https://617east.com/","page_path":"/","page_title":"t"}]'
# Expect 204 if upstream healthy, 502 if Vector down, 204 if collect URL unset
```

### 5. Caddy (optional collect host)

If using `collect.617east.com`, append pipeline Caddy snippet and:

```bash
docker exec n8n-caddy-1 caddy reload --config /etc/caddy/Caddyfile
```

CSP: same-origin `/__analytics__/collect` needs no CSP change (`connect-src 'self'` already allows it).

## Consent behavior

| Action | Third parties (GTM/Clarity/CallRail) | Pipeline |
|--------|--------------------------------------|----------|
| Accept | Load after consent | analytics + behavioral; optional fingerprint if checked |
| Decline | Not loaded | No events |

## Rollback

Unset `ANALYTICS_COLLECT_URL` on VPS and restart app — site measurement falls back to Wave 4 GTM/Clarity only.
