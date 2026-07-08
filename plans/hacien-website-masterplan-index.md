# HACIEN Website Masterplan Index

Last updated: 2026-07-08
Repository: `/Users/jerwinmancenido/hacien-website`

This file is the repo-local entry point for HACIEN Website planning. It prevents agents from treating stale Antigravity files, old prompts, or completed-but-rejected implementation artifacts as the current plan.

## Source Hierarchy

| Priority | Source | Path | Role |
|---|---|---|---|
| 1 | Founder decisions and evidence gates | Recorded in this repo's conformance register and current sprint handoffs | Override unsafe or stale plan text |
| 2 | Current execution truth | `/Users/jerwinmancenido/hacien-website/plans/masterplan-conformance-register.md` | Phase status, blocked items, deviations, and live evidence |
| 3 | Main strategic blueprint | `/Users/jerwinmancenido/.gemini/antigravity-ide/brain/ff46cf60-2182-49b7-8d63-2423ffa4f544/website_execution_plan_audit.md` | Antigravity-created HACIEN Website master execution plan |
| 4 | Executive guide | `/Users/jerwinmancenido/.gemini/antigravity-ide/brain/ff46cf60-2182-49b7-8d63-2423ffa4f544/HACIEN_MASTER_PLAN_EXECUTIVE_DOCUMENTATION.md` | Executive overview and roadmap summary |
| 5 | Motion plan | `/Users/jerwinmancenido/.gemini/antigravity-ide/brain/ff46cf60-2182-49b7-8d63-2423ffa4f544/HACIEN_CINEMATIC_VIDEO_PLAN.md` | Supporting cinematic concept document |
| 6 | Anti-drift marker | `/Users/jerwinmancenido/.gemini/antigravity-ide/brain/ff46cf60-2182-49b7-8d63-2423ffa4f544/MASTER_PLAN_CONTINUATION.md` | Historical guardrails; superseded where this index or conformance register is more specific |
| 7 | Stale task inventories and old prompts | Antigravity `task.md`, prior chat prompts, old PR handoffs | Reference only unless reconciled into the conformance register |

## Conflict Precedence

When sources disagree, follow this order:

1. Founder decisions and evidence gates.
2. `plans/masterplan-conformance-register.md`.
3. Main Antigravity website master plan.
4. Supporting Antigravity documents.
5. Stale task files or old prompts.

Missing evidence means the item is not ready. It must be marked `Partial`, `Blocked`, `Approved Deviation`, or `Stale Plan Record`; it must not be silently counted as complete.

## Current Phase Status

| Phase | Status | Notes |
|---|---|---|
| Phase 0 - Workplace Preparation | Green / Complete | No current action |
| Phase 1 - Foundation & Build Verification | Green / Complete | No current action |
| Phase 2 - Intake Readiness | Green / Complete | PR #2 is deployed; live RFQ path works |
| Phase 3 - Visual Recovery, Remotion, WebGL | Green / Complete / Founder Accepted | Visual recovery, route hygiene, live deploy, and mobile density polish are implemented and pushed through `26f0ef4`; Founder accepted Phase 3 on 2026-07-08 |
| Phase 4 - CMS Flexibility | Yellow / Ready for Planning | Phase 3 acceptance gate is cleared; CMS work still needs a scoped Phase 4 plan before implementation |
| Phase 5 - Portal/Admin/AI Concierge | Red / Not Started | Requires auth, internal-admin, legal/tax/payment gates |
| Phase 6 - Quote PDF, Payments & Logistics | Red / Not Started | Requires payment, tax, logistics, and stock-evidence gates |
| Phase 7 - Supplier Integration | Red / Not Started | Requires supplier/API credentials and evidence |
| Phase 8 - Final Verification & Hand-off | Red / Not Started | Final verification only after earlier phases are reconciled |

## Founder Design & Editorial Correction

1. **Premium Website Motion (Mandatory)**: Visual recovery requires global cinematic animations. Moving backgrounds (CSS ambient flows or canvas particle loops), scroll rhythm, and text motion must run consistently across all routes (including legal, privacy, terms, and trust-center pages).
2. **Unified Document Templates**: All legal, terms, and privacy pages must share the exact same clean, high-density, professional card layout with frosted borders and matte dark accents to ensure design consistency.
3. **B2B Editorial Copy Rewrite**: All page text must be rewritten to remove dry, repetitive AI buzzwords (like "context", "workflow", "handover", "sourcing"). Copy must read like a premium, human-crafted B2B corporate agency.
4. **No Cheap 3D Renders**: Rejects cheap product/server 3D renders or computer/server fantasy scenes as the public visual identity. Existing Three.js work remains local prototype evidence only.

## Public Claim Blocks

Do not reintroduce these as public website claims unless separately approved with evidence:

- Government credential positioning, PhilGEPS, BIR, DTI, Mayor's Permit, or public government-procurement pages.
- Payment collection, cashier approval, live payment status, official invoice, official receipt, tax readiness, or BIR readiness.
- Stock guarantees, Manila Hub availability, delivery SLA, 15-day quote guarantee, or price-match guarantee.
- Production-readiness claims that have not been proven by runtime evidence.

