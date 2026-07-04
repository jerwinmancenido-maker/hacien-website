import { PrismaClient } from "@prisma/client";

const globalCache = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

export function assertDatabaseConfigured() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required for ecommerce account features.");
  }
}

export const prisma =
  globalCache.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalCache.prisma = prisma;
}
