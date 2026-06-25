# HACIEN AI Framework Index

Framework Version: `0.1.0`

Release Date: 2026-06-25

Maintainer: HACIEN product and engineering leadership

Last Updated: 2026-06-25

Status: Draft foundation, usable for current planning and review

## Executive Summary

HACIEN has adopted an AI-assisted engineering workflow to ensure consistent architecture, consistent UI, consistent business decisions, reusable engineering knowledge, scalable product development, high-quality implementation, and maintainable documentation.

This framework applies to:

- HACIEN Website
- HACIEN ERP
- Customer Portal
- Marketplace
- Supplier API integrations
- Future Mobile App

This index is the authoritative entry point for future AI agents. Consult it before searching folders or relying on memory.

## Framework Overview

The framework has three major categories.

### 1. Knowledge

Purpose: teach AI what HACIEN is.

Implemented:

- HACIEN Product Knowledge

### 2. Engineering

Purpose: teach AI how work should flow.

Implemented:

- Engineering Workflow

### 3. Design

Purpose: teach AI how HACIEN products should look, behave, and be reviewed.

Implemented:

- HACIEN UI Design System
- HACIEN Design Review

## Current Implemented Skills

### HACIEN Product Knowledge

Status: Implemented, draft

Location: [shared/knowledge/hacien-product/skill.md](knowledge/hacien-product/skill.md)

Folder: `shared/knowledge/hacien-product/`

Purpose: teach AI HACIEN's business model, procurement-first philosophy, mission, vision, personas, workflow, roadmap, terminology, and anti-patterns.

Responsibilities:

- Define business truth.
- Prevent generic ERP, generic e-commerce, and generic reseller assumptions.
- Explain procurement workflow and platform direction.
- Distinguish roadmap items from implemented capabilities.

Inputs:

- User request
- Business/product context
- Existing HACIEN product direction

Outputs:

- Business interpretation
- Product assumptions
- Terminology guidance
- Workflow-aware recommendations

Depends On:

- None

Used By:

- Engineering Workflow
- UI Design System
- Design Review
- Future architecture, security, compliance, marketplace, and ERP skills

Typical Usage:

- Before any planning, design, content, architecture, or implementation decision.

Example prompt:

```text
Use shared/knowledge/hacien-product before planning this HACIEN task. Explain how the request fits HACIEN's procurement-first model and platform roadmap.
```

### Engineering Workflow

Status: Implemented, draft

Location: [shared/ai/engineering-workflow/skill.md](ai/engineering-workflow/skill.md)

Folder: `shared/ai/engineering-workflow/`

Purpose: classify tasks, choose required skills, define execution order, require deliverables, and enforce quality gates.

Responsibilities:

- Route tasks by product surface.
- Define planning, implementation, review, production readiness, and merge lifecycle.
- Coordinate existing and planned skills.
- Prevent implementation before planning.

Inputs:

- User request
- Product Knowledge context
- Existing code/project context

Outputs:

- Task classification
- Skill stack
- Plan
- Required deliverables
- Review and production-readiness gates

Depends On:

- HACIEN Product Knowledge

Used By:

- Every implementation, review, and deployment task

Typical Usage:

- At the start of any software task.

Example prompt:

```text
Use shared/ai/engineering-workflow to classify this HACIEN task, select required skills, define deliverables, and produce a phase-based plan before implementation.
```

### HACIEN UI Design System

Status: Implemented, draft

Location: [shared/design-system/hacien-ui-design-system/skill.md](design-system/hacien-ui-design-system/skill.md)

Folder: `shared/design-system/hacien-ui-design-system/`

Purpose: define HACIEN's shared visual language, UX principles, interaction standards, React Bits guidance, accessibility expectations, performance expectations, and product-specific UI guidance.

Responsibilities:

- Own design language.
- Own React Bits usage rules.
- Own UI foundations: typography, spacing, colors, radius, shadows, motion, icons, components.
- Provide product-specific guidance for website, ERP, portal, marketplace, and mobile.

Inputs:

- Product Knowledge context
- Engineering Workflow classification
- Product surface
- UI task requirements

Outputs:

- UI standards
- Component guidance
- Motion guidance
- Accessibility and performance expectations for UI

Depends On:

- HACIEN Product Knowledge
- Engineering Workflow for task routing

Used By:

