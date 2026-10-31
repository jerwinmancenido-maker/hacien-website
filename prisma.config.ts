import "dotenv/config";
import { defineConfig } from "prisma/config";

// Throwaway / CLI fallback only — never a live production URL.
const datasourceUrl =
  process.env.DATABASE_URL ??
  "mysql://user:password@127.0.0.1:3306/hacien_website";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: datasourceUrl,
  },
});
