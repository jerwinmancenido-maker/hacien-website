import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const solutionsPage = readFileSync("app/solutions/page.tsx", "utf8");
const industriesPage = readFileSync("app/industries/page.tsx", "utf8");
const insightsPage = readFileSync("app/insights/page.tsx", "utf8");

describe("hero lists cleanup (no duplicated hero highlight lists)", () => {
  it("renders no hero highlights on Solutions, Industries, or Insights", () => {
    for (const page of [solutionsPage, industriesPage, insightsPage]) {
      expect(page).toContain("highlights={[]}");
    }
    expect(solutionsPage).not.toContain("content.hero.highlights");
    expect(industriesPage).not.toContain("content.hero.highlights");
    expect(insightsPage).not.toContain("RFQ Preparation");
  });

  it("uses the plainer Insights section label", () => {
    expect(insightsPage).toContain("Educational Guidance");
    expect(insightsPage).not.toContain("Educational Authority");
  });
});
