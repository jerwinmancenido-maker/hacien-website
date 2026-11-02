import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { getCmsSeoRecord } from "@/lib/cms/seo";
import { countHacienMentions, renderDocumentTitle } from "@/lib/seo/document-title";
import { buildPageTitleInventory, staticPageTitleSegments } from "@/lib/seo/page-title-inventory";

function readAppSource(relativePath: string) {
  return readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

describe("page document titles", () => {
  it("keeps contact/about/access/platform metadata free of embedded HACIEN before the template", () => {
    expect(staticPageTitleSegments["/contact"]).toBe("Contact");
    expect(staticPageTitleSegments["/access"]).toBe("Access");
    expect(staticPageTitleSegments["/platform"]).toBe("Platform | Operating Model");
    expect(getCmsSeoRecord("about").title).toBe("About");

    expect(readAppSource("app/contact/page.tsx")).toContain('title: "Contact"');
    expect(readAppSource("app/contact/page.tsx")).not.toContain('title: "Contact HACIEN"');
    expect(readAppSource("app/access/page.tsx")).toContain('title: "Access"');
    expect(readAppSource("app/platform/page.tsx")).toContain('title: "Platform | Operating Model"');
    expect(readAppSource("lib/cms/seo.ts")).toContain('title: "About",');
    expect(readAppSource("lib/cms/seo.ts")).not.toContain(
      'title: "About HACIEN | IT Procurement & Technology Solutions"',
    );
  });

  it("renders every known page title with HACIEN exactly once", () => {
    const inventory = buildPageTitleInventory();
    expect(inventory.length).toBeGreaterThan(40);

    const failures = inventory
      .map((entry) => ({
        ...entry,
        mentions: countHacienMentions(entry.rendered),
      }))
      .filter((entry) => entry.mentions !== 1);

    expect(failures).toEqual([]);
  });

  it("does not produce the duplicate '| HACIEN | HACIEN' pattern", () => {
    for (const entry of buildPageTitleInventory()) {
      expect(entry.rendered.includes("| HACIEN | HACIEN")).toBe(false);
      if (entry.usesTemplate) {
        expect(entry.rendered).toBe(renderDocumentTitle(entry.segment));
        expect(entry.segment.includes("| HACIEN")).toBe(false);
      }
    }
  });
});
