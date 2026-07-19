# HACIEN Masterplan Conformance Register

Status: Adopted P1.3 authority-aligned repository register
Last updated: 2026-07-18
Repository: `/Users/m5/Projects/hacien-website`
Branch: `main`
P1.3 baseline HEAD: `9e44ca89a532cadd870fc4d8cdea31f40f176150`
Current verification: Source inventory only; dirty-tree runtime and release state
remain `UNKNOWN`

## P1.3 Authority Disposition

- Canonical public-website source: this repository, until an adopted migration
  changes the allocation.
- Cross-repository authority, data ownership, and promotion:
  `/Users/m5/Projects/hacien-staging/operations/knowledge/website-source-data-promotion-contract.md`.
- Project behavior and prohibitions: `../AGENTS.md`.
- Sole writer: one writer per exact file and logical source lease.
- Rehearsal direction: canonical website to `hacien-website-staging` only; no
  reverse promotion.
- ERP owns official operational/financial truth; website-local storage is
  limited to approved session, draft/request, CMS, projection, and display state.
- P1.3 is durably adopted after independent PMO and Quality review and explicit
  adoption authority. Git finalization remains separately controlled.
- Historical evidence below remains historical. It is not current source,
  browser, database, provider, deployment, or production proof.

## Source Freeze

| Source | Path | Role |
|---|---|---|
| Direct current authorization | Current authorized task context | Exact action authority; never inferred from a plan |
| P1.3 source/data/promotion contract | `/Users/m5/Projects/hacien-staging/operations/knowledge/website-source-data-promotion-contract.md` | Adopted cross-repository roles, data ownership, sync, promotion, and supersession authority |
| Project overlay | `/Users/m5/Projects/hacien-website/AGENTS.md` | Tool behavior, lifecycle, prohibited scope, and verification |
| Repo-local masterplan index | `/Users/m5/Projects/hacien-website/plans/hacien-website-masterplan-index.md` | Current website planning entry point |
| This conformance register | `/Users/m5/Projects/hacien-website/plans/masterplan-conformance-register.md` | Historical evidence and current open dispositions |
| Antigravity plans, old prompts, and sprint handoffs | Superseded or external locations | Historical/reference only unless explicitly re-adopted |

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
| Phase 1 - Foundation & Build Verification | Historical Green / Complete | Master task inventory marked complete | Historical build PASS only; current dirty-tree build is `UNKNOWN` |
| Phase 2 - Intake Readiness | Historical Green / Complete | Historical record: PR #2 deployed; RFQ and tracking checks were recorded | Historical production evidence only; current production state is `UNKNOWN` |
| Phase 4 - CMS Flexibility | Green / Complete | Checked in working tree; dynamic About/Solutions loaders, package.json prebuild/test configurations, public contact information privacy sweep, static preview CMS direction, and snapshots are verified | Phase 4 is complete; CMS remains local draft-only |
| Phase 5 - Customer Portal, Admin Dashboard & AI Concierge | Yellow / Phase 5H Complete / Concierge and Screenshot QA Polish | Phase 5A checkpoint commits `d81b459` and `443b206`; Phase 5B adds safe continuity records; Phase 5C adds document visibility shells; Phase 5D adds shared RFQ templates and comparison review; Phase 5E adds website-safe approval workflows; Phase 5F adds compact needs-attention notifications and safe follow-through prompts; Phase 5G adds shared private workspace navigation through `18355d5`, `25ebca5`, `5bc9309`, `3cf9041`, and `71c4d33`; Phase 5H adds staged concierge copy and reusable screenshot QA through `7abce54`, `266ff45`, and `95e35ab`, with screenshot evidence at `/tmp/hacien-phase5h-final-20260710/manifest.json` | Founder corrected scope: keep ERP/accounting/tax/payment/supplier/commission/PhilGEPS/live-messaging operations out of website implementation until later gates |
| Phase 6 - Quote PDF, Payments & Logistics | Yellow / Phase 6B-6E Complete / Sandbox Simulation | Phase 6A implementation adds read-only ERP record placeholders; Phase 6B-6E adds sandbox simulations for quote files, payment review, official document visibility, tax placeholders, logistics timelines, and ERP handoff gates, with screenshot evidence at `/tmp/hacien-phase6-sandbox-sprint-20260710/manifest.json` | Contains payment/logistics/tax/official-document commitments requiring ERP, accounting, approval, and evidence gates before any operational write |
| Phase 7 - ERP Integration Blueprint & Hybrid Connector | Yellow / Phase 7F-7G Complete / Hybrid Read Adapter | Source-of-truth map, hybrid ERP read adapter, staff contract backlog, Ping ERP retry, approval queue, audit requirements, controlled draft quote sync request contract, and `/admin/erp` implementation; screenshot evidence at `/tmp/hacien-phase7f-7g-erp-connector-20260710/manifest.json` | Phase 7F is read-only; Phase 7G is approval-request contract only. Operational mutations remain blocked |
| Phase 8 - Final Verification & Hand-off | P1.3 Authority Remediation / Source Verification Unknown | Phase 8A source is present in the dirty tree | Fresh validation, tests, typecheck, lint, build, claim scan, and rendered-browser evidence are required before any current PASS |


