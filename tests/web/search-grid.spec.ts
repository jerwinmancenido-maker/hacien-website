import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getSearchCardSpan, getSearchGridCols } from "@/app/search/search-grid";

describe("Search grid columns helper (F05)", () => {
  it("determines expected grid columns for counts 1, 2, 3, 4, 5, 7", () => {
    // 1 result = full width (1 col)
    expect(getSearchGridCols(1)).toBe("md:grid-cols-1");
    // 2 results = 2 cols
    expect(getSearchGridCols(2)).toBe("md:grid-cols-2");
    // 3 results = 3 cols
    expect(getSearchGridCols(3)).toBe("md:grid-cols-3");
    // 4 results = 2 cols (2x2)
    expect(getSearchGridCols(4)).toBe("md:grid-cols-2");
    // 5 results = 6 cols (Row 1: 3 cards span 2; Row 2: 2 cards span 3)
    expect(getSearchGridCols(5)).toBe("md:grid-cols-6");
    // 7 results = 12 cols (Row 1: 3 cards span 4; Row 2: 4 cards span 3)
    expect(getSearchGridCols(7)).toBe("md:grid-cols-12");
  });

  it("handles multiples of 2 and 3 cleanly", () => {
    expect(getSearchGridCols(6)).toBe("md:grid-cols-3");
    expect(getSearchGridCols(8)).toBe("md:grid-cols-2");
    expect(getSearchGridCols(9)).toBe("md:grid-cols-3");
    expect(getSearchGridCols(0)).toBe("md:grid-cols-1");
  });

  it("assigns card spans for 5 results so every row fills without an orphan", () => {
    // Row 1: 3 cards of span 2 = 6 cols
    expect(getSearchCardSpan(5, 0)).toBe("md:col-span-2");
    expect(getSearchCardSpan(5, 1)).toBe("md:col-span-2");
    expect(getSearchCardSpan(5, 2)).toBe("md:col-span-2");
    // Row 2: 2 cards of span 3 = 6 cols (fills the row, no orphan)
    expect(getSearchCardSpan(5, 3)).toBe("md:col-span-3");
    expect(getSearchCardSpan(5, 4)).toBe("md:col-span-3");
  });

  it("assigns card spans for 7 results so every row fills without an orphan", () => {
    // Row 1: 3 cards of span 4 = 12 cols
    expect(getSearchCardSpan(7, 0)).toBe("md:col-span-4");
    expect(getSearchCardSpan(7, 1)).toBe("md:col-span-4");
    expect(getSearchCardSpan(7, 2)).toBe("md:col-span-4");
    // Row 2: 4 cards of span 3 = 12 cols (fills the row, no orphan)
    expect(getSearchCardSpan(7, 3)).toBe("md:col-span-3");
    expect(getSearchCardSpan(7, 4)).toBe("md:col-span-3");
    expect(getSearchCardSpan(7, 5)).toBe("md:col-span-3");
    expect(getSearchCardSpan(7, 6)).toBe("md:col-span-3");
  });

  it("returns no span for counts that divide cleanly without orphans", () => {
    expect(getSearchCardSpan(1, 0)).toBe("");
    expect(getSearchCardSpan(2, 0)).toBe("");
    expect(getSearchCardSpan(3, 0)).toBe("");
    expect(getSearchCardSpan(4, 0)).toBe("");
    expect(getSearchCardSpan(6, 0)).toBe("");
  });
});

describe("Home page photo card eyebrow label", () => {
  it("uses 'Appointments' as eyebrow in PremiumStatementBand matching /contact", () => {
    const source = readFileSync(path.join(process.cwd(), "components/EnterpriseImagery.tsx"), "utf8");
    expect(source).toMatch(/eyebrow="Appointments"/);
    expect(source).not.toMatch(/eyebrow="Per order"/);
  });
});

describe("Platform page operating layers grid col-span", () => {
  it("ensures card 4 does not sit alone on tablet (md)", () => {
    const source = readFileSync(path.join(process.cwd(), "app/platform/page.tsx"), "utf8");
    // All cards at index >= 2 should share md:col-span-1 lg:col-span-2
    expect(source).not.toMatch(/md:col-span-2 lg:col-span-2/);
    expect(source).toContain('md:col-span-1 lg:col-span-2');
  });
});
