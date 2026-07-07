# HACIEN Website Hostinger MySQL

## Purpose

The website database is a Hostinger MySQL database for website-local ecommerce and account state:

- customer signup shell
- carts
- storefront cache
- order intent UI state
- manual or sandbox payment records
- support and RFQ references surfaced by the website

Do not use this database as the ERP source of truth for official inventory, quotations, invoices, receipts, tax records, or fulfillment.

## Local Commands

Validate the Prisma schema:

```bash
npm run db:validate
```

Generate the reviewable Hostinger MySQL init migration:

```bash
npm run db:migration:hostinger
```

Check a configured Hostinger MySQL connection:

```bash
DATABASE_URL='mysql://USER:PASSWORD@HOST:3306/DATABASE' npm run db:check
```

Apply committed migrations only after Jerwin approves the database target:

```bash
DATABASE_URL='mysql://USER:PASSWORD@HOST:3306/DATABASE' npm run db:deploy
```

Seed the fallback ecommerce products only after the schema exists:

```bash
DATABASE_URL='mysql://USER:PASSWORD@HOST:3306/DATABASE' npm run db:seed
```

## Safety Rules

- Never commit a real `DATABASE_URL`.
- Never use the ERP Neon PostgreSQL URL for the website database.
- Do not run `db:deploy` or `db:seed` against production without explicit approval.
- Keep generated SQL in `prisma/migrations/0001_init_hostinger_mysql/migration.sql` in sync with `prisma/schema.prisma`.
