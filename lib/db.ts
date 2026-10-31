import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import type { PoolConfig } from "mariadb";
import { PrismaClient } from "../generated/prisma/client";

/** Shared-hosting MariaDB pool caps (driver PoolConfig option names). */
export const SHARED_HOSTING_POOL_OPTIONS = {
  connectionLimit: 3,
  minimumIdle: 0,
} as const;

const DEV_FALLBACK_URL =
  "mysql://user:password@127.0.0.1:3306/hacien_website";

const globalCache = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

let prismaClient: PrismaClient | undefined;

export function assertDatabaseConfigured() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is required for website-local ecommerce account features. Use the Hostinger MySQL connection string, not the ERP Neon PostgreSQL URL.",
    );
  }
}

/**
 * Resolve the runtime database URL.
 * Production: fail closed — never fall back to a default or local URL.
 * Dev/test: keep the throwaway local fallback (unchanged).
 */
export function resolveDatabaseUrl(): string {
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

/** Build mariadb PoolConfig with shared-hosting pool limits. */
export function buildMariaDbPoolConfig(databaseUrl: string): PoolConfig {
  const normalized = databaseUrl.replace(/^mysql:/i, "mariadb:");
  const url = new URL(normalized);
  const database = url.pathname.replace(/^\//, "");

  return {
    host: url.hostname || "localhost",
    port: url.port ? Number(url.port) : 3306,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    ...(database ? { database } : {}),
    connectionLimit: SHARED_HOSTING_POOL_OPTIONS.connectionLimit,
    minimumIdle: SHARED_HOSTING_POOL_OPTIONS.minimumIdle,
  };
}

function createPrismaClient() {
  // Adapter accepts PoolConfig | Pool | string. Use PoolConfig so connectionLimit /
  // minimumIdle are real driver options. Connection is established on first query.
  const adapter = new PrismaMariaDb(
    buildMariaDbPoolConfig(resolveDatabaseUrl()),
  );

  return new PrismaClient({
    adapter,
    log: ["error", "warn"],
  });
}

function getPrismaClient(): PrismaClient {
  if (globalCache.prisma) {
    return globalCache.prisma;
  }
  if (prismaClient) {
    return prismaClient;
  }

  prismaClient = createPrismaClient();
  if (process.env.NODE_ENV !== "production") {
    globalCache.prisma = prismaClient;
  }
  return prismaClient;
}

/**
 * Lazy Prisma client: resolve DATABASE_URL and create the adapter only on first
 * use, not at import time. Keeps `next build` (NODE_ENV=production, no
 * DATABASE_URL) safe if this module is evaluated during the build graph.
 */
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getPrismaClient();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
