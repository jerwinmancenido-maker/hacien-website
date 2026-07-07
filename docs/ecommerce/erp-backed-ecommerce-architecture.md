# HACIEN ERP-Backed Ecommerce Architecture

## Decision

HACIEN ERP is the sole source of truth for ecommerce operations. The standalone website is the storefront and customer-facing portal client that reads ERP data and publishes only customer-safe public data.

## Approved Business Rules

- Customer signup is open, with visibility and access controls managed in ERP customer identity.
- Manual payment order intent is allowed first, with a sandbox gateway adapter available only behind feature flags.
- Official invoices/tax documents are not automated in ecommerce MVP.
- Hardware, project-scoped, and variable-availability products remain RFQ-first unless explicitly approved for checkout.
- Products are sourced from ERP Product Master and published to web via a publication layer.
- Official invoices, official receipts, and accounting postings must not be auto-posted during checkout intent collection.

## Ownership

- ERP owns:
  - Product Master (SKU, price, stock, categories, brands, UOM, availability, verification status, evidence link)
  - Product Publication (public slug, public name, public description, image/specs, purchase mode, published state)
  - Customers, customer users, memberships, organization assignments
  - Customer signup workflow
  - Order intents, quotations, and downstream sales flow
  - Audit logs and operational history
- Website owns:
  - Public rendering for products and catalog
  - Checkout/order-intent flow UI
  - Open signup form UI
  - Validation + safe rendering behavior (fallback and empty-state handling)

## Source-of-Truth Guarantees

1. Website does not persist its own sellable product catalog.
2. Website does not persist ERP-facing customer account records, order intents, quotations, sales orders, invoices, receipts, or accounting entries.
3. Public product data is read from ERP-published catalog endpoints only.
4. ERP Product Master is the only place operations staff create products.
5. Any product shown publicly must pass through publication controls.

## Non-Goals (MVP)

- No website-local ecommerce database for sellable products.
- No website-local customer authentication/authorization that duplicates ERP customer identity.
- No direct ERP order creation from public checkout before quotation, payment, approval, inventory, and tax rules are approved.
- No card details stored in HACIEN systems.
- No production payment provider without sandbox gating and explicit security approvals.
- No official invoice automation in the public storefront.

## Public-Facing Purchase Modes

- `rfq` - request-for-quote flow only.
- `checkout` - direct checkout form available (manual payment path initially).
- `hybrid` - RFQ + optional checkout path for approved product types.

## Public Endpoint Behavior

- `/products` and `/products/[category]` must be resilient to ERP downtime and show controlled fallback content or empty states without exposing unverified claims.
- `/product/[slug]` must:
  - resolve published products by slug
  - display ERP-published specs and image payload safely
  - expose RFQ CTA always
  - expose checkout intents only for eligible published products.

## Security and Compliance Defaults

- Never expose internal ERP identifiers or internal-only status transitions.
- Always sanitize URLs, phone/email links, and form payloads.
- Enforce HTTPS and content security constraints in production hosting layer.
- Keep email/attachment and evidence references customer-safe by default.

## Implementation Guardrails

- Any implementation that introduces direct product mutation on the website must be rejected.
- Any implementation that auto-creates official financial artifacts from public storefront actions must be rejected.
- Any checkout path that bypasses manual payment review and ERP order-intent intent is considered non-compliant for MVP.
