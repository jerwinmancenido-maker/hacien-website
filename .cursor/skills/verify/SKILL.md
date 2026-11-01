---
name: verify
description: Run before every push. Confirms Node 20 checks pass and real output is ready for the PR body.
---

# Verify (before every push)

Authority: [AGENTS.md](../../../AGENTS.md) — Checks, UI changes, Content & secrets. Do not duplicate; follow that file when it already states the rule.

## Commands (Node 20)

Exact `package.json` / lockfile commands. Exit **0** for each:

```bash
npm ci
npm run lint
npx tsc --noEmit
npm test
npm run build
```

| Step | Passing looks like |
|---|---|
| `npm ci` | Exit 0; respects `.npmrc` `legacy-peer-deps=true` |
| `npm run lint` | Exit 0; 0 errors (and 0 warnings when clean) |
| `npx tsc --noEmit` | Exit 0; 0 TypeScript errors |
| `npm test` | Exit 0; Vitest reports file + test counts (e.g. `N` files / `M` tests) |
| `npm run build` | Exit 0; `prebuild` runs `validate` then `prisma generate`, then `next build --webpack` completes |

## Database

Per [AGENTS.md](../../../AGENTS.md): `prisma generate` does not need `DATABASE_URL` under Prisma 7. If a local tool still asks, use only the dummy  
`mysql://user:password@127.0.0.1:3306/hacien_website` — **never** a real URL.  
Never run `db:migrate`, `db:deploy`, `db:seed`, or other DB write scripts against real data.

## Visual changes

For any visual change, attach **390px** and **1280px** before/after screenshots of affected routes.

## PR body

Paste the **real** command output (exit codes, lint/tsc result, Vitest file/test counts, build including prebuild validate) into the PR body. Do not invent counts.
