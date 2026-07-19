# HACIEN Ecommerce Current-State Audit

Status: Adopted P1.3 source correction; runtime state unknown
Last Reviewed: 2026-07-18
Authority: Source inventory only
Data Authority: `/Users/m5/Projects/hacien-staging/operations/knowledge/website-source-data-promotion-contract.md`
Supersedes: The 2026-07-05 claim that no database or ORM exists

## Verified Source Facts

- Static product/catalog records remain in `data/products.ts`.
- Canonical product routes exist under `app/products/[category]/[product]` with
  a legacy-compatible `app/product/[slug]` route.
- RFQ/quote interfaces and server actions exist.
- Public login, signup, access, portal, customer workspace, admin, and local CMS
  surfaces exist.
- Prisma is configured for MySQL in `prisma/schema.prisma`.
- The schema contains website-local models named for users, organizations,
  products, carts, orders, payments, invoice references, subscriptions, RFQ
  references, support tickets, and audit events.
- `lib/db.ts` creates a Prisma client when `DATABASE_URL` is configured.
- `scripts/seed-ecommerce-products.ts` can seed website fallback products.
- `lib/phase7/erp-integration.ts` contains ERP-first, compatibility, and offline
  fallback read behavior plus a draft request builder.
- `cron/quote-expiry-monitor.ts` contains configuration-gated outbound reminder
  behavior.

These are source facts. They do not prove that a database exists, migrations
were applied, a provider is configured, a cron is scheduled, messages were sent,
or production/runtime behavior is active.

## Current Authority Disposition

- ERP/PostgreSQL owns official operational, customer, catalog, order,
  fulfillment, financial, supplier, logistics, and audit truth.
- Website MySQL may own only separately approved website-local session,
  continuity, request, CMS, and versioned projection/display records.
- Existing broad Prisma models are implementation inventory. Their names do not
  grant authority to create official ERP records.
- Any activation, migration, schema change, seed, provider connection, or data
  synchronization requires a separate exact lease and direct evidence.

## Current Verification Disposition

| Evidence domain | Disposition |
| --- | --- |
| Current source inventory | `FACT` at the P1.3 baseline |
| Tests, typecheck, lint, build | `UNKNOWN` for the current dirty tree |
| Browser/runtime | `UNKNOWN` |
| Database/provider | `UNKNOWN` |
| Deployment/production | `UNKNOWN` |

## Product Boundary

HACIEN remains RFQ-first for variable, hardware, custom-service, and
project-scoped needs. Direct checkout, payment, official documents, and ERP
mutation remain blocked until explicitly approved and verified.
