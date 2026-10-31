import { afterEach, describe, expect, it } from "vitest";

import {
  SHARED_HOSTING_POOL_OPTIONS,
  buildMariaDbPoolConfig,
  resolveDatabaseUrl,
} from "@/lib/db";
import { resolvePrismaDatasourceUrl } from "../../prisma.config";

const env = process.env as Record<string, string | undefined>;
const ORIGINAL_NODE_ENV = env.NODE_ENV;
const ORIGINAL_DATABASE_URL = env.DATABASE_URL;

function setNodeEnv(value: string | undefined) {
  if (value === undefined) {
    delete env.NODE_ENV;
  } else {
    env.NODE_ENV = value;
  }
}

function setDatabaseUrl(value: string | undefined) {
  if (value === undefined) {
    delete env.DATABASE_URL;
  } else {
    env.DATABASE_URL = value;
  }
}

afterEach(() => {
  setNodeEnv(ORIGINAL_NODE_ENV);
  setDatabaseUrl(ORIGINAL_DATABASE_URL);
});

describe("shared-hosting MariaDB pool options", () => {
  it("passes connectionLimit 3 and minimumIdle 0", () => {
    expect(SHARED_HOSTING_POOL_OPTIONS).toEqual({
      connectionLimit: 3,
      minimumIdle: 0,
    });

    const config = buildMariaDbPoolConfig(
      "mysql://app:secret@127.0.0.1:3306/hacien_website",
    );

    expect(config.connectionLimit).toBe(3);
    expect(config.minimumIdle).toBe(0);
    expect(config.host).toBe("127.0.0.1");
    expect(config.port).toBe(3306);
    expect(config.user).toBe("app");
    expect(config.database).toBe("hacien_website");
    // Never assert password value into logs; only confirm it was parsed.
    expect(typeof config.password).toBe("string");
    expect(config.password?.length).toBeGreaterThan(0);
  });
});

describe("lib/db resolveDatabaseUrl fail-closed", () => {
  it("throws in production when DATABASE_URL is unset", () => {
    setNodeEnv("production");
    setDatabaseUrl(undefined);

    expect(() => resolveDatabaseUrl()).toThrow(
      /DATABASE_URL is required in production/,
    );
    expect(() => resolveDatabaseUrl()).toThrow(
      /Refusing to fall back to a default or local MySQL URL/,
    );
  });

  it("returns DATABASE_URL in production when set", () => {
    setNodeEnv("production");
    setDatabaseUrl("mysql://app:secret@127.0.0.1:3306/hacien_website");

    expect(resolveDatabaseUrl()).toBe(
      "mysql://app:secret@127.0.0.1:3306/hacien_website",
    );
  });

  it("keeps non-production throwaway fallback when unset", () => {
    setNodeEnv("development");
    setDatabaseUrl(undefined);

    expect(resolveDatabaseUrl()).toBe(
      "mysql://user:password@127.0.0.1:3306/hacien_website",
    );
  });
});

describe("prisma.config resolvePrismaDatasourceUrl fail-closed", () => {
  it("throws in production when DATABASE_URL is unset", () => {
    setNodeEnv("production");
    setDatabaseUrl(undefined);

    expect(() => resolvePrismaDatasourceUrl()).toThrow(
      /DATABASE_URL is required in production/,
    );
    expect(() => resolvePrismaDatasourceUrl()).toThrow(
      /Refusing to fall back to a default or local MySQL URL/,
    );
  });

  it("returns DATABASE_URL in production when set", () => {
    setNodeEnv("production");
    setDatabaseUrl("mysql://app:secret@127.0.0.1:3306/hacien_website");

    expect(resolvePrismaDatasourceUrl()).toBe(
      "mysql://app:secret@127.0.0.1:3306/hacien_website",
    );
  });

  it("keeps non-production throwaway fallback when unset", () => {
    setNodeEnv("test");
    setDatabaseUrl(undefined);

    expect(resolvePrismaDatasourceUrl()).toBe(
      "mysql://user:password@127.0.0.1:3306/hacien_website",
    );
  });
});
