# @prisma/streams-local stub (Hostinger / Node 20)

Prisma CLI 7.x pulls `@prisma/streams-local` via `@prisma/dev` for local Prisma
Streams workflows. That package declares `engines.node: >=22.0.0`, which
produces `EBADENGINE` on Hostinger's Node 20.20.2.

This website does not use Prisma Streams. The stub keeps the same package name
and version with `engines.node: >=20.19.0` so `npm ci` stays clean on Node 20
without changing Prisma Client runtime behavior (`@prisma/client` +
`@prisma/adapter-mariadb`).
