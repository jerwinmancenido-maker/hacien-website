import path from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.spec.ts"],
    // The legal and upload specs each boot next dev, which locks one dist directory.
    fileParallelism: false,
  },
});
