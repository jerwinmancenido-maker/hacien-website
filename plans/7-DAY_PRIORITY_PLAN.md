# HACIEN Website — 7-Day Priority Plan

> **Status:** Superseded historical plan. Not current authority, runtime proof,
> deployment proof, or production status.
> **Superseded by:** `AGENTS.md`,
> `plans/hacien-website-masterplan-index.md`, and the P1.3 contract at
> `/Users/m5/Projects/hacien-staging/operations/knowledge/website-source-data-promotion-contract.md`.
> **Preservation rule:** The checklist below remains historical context only.

> **Historical status recorded by the original plan:** Production — live at https://haciensolutions.com
> **Cloudflare + Hostinger Node.js** | **Next.js 16.2.9 (Turbopack)**
> **Branch:** `hardening/standalone-output` exists but not merged to main

---

## 1. Production QA Checklist

### Immediate (Day 1)
| # | Check | How | Expected |
|---|-------|-----|----------|
| 1.1 | Homepage loads | Visit `/` | 200, no layout shift |
| 1.2 | All static pages render | Visit `/about`, `/contact`, `/products`, `/solutions`, `/quote`, `/government-procurement`, `/erp-platform`, `/insights`, `/privacy`, `/terms` | 200 each, no 404/503 |
| 1.3 | Product category pages | Visit `/products/computers-laptops`, `/products/network-equipment`, etc. (9 total) | 200 each |
| 1.4 | Product detail pages | Visit `/product/business-laptop-i5-16gb`, etc. (9 total) | 200 each |
| 1.5 | Solution detail pages | Visit `/solutions/it-infrastructure`, etc. (12 total) | 200 each |
| 1.6 | Government topic pages | Visit `/government-procurement/specification-review`, etc. (6 total) | 200 each |
| 1.7 | Insight pages | Visit `/insights/it-procurement-guide`, etc. (7 total) | 200 each |
| 1.8 | Custom 404 | Visit `/nonexistent-page` | Branded 404 page, not Next.js default |
| 1.9 | Custom error boundary | Force an error (or trust the `error.tsx` presence) | Branded error page |
| 1.10 | SSL valid | Check lock icon in browser | Valid, no mixed content |
| 1.11 | `robots.txt` | Visit `/robots.txt` | Returns rules + sitemap URL |
| 1.12 | `sitemap.xml` | Visit `/sitemap.xml` | Returns all 61 routes |
| 1.13 | Mobile rendering | Chrome DevTools mobile view | No horizontal scroll, forms usable |
| 1.14 | Load time | Lighthouse or PageSpeed | FCP < 2s, LCP < 3s (static site should be fast) |

### Secondary (Day 2-3)
| 1.15 | Structured data | Google Rich Results Test | Valid Organization schema |
| 1.16 | Open Graph | Facebook Sharing Debugger | Correct image/title/description |
| 1.17 | CSP headers | Browser DevTools → Network → response headers | CSP present, no console violations |
| 1.18 | HSTS header | Only if `HSTS_ENABLE=true` env var is set | Header present |

---

## 2. RFQ Email and Form Verification

### CRITICAL — This is the #1 revenue risk

**Current state:**
- [`send-inquiry.ts`](app/actions/send-inquiry.ts) has SMTP-first, sendmail-fallback logic
- 3 forms call it: [`ContactForm`](components/ContactForm.tsx), [`QuoteRequestForm`](components/QuoteRequestForm.tsx), [`QuoteCart`](components/QuoteCart.tsx)
- All have honeypot spam protection
- Rate limiting: 5 submissions/minute/IP (in-memory)

### Verification steps:
| # | Action | Priority |
|---|--------|----------|
| 2.1 | **Confirm SMTP env vars are set in Hostinger dashboard** (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `SALES_TO_EMAIL`). Without these, the code falls back to sendmail at `/usr/sbin/sendmail` — which may not exist on Hostinger. | **URGENT** |
| 2.2 | **Submit a test inquiry through [`ContactForm`](components/ContactForm.tsx)** — verify email arrives at `sales@haciensolutions.com` | **URGENT** |
| 2.3 | **Submit a test RFQ through [`QuoteRequestForm`](components/QuoteRequestForm.tsx)** — verify email arrives | **URGENT** |
| 2.4 | **Submit a test quote through [`QuoteCart`](components/QuoteCart.tsx)** — verify email arrives with cart items | **URGENT** |
| 2.5 | Check Hostinger Node.js logs for `RFQ:` prefixed log entries | Day 1 |
| 2.6 | Verify rate limiting works — submit 6 times in 1 minute, expect rejection on 6th | Day 2 |
| 2.7 | Verify honeypot works — submit with `_website` field filled (use DevTools) | Day 2 |
| 2.8 | Test mobile form submission | Day 2 |

