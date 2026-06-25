# Security Review

Review UI issues that can affect security, privacy, or operational safety.

## Check

- Sensitive information exposure
- Permission visibility
- Confirmation dialogs
- Destructive actions
- Session UX
- Password/auth flows
- Account switching
- Role/permission indicators
- Export/download warnings
- Audit trail visibility

## Questions

- Could sensitive data be exposed unnecessarily?
- Are destructive actions clearly confirmed?
- Does the user understand which account or role is active?
- Are permissions visible where decisions depend on them?
- Are exports, invoices, account data, and supplier data handled carefully?

## High Priority

Treat accidental sensitive data exposure, ambiguous destructive actions, unclear permission state, and unsafe session UX as high priority.
