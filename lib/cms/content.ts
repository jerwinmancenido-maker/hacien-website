import faqData from "../../config/faq-data.json";
import type { CmsMediaKey } from "@/lib/cms/media";
import {
  brandsLine,
  companyContact,
  deliveryClauses,
  deliveryLine,
  founderLine,
  registeredCompanyName,
  registrationPapersNote,
  replyTime,
  showroomNote,
  supplyException,
  supplyItems,
} from "@/data/companyContact";

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
  /\b\d{3}[-\s]\d{3}[-\s]\d{3}[-\s](?:\d{3}|\d{5})\b/,
  /\b(?:DTI|BN|Business Name|(?:Mayor(?:'s)?(?:\s*\/\s*Business)?|Business)\s+Permit|PhilGEPS|BIR|ATP|OCN|RSN)\b(?:\s*\(?Reg(?:istration)?\.?(?:\s*(?:No|Number)\.?)?\)?|\s*(?:No|Number)\.?|\s*#)?\s*[:#-]?\s*\d+/i,
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
      { href: "/insights", label: "Insights" },
      { href: "/about", label: "Company" },
      { href: "/contact", label: "Contact" },
    ],
    quoteAction: { href: "/quote", label: "Request a Quote" },
  },
  footer: {
    statement:
      "IT supplier in Ortigas, Pasig. Computers, networks, power, security, software, and the papers a quotation needs. Availability and price are confirmed in the quotation, not on this website.",
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
          { href: "/products", label: "Product list" },
          { href: "/support", label: "Support" },
          { href: "/support", label: "Help Center" },
          { href: "/faq", label: "FAQ" },
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
    eyebrow: "IT supplier Philippines",
    title: "IT supply for offices, schools, and agencies",
    description:
      "HACIEN Information Technology Solutions is a DTI-registered IT supplier in Ortigas, Pasig, and a PhilGEPS-registered supplier for private companies and government agencies. Describe the computers, network, power, security, or software you need. HACIEN checks Philippine distributors and sends a quotation within 1 business day.",
    image: "commandCenter",
    primaryAction: { href: "/quote", label: "Request a Quote" },
    secondaryAction: { href: "/contact", label: "Contact" },
    highlights: supplyItems.map((item) => ({ label: item.title, text: item.text })),
  },
  heroSignals: supplyItems.map((item) => ({ title: item.title, text: item.text })),
  rfqReadiness: {
    eyebrow: "Brands and delivery",
    title: "Brands",
    description: brandsLine,
    cards: deliveryClauses.map((clause) => ({ title: clause, text: "" })),
    imagePanel: {
      eyebrow: "Delivery",
      title: "Delivery",
      caption: "",
    },
  },
  howItWorks: {
    eyebrow: "Quotation",
    title: "Request a quotation.",
    description: replyTime,
    steps: [
      { title: "Send", text: "Share a list, a photo, a supplier quote, or a plain description." },
      { title: "Acknowledge", text: replyTime },
      { title: "Confirm", text: "Formal quotations follow once supplier stock and pricing are confirmed." },
      { title: "Deliver", text: deliveryLine },
    ],
  },
  solutionsPreview: {
    eyebrow: "Solutions",
    title: "Work HACIEN takes on.",
    description:
      "Work HACIEN takes on includes infrastructure, a surveyed installation, workplace technology, cybersecurity, cloud, and support. Send the details you have. You do not need perfect specifications first.",
    viewAllLabel: "View all solutions →",
  },
  productCatalogPreview: {
    eyebrow: "Technology",
    title: "Technology is what a solution is built from.",
    description:
      "Technology is what a solution is built from: computers, servers, networks, printers, software, cameras, and power. Open a category for the specifications buyers write into an RFQ. Prices and availability are confirmed in a formal quotation, never assumed.",
  },
  platformPreview: {
    eyebrow: "Requests",
    title: "Each request stays tied to its history.",
    description:
      "Your requests, quotations, deliveries, and support stay tied to one account record, so follow-ups never restart the story.",
    layers: [
      { title: "Request", text: "Share a list, a photo, a supplier quote, or a plain description." },
      { title: "History", text: "Each request stays tied to its history." },
      { title: "Quotation", text: "Formal quotations follow once supplier stock and pricing are confirmed." },
      { title: "Contact", text: "Contact HACIEN about a request." },
    ],
    action: { href: "/contact", label: "Contact" },
  },
  trustPreview: {
    eyebrow: "Registrations",
    title: registeredCompanyName,
    description: registrationPapersNote,
    cards: [],
    action: { href: "/compliance", label: "See Government Compliance" },
  },
  accessPreview: {
    eyebrow: "Contact",
    title: "Contact HACIEN.",
    description: replyTime,
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
    title: "About HACIEN.",
    description:
      "HACIEN Information Technology Solutions supplies and integrates IT for private companies, schools, and government agencies from Ortigas Center, Pasig City. The work is quotation-driven: you describe the requirement, HACIEN confirms the model with distributors, and the quotation states the terms.",
    image: "workspace",
    primaryAction: { href: "/quote", label: "Request a Quote" },
    secondaryAction: { href: "/contact", label: "Contact" },
    highlights: [
      { label: "Office address", text: companyContact.addressOneLine },
      { label: "Appointments", text: showroomNote },
      { label: "Brands", text: brandsLine },
      { label: "Delivery", text: "Nationwide across the Philippines." },
    ],
  },
  story: {
    eyebrow: "Company",
    title: "Based in Ortigas Center, Pasig City.",
    paragraphs: [
      founderLine,
      "The public record is the office, the registrations, and the way a request is handled. HACIEN is a DTI-registered sole proprietorship, a BIR-registered taxpayer, a holder of the Pasig City Mayor's / Business Permit, and a PhilGEPS-registered supplier. Numbers for those papers are not published online. They are sent on private request when an accreditation packet needs them.",
      "Buyers use HACIEN for a single laptop and for a floor that needs a survey, a bill of quantities, supply, installation, testing, and turnover. Product categories explain the technology. Solution pages explain the job. Both end in the same place: a quotation a person reviews before anything is ordered.",
      "Walk-in visits and pick-ups are by prior appointment. Replies go out within 1 business day, Monday to Friday, 9:00 AM – 6:00 PM PHT, excluding holidays.",
    ],
    signals: [...deliveryClauses],
  },
  workingStandard: {
    eyebrow: "What HACIEN supplies",
    title: "What HACIEN supplies",
    description: `${brandsLine} ${supplyException}`,
    cards: [
      ...supplyItems.map((item) => ({ title: item.title, text: item.text })),
      { title: "Appointments", text: showroomNote },
      { title: "Delivery", text: deliveryLine },
    ],
  },
  cta: {
    eyebrow: "Reply time",
    title: "Request a quotation.",
    description: replyTime,
    action: { href: "/quote", label: "Request a Quote" },
  },
};

