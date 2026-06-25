# Review Workflow

Use this sequence for every HACIEN design review.

## Inputs

Gather the available evidence:

- implementation diff
- running browser preview
- screenshots or recordings
- route/module context
- product surface: website, ERP, portal, marketplace, supplier API page, or mobile
- related user journey
- relevant HACIEN UI Design System files

## Review Steps

1. Identify the product surface and primary user goal.
2. Inspect visual hierarchy and first impression.
3. Inspect UX flow and task completion.
4. Compare UI against the HACIEN UI Design System.
5. Review React Bits and motion usage.
6. Review accessibility.
7. Review performance.
8. Review product-specific needs.
9. Review security-sensitive UI.
10. Review SEO for website pages.
11. Score the work.
12. Produce a recommendation.

## Required Output

Use this format:

```text
Executive Summary
Strengths
Weaknesses
High Priority Issues
Medium Priority Issues
Low Priority Suggestions
Accessibility Notes
Performance Notes
React Bits Evaluation
Final Score
Recommendation
```

## Severity

- High: blocks production readiness or materially harms UX, accessibility, trust, security, conversion, or operations.
- Medium: should be fixed soon; noticeable quality, consistency, or maintainability issue.
- Low: polish or future improvement.