## Sprint 2 Phase 3 Masterplan Variance Register

| Requirement | Status | Evidence | Blocker / Next Action |
|---|---|---|---|
| Remotion Cinematic Video Compositions: `HeroReel`, `ExplodedHardware`, `AiScannerDemo`, `LogisticsMap`, `PortalAssetDashboard` | Partial | `remotion/Root.tsx`, `remotion/compositions/*.tsx`; commit `b032403`, reconciled by `80959fb` | Files exist, but the public website does not yet deliver the intended cinematic moving-background/text experience |
| Hyperframes orchestration | Approved Deviation | Founder Gate: Remotion-only orchestration is accepted for Phase 3; `CinematicSequence` composes the five scenes | Do not add Hyperframes in Phase 3 unless a later explicit decision reverses this gate |
| Whole-Website Cinematic UX: Lenis, ambient lighting, App Router dissolve | Complete | `components/motion/LenisProvider.tsx`, `app/layout.tsx`, `app/template.tsx`, `components/motion/PageTransition.tsx`, `app/globals.css`; commits `b032403`, `80959fb` | None for local implementation |
| PepStack motion standards: `clinicalOut`, `premiumInOut`, `OVERLAP_FRAMES = 18` | Complete | `lib/motion/timing.ts`, `app/globals.css`, `remotion/compositions/CinematicSequence.tsx`; commit `80959fb` | None |
| Scroll-bound 3D WebGL assembly | Stale Plan Record / Not Accepted Public Direction | `components/visual/ScrollServerAssembly.tsx`, `components/visual/ScrollServerAssemblyWrapper.tsx`; commits `34382d7`, `80959fb` | Founder correction: public cinematic direction should not be cheap product/server renders. Remove, archive, or de-emphasize in Phase 3 recovery |
| Dynamic CMS video text overlays from JSON catalog/config | Deferred to Phase 4 | Founder Gate: JSON config satisfies Phase 3 proof; CMS-managed overlays move to Phase 4 | Carry into Phase 4 zero-hardcoding/CMS refactor |
| Quote Expiry Auto-Ping daily cron | Complete / Dry Run Passing | `cron/quote-expiry-monitor.ts`, `package.json` script `cron:quote-expiry` | Dry run script is verified to pass cleanly when DATABASE_URL is missing. Production PM2 scheduling remains blocked |
| AI Document Parser component | Complete | `app/actions/parse-document.ts`, `components/AiDocumentParser.tsx` | No production document processing claim implied |
| Dynamic Help Center and FAQ from JSON | Complete | `app/help/page.tsx`, `app/faq/page.tsx`, `components/FaqSearch.tsx`, `config/faq-data.json` | None for local implementation |
| Dual Inventory Availability Badging with literal stock/SLA claims | Stale Plan Record / Blocked | Historical code references may exist, but Founder Gate controls public claims | Do not publish literal stock, hub, distributor-channel, 24-48 hr, or delivery SLA claims without supplier evidence and explicit approval |
| 15-Day Quote Validity Badge / price guarantee countdown | Stale Plan Record / Blocked | Historical code references may exist, but Founder Gate controls public claims | Do not publish default validity, countdown, or price guarantee claims while Terms state validity is set by the formal document |
| Price Match Guarantee Badge | Stale Plan Record / Blocked | Historical code references may exist, but Founder Gate controls public claims | Do not publish price-match triggers without written policy, exclusions, and margin guardrails |
| 3D Interactive Server Chassis | Complete / Integrated | `components/visual/InteractiveServerChassis.tsx`, `app/solutions/[slug]/page.tsx` | Integrated into solutions detail pages conditionally |
| Interactive WebGL Philippines Delivery Globe | Complete / Integrated | `components/visual/DeliveryGlobe.tsx`, `app/about/page.tsx` | Integrated into the About page story column |
| Glassmorphic Skeleton Suspense | Complete | `components/visual/GlassmorphicSkeleton.tsx`, dynamic wrappers with `ssr: false` | None |
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

## Phase 5A Quality and Scope Gate