const solutionsContent: CmsSolutionsContent = {
  slug: "solutions",
  status: "published",
  hero: {
    eyebrow: "Solutions",
    title: "Solutions are jobs to be done.",
    description:
      "A solution is a piece of work HACIEN takes on, from your request to delivery: infrastructure, integration, workplace technology, software, security, and support needs. Technology pages, by contrast, describe the products a solution is built from, including the specifications an RFQ should name.",
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
      { title: "Infrastructure requests need facts.", text: "Devices, servers, storage, network equipment, and power needs are easier to review when usage, site, and scale are clear. A floor count and a user count change the switch, the UPS, and the server." },
      { title: "Integration is a sequence of work.", text: "Site survey, bill of quantities, supply, installation, testing, and turnover are quoted as a project when the buyer wants more than a delivery. Closeout records stay with that request." },
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
      text: "Describe it in the chat instead. HACIEN reviews the requirement before treating any solution path as final.",
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
    title: "Different buyers, different requirements.",
    description:
      "HACIEN shapes each RFQ around the buyer's operating reality: specifications, supplier timing, warranty terms, delivery coordination, and procurement documentation. Government, school, and private buyers in the Philippines do not fill in that list the same way.",
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
      {
        title: "Government",
        text:
          "Supplying NGAs, LGUs, SUCs, and GOCCs under PhilGEPS Registration (Shopping, Small Value Procurement, and Public Bidding) with complete BIR Sales Invoices, Delivery Receipts with itemized Packing Lists, and Collection Receipts. Send the technical specifications and the delivery site. When you need a conforme, HACIEN signs it for the lines the quotation covers. Registration papers are provided on private request, not published here.",
      },
      {
        title: "Corporate & Commercial",
        text:
          "Supplying offices, BPOs, and growing businesses with laptops, desktops, monitors, printers, UPS power protection, enterprise networking, and office equipment. A private buyer can start with a seat count and a floor photo. The quotation splits endpoints, the closet, and installation if you want them together.",
      },
      {
        title: "Schools, Universities & Technical Training",
        text:
          "Supplying computer laboratories, networking setups, power and hand tools, workshop hardware materials, and instructional/training equipment. Laboratory seats, the faculty laptop, and the room switch are separate lines so the quantities stay accurate.",
      },
      {
        title: "Contractors, Facilities & Industrial Maintenance",
        text:
          "Supplying engineering, construction, and facility teams with CCTV security systems, structured cabling, power and hand tools, hardware materials, and general commercial supplies. Say whether the gear sits in a finished room or on a job site. Outdoor cameras and power protection depend on that.",
      },
      {
        title: "Healthcare",
        text:
          "Reliable endpoint, network, storage, power, security, and support materials for operational environments.",
      },
    ],
  },
  cta: {
    eyebrow: "Industry-specific review",
    title: "Have a requirement with site, policy, or delivery constraints?",
    description: "Send the requirement details — site, policy, or delivery constraints included — and HACIEN shapes the RFQ path around them.",
    action: { href: "/quote", label: "Request a Quote" },
  },
};

const faqContent: CmsFaqContent = {
  slug: "faq",
  status: "published",
  hero: {
    eyebrow: "FAQ",
    title: "Questions buyers ask before they send a list.",
    description:
      "Computers, networks, UPS sizing, CCTV, government requests, installation, and what this website will not confirm. Search the answers, then send the request.",
    image: "knowledge",
    primaryAction: { href: "/quote", label: "Request a Quote" },
    secondaryAction: { href: "/support", label: "Get support" },
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
