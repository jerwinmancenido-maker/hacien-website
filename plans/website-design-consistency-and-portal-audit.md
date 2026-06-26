# HACIEN Website Design Consistency and Portal Audit

Status: Planning audit only  
Date: 2026-06-25  
Scope: HACIEN public website routes under `app/`, shared navigation/footer, visible customer/account entry points, and alignment with the HACIEN AI Framework.

## 1. Route Inventory

| Route | File | Current role | Design status | Content status | Notes |
| --- | --- | --- | --- | --- | --- |
| `/` | `app/page.tsx` | Homepage | Updated / current design | Current but dense | Uses the newer V3 homepage composition. Strong brand direction, but it carries many responsibilities and should be refined to create clearer paths to products, RFQ, ERP, and portal. |
| `/about` | `app/about/page.tsx` | Company story | Partially updated | Partially current | Uses React Bits and premium UI patterns. Content still reads partly like a service landing page rather than a focused company story. |
| `/about/company-profile` | `app/about/company-profile/page.tsx` | Formal company profile | Utility / supporting page | Current but older layout | Useful credibility page. Minimal redesign is acceptable, but it should inherit the newer typography, spacing, and trust pattern over time. |
| `/erp-platform` | `app/erp-platform/page.tsx` | ERP positioning page | Updated / current design | Current | Strongest current benchmark for premium HACIEN page design. Uses React Bits with appropriate restraint and includes Available / In Development / Future Vision roadmap labels. |
| `/solutions` | `app/solutions/page.tsx` | Solutions index | Outdated | Partially current | Uses older `SectionHeading`, `ServiceCard`, `CTABand`, and basic motion. Needs premium redesign and clearer hierarchy. |
| `/solutions/[slug]` | `app/solutions/[slug]/page.tsx` | Solution detail pages | Partially updated | Current but template-like | Content is useful, but layout feels repetitive and older. Needs stronger page-specific storytelling and decision support. |
| `/products` | `app/products/page.tsx` | RFQ catalog | Partially updated | Current but thin for marketplace direction | Functional RFQ catalog. Needs stronger category guidance, buyer education, filters/search, and clearer distinction between RFQ and future checkout. |
| `/products/[category]` | `app/products/[category]/page.tsx` | Product category listing | Partially updated | Current but thin | Useful category route. Needs richer category context, filters, and procurement guidance. |
| `/product/[slug]` | `app/product/[slug]/page.tsx` | Product detail | Partially updated | Current but utility-first | Useful RFQ detail flow. Needs cleaner product decision layout, RFQ confidence messaging, and future subscription/checkout readiness where relevant. |
| `/government-procurement` | `app/government-procurement/page.tsx` | Government procurement landing | Partially updated / outdated visually | Current | High-value content, but visual system trails About/ERP. Should become a credibility-heavy flagship page. |
| `/government-procurement/[topic]` | `app/government-procurement/[topic]/page.tsx` | Government topic pages | Partially updated | Current | Useful detail content, but layout is generic. Needs consistent trust, documentation, and procurement-safe language patterns. |
| `/insights` | `app/insights/page.tsx` | Insights index | Utility / partially updated | Current | Can remain simpler. Needs better topic filtering and stronger connection to RFQ/product education. |
| `/insights/[slug]` | `app/insights/[slug]/page.tsx` | Article pages | Utility / partially updated | Current | Reader-first simplicity is acceptable. Needs improved article typography and CTA consistency. |
| `/contact` | `app/contact/page.tsx` | Contact and inquiry entry | Outdated | Current but crowded | High-priority redesign. Current layout is functional but lacks premium trust, routing clarity, and portal/account guidance. |
| `/quote` | `app/quote/page.tsx` | RFQ cart | Utility / partially updated | Current | Correctly frames this as quotation, not checkout. Should stay fast, simple, and low-animation. Needs connection to future RFQ history. |
| `/privacy` | `app/privacy/page.tsx` | Legal page | Utility/legal page | Acceptable | Minimal design is acceptable. Keep readable and accurate. |
| `/terms` | `app/terms/page.tsx` | Legal page | Utility/legal page | Acceptable | Minimal design is acceptable. Keep readable and accurate. |
| Global error | `app/error.tsx` | Error state | Utility | Acceptable | Should remain simple, accessible, and actionable. |
| Global loading | `app/loading.tsx` | Loading state | Utility | Acceptable | Lightweight spinner is acceptable. |
| Not found | `app/not-found.tsx` | 404 page | Utility | Acceptable | Can remain simple; improve brand tone later if desired. |
| Products loading/error | `app/products/loading.tsx`, `app/products/error.tsx` | Product route states | Utility | Acceptable | Keep simple and fast. |

