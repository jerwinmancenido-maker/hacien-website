import { describe, expect, it } from "vitest";

import nextConfig from "@/next.config";

describe("config redirects (www F15, /technology taxonomy merge)", () => {
  it("configures host redirect from www.haciensolutions.com to https://haciensolutions.com", async () => {
    expect(nextConfig.redirects).toBeDefined();
    const redirects = await nextConfig.redirects!();
    expect(redirects).toContainEqual({
      source: "/:path*",
      has: [{ type: "host", value: "www.haciensolutions.com" }],
      destination: "https://haciensolutions.com/:path*",
      permanent: true,
    });
  });

  it("configures a permanent redirect from /technology to /products", async () => {
    const redirects = await nextConfig.redirects!();
    expect(redirects).toContainEqual({
      source: "/technology",
      destination: "/products",
      permanent: true,
    });
  });
});
