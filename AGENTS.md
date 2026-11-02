# HACIEN Website — Agent Instructions

Canonical public website for **HACIEN** (not PepStack Labs or other businesses).
Hostinger Node.js target: **Node 20** (engines `>=20.9.0`; Hostinger-matched **20.20.2** / npm 10).
Prisma **7.10.1** (MySQL/MariaDB via `@prisma/adapter-mariadb`). Next.js **16.4.3**.
`.npmrc` keeps `legacy-peer-deps=true` — do not change it.
`npm run build` is `next build --webpack` (webpack chosen for Hostinger Turbopack/PostCSS stability on Node 20).
`prebuild` clears `.next`, runs `npm run validate`, then `prisma generate`. `postinstall` also runs `prisma generate`.

## Workflow

Cursor cloud agents: branch from `main`, implement, open a PR to `main`.
**Never** merge, deploy, publish, run migrations against any real database, or change env vars, secrets, DNS, hosting, or `.npmrc`.
CTO (separate reviewer) reviews and merges — **only with the owner's yes**.
- Don't poll CI, Bugbot or security checks, and don't post interim 'still waiting' or 'already reported' notes. Report once, when checks have settled or when a real finding needs fixing.

## Checks (before every push)

Use Node 20. Paste real command output in the PR body.

| Command | `package.json` | Notes |
|---|---|---|
| `npm ci` | lockfile install | Respects `.npmrc` (`legacy-peer-deps=true`) |
| `npm run lint` | `eslint` | |
| `npx tsc --noEmit` | TypeScript (devDep) | Not a named script; run via `npx` |
| `npm test` | `vitest run` | |
| `npm run build` | `next build --webpack` | Runs `prebuild` → `validate` + `prisma generate` |

`prisma generate` (postinstall / prebuild) does **not** need `DATABASE_URL` under Prisma 7.
If a local tool still asks for one, use only a dummy local value such as
`mysql://user:password@127.0.0.1:3306/hacien_website` — **never** a real database URL.
Do not run `db:migrate`, `db:deploy`, `db:seed`, or other DB write scripts against real data.

## UI changes

Attach before/after screenshots at **390px** and **1280px** for affected routes.

## Brand

Black and white with one blue accent. Clean bold sans-serif; no boxy clutter; AA contrast.
White text on blue buttons.

| Token | Hex |
|---|---|
| Ink | `#0A0A0A` |
| White | `#FFFFFF` |
| Greys | `#F5F5F5` `#E5E5E5` `#A3A3A3` `#525252` `#404040` |
| Blue (CTA / links / focus only) | `#2563EB` |
| Blue hover | `#1D4ED8` |

Canonical tokens: `lib/brand-colors.ts`, `app/globals.css`.

## Content & secrets

- No new company facts, claims, prices, or legal text unless the brief gives the **exact** words.
- No customer data, secrets, keys, or tokens in code, logs, or PRs. Fake data only.
- Do not invent SLA, stock, government credentials, payment readiness, or certification claims.

## Diff discipline

- No new dependencies (paid or free) unless the brief says so.
- Smallest diff that works; no new abstractions.
- Keep HACIEN separate from PepStack Labs and other businesses in copy, branding, and config.

## Review lessons

- Fail closed: a missing secret, setting, or config value refuses/blocks — never fall back to a permissive default.
- Client IP: use the shared `getClientIp` (`cf-connecting-ip`, `x-real-ip`, then rightmost X-Forwarded-For hop); never trust the leftmost XFF.
- No in-process `Map` for security state (grants, passes); use signed stateless tokens or the existing helpers.
- Map unknown external/status values to a safe allowlisted fallback.
- Every request path that reads data counts against the rate limit, including cookie/grant-backed ones.
- Tests import the real module, never a copied version of the logic.
- Resolve real Bugbot findings before handing off.
- Never edit `middleware`, `next.config`, or CSP without saying so in the PR summary.

## Repo map

| Path | Role |
|---|---|
| `app/` | Next.js App Router: pages (`page.tsx`), layouts, `api/`, `globals.css` |
| `app/components/` | Route-local UI (rare); prefer top-level `components/` |
| `components/` | Shared UI (Header, Footer, Hero, product/quote/checkout, motion) |
| `data/` | Static site data (`products.ts`, `solutions.ts`, `insights.ts`, `companyContact.ts`) |
| `scripts/` | Validate, crawl, seed, smoke, CMS helpers (`validate-data.ts`, …) |
| `lib/` | Brand, db, auth, CMS, ecommerce, email, ERP, security, SEO |
| `prisma/` | Schema + migrations (website-local MySQL only; not ERP) |
| `tests/` | Vitest suites |
| `public/` | Static assets |
| `shared/` | Shared AI/product knowledge (read before inventing product facts) |
| `plans/` | Planning / conformance docs (reference, not runtime truth) |
| `config/`, `cron/`, `tools/`, `cms-drafts/`, `remotion/` | Config, jobs, tooling, drafts, motion demos |

Official catalog/order/customer truth lives in ERP — do not treat website Prisma models or seeded data as official.
