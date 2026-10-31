import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

const globalCache = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

export function assertDatabaseConfigured() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is required for website-local ecommerce account features. Use the Hostinger MySQL connection string, not the ERP Neon PostgreSQL URL.",
    );
  }
}

function createPrismaClient() {
  // Adapter accepts a mysql:// URL string (mariadb PoolConfig | string).
  // Module load must not require a live DB; connection is established on first query.
  const adapter = new PrismaMariaDb(
    process.env.DATABASE_URL ??
      "mysql://user:password@127.0.0.1:3306/hacien_website",
  );

  return new PrismaClient({
    adapter,
    log: ["error", "warn"],
  });
}

export const prisma = globalCache.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalCache.prisma = prisma;
}
