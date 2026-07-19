# HACIEN Website Hostinger MySQL

Status: Adopted P1.3 boundary; database/provider state unknown
Last Reviewed: 2026-07-18
Authority: Website-local database usage guide only
Controlling Contract: `/Users/m5/Projects/hacien-staging/operations/knowledge/website-source-data-promotion-contract.md`
Supersedes: Unqualified website ownership of order/payment/customer records

## Purpose and Authority Ceiling

If separately approved and configured, Hostinger MySQL may store bounded
website-local state:

- website authentication/session and consent records;
- carts and pre-ERP RFQ/checkout drafts;
- request idempotency/correlation, delivery receipts, and reconciliation
  checkpoints;
- support/RFQ intake before ERP acceptance;
- CMS and public-content metadata;
- versioned, customer-safe ERP projections/display caches.

It must not be treated as the authority for official customer/organization
master data, sellable catalog, price, stock, quotations, orders, fulfillment,
invoices, receipts, payments, tax, accounting, suppliers, logistics, or ERP
audit history.

Existing schema names are source inventory, not database activation or
operational ownership.

## Local Review Commands

Validate the Prisma schema:

```bash
npm run db:validate
```

Generate a reviewable migration locally:

```bash
npm run db:migration:hostinger
```

Connection checks, migration deployment, and seeding are external-state actions.
They require a separate exact database/provider authorization naming the target,
environment, backup/rollback controls, and permitted command.

## Safety Rules

- Never commit or print a real `DATABASE_URL`.
- Never use an ERP/PostgreSQL connection string for website MySQL.
- Never run deployment, migration, or seed commands merely because scripts or a
  schema exist.
- Never seed fallback products as official production catalog truth.
- Require explicit ERP identifiers, contract versions, freshness, and
  reconciliation for every stored projection.
- Keep source, database, provider, deployment, and production verification as
  separate evidence domains.
