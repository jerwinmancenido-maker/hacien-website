# HACIEN Website Project Overlay

Status: active, durably adopted P1.3 project overlay

This file is active immediately as a repository instruction for least-authority,
stop-on-conflict, exact-scope, and no-release safety boundaries. Its
cross-repository authority allocation is the adopted P1.3 operating ceiling.

## Scope and Precedence

- This overlay applies to `/Users/m5/Projects/hacien-website` and all descendants.
- Follow platform, system, developer, global `AGENTS.md`, and direct user
  instructions before this file.
- This repository is the canonical standalone public-website source until an
  adopted migration decision changes that allocation.
- Repository location grants source authority only. It does not grant provider,
  database, deployment, production, release, credential, or integrated HACIEN
  governance authority.
- For repository roles, data ownership, synchronization, and promotion, use the
  P1.3 contract at
  `/Users/m5/Projects/hacien-staging/operations/knowledge/website-source-data-promotion-contract.md`.
  That contract is durably adopted. It remains a safety ceiling and does not
  authorize mutation of another repository or external system.
- If instructions conflict or an authority is still draft/unknown, stop and
  request direction before mutating anything.

## Canonical Local Sources

1. This overlay controls tool behavior and repository boundaries.
2. `plans/hacien-website-masterplan-index.md` routes current website planning.
3. `plans/masterplan-conformance-register.md` records source evidence and
   unresolved verification.
4. The P1.3 cross-repository contract owns data and promotion definitions;
   local architecture documents are consumers and may not redefine them.
5. Current Git/source inspection controls source facts. Provider, database,
   deployment, browser, and production facts require separate direct evidence.

Plans, prompts, memories, cached remote refs, historical screenshots, and old
production statements are not current runtime truth by themselves.

## Lifecycle

- Documentary phase label: Phase 8A work is present in the current dirty tree.
- Current source verification (chore/maintenance-20261031, after CTO review
  fixes on 2026-10-30):
  - `npm ci`: PASS (lock regenerated; `.npmrc` sets `legacy-peer-deps=true`)
  - `npx tsc --noEmit`: PASS (0 errors)
  - `npm run lint`: PASS (0 errors; 0 warnings)
  - `npx vitest run`: PASS (5 files / 63 tests)
  - `npm run validate` (claim-safety / blocked-claim scan): PASS (0 errors)
  - `npm run build` (`next build`): PASS (Next.js 16.4.3)
  - `npm audit`: 3 high / 0 critical (remaining require prisma major)
  - Rendered-browser evidence: not refreshed in this maintenance pass (`UNKNOWN`)
- Database/provider/deployment/production state: `UNKNOWN` unless separately
  verified in an authorized lane.
- A local diff or passing review does not authorize staging, commit, push,
  deployment, migration, or release.

## Sole Writer and Exact Leases

- Use one writer for each exact shared file or logical source boundary.
- Reproduce branch, HEAD, repository digests, leased file hashes, and absence
  markers before writing. Stop on any mismatch or newly dirty leased path.
- Preserve all unrelated tracked and untracked work.
- Do not author the same logical change in `hacien-website-staging`.
- Rehearsal findings must be re-authored here under a new exact lease; never
  reverse-promote rehearsal changes.
- Integrated `hacien-staging/apps/website` and `hacien-sites-lab` are candidate
  inputs only. Copying from them requires a separate exact migration lease.

## Data Boundary

- ERP/PostgreSQL owns official customer, organization, catalog, price, stock,
  publication eligibility, quotation, order, inventory, fulfillment, invoice,
  receipt, payment, tax, accounting, supplier, logistics, and audit truth.
- Website-local storage may hold only approved session/consent, cart, draft
  request, idempotency/correlation, CMS, and versioned read-only projection or
  customer-safe display records.
- A website request is not official until ERP returns an acceptance receipt.
- Do not write ERP tables directly, perform dual writes, or present seeded,
  fallback, cached, or locally modeled data as official truth.
- Existing Prisma model names do not grant operational ownership or activation
  authority.

## Promotion Boundary

Permitted direction:

```text
canonical change in hacien-website
  -> exact canonical commit
  -> independent review
  -> one-way refresh to hacien-website-staging
  -> rehearsal evidence
  -> separately authorized release
```

No bidirectional sync, staging-to-canonical merge, lab promotion, or deployment
from the rehearsal checkout is permitted.

## Prohibited Scope

Without a separate exact authorization, do not:

- stage, commit, push, merge, tag, deploy, publish, migrate, or change Git
  branches/worktrees;
- change providers, databases, schemas, migrations, permissions, credentials,
  secrets, DNS, or production configuration;
- activate payments, tax, invoices/receipts, supplier/logistics actions,
  messaging, cron, official documents, or ERP mutation;
- expose unsupported government credentials, stock, SLA, pricing, payment,
  production-readiness, or certification claims;
- discard, overwrite, stash, clean, or normalize unrelated work.

## Verification

Use fresh evidence appropriate to the change:

- exact-scope and outside-lease diff checks;
- authority-link and supersession checks;
- validation, focused tests, typecheck, lint, and production build;
- claim-safety and secret scans;
- desktop/mobile rendered browser review for affected routes;
- separate security/privacy review for identity or customer data;
- independent PMO and Quality review of the exact final manifest.

Keep source, database, provider, deployment, browser, and production evidence as
separate dispositions.

## Supersession

- This overlay and the P1.3 contract may be superseded only by an adopted record
  naming the replacement authority, effective revision, affected scope,
  migration/rollback disposition, and review evidence.
- Older plans remain historical/reference material where they conflict with this
  overlay or the P1.3 contract.
- The finalized P1.2.1 manifest remains a separate protected provenance packet;
  this website overlay cannot redefine or supersede it.
