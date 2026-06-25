---
name: hacien-design-review
description: Shared HACIEN AI Design Review skill for evaluating UI/UX implementations before merge across the public website, HACIEN ERP, customer portal, marketplace/product checkout, supplier API product pages, and future mobile app. Use after implementation or during PR review to assess UX, visual hierarchy, UI consistency, accessibility, performance, React Bits usage, conversion, ERP usability, portal usability, marketplace usability, SEO, security-sensitive UI, maintainability, scoring, and production readiness against the HACIEN UI Design System.
---

# HACIEN Design Review

Use this skill to review UI/UX implementations before they are considered complete. This skill evaluates what was built. It does not replace the [HACIEN UI Design System](../hacien-ui-design-system/skill.md), which defines how HACIEN UI should be built.

## Review Role

Act as a combined UX Lead, Product Designer, Accessibility Reviewer, Performance Engineer, Frontend Architect, and product-quality reviewer.

Ask:

- Would this meet a Linear, Stripe, Vercel, Notion, Clerk, or Raycast-level quality bar?
- Does it feel cohesive with the HACIEN ecosystem?
- Does it improve customer or operator experience?
- Is the interface intuitive?
- Is the implementation maintainable?
- Is it ready to ship?

## Required Review Flow

1. Inspect the implementation, screenshots, code, browser preview, or PR diff.
2. Load [review-workflow.md](review-workflow.md).
3. Load the relevant product review file: website, ERP, portal, marketplace, or mobile-equivalent guidance from the UI Design System.
4. Compare against the shared HACIEN UI Design System.
5. Evaluate visual hierarchy, UX, consistency, accessibility, performance, React Bits, security-sensitive UI, and product-specific readiness.
6. Score the implementation using [scoring-system.md](scoring-system.md).
7. Produce the required review output format.

## Reference Map

- [review-workflow.md](review-workflow.md): review sequence and output format.
- [ux-review.md](ux-review.md): navigation, journey, task completion, cognitive load.
- [ui-review.md](ui-review.md): visual hierarchy, layout, typography, polish.
- [accessibility-review.md](accessibility-review.md): keyboard, focus, contrast, semantics, motion, touch.
- [performance-review.md](performance-review.md): bundle, assets, animation cost, loading.
- [reactbits-review.md](reactbits-review.md): React Bits suitability, restraint, reuse.
- [consistency-review.md](consistency-review.md): alignment with HACIEN UI Design System.
- [conversion-review.md](conversion-review.md): website trust, CTA, RFQ, product discovery.
- [erp-review.md](erp-review.md): operational workflows, tables, forms, dashboards.
- [website-review.md](website-review.md): public website and SEO-adjacent quality.
- [customer-portal-review.md](customer-portal-review.md): self-service account workflows.
- [marketplace-review.md](marketplace-review.md): product discovery, checkout, subscriptions.
- [security-review.md](security-review.md): UI risks around sensitive data and permissions.
- [seo-review.md](seo-review.md): metadata, headings, links, performance.
- [implementation-checklist.md](implementation-checklist.md): final review checklist.
- [scoring-system.md](scoring-system.md): scoring and recommendation thresholds.
- [anti-patterns.md](anti-patterns.md): rejection patterns.
- [prompts.md](prompts.md): reusable review prompts.

## Required Output Format

Every review should include:

1. Executive Summary
2. Strengths
3. Weaknesses
4. High Priority Issues
5. Medium Priority Issues
6. Low Priority Suggestions
7. Accessibility Notes
8. Performance Notes
9. React Bits Evaluation
10. Final Score
11. Recommendation

## Relationship With Other Skills

Use this skill alongside:

- HACIEN UI Design System
- HACIEN ERP Architecture
- HACIEN Website Architecture
- HACIEN Marketplace
- HACIEN Customer Portal
- HACIEN BIR PH Compliance, when applicable

Do not duplicate those skills. Evaluate implementations against them.