| Gate | Status | Evidence | Required Rule |
|---|---|---|---|
| 6-lens audit before implementation | Complete / Current | 2026-07-10 review covered business fit, safety/compliance, architecture, UX, engineering, and operations | Update plans first, then ask Founder for review before coding the next feature slice |
| Website/admin build health | Complete / Current | `npm run validate`, `npm test`, `npx tsc --noEmit`, `npm run lint`, and `npm run build` passed locally on 2026-07-10 | Re-run after every material Phase 5 change |
| Screenshot QA | Complete / Current | `/tmp/hacien-quality-audit-20260710/manifest.json`; desktop/mobile captures for `/`, `/admin`, `/admin/cms`, `/portal`, `/products`, and `/quote` | Show screenshots to Founder; do not require Founder to open the site manually for every review |
| Public claim scan | Complete / Current | Public route text scan found no public phone numbers, raw credentials, or positive tax/payment/receipt/stock/SLA/price-match claims. A FAQ mention of official receipts is allowed only as negative/safety language. | Keep official document, tax, payment, stock/SLA, 15-day, and price-match claims blocked |
| ERP boundary | Corrected / Active | Founder clarified PhilGEPS bid desk and business operations belong in ERP, not Website CMS | Website can show safe shells/read-only states; ERP owns real records and writes |
| Safe Phase 5 route expansion | Active / Current | Added customer RFQ, quotation, order, and support continuity shells plus matching private admin queues | These are website-shell review surfaces only; they must not create ERP, accounting, tax, payment, supplier, SMS, or official document records |
| Phase 5B continuity trail | Complete / Current | Customer/admin continuity records show customer-visible updates, staff next steps, and gated boundaries | This is visibility and review language only; no ERP write, official document, payment, tax, supplier, or warranty automation |
| Phase 5C document vault foundation | Complete / Current | `/portal/documents` and `/admin/documents` organize customer-safe document notes and staff handling needs | No uploads, download writes, official billing, settlement, tax, supplier, or ERP records are created from these pages |
| Phase 5D RFQ builder and comparison | Complete / Current | `docs/superpowers/specs/2026-07-10-phase5d-rfq-builder-design.md`; `docs/superpowers/plans/2026-07-10-phase5d-rfq-builder-implementation.md`; implementation commits `32e19a3`, `6cfd605`, `c8b7c3f`, `6929108`, `f47cd84`; screenshots at `/tmp/hacien-phase5d-final-20260710/manifest.json` | Existing Gateway submission is preserved; live prices, stock promises, supplier automation, payment, tax, official documents, and ERP writes remain blocked |
| Phase 5E approval workflow | Complete / Current | `docs/superpowers/specs/2026-07-10-phase5e-approval-workflow-design.md`; `docs/superpowers/plans/2026-07-10-phase5e-approval-workflow-implementation.md`; implementation commits `f953c79`, `4799942`, `78e39c4`, `ef64771`, `e470511`, `c37b68d`; screenshots at `/tmp/hacien-phase5e-final-20260710/manifest.json` | Website-safe approval visibility only; ERP conversion, official order, payment, tax, supplier, SMS, warranty, PhilGEPS, and official document actions remain blocked |
| Phase 5F follow-through polish | Complete / Current | `docs/superpowers/specs/2026-07-10-phase5f-follow-through-polish-design.md`; `docs/superpowers/plans/2026-07-10-phase5f-follow-through-polish-implementation.md`; implementation commits `cff4ab0`, `6158605`, `ad3cbfd`, `980fa2f`, `1ffda90`, and `f3efd16`; screenshots at `/tmp/hacien-phase5f-final-20260710/manifest.json` | Website-safe follow-through visibility only; ERP conversion, official order, payment, tax, supplier, SMS/Viber/email automation, warranty, PhilGEPS, and official document actions remain blocked |
| Phase 5 long sprint track | Complete / Website-Safe Sequence | `docs/superpowers/specs/2026-07-10-phase5-long-sprint-design.md`; `docs/superpowers/plans/2026-07-10-phase5-long-sprint-implementation.md` | Phase 5F, Phase 5G, and Phase 5H are complete with tests, build, screenshots, docs update, and Antigravity audit handoff evidence |
| Phase 5G workspace unification | Complete / Current | `docs/superpowers/specs/2026-07-10-phase5g-workspace-unification-design.md`; `docs/superpowers/plans/2026-07-10-phase5g-workspace-unification-implementation.md`; implementation commits `18355d5`, `25ebca5`, `5bc9309`, `3cf9041`, and `71c4d33`; screenshots at `/tmp/hacien-phase5g-final-20260710/manifest.json` | Shared private workspace navigation only; CMS remains local draft-only and ERP/payment/tax/supplier/official-document operations remain blocked |
| Phase 5H concierge and screenshot QA polish | Complete / Current | `docs/superpowers/specs/2026-07-10-phase5h-concierge-screenshot-qa-design.md`; `docs/superpowers/plans/2026-07-10-phase5h-concierge-screenshot-qa-implementation.md`; implementation commits `7abce54`, `266ff45`, and `95e35ab`; screenshots at `/tmp/hacien-phase5h-final-20260710/manifest.json` | Concierge remains staged local review only; visitor concierge stays out of admin/CMS surfaces; reusable screenshot QA records route status, console errors, horizontal overflow, and blocked claims |
| Phase 6A read-only ERP record shells | Complete / Read-Only Shell | `docs/superpowers/specs/2026-07-10-phase6a-readonly-erp-shells-design.md`; `docs/superpowers/plans/2026-07-10-phase6a-readonly-erp-shells-implementation.md`; `lib/phase6/readonly-records.ts`; `components/phase6/Phase6ReadOnlyPanel.tsx`; screenshots at `/tmp/hacien-phase6a-readonly-shells-20260710/manifest.json` | Website shows future ERP-owned record placeholders only; no payment collection, invoice/receipt issuance, tax calculation, logistics booking, supplier action, messaging automation, or ERP writes |
| Phase 6B-6E sandbox simulation | Complete / Sandbox Only | `docs/superpowers/specs/2026-07-10-phase6b-6e-sandbox-simulation-design.md`; `docs/superpowers/plans/2026-07-10-phase6b-6e-sandbox-simulation-implementation.md`; `lib/phase6/sandbox-records.ts`; `components/phase6/Phase6SandboxPanel.tsx`; screenshots at `/tmp/hacien-phase6-sandbox-sprint-20260710/manifest.json` | Simulation only; no real payment, tax, official document, logistics, supplier, messaging, or ERP behavior |
| Phase 7A-7E seeded ERP integration | Complete / Superseded By Hybrid Adapter | `docs/superpowers/specs/2026-07-10-phase7a-7e-seeded-erp-integration-design.md`; `docs/superpowers/plans/2026-07-10-phase7a-7e-seeded-erp-integration-implementation.md`; prior screenshots at `/tmp/hacien-phase7-seeded-erp-sprint-20260710/manifest.json` | Superseded by Phase 7F-7G connector readiness; operational mutations remain blocked |
| Phase 7F-7G ERP connector readiness | Complete / Hybrid Read Adapter | `docs/superpowers/specs/2026-07-10-phase7f-7g-erp-connector-phase8-readiness-design.md`; `docs/superpowers/plans/2026-07-10-phase7f-7g-erp-connector-phase8-readiness-implementation.md`; `lib/phase7/erp-integration.ts`; `components/phase7/Phase7ErpReadinessPanel.tsx`; `components/phase7/Phase7ErpPingButton.tsx`; `/admin/erp`; `/api/phase7/erp-ping`; screenshots at `/tmp/hacien-phase7f-7g-erp-connector-20260710/manifest.json` | Local ERP-first reads only; `website-compat` and `offline-fallback` preserve UX; Phase 7G is approval-request payload contract only |
| Phase 8A separate shells and visual realism | In Progress / UI Cleanup | `components/phase8/CustomerPortalShell.tsx`; `components/phase8/Phase8TabbedLayout.tsx`; `components/phase8/RoleBasedAiAssistant.tsx`; visual-realism copy pass across public, portal, admin, CMS, and ERP surfaces | Rendered UI must look production-grade and avoid seeded/sandbox/compatibility/prototype labels; safety boundaries stay enforced under code/test/documentation guardrails |