## 2. Design Status Per Route

Updated / current design:
- `/`
- `/about` visually, with content refinement still needed
- `/erp-platform`

Partially updated:
- `/about/company-profile`
- `/solutions/[slug]`
- `/products`
- `/products/[category]`
- `/product/[slug]`
- `/government-procurement`
- `/government-procurement/[topic]`
- `/insights`
- `/insights/[slug]`
- `/quote`

Outdated:
- `/solutions`
- `/contact`

Missing but required:
- `/login`
- `/signup`
- `/account`
- `/portal`
- `/portal/rfqs`
- `/portal/quotations`
- `/portal/orders`
- `/portal/invoices`
- `/portal/subscriptions`
- `/portal/support`
- `/checkout`

Utility/legal pages where minimal design is acceptable:
- `/privacy`
- `/terms`
- `/quote`
- Error, loading, and not-found states

## 3. Content Status Per Route

The strongest content direction is currently visible in `/erp-platform`, which clearly connects HACIEN's procurement operating model, ERP roadmap, Philippine business context, compliance-safe wording, and future ecosystem.

The public website content is generally accurate, but the experience is uneven:
- `/about` has a premium visual treatment, but should become a truer company story with less overlap against Solutions and ERP.
- `/solutions` and `/solutions/[slug]` have useful service content but feel generic compared with the current premium HACIEN standard.
- `/government-procurement` has strong subject matter but should become more authoritative and visually trustworthy.
- `/products` is functional but not yet a mature product discovery or marketplace-ready experience.
- `/contact` supports multiple inquiry types but needs clearer routing for RFQ, portal, partnerships, government support, and general inquiry.
- `/quote` correctly avoids claiming online checkout; keep this distinction until real checkout exists.

## 4. Missing Account, Portal, and Checkout Routes

| Route | Status | Access model | Recommended phase | Purpose |
| --- | --- | --- | --- | --- |
| `/login` | Missing but required | Public | Phase 1 placeholder, Phase 2 functional | Customer and internal account sign-in entry. |
| `/signup` | Missing but required | Public | Phase 1 placeholder, Phase 2 functional | Account request or customer registration entry. Avoid open account creation until business rules are clear. |
| `/account` | Missing but required | Protected/login-required | Phase 2 | Account dashboard placeholder after authentication. |
| `/portal` | Missing but required | Public landing now, protected app later | Phase 1 | Customer portal entry page explaining quotations, orders, invoices, subscriptions, and support. |
| `/portal/rfqs` | Missing but required | Protected/login-required | Phase 2 / future roadmap | RFQ history and submitted requirement tracking. |
| `/portal/quotations` | Missing but required | Protected/login-required | Phase 2 / future roadmap | Formal quotation history, statuses, and downloads. |
| `/portal/orders` | Missing but required | Protected/login-required | Phase 2 / future roadmap | Order tracking, delivery status, and project fulfillment visibility. |
| `/portal/invoices` | Missing but required | Protected/login-required | Phase 2 / future roadmap | Invoice and official document downloads where supported. |
| `/portal/subscriptions` | Missing but required | Protected/login-required | Phase 2 / future roadmap | Software license and subscription management. |
| `/portal/support` | Missing but required | Protected/login-required | Phase 2 / future roadmap | Support tickets, post-delivery concerns, warranty requests, and follow-ups. |
| `/checkout` | Missing but required for marketplace readiness | Public/protected hybrid | Future roadmap | Checkout for eligible software subscriptions or marketplace products only. Do not mix with RFQ-only procurement until policies are defined. |

