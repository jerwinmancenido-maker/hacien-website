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
  const names = value
    .trim()
    .split(/\s+/)
    .map((part) => part.replace(/\./g, ""))
    .filter((part) => part && !TITLES.has(part.toLowerCase()));
  if (names.length < 2) return false;
  return names.every((part) => /^[\p{L}][\p{L}'.-]{1,39}$/u.test(part));
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
  if (/(government|lgu|nga\b|gocc|philgeps|municipality|city hall|barangay|ahensya|gobyerno|munisipyo)/.test(text)) {
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
  const tin = (fields.tin || "").trim();
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
