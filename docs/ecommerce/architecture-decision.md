# HACIEN Ecommerce Architecture Decision

Status: Adopted P1.3 architecture alignment
Last Reviewed: 2026-07-18
Authority: Product-mode and website-consumer architecture
Data and Promotion Authority: `/Users/m5/Projects/hacien-staging/operations/knowledge/website-source-data-promotion-contract.md`
Supersedes: Earlier unresolved ERP-versus-local-cache wording

## Decision

HACIEN is a procurement-aware, RFQ-first website backed by ERP-controlled
business truth. The website is the canonical public source and customer-facing
client; it is not a second ERP.

## Product Modes

- `rfq`: request-for-quote only.
- `checkout`: direct-purchase intent only for explicitly approved products and
  policies.
- `hybrid`: RFQ plus an approval-gated checkout-intent path.

These modes control website presentation and request capture. ERP controls
publication eligibility, official price/availability, acceptance, quotation,
order, payment, fulfillment, and financial state.

## Account and Continuity Model

The website may provide customer-safe continuity for:

- website authentication/session and consent;
- cart and draft request state;
- RFQ and checkout-intent submission receipts;
- ERP-projected quotation, order, document, support, and payment-status display.

Website-local identity is not the official customer/organization master. A
request or displayed record is not official until ERP accepts or publishes it.

## Integration Direction

```text
ERP -> versioned customer-safe projection -> website display/cache
website draft -> idempotent request -> ERP gateway/API
ERP receipt/reconciliation -> website continuity display
```

Direct database writes, dual writes, inferred record matching, and
last-write-wins synchronization are prohibited.

## Activation Gates

Database hosting, authentication, ERP APIs, payments, tax/invoice behavior,
admin roles, migrations, data seeding, outbound messaging, and production
deployment each require separate authorization and direct verification.

## Immediate Non-Goals

- official invoice, receipt, tax, payment, inventory, supplier, logistics, or
  accounting automation in the website;
- cardholder-data storage;
- treating seeded/fallback content as production truth;
- production-readiness claims based only on source or historical evidence.