## 5. Recommended Authentication and Portal Entry Strategy

Phase 1 should introduce public entry points without implementing full authentication:
- Add `/portal` as a public customer portal landing page.
- Add `/login` and `/signup` as clear, honest placeholders or account-request pages.
- Add header/footer entry points only after those pages exist.
- Keep RFQ submission through `/quote` and contact flows unchanged.
- Avoid promising self-service features before backend support exists.

Phase 2 should add the protected account shell:
- Implement real authentication and route guards.
- Use `/account` as the signed-in dashboard.
- Use `/portal/*` for customer service areas such as RFQs, quotations, orders, invoices, subscriptions, and support.
- Provide empty states that explain what will appear once records exist.
- Keep portal motion minimal and operational.

Phase 3 should connect customer records:
- RFQ history from website submissions.
- Quotation status and downloadable quotation files.
- Orders and delivery milestones.
- Invoice downloads and payment status where legally and operationally supported.
- Subscription renewals and license seats.
- Support ticket lifecycle.
- Marketplace checkout for eligible products.

## 6. Priority Ranking

High priority:
- `/solutions`
- `/government-procurement`
- `/products`
- `/contact`
- `/portal`
- `/login`
- `/signup`
- Header and footer account/portal entry strategy
- `/about` content refinement

Medium priority:
- `/solutions/[slug]`
- `/products/[category]`
- `/product/[slug]`
- `/government-procurement/[topic]`
- `/account`
- `/portal/rfqs`
- `/portal/quotations`
- `/portal/orders`
- `/portal/invoices`
- `/portal/subscriptions`
- `/portal/support`
- Product discovery search/filter improvements

Low priority:
- `/insights`
- `/insights/[slug]`
- `/privacy`
- `/terms`
- Error/loading/not-found pages
- `/checkout` until marketplace pricing, payment, fulfillment, and account rules are defined

## 7. Recommended Phase 1 Pages To Update

1. `/contact`
   - Convert into a clear inquiry router: RFQ, customer portal/account, government procurement, supplier partnership, ERP interest, and general contact.
   - Reduce form overload and improve trust context.

2. `/portal`
   - Create public customer portal landing page.
   - Explain future self-service areas without implying they are already live.
   - CTA to `/login`, `/signup`, and `/contact`.

3. `/login`
   - Add public placeholder or account-request sign-in page.
   - State that customer portal access is being prepared if authentication is not live yet.

4. `/signup`
   - Add customer account request page.
   - Prefer "request access" language over unrestricted self-registration until business rules exist.

5. `/solutions`
   - Redesign as a premium solution architecture page.
   - Reduce generic card feel.
   - Connect service areas to procurement workflows, ERP vision, RFQ, and customer portal.

6. `/government-procurement`
   - Upgrade into a credibility-heavy flagship page.
   - Keep wording compliance-safe.
   - Emphasize documentation support, equivalent matching, RFQ preparation, and delivery coordination.

7. `/products`
   - Improve product discovery, category clarity, and RFQ confidence.
   - Prepare the information architecture for future marketplace and subscription flows.

8. Header/footer
   - Add customer portal entry only after `/portal`, `/login`, and `/signup` exist.
   - Keep primary public CTA as "Request a Quote" or "RFQ Cart".

## 8. Recommended Phase 2 Pages To Update

1. `/about`
   - Refine from broad service pitch into true company story.
   - Reduce duplicated content with Solutions and ERP.

2. `/solutions/[slug]`
   - Add stronger per-solution structure: problem, buying context, supported products, workflow, compliance/procurement notes, and CTA.

3. `/products/[category]`
   - Add category education, filters, procurement notes, and related solution pathways.

