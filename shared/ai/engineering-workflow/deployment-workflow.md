# Deployment Workflow

Use this for release, production readiness, hosting, environment, migration, and rollback planning.

## Required Steps

1. Identify target product and environment.
2. Confirm build and runtime requirements.
3. Confirm environment variables and secrets.
4. Confirm migrations or data changes.
5. Confirm deployment method.
6. Define verification checklist.
7. Define rollback strategy.
8. Document release notes or operator notes when needed.

## Deliverables

- Deployment notes
- Migration notes
- Rollback strategy
- Verification checklist
- Known risks
- Post-deploy monitoring points

## Rule

Do not deploy or recommend deploy if production readiness gates are unresolved.
