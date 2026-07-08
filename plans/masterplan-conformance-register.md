# HACIEN Masterplan Conformance Register

Last updated: 2026-07-08
Repository: `/Users/jerwinmancenido/hacien-website`
Branch: `main`
Verified base before this register update: `26f0ef4` (`polish: compress mobile page density`)

## Source Freeze

| Source | Path | Role |
|---|---|---|
| Repo-local masterplan index | `/Users/jerwinmancenido/hacien-website/plans/hacien-website-masterplan-index.md` | Current entry point and conflict-precedence rule |
| Main Antigravity website blueprint | `/Users/jerwinmancenido/.gemini/antigravity-ide/brain/ff46cf60-2182-49b7-8d63-2423ffa4f544/website_execution_plan_audit.md` | Strategic HACIEN Website master plan |
| Executive guide | `/Users/jerwinmancenido/.gemini/antigravity-ide/brain/ff46cf60-2182-49b7-8d63-2423ffa4f544/HACIEN_MASTER_PLAN_EXECUTIVE_DOCUMENTATION.md` | Roadmap and executive summary |
| Motion plan | `/Users/jerwinmancenido/.gemini/antigravity-ide/brain/ff46cf60-2182-49b7-8d63-2423ffa4f544/HACIEN_CINEMATIC_VIDEO_PLAN.md` | Supporting cinematic plan, superseded where Founder design correction applies |
| Master task inventory | `/Users/jerwinmancenido/.gemini/antigravity-ide/brain/ff46cf60-2182-49b7-8d63-2423ffa4f544/task.md` | Historical task checklist; stale where it conflicts with this register |
| Sprint 2 Phase 3 implementation plan | `/Users/jerwinmancenido/.gemini/antigravity-ide/brain/ff46cf60-2182-49b7-8d63-2423ffa4f544/implementation_plan.md` | Phase 3 implementation detail |
| Team operating system | `/Users/jerwinmancenido/.agents/skills/team-operating-system/SKILL.md` | Execution and reporting workflow |

## Status Legend

| Status | Meaning |
|---|---|
| Complete | Implemented and supported by build/test/screenshot or code evidence |
| Partial | Implemented partially, but not literal to the masterplan or missing operational proof |
| Missing | Not implemented |
| Blocked | Requires Founder, legal, tax, supplier, payment, deployment, migration, or production evidence before implementation |
| Approved Deviation | Explicitly approved departure from masterplan wording |
| Stale Plan Record | Historical plan text that no longer matches Founder decisions, live evidence, or repo execution truth |

## Phase Tracker

| Phase | Status | Evidence | Notes |
|---|---|---|---|
| Phase 0 - Workplace Preparation | Green / Complete | Master task inventory marks complete | No action in this register |
| Phase 1 - Foundation & Build Verification | Green / Complete | Master task inventory marks complete | Current build also passes |
| Phase 2 - Intake Readiness | Green / Complete | PR #2 deployed; live RFQ path returned `RFQ-2026-000001`; `/track/RFQ-2026-000001` returns 200; route hygiene deployed through `a510cee` | Gateway, Turnstile, website Gateway URL, Gateway tables, timeline tables, `/track`, canonical product sitemap URLs, Help Center, FAQ, and footer discoverability are production-verified |
| Phase 3 - Visual Recovery, Remotion, WebGL | Green / Complete / Founder Accepted | Visual recovery completed through `6087b29`; brand/glass motion restored through `6087b29`; route hygiene deployed through `a510cee`; mobile density polish deployed through `26f0ef4`; local smoke evidence in `/tmp/hacien-26f0ef4-local-visual-smoke-20260708`; Founder accepted Phase 3 on 2026-07-08 | Phase 3 is closed unless new production defects are found |
| Phase 4 - CMS Flexibility | Yellow / Ready for Planning | Founder accepted Phase 3 on 2026-07-08 | Start with CMS architecture/scope review before implementation; do not begin broad admin/CMS build without a Phase 4 plan |
| Phase 5 - Portal/Admin/AI Concierge | Blue / Pending | Master task inventory | Contains legal/tax/payment-risk items requiring gates |
| Phase 6 - Quote PDF, Payments & Logistics | Blue / Pending | Master task inventory | Contains payment/logistics/tax commitments requiring gates |
| Phase 7 - Supplier Integration | Blue / Pending | Master task inventory | Supplier/API credentials and evidence required |
| Phase 8 - Final Verification & Hand-off | Blue / Pending | Master task inventory | Requires deploy/ops approval |


