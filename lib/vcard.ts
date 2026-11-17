import { readFile } from "node:fs/promises";
import path from "node:path";

import type { StaffCard } from "@/data/staffCards";

/** Escape a vCard 3.0 text value (RFC 2426 §4). */
function escapeValue(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/**
 * Fold a content line at 75 octets per RFC 2426 §2.6 (continuation lines
 * start with a single space). All values folded here are ASCII, so
 * character count equals octet count.
 */
function foldLine(line: string): string {
  if (line.length <= 75) return line;
  const parts: string[] = [line.slice(0, 75)];
  let rest = line.slice(75);
  while (rest.length > 0) {
    parts.push(` ${rest.slice(0, 74)}`);
    rest = rest.slice(74);
  }
  return parts.join("\r\n");
}

let logoPhotoCache: string | null | undefined;

/**
 * The official logo (public/brand/logo-full-600.png, ~16 KB) as base64 for
 * the vCard PHOTO field. Small enough to embed; returns null when the file
 * cannot be read so the card still downloads without a photo.
 */
export async function loadLogoPhotoBase64(): Promise<string | null> {
  if (logoPhotoCache !== undefined) return logoPhotoCache;
  try {
    const file = await readFile(
      path.join(process.cwd(), "public", "brand", "logo-full-600.png"),
    );
    logoPhotoCache = file.toString("base64");
  } catch {
    logoPhotoCache = null;
  }
  return logoPhotoCache;
}

/** Build a vCard 3.0 document (CRLF line endings, folded long lines). */
export function buildVCard(card: StaffCard, photoBase64?: string | null): string {
  const lines: string[] = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeValue(card.familyName)};${escapeValue(card.givenName)};${escapeValue(card.middleName ?? "")};;`,
    `FN:${escapeValue(card.fullName)}`,
    `TITLE:${escapeValue(card.title)}`,
    `ORG:${escapeValue(card.organization)}`,
    `TEL;TYPE=CELL:${card.mobileIntl}`,
  ];

  for (const email of card.emails) {
    lines.push(`EMAIL;TYPE=WORK:${email.address}`);
  }

  lines.push(`URL:${card.website}`);
  lines.push(
    `ADR;TYPE=WORK:;;${escapeValue(card.address.street)};${escapeValue(card.address.city)};;${card.address.postcode};${escapeValue(card.address.country)}`,
  );

  if (photoBase64) {
    lines.push(`PHOTO;ENCODING=b;TYPE=PNG:${photoBase64}`);
  }

  lines.push("END:VCARD");
  return `${lines.map(foldLine).join("\r\n")}\r\n`;
}
