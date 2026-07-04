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
      "Identify products meeting or exceeding each parameter",
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
      "Reviewing supplier inputs for availability, lead times, warranty coverage, and formal quotation readiness when supplier evidence is available.",
    heroCopy:
      "Government procurement benefits from supplier evidence. HACIEN can help review supplier inputs for stock, lead time, warranty, and formal offer capability before a quotation is relied on.",
    sections: [
      {
        heading: "Why supplier coordination is critical",
        body: "Submitting a quotation for items that are unavailable, out of stock, or beyond a supplier's delivery capacity is a common procurement failure. Supplier availability, warranty, and lead-time inputs should be evidenced before a quotation is relied on.",
      },
      {
        heading: "What HACIEN coordinates",
        body: "HACIEN can help review supplier-provided availability, lead time, warranty terms, and documentation capability for the specific request. Final reliance should be based on the relevant supplier evidence and formal quotation.",
      },
      {
        heading: "Supplier documentation support",
        body: "Government procurement often requires supplier certifications, product data sheets, and warranty certificates. HACIEN can help organize required supplier documentation as part of quotation preparation when those materials are available.",
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
      "HACIEN helps review supplier inputs for availability, lead times, warranty coverage, and quotation readiness for government procurement.",
  },
  {
    slug: "quotation-support",
    title: "Quotation Support",
    category: "Government Procurement",
    summary:
      "Preparing structured quotation packages for government and institutional procurement submissions.",
    heroCopy:
      "A well-prepared quotation is the foundation of successful procurement. HACIEN helps organize quotation inputs for government and institutional buyers without claiming buyer-side compliance approval.",
    sections: [
      {
        heading: "What a procurement quotation includes",
        body: "A procurement quotation may include item descriptions, technical specifications, unit pricing, total pricing, delivery terms, warranty coverage, validity period, and supplier information. The exact requirements depend on the buyer, supplier evidence, and formal procurement context.",
      },
      {
        heading: "HACIEN quotation preparation support",
        body: "HACIEN can help organize quotation packages against buyer specifications, required line items, and pricing context. We do not file quotations on behalf of buyers or claim buyer-side compliance approval.",
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
      "Include warranty terms and coverage period when verified",
      "State delivery timeline and location when confirmed",
      "Include the validity period stated by the quotation source",
      "Attach required certifications and data sheets",
    ],
    relatedInsights: ["how-to-prepare-rfq", "it-procurement-guide", "government-procurement-it-checklist"],
    ctaLabel: "Get Quotation Support",
    ctaUrl: "/quote",
    seoTitle: "Quotation Support | HACIEN Government Procurement",
    seoDescription:
      "HACIEN helps organize quotation inputs for government and institutional procurement including specifications, pricing, warranty, and delivery terms where verified.",
  },
  {
    slug: "delivery-coordination",
    title: "Delivery Coordination",
    category: "Government Procurement",
    summary:
      "Reviewing delivery schedules, logistics, acceptance inspection, and handover documentation needs for government procurement.",
    heroCopy:
      "Government procurement delivery requires more than shipping. HACIEN can help review logistics, acceptance inspection, and handover documentation needs before fulfillment proceeds.",
    sections: [
      {
        heading: "Government delivery requirements",
        body: "Government procurement deliveries typically require pre-delivery notification, inspection upon receipt, acceptance documentation, and serial number recording. Delivery failures or documentation gaps can result in non-acceptance and payment delays.",
      },
      {
        heading: "HACIEN delivery coordination",
        body: "HACIEN can help align suppliers and buyers around delivery schedule, documentation needs, acceptance inspection, and post-delivery paperwork when those items are part of the formal request.",
      },
      {
        heading: "After delivery",
        body: "Post-delivery tasks may include warranty registration, asset tagging coordination, and delivery receipt handling. These tasks should be confirmed through the formal quotation or project communication.",
      },
    ],
    checklist: [
      "Confirm delivery date with supplier and buyer when available",
      "Prepare delivery documentation (packing list, invoice)",
      "Notify buyer's receiving office in advance",
      "Support physical inspection upon delivery",
      "Record serial numbers and asset details",
      "Collect acceptance/receipt documentation when applicable",
      "File warranty documentation when available",
    ],
    relatedInsights: ["government-procurement-it-checklist", "it-procurement-guide", "how-to-prepare-rfq"],
    ctaLabel: "Coordinate Your Delivery",
    ctaUrl: "/contact",
    seoTitle: "Delivery Coordination | HACIEN Government Procurement",
    seoDescription:
      "HACIEN helps review delivery scheduling, acceptance inspection, and handover documentation needs for government and institutional procurement.",
  },
  {
    slug: "documentation-support",
    title: "Documentation Support",
    category: "Government Procurement",
    summary:
      "Organizing procurement documentation inputs such as quotation packages, delivery receipts, warranty certificates, and compliance records when available.",
    heroCopy:
      "Procurement documentation is as important as the products themselves. HACIEN helps organize available paperwork and identify missing documentation for buyer review.",
    sections: [
      {
        heading: "Why documentation matters in government procurement",
        body: "Government and institutional procurement is audit-ready. Every transaction requires complete documentary trail: from request to quotation, award, delivery, and payment. Missing or incorrect documentation can delay payment, trigger audit findings, or result in contract cancellation.",
      },
      {
        heading: "Documents HACIEN helps prepare",
        body: "HACIEN can assist with organizing supplier quotation packages, technical specifications, product data sheets, warranty certificates, delivery documentation, and post-delivery acceptance records when available. We do not prepare legal or notarial documents.",
      },
      {
        heading: "Documentation compliance notes",
        body: "Government procurement documentation requirements vary by agency, procurement mode, and contract value. HACIEN recommends that buyers confirm specific documentary requirements with their procurement office before finalizing submissions.",
      },
    ],
    checklist: [
      "Quotation package with complete specifications",
      "Product data sheets for all line items",
      "Warranty certificates from manufacturer or distributor when available",
      "Delivery receipt or acceptance record when applicable",
      "Serial number and asset log",
      "Warranty registration confirmation when applicable",
      "Post-delivery acceptance record when applicable",
    ],
    relatedInsights: ["government-procurement-it-checklist", "how-to-prepare-rfq", "approved-equivalent-explained"],
    ctaLabel: "Get Documentation Support",
    ctaUrl: "/quote",
    seoTitle: "Documentation Support | HACIEN Government Procurement",
    seoDescription:
      "HACIEN helps organize procurement documentation inputs including quotation packages, delivery receipts, warranty certificates, and compliance records when available.",
  },
];

export function getGovTopic(slug: string) {
  return governmentTopics.find((topic) => topic.slug === slug);
}
