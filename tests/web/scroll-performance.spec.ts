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
// Tests marked IMPROVEMENT fail on main at 2fbfa0a on purpose: they encode the
// scroll-lag fix, so they turn green only once that fix lands. Do not loosen
// them to make them pass without the fix.

describe("Scroll performance: smooth scroll, header blur, scroll animations", () => {
  describe("Guardrails that already pass on main", () => {
    it("Lenis respects prefers-reduced-motion", () => {
      const lenis = read("components/motion/LenisProvider.tsx");
      expect(lenis).toMatch(/prefers-reduced-motion:\s*reduce/);
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
    it("Lenis smooth scroll is skipped on coarse pointers / touch devices", () => {
      // Lenis smoothWheel with a 1.08s easing is the prime suspect for the
      // "lag when scrolling down" report. Touch users should get native scroll.
      const lenis = read("components/motion/LenisProvider.tsx");
      expect(lenis).toMatch(/pointer:\s*coarse|matchMedia\("\(pointer/);
    });

    it("Sticky header does not use backdrop-blur (re-blurs content on every scroll frame)", () => {
      const header = read("components/Header.tsx");
      expect(header).not.toMatch(/backdrop-blur/);
    });
  });
});