## Sprint 2 Phase 3 Masterplan Variance Register

| Requirement | Status | Evidence | Blocker / Next Action |
|---|---|---|---|
| Remotion Cinematic Video Compositions: `HeroReel`, `ExplodedHardware`, `AiScannerDemo`, `LogisticsMap`, `PortalAssetDashboard` | Partial | `remotion/Root.tsx`, `remotion/compositions/*.tsx`; commit `b032403`, reconciled by `80959fb` | Files exist, but the public website does not yet deliver the intended cinematic moving-background/text experience |
| Hyperframes orchestration | Approved Deviation | Founder Gate: Remotion-only orchestration is accepted for Phase 3; `CinematicSequence` composes the five scenes | Do not add Hyperframes in Phase 3 unless a later explicit decision reverses this gate |
| Whole-Website Cinematic UX: Lenis, ambient lighting, App Router dissolve | Complete | `components/motion/LenisProvider.tsx`, `app/layout.tsx`, `app/template.tsx`, `components/motion/PageTransition.tsx`, `app/globals.css`; commits `b032403`, `80959fb` | None for local implementation |
| PepStack motion standards: `clinicalOut`, `premiumInOut`, `OVERLAP_FRAMES = 18` | Complete | `lib/motion/timing.ts`, `app/globals.css`, `remotion/compositions/CinematicSequence.tsx`; commit `80959fb` | None |
| Scroll-bound 3D WebGL assembly | Stale Plan Record / Not Accepted Public Direction | `components/visual/ScrollServerAssembly.tsx`, `components/visual/ScrollServerAssemblyWrapper.tsx`; commits `34382d7`, `80959fb` | Founder correction: public cinematic direction should not be cheap product/server renders. Remove, archive, or de-emphasize in Phase 3 recovery |
| Dynamic CMS video text overlays from JSON catalog/config | Deferred to Phase 4 | Founder Gate: JSON config satisfies Phase 3 proof; CMS-managed overlays move to Phase 4 | Carry into Phase 4 zero-hardcoding/CMS refactor |
| Quote Expiry Auto-Ping daily cron | Partial | `cron/quote-expiry-monitor.ts`, `package.json` script `cron:quote-expiry`; commit `6a8cc89` | Production PM2/VPS scheduling, Resend/SMS runtime proof, and customer notification approval remain blocked |
| AI Document Parser component | Complete | `app/actions/parse-document.ts`, `components/AiDocumentParser.tsx`; commit `c763d0c` | No production document processing claim implied |
| Dynamic Help Center and FAQ from JSON | Complete | `app/help/page.tsx`, `app/faq/page.tsx`, `components/FaqSearch.tsx`, `config/faq-data.json`; commit `c763d0c` | None for local implementation |
| Dual Inventory Availability Badging with literal stock/SLA claims | Blocked | Masterplan wording requires `In Stock - Manila Hub` and `Direct Distributor Channel`; current ProductDetail uses evidence-safe review language | Requires supplier inventory evidence, stock data source, SLA approval, and business decision before public literal claims |
| 15-Day Quote Validity Badge / price guarantee countdown | Blocked | Current `config/billing-compliance-settings.json` says formal quote validity is set by document; commit `7d894f3` | Terms say website does not set default validity. Requires explicit Founder/legal/commercial approval before literal implementation |
| Price Match Guarantee Badge | Blocked | No safe public guarantee implemented | Requires written price-match policy, exclusions, approval path, and supplier margin evidence |
| 3D Interactive Server Chassis | Stale Plan Record / Not Accepted Public Direction | `components/visual/InteractiveServerChassis.tsx`, wrapper; commits `b032403`, `7c2dbfb`, `34382d7` | Founder correction rejects cheap render-heavy product/server direction as the public cinematic identity |
| Interactive WebGL Philippines Delivery Globe | Partial / De-emphasized | `components/visual/DeliveryGlobe.tsx`, wrapper; commit `b032403` | It is illustrative only. Do not use as proof of delivery/logistics readiness or as dominant public design |
| Glassmorphic Skeleton Suspense | Complete | `components/visual/GlassmorphicSkeleton.tsx`, dynamic wrappers with `ssr: false`; commit `b032403` | None |
| Multi-Viewport Visual Screenshot Verification | Complete | Prior local evidence: `/tmp/hacien-20260707-final-phase3-reviewed/manifest.json`; honest live audit: `/tmp/hacien-phase3-honest-audit-20260708/manifest.json`; mobile density smoke: `/tmp/hacien-26f0ef4-local-visual-smoke-20260708/manifest.json`; Founder accepted Phase 3 on 2026-07-08 | Reopen only if a new production visual defect is found |
| Required checks: `npm run validate`, `npm test`, `npm run build` | Complete | `npm run validate` passed; `npm run build` passed; `npx vitest run` passed | `npm test` equivalent in this repo is `npx vitest run`; no `test` script is defined in `package.json` |

