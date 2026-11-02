import { describe, expect, it } from "vitest";

import { metadata as accessMetadata } from "@/app/access/page";
import sitemap from "@/app/sitemap";
import { buildSearchIndex, searchCatalog } from "@/lib/search-index";

describe("/access stays reachable and unlisted", () => {
  it("noindexes the page and leaves it out of the sitemap", () => {
    expect(accessMetadata.robots).toEqual({ index: false, follow: false });

    const urls = sitemap().map((entry) => entry.url);
    expect(urls.some((url) => url.endsWith("/access") || url.includes("/access/"))).toBe(false);
  });

  it("does not return /access from on-site search", () => {
    const index = buildSearchIndex();
    expect(index.some((item) => item.href === "/access" || item.href.startsWith("/access/"))).toBe(false);
    expect(searchCatalog("access", index).some((item) => item.href === "/access")).toBe(false);
  });
});
