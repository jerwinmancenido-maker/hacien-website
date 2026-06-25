# Motion

Motion should clarify state, guide attention, and support trust. It must never slow down work.

## Shared Principles

- Fast
- Natural
- Professional
- Purposeful
- Interruptible where possible
- Reduced-motion safe

## Website Motion

Website motion may support:

- hero reveal
- section reveal
- marquee
- circular CTA
- animated cards
- subtle gradient backgrounds
- premium CTA transitions

## Operational Motion

ERP, portal, marketplace, checkout, reports, and admin motion should support:

- loading states
- hover/focus feedback
- empty states
- workflow status changes
- progress feedback
- dashboard reveal on first load only

## Restrictions

Do not use expressive marketing animation inside operational workflows. Avoid loops in ERP. Do not animate layout in ways that cause shift or slow input.

## Reduced Motion

All motion must respect `prefers-reduced-motion`. Content should remain immediately available when reduced motion is enabled.

## Future Tokens

Create `tokens/motion.json` later with durations, easing, distances, and allowed motion intensity by product surface.
