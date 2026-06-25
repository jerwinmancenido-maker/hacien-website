---
name: hacien-ui-design-system
description: Product-agnostic HACIEN Design System for the public website, HACIEN ERP, customer portal, marketplace/product checkout, supplier API product pages, and future mobile app. Use before planning, implementing, or reviewing any HACIEN UI/UX work so typography, colors, spacing, radius, shadows, motion, React Bits usage, components, accessibility, performance, forms, tables, dashboards, navigation, checkout, RFQ, reports, and interaction patterns remain consistent across separate codebases.
---

# HACIEN Design System

Use this skill before any HACIEN UI planning, implementation, redesign, review, or QA task.

This is a shared, product-agnostic design system. It is not owned by the public website or ERP codebase. Apply it across:

- HACIEN public website
- HACIEN ERP
- Customer Portal
- Marketplace and product checkout
- Supplier API product pages
- Future mobile app

## Core Rule

Start with shared foundations, then apply product-specific guidance.

1. Load the relevant core files: foundations, components, accessibility, performance, anti-patterns, checklist.
2. Load the relevant product guide: website, ERP, customer portal, marketplace, or mobile.
3. Follow the active product's framework conventions.
4. Use the active project's shared UI/component folder.
5. Apply core tokens consistently across projects.
6. Keep React Bits purposeful, reusable, accessible, and performance-conscious.

## Reference Map

- [brand-positioning.md](brand-positioning.md): HACIEN brand intent and product ecosystem.
- [core-design-principles.md](core-design-principles.md): shared design philosophy.
- [typography.md](typography.md): type hierarchy and density.
- [spacing.md](spacing.md): layout rhythm and density guidance.
- [colors.md](colors.md): color palette and semantic color use.
- [radius.md](radius.md): border radius scale.
- [shadows.md](shadows.md): elevation and depth rules.
- [motion.md](motion.md): shared motion language.
- [icons.md](icons.md): icon style and usage.
- [components.md](components.md): shared component philosophy.
- [forms-tables-dashboards.md](forms-tables-dashboards.md): operational UI standards.
- [reactbits.md](reactbits.md): React Bits rules by surface.
- [website-guidelines.md](website-guidelines.md): public website guidance.
- [erp-guidelines.md](erp-guidelines.md): ERP guidance.
- [customer-portal-guidelines.md](customer-portal-guidelines.md): portal guidance.
- [marketplace-guidelines.md](marketplace-guidelines.md): marketplace and checkout guidance.
- [mobile-guidelines.md](mobile-guidelines.md): future mobile guidance.
- [accessibility.md](accessibility.md): accessibility requirements.
- [performance.md](performance.md): performance requirements.
- [anti-patterns.md](anti-patterns.md): prohibited choices.
- [implementation-checklist.md](implementation-checklist.md): mandatory workflow.
- [prompts.md](prompts.md): reusable prompts.

## Design Token Roadmap

Do not invent disconnected values per project. Until token files exist, document any new value and keep it consistent with the core foundations.

Future token files should live near the shared design system:

```text
tokens/
├── colors.json
├── typography.json
├── spacing.json
├── radius.json
├── shadows.json
└── motion.json
```

Do not create a token package until both website and ERP implementation needs are audited.