## Competitive Procurement Benchmark

| Company | Publicly Visible Pattern | HACIEN Implication | Phase |
|---|---|---|---|
| CDW | eProcurement services, custom catalogs, ERP/purchasing-system integrations | Build toward custom catalog and procurement integration, but only after ERP source-of-truth gates | Phase 7 |
| SHI | IT asset management, compliance, lifecycle visibility, secure portals | Add customer continuity and asset/support history before deep asset-management promises | Phase 5B-6 |
| Insight | Procurement portal and procurement integration positioning | Customer portal should show RFQs, quotations, orders, documents, and support in one account surface | Phase 5B-5E |
| Softchoice | Self-serve customer portal for invoices, quotes, orders, and requests | Document/order visibility is valuable, but official invoices/receipts/tax files remain gated | Phase 5C-6 |
| Zones | Pre-approved SKU catalogs, shopping lists, order/inventory management tools | RFQ builder, approved lists, and catalog governance are good next steps before eProcurement | Phase 5D-7 |

Reference URLs are recorded in `plans/hacien-website-masterplan-index.md` and the competitive roadmap audit document.

## Phase 4 CMS Source-of-Truth Tracking Plan

Phase 4 CMS work must treat the CMS registry as a source-of-truth metadata repository for public website content. The registry is not only a list of pages; it is the tracking layer that records who owns every editable website data point, where it currently lives, what can be edited safely, and which validation gates must pass before publication.

