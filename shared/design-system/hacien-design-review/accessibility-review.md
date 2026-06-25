# Accessibility Review

Review accessibility before production readiness.

## Required Checks

- Keyboard navigation
- Visible focus states
- Semantic HTML or platform-native semantics
- Screen reader compatibility
- Color contrast
- Reduced motion
- Touch target sizes
- Form labels and errors
- Dialog focus management
- Table semantics
- Non-color status indicators

## Questions

- Can the primary task be completed with keyboard only?
- Are focus states visible and logical?
- Are form errors associated with fields?
- Does reduced motion preserve content and functionality?
- Are icon-only controls named?
- Are touch targets usable on mobile?

## Blocking Issues

Treat inaccessible forms, invisible focus, critical contrast failures, keyboard traps, and motion that ignores reduced-motion preferences as high priority.