**If SMTP is not configured:** The forms will fall back to sendmail. The hardcoded path `/usr/sbin/sendmail` is a Linux convention. If Hostinger's shared hosting lacks it, the forms will fail silently — the user sees a "success" message but no email is sent. **This is the single biggest production risk right now.**

---

## 3. Cloudflare Settings to Enable Safely

**Already active:** SSL, DNS proxying (orange cloud).

### Enable now (Day 1-2):
| # | Setting | Location | Why |
|---|---------|----------|-----|
| 3.1 | **Always Use HTTPS** | SSL/TLS → Edge Certificates | Redirect HTTP → HTTPS |
| 3.2 | **Automatic HTTPS Rewrites** | SSL/TLS → Edge Certificates | Fix mixed content |
| 3.3 | **Brotli compression** | Speed → Optimization | Smaller assets, faster loads |
| 3.4 | **Early Hints** | Speed → Optimization | Faster page loads |
| 3.5 | **Crawler Hints** | Caching → Configuration | Better SEO indexing |

### Enable with caution (Day 3-4):
| 3.6 | **Full (strict) SSL mode** | SSL/TLS → Overview | Requires valid origin cert. Test first. |
| 3.7 | **Cache rules for static assets** | Caching → Cache Rules | Cache `.js`, `.css`, images longer (e.g., 30 days) |
| 3.8 | **Bot Fight Mode** | Security → Bots | Reduces spam form submissions |

### Do NOT enable yet:
- **Rocket Loader** — breaks Next.js client-side hydration
- **Mirage** — can break responsive images
- **Auto Minify (JS/CSS/HTML)** — Next.js already does this at build time; double-minification can break things
- **Railgun** — overkill for a static site

---

## 4. Whether/When to Merge `hardening/standalone-output`

**Branch:** `hardening/standalone-output`  
**Changes:** `output: "standalone"` added to [`next.config.ts`](next.config.ts:4)  
**Build verified:** 61/61 routes, 0 errors, nodemailer inlined, `.next/standalone/` output confirmed

### Recommendation: **Merge AFTER confirming Hostinger's deployment model**

**If Hostinger uses `next start`:**
- Merge now. `output: "standalone"` is backward-compatible with `next start` — it adds the `.next/standalone/` directory but doesn't change how `next start` works. Zero risk.

**If Hostinger uses a custom deployment (e.g., `node server.js`):**
- Merge now. The standalone output is exactly what they need. The `server.js` entry point at `.next/standalone/server.js` is the correct production entry point.

**If Hostinger requires the full `node_modules`:**
- Merge now. The standalone output coexists with the existing build output. It doesn't remove anything.

**Verdict:** Merge to `main` **Day 1**. It's a no-risk, additive change. The standalone output is a safety net — if Hostinger ever changes their pipeline, the deployment won't break. The `server.js` is 6.8KB and self-contained.

**Merge steps:**
1. Create PR from `hardening/standalone-output` → `main`
2. Merge (no review needed for 1-line change)
3. Redeploy to Hostinger
4. Verify the site still works
5. Confirm `.next/standalone/server.js` exists in the deployed environment

---

## 5. SEO / Search Console Setup

**Current state:**
- [`robots.ts`](app/robots.ts) ✅ — allows all, references sitemap
- [`sitemap.ts`](app/sitemap.ts) ✅ — 61 routes, proper priorities
- [`layout.tsx`](app/layout.tsx) ✅ — metadata, Open Graph, Twitter cards, Organization structured data
- No Google Search Console, no analytics

### Day 1-2:
| # | Action |
|---|--------|
| 5.1 | **Create Google Search Console property** for `haciensolutions.com` (domain property, verify via Cloudflare DNS TXT record) |
| 5.2 | **Submit sitemap** (`https://haciensolutions.com/sitemap.xml`) in Search Console |
| 5.3 | **Request indexing** for homepage |
| 5.4 | **Check Coverage report** — identify any crawl errors |

### Day 3-4:
| 5.5 | **Google Business Profile** — create/claim "HACIEN Information Technology Solutions" with the Ortigas address from [`layout.tsx:60`](app/layout.tsx:60) |
| 5.6 | **Bing Webmaster Tools** — import from Search Console (free, quick) |

---

## 6. Analytics / Clarity Setup

### Recommendation: **Microsoft Clarity + Google Analytics 4 (both free)**

| # | Tool | Why | How |
|---|------|-----|-----|
| 6.1 | **Microsoft Clarity** | Heatmaps, session recordings, rage clicks, dead clicks. Free. No sampling. Best for understanding form abandonment. | Add script to [`layout.tsx`](app/layout.tsx) `<head>` via `<Script>` |
| 6.2 | **Google Analytics 4** | Traffic sources, page views, conversions. Standard. | Add via `@next/third-parties/google` or `<Script>` |