## Founder Gate Decisions

| Decision | Result | Implementation Rule |
|---|---|---|
| Remotion-only orchestration for Phase 3 | Approved Deviation | Do not require Hyperframes for Phase 3 closure |
| CMS-managed video overlays | Deferred to Phase 4 | Keep Phase 3 JSON-driven overlays; build admin/CMS-managed overlays during Phase 4 if still required |
| Stock/SLA badges | Blocked | Do not publish literal stock, hub, 24-48 hr, distributor-channel, or delivery SLA claims without supplier evidence and approval |
| 15-day quote guarantee | Blocked | Do not publish default validity or price guarantee claims while Terms state validity is set by the formal document |
| Price match guarantee | Blocked | Do not publish price-match triggers without written policy, exclusions, and margin guardrails |
| Tax/payment/receipt claims | Blocked | Do not publish payment collection, official invoice, official receipt, BIR/tax readiness, or cashier approval claims without approved evidence |
| Phase 3 closure | Complete / Founder Accepted | Visual recovery, route hygiene, live RFQ, tracking, and mobile density work are implemented and pushed through `26f0ef4`; Founder accepted Phase 3 on 2026-07-08 | Phase 4 may now enter planning |

## Design Direction Override

| Decision | Result | Implementation Rule |
|---|---|---|
| Public website visual identity | Founder direction update on 2026-07-07 | The main website experience should emphasize premium website design and real-world sourced photography, not product/computer/server fantasy renders |
| Remotion/WebGL public prominence | De-emphasized after Phase 3 closure | Remotion and WebGL remain local implementation proof from Phase 3, but should not dominate the public website identity unless explicitly re-approved |
| Internet photography | Allowed with source review | Use licensing-safe real-world business, infrastructure, office, procurement, operations, or technology environment photography; avoid unsupported product, stock, delivery, payment, tax, or warranty claims |
| Cinematic website direction | Founder correction on 2026-07-08 | Cinematic means premium moving backgrounds, text motion, scroll rhythm, ambient/parallax layers, and curated photography. It does not mean cheap 3D product/server renders |

## Website Creation Quality Guidelines

These are internal build standards for HACIEN website work. They are not public certification, compliance, accreditation, legal, security, privacy, tax, or audit claims. The team follows strong engineering and design best practices silently, then proves quality through screenshots, builds, tests, and claim-safety review.

