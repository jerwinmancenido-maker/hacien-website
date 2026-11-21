import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";

import StaffCardPage, {
  dynamicParams,
  generateStaticParams,
} from "@/app/c/[id]/page";
import { GET as getStaffCardVcf } from "@/app/c/[id]/vcf/route";
import { getStaffCard, staffCards, staffCardVcfFilename } from "@/data/staffCards";
import { buildVCard } from "@/lib/vcard";
import { middleware } from "@/middleware";

describe("staff cards data", () => {
  it("resolves Jerwin's printed-card ID", () => {
    const card = getStaffCard("2611001");
    expect(card).not.toBeNull();
    expect(card?.fullName).toBe("Jerwin P. Mancenido");
    expect(card?.title).toBe("General Manager");
    expect(card?.mobileIntl).toBe("+639681171158");
  });

  it("prebuilds only known card IDs and rejects unknown dynamic params", () => {
    expect(dynamicParams).toBe(false);
    expect(generateStaticParams()).toEqual(
      Object.keys(staffCards).map((id) => ({ id })),
    );
    expect(generateStaticParams()).toContainEqual({ id: "2611001" });
  });

  it("redirects uppercase QR paths /C/:id to the canonical /c/:id card route", () => {
    const response = middleware(
      new NextRequest("https://haciensolutions.com/C/2611001"),
    );
    expect(response.status).toBe(308);
    expect(response.headers.get("location")).toBe(
      "https://haciensolutions.com/c/2611001",
    );
    // After the redirect lands, the same ID still resolves to the card.
    expect(getStaffCard("2611001")?.id).toBe("2611001");
  });

  it("returns null for an unknown card ID", () => {
    expect(getStaffCard("0000000")).toBeNull();
  });

  it("treats Object.prototype keys as missing (notFound / vcf 404)", async () => {
    for (const id of ["constructor", "__proto__"]) {
      expect(getStaffCard(id)).toBeNull();

      await expect(
        StaffCardPage({ params: Promise.resolve({ id }) }),
      ).rejects.toMatchObject({ digest: "NEXT_HTTP_ERROR_FALLBACK;404" });

      const vcf = await getStaffCardVcf(
        new Request(`https://haciensolutions.com/c/${id}/vcf`),
        { params: Promise.resolve({ id }) },
      );
      expect(vcf.status).toBe(404);
    }
  });

  it("records no social URLs until they are confirmed", () => {
    const card = getStaffCard("2611001");
    expect(card?.socials?.facebook).toBeUndefined();
    expect(card?.socials?.linkedin).toBeUndefined();
    expect(card?.socials?.tiktok).toBeUndefined();
  });
});

describe("buildVCard", () => {
  const card = getStaffCard("2611001")!;

  it("emits a vCard 3.0 document with CRLF line endings", () => {
    const vcf = buildVCard(card);
    expect(vcf.startsWith("BEGIN:VCARD\r\nVERSION:3.0\r\n")).toBe(true);
    expect(vcf.endsWith("END:VCARD\r\n")).toBe(true);
    expect(vcf).not.toMatch(/[^\r]\n/);
  });

  it("carries the contact fields from the card record", () => {
    const vcf = buildVCard(card);
    expect(vcf).toContain("FN:Jerwin P. Mancenido");
    expect(vcf).toContain("TITLE:General Manager");
    expect(vcf).toContain("ORG:HACIEN Information Technology Solutions");
    expect(vcf).toContain("TEL;TYPE=CELL:+639681171158");
    expect(vcf).toContain("EMAIL;TYPE=WORK:jerwin@haciensolutions.com");
    expect(vcf).toContain("EMAIL;TYPE=WORK:sales@haciensolutions.com");
    expect(vcf).toContain("URL:https://haciensolutions.com");
    expect(vcf).toContain("Pasig City;;1605;Philippines");
  });

  it("embeds the logo photo only when base64 is supplied, folded at 75 chars", () => {
    const photo = Buffer.from("fake-png-bytes").toString("base64");
    const vcf = buildVCard(card, photo);
    expect(vcf).toContain(`PHOTO;ENCODING=b;TYPE=PNG:${photo}`);
    for (const line of vcf.split("\r\n")) {
      expect(line.length).toBeLessThanOrEqual(75);
    }
    expect(buildVCard(card)).not.toContain("PHOTO");
  });

  it("derives a readable .vcf filename", () => {
    expect(staffCardVcfFilename(card)).toBe("jerwin-p-mancenido.vcf");
  });
});
