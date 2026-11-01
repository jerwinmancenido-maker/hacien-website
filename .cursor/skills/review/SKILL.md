---
name: review
description: Review mode for the CTO reviewer. Read-only checklist against the brief, verify evidence, brand, and high-risk surfaces.
---

# Review (CTO / read-only)

Authority: [AGENTS.md](../../../AGENTS.md) — Workflow, Brand, Content & secrets, Diff discipline. Link there; do not restate at length.

**Read-only:** never push, merge, or deploy.

## Checklist

1. Diff matches the brief — nothing extra.
2. Smallest diff; no new dependencies or abstractions unless the brief requires them.
3. [verify](../verify/SKILL.md) output is present in the PR body and green.
4. Visual changes include **390px** and **1280px** before/after screenshots.
5. No secrets, keys, tokens, real customer data, or invented company/legal/price claims.
6. HACIEN brand: black/white, one blue accent `#2563EB`, hover `#1D4ED8`, red only for errors/overdue, no boxy clutter, AA contrast (see [AGENTS.md](../../../AGENTS.md) Brand).
7. HACIEN kept separate from PepStack (copy, branding, config).
8. **HIGH RISK** — look extra hard at CSP, middleware, `next.config`, redirects, forms/anti-spam, payments or checkout.

## Output format

One batched list of findings, then one merge line:

```text
- path/file.ts:42 — what — why — fix
Merge-ready: yes
```

or `Merge-ready: no` when any blocking finding remains.