Internal or private ERP features may be planned later, but public website copy must remain RFQ-first and evidence-gated.

## Next Start Point

The active website task is Phase 4 CMS planning and local implementation. The CMS must be designed as a source-of-truth tracking layer before any Hostinger MySQL or admin dashboard work starts.

1. Treat the CMS inventory as a metadata repository for public website source-of-truth tracking.
2. Every public website data point must have a visible owner/location before it becomes editable in a CMS dashboard.
3. Keep ERP as the business source of truth for ProductPublication/order intent validation.
4. Keep website CMS focused on public website content, media, layout metadata, SEO metadata, sitemap/discovery fields, and approved storefront/cache display metadata only.
5. Keep public government, tax, payment, invoice, receipt, stock/SLA, 15-day, and price-match claims blocked unless separately approved with evidence.
6. Do not start Hostinger MySQL CMS tables, migrations, or CMS admin dashboard work until the repo-backed inventory, validation, and content ownership model are complete.

## Phase 4 CMS Roadmap

| Slice | Status | Scope | Notes |
|---|---|---|---|
| Slice 1 - Repo-backed CMS read layer | Complete / Local | FAQ and Help content read from CMS module | Implemented in `lib/cms/content.ts`; claim-safety validation is active |
| Slice 2A - CMS ownership metadata registry | In Progress / Local | Inventory every public content area and record owner, source, risk, validation, dependencies, SEO source, and readiness | This is the current tracking foundation before CMS UI or database work |
| Slice 2B - Route and sitemap ownership validation | Planned | Ensure public routes, sitemap entries, and key clickable surfaces map back to ownership records | Missing ownership should fail validation |
| Slice 3 - Repo-backed content modules | Planned | Move homepage, about, solutions, industries, navigation/footer, SEO, and selected quote-support copy into structured modules | Keep ERP product truth out of CMS |
| Slice 4 - Media and asset registry | Planned | Track media key, alt text, source/license context, usage, and claim-safety risk | Use repo-relative references and reviewed source notes |
| Slice 5 - Preview and publish validation | Planned | Add pre-publish checks for blocked claims, route crawl, sitemap consistency, SEO fields, and visual/content QA | No public publish without passing gates |
| Slice 6 - Hostinger MySQL CMS schema | Blocked Until Approved | Draft/published/revision/audit tables | Requires explicit migration approval |
| Slice 7 - HACIEN Command Center admin shell and CMS permissions | Blocked Until Architecture Approved | Internal admin shell, editor UI, review flow, role-based access, disabled edit controls for blocked/ERP/code-owned areas | Website CMS is Module 1; must not expose ERP business truth as website-editable content |
| Slice 8 - Version/sync/checksum tracking | Deferred | `lastSynced`, checksum, stale-content detection | Add only after real sync automation or DB storage exists |
| Slice 9 - Command Center system modules | Deferred / Optional | Audit trail, RFQ/Gateway visibility, support inbox, system health, and read-only ERP summaries | HACIEN-only; internal-only; consider after Website CMS foundations are stable |

## Future HACIEN Command Center Track

The long-term internal admin product is the HACIEN Command Center. The current Phase 4 Website CMS is its first module, not a throwaway standalone CMS.

| Module | Timing | Purpose |
|---|---|---|
| Website CMS | Active Phase 4 | Manage HACIEN public website content, media, SEO, navigation, sitemap/discovery, and publish validation |
| RFQ/Gateway visibility | Future | Show website inquiry status, Gateway health, and customer-safe tracking references |
| Support inbox | Future | Centralize HACIEN website support and RFQ follow-up after auth/privacy rules are designed |
| Internal document/admin review | Future | Support controlled review of website/legal/help content without making public compliance claims |
| Audit trail | Future / Required before broad editing | Record who changed content, when, and which validation gates passed |
| System health/status | Future | Surface website/API/Gateway validation and uptime signals internally |
| ERP summaries or links | Future | Link to ERP-owned records or show read-only summaries without allowing CMS edits to ERP truth |

Command Center guardrails:

1. HACIEN only; do not add PepStack, trucking, or multi-venture workspaces.
2. Internal-only; no public Command Center routes.
3. Website CMS remains the active implementation scope until Phase 4 registry, route/sitemap validation, content modules, media registry, and preview/publish gates are stable.
4. ERP ProductPublication and official orders remain ERP-owned.
5. Payment, tax, invoice, receipt, stock/SLA, 15-day, price-match, and government credential claims remain blocked unless explicitly approved with evidence.

## CMS Tracking Guardrails

1. Use repo-relative `sourceFile` paths, not absolute machine paths.
2. Preserve future ideas like `lastSynced`, checksum, and ERP dashboard alerts in the roadmap, but do not implement them before their supporting sync/database/dashboard systems exist.
3. Use dependencies for impact analysis: route, sitemap, SEO, media, Gateway/RFQ, ERP boundary, legal review, and future CMS permissions.
4. Use numeric risk levels so future CMS UI can decide which content is editable, review-only, blocked, or admin-only.
5. Keep the CMS HACIEN Website-specific for now, but keep the schema clean enough to extend to other ventures later without polluting this repo.
