# HACIEN ERP-Backed Ecommerce Architecture

Status: Adopted P1.3 ERP/website boundary alignment
Last Reviewed: 2026-07-18
Authority: ERP/website integration consumer
Controlling Contract: `/Users/m5/Projects/hacien-staging/operations/knowledge/website-source-data-promotion-contract.md`
Supersedes: The absolute prohibition on all website-local ecommerce persistence

## Decision

ERP/PostgreSQL is the sole authority for official ecommerce and business
operations. The canonical website is the public storefront and continuity
client. Website-local MySQL may support explicitly bounded draft, request,
session, CMS, and projection/display records; it does not become operational
truth.

## ERP Ownership

ERP owns:

- product master, publication eligibility, price, stock, availability, and
  fulfillment truth;
- official customer, organization, membership, quotation, order, sale,
  supplier, logistics, and support/RMA decisions;
- invoices, receipts, payments, tax, accounting, commissions, and audit history;
- final acceptance, rejection, cancellation, and lifecycle state.

## Website-Local Ownership Ceiling

Subject to separate implementation and external-state approval, the website may
own:

- website session/consent records;
- carts and pre-ERP RFQ or checkout drafts;
- idempotency keys, correlation identifiers, request delivery receipts, and
  reconciliation checkpoints;
- CMS/public-content records;
- versioned customer-safe ERP projections and display caches.

Schema models resembling products, customers, orders, payments, invoices, or
subscriptions must be constrained to projection, draft, request, or display
semantics. They do not authorize official record creation.

## Contract Flow

1. ERP publishes an allowlisted, versioned projection.
2. Website stores or renders the projection with source identifier, version, and
   freshness.
3. Website submits additive requests through an approved gateway/API using an
   idempotency key.
4. ERP returns acceptance/rejection and later lifecycle reconciliation.
5. Website yields to official ERP state while retaining an audit trail.

## Public Purchase Modes

- `rfq`: request-for-quote only.
- `checkout`: approval-gated direct-purchase intent.
- `hybrid`: RFQ plus optional approved checkout intent.

The website must not imply that intent capture creates an official order,
payment, invoice, or fulfillment commitment.

## Resilience

Controlled fallback or empty states may preserve navigation during ERP
unavailability. Seeded, compatibility, cached, or fallback data must be visibly
classified internally and must not be represented as current official truth.

## Prohibitions

- no direct website mutation of ERP tables;
- no independent website product/price/stock truth;
- no official order, invoice, receipt, tax, payment, supplier, logistics, or
  accounting creation from the storefront;
- no cardholder-data storage;
- no production provider, database, migration, seed, messaging, cron, or
  deployment action without a separate exact authorization.