- Website UI work
- ERP UI work
- Customer Portal UI work
- Marketplace UI work
- Future Mobile UI work
- Design Review

Typical Usage:

- Before designing or implementing any HACIEN UI.

Example prompt:

```text
Use shared/design-system/hacien-ui-design-system before designing this screen. Apply the core foundations and the relevant product-specific guide.
```

### HACIEN Design Review

Status: Implemented, draft

Location: [shared/design-system/hacien-design-review/skill.md](design-system/hacien-design-review/skill.md)

Folder: `shared/design-system/hacien-design-review/`

Purpose: evaluate whether implemented UI/UX meets HACIEN quality standards before merge.

Responsibilities:

- Review UX, UI, accessibility, performance, consistency, React Bits, conversion, ERP readiness, portal readiness, marketplace readiness, SEO, and security-sensitive UI.
- Score implementation quality.
- Produce production readiness recommendation.

Inputs:

- Implementation diff
- Browser preview or screenshots
- Product surface
- UI Design System standards

Outputs:

- Review report
- Priority issues
- Scores
- Recommendation: ready, minor improvements, major revision, or reject

Depends On:

- HACIEN UI Design System
- HACIEN Product Knowledge

Used By:

- Engineering Workflow review phase
- PR review
- Pre-merge quality gates

Typical Usage:

- After UI implementation and before merge.

Example prompt:

```text
Use shared/design-system/hacien-design-review to review this UI implementation before merge. Provide priority issues, scores, and a production recommendation.
```

## Planned Skills

These are roadmap references only. They are not implemented in `shared/` yet. Future AI agents should not assume they exist.

### High-Value Planned Skills

- Security
- Deployment
- Testing
- Website Architecture
- ERP Architecture
- Marketplace Architecture
- Customer Portal Architecture
- Supplier API
- API Architecture
- BIR PH Compliance

### Medium-Value Planned Skills

- Accessibility
- Performance
- SEO
- Observability
- AI Feature Safety

Planned skills should only be created when the topic becomes repeatedly used and cannot reasonably live inside an existing skill.

## Framework Dependency Diagram

```text
Product Knowledge
        |
        v
Engineering Workflow
        |
        v
Architecture (future)
        |
        v
UI Design System
        |
        v
Implementation
        |
        v
Design Review
        |
        v
Production Readiness
        |
        v
Deployment
```

## Dependency Transitions

- Product Knowledge to Engineering Workflow: understand HACIEN before classifying the task.
- Engineering Workflow to Architecture: route work through the correct product architecture when available.
- Architecture to UI Design System: ensure UI decisions respect product architecture and shared design language.
- UI Design System to Implementation: build with shared tokens, components, interaction rules, and product-specific guidance.
- Implementation to Design Review: evaluate what was built.
- Design Review to Production Readiness: unresolved high-priority findings block readiness.
- Production Readiness to Deployment: deploy only when quality gates, verification, and rollback planning are complete.

## Task Routing Matrix

| Request | Skills |
| --- | --- |
| About Page | Product Knowledge -> Engineering Workflow -> Website Architecture (future) -> UI Design System -> Design Review |
| Homepage | Product Knowledge -> Engineering Workflow -> Website Architecture (future) -> UI Design System -> Design Review -> SEO (future) |
| Product Page | Product Knowledge -> Engineering Workflow -> Website Architecture (future) -> UI Design System -> Design Review -> SEO (future) |
| ERP Dashboard | Product Knowledge -> Engineering Workflow -> ERP Architecture (future) -> UI Design System -> Design Review |
| ERP Inventory | Product Knowledge -> Engineering Workflow -> ERP Architecture (future) -> Security (future) -> Testing (future) |
| Customer Portal Orders | Product Knowledge -> Engineering Workflow -> Customer Portal Architecture (future) -> Security (future) -> UI Design System -> Design Review |
| Marketplace Checkout | Product Knowledge -> Engineering Workflow -> Marketplace Architecture (future) -> Security (future) -> UI Design System -> Design Review -> Testing (future) |
| Supplier API | Product Knowledge -> Engineering Workflow -> Supplier API (future) -> API Architecture (future) -> Security (future) -> Testing (future) |
| BIR Invoice/Receipt | Product Knowledge -> Engineering Workflow -> BIR PH Compliance (future) -> ERP Architecture (future) -> Security (future) -> Testing (future) |
| React Bits Integration | Product Knowledge -> Engineering Workflow -> UI Design System -> Design Review |
| Deployment | Product Knowledge -> Engineering Workflow -> Deployment (future) |