**Priority:** Clarity first (Day 2-3). GA4 second (Day 4-5). Clarity gives you immediate insight into how real users interact with forms — invaluable for the RFQ verification.

**Implementation note:** Use Next.js `<Script strategy="afterInteractive">` in [`layout.tsx`](app/layout.tsx). Do NOT add to CSP yet — the CSP at [`next.config.ts:11`](next.config.ts:11) has `script-src 'self' 'unsafe-inline'` which already allows inline scripts. Clarity and GA4 will work without CSP changes.

**CSP hardening (later):** When you have the exact script hashes, add `'sha256-...'` entries to `script-src` and remove `'unsafe-inline'`. Not urgent.

---

## 7. Website Content Gaps

### What's missing (ranked by impact):

| # | Gap | Impact | Effort |
|---|-----|--------|--------|
| 7.1 | **Only 9 products across 9 categories** — several categories have 1 product. The catalog feels thin. | High — undermines credibility for procurement buyers | Medium — add 1-2 products per category in [`data/products.ts`](data/products.ts) |
| 7.2 | **No case studies or project portfolio** — no social proof. The "0 Fake Certifications" metric is clever but signals emptiness. | High — buying decisions need evidence | High — needs real project details |
| 7.3 | **No team/about detail** beyond the company profile page. No photos, no team bios. | Medium — procurement buyers want to know who they're dealing with | Low — add team section to about page |
| 7.4 | **No FAQ page** — common questions about procurement process, payment terms, delivery timelines | Medium — reduces support burden | Low — static page |
| 7.5 | **No logo file** — the Header uses a CSS square with "H" text. The Open Graph image is auto-generated. | Medium — brand perception | Low — needs a designer |
| 7.6 | **Blog/insights has 7 posts** — but no publishing date, no author, no categories. Feels like placeholder content. | Low — nice to have | Low — add metadata to [`data/insights.ts`](data/insights.ts) |

### Content expansion priority (Day 3-7):
1. **Add 3-5 more products** — focus on network equipment, licensed software, security/surveillance (currently 1 product each). Target: 15-20 products total.
2. **Add FAQ page** — at least 10 questions covering procurement process, payment, delivery, warranty.
3. **Add team section** to `/about/company-profile` — even 3-4 placeholder bios with roles.

---

## 8. Lead Capture Improvements

**Current state:** Forms work (pending SMTP verification). Honeypot spam protection. Rate limiting. No lead storage beyond email.

### Immediate (no code changes needed):
| # | Action |
|---|--------|
| 8.1 | **Create a `sales@haciensolutions.com` filter/folder** — all RFQ emails should auto-label and skip inbox clutter |
| 8.2 | **Set up email auto-responder** — "Thank you for your inquiry. HACIEN will respond within 1-2 business days." |
| 8.3 | **Track form submissions manually** — until analytics are set up, check Hostinger logs for `RFQ: Submission received.` entries |

