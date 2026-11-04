import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();

function read(rel: string) {
  return readFileSync(path.join(ROOT, rel), "utf8");
}

// Draft prepared 2026-11-04 for jerwinmancenido-maker/hacien-website.
// Guardrails for the lag fix: when Lenis / blur are removed, image loading
// must not quietly get worse (extra priority images, oversized srcsets).
// All tests in this file should pass on main at 2fbfa0a.

describe("Image sizes and priority (scroll / LCP guardrails)", () => {
  it("EnterpriseMediaImage always carries an alt from its media record", () => {
    const imagery = read("components/EnterpriseImagery.tsx");
    expect(imagery).toMatch(/alt=\{record\.alt\}/);
  });

  it("EnterpriseMediaImage uses quality 70 and fill + object-cover", () => {
    const imagery = read("components/EnterpriseImagery.tsx");
    expect(imagery).toMatch(/enterpriseMediaQuality = 70/);
    expect(imagery).toMatch(/quality=\{enterpriseMediaQuality\}/);
    expect(imagery).toMatch(/\bfill\b/);
    expect(imagery).toMatch(/object-cover/);
  });

  it("Non-hero panels do not pass priority (only heroes may)", () => {
    const imagery = read("components/EnterpriseImagery.tsx");
    // EnterprisePhotoPanel renders EnterpriseMediaImage without a priority prop.
    const panelCall = imagery.match(/EnterprisePhotoPanel[\s\S]*?<EnterpriseMediaImage[^>]*>/);
    expect(panelCall).toBeTruthy();
    expect(panelCall?.[0]).not.toMatch(/priority/);
  });

  it("Hero, panel, card and thumb sizes are all defined and phone-aware", () => {
    const imagery = read("components/EnterpriseImagery.tsx");
    expect(imagery).toMatch(/enterpriseHeroSizes = "\(max-width: 768px\) 100vw/);
    expect(imagery).toMatch(/enterprisePanelSizes/);
    expect(imagery).toMatch(/enterpriseCardSizes/);
    expect(imagery).toMatch(/enterpriseThumbSizes/);
  });

  it("next.config serves AVIF/WebP and includes the 390 phone device size", () => {
    const config = read("next.config.ts");
    expect(config).toMatch(/image\/avif/);
    expect(config).toMatch(/image\/webp/);
    expect(config).toMatch(/deviceSizes: \[390,/);
  });
});
