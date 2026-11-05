import { describe, expect, it } from "vitest";
import { buildSearchIndex, searchCatalog } from "@/lib/search-index";

describe("searchCatalog (F05)", () => {
  const index = buildSearchIndex();

  it("indexes products, categories, solutions, and insights", () => {
    const groups = new Set(index.map((item) => item.group));
    expect(groups.has("Products")).toBe(true);
    expect(groups.has("Categories")).toBe(true);
    expect(groups.has("Solutions")).toBe(true);
    expect(groups.has("Insights")).toBe(true);
    expect(index.length).toBeGreaterThan(20);
  });

  it("returns expected items for 'laptop'", () => {
    const results = searchCatalog("laptop", index);
    const titles = results.map((item) => item.title);
    const hrefs = results.map((item) => item.href);

    expect(results.length).toBeGreaterThan(0);
    expect(titles).toContain("Business Laptop Class");
    expect(titles).toContain("Computers & Laptops");
    expect(titles).toContain("How do I choose business laptops?");
    expect(hrefs).toContain("/products/computers-laptops");
    expect(hrefs).toContain("/insights/business-laptop-procurement-guide");
  });

  it("returns expected items for 'cctv'", () => {
    const results = searchCatalog("cctv", index);
    const titles = results.map((item) => item.title);
    const hrefs = results.map((item) => item.href);

    expect(results.length).toBeGreaterThan(0);
    expect(titles).toContain("CCTV Starter System");
    expect(titles).toContain("Security & Surveillance");
    expect(hrefs.some((href) => href.includes("security-surveillance"))).toBe(true);
  });

  it("returns expected items for 'ups'", () => {
    const results = searchCatalog("ups", index);
    const titles = results.map((item) => item.title);
    const hrefs = results.map((item) => item.href);

    expect(results.length).toBeGreaterThan(0);
    expect(titles).toContain("Power & UPS");
    expect(titles).toContain("APC, CyberPower, and Eaton UPS");
    expect(hrefs).toContain("/products/power-ups");
  });

  it("returns none for a nonsense word", () => {
    expect(searchCatalog("zzqxv9nomatch", index)).toEqual([]);
    expect(searchCatalog("asdfghjklqwerty", index)).toEqual([]);
  });

  it("matches case-insensitively", () => {
    expect(searchCatalog("LAPTOP", index).length).toBe(searchCatalog("laptop", index).length);
    expect(searchCatalog("Cctv", index).length).toBe(searchCatalog("cctv", index).length);
  });
});
