import { readFileSync } from "node:fs";
import path from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { enterpriseHeroSizes } from "@/components/EnterpriseImagery";
import { Hero } from "@/components/Hero";
import { PremiumPageHero } from "@/components/PremiumPageHero";
import nextConfig from "@/next.config";

const ROOT = process.cwd();

describe("PR 4 Speed Optimizations (F16, N01, G12, F30)", () => {
  describe("N01: Hero image priority and phone sizes", () => {
    it("ensures only one hero image per hero component uses priority", () => {
      const heroSource = readFileSync(path.join(ROOT, "components/Hero.tsx"), "utf8");
      const premiumHeroSource = readFileSync(
        path.join(ROOT, "components/PremiumPageHero.tsx"),
        "utf8",
      );

      // Hero component has exactly one priority attribute on an image
      const heroPriorityMatches = heroSource.match(/\bpriority\b/g) || [];
      expect(
        heroPriorityMatches.length,
        "Hero.tsx must have only one priority image",
      ).toBe(1);

      // PremiumPageHero has exactly one priority attribute on an image
      const premiumPriorityMatches = premiumHeroSource.match(/\bpriority\b/g) || [];
      expect(
        premiumPriorityMatches.length,
        "PremiumPageHero.tsx must have only one priority image",
      ).toBe(1);
    });

    it("ensures enterpriseHeroSizes covers mobile phone widths and desktop capping", () => {
      // Must cover phone widths (< 768px at 100vw)
      expect(enterpriseHeroSizes).toMatch(/\(max-width:\s*768px\)\s*100vw/);
      expect(enterpriseHeroSizes).toContain("100vw");
    });

    it("configures next.config.ts deviceSizes to include phone sizes 390, 640, and 828", () => {
      const deviceSizes = nextConfig.images?.deviceSizes || [];
      expect(deviceSizes).toContain(390);
      expect(deviceSizes).toContain(640);
      expect(deviceSizes).toContain(828);
    });
  });

  describe("F30: Spec table responsive behavior", () => {
    it("ensures the spec table wrapper allows horizontal scroll and stacks on narrow screens", () => {
      const productDetailSource = readFileSync(
        path.join(ROOT, "components/ProductDetail.tsx"),
        "utf8",
      );

      // Wrapper must allow horizontal scroll
      expect(productDetailSource).toMatch(/overflow-x-auto/);

      // Outer card must not clip scroller with overflow-hidden
      expect(productDetailSource).not.toMatch(
        /<div[^>]*overflow-hidden[^>]*>\s*<div[^>]*border-b[\s\S]*?Technical specification table/,
      );

      // Rows must stack below sm (flex-col) and become table-row on sm+
      expect(productDetailSource).toMatch(/flex\s+flex-col[^"]*sm:table-row/);

      // Scroll affordance must be provided
      expect(productDetailSource).toMatch(/Scroll table|scroll/i);
    });
  });

  describe("F16 & G12: Above-the-fold hero visibility and font loading", () => {
    it("ensures the hero headline component has no opacity-0 initial state in server output", () => {
      const heroHtml = renderToStaticMarkup(React.createElement(Hero));

      // Must render an h1 headline
      expect(heroHtml).toMatch(/<h1[^>]*>[\s\S]*?<\/h1>/);

      // Find the h1 element specifically
      const h1Match = heroHtml.match(/<h1[^>]*class="([^"]*)"[^>]*>/);
      expect(h1Match).toBeTruthy();
      const h1Class = h1Match ? h1Match[1] : "";

      // Must not have opacity-0 or hidden classes on the headline
      expect(h1Class).not.toMatch(/\bopacity-0\b/);
      expect(h1Class).not.toMatch(/\bhidden\b/);

      // The h1 must NOT be wrapped inside a motion-slide-up or motion-fade container
      expect(heroHtml).not.toMatch(/motion-slide-up[^>]*><h1/);
      expect(heroHtml).not.toMatch(/motion-fade[^>]*><h1/);

      // PremiumPageHero server output check
      const premiumHtml = renderToStaticMarkup(
        React.createElement(PremiumPageHero, {
          eyebrow: "Enterprise",
          title: "Hardware Solutions",
          description: "Enterprise IT hardware.",
          image: "commandCenter",
          primaryAction: { href: "/quote", label: "Request Quote" },
          highlights: [],
        }),
      );

      expect(premiumHtml).toMatch(/<h1[^>]*>[\s\S]*?<\/h1>/);
      expect(premiumHtml).not.toMatch(/motion-slide-up[^>]*><h1/);
      expect(premiumHtml).not.toMatch(/motion-fade[^>]*><h1/);
    });

    it("configures Archivo Black with fallback font and adjustFontFallback in layout", () => {
      const layoutSource = readFileSync(path.join(ROOT, "app/layout.tsx"), "utf8");

      expect(layoutSource).toMatch(/Archivo_Black\(\{[\s\S]*?adjustFontFallback:\s*true/);
      expect(layoutSource).toMatch(/Archivo_Black\(\{[\s\S]*?preload:\s*true/);
      expect(layoutSource).toMatch(/Archivo_Black\(\{[\s\S]*?fallback:\s*\[/);
    });
  });
});