| Guideline | Required Practice | Evidence Gate |
|---|---|---|
| Source-of-truth alignment | Public copy must follow the masterplan, Terms, Trust Center, and evidence-gated posture | Search scoped copy for risky claims before commit |
| Responsive layout quality | Desktop, tablet, and mobile layouts must be visually checked for first-viewport usefulness, text fit, overlap, and horizontal overflow | Local and live Playwright/browser screenshots across affected routes |
| Typography and information density | Avoid oversized text blocks and over-tall sections. Mobile first viewports must show practical context, actions, or service cards, not only a headline. Desktop hero titles should stay compact unless explicitly approved. | Viewport-height check, local-vs-live screenshot comparison, and scroll-height review |
| Accessibility-minded UI | Use semantic links/buttons, readable contrast, stable focus treatment, and mobile-friendly tap targets where practical | Focused review plus lint/build; do not claim formal accessibility certification |
| Security-conscious delivery | Maintain conservative headers, Content Security Policies, and only allow remote asset domains that are actually needed | Header diff review and production build |
| Asset traceability | External photos must have reviewed source/license context and avoid unnecessary recognizable people, logos, or unsupported product implications | Source URL recorded in code comments or sprint report |
| Performance discipline | Avoid making video/WebGL/rendered objects the default public identity unless explicitly approved; prefer lighter photography and static design where appropriate | Screenshot review plus console check for relevant runtime warnings |
| Claim safety | Do not add stock, SLA, payment, tax, warranty, delivery, invoice, receipt, price-match, or production-readiness claims without explicit evidence/approval | Blocked-claim search and Founder Gate register |
| Live-vs-local visual QA | For design work, compare the local build against the current live website before committing. If local shows less useful information per screen than live, treat that as a design regression unless intentionally approved. | Screenshot manifest and comparison notes |

## Screenshot Evidence

Final production-preview screenshots were captured from `http://localhost:3055`.

| Viewport | Routes | Evidence |
|---|---|---|
| Desktop | `/`, `/about`, `/solutions/it-infrastructure`, `/faq`, `/help`, `/quote`, `/product/business-laptop-i5-16gb` | `/tmp/hacien-20260707-final-phase3-reviewed/desktop-*.png` |
| Tablet | Same 7 routes | `/tmp/hacien-20260707-final-phase3-reviewed/tablet-*.png` |
| Mobile | Same 7 routes | `/tmp/hacien-20260707-final-phase3-reviewed/mobile-*.png` |
| Manifest | 21 captures, 0 HTTP failures, 0 console/page errors, 0 horizontal-overflow findings, 0 blocked-claim hits | `/tmp/hacien-20260707-final-phase3-reviewed/manifest.json` |

Note: `http://localhost:3037` returned page HTML with status `200`, but previously produced stale static asset MIME/500 console errors during capture. Final evidence uses a clean temporary production preview on port `3055`.

## Production Website Evidence After PR #2

| Evidence | Result | Notes |
|---|---|---|
| PR #2 deployment | Complete | Public website hardening branch merged and deployed from `main` |
| Public government credential cleanup | Complete | Live pages scanned without public DTI/BIR/Mayor/PhilGEPS/government-procurement matches |
| `/government-procurement` | 404 | Public route is no longer discoverable as a live page |
| RFQ submission | Complete | Live `/quote` submitted successfully with reference `RFQ-2026-000001` |
| RFQ tracking | Complete | `/track/RFQ-2026-000001` returns 200 |
| Route hygiene | Complete | Commit `a510cee` deployed; `/track` is live; footer exposes Track Request, Help Center, B2B FAQ, and Industries |
| Mobile density polish | Complete / Founder Accepted | Commit `26f0ef4` pushed to `origin/main`; mobile smoke showed `/` height `7836 -> 5934`, `/about` `6332 -> 5466`, `/products` `7611 -> 5419`, with no horizontal overflow; Founder accepted Phase 3 on 2026-07-08 |

