# Wave 1 Server-Side Changes Required
## Items 1.3 (www redirect) + 1.4a/b (SPF/DMARC)
## These changes are made on the server/DNS, not in this repository.

---

## 1.3 — www → Apex 301 Redirect (Caddy)

**File:** `/opt/n8n/Caddyfile` (or wherever Caddy config lives on the production server)

**Current state:** `www.617east.com` serves the full site with HTTP 200. No redirect.

**Required change:** Add a redirect block for the www subdomain.

```caddy
# Add this block to Caddyfile
www.617east.com {
  redir https://617east.com{uri} permanent
}
```

**Acceptance test:**
```bash
curl -sI https://www.617east.com/ | grep -E "HTTP|location"
# Expected: HTTP/2 301
# Expected: location: https://617east.com/
```

**After redirect is live:** Update the Google Business Profile website field from
`www.617east.com` to `https://617east.com`.

---

## 1.4a — SPF Hardening (Ionos DNS)

**Current record:** `v=spf1 include:_spf-us.ionos.com ~all`
**Problem:** `~all` is a soft fail — spoofed emails may still reach inboxes.

**Required change at Ionos DNS panel:**
Update the TXT record for `617east.com` to:
```
v=spf1 include:_spf-us.ionos.com -all
```

**Recommended approach (Option A from audit):**
1. Confirm that all outbound email from 617east.com goes through Ionos SMTP only
   (verify `llegrandconsulting@gmail.com` is NOT sending as `@617east.com`)
2. Update TXT record to `-all`
3. Monitor DMARC reports for 14 days for any delivery failures
4. If no failures, keep `-all` permanently

**Acceptance test:**
```bash
dig TXT 617east.com | grep spf
# Expected: "v=spf1 include:_spf-us.ionos.com -all"
```

---

## 1.4b — DMARC Escalation (Ionos DNS)

**Current record:** `_dmarc.617east.com` → CNAME to `dmarc.ionos.com` → `v=DMARC1; p=none;`
**Problem:** `p=none` means no enforcement — spoofed emails are not quarantined or rejected.

**Required change at Ionos DNS panel:**
Replace the CNAME with a direct TXT record at `_dmarc.617east.com`:
```
v=DMARC1; p=quarantine; rua=mailto:info@617east.com; ruf=mailto:info@617east.com; fo=1;
```

**Recommended approach (Option A from audit):**
1. Set `p=quarantine` now — spoofed emails go to spam instead of inbox
2. Monitor DMARC aggregate reports (`rua`) for 30 days
3. After 30 days with no legitimate sender failures, escalate to `p=reject`

**Final target record:**
```
v=DMARC1; p=reject; rua=mailto:info@617east.com; ruf=mailto:info@617east.com; fo=1;
```

**Acceptance test:**
```bash
dig TXT _dmarc.617east.com
# Expected: "v=DMARC1; p=quarantine; ..."
```

---

## Summary Checklist

| Item | Location | Action | Status |
|---|---|---|---|
| 1.3 www redirect | Caddyfile on server | Add `redir` block | ⬜ Pending |
| 1.4a SPF `-all` | Ionos DNS TXT | Change `~all` → `-all` | ⬜ Pending |
| 1.4b DMARC quarantine | Ionos DNS TXT | Replace CNAME with `p=quarantine` | ⬜ Pending |
