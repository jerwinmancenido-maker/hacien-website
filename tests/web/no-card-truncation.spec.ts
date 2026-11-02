import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();

describe("G05: No text truncation on solution and insights cards", () => {
  it("does not truncate descriptions with line-clamp or ellipsis in app/solutions/page.tsx", () => {
    const source = readFileSync(path.join(ROOT, "app/solutions/page.tsx"), "utf8");
    expect(source).not.toMatch(/line-clamp/);
    expect(source).not.toMatch(/truncate/);
    expect(source).not.toMatch(/text-ellipsis/);
    expect(source).toContain("{solution.summary}");
  });

  it("does not truncate descriptions with line-clamp or ellipsis in app/insights/page.tsx", () => {
    const source = readFileSync(path.join(ROOT, "app/insights/page.tsx"), "utf8");
    expect(source).not.toMatch(/line-clamp/);
    expect(source).not.toMatch(/truncate/);
    expect(source).not.toMatch(/text-ellipsis/);
    expect(source).toContain("{insight.summary}");
  });
});
