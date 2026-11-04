import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { solutions } from "@/data/solutions";
import { getSolutionsContent } from "@/lib/cms/content";

const technologyPage = readFileSync("app/technology/page.tsx", "utf8");

describe("solutions rewrite (plain, informative, no invented offerings)", () => {
  it("covers all 12 solutions", () => {
    expect(solutions).toHaveLength(12);
  });

  it("gives every solution a one-line answer, a detail paragraph, and four structured sections", () => {
    for (const solution of solutions) {
      expect(solution.heroCopy.length).toBeGreaterThan(20);
      expect(solution.detail.length).toBeGreaterThan(40);
      expect(solution.sections.map((section) => section.heading)).toEqual([
        "What this work covers",
        "Typical situations",
        "What to send",
        "What HACIEN checks",
      ]);
      for (const section of solution.sections) {
        expect(section.body.length).toBeGreaterThan(40);
      }
    }
  });

  it("explains every workflow step instead of leaving bare labels", () => {
    for (const solution of solutions) {
      expect(solution.workflow).toHaveLength(4);
      for (const step of solution.workflow) {
        expect(step.step.length).toBeGreaterThan(3);
        expect(step.detail.length).toBeGreaterThan(20);
      }
    }
  });

  it("drops the generic framing language from solution copy", () => {
    const copy = solutions
      .map((solution) => [solution.heroCopy, solution.detail, ...solution.sections.map((section) => section.body)].join(" "))
      .join(" ");
    expect(copy).not.toContain("clearer requests");
    expect(copy).not.toContain("frame the request");
    expect(copy).not.toContain("can help review");
    expect(copy).not.toContain("may involve");
  });

  it("states the Technology vs Solutions distinction on both index pages", () => {
    const solutionsHero = getSolutionsContent().hero;
    expect(solutionsHero.title).toContain("jobs to be done");
    expect(solutionsHero.description).toContain("Technology pages");
    expect(technologyPage).toContain("Technology is what a solution is built from.");
    expect(technologyPage).toContain("see Solutions");
  });
});