## Skill Creation Policy

Create a new skill only if:

- it captures reusable HACIEN-specific knowledge
- it will be referenced repeatedly
- it cannot reasonably belong in an existing skill
- it has a clear owner and lifecycle
- it improves future AI reliability

Do not create new skills for:

- one-off projects
- temporary implementations
- isolated features
- framework-specific tutorials
- generic programming advice
- rules that belong in an existing skill

Prefer extending existing skills.

## Skill Lifecycle

```text
Draft
-> Review
-> Approved
-> Production
-> Deprecated
-> Archived
```

### Draft

Initial useful version. Can guide work but may contain gaps.

### Review

Being evaluated for consistency, duplication, and real-world usefulness.

### Approved

Accepted as a reliable reference for its domain.

### Production

Required for relevant implementation workflows.

### Deprecated

Replaced or no longer recommended. Must point to replacement guidance.

### Archived

Kept for history only. Should not guide new work.

## Versioning

Use lightweight semantic versioning:

- patch: wording and clarification
- minor: new files or expanded guidance
- major: changed workflow order, ownership, or breaking guidance

Recommended metadata for each skill:

- Framework Version
- Release Date
- Maintainer
- Last Updated
- Changelog
- Deprecation Notes
- Migration Notes

Future changelog location:

```text
shared/AI_FRAMEWORK_CHANGELOG.md
```

Do not create the changelog until there is a real framework release history to track.

## Folder Structure

Current structure:

```text
shared/
|
├── ai/
│   └── engineering-workflow/
|
├── design-system/
│   ├── hacien-ui-design-system/
│   └── hacien-design-review/
|
├── knowledge/
│   └── hacien-product/
|
├── AI_FRAMEWORK_AUDIT.md
└── SKILL_INDEX.md
```

Recommendation: keep this structure for now.

Potential future structure if planned skills are created:

```text
shared/
├── ai/
├── architecture/
├── compliance/
├── design-system/
├── knowledge/
├── security/
└── testing/
```

Do not restructure until those domains have implemented skills.

## Governance

- Every implementation begins with Product Knowledge.
- Every implementation follows Engineering Workflow.
- Every UI follows the UI Design System.
- Every completed UI feature is reviewed using Design Review.
- Do not bypass these steps.
- Do not assume planned skills exist.
- Do not create new skills without meeting the Skill Creation Policy.
- Do not duplicate authoritative guidance when a reference is enough.

## Production Readiness Assessment

| Layer | Status | Rationale |
| --- | --- | --- |
| Knowledge Layer | Mostly Complete | Product Knowledge captures business model, mission, workflow, personas, product philosophy, roadmap, terminology, and anti-patterns. |
| Engineering Layer | Mostly Complete | Engineering Workflow defines lifecycle, routing, deliverables, gates, readiness, and examples, but references planned skills that do not exist yet. |
| Design Layer | Mostly Complete | UI Design System and Design Review cover creation and evaluation across website, ERP, portal, marketplace, and mobile. |
| Governance Layer | In Progress | This index and audit establish governance, but versioning and lifecycle metadata are not yet embedded in each skill. |
| Overall Readiness | Ready with Minor Improvements | The framework is usable as the permanent foundation, but planned skills must be clearly labeled until created. |

## Future Roadmap

High-value future additions only:

1. Add architecture skills before major ERP, website, portal, marketplace, supplier API, or mobile implementation.
2. Add Security and Testing skills before auth, checkout, portal accounts, supplier API, or permission-heavy ERP work.
3. Add BIR PH Compliance before accounting, invoice, official receipt, tax, or reporting implementation.
4. Add Deployment skill before formal production release automation.
5. Add lightweight version metadata to each existing skill after the next framework update.

Avoid expanding framework documentation endlessly. The current framework is mature enough to begin shifting effort toward HACIEN Website, HACIEN ERP, Customer Portal, Marketplace, Supplier API integration, and production implementation.

## Final Recommendation

The HACIEN AI framework is ready to become the permanent foundation for HACIEN development.

Classification: **Ready with Minor Improvements**

Recommended next action: stop broad framework expansion for now. Use the framework on real HACIEN implementation work, and only add new skills when repeated work proves the need.
