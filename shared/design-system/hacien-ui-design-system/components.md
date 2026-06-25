# Components

Build shared components before local one-offs. Components should be reusable across products when interaction and semantics match, even if visual density varies.

## General Rules

- Use typed props where the framework supports them.
- Support variants only for real product needs.
- Keep accessibility built in.
- Keep responsive behavior built in.
- Keep loading, disabled, error, and empty states explicit.
- Use the active project's shared UI/component folder.
- Follow the active product's framework conventions.

## Buttons

Variants:

- primary
- secondary
- outline
- ghost
- destructive

Buttons require stable sizing, visible focus, clear labels, disabled/loading states, and predictable placement.

## Cards

Cards are for repeated items, dashboard metrics, focused panels, workflows, modals, and grouped form/report content.

Avoid nested cards and decorative page-section cards.

## Dialogs, Modals, Drawers

Use for focused decisions or secondary workflows:

- clear title
- concise body
- visible close/cancel
- focus trapping
- escape behavior
- non-destructive default where appropriate
- destructive confirmation when needed

## Notifications, Toasts, Alerts

Use:

- toast for temporary confirmation
- inline alert for form or page-level issues
- banner for system-wide notices
- modal only for blocking decisions

Do not use toast as the only place to show critical errors.

## Badges and Pills

Use for statuses, categories, counts, approval states, subscription state, stock state, and workflow progress. Pair color with readable text.

## Navigation

Navigation must be predictable:

- website: clear top navigation and CTA path
- ERP: sidebar/topbar patterns for frequent modules
- portal: account-first navigation
- marketplace: category/search/cart/account navigation
- mobile: simplified navigation and visible primary actions

## Breadcrumbs

Use breadcrumbs for deep catalog, ERP, portal, and marketplace paths where backtracking matters.

## Pagination

Use pagination or virtualized loading for large datasets. Preserve filters and search state.

## Search and Filters

Filters should be visible, resettable, and understandable. Search should clearly communicate scope.

## Empty and Loading States

Empty states should explain what is missing and what to do next. Loading states should be calm, accessible, and not block primary controls longer than necessary.

## Destructive Actions

Destructive actions require clear labels, visual distinction, confirmation for high-impact changes, and recovery guidance when possible.
