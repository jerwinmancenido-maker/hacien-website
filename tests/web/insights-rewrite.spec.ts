import { describe, expect, it } from "vitest";
import { insights } from "@/data/insights";

describe("insights rewrite (buyer-question titles, answer first, HACIEN checks)", () => {
  it("covers all 6 articles", () => {
    expect(insights).toHaveLength(6);
  });

  it("titles every article as a buyer question and answers it in the intro", () => {
    for (const insight of insights) {
      expect(insight.title).toMatch(/\?$/);
      expect(insight.intro.length).toBeGreaterThan(40);
      expect(insight.updated).toBe("November 2026");
    }
  });

  it("gives every article What to send and What HACIEN checks sections", () => {
    for (const insight of insights) {
      const headings = insight.sections.map((section) => section.heading);
      expect(headings).toContain("What to send");
      expect(headings).toContain("What HACIEN checks");
    }
  });

  it("keeps HACIEN quotation facts consistent (15-day validity, 1 business day reply)", () => {
    const checks = insights
      .map((insight) => insight.sections.find((section) => section.heading === "What HACIEN checks")?.body ?? "")
      .join(" ");
    expect(checks).toContain("15 days");
    expect(checks).toContain("1 business day");
    expect(checks).not.toContain("minimum 30 days");
  });
});