| CMS Capability | Status | Target Slice | Implementation Rule |
|---|---|---|---|
| Repo-backed CMS read layer for FAQ and Help | Complete / Local | Slice 1 | Implemented in `lib/cms/content.ts`; public content is claim-scanned before use |
| CMS ownership inventory | Complete | Slice 2A | Fully implemented in `lib/cms/inventory.ts` covering homepage, about, profile, solutions, products, insights, FAQ/help, quote, legal, navigation, media, and sitemap |
| Strict inventory metadata schema | Complete | Slice 2A | Schema is enforced in `lib/cms/inventory.ts` including owner types, repo-relative sourceFile, riskLevel, validationSchema, dependencies, and readiness |
| Missing-record validation | Complete | Slice 2A and 2B | Implemented via `validateCmsInventory` in `lib/cms/inventory.ts` running as part of the `npm run validate` suite |
| Dependency impact mapping | Complete | Slice 2A, expanded later | Use dependencies to show impact across routes, Gateway/RFQ, sitemap, SEO, media, ERP boundaries, legal review, and future CMS dashboard permissions |
| Route registry build checks | Complete | Slice 2B | Public route ownership and sitemap discovery consistency checked in `lib/cms/inventory.ts` and validated on every run |
| Repo-backed content modules | Planned | Slice 3 | Move homepage, about, solutions, industries, navigation/footer, SEO, and selected quote-support copy into structured repo-backed CMS modules before MySQL |
| Media/source registry | Planned | Slice 4 | Track image key, alt text, source/license note, usage area, and claim-safety risk for public photography |
| Preview and publish validation | Planned | Slice 5 | Add pre-publish checks for blocked claims, route crawl, sitemap consistency, SEO fields, and mobile/content QA |
| Hostinger MySQL CMS tables | Blocked Until Approved | Slice 6 | Plan draft/published/revision/audit tables first; no migration until explicitly approved |
| CMS admin dashboard and permissions | Blocked Until Architecture Approved | Slice 7 | Editor UI must gray out or block ERP-owned, code-owned, and blocked-claim areas based on owner type and risk level |
| Version/sync tracking | Deferred | Slice 8 | Add `lastSynced` only after real sync automation exists; add checksum only after content moves to JSON/MySQL storage |
| ERP dashboard alerts and advanced impact monitoring | Deferred / Optional | Slice 9 | Consider later only after ERP admin/dashboard foundation is stable |

### CMS Inventory Required Fields

| Field | Requirement |
|---|---|
| `key` / route or content key | Unique route or content identifier |
| `ownerType` | `cms`, `erp`, `config`, `code`, or `blocked` |
| `sourceFile` / current source | Repo-relative source location only; do not use machine-specific absolute paths |
| `editableNow` | Boolean used by future CMS UI to decide whether editing is allowed |
| `riskLevel` | Numeric `1` to `5`, where `1` is low-risk copy and `5` is critical/blocked |
| `validationSchema` | Required fields plus rule names such as claim-safety scan, SEO metadata check, route crawl, or legal review |
| `dependencies` | Impact map to related routes, Gateway/RFQ, sitemap, SEO, media, ERP boundary, or review gate |
| `seoSource` / `seoManagedBy` | Identifies where SEO title/description/canonical/OG image are currently controlled |
| `cmsReadiness` | `ready`, `needs-model`, `blocked`, or `future-db` |

Do not add `lastSynced`, checksum, ERP dashboard alerts, or database-driven editing in Slice 2A. Those ideas are preserved in this plan but remain later slices.

### CMS Non-Ownership Boundaries

| Area | Owner | Rule |
|---|---|---|
| ERP ProductPublication truth | ERP | Website CMS may display approved metadata but must not override ProductPublication truth |
| Official order records | ERP | Website CMS cannot create or alter official order records |
| Payment, tax, invoice, receipt claims | Blocked | Keep out of public CMS unless approved with evidence |
| Supplier stock, SLA, 15-day, price-match guarantees | Blocked | Keep out of public CMS unless supplier/commercial evidence exists |
| Public government/BIR/DTI/Mayor/PhilGEPS claims | Blocked | Keep out of public CMS and public website positioning |

## Future HACIEN Command Center Track

The HACIEN Website CMS is the first module of a future internal HACIEN Command Center. This preserves the broader admin vision without expanding the current Phase 4 CMS scope into unrelated operational systems.

