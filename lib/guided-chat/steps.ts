/** Guided chat: the four paths and their steps, as plain data.
 *  No UI here, so the step lists and validation are unit-testable.
 *  Steps map 1:1 to the fields the existing QuoteCart / ContactForm submit —
 *  the chat collects the same answers, only one question at a time. */

import { contactInquiryTypes } from "@/app/actions/contact-inquiry";

export type ChatPathId = "quote" | "inquiry" | "callback" | "track";

export type ChatStepKind = "options" | "text" | "email" | "tel" | "date" | "textarea";

export type ChatStep = {
  id: string;
  question: string;
  kind: ChatStepKind;
  options?: string[];
  required: boolean;
  placeholder?: string;
  hint?: string;
};

export type ChatPath = {
  id: ChatPathId;
  label: string;
  description: string;
  steps: ChatStep[];
};

export const QUOTE_PROCUREMENT_TYPES = [
  "Corporate",
  "Institutional",
  "Education",
  "Project-based",
  "Reseller / integrator",
];

export const QUOTE_BUDGET_OPTIONS = [
  "Not specified",
  "Under PHP 50,000",
  "PHP 50,000 - PHP 250,000",
  "PHP 250,000 - PHP 1,000,000",
  "Project budget to be discussed",
];

export const INQUIRY_BUDGET_OPTIONS = [
  "Under PHP 50,000",
  "PHP 50,000 - PHP 250,000",
  "PHP 250,000 - PHP 1,000,000",
  "To be discussed",
];

export const INQUIRY_TIMELINE_OPTIONS = ["Urgent", "2-4 weeks", "This quarter", "Planning stage"];

export const CALLBACK_TIME_OPTIONS = [
  "Morning (9:00 AM – 12:00 PM)",
  "Afternoon (12:00 PM – 6:00 PM)",
  "Anytime during business hours",
];

export const CHAT_PATHS: ChatPath[] = [
  {
    id: "quote",
    label: "Get a quotation",
    description: "For an item list, specifications, or a quotation.",
    steps: [
      {
        id: "need",
        question: "What do you need?",
        kind: "textarea",
        required: true,
        placeholder: "Example: 10 laptops for office work, Dell or similar, 16GB, with monitors",
        hint: "Describe the product, quantity, and anything HACIEN should review.",
      },
      {
        id: "procurementType",
        question: "What kind of buyer are you?",
        kind: "options",
        options: QUOTE_PROCUREMENT_TYPES,
        required: true,
      },
      { id: "name", question: "What is your name?", kind: "text", required: true, placeholder: "Full name" },
      {
        id: "company",
        question: "Which company or agency is this for?",
        kind: "text",
        required: true,
        placeholder: "Company / agency",
      },
      { id: "email", question: "Where should the quotation be sent?", kind: "email", required: true, placeholder: "Email address" },
      { id: "phone", question: "What is the best phone number to reach you?", kind: "tel", required: true, placeholder: "Phone number" },
      {
        id: "location",
        question: "Where should it be delivered?",
        kind: "text",
        required: true,
        placeholder: "Delivery location",
      },
      { id: "targetDate", question: "When do you need it?", kind: "date", required: true },
      {
        id: "budgetRange",
        question: "What is the budget range?",
        kind: "options",
        options: QUOTE_BUDGET_OPTIONS,
        required: false,
      },
    ],
  },
  {
    id: "inquiry",
    label: "Ask a question",
    description: "For supplier, partnership, and company questions.",
    steps: [
      {
        id: "inquiryType",
        question: "What is this about?",
        kind: "options",
        options: [...contactInquiryTypes],
        required: true,
      },
      {
        id: "message",
        question: "What would you like to ask?",
        kind: "textarea",
        required: true,
        placeholder: "Project description, specifications, quantities, or procurement details",
      },
      { id: "name", question: "What is your name?", kind: "text", required: true, placeholder: "Full name" },
      {
        id: "company",
        question: "Which company or organization is this for?",
        kind: "text",
        required: true,
        placeholder: "Company / organization",
      },
      { id: "email", question: "Where should the reply be sent?", kind: "email", required: true, placeholder: "Email address" },
      { id: "phone", question: "What is the best phone number to reach you?", kind: "tel", required: false, placeholder: "Phone number" },
      {
        id: "budgetRange",
        question: "What is the budget range?",
        kind: "options",
        options: INQUIRY_BUDGET_OPTIONS,
        required: false,
      },
      {
        id: "timeline",
        question: "What is the timeline?",
        kind: "options",
        options: INQUIRY_TIMELINE_OPTIONS,
        required: false,
      },
    ],
  },
  {
    id: "callback",
    label: "Request a callback",
    description: "HACIEN calls you back during business hours.",
    steps: [
      { id: "name", question: "What is your name?", kind: "text", required: true, placeholder: "Full name" },
      { id: "phone", question: "What number should HACIEN call?", kind: "tel", required: true, placeholder: "Phone number" },
      {
        id: "bestTime",
        question: "When is the best time to call?",
        kind: "options",
        options: CALLBACK_TIME_OPTIONS,
        required: true,
      },
      {
        id: "topic",
        question: "What should the call be about?",
        kind: "textarea",
        required: false,
        placeholder: "A short note, so the call starts with the right details",
      },
    ],
  },
  {
    id: "track",
    label: "Track my request",
    description: "Check the progress of a request you already sent.",
    steps: [
      {
        id: "reference",
        question: "What is your reference number?",
        kind: "text",
        required: true,
        placeholder: "RFQ-2026-000000",
        hint: "From your confirmation or support message.",
      },
    ],
  },
];

export function getChatPath(id: ChatPathId): ChatPath {
  const path = CHAT_PATHS.find((candidate) => candidate.id === id);
  if (!path) throw new Error(`Unknown guided chat path: ${id}`);
  return path;
}

/** Returns an error message for an invalid answer, or null when it is fine. */
export function validateStepAnswer(step: ChatStep, rawValue: string): string | null {
  const value = rawValue.trim();
  if (step.required && !value) return "Please answer to continue.";
  if (!value) return null;
  if (step.kind === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "That email does not look right. Please check it.";
  }
  if (step.kind === "tel" && value.replace(/\D/g, "").length < 7) {
    return "That phone number looks too short. Please check it.";
  }
  if (step.kind === "date" && Number.isNaN(Date.parse(value))) {
    return "Please pick a valid date.";
  }
  return null;
}
