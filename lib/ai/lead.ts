/** Quote-lead checks. procurementType stays optional, as already decided.
 *  The extra fields are what a formal quotation needs.
 */

import type { GuidedChatAnswers } from "@/lib/guided-chat/payloads";

export const BUSINESS_TYPES = [
  "Private company",
  "Government agency or LGU",
  "School",
  "Sole proprietor",
] as const;

export type BusinessType = (typeof BUSINESS_TYPES)[number];

const TITLES = new Set(["mr", "mrs", "ms", "miss", "dr", "engr", "atty", "prof"]);

export const QUOTE_LEAD_LABELS: { id: string; label: string }[] = [
  { id: "businessType", label: "Business type" },
  { id: "position", label: "Position" },
  { id: "businessAddress", label: "Business address" },
  { id: "tin", label: "TIN (for the invoice)" },
  { id: "buyerReference", label: "RFQ or PR number" },
];

export function isCompletePersonName(value: string): boolean {
  const parts = value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((raw) => ({ raw, name: raw.replace(/\./g, "") }))
    .filter(({ name }) => name && !TITLES.has(name.toLowerCase()));
  if (parts.length < 2) return false;
  // At least one full name word is required — initials alone
  // ("J. D.") are not a complete name.
  if (!parts.some(({ name }) => name.length >= 2)) return false;
  // A single letter in the middle is a middle initial, with or
  // without its period ("Juan C Dela Cruz"). At the first or last
  // position it counts only written as an initial, with the period
  // ("J. Dela Cruz", "Juan D.") — a bare edge letter ("Juan D",
  // "J Dela Cruz") does not (Bugbot, PR #88 at bd245d21 — the old
  // first/last length gate rejected initialled names outright).
  return parts.every(({ raw, name }, index) => {
    if (!/^[\p{L}][\p{L}'.-]{0,39}$/u.test(name)) return false;
    if (name.length >= 2) return true;
    const isEdge = index === 0 || index === parts.length - 1;
    return isEdge ? raw.includes(".") : true;
  });
}

export function isPhilippineMobile(value: string): boolean {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("63") && digits.length === 12) digits = `0${digits.slice(2)}`;
  else if (digits.startsWith("9") && digits.length === 10) digits = `0${digits}`;
  return /^09\d{9}$/.test(digits);
}

export function isTin(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 9 || digits.length === 12;
}

export function isBusinessType(value: string): value is BusinessType {
  return (BUSINESS_TYPES as readonly string[]).includes(value);
}

export function normalizeBusinessType(value: string): BusinessType | "" {
  const trimmed = value.trim();
  if (isBusinessType(trimmed)) return trimmed;
  const text = trimmed.toLowerCase();
  if (!text) return "";
  // PhilGEPS is deliberately NOT a government marker: private bidders
  // register on PhilGEPS too, so a mere mention must not reclassify a
  // private buyer as government (which would force an RFQ/PR number).
  // "NGA" is a government marker ONLY as the standalone uppercase
  // acronym (checked case-sensitively on the original text) or as the
  // full phrase: the lowercase word "nga" is a Tagalog emphasis
  // particle ("private company nga po"), never an agency (Bugbot,
  // PR #88 at 68d0ff2).
  // NGO / non-government phrasing is private, not government — checked
  // before the government markers so "non-government organization"
  // cannot trip on the substring "government" (Bugbot Medium, PR #88
  // at a16f881).
  if (/\b(non[\s-]?government|nongovernment|ngo)\b/i.test(trimmed)) {
    return "Private company";
  }
  const isNga = /\bNGA\b/.test(trimmed) || /national government agency/i.test(trimmed);
  if (
    isNga ||
    /(?<!non[\s-]?)(?<!non)\b(government|lgu|gocc|municipality|city hall|barangay|ahensya|gobyerno|munisipyo)\b/i.test(
      trimmed,
    )
  ) {
    return "Government agency or LGU";
  }
  if (/(school|university|college|academy|eskwela|paaralan)/.test(text)) return "School";
  if (/(sole|proprietor)/.test(text)) return "Sole proprietor";
  if (/(private company|private|corporate|bpo|corporation)/.test(text)) return "Private company";
  return "";
}

export function isGovernmentBuyer(value: string): boolean {
  return value.trim() === "Government agency or LGU";
}

const FILLED = ["company", "position", "businessAddress", "location", "need", "targetDate"] as const;

export function quoteLeadIssues(fields: GuidedChatAnswers): { missing: string[]; invalid: string[] } {
  const missing: string[] = [];
  const invalid: string[] = [];
  const required = [
    "need",
    "name",
    "company",
    "businessType",
    "position",
    "businessAddress",
    "email",
    "phone",
    "location",
    "targetDate",
  ];
  for (const id of required) {
    const value = (fields[id] || "").trim();
    if (!value) {
      missing.push(id);
      continue;
    }
    if (id === "name" && !isCompletePersonName(value)) invalid.push(id);
    if (id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) invalid.push(id);
    if (id === "phone" && !isPhilippineMobile(value)) invalid.push(id);
    if (id === "businessType" && !isBusinessType(value)) invalid.push(id);
    if ((FILLED as readonly string[]).includes(id) && value.length < 2) invalid.push(id);
  }
  // The TIN is optional. A visitor without one often answers with a
  // placeholder ("none", "n/a", "wala") — the collected value can
  // never be cleared in-chat, so treating a placeholder as an invalid
  // TIN would block the quote review forever. Placeholders count as
  // "no TIN given"; a non-placeholder value must still be a real TIN.
  const tinRaw = (fields.tin || "").trim();
  const tin = /^(none|n\/?a|na|no tin|wala|not applicable|-+)$/i.test(tinRaw) ? "" : tinRaw;
  if (tin && !isTin(tin)) invalid.push("tin");
  if (isGovernmentBuyer(fields.businessType || "") && !(fields.buyerReference || "").trim()) {
    missing.push("buyerReference");
  }
  return { missing, invalid };
}

export function quoteLeadReady(fields: GuidedChatAnswers): boolean {
  const issues = quoteLeadIssues(fields);
  return issues.missing.length === 0 && issues.invalid.length === 0;
}