| Command Center Area | Status | Relationship to Current Work | Boundary |
|---|---|---|---|
| Website CMS | Active / Phase 4 | Module 1 and current implementation focus | Manage public website content, media, SEO, navigation, sitemap/discovery, and publish validation only |
| RFQ/Gateway visibility | Future | May surface request status, Gateway health, and public reference tracking after CMS foundations are stable | Must not create official ERP order records |
| Support inbox | Future | May connect website support/RFQ follow-up into an authenticated internal view | Requires privacy, auth, and retention review |
| PhilGEPS bid tracking | ERP Future / Out of Scope | Bid opportunity monitoring belongs in ERP/operations, not the website CMS | Do not build `/command-center/bid-desk` in Website CMS Phase 4 |
| Internal document/admin review | Future | May support review workflows for website/legal/help content | Must not publish tax/payment/official-document claims without approval |
| Audit trail | Future / Required for admin UI | Track who changed content, when, from where, and what validation passed | Add after CMS dashboard/data model exists |
| System health/status | Future | May show website/API/Gateway uptime, build status, and validation status | Internal-only; not public readiness marketing |
| ERP summaries or links | Future | May deep-link to ERP-owned records or summarize approved read-only status | ERP remains source of truth; CMS cannot edit ERP ProductPublication or official orders |

Command Center constraints:

