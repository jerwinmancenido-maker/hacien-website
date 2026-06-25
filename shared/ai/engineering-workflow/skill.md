---
name: engineering-workflow
description: Master HACIEN AI engineering orchestration skill for classifying software requests and coordinating existing HACIEN skills across the public website, ERP, customer portal, marketplace, supplier API integrations, and future mobile app. Use before planning, implementing, reviewing, deploying, or preparing production work to decide required skills, execution order, deliverables, quality gates, reviews, production readiness, and merge criteria.
---

# HACIEN Engineering Workflow

Use this skill at the start of every HACIEN software task. It is the project-management and orchestration layer for future AI agents.

This skill does not replace domain skills. It decides which skills are needed, when to use them, what deliverables are required, and which reviews must happen before production.

## Product Scope

Coordinate engineering work across:

- Public Website
- HACIEN ERP
- Customer Portal
- Marketplace
- Supplier API Integrations
- Future Mobile App

## Core Lifecycle

Every implementation follows:

1. Planning
2. Implementation
3. Review
4. Production Readiness
5. Merge

Do not implement before planning unless the user explicitly asks for a tiny mechanical fix and the risk is clearly low.

## Required Reference Files

- [task-classification.md](task-classification.md): classify the request.
- [decision-tree.md](decision-tree.md): route work to skills.
- [required-skills.md](required-skills.md): choose skill stack.
- [planning-workflow.md](planning-workflow.md): planning phase.
- [implementation-workflow.md](implementation-workflow.md): implementation phase.
- [review-workflow.md](review-workflow.md): review phase.
- [deployment-workflow.md](deployment-workflow.md): deployment and release preparation.
- [deliverables.md](deliverables.md): expected outputs by phase.
- [quality-gates.md](quality-gates.md): required checks.
- [production-readiness.md](production-readiness.md): final production criteria.
- [anti-patterns.md](anti-patterns.md): behaviors to reject.
- [prompts.md](prompts.md): reusable prompts.
- [examples.md](examples.md): common task routing examples.

## Existing Skills

Reference existing skills instead of duplicating them:

- HACIEN UI Design System
- HACIEN Design Review
- HACIEN ERP Architecture
- HACIEN Website Architecture
- HACIEN Marketplace
- HACIEN Customer Portal
- HACIEN Supplier API
- HACIEN Security
- HACIEN Performance
- HACIEN Accessibility
- HACIEN BIR PH Compliance
- HACIEN Testing
- HACIEN Deployment

If a needed skill does not exist, recommend creating it instead of inventing detailed rules here.

## Final Rule

No implementation is production-ready until required architecture, design, accessibility, performance, security, testing, documentation, consistency, React Bits, component reuse, and maintainability gates are satisfied.
