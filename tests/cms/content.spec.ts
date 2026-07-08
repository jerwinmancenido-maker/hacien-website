import { describe, expect, it } from "vitest";

import {
  findBlockedCmsClaims,
  getFaqContent,
  getHelpContent,
  getPublishedCmsContent,
  validateCmsContent,
} from "@/lib/cms/content";

describe("CMS read layer", () => {
  it("loads published repo-backed FAQ and Help content", () => {
    const content = getPublishedCmsContent();

    expect(content.map((entry) => entry.slug)).toEqual(["faq", "help"]);
    expect(content.every((entry) => entry.status === "published")).toBe(true);
    expect(getFaqContent().faqSections.length).toBeGreaterThan(0);
    expect(getHelpContent().tiles.length).toBeGreaterThan(0);
  });

  it("keeps current published content claim-safe", () => {
    const results = getPublishedCmsContent().map((entry) => validateCmsContent(entry));

    expect(results.every((result) => result.ok)).toBe(true);
  });

  it("flags blocked public claims before CMS content can publish", () => {
    const matches = findBlockedCmsClaims({
      slug: "unsafe",
      hero: {
        title: "In Stock at Manila Hub with 15-day price match",
      },
    });

    expect(matches.map((match) => match.text)).toContain(
      "In Stock at Manila Hub with 15-day price match",
    );
  });
});