1. HACIEN only. Do not add PepStack, trucking, or unrelated business workspaces to this website plan.
2. Internal only. Do not expose Command Center surfaces publicly.
3. Do not start Command Center UI until Phase 4 CMS registry, route/sitemap validation, repo-backed content modules, media registry, and preview/publish gates are stable.
4. Keep blocked public claims blocked across CMS and future Command Center modules.
5. Treat admin permissions, audit trail, and MySQL persistence as approval-gated later slices, not current Slice 2A/2B work.

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
| Phase 5D RFQ Builder | `/products`, `/quote`, and `/products -> /quote` interaction across desktop, tablet, and mobile | `/tmp/hacien-phase5d-final-20260710/manifest.json` |
| Phase 5E Approval Workflow | `/portal/rfqs`, `/portal/quotations`, `/portal/orders`, `/portal/support`, `/admin/rfqs`, `/admin/quotations`, `/admin/orders`, `/admin/support` across desktop, tablet, and mobile | `/tmp/hacien-phase5e-final-20260710/manifest.json` |
| Phase 5F Follow-Through Polish | `/portal/rfqs`, `/portal/quotations`, `/portal/orders`, `/portal/support`, `/portal/documents`, `/admin/rfqs`, `/admin/quotations`, `/admin/orders`, `/admin/support`, `/admin/documents` across desktop, tablet, and mobile, plus opened needs-attention popup | `/tmp/hacien-phase5f-final-20260710/manifest.json` |
| Phase 5G Workspace Unification | `/admin`, `/admin/cms`, `/command-center/cms`, `/portal`, and `/portal/rfqs` across desktop, tablet, and mobile | `/tmp/hacien-phase5g-final-20260710/manifest.json` |
| Phase 5H Concierge and Screenshot QA Polish | `/`, `/products`, `/quote`, `/portal`, `/portal/rfqs`, `/admin`, `/admin/cms`, and `/command-center/cms` across desktop, tablet, and mobile, plus opened public/portal concierge screenshots and admin exclusion screenshot | `/tmp/hacien-phase5h-final-20260710/manifest.json` |
| Phase 6A Read-Only ERP Record Shells | `/portal/quotations`, `/portal/orders`, `/portal/documents`, `/admin/quotations`, `/admin/orders`, and `/admin/documents` across desktop, tablet, and mobile | `/tmp/hacien-phase6a-readonly-shells-20260710/manifest.json` |
| Phase 6B-6E Sandbox Simulation | `/portal/quotations`, `/portal/orders`, `/portal/documents`, `/admin/quotations`, `/admin/orders`, `/admin/documents`, and `/admin/sales` across desktop, tablet, and mobile | `/tmp/hacien-phase6-sandbox-sprint-20260710/manifest.json` |
| Phase 7A-7E Seeded ERP Integration | `/portal`, `/portal/quotations`, `/portal/orders`, `/portal/documents`, `/admin`, `/admin/erp`, `/admin/quotations`, `/admin/orders`, `/admin/documents`, and `/admin/sales` across desktop, tablet, and mobile | `/tmp/hacien-phase7-seeded-erp-sprint-20260710/manifest.json` |
| Phase 7F-7G ERP Connector Readiness | `/portal`, `/portal/quotations`, `/portal/orders`, `/portal/documents`, `/admin`, `/admin/erp`, `/admin/quotations`, `/admin/orders`, `/admin/documents`, and `/admin/sales` across desktop, tablet, and mobile | `/tmp/hacien-phase7f-7g-erp-connector-20260710/manifest.json` |
| Phase 8A Separate Shells + Visual Realism | `/`, `/products`, `/quote`, `/portal`, `/portal/quotations`, `/portal/orders`, `/portal/support`, `/admin`, `/admin/erp`, `/admin/quotations`, `/admin/orders`, `/admin/support`, `/admin/support/rma`, `/admin/sales`, and `/command-center/cms` across desktop, tablet, and mobile | `/tmp/hacien-phase8a-shell-tabs-20260710/manifest.json` |

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
| Phase 5D final gates | Passed | `pnpm run validate` passed with 0 errors; `pnpm test` passed 66/66; `pnpm exec tsc --noEmit` passed; `pnpm run lint` passed; `pnpm run build` passed on 2026-07-10. `npx` is unavailable in this shell, so TypeScript was run through `pnpm exec`. |
| Phase 5D claim scan | Passed | Blocked-claim scan found only allowed negative FAQ language, gated KPI config wording, and CMS deny-list patterns; no public route additions for phone, PhilGEPS bid desk, BAC builder, live prices, stock promises, supplier automation, payment, tax, official documents, or ERP writes. |
| Phase 5E final gates | Passed | `pnpm run validate` passed with 0 errors; `pnpm test` passed 72/72 before responsive QA and 73/73 after responsive QA; `pnpm exec tsc --noEmit` passed; `pnpm run lint` passed; `pnpm run build` passed on 2026-07-10. |
| Phase 5E screenshot QA | Passed | 24 Playwright captures on `http://127.0.0.1:3037`; desktop, tablet, and mobile for 8 touched portal/admin routes; 0 HTTP failures, 0 console/page errors, 0 horizontal-overflow findings, and approval/gated markers present. |
| Phase 5E claim scan | Passed | Blocked-claim scan found only allowed negative/safety language, gated KPI config wording, and CMS deny-list patterns; no public route additions for phone, PhilGEPS bid desk, BAC builder, live prices, stock promises, supplier automation, payment, tax, official documents, or ERP writes. |
| Phase 5F final gates | Passed | `pnpm run validate` passed with 0 errors; `pnpm test` passed 81/81; `pnpm exec tsc --noEmit` passed; `pnpm run lint` passed; `pnpm run build` passed on 2026-07-10. |
| Phase 5F screenshot QA | Passed | 31 Playwright captures on `http://127.0.0.1:3037`; desktop, tablet, and mobile for 10 touched portal/admin routes plus opened notification popup; 0 HTTP failures, 0 console/page errors, 0 horizontal-overflow findings, and needs-attention/follow-through markers present. |
| Phase 5F claim scan | Passed | Screenshot text scan found no positive blocked claims for approve payment, ERP conversion, official issuance, supplier order, warranty approval, payment confirmation, official receipt issuance, supplier RMA submission, ERP writes, or live message sending. |
| Phase 5G final gates | Passed | `pnpm run validate` passed with 0 errors; `pnpm test` passed 88/88; `pnpm exec tsc --noEmit` passed; `pnpm run lint` passed; `pnpm run build` passed on 2026-07-10. |
| Phase 5G screenshot QA | Passed | 15 Playwright captures on `http://127.0.0.1:3037`; desktop, tablet, and mobile for 5 touched workspace routes; 0 HTTP failures, 0 console/page errors, 0 horizontal-overflow findings, and workspace/gated markers present. |
| Phase 5G claim scan | Passed | Screenshot text scan found no positive blocked claims for approve payment, ERP conversion, official issuance, supplier order, warranty approval, payment confirmation, official receipt issuance, supplier RMA submission, ERP writes, live message sending, or live publishing. |
| Phase 5H final gates | Passed | `pnpm run validate` passed with 0 errors; `pnpm test` passed 90/90; `pnpm exec tsc --noEmit` passed; `pnpm run lint` passed; `pnpm run build` passed on 2026-07-10. |
| Phase 5H screenshot QA | Passed | `pnpm run qa:screenshots -- --base-url http://127.0.0.1:3037 --out-dir /tmp/hacien-phase5h-final-20260710 --routes /,/products,/quote,/portal,/portal/rfqs,/admin,/admin/cms,/command-center/cms` captured 24 route/viewport screenshots with 0 failures; extra open/absence screenshots were captured for public concierge, portal concierge, and admin without visitor concierge. |
| Phase 5H claim scan | Passed | Screenshot and source tests found no positive blocked claims for live agent promises, SMS/Viber/email automation, ERP writes, payment confirmation, tax calculation, supplier action, warranty approval, ticket creation, live publishing, or official document behavior. Approved public `live chat support` contact wording remains allowed. |
| Phase 6A final gates | Passed | `pnpm run validate` passed with 0 errors; `pnpm test` passed 93/93; `pnpm exec tsc --noEmit` passed; `pnpm run lint` passed; `pnpm run build` passed on 2026-07-10. |
| Phase 6A screenshot QA | Passed | `pnpm run qa:screenshots -- --base-url http://127.0.0.1:3037 --out-dir /tmp/hacien-phase6a-readonly-shells-20260710 --routes /portal/quotations,/portal/orders,/portal/documents,/admin/quotations,/admin/orders,/admin/documents` captured 18 route/viewport screenshots with 0 failures. |
| Phase 6A claim scan | Passed | Tests and screenshot QA found no positive operational claims for payment collection, official invoice/receipt issuance, BIR/tax generation, logistics booking, ERP writes, supplier actions, or SMS/Viber/email automation. |
| Phase 6B-6E final gates | Passed | `pnpm run validate` passed with 0 errors; `pnpm test` passed 96/96; `pnpm exec tsc --noEmit` passed; `pnpm run lint` passed; `pnpm run build` passed on 2026-07-10. |
| Phase 6B-6E screenshot QA | Passed | `pnpm run qa:screenshots -- --base-url http://127.0.0.1:3037 --out-dir /tmp/hacien-phase6-sandbox-sprint-20260710 --routes /portal/quotations,/portal/orders,/portal/documents,/admin/quotations,/admin/orders,/admin/documents,/admin/sales` captured 21 route/viewport screenshots with 0 failures. |
| Phase 6B-6E claim scan | Passed | Tests, source scan, and screenshot QA found no positive operational claims for real payment, official document issuance, official tax calculation, logistics booking, supplier actions, messaging automation, or ERP writes. |
| Phase 7A-7E final gates | Passed | `pnpm run validate` passed with 0 errors; `pnpm test` passed 100/100; `pnpm exec tsc --noEmit` passed; `pnpm run lint` passed; `pnpm run build` passed on 2026-07-10. |
| Phase 7A-7E screenshot QA | Passed | `pnpm run qa:screenshots -- --base-url http://127.0.0.1:3037 --out-dir /tmp/hacien-phase7-seeded-erp-sprint-20260710 --routes /portal,/portal/quotations,/portal/orders,/portal/documents,/admin,/admin/erp,/admin/quotations,/admin/orders,/admin/documents,/admin/sales` captured 30 route/viewport screenshots with 0 failures. |
| Phase 7A-7E claim scan | Passed | Tests, source scan, and screenshot QA found no positive operational claims for live external connectors, payment collection, official document issuance, official tax calculation, logistics booking, supplier actions, messaging automation, or ERP mutation. |
| Phase 7F-7G final gates | Passed | `pnpm run validate` passed with 0 errors; `pnpm test` passed 107/107; `pnpm exec tsc --noEmit` passed; `pnpm run lint` passed; `pnpm run build` passed on 2026-07-10. |
| Phase 7F-7G screenshot QA | Passed | `pnpm run qa:screenshots -- --base-url http://127.0.0.1:3037 --out-dir /tmp/hacien-phase7f-7g-erp-connector-20260710 --routes /portal,/portal/quotations,/portal/orders,/portal/documents,/admin,/admin/erp,/admin/quotations,/admin/orders,/admin/documents,/admin/sales` captured 30 route/viewport screenshots with 0 failures. |
| Phase 7F-7G claim scan | Passed | Tests, source scan, route guard check, screenshot QA, and visual inspection found no direct ERP mutation, finance collection, official document issuance, official tax computation, delivery booking, procurement action, outbound automation, token exposure, or customer portal backlog exposure. Customer portal hides internal ERP recovery details; `/admin/erp` keeps staff diagnostics gated. |

