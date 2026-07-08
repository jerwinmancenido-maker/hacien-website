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

The next website task is Phase 4 CMS planning:

1. Define the CMS scope before building: editable copy/data, media library, route content, FAQ/help, products/catalog sync boundaries, and admin access model.
2. Keep ERP as the business source of truth for ProductPublication/order intent validation.
3. Keep website CMS focused on public website content, media, layout metadata, and approved storefront/cache content only.
4. Keep public government, tax, payment, invoice, receipt, stock/SLA, 15-day, and price-match claims blocked unless separately approved with evidence.
5. Do not start implementation until Phase 4 architecture, schema, admin auth, and migration boundaries are reviewed.
