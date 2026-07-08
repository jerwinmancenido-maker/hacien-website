import faqData from "../../config/faq-data.json";

export type CmsStatus = "published" | "draft" | "archived";

export type CmsMediaReference = {
  key: string;
  source: string;
  alt: string;
  sourceNote?: string;
};

export type CmsHeroImage =
  | "dataCenter"
  | "silicon"
  | "office"
  | "workstation"
  | "network"
  | "commandCenter"
  | "cybersecurity"
  | "cloud"
  | "cabling"
  | "storage"
  | "documentation"
  | "knowledge"
  | "strategy"
  | "workspace";

export type CmsHeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  image: CmsHeroImage;
  primaryAction: {
    href: string;
    label: string;
  };
  secondaryAction?: {
    href: string;
    label: string;
  };
  highlights: Array<{
    label: string;
    text: string;
  }>;
};

export type CmsFaqSection = {
  title: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
};

export type CmsHelpTile = {
  title: string;
  text: string;
  href: string;
};

export type CmsPageContent = {
  slug: string;
  status: CmsStatus;
  hero: CmsHeroContent;
  sections?: Array<{
    key: string;
    title: string;
    body: string;
  }>;
  media?: CmsMediaReference[];
};

export type CmsHelpContent = CmsPageContent & {
  tiles: CmsHelpTile[];
};

export type CmsFaqContent = CmsPageContent & {
  faqSections: CmsFaqSection[];
};

const blockedClaimPatterns = [
  /\bDTI\b/i,
  /\bBIR\b/i,
  /\bMayor'?s?\s+Permit\b/i,
  /\bPhilGEPS\b/i,
  /\bgovernment-procurement\b/i,
  /\bIn Stock\b/i,
  /\bManila Hub\b/i,
  /\bdelivery SLA\b/i,
  /\b15[-\s]?day (quote )?(guarantee|validity|price lock)\b/i,
  /\bprice match\b/i,
  /\bguaranteed (stock|delivery|availability|warranty|price)\b/i,
  /\bBIR[-\s]?ready\b/i,
  /\btax[-\s]?ready\b/i,
  /\bpayment approval\b/i,
  /\bcashier approval\b/i,
];

function collectText(value: unknown, output: string[] = []): string[] {
  if (typeof value === "string") {
    output.push(value);
    return output;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectText(item, output));
    return output;
  }

  if (value && typeof value === "object") {
    Object.values(value).forEach((item) => collectText(item, output));
  }

  return output;
}

export function findBlockedCmsClaims(content: unknown) {
  const matches: Array<{ pattern: string; text: string }> = [];

  for (const text of collectText(content)) {
    for (const pattern of blockedClaimPatterns) {
      if (pattern.test(text)) {
        matches.push({ pattern: pattern.source, text });
      }
    }
  }

  return matches;
}

export function validateCmsContent(content: unknown) {
  const blockedClaims = findBlockedCmsClaims(content);

  return {
    ok: blockedClaims.length === 0,
    blockedClaims,
  };
}

export function assertCmsContentSafe(content: unknown) {
  const result = validateCmsContent(content);

  if (!result.ok) {
    const first = result.blockedClaims[0];
    throw new Error(`CMS content contains a blocked public claim: ${first.text}`);
  }
}

const faqContent: CmsFaqContent = {
  slug: "faq",
  status: "published",
  hero: {
    eyebrow: "FAQ",
    title: "Evidence-safe answers for HACIEN buyers.",
    description:
      "Search common questions about RFQ intake, payment posture, documents, warranty questions, and request tracking.",
    image: "knowledge",
    primaryAction: { href: "/quote", label: "Start an RFQ" },
    secondaryAction: { href: "/help", label: "Open Help Center" },
    highlights: [
      { label: "RFQ-first", text: "Requests are reviewed before business records." },
      { label: "No checkout claim", text: "Live online payment is not claimed here." },
      { label: "Document caution", text: "Official records require approved evidence." },
      { label: "Support path", text: "Track and follow up with the request reference." },
    ],
  },
  faqSections: faqData.sections,
};

const helpContent: CmsHelpContent = {
  slug: "help",
  status: "published",
  hero: {
    eyebrow: "Help Center",
    title: "Prepare a cleaner request before you send it.",
    description:
      "Use these tools to organize RFQ details and understand what the public website can and cannot confirm.",
    image: "workspace",
    primaryAction: { href: "/quote", label: "Start an RFQ" },
    secondaryAction: { href: "/faq", label: "Search FAQ" },
    highlights: [
      { label: "Attachments", text: "BOQ, PDF, images, and spreadsheets can support review." },
      { label: "Tracking", text: "Gateway references help with follow-up." },
      { label: "Prototype tools", text: "Parser output is review-only." },
      { label: "Bounded claims", text: "Official documents are not issued here." },
    ],
  },
  tiles: [
    {
      title: "Prepare an RFQ",
      text: "Attach requirements, BOQs, supplier quotes, images, spreadsheets, or plain descriptions.",
      href: "/quote",
    },
    {
      title: "Track a request",
      text: "Use your Gateway reference to inspect the current public tracking response.",
      href: "/track/sample-reference",
    },
    {
      title: "Read FAQ",
      text: "Search evidence-safe answers about intake, documents, payments, warranty questions, and support.",
      href: "/faq",
    },
    {
      title: "Contact HACIEN",
      text: "Send a support or follow-up message with the request details.",
      href: "/contact",
    },
  ],
};

export function getFaqContent() {
  assertCmsContentSafe(faqContent);
  return faqContent;
}

export function getHelpContent() {
  assertCmsContentSafe(helpContent);
  return helpContent;
}

export function getPublishedCmsContent() {
  return [getFaqContent(), getHelpContent()];
}
