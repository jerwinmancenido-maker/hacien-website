# Scoring System

Score every review using 10-point category scores and a 100-point total.

## Categories

```text
Visual Design ........ /10
UX ................... /10
Accessibility ........ /10
Performance .......... /10
Consistency .......... /10
React Bits Usage ..... /10
Professionalism ...... /10
ERP Readiness ........ /10
Website Readiness .... /10
Overall .............. /100
```

If a category is not applicable, score it based on whether the implementation correctly avoids that surface's concerns. Example: an ERP table can score high on Website Readiness if it does not introduce website-specific problems, but explain the basis.

## Recommendation Bands

- 90-100: Ready for Production
- 75-89: Minor Improvements Recommended
- 55-74: Major Revision Required
- 0-54: Reject

## Override Rule

Any high-priority accessibility, security, destructive-action, checkout, RFQ, approval, or data-loss issue can downgrade the recommendation regardless of total score.
