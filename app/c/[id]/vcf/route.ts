import { NextResponse } from "next/server";

import { getStaffCard, staffCardVcfFilename } from "@/data/staffCards";
import { buildVCard, loadLogoPhotoBase64 } from "@/lib/vcard";

type RouteProps = {
  params: Promise<{ id: string }>;
};

/**
 * Serves the staff card as a vCard 3.0 download. A direct link (not a JS
 * blob) so iPhone Safari and Android Chrome hand the file to the system
 * "Add contact" flow.
 */
export async function GET(_request: Request, { params }: RouteProps) {
  const { id } = await params;
  const card = getStaffCard(id);
  if (!card) {
    return new NextResponse("Not found", { status: 404 });
  }

  const photo = await loadLogoPhotoBase64();
  const vcf = buildVCard(card, photo);

  return new NextResponse(vcf, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${staffCardVcfFilename(card)}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