4. `/product/[slug]`
   - Improve product detail decision layout.
   - Add future-ready sections for subscription, warranty, support, and account-based purchasing where relevant.

5. `/government-procurement/[topic]`
   - Standardize topic page structure and trust language.

6. `/account` and protected `/portal/*`
   - Build after authentication decisions are made.
   - Use dashboard, table, status, empty state, and document-download patterns from the shared design system.

7. `/checkout`
   - Build only after marketplace payment, fulfillment, tax, subscription, and account policies are confirmed.

## 9. Pages That Should Remain Simple

- `/privacy`
- `/terms`
- `/quote`
- `/insights/[slug]`
- `app/loading.tsx`
- `app/error.tsx`
- `app/not-found.tsx`
- `app/products/loading.tsx`
- `app/products/error.tsx`

These pages should prioritize clarity, accessibility, and task completion over visual spectacle. The RFQ cart especially should remain fast, form-friendly, and low-animation.

## 10. Risks

- No customer account entry points exist today, so users cannot naturally access portal, quotation history, order tracking, invoices, subscriptions, or support tickets.
- Header and footer do not currently mention Login, Sign up, Customer Portal, Account, or Checkout.
- Checkout language exists only as "Quote Checkout" in `/quote`, but the page correctly says it is not payment checkout. This naming may confuse users once marketplace checkout is introduced.
- Most pages still use older layout primitives while About and ERP use the newer React Bits-powered premium style.
- Product catalog is RFQ-ready but not yet marketplace-ready.
- Portal features should not be represented as live until authentication, data models, documents, and ERP/customer records are connected.
- Government procurement pages must continue avoiding claims of guaranteed compliance, awards, certification, or legal authority.
- Future checkout has higher risk because it may require pricing rules, supplier availability, tax handling, payment processing, order fulfillment, refunds, renewals, and account permissions.

## 11. Suggested Implementation Order

1. Create Phase 1 public portal/auth entry pages:
   - `/portal`
   - `/login`
   - `/signup`

2. Update navigation and footer:
   - Add "Customer Portal" after the entry pages exist.
   - Keep RFQ Cart and Request a Quote visible.

3. Redesign `/contact`:
   - Make it the central routing page for RFQ, portal access, supplier partnership, ERP interest, government procurement, and general inquiry.

4. Redesign `/solutions`:
   - Bring it to the same premium standard as About and ERP.

5. Redesign `/government-procurement`:
   - Treat it as a flagship trust and credibility page.

6. Upgrade `/products`:
   - Improve catalog discovery and RFQ confidence.
   - Prepare for marketplace/subscription surfaces without adding checkout prematurely.

7. Refine `/about`:
   - Make it a true company story and remove duplicated service-page patterns.

8. Update dynamic detail templates:
   - `/solutions/[slug]`
   - `/products/[category]`
   - `/product/[slug]`
   - `/government-procurement/[topic]`

9. Build protected account and portal shell:
   - `/account`
   - `/portal/rfqs`
   - `/portal/quotations`
   - `/portal/orders`
   - `/portal/invoices`
   - `/portal/subscriptions`
   - `/portal/support`

10. Plan checkout separately:
   - Define marketplace policy, payment model, subscription handling, fulfillment, invoices, and account requirements before implementing `/checkout`.

## Final Assessment

The website has a solid foundation and several strong pages, especially `/erp-platform`, `/about`, and the current homepage. However, the experience is not yet fully consistent with the shared premium HACIEN design system across all pages. The biggest functional gap is the absence of customer account and portal entry points.

Readiness classification: Ready with moderate improvements needed before the website feels like a complete HACIEN ecosystem.

Recommended next prompt:

> Before starting any task, read `shared/SKILL_INDEX.md` and follow the HACIEN AI Framework. Implement Phase 1 customer portal entry pages for `/portal`, `/login`, and `/signup` only. Do not implement real authentication yet. Keep the pages public, compliance-safe, premium, accessible, and aligned with the HACIEN UI Design System. After implementation, run visual QA and `npm run build`, then report git status.