## Drift Rules Going Forward

1. Do not mark a masterplan item complete unless it has local code evidence plus verification evidence.
2. Do not silently skip risky masterplan wording. Classify it as `Blocked` or obtain explicit approval.
3. Do not start the next phase until current-phase items are all `Complete`, `Partial`, `Blocked`, or `Approved Deviation`.
4. Do not deploy, push, migrate, reset, revert, stash, clean, expose secrets, or create official business/legal/tax/payment claims without explicit approval.
5. Update this register after each phase-level sprint, local commit, visual QA pass, or Founder decision.

## Recommended Next Decision

Phase 8 is ready for planning/review only after Antigravity reviews Phase 7F-7G:

- Keep local ERP reads hybrid: `erp-live`, `website-compat`, and `offline-fallback`.
- Keep customer portal clean of internal diagnostics, endpoint detail, role metadata, tokens, and backlog internals.
- Keep `/admin/erp` staff-only with summary counts, contract backlog, and Ping ERP.
- Allow only approval-request payload contracts for Phase 7G, starting with draft quote sync.
- Keep ERP as the source of truth for ProductPublication/order intent validation; website CMS must not directly write ERP business tables.
- Keep stock SLA, 15-day quote guarantee, price-match, payment, invoice, receipt, and BIR/tax claims blocked unless explicitly approved with business evidence.
