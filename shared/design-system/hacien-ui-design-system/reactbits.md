# React Bits

Official references:

- https://reactbits.dev/
- https://github.com/DavidHDev/react-bits

React Bits is part of the HACIEN design system, but it is not mandatory. It should never be forced.

## Required Questions

Every React Bits usage must answer:

1. Does it improve usability?
2. Does it support hierarchy?
3. Does it preserve performance?
4. Does it respect accessibility?
5. Is it reusable?

If the answer is not clearly yes, do not use it.

## Shared Implementation Rule

Never paste React Bits code directly into a product screen, route, page, module, or workflow file. Create reusable wrappers in the active project's shared UI/component folder and follow that project's framework conventions.

## Website Usage

Website may use React Bits more visibly:

- hero reveal
- text reveal
- blur reveal
- split text
- circular CTA
- marquee
- spotlight background
- gradient background
- hover cards
- animated workflow
- animated borders
- section reveal
- premium CTA transitions

## ERP Usage

ERP should use React Bits only for restrained micro-interactions:

- subtle loading states
- hover states
- empty states
- dashboard card reveal
- workflow status transitions
- progress feedback

Do not use expressive marketing animations inside ERP workflows, forms, tables, accounting pages, inventory pages, approvals, checkout, login, or keyboard-heavy tasks.

## Portal, Marketplace, Mobile Usage

Portal: use subtle confirmations, loading states, and workflow feedback.

Marketplace: use product discovery and checkout-safe interactions only.

Mobile: use minimal touch-friendly motion that does not delay actions.

## Dependency Guidance

Prefer CSS and IntersectionObserver when enough. Use animation libraries only when they improve orchestration or maintainability. Avoid large dependencies for one decorative effect.
