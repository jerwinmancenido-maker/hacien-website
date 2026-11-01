import faqData from "../../config/faq-data.json";
import type { CmsMediaKey } from "@/lib/cms/media";

export type CmsStatus = "published" | "draft" | "archived";

export type CmsMediaReference = {
  key: string;
  source: string;
  alt: string;
  sourceNote?: string;
};

export type CmsHeroImage = CmsMediaKey;

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

export type CmsLink = {
  href: string;
  label: string;
};

export type CmsNavigationGroup = {
  title: string;
  links: CmsLink[];
};

export type CmsNavigationContent = {
  header: {
    primaryItems: CmsLink[];
    quoteAction: CmsLink;
  };
  footer: {
    statement: string;
    groups: CmsNavigationGroup[];
  };
};

export type CmsInlineCard = {
  title: string;
  text: string;
};

export type CmsSectionIntro = {
  eyebrow: string;
  title: string;
  description?: string;
};

export type CmsHomeContent = CmsPageContent & {
  heroSignals: CmsInlineCard[];
  rfqReadiness: CmsSectionIntro & {
    cards: CmsInlineCard[];
    imagePanel: {
      eyebrow: string;
      title: string;
      caption: string;
    };
  };
  howItWorks: CmsSectionIntro & {
    steps: CmsInlineCard[];
  };
  solutionsPreview: CmsSectionIntro & {
    viewAllLabel: string;
  };
  productCatalogPreview: CmsSectionIntro;
  platformPreview: CmsSectionIntro & {
    layers: CmsInlineCard[];
    action: CmsLink;
  };
  trustPreview: CmsSectionIntro & {
    cards: CmsInlineCard[];
    action: CmsLink;
  };
  accessPreview: CmsSectionIntro & {
    actions: CmsLink[];
  };
};

export type CmsAboutContent = CmsPageContent & {
  story: CmsSectionIntro & {
    paragraphs: string[];
    signals: string[];
  };
  workingStandard: CmsSectionIntro & {
    cards: CmsInlineCard[];
  };
  cta: CmsSectionIntro & {
    action: CmsLink;
  };
};

export type CmsSolutionsContent = CmsPageContent & {
  meaning: CmsSectionIntro & {
    cards: CmsInlineCard[];
  };
  activeAreas: CmsSectionIntro & {
    fallback: CmsInlineCard & {
      action: CmsLink;
    };
  };
  cta: CmsSectionIntro & {
    action: CmsLink;
  };
};

