export type GovTopicSection = {
  heading: string;
  body: string;
};

export type GovTopic = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  heroCopy: string;
  sections: GovTopicSection[];
  checklist: string[];
  relatedInsights: string[];
  ctaLabel: string;
  ctaUrl: string;
  seoTitle: string;
  seoDescription: string;
};

export const governmentTopics: GovTopic[] = [
  {
    slug: "specification-review",
    title: "Specification Review",
    category: "Government Procurement",
    summary:
      "Technical review of procurement specifications to identify gaps, ambiguities, and product matching requirements.",
    heroCopy:
      "Before sourcing begins, specifications must be clear. HACIEN reviews buyer-provided specs to identify what can be sourced, what needs clarification, and where approved equivalent matching may apply.",
    sections: [
      {
        heading: "Why specification review matters",
        body: "Government and institutional procurement documents often contain specifications that reference specific brands, discontinued models, or technical parameters that need clarification before suppliers can respond accurately. A thorough specification review prevents quotation errors and delivery disputes.",
      },
      {
        heading: "What HACIEN reviews",
        body: "HACIEN reviews technical specifications for hardware, software, network equipment, and general merchandise. We flag items where specifications are unclear, where brand restrictions may limit competition, and where approved equivalent options should be identified.",
      },
      {
        heading: "Output of specification review",
        body: "Following a specification review, HACIEN provides a summary of items that can be sourced as specified, items requiring clarification, and items where approved equivalent matching is recommended. This forms the basis for supplier coordination.",
      },
    ],
    checklist: [
      "Identify all technical specifications line by line",
      "Flag brand-specific or overly narrow specifications",
      "Identify items where approved equivalents are likely needed",
      "Confirm units of measure and quantities",
      "Note warranty and support requirements",
      "Identify delivery and installation requirements",
    ],
    relatedInsights: ["approved-equivalent-explained", "how-to-prepare-rfq", "government-procurement-it-checklist"],
    ctaLabel: "Submit Specifications for Review",
    ctaUrl: "/quote",
    seoTitle: "Procurement Specification Review | HACIEN Government Support",
    seoDescription:
      "HACIEN reviews government procurement specifications to identify sourcing gaps, approved equivalent needs, and quotation requirements.",
  },
  {
    slug: "approved-equivalent-matching",
    title: "Approved Equivalent Matching",
    category: "Government Procurement",
    summary:
      "Identifying technically equivalent product alternatives when specified brands or models are unavailable or restricted.",
    heroCopy:
      "When specifications call for a specific brand that is unavailable or overpriced, an approved equivalent may satisfy procurement requirements. HACIEN helps identify and document compliant alternatives.",
    sections: [
      {
        heading: "What is an approved equivalent?",
        body: "An approved equivalent is a product that meets or exceeds the technical specifications of a specified item, even if the brand or model differs. Government procurement rules in the Philippines generally allow approved equivalents when the buyer's technical working group certifies the alternative meets specifications.",
      },
      {
        heading: "How HACIEN supports equivalent matching",
        body: "HACIEN reviews buyer specifications and identifies product alternatives that match the key technical parameters: processor class, memory, storage, warranty, and form factor. We document the comparison to support buyer technical review.",
      },
      {
        heading: "Procurement notes",
        body: "Approved equivalent acceptance is ultimately determined by the buyer's technical working group or bids and awards committee. HACIEN provides the product comparison documentation—buyers and their agencies make the final acceptance decision.",
      },
    ],
    checklist: [
      "Review original specification line by line",
      "Identify key technical parameters (not brand-specific features)",
      "Source products meeting or exceeding each parameter",
      "Document brand, model, and spec comparison",
      "Provide supplier certification or product data sheet",
      "Submit for buyer technical review and acceptance",
    ],
    relatedInsights: ["approved-equivalent-explained", "it-procurement-guide", "government-procurement-it-checklist"],
    ctaLabel: "Request Equivalent Matching Support",
    ctaUrl: "/quote",
    seoTitle: "Approved Equivalent Matching | HACIEN Government Procurement",
    seoDescription:
      "HACIEN identifies technically equivalent product alternatives for government procurement specifications where specified brands are unavailable.",
  },
  {
    slug: "supplier-coordination",
    title: "Supplier Coordination",
    category: "Government Procurement",
    summary:
      "Coordinating with suppliers to validate availability, lead times, warranty coverage, and formal quotation readiness.",
    heroCopy:
      "Government procurement requires verified supplier readiness. HACIEN coordinates with suppliers to confirm stock, lead time, warranty, and formal offer capability before submitting quotations.",
    sections: [
      {
        heading: "Why supplier coordination is critical",
        body: "Submitting a quotation for items that are unavailable, out of stock, or beyond your supplier's delivery capacity is a common procurement failure. HACIEN verifies supplier readiness before quotation submission to prevent delivery failures.",
      },
      {
        heading: "What HACIEN coordinates",
        body: "HACIEN confirms product availability with suppliers, validates lead time against delivery deadlines, verifies warranty terms match specifications, and confirms that suppliers can provide the required documentation for procurement compliance.",
      },
      {
        heading: "Supplier documentation support",
        body: "Government procurement often requires supplier certifications, product data sheets, and warranty certificates. HACIEN supports collection of required supplier documentation as part of quotation preparation.",
      },
    ],
    checklist: [
      "Confirm product availability with primary supplier",
      "Validate lead time against procurement deadline",
      "Verify warranty terms match buyer specifications",
      "Confirm delivery location and logistics capability",
      "Collect product data sheets and certifications",
      "Confirm pricing is valid through deadline",
    ],
    relatedInsights: ["how-to-prepare-rfq", "government-procurement-it-checklist", "it-procurement-guide"],
    ctaLabel: "Coordinate Your Procurement",
    ctaUrl: "/contact",
    seoTitle: "Supplier Coordination | HACIEN Government Procurement",
    seoDescription:
      "HACIEN coordinates with suppliers to verify availability, lead times, warranty coverage, and quotation readiness for government procurement.",
  },
  {
    slug: "quotation-support",
    title: "Quotation Support",
    category: "Government Procurement",
    summary:
      "Preparing structured quotation packages for government and institutional procurement submissions.",
    heroCopy:
      "A well-prepared quotation is the foundation of successful procurement. HACIEN helps prepare complete, compliant quotation packages for government and institutional buyers.",
    sections: [
      {
        heading: "What a procurement quotation includes",
        body: "A complete procurement quotation includes item descriptions, technical specifications, unit pricing, total pricing, delivery terms, warranty coverage, validity period, and supplier information. Government procurement may require additional certifications and documentary requirements.",
      },
      {
        heading: "HACIEN quotation preparation support",
        body: "HACIEN prepares quotation packages that match buyer specifications, include all required line items, and present pricing clearly. We do not file quotations on behalf of buyers—we prepare the supporting documentation for buyer submission.",
      },
      {
        heading: "Common quotation issues",
        body: "Incomplete specifications, missing warranty details, incorrect unit pricing, and validity periods that lapse before award are common reasons quotations fail. HACIEN reviews quotation packages before submission to catch these issues.",
      },
    ],
    checklist: [
      "Match quotation items to procurement specification line by line",
      "Include complete technical specifications per item",
      "State unit and total pricing clearly",
      "Include warranty terms and coverage period",
      "State delivery timeline and location",
      "Include validity period (minimum 30 days recommended)",
      "Attach required certifications and data sheets",
    ],
    relatedInsights: ["how-to-prepare-rfq", "it-procurement-guide", "government-procurement-it-checklist"],
    ctaLabel: "Get Quotation Support",
    ctaUrl: "/quote",
    seoTitle: "Quotation Support | HACIEN Government Procurement",
    seoDescription:
      "HACIEN prepares complete quotation packages for government and institutional procurement including specifications, pricing, warranty, and delivery terms.",
  },
  {
    slug: "delivery-coordination",
    title: "Delivery Coordination",
    category: "Government Procurement",
    summary:
      "Coordinating delivery schedules, logistics, acceptance inspection, and handover documentation for government procurement.",
    heroCopy:
      "Government procurement delivery requires more than shipping. HACIEN coordinates logistics, acceptance inspection, and handover documentation for compliant delivery.",
    sections: [
      {
        heading: "Government delivery requirements",
        body: "Government procurement deliveries typically require pre-delivery notification, inspection upon receipt, acceptance documentation, and serial number recording. Delivery failures or documentation gaps can result in non-acceptance and payment delays.",
      },
      {
        heading: "HACIEN delivery coordination",
        body: "HACIEN works with suppliers to schedule compliant deliveries, prepare delivery documentation, support acceptance inspection, and collect required post-delivery paperwork including warranties and manuals.",
      },
      {
        heading: "After delivery",
        body: "Post-delivery tasks include warranty registration, asset tagging coordination, and submission of delivery receipts for payment processing. HACIEN supports these follow-through tasks as part of project delivery.",
      },
    ],
    checklist: [
      "Confirm delivery date with supplier and buyer",
      "Prepare delivery documentation (packing list, invoice)",
      "Notify buyer's receiving office in advance",
      "Support physical inspection upon delivery",
      "Record serial numbers and asset details",
      "Collect signed acceptance/receipt document",
      "File warranty documentation",
    ],
    relatedInsights: ["government-procurement-it-checklist", "it-procurement-guide", "how-to-prepare-rfq"],
    ctaLabel: "Coordinate Your Delivery",
    ctaUrl: "/contact",
    seoTitle: "Delivery Coordination | HACIEN Government Procurement",
    seoDescription:
      "HACIEN coordinates delivery scheduling, acceptance inspection, and handover documentation for government and institutional procurement.",
  },
  {
    slug: "documentation-support",
    title: "Documentation Support",
    category: "Government Procurement",
    summary:
      "Preparing procurement documentation including quotation packages, delivery receipts, warranty certificates, and compliance records.",
    heroCopy:
      "Procurement documentation is as important as the products themselves. HACIEN helps prepare and organize the paperwork that keeps procurement compliant.",
    sections: [
      {
        heading: "Why documentation matters in government procurement",
        body: "Government and institutional procurement is audit-ready. Every transaction requires complete documentary trail: from request to quotation, award, delivery, and payment. Missing or incorrect documentation can delay payment, trigger audit findings, or result in contract cancellation.",
      },
      {
        heading: "Documents HACIEN helps prepare",
        body: "HACIEN assists with preparation of: supplier quotation packages, technical specifications, product data sheets, warranty certificates, delivery documentation, and post-delivery acceptance records. We do not prepare legal or notarial documents.",
      },
      {
        heading: "Documentation compliance notes",
        body: "Government procurement documentation requirements vary by agency, procurement mode, and contract value. HACIEN recommends that buyers confirm specific documentary requirements with their procurement office before finalizing submissions.",
      },
    ],
    checklist: [
      "Quotation package with complete specifications",
      "Product data sheets for all line items",
      "Warranty certificates from manufacturer or distributor",
      "Delivery receipt signed by authorized representative",
      "Serial number and asset log",
      "Warranty registration confirmation",
      "Post-delivery acceptance certificate",
    ],
    relatedInsights: ["government-procurement-it-checklist", "how-to-prepare-rfq", "approved-equivalent-explained"],
    ctaLabel: "Get Documentation Support",
    ctaUrl: "/quote",
    seoTitle: "Documentation Support | HACIEN Government Procurement",
    seoDescription:
      "HACIEN helps prepare procurement documentation including quotation packages, delivery receipts, warranty certificates, and compliance records.",
  },
];

export function getGovTopic(slug: string) {
  return governmentTopics.find((topic) => topic.slug === slug);
}
