export type InsightSection = {
  heading: string;
  body: string;
};

export type Insight = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  intro: string;
  sections: InsightSection[];
  checklist: string[];
  procurementNotes: string;
  disclaimer: string;
  relatedSlugs: string[];
  ctaLabel: string;
  ctaUrl: string;
  publishedAt: string;
  readingTime: string;
  seoTitle: string;
  seoDescription: string;
};

export const insights: Insight[] = [
  {
    slug: "it-procurement-guide",
    title: "IT Procurement Guide for Philippine Organizations",
    category: "Procurement Basics",
    summary:
      "A practical introduction to IT procurement — how to define requirements, source suppliers, and manage the quotation process for business and institutional buyers.",
    intro:
      "IT procurement is the process of acquiring technology products and services in a structured, cost-effective, and compliant manner. For Philippine organizations — whether private businesses, government agencies, or educational institutions — procurement involves more than just buying products online. It requires specification, supplier engagement, quotation comparison, and often formal documentation. This guide introduces the key steps and considerations.",
    sections: [
      {
        heading: "Step 1: Define your requirements clearly",
        body: "Procurement failures most often start with unclear requirements. Before approaching any supplier, document what you need: product type, technical specifications, quantity, delivery location, warranty requirements, and budget range. Vague requirements lead to mismatched quotations and delivery disputes.",
      },
      {
        heading: "Step 2: Identify the right product category",
        body: "IT products span computers, servers, networking, software, security, and peripherals. Each category has its own procurement considerations: computers are specified by processor, memory, and storage; networks by port count and throughput; software by user count and license type. Understanding the category helps you ask the right questions.",
      },
      {
        heading: "Step 3: Engage qualified suppliers",
        body: "Not all suppliers can handle all product types. Some specialize in consumer electronics; others in enterprise hardware. When sourcing IT equipment for business or institutional use, engage suppliers who can provide warranty documentation, product data sheets, and formal quotations—not just retail pricing.",
      },
      {
        heading: "Step 4: Compare quotations carefully",
        body: "Price is not the only comparison factor. Lead time, warranty terms, inclusion of accessories, delivery scope, and after-sales support all affect the total cost and risk of a purchase. Compare quotations line by line against your original specifications.",
      },
      {
        heading: "Step 5: Manage delivery and acceptance",
        body: "Procurement does not end at purchase order issuance. Equipment should be checked against specifications, accepted by the buyer's designated receiver, and documented according to the buyer's own process. Serial numbers, warranty documents, and delivery receipts should be recorded when available.",
      },
    ],
    checklist: [
      "Document all technical specifications before approaching suppliers",
      "Include quantity, units, and delivery location in requirements",
      "State warranty requirements clearly (on-site, depot, duration)",
      "Request itemized quotations with specs, not just totals",
      "Compare lead time and warranty, not just price",
      "Confirm stock availability before award",
      "Record serial numbers and warranty documents at delivery when available",
    ],
    procurementNotes:
      "For government procurement, requirements must follow applicable laws and regulations including RA 9184 and its implementing rules. Private procurement varies by organization policy. HACIEN recommends consulting your procurement office for compliance requirements specific to your organization.",
    disclaimer:
      "This guide is for general information purposes only. Product availability, pricing, and supplier terms vary. Final sourcing decisions should be based on verified supplier quotations and confirmed stock availability at time of procurement.",
    relatedSlugs: ["how-to-prepare-rfq", "government-procurement-it-checklist", "approved-equivalent-explained"],
    ctaLabel: "Submit Your Requirements",
    ctaUrl: "/quote",
    publishedAt: "2025-01-15",
    readingTime: "7 min read",
    seoTitle: "IT Procurement Guide for Philippine Organizations | HACIEN Insights",
    seoDescription:
      "A practical guide to IT procurement in the Philippines — defining requirements, sourcing suppliers, comparing quotations, and managing delivery.",
  },
  {
    slug: "how-to-prepare-rfq",
    title: "How to Prepare an IT Request for Quotation (RFQ)",
    category: "Procurement Basics",
    summary:
      "Step-by-step guidance on preparing a complete and effective IT RFQ that suppliers can respond to accurately.",
    intro:
      "A Request for Quotation (RFQ) is the formal document that communicates your procurement requirements to suppliers. A well-prepared RFQ gets you accurate, comparable quotations. A poorly prepared RFQ leads to mismatched offers, delays, and procurement failures. This article covers the essential elements of an effective IT RFQ.",
    sections: [
      {
        heading: "What an RFQ must contain",
        body: "An IT RFQ must include: the complete item list with technical specifications, required quantities, delivery location and timeline, warranty requirements, validity period for the quotation, and any specific compliance or documentation requirements. Missing any of these elements invites supplier assumptions that may not match your needs.",
      },
      {
        heading: "Writing technical specifications",
        body: "Specifications should describe what the product must do, not just what brand it should be. Include processor class, memory capacity, storage size, connectivity options, power requirements, and any regulatory certifications required. Avoid specifying exact model numbers unless brand restriction is justified and documented.",
      },
      {
        heading: "Setting the validity period",
        body: "Quotation validity defines how long a supplier's pricing remains binding. For government procurement, a minimum 30-day validity is typical; for large projects, 60 to 90 days is recommended. Validity that expires before award creates pricing uncertainty.",
      },
      {
        heading: "Requesting the right documentation",
        body: "Along with pricing, request product data sheets, warranty certificates, and supplier information. For government procurement, additional certifications may be required. Specify what documents you need as part of the quotation package.",
      },
      {
        heading: "Distributing the RFQ",
        body: "Send your RFQ to at least three qualified suppliers to enable price comparison. Provide the same specifications to all suppliers to ensure comparable responses. Set a clear response deadline and communicate who the quotations should be submitted to.",
      },
    ],
    checklist: [
      "List all items with complete technical specifications",
      "Include quantity and unit of measure for each item",
      "State delivery location and required delivery date",
      "Specify warranty type and duration for each product",
      "Set a quotation validity period (minimum 30 days)",
      "List required supporting documents (data sheets, warranty certs)",
      "Provide a clear submission deadline and contact",
      "Send to at least three qualified suppliers",
    ],
    procurementNotes:
      "Government procurement RFQ requirements may follow specific formats and posting requirements. Private procurement RFQs are simpler but should still include complete specifications. HACIEN can help organize RFQ documentation as part of quotation support without claiming buyer-side compliance approval.",
    disclaimer:
      "RFQ requirements vary by organization type, procurement mode, and applicable regulations. This guide is for general reference. Confirm specific RFQ requirements with your procurement office before submission.",
    relatedSlugs: ["it-procurement-guide", "approved-equivalent-explained", "government-procurement-it-checklist"],
    ctaLabel: "Get RFQ Support from HACIEN",
    ctaUrl: "/quote",
    publishedAt: "2025-02-03",
    readingTime: "6 min read",
    seoTitle: "How to Prepare an IT RFQ | HACIEN Insights",
    seoDescription:
      "Step-by-step guide to preparing a complete IT Request for Quotation — covering specifications, documentation, validity, and supplier engagement.",
  },
  {
    slug: "approved-equivalent-explained",
    title: "Approved Equivalent: What It Means in IT Procurement",
    category: "Government Procurement",
    summary:
      "A plain-language explanation of approved equivalent provisions in procurement — when they apply, how they work, and what buyers and suppliers need to know.",
    intro:
      "In government and institutional procurement, 'approved equivalent' refers to a product that meets or exceeds the technical specifications of a specified item, even if it comes from a different brand or manufacturer. Understanding when and how approved equivalents apply can speed up procurement, reduce costs, and prevent delivery failures when specified brands are unavailable.",
    sections: [
      {
        heading: "Why specifications sometimes restrict competition",
        body: "Procurement specifications written around a specific brand can inadvertently restrict the number of suppliers who can respond, drive up prices, or create delivery failures when that specific brand is out of stock. Philippine procurement rules generally discourage brand-exclusive specifications in favor of performance-based specifications that allow equivalents.",
      },
      {
        heading: "When approved equivalents apply",
        body: "Approved equivalents are relevant when: a specified brand or model is discontinued, out of stock, or significantly overpriced; when the specification was written for a specific brand without technical justification; or when the buyer wants to allow competition while maintaining technical standards.",
      },
      {
        heading: "How to document an approved equivalent",
        body: "The supplier or buyer prepares a technical comparison document showing that the proposed alternative meets or exceeds each specification parameter. This typically includes a side-by-side comparison of key specs and the product data sheet for the proposed alternative. The buyer's technical team reviews and accepts or rejects the equivalent.",
      },
      {
        heading: "Common IT categories where equivalents arise",
        body: "Approved equivalent situations are common in: computers and laptops (processor generation equivalents), network switches (port count and throughput equivalents), printers (print speed and resolution equivalents), and UPS/power (VA rating equivalents). Software is generally not interchangeable by equivalent.",
      },
    ],
    checklist: [
      "Review specification for brand-specific language",
      "Identify key technical parameters (not brand features)",
      "Source products meeting each parameter",
      "Prepare side-by-side specification comparison",
      "Attach product data sheet for proposed alternative",
      "Submit for buyer technical working group review",
      "Document acceptance in procurement record",
    ],
    procurementNotes:
      "Approved equivalent acceptance is the buyer's prerogative. Suppliers cannot force acceptance of an equivalent. HACIEN can help organize comparison documentation and support the technical review process; acceptance remains with the buyer.",
    disclaimer:
      "Approved equivalent provisions vary by procurement mode, agency policy, and applicable regulations. This article is for general information. Consult your procurement office or legal counsel for specific compliance requirements.",
    relatedSlugs: ["it-procurement-guide", "how-to-prepare-rfq", "government-procurement-it-checklist"],
    ctaLabel: "Get Equivalent Matching Support",
    ctaUrl: "/government-procurement/approved-equivalent-matching",
    publishedAt: "2025-02-20",
    readingTime: "5 min read",
    seoTitle: "Approved Equivalent in IT Procurement | HACIEN Insights",
    seoDescription:
      "Plain-language explanation of approved equivalent provisions in Philippine IT procurement — when they apply, how they work, and what documentation is needed.",
  },
  {
    slug: "server-vs-nas-storage",
    title: "Server vs. NAS: Choosing the Right Storage for Your Organization",
    category: "Technology Sourcing",
    summary:
      "A practical comparison of server-based and NAS storage options to help buyers choose the right solution for their file, backup, and application needs.",
    intro:
      "When organizations need centralized storage for files, backups, or applications, they typically choose between a traditional server or a Network-Attached Storage (NAS) appliance. Both serve legitimate purposes, but they differ significantly in cost, complexity, and capability. This guide helps non-technical buyers understand the key differences.",
    sections: [
      {
        heading: "What is a NAS?",
        body: "A Network-Attached Storage (NAS) device is a purpose-built appliance designed primarily for file storage, sharing, and backup. NAS units are simpler to set up than servers, typically run dedicated storage operating systems, and are sized by drive bays and storage capacity rather than processor performance. They are ideal for shared file storage and backup in small to medium offices.",
      },
      {
        heading: "What is a server?",
        body: "A server is a general-purpose computing system that can run operating systems like Windows Server or Linux and host applications, databases, virtual machines, and other services in addition to file storage. Servers are more flexible but more expensive and complex to manage than NAS devices.",
      },
      {
        heading: "When to choose NAS",
        body: "NAS is the right choice when: your primary need is shared file storage and backup; you have a small IT team or no dedicated IT administrator; you want a simpler, lower-cost storage solution; and you do not need to run applications or virtual machines on the device.",
      },
      {
        heading: "When to choose a server",
        body: "A server is the right choice when: you need to run applications, databases, or virtual machines; you have active directory or domain controller requirements; you need more processing power for compute workloads; or you plan to expand your IT infrastructure beyond basic file storage.",
      },
      {
        heading: "Procurement considerations",
        body: "Both NAS and servers require careful sizing before purchase. For NAS, consider number of drive bays, total storage capacity, RAID configuration, and network connectivity. For servers, consider processor, memory, storage, and operating system licensing. Both require warranty and support planning.",
      },
    ],
    checklist: [
      "Identify primary use case: file storage, backup, applications, or virtualization",
      "Estimate current and 3-year storage capacity requirements",
      "Determine number of concurrent users",
      "Decide on RAID level and redundancy requirements",
      "Plan for backup: on-site, off-site, or both",
      "Confirm warranty and support requirements",
      "Budget for drives, OS licensing, and accessories separately",
    ],
    procurementNotes:
      "NAS and server pricing varies significantly by brand, configuration, and local availability. HACIEN recommends getting quotes for both options before deciding—the price difference may justify a full server for organizations with complex needs, or a NAS for simpler requirements.",
    disclaimer:
      "Product availability, pricing, and technical specifications change frequently. Final sourcing decisions should be based on current supplier quotations and confirmed stock. Consult a qualified IT professional before finalizing server or NAS specifications.",
    relatedSlugs: ["it-procurement-guide", "network-equipment-buying-guide", "business-laptop-procurement-guide"],
    ctaLabel: "Get Storage Quotation",
    ctaUrl: "/quote",
    publishedAt: "2025-03-10",
    readingTime: "6 min read",
    seoTitle: "Server vs. NAS Storage: Buyer's Guide | HACIEN Insights",
    seoDescription:
      "Practical comparison of server and NAS storage options for Philippine organizations — helping buyers choose the right solution for their needs and budget.",
  },
  {
    slug: "network-equipment-buying-guide",
    title: "Network Equipment Buying Guide for Business and Government",
    category: "Technology Sourcing",
    summary:
      "A practical guide to buying network equipment — switches, access points, firewalls, and routers — for office, campus, and facility deployments.",
    intro:
      "Network equipment procurement is one of the most technically sensitive areas of IT purchasing. Unlike computers where specs are relatively straightforward, network equipment requires careful attention to port count, throughput, PoE budget, VLAN support, and management capability. This guide provides practical guidance for business and institutional buyers.",
    sections: [
      {
        heading: "Switches: the foundation of your network",
        body: "Managed switches form the access layer of office and campus networks. When procuring switches, specify: port count (8, 16, 24, or 48 ports), PoE capability and budget (in watts), uplink speed (1GbE or 10GbE), VLAN and QoS support, and management method (web, CLI, or cloud). Unmanaged switches are acceptable for simple, flat networks but lack flexibility for growth.",
      },
      {
        heading: "Wireless access points",
        body: "Access point count is determined by floor area, wall density, and user load. Do not purchase access points without a coverage plan. Specify: WiFi standard (WiFi 5 or WiFi 6), indoor or outdoor type, PoE requirement, controller-based or standalone management, and maximum user capacity. Purchasing too few access points creates coverage gaps; too many creates interference.",
      },
      {
        heading: "Firewalls and routers",
        body: "Firewalls protect your network perimeter. Size firewalls by: concurrent user count, WAN bandwidth, required throughput with security features enabled (not just raw throughput), and specific security features needed (VPN, IPS, web filtering). Router requirements depend on ISP connection type and network topology.",
      },
      {
        heading: "Structured cabling",
        body: "Network equipment is only as good as the cable infrastructure connecting it. Structured cabling—Cat6 or Cat6A for most office deployments—is a long-term investment that should be planned before equipment procurement. Include cable, patch panels, keystones, and conduit in network project budgets.",
      },
    ],
    checklist: [
      "Count required switch ports (add 20% buffer for growth)",
      "Calculate total PoE budget for all PoE devices",
      "Plan access point locations before purchasing",
      "Size firewall by user count and bandwidth, not just price",
      "Include structured cabling in network project budget",
      "Plan for redundancy on critical network segments",
      "Confirm warranty and support terms (on-site vs. advance replacement)",
    ],
    procurementNotes:
      "Network equipment is a long-term infrastructure investment. Buying the cheapest option often results in premature replacement or performance problems. HACIEN recommends specifying business-grade equipment with minimum 3-year warranty for all production network deployments.",
    disclaimer:
      "Network equipment specifications and pricing change frequently. Product availability varies by brand and local stock. Final procurement decisions should be based on current supplier quotations and site survey results. Consult a qualified network engineer before finalizing specifications.",
    relatedSlugs: ["server-vs-nas-storage", "it-procurement-guide", "government-procurement-it-checklist"],
    ctaLabel: "Get Network Equipment Quotation",
    ctaUrl: "/quote",
    publishedAt: "2025-03-25",
    readingTime: "7 min read",
    seoTitle: "Network Equipment Buying Guide | HACIEN Insights",
    seoDescription:
      "Practical guide to buying switches, access points, firewalls, and routers for Philippine business and government deployments.",
  },
  {
    slug: "business-laptop-procurement-guide",
    title: "Business Laptop Procurement Guide",
    category: "Technology Sourcing",
    summary:
      "How to specify, source, and compare business laptops for office, remote work, and institutional deployments.",
    intro:
      "Business laptops are among the most frequently procured IT items for Philippine organizations. Whether you are equipping a new team, replacing aging devices, or responding to a government procurement requirement, choosing the right laptop specifications requires balancing performance, durability, budget, and procurement timeline. This guide covers the key decisions.",
    sections: [
      {
        heading: "Consumer vs. business-class laptops",
        body: "Consumer laptops from retail stores are designed for individual use; business-class laptops are designed for corporate environments with stronger build quality, longer support lifecycles, easier manageability, and better warranty options. For organizational procurement, business-class laptops are generally the better investment despite higher initial cost.",
      },
      {
        heading: "Specifying processor and performance",
        body: "Processor generation matters more than model name. Specify by generation class (e.g., Intel Core i5 13th generation or equivalent) rather than exact model number to enable approved equivalent matching. For office productivity, an i5 with 16GB RAM handles most workloads. For design, CAD, or data work, specify i7 or above.",
      },
      {
        heading: "Memory and storage",
        body: "16GB RAM is the practical minimum for business laptops in 2024–2025. 8GB is acceptable only for light task users. For storage, 256GB SSD is minimum; 512GB is preferred for users who work with large files. Confirm whether storage is expandable before specifying.",
      },
      {
        heading: "Display and form factor",
        body: "Screen size affects portability vs. productivity. 13–14 inch laptops are best for travel; 15–16 inch for office-primary use. Confirm resolution (FHD 1920x1080 is minimum) and panel type (IPS for color accuracy). For government procurement, check if specification allows equivalent display specs.",
      },
      {
        heading: "Warranty and support",
        body: "Business laptops should carry minimum 1-year on-site or advance replacement warranty. For government procurement, warranty terms must match specification requirements. Confirm warranty is provided by the local distributor, not just the manufacturer, to ensure serviceability.",
      },
    ],
    checklist: [
      "Specify processor class (not exact model) to allow equivalents",
      "Minimum 16GB RAM for most business use cases",
      "Minimum 512GB SSD for primary users",
      "State display size, resolution, and type",
      "Specify warranty type and duration (on-site preferred)",
      "Confirm operating system requirement (Windows 11 Pro vs. Home)",
      "State required accessories (bag, mouse, adapter)",
      "Include warranty and support documentation requirements",
    ],
    procurementNotes:
      "Laptop availability fluctuates with supply chain conditions. Popular configurations may have 2–4 week lead times. HACIEN recommends confirming stock availability before award and requesting a backup equivalent option in case the primary specification is unavailable.",
    disclaimer:
      "Laptop specifications, pricing, and availability change frequently. Final sourcing depends on supplier stock at time of procurement. Approved equivalent matching may be required if specified configurations are unavailable. Consult your procurement office for compliance requirements.",
    relatedSlugs: ["it-procurement-guide", "how-to-prepare-rfq", "government-procurement-it-checklist"],
    ctaLabel: "Get Laptop Quotation",
    ctaUrl: "/quote",
    publishedAt: "2025-04-08",
    readingTime: "6 min read",
    seoTitle: "Business Laptop Procurement Guide | HACIEN Insights",
    seoDescription:
      "How to specify and source business laptops for Philippine organizations — covering processor, memory, storage, warranty, and procurement considerations.",
  },
  {
    slug: "government-procurement-it-checklist",
    title: "Government IT Procurement Checklist: What to Prepare Before Submitting",
    category: "Government Procurement",
    summary:
      "A complete checklist of documents, steps, and considerations for government IT procurement submissions.",
    intro:
      "Government IT procurement in the Philippines follows a structured process with specific documentary requirements at each stage. Missing a step or document can delay procurement, trigger audit findings, or invalidate submissions. This checklist helps government buyers and their suppliers prepare complete and compliant procurement packages.",
    sections: [
      {
        heading: "Before issuing the RFQ",
        body: "Before sending out a Request for Quotation, ensure your technical specifications are complete, clear, and performance-based rather than brand-specific. Have your technical working group review specifications. Confirm the approved budget for the procurement. Identify at least three potential suppliers to invite.",
      },
      {
        heading: "During the quotation period",
        body: "Distribute the RFQ simultaneously to all invited suppliers. Provide equal information to all. Do not negotiate pricing during the quotation period. Set a clear submission deadline. Keep a record of who received the RFQ and when.",
      },
      {
        heading: "Evaluating quotations",
        body: "Compare quotations line by line against specifications. Check: completeness of specs, pricing per item, warranty terms, delivery timeline, and documentary completeness. Lowest price alone is not sufficient if specs are not met. Document the evaluation with your technical working group.",
      },
      {
        heading: "Before awarding",
        body: "Before awarding, confirm that the winning supplier can actually deliver: verify stock availability, confirm lead time, and validate warranty coverage. Request updated quotation if the original has expired. Document the award decision with supporting records.",
      },
      {
        heading: "At delivery",
        body: "Inspect all delivered items against specifications and purchase order. Record serial numbers for equipment. Verify that accessories and documentation are included. Follow the buyer's receiver and delivery-receipt process. File warranty documentation when available.",
      },
    ],
    checklist: [
      "Technical specifications reviewed and approved by TWG",
      "Budget approved before RFQ issuance",
      "RFQ distributed to minimum three suppliers simultaneously",
      "Quotation validity confirmed (30-day minimum)",
      "Specifications matched line by line in evaluation",
      "Warranty terms verified against specifications",
      "Stock availability confirmed before award",
      "Award documented with supporting records",
      "Physical inspection at delivery",
      "Serial numbers recorded for all equipment",
      "Delivery receipt or acceptance record completed under the buyer's process",
      "Warranty documents filed",
      "Asset tags applied and recorded",
    ],
    procurementNotes:
      "Government procurement follows RA 9184 and related issuances. Requirements may vary by procurement mode (shopping, small value, competitive bidding) and agency-specific policies. HACIEN supports the quotation and documentation preparation side of procurement—compliance determinations remain with the buyer's procurement office.",
    disclaimer:
      "This checklist is for general reference and does not constitute legal or procurement compliance advice. Government procurement requirements vary by agency, procurement mode, and applicable issuances. Always consult your agency's BAC or procurement office for definitive requirements.",
    relatedSlugs: ["how-to-prepare-rfq", "it-procurement-guide", "approved-equivalent-explained"],
    ctaLabel: "Get Government Procurement Support",
    ctaUrl: "/government-procurement",
    publishedAt: "2025-04-22",
    readingTime: "8 min read",
    seoTitle: "Government IT Procurement Checklist | HACIEN Insights",
    seoDescription:
      "Complete checklist for Philippine government IT procurement — covering RFQ preparation, quotation evaluation, award, and delivery documentation.",
  },
];

export function getInsight(slug: string) {
  return insights.find((insight) => insight.slug === slug);
}
