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
| Phase 3 - Visual Recovery, Remotion, WebGL | Yellow / Partial / Reopened for Design Recovery | Technical artifacts exist, but public design/content quality is not accepted |
| Phase 4 - CMS Flexibility | Red / Blocked Until Phase 3 Recovery | Do not start until Phase 3 public design/content recovery passes QA |
| Phase 5 - Portal/Admin/AI Concierge | Red / Not Started | Requires auth, internal-admin, legal/tax/payment gates |
| Phase 6 - Quote PDF, Payments & Logistics | Red / Not Started | Requires payment, tax, logistics, and stock-evidence gates |
| Phase 7 - Supplier Integration | Red / Not Started | Requires supplier/API credentials and evidence |
| Phase 8 - Final Verification & Hand-off | Red / Not Started | Final verification only after earlier phases are reconciled |

## Founder Design Correction

The accepted public cinematic direction is premium website motion: moving backgrounds, text choreography, scroll rhythm, parallax or ambient layers, and curated real-world photography.

The public cinematic direction is not cheap product renders, generic 3D server parts, or render-heavy computer/server fantasy scenes. Existing Remotion/WebGL work may remain as technical prototype evidence, but it is not accepted as the final public design identity.

## Public Claim Blocks

Do not reintroduce these as public website claims unless separately approved with evidence:

- Government credential positioning, PhilGEPS, BIR, DTI, Mayor's Permit, or public government-procurement pages.
- Payment collection, cashier approval, live payment status, official invoice, official receipt, tax readiness, or BIR readiness.
- Stock guarantees, Manila Hub availability, delivery SLA, 15-day quote guarantee, or price-match guarantee.
- Production-readiness claims that have not been proven by runtime evidence.

Internal or private ERP features may be planned later, but public website copy must remain RFQ-first and evidence-gated.

## Next Start Point

The next website implementation task is Phase 3 Design Recovery:

1. Audit live and local pages for AI-generated copy, repeated ideas, oversized boxes, weak mobile density, and missing cinematic motion.
2. Replace render-heavy direction with curated photography and subtle website-level motion.
3. Rewrite content so each page has a distinct purpose.
4. Verify with local-vs-live screenshots, `npm run validate`, `npm run build`, and `npx vitest run`.
