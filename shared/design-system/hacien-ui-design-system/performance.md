# Performance

Performance is a trust signal. Website should feel premium and fast. ERP, portal, marketplace, checkout, and mobile should feel instant and stable.

## Rules

- Avoid unnecessary dependencies.
- Prefer CSS animation when enough.
- Lazy-load heavy visual components.
- Do not lazy-load critical forms or checkout actions in a way that delays work.
- Avoid layout shift.
- Avoid large background effects in operational products.
- Keep table/filter/search interactions responsive.
- Verify bundle impact before adding animation libraries.

## React Bits Performance

Use only the needed React Bits pattern. Convert it into a reusable HACIEN wrapper. Avoid importing large libraries for one effect.

## Checks

Run available build, type, lint, test, and browser checks. For important UI, inspect desktop and mobile.
