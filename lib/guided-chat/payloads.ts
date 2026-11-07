/** Guided chat: build the exact payloads the existing forms send, so a chat
 *  submission is indistinguishable from a form submission on the HACIEN side.
 *  Pure functions — no UI, no network — so they are unit-testable.
 *  The chat has no file upload in v1; buyers with files use the full form. */

import { parseTrackReference } from "@/lib/security/track-reference";
import { formatRequirementLines, type QuoteRequirementInput } from "@/lib/quote-requirements";

export type GuidedChatAnswers = Record<string, string>;

export type GuidedChatMeta = {
  /** Honeypot value — always empty for a human. */
  website: string;
  /** Milliseconds since epoch when the chat started. */
  formStartedAt: string;
  /** Cloudflare Turnstile token from the confirm step. */
  turnstileToken: string;
};

const QUOTE_PROCUREMENT_NOTE =
  "HACIEN accepts a quotation request with or without listed technology. The request is reviewed before a quotation is prepared.";

export function buildQuotePayload(
  answers: GuidedChatAnswers,
  requirements: QuoteRequirementInput[],
  meta: GuidedChatMeta,
): Record<string, unknown> {
  const requirementLines = formatRequirementLines(requirements);
  return {
    type: "Universal RFQ Gateway Submission",
    website: meta.website,
    formStartedAt: meta.formStartedAt,
    turnstileToken: meta.turnstileToken,
    name: answers.name || "",
    company: answers.company || "",
    email: answers.email || "",
    phone: answers.phone || "",
    intakePath: "Describe requirements",
    procurementType: answers.procurementType || "",
    location: answers.location || "",
    targetDate: answers.targetDate || "",
    budgetRange: answers.budgetRange || "",
    notes: answers.need || "",
    requirements: requirementLines,
    requirementBlocks: requirements,
    requirementCount: requirements.length,
    attachmentInfo: "No attachment selected",
    attachmentName: "",
    attachmentType: "",
    attachmentSizeKb: 0,
    acceptsZeroCatalogProducts: true,
    procurementNote: QUOTE_PROCUREMENT_NOTE,
    submittedAt: new Date().toISOString(),
  };
}

export function buildInquiryPayload(
  answers: GuidedChatAnswers,
  meta: GuidedChatMeta,
): Record<string, unknown> {
  return {
    type: "Contact Inquiry",
    website: meta.website,
    formStartedAt: meta.formStartedAt,
    turnstileToken: meta.turnstileToken,
    name: answers.name || "",
    company: answers.company || "",
    email: answers.email || "",
    phone: answers.phone || "",
    inquiryType: answers.inquiryType || "",
    budgetRange: answers.budgetRange || "",
    timeline: answers.timeline || "",
    message: answers.message || "",
    submittedAt: new Date().toISOString(),
  };
}

export function buildCallbackPayload(
  answers: GuidedChatAnswers,
  meta: GuidedChatMeta,
): Record<string, unknown> {
  const topic = (answers.topic || "").trim();
  const message = [
    `Please call me back at ${answers.phone || ""}.`,
    `Best time: ${answers.bestTime || ""}.`,
    topic ? `About: ${topic}` : "",
  ]
    .filter(Boolean)
    .join(" ");
  return {
    type: "Callback Request",
    website: meta.website,
    formStartedAt: meta.formStartedAt,
    turnstileToken: meta.turnstileToken,
    name: answers.name || "",
    company: "",
    email: "",
    phone: answers.phone || "",
    message,
    submittedAt: new Date().toISOString(),
  };
}

/** Returns the /track URL for a reference number, or null when it is not one. */
export function buildTrackUrl(rawReference: string): string | null {
  const parsed = parseTrackReference(rawReference);
  if (!parsed) return null;
  return `/track/${encodeURIComponent(parsed.referenceNumber)}`;
}
