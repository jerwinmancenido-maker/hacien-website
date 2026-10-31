import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const migrationDir = join(
  rootDir,
  "prisma",
  "migrations",
  "0001_init_hostinger_mysql",
);
const migrationFile = join(migrationDir, "migration.sql");

const env = {
  ...process.env,
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "mysql://user:password@127.0.0.1:3306/hacien_website",
};

const sql = execFileSync(
  "npx",
  [
    "prisma",
    "migrate",
    "diff",
    "--from-empty",
    "--to-schema",
    "prisma/schema.prisma",
    "--script",
  ],
  {
    cwd: rootDir,
    env,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  },
);

mkdirSync(migrationDir, { recursive: true });
writeFileSync(migrationFile, sql);

console.log(`Generated ${migrationFile}`);
