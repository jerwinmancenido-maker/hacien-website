# HACIEN Ecommerce Architecture Decision

## Decision

HACIEN will be implemented as a **procurement-aware marketplace**, not a generic
ecommerce implementation. The website remains the public storefront and enquiry
entrypoint; ERP-backed APIs provide the long-term source of truth for sellable
operational data, while customer-facing features are introduced progressively.

## Product Modes

- `rfq`: RFQ-only products.
- `checkout`: direct purchase products.
- `hybrid`: products that allow both RFQ and direct-checkout-style paths.

## Account Model

Customers use account sign-in with organization context.
Accounts are expected to show:

- RFQ history and submitted references.
- Checkout/order-intent state.
- Support activity references.
- Order/payment status records.

## Provider Decisions Required

- Database host.
- Auth provider.
- ERP integration approach (read-through vs local cache).
- Payment provider and sandbox activation policy.
- Production migration policy.
- Tax/invoice posture.
- Admin approval/role model.

## Immediate Non-Goals for MVP

- No official tax invoice automation yet.
- No direct checkout for hardware/project products by default.
- No card-data storage or payment card vault in HACIEN systems.
- No official claims that full ERP-style customer portal is fully operational until
  accounts, roles, and order history are implemented and verified.

## ERP-First Source-of-Truth Alignment

HACIEN is proceeding with an ERP-first strategy:

- Product master data and pricing truth are managed in HACIEN ERP.
- Website should read public-safe product publications and status.
- Website can maintain UI/UX and quote intent services, but should avoid duplicating
  ERP operational truth in local static files beyond interim migration.
- ERP-backed contracts and APIs are the default path for future account and order data.
