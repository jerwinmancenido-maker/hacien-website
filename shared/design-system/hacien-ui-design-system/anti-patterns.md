# Anti-Patterns

Avoid these across HACIEN products.

## Visual

- gaming style
- neon-heavy styling
- portfolio layouts
- generic reseller templates
- one-note palettes
- nested cards
- oversized dashboard typography
- low contrast text
- inconsistent spacing/radius
- decorative page-section cards

## Motion

- excessive particles
- bouncing cards
- random motion
- confusing parallax
- loops in ERP workflows
- animation that delays forms, checkout, login, RFQ, approvals, tables, or reports
- animation that ignores reduced motion

## React Bits

- forcing React Bits
- pasting animation code into product screens
- duplicate animation wrappers
- website-level motion inside ERP
- decorative animation around financial/accounting/inventory data

## Implementation

- hardcoded product-specific paths in shared docs
- framework assumptions in core docs
- changing global styles without auditing impact
- creating one-off components that should be shared
- ignoring mobile, accessibility, performance, or keyboard behavior