## Phase 3 Design Recovery Findings

| Finding | Severity | Evidence | Required Correction |
|---|---|---|---|
| Public cinematic effect was not visible enough on core routes | Accepted | Visual recovery and glass motion work through `6087b29`; live/local screenshot reviews followed; Founder accepted Phase 3 on 2026-07-08 | Reopen only if Founder requests a new visual direction pass |
| Render-heavy server/globe direction is not accepted | Complete / Guardrail Active | Public direction shifted toward photography, glass motion, and text rhythm | Do not restore cheap product/server render direction |
| Mobile pages were too long and low-density | Accepted | Commit `26f0ef4`; local smoke showed large height reductions for `/`, `/about`, and `/products`; Founder accepted Phase 3 on 2026-07-08 | Do not run further density work unless Founder requests it |
| Copy reads repetitive and AI-generated | Accepted | Phase 3 editorial recovery commits and public claim cleanup; Founder accepted Phase 3 on 2026-07-08 | Future CMS content must preserve the approved editorial direction |
| Photography is repetitive | Accepted | Visual recovery shifted away from cheap renders and toward curated photography; Founder accepted Phase 3 on 2026-07-08 | Future CMS/media work must preserve asset traceability |

## Verification Record

| Command | Result | Notes |
|---|---|---|
| `git status -sb` | Passed inspection | Only known planning/backup artifacts remain outside this docs update |
| `git log --oneline -10` | Passed inspection | Latest Phase 3 reconciliation commit is `80959fb` |
| `npm run validate` | Passed | 9 categories, 17 products, 12 solutions, 6 government topics, 7 insights, 0 errors |
| `npm run build` | Passed | Next.js 16 build completed; non-blocking middleware deprecation warning remains; `prebuild` now removes stale generated `.next` output before validation/build |
| `npx vitest run` | Passed | 2 test files, 4 tests |
| Playwright screenshot matrix on `http://localhost:3055` | Passed | 21 screenshots, 0 HTTP failures, 0 console/page errors, 0 horizontal-overflow findings, 0 blocked-claim hits |
| Local mobile density smoke after `26f0ef4` | Passed | `/tmp/hacien-26f0ef4-local-visual-smoke-20260708/manifest.json`; `/`, `/about`, `/products` returned 200 with no horizontal overflow |
| Live route verification after `26f0ef4` push | Passed | `/`, `/about`, `/products`, `/quote`, `/track`, `/sitemap.xml` returned 200; sitemap keeps `/track` and canonical `/products/...`, excludes `/erp-platform` and legacy `/product/...` |

## Drift Rules Going Forward

1. Do not mark a masterplan item complete unless it has local code evidence plus verification evidence.
2. Do not silently skip risky masterplan wording. Classify it as `Blocked` or obtain explicit approval.
3. Do not start the next phase until current-phase items are all `Complete`, `Partial`, `Blocked`, or `Approved Deviation`.
4. Do not deploy, push, migrate, reset, revert, stash, clean, expose secrets, or create official business/legal/tax/payment claims without explicit approval.
5. Update this register after each phase-level sprint, local commit, visual QA pass, or Founder decision.

## Recommended Next Decision

Phase 3 is complete and Founder accepted. Phase 4 may now begin with planning only:

- Keep safe technical foundations that help: RFQ, Gateway, tracking, Help Center, FAQ, parser, motion utilities, claim safety, sitemap hygiene, and photography source tracking.
- Start Phase 4 with CMS architecture, source-of-truth, schema, auth, and migration boundary review before implementation.
- Keep ERP as the source of truth for ProductPublication/order intent validation; website CMS must not directly write ERP business tables.
- Keep stock SLA, 15-day quote guarantee, price-match, payment, invoice, receipt, and BIR/tax claims blocked unless explicitly approved with business evidence.