### Short-term (code changes, Day 5-7):
| 8.4 | **Add CC/BCC to RFQ emails** — send a copy to a second email (e.g., founder's personal email) as backup |
| 8.5 | **Add a `/api/health` endpoint** — returns `{ status: "ok", smtpConfigured: boolean }` for monitoring |
| 8.6 | **Add form analytics events** — track form_start, form_submit, form_error in Clarity/GA4 |

### Do NOT build yet:
- CRM integration (HubSpot, etc.) — overkill for current volume
- Database-backed lead storage — the email pipeline is sufficient
- Live chat widget — adds complexity, unclear ROI for B2B procurement

---

## 9. Security Hardening Still Needed

### Already done:
| Item | Status |
|------|--------|
| CSP headers | ✅ [`next.config.ts:10-21`](next.config.ts:10) |
| X-Content-Type-Options | ✅ |
| X-Frame-Options: DENY | ✅ |
| Referrer-Policy | ✅ |
| Permissions-Policy | ✅ |
| HSTS (conditional on `HSTS_ENABLE`) | ✅ |
| Honeypot spam protection | ✅ forms |
| Rate limiting | ✅ 5/min/IP |
| `.env` in `.gitignore` | ✅ |

### Still needed:
| # | Item | Priority | Why |
|---|------|----------|-----|
| 9.1 | **Enable HSTS in production** — set `HSTS_ENABLE=true` in Hostinger env vars. Currently conditional. | **HIGH** | Without HSTS, users can be downgraded to HTTP (MITM risk). Cloudflare's "Always Use HTTPS" helps but HSTS is stronger. |
| 9.2 | **Remove `'unsafe-inline'` from CSP** — requires generating script hashes for Clarity/GA4. | Medium | Currently allows any inline script. `'unsafe-inline'` weakens CSP significantly. |
| 9.3 | **Add `connect-src` for analytics** — when Clarity/GA4 are added, `connect-src` needs `https://*.clarity.ms https://*.google-analytics.com` | Medium | Blocks analytics data from sending |
| 9.4 | **Add `img-src` for analytics** — Clarity loads a tracking pixel | Low | Needed for Clarity |
| 9.5 | **Rate limiting is in-memory only** — resets on server restart. If Hostinger restarts the Node process, rate limits are lost. | Low | Acceptable for current traffic. Upgrade to Redis/DB only if abuse occurs. |
| 9.6 | **No CSRF protection on server actions** — Next.js server actions have built-in CSRF protection via the `x-action-id` header. Confirm this is working. | Low | Next.js handles this automatically. |

### CSP update needed when analytics are added (Day 3-4):
```diff
- "script-src 'self' 'unsafe-inline'",
+ "script-src 'self' 'unsafe-inline' https://www.clarity.ms https://www.googletagmanager.com",
- "connect-src 'self'",
+ "connect-src 'self' https://*.clarity.ms https://*.google-analytics.com https://*.analytics.google.com",
- "img-src 'self' data: https:",
+ "img-src 'self' data: https: https://*.clarity.ms",
```

---

## 10. What NOT to Touch for Now

These are deliberately excluded from the 7-day plan. They are not broken — they are just not yet optimized.

| # | Item | Why NOT now |
|---|------|-------------|
| 10.1 | **Redesign/rebuild** | The site is live, working, and has good architecture. A redesign would waste credit and introduce risk. The ARCHITECTURE_REVIEW.md already has a phased roadmap — stick to Phase 0-1 (stability) before Phase 2+ (design). |
| 10.2 | **Database/CMS integration** | Static TS data is the correct approach for the current scale. Adding a database adds hosting cost, maintenance burden, and attack surface. Revisit when the catalog exceeds 50 products. |
| 10.3 | **ERP integration** | The ERP API isn't ready. Building against an unstable API wastes credit. Wait until the ERP has a stable v1 endpoint. |
| 10.4 | **Product images** | Images improve the catalog but require sourcing/creation. Add them only when you have real product photos — don't use stock photos. |
| 10.5 | **Blog platform** | Static insight pages are fine. Don't add a CMS just for blogging. |
| 10.6 | **Dark mode** | Not needed for an IT procurement site. The `color-scheme: light` in [`globals.css:4`](app/globals.css:4) is correct. |
| 10.7 | **Animation overhaul** | CSS-only animations are already implemented and respect `prefers-reduced-motion`. No Framer Motion needed. |
| 10.8 | **Multi-language** | English-only is correct for Philippine B2B procurement. |
| 10.9 | **PWA/offline support** | The site is content-heavy, not app-like. PWA adds complexity with no clear benefit. |
| 10.10 | **`/product/[slug]` URL structure** | The current singular `/product/` (not `/products/`) is intentional for individual product pages vs. the `/products/` listing. Don't change it — it's already built and indexed. |

---

## Summary: 7-Day Execution Order

```
DAY 1 ▸ RFQ verification (SMTP env vars, test all 3 forms)
      ▸ Prod QA (all 61 routes, 404 page, SSL, robots.txt, sitemap.xml)
      ▸ Merge hardening/standalone-output → main
      ▸ Enable HSTS (set HSTS_ENABLE=true)

DAY 2 ▸ Google Search Console setup + sitemap submission
      ▸ Cloudflare: Always HTTPS, Brotli, Early Hints, Crawler Hints
      ▸ Form spam/rate-limit testing
      ▸ Create sales@ email filter + auto-responder

DAY 3 ▸ Microsoft Clarity setup (heatmaps, recordings)
      ▸ CSP update for Clarity
      ▸ Google Business Profile
      ▸ Content: add 3-5 products to thin categories

DAY 4 ▸ Google Analytics 4 setup
      ▸ CSP update for GA4
      ▸ Cloudflare: Full (strict) SSL, cache rules, Bot Fight Mode
      ▸ Content: FAQ page

DAY 5 ▸ Content: team section on about page
      ▸ `/api/health` endpoint
      ▸ Form analytics events in Clarity
      ▸ Bing Webmaster Tools

DAY 6 ▸ Review Clarity recordings — identify form friction
      ▸ Review Search Console — fix any crawl errors
      ▸ Content: add blog metadata (dates, authors)

DAY 7 ▸ Buffer day for any issues found
      ▸ Review analytics data
      ▸ Plan next sprint based on real data
```

### Single most important action:
**Verify SMTP env vars are configured and all 3 forms deliver email.** Everything else is secondary. A beautiful website that doesn't capture leads is a brochure, not a business tool.
