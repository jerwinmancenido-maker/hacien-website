# Shadows

Shadows should communicate elevation and focus, not decoration.

## Shared Rules

- Use subtle shadows on website cards and CTA panels.
- Use minimal shadows in ERP; prefer borders and surface contrast.
- Avoid heavy glow around tables, forms, reports, and checkout.
- Do not stack shadows inside nested cards.
- Keep shadows consistent by elevation level.

## Suggested Elevation Roles

- none: tables, flat panels, dense ERP sections
- low: cards, inputs on light backgrounds
- medium: dropdowns, popovers, sticky bars
- high: modals, drawers, command palettes
- glow: public website CTA or premium card emphasis only

## Future Tokens

Create `tokens/shadows.json` later with named elevation values and product-specific intensity rules.
