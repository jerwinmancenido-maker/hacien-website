import "dotenv/config";
import { defineConfig } from "prisma/config";

const DEV_FALLBACK_URL =
  "mysql://user:password@127.0.0.1:3306/hacien_website";

/**
 * Resolve the Prisma CLI datasource URL.
 * Production: fail closed — never fall back to a default or local URL.
 * Dev/test: keep the throwaway local fallback (unchanged).
 *
 * Build note: `prisma generate` (postinstall / prebuild) does not require a
 * datasource URL under Prisma 7. When NODE_ENV=production and DATABASE_URL is
 * unset during generate, omit datasource instead of substituting a local URL
 * so Hostinger `next build` stays green without secrets.
 */
export function resolvePrismaDatasourceUrl(): string {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "DATABASE_URL is required in production. Refusing to fall back to a default or local MySQL URL.",
    );
  }
  return DEV_FALLBACK_URL;
}

function datasourceForConfig(): { url: string } | undefined {
  if (process.env.DATABASE_URL) {
    return { url: process.env.DATABASE_URL };
  }

  if (process.env.NODE_ENV === "production") {
    // Fail closed on silent local fallback. `prisma generate` still works with
    // datasource omitted; migrate/db/studio paths that need a URL should call
    // resolvePrismaDatasourceUrl() (or set DATABASE_URL) and will throw here
    // when the config is evaluated for a non-generate production CLI.
    if (process.argv.includes("generate")) {
      return undefined;
    }
    return { url: resolvePrismaDatasourceUrl() };
  }

  return { url: DEV_FALLBACK_URL };
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: datasourceForConfig(),
});