export type CmsIndustriesContent = CmsPageContent & {
  buyerContext: CmsSectionIntro & {
    signals: string[];
  };
  supportedIndustries: CmsSectionIntro & {
    cards: CmsInlineCard[];
  };
  cta: CmsSectionIntro & {
    action: CmsLink;
  };
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

const navigationContent: CmsNavigationContent = {
  header: {
    primaryItems: [
      { href: "/", label: "Home" },
      { href: "/solutions", label: "Solutions" },
      { href: "/technology", label: "Technology" },
      { href: "/products", label: "Products" },
      { href: "/platform", label: "Platform" },
      { href: "/insights", label: "Insights" },
      { href: "/about", label: "Company" },
      { href: "/contact", label: "Contact" },
    ],
    quoteAction: { href: "/quote", label: "Request a Quote" },
  },
  footer: {
    statement: "Technology procurement clarified before anyone quotes.",
    groups: [
      {
        title: "Company",
        links: [
          { href: "/about", label: "About" },
          { href: "/about/company-profile", label: "Company Profile" },
          { href: "/trust-center", label: "Trust & Compliance" },
          { href: "/contact", label: "Contact" },
        ],
      },
      {
        title: "Explore",
        links: [
          { href: "/solutions", label: "Solutions" },
          { href: "/technology", label: "Technology" },
          { href: "/industries", label: "Industries" },
          { href: "/platform", label: "Platform" },
          { href: "/insights", label: "Insights" },
        ],
      },
      {
        title: "Start",
        links: [
          { href: "/quote", label: "Request a Quote" },
          { href: "/track", label: "Track Request" },
          { href: "/products", label: "Technology RFQ Builder" },
          { href: "/support", label: "Support" },
          { href: "/help", label: "Help Center" },
          { href: "/faq", label: "B2B FAQ" },
        ],
      },
      {
        title: "Tools",
        links: [
          { href: "/customer-workspace", label: "Customer Workspace" },
          { href: "/search", label: "Search" },
        ],
      },
      {
        title: "Legal",
        links: [
          { href: "/privacy", label: "Privacy Policy" },
          { href: "/terms", label: "Terms" },
          { href: "/legal", label: "Legal" },
        ],
      },
    ],
  },
};

const homepageContent: CmsHomeContent = {
  slug: "homepage",
  status: "published",
  hero: {
    eyebrow: "HACIEN IT Solutions",
    title: "Technology procurement, clarified before anyone quotes.",
    description:
      "Send a requirement list, BOQ, photo, supplier quote, or rough idea. HACIEN organizes the details and flags what still needs supplier review before price, stock, payment, or delivery is treated as confirmed.",
    image: "commandCenter",
    primaryAction: { href: "/quote", label: "Request a Quote" },
    secondaryAction: { href: "/technology", label: "Explore Technology" },
    highlights: [
      { label: "RFQ review", text: "Specs, BOQs, photos, and plain requests are shaped before quoting." },
      { label: "Supplier checks", text: "Availability, warranty, lead time, and assumptions stay visible when checked." },
      { label: "Trackable follow-up", text: "Every request gets a reference so the conversation can continue." },
    ],
  },
  heroSignals: [
    { title: "RFQ review", text: "Specs, BOQs, photos, and plain requests are shaped before quoting." },
    { title: "Supplier checks", text: "Availability, warranty, lead time, and assumptions stay visible when checked." },
    { title: "Trackable follow-up", text: "Every request gets a reference so the conversation can continue." },
  ],
  rfqReadiness: {
    eyebrow: "RFQ Readiness",
    title: "Turn incomplete specs into a usable request.",
    description:
      "The first job is not to sell a model. It is to make the request clear enough for responsible checking and practical follow-up.",
    cards: [
      { title: "What is needed", text: "Users, quantity, site, deadline, and the business reason behind the request." },
      { title: "What is unclear", text: "Missing specs, compatibility questions, equivalents, and assumptions that affect review." },
      { title: "What can be checked", text: "Supplier inputs, warranty terms, lead time, and commercial conditions when evidence is available." },
      { title: "What happens next", text: "A usable RFQ with a reference number and written follow-up." },
    ],
    imagePanel: {
      eyebrow: "Details before quote",
      title: "The useful detail is usually hidden in the first conversation.",
      caption:
        "HACIEN helps surface assumptions, options, and missing details before a formal quotation path is treated as ready.",
    },
  },
  howItWorks: {
    eyebrow: "How HACIEN Works",
    title: "A short path for requests that are not yet perfect.",
    description:
      "The public RFQ experience is designed for real buyers: sometimes you have a BOQ, sometimes a model, and sometimes only the outcome you need.",
    steps: [
      { title: "Send", text: "Share a list, BOQ, photo, supplier quote, or plain description." },
      { title: "Clarify", text: "HACIEN checks what is missing or risky before quotation work begins." },
      { title: "Review", text: "Supplier and technical inputs are organized when available." },
      { title: "Respond", text: "You receive the next practical step with the original request preserved." },
    ],
  },
  solutionsPreview: {
    eyebrow: "Solutions",
    title: "Common IT needs, organized for review.",
    description:
      "These solution areas help buyers describe work across infrastructure, workplace technology, cybersecurity, cloud, and support without needing perfect specifications first.",
    viewAllLabel: "View all solutions →",
  },
  productCatalogPreview: {
    eyebrow: "Technology",
    title: "Technology categories without fake certainty.",
    description:
      "Use product categories to describe what you need. Final models, prices, and commercial terms still require RFQ review.",
  },
  platformPreview: {
    eyebrow: "HACIEN Platform",
    title: "HACIEN keeps each request tied to its history.",
    description:
      "Workspace, Timeline, Guardian, and Customer Workspace help keep inquiries, operations, and account history connected. Public availability is announced only when mature.",
    layers: [
      { title: "Workspace", text: "Secure internal operations" },
      { title: "Timeline", text: "Relationship memory" },
      { title: "Guardian", text: "Operational guidance" },
      { title: "Customer Workspace", text: "Future customer continuity" },
    ],
    action: { href: "/platform", label: "Explore Platform" },
  },
  trustPreview: {
    eyebrow: "Trust & Confidence",
    title: "Trust without overstatement.",
    description:
      "HACIEN keeps public claims bounded, formal terms document-controlled, and customer communication clear.",
    cards: [
      { title: "Bounded identity", text: "Public company information stays limited to what is appropriate for public review." },
      { title: "Quotation discipline", text: "Pricing, warranty, delivery, payment, and tax treatment are confirmed through formal quotation and written communication." },
      { title: "Customer continuity", text: "Inquiries, quotations, delivery, support, and follow-up are treated as one continuing account record." },
    ],
    action: { href: "/about/company-profile", label: "Read HACIEN company profile →" },
  },
  accessPreview: {
    eyebrow: "Access HACIEN",
    title: "Continue through one connected access point.",
    description:
      "Internal personnel can open Workspace. Customers can track requests, learn about the future Customer Workspace, or contact HACIEN for support.",
    actions: [
      { href: "/contact", label: "Contact HACIEN" },
    ],
  },
};

const aboutContent: CmsAboutContent = {
  slug: "about",
  status: "published",
  hero: {
    eyebrow: "Company",
    title: "A technology partner for requests that need sharper definition.",
    description:
      "HACIEN helps organizations turn rough requirements, product lists, and project notes into clearer RFQ conversations.",
    image: "workspace",
    primaryAction: { href: "/quote", label: "Request a Quote" },
    secondaryAction: { href: "/solutions", label: "Explore Solutions" },
    highlights: [
      { label: "RFQ-first", text: "The website captures the request before formal quotation work." },
      { label: "Review discipline", text: "Missing details and assumptions stay visible." },
      { label: "Continuity", text: "Requests stay connected through follow-up." },
      { label: "Bounded claims", text: "Public pages avoid unsupported commercial promises." },
    ],
  },
  story: {
    eyebrow: "Why HACIEN Exists",
    title: "Technology buying often gets messy before the first quote is useful.",
    paragraphs: [
      "Many teams already know what they need in practical terms: faster devices, a stable network, licensed software, better security, or a project closeout that will not fall apart. The hard part is turning that need into a request suppliers can answer clearly.",
      "HACIEN was built around that gap. We help collect the details, surface the missing details, and keep the request organized before commercial terms are treated as final.",
    ],
    signals: [
      "Supplier quotes arrive in different formats",
      "Specs are incomplete or hard to compare",
      "Follow-ups disappear across inboxes",
      "Assumptions are not written down early enough",
    ],
  },
  workingStandard: {
    eyebrow: "Working Standard",
    title: "Good buying is calm, specific, and written down.",
    description:
      "HACIEN keeps the request grounded in visible details: what is known, what is missing, what needs supplier input, and what should happen next.",
    cards: [
      { title: "Start with the real business need.", text: "A useful request explains who will use the technology, where it will operate, and what outcome matters." },
      { title: "Make uncertainty visible.", text: "Equivalents, missing specifications, assumptions, warranty terms, and lead-time questions should be clear before decisions harden." },
      { title: "Keep follow-up connected.", text: "A customer should not need to repeat the same story each time a request moves from inquiry to quote to support." },
      { title: "Requirement", text: "Need, quantity, location, timeline, and decision basis are clarified." },
      { title: "Review", text: "Missing details, compatibility questions, and practical alternatives are surfaced." },
      { title: "Supplier Input", text: "Supplier-provided details are reviewed when available and relevant." },
      { title: "Quote Context", text: "Assumptions and exclusions are made visible before formal terms are relied on." },
      { title: "Follow-up", text: "The request reference keeps the next conversation connected." },
    ],
  },
  cta: {
    eyebrow: "Start with clarity",
    title: "Need an IT supplier that can turn scattered requirements into a clear RFQ?",
    description:
      "Send your requirement list, deadline, delivery location, and supporting specifications. HACIEN will help turn it into a usable RFQ.",
    action: { href: "/quote", label: "Request a Quote" },
  },
};

const solutionsContent: CmsSolutionsContent = {
  slug: "solutions",
  status: "published",
  hero: {
    eyebrow: "Solutions",
    title: "IT solution areas for clearer requests.",
    description:
      "Use these pages to describe the work HACIEN should review: infrastructure, integration, workplace technology, software, security, and support needs.",
    image: "commandCenter",
    primaryAction: { href: "/quote", label: "Request a Quote" },
    secondaryAction: { href: "/technology", label: "Explore Technology" },
    highlights: [
      { label: "Infrastructure", text: "Endpoints, servers, networks, power, and site details." },
      { label: "Integration", text: "Materials, setup needs, and closeout assumptions." },
      { label: "Sourcing", text: "Requirements, equivalents, and supplier inputs when available." },
      { label: "Continuity", text: "Follow-up, renewal, replacement, and support needs." },
    ],
  },
  meaning: {
    eyebrow: "What Solutions Mean",
    title: "Not a menu of promises. A way to describe work clearly.",
    cards: [
      { title: "Infrastructure requests need facts.", text: "Devices, servers, storage, network equipment, and power needs are easier to review when usage, site, and scale are clear." },
      { title: "Integration is more than equipment.", text: "Cabling, network, security, cloud, and software work better when scope and closeout assumptions are visible early." },
      { title: "Follow-up should not restart the story.", text: "Renewals, replacements, warranty questions, and support needs should stay connected to the original request." },
    ],
  },
  activeAreas: {
    eyebrow: "Active Solution Areas",
    title: "Pick the closest area, then describe the requirement.",
    description:
      "Start with the closest area. If the request is unusual, describe it in the RFQ instead of searching through every possible category.",
    fallback: {
      title: "Do not see the exact area?",
      text: "Use the RFQ form. HACIEN reviews the requirement before treating any solution path as final.",
      action: { href: "/quote", label: "Describe the requirement" },
    },
  },
  cta: {
    eyebrow: "Request with structure",
    title: "Have a requirement that needs checking, options, and quotation support?",
    description: "Send HACIEN your requirement list and notes. We will help shape the next RFQ step.",
    action: { href: "/quote", label: "Request a Quote" },
  },
};

const industriesContent: CmsIndustriesContent = {
  slug: "industries",
  status: "published",
  hero: {
    eyebrow: "Industries",
    title: "Procurement support shaped around each buyer's operating reality.",
    description:
      "HACIEN supports organizations whose technology needs depend on specifications, supplier timing, warranty terms, delivery coordination, and procurement documentation.",
    image: "strategy",
    primaryAction: { href: "/solutions", label: "Explore Solutions" },
    secondaryAction: { href: "/quote", label: "Request a Quote" },
    highlights: [
      { label: "Specs", text: "Procurement requirements vary by industry." },
      { label: "Review", text: "Technical specifications need working details." },
      { label: "Suppliers", text: "Supplier availability changes per project." },
      { label: "Follow-up", text: "Support should continue after closeout." },
    ],
  },
  buyerContext: {
    eyebrow: "Buyer Context",
    title: "Industry details change how products should be specified, reviewed, and delivered.",
    signals: [
      "Procurement requirements vary by industry.",
      "Technical specifications need working details.",
      "Supplier availability changes per project.",
      "Documentation and delivery expectations matter.",
      "Support should continue after closeout.",
    ],
  },
  supportedIndustries: {
    eyebrow: "Who HACIEN Supports",
    title: "Built for buyers who need organized RFQs, not generic catalog browsing.",
    cards: [
      { title: "Business", text: "Workstations, software, network upgrades, peripherals, power protection, and recurring office technology procurement." },
      { title: "Organizations", text: "Specification review, approved equivalent matching, quotation support, documentation-aware review, and delivery coordination." },
      { title: "Education", text: "Classroom devices, WiFi, printing, security systems, productivity licenses, and institutional purchasing support." },
      { title: "Healthcare", text: "Reliable endpoint, network, storage, power, security, and support materials for operational environments." },
      { title: "Construction", text: "Project office equipment, site connectivity, CCTV, access control, consumables, and deployment materials." },
      { title: "Enterprise", text: "Multi-supplier coordination for infrastructure refreshes, device rollouts, renewals, documentation, and closeout records." },
    ],
  },
  cta: {
    eyebrow: "Industry-specific review",
    title: "Have a requirement with site, policy, or delivery constraints?",
    description: "Send the requirement details, and HACIEN will help shape the RFQ path.",
    action: { href: "/quote", label: "Request a Quote" },
  },
};

const faqContent: CmsFaqContent = {
  slug: "faq",
  status: "published",
  hero: {
    eyebrow: "FAQ",
    title: "Evidence-safe answers for HACIEN buyers.",
    description:
      "Search common questions about RFQ intake, payment posture, documents, warranty questions, and request tracking.",
    image: "knowledge",
    primaryAction: { href: "/quote", label: "Request a Quote" },
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
    primaryAction: { href: "/quote", label: "Request a Quote" },
    secondaryAction: { href: "/faq", label: "Search FAQ" },
    highlights: [
      { label: "Attachments", text: "BOQ, PDF, images, and spreadsheets can support review." },
      { label: "Tracking", text: "Gateway references help with follow-up." },
      { label: "Document tools", text: "Parser output is review-only." },
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
      href: "/track",
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

export function getNavigationContent() {
  assertCmsContentSafe(navigationContent);
  return navigationContent;
}

export function getHomepageContent() {
  assertCmsContentSafe(homepageContent);
  return homepageContent;
}

export function getAboutContent() {
  assertCmsContentSafe(aboutContent);
  return aboutContent;
}

export function getSolutionsContent() {
  assertCmsContentSafe(solutionsContent);
  return solutionsContent;
}

export function getIndustriesContent() {
  assertCmsContentSafe(industriesContent);
  return industriesContent;
}

export function getPublishedCmsContent() {
  return [
    getHomepageContent(),
    getAboutContent(),
    getSolutionsContent(),
    getIndustriesContent(),
    getFaqContent(),
    getHelpContent(),
  ];
}
