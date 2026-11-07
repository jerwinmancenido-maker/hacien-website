/** Guided chat: build the exact payloads the existing forms send, so a chat
 *  submission is indistinguishable from a form submission on the HACIEN side.
 *  Pure functions — no UI, no network — so they are unit-testable.
 *  The quote path has an optional document step: its file details travel as
 *  the same attachment fields the full form sends (name, size, type). */

import { findTrackReference, parseTrackReference } from "@/lib/security/track-reference";
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
  const hasAttachment = Boolean(answers.attachmentName);
  const attachmentSizeKb = hasAttachment ? Number(answers.attachmentSizeKb || 0) : 0;
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
    attachmentInfo: hasAttachment
      ? `${answers.attachmentName} (${attachmentSizeKb} KB, ${answers.attachmentType || "unknown type"}) — uploaded with the quotation request`
      : "No attachment selected",
    attachmentName: hasAttachment ? answers.attachmentName : "",
    attachmentType: hasAttachment ? answers.attachmentType || "" : "",
    attachmentSizeKb,
    acceptsZeroCatalogProducts: true,
    procurementNote: QUOTE_PROCUREMENT_NOTE,
    submittedAt: new Date().toISOString(),
  };
}

export function buildInquiryPayload(
  answers: GuidedChatAnswers,
  meta: GuidedChatMeta,
): Record<string, unknown> {
  // The inquiry message is composed from the guided answers, so the
  // submitted message is complete even when the customer skips a step.
  const messageParts = [
    answers.need ? `What is needed: ${answers.need}` : "",
    answers.details ? `Details: ${answers.details}` : "",
    answers.location ? `Delivery location: ${answers.location}` : "",
    answers.targetDate ? `Needed by: ${answers.targetDate}` : "",
    answers.message ? `Anything else: ${answers.message}` : "",
  ].filter(Boolean);
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
    message: messageParts.join("\n\n"),
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

/** Returns the /track URL for a reference mentioned anywhere inside a
 *  chat message (any case, with or without spaces), or null. Used by
 *  the AI chat so a pasted reference is answered with a real link by
 *  code, never by the model — and no lead details are ever shown. */
export function findTrackUrl(rawText: string): string | null {
  const reference = findTrackReference(rawText);
  if (!reference) return null;
  return `/track/${encodeURIComponent(reference)}`;
}
