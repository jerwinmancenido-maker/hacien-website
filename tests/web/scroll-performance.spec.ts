import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();

function read(rel: string) {
  return readFileSync(path.join(ROOT, rel), "utf8");
}

// Draft prepared 2026-11-04 for jerwinmancenido-maker/hacien-website.
// Follows the repo's existing source-test pattern (see tests/web/buttons-cursor.spec.ts):
// no DOM renderer, assertions are on the source that ships.
// 2026-11-05: Lenis was removed entirely (native scrolling everywhere) after
// scroll-lag reports persisted on desktop; the old Lenis guard tests were
// replaced by native-scroll assertions, not loosened.

describe("Scroll performance: smooth scroll, header blur, scroll animations", () => {
  describe("Guardrails that already pass on main", () => {
    it("No smooth-scroll library is instantiated (native scrolling everywhere)", () => {
      const provider = read("components/motion/LenisProvider.tsx");
      expect(provider).not.toMatch(/new Lenis\(/);
      expect(provider).not.toMatch(/from "lenis"/);
      expect(provider).not.toMatch(/requestAnimationFrame/);
      expect(provider).toContain("return children;");
    });

    it("Header scroll listener is passive", () => {
      const header = read("components/Header.tsx");
      expect(header).toMatch(/addEventListener\("scroll",\s*updateScrolled,\s*\{\s*passive:\s*true\s*\}\)/);
    });

    it("AnimatedContent disconnects its IntersectionObserver after appearing", () => {
      const animated = read("app/components/reactbits/AnimatedContent.tsx");
      expect(animated).toMatch(/IntersectionObserver/);
      expect(animated).toMatch(/observer\.disconnect\(\)/);
    });

    it("No fixed background attachment is used (a known mobile scroll-jank cause)", () => {
      const css = read("app/globals.css");
      expect(css).not.toMatch(/background-attachment:\s*fixed/);
    });
  });

  describe("IMPROVEMENT: scroll-lag fixes (fail on main until the fix lands)", () => {
    it("Lenis provider does not gate scrolling on pointer type", () => {
      // Lenis is gone, so there is no pointer-type branch left to misbehave:
      // phones and desktops alike get the browser's native scroll.
      const provider = read("components/motion/LenisProvider.tsx");
      expect(provider).not.toMatch(/pointer:\s*coarse/);
      expect(provider).not.toMatch(/prefers-reduced-motion/);
    });

    it("Sticky header does not use backdrop-blur (re-blurs content on every scroll frame)", () => {
      const header = read("components/Header.tsx");
      expect(header).not.toMatch(/backdrop-blur/);
    });
  });
});
