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
  readingTime: string;
  updated: string;
  seoTitle: string;
  seoDescription: string;
};

export const insights: Insight[] = [
  {
    slug: "it-procurement-guide",
    title: "How do I buy IT for my organization?",
    category: "Procurement Basics",
    summary:
      "Define your requirements, get comparable quotations, and check delivery against your specifications. HACIEN replies within 1 business day.",
    intro:
      "Define what you need, get quotations you can compare line by line, and check delivery against your specifications. That is the whole process, and HACIEN handles the middle of it: supplier checks, quotation preparation, and delivery coordination.",
    sections: [
      {
        heading: "Step 1: Define your requirements clearly",
        body: "Most procurement failures start with unclear requirements. Before approaching any supplier, document what you need: product type, technical specifications, quantity, delivery location, warranty requirements, and budget range. Vague requirements lead to mismatched quotations and delivery disputes.",
      },
      {
        heading: "Step 2: Identify the right product category",
        body: "IT products span computers, servers, networking, software, security, and peripherals. Each category has its own questions: computers are specified by processor, memory, and storage; networks by port count and throughput; software by user count and license type. Knowing the category helps you ask the right questions.",
      },
      {
        heading: "Step 3: Engage qualified suppliers",
        body: "Not all suppliers can handle all product types. For business or institutional use, work with suppliers who provide warranty documentation, product data sheets, and formal quotations — not just retail pricing.",
      },
      {
        heading: "Step 4: Compare quotations carefully",
        body: "Price is not the only comparison factor. Lead time, warranty terms, included accessories, delivery scope, and after-sales support all affect the total cost and risk of a purchase. Compare quotations line by line against your original specifications.",
      },
      {
        heading: "Step 5: Manage delivery and acceptance",
        body: "Procurement does not end at purchase order issuance. Check equipment against specifications, have your designated receiver accept it, and record serial numbers, warranty documents, and delivery receipts when available.",
      },
      {
        heading: "What to send",
        body: "Your item list with specifications and quantities, delivery location, warranty requirements, and budget range. A photo, a supplier quote, or a plain description works when you do not have a full specification yet.",
      },
      {
        heading: "What HACIEN checks",
        body: "Supplier availability evidence, warranty terms, and lead times for each item, then a formal quotation valid 15 days, with payment terms as stated in the quotation. HACIEN replies within 1 business day.",
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
      "Procurement requirements vary by organization policy and transaction context. HACIEN recommends confirming internal approval, documentation, and purchasing requirements with the appropriate office before relying on a quotation package.",
    disclaimer:
      "This guide is for general information purposes only. Product availability, pricing, and supplier terms vary. Final sourcing decisions should be based on verified supplier quotations and confirmed stock availability at time of procurement.",
    relatedSlugs: ["how-to-prepare-rfq", "approved-equivalent-explained", "business-laptop-procurement-guide"],
    ctaLabel: "Submit Your Requirements",
    ctaUrl: "/quote",
    readingTime: "7 min read",
    updated: "November 2026",
    seoTitle: "How Do I Buy IT for My Organization? | HACIEN Insights",
    seoDescription:
      "Define requirements, compare quotations line by line, and check delivery against specifications. HACIEN replies within 1 business day.",
  },
  {
    slug: "how-to-prepare-rfq",
    title: "How do I prepare an IT RFQ?",
    category: "Procurement Basics",
    summary:
      "An RFQ suppliers can answer accurately: complete items, specifications, quantities, delivery, warranty, and a validity period.",
    intro:
      "A good RFQ gets you accurate, comparable quotations. A poor one gets mismatched offers and delays. Include complete items, specifications, quantities, delivery details, and warranty requirements, and give suppliers one deadline and one contact.",
    sections: [
      {
        heading: "What an RFQ must contain",
        body: "An IT RFQ must include: the complete item list with technical specifications, required quantities, delivery location and timeline, warranty requirements, validity period for the quotation, and any compliance or documentation requirements. Missing any of these invites supplier assumptions that may not match your needs.",
      },
      {
        heading: "Writing technical specifications",
        body: "Specifications should describe what the product must do, not just what brand it should be. Include processor class, memory capacity, storage size, connectivity options, power requirements, and any regulatory certifications required. Avoid specifying exact model numbers unless brand restriction is justified and documented.",
      },
      {
        heading: "Setting the validity period",
        body: "Quotation validity defines how long a supplier's pricing remains binding. State the validity period in the quotation itself. Validity that expires before buyer approval creates pricing uncertainty. HACIEN quotations are valid 15 days.",
      },
      {
        heading: "Requesting the right documentation",
        body: "Along with pricing, request product data sheets, warranty certificates, and supplier information where relevant. Specify what supporting materials you need as part of the quotation package.",
      },
      {
        heading: "Distributing the RFQ",
        body: "Send your RFQ to at least three qualified suppliers to enable price comparison. Provide the same specifications to all suppliers so responses are comparable. Set a clear response deadline and say who quotations should be submitted to.",
      },
      {
        heading: "What to send",
        body: "Your item list with specifications and quantities, delivery location and date, warranty type and duration, and any documents you require with the quotation.",
      },
      {
        heading: "What HACIEN checks",
        body: "Your RFQ against supplier availability evidence, then a formal quotation valid 15 days, with payment terms as stated in the quotation. HACIEN replies within 1 business day, and can help organize RFQ documentation as part of quotation support without claiming buyer-side approval authority.",
      },
    ],
    checklist: [
      "List all items with complete technical specifications",
      "Include quantity and unit of measure for each item",
      "State delivery location and required delivery date",
      "Specify warranty type and duration for each product",
      "Set a quotation validity period (HACIEN quotations are valid 15 days)",
      "List required supporting documents (data sheets, warranty certs)",
      "Provide a clear submission deadline and contact",
      "Send to at least three qualified suppliers",
    ],
    procurementNotes:
      "RFQ requirements may follow buyer-specific formats and approval requirements. HACIEN can help organize RFQ documentation as part of quotation support without claiming buyer-side approval authority.",
    disclaimer:
      "RFQ requirements vary by organization type, procurement mode, and applicable regulations. This guide is for general reference. Confirm specific RFQ requirements with your procurement office before submission.",
    relatedSlugs: ["it-procurement-guide", "approved-equivalent-explained", "business-laptop-procurement-guide"],
    ctaLabel: "Get RFQ Support from HACIEN",
    ctaUrl: "/quote",
    readingTime: "6 min read",
    updated: "November 2026",
    seoTitle: "How Do I Prepare an IT RFQ? | HACIEN Insights",
    seoDescription:
      "Prepare an RFQ suppliers can answer: complete items, specifications, quantities, delivery, warranty, and validity. HACIEN replies within 1 business day.",
  },
  {
    slug: "approved-equivalent-explained",
    title: "What does 'approved equivalent' mean?",
    category: "Institutional Procurement",
    summary:
      "An approved equivalent meets or exceeds the specified item's technical parameters, from a different brand — and only the buyer can accept it.",
    intro:
      "An approved equivalent is a product that meets or exceeds the technical specifications of a specified item, even from a different brand. It applies when the specified brand is unavailable or overpriced — and acceptance always belongs to the buyer, never the supplier.",
    sections: [
      {
        heading: "Why specifications sometimes restrict competition",
        body: "Specifications written around a specific brand can restrict how many suppliers can respond, drive up prices, or cause delivery failures when that brand is out of stock. Performance-based specifications let buyers review equivalent options without losing the technical intent.",
      },
      {
        heading: "When approved equivalents apply",
        body: "Approved equivalents are relevant when: a specified brand or model is discontinued, out of stock, or significantly overpriced; when the specification was written for a specific brand without technical justification; or when the buyer wants to allow competition while maintaining technical standards.",
      },
      {
        heading: "How to document an approved equivalent",
        body: "The supplier or buyer prepares a technical comparison showing that the proposed alternative meets or exceeds each specification parameter. This typically includes a side-by-side comparison of key specs and the product data sheet for the proposed alternative. The buyer's technical team reviews and accepts or rejects the equivalent.",
      },
      {
        heading: "Common IT categories where equivalents arise",
        body: "Approved equivalent situations are common in: computers and laptops (processor generation equivalents), network switches (port count and throughput equivalents), printers (print speed and resolution equivalents), and UPS/power (VA rating equivalents). Software is generally not interchangeable by equivalent.",
      },
      {
        heading: "What to send",
        body: "The original specification, the key technical parameters (not brand features), and whether your buyer allows equivalents at all.",
      },
      {
        heading: "What HACIEN checks",
        body: "Each parameter of the proposed alternative against the original specification, documented side by side with the product data sheet. HACIEN organizes the comparison and supports the technical review; acceptance remains with the buyer, and suppliers cannot force acceptance of an equivalent.",
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
      "Approved equivalent review varies by buyer policy and request context. This article is for general information. Confirm internal purchasing requirements before relying on equivalent options.",
    relatedSlugs: ["it-procurement-guide", "how-to-prepare-rfq", "business-laptop-procurement-guide"],
    ctaLabel: "Get Equivalent Matching Support",
    ctaUrl: "/quote",
    readingTime: "5 min read",
    updated: "November 2026",
    seoTitle: "What Does 'Approved Equivalent' Mean? | HACIEN Insights",
    seoDescription:
      "An approved equivalent meets or exceeds the specified item's parameters from a different brand — and only the buyer can accept it.",
  },
  {
    slug: "server-vs-nas-storage",
    title: "Should I choose a server or a NAS?",
    category: "Technology Sourcing",
    summary:
      "Choose a NAS for shared files and backup; choose a server when you need to run applications, databases, or virtual machines.",
    intro:
      "Choose a NAS when your main need is shared file storage and backup. Choose a server when you need to run applications, databases, or virtual machines. The deciding factors are workload, user count, and whether anyone administers the system.",
    sections: [
      {
        heading: "What is a NAS?",
        body: "A Network-Attached Storage (NAS) device is a purpose-built appliance for file storage, sharing, and backup. NAS units are simpler to set up than servers, run dedicated storage operating systems, and are sized by drive bays and storage capacity rather than processor performance. They suit shared file storage and backup in small to medium offices.",
      },
      {
        heading: "What is a server?",
        body: "A server is a general-purpose system that runs a server operating system and hosts applications, databases, virtual machines, and other services in addition to file storage. Servers are more flexible but more expensive and complex to manage than NAS devices.",
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
      {
        heading: "What to send",
        body: "Your primary use case (files, backup, applications, or virtualization), current and 3-year storage needs, concurrent user count, and RAID and redundancy requirements.",
      },
      {
        heading: "What HACIEN checks",
        body: "Sizing for both options against your workload and user count, warranty and support terms, and a formal quotation valid 15 days, with payment terms as stated in the quotation. HACIEN replies within 1 business day. Get quotes for both options before deciding — the price difference may justify a full server, or a NAS for simpler needs.",
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
    readingTime: "6 min read",
    updated: "November 2026",
    seoTitle: "Should I Choose a Server or a NAS? | HACIEN Insights",
    seoDescription:
      "NAS for shared files and backup; a server for applications, databases, and virtual machines. HACIEN replies within 1 business day.",
  },
  {
    slug: "network-equipment-buying-guide",
    title: "How do I buy network equipment?",
    category: "Technology Sourcing",
    summary:
      "Size switches by ports and PoE, access points by coverage plan, and firewalls by users and bandwidth — then include cabling in the budget.",
    intro:
      "Size switches by port count and PoE budget, access points by a coverage plan (never by guesswork), and firewalls by user count and bandwidth with security features on. And budget structured cabling with the equipment, not after it.",
    sections: [
      {
        heading: "Switches: the foundation of your network",
        body: "Managed switches form the access layer of office and campus networks. When procuring switches, specify: port count (8, 16, 24, or 48 ports), PoE capability and budget (in watts), uplink speed (1GbE or 10GbE), VLAN and QoS support, and management method (web, CLI, or cloud). Unmanaged switches suit simple, flat networks but lack flexibility for growth.",
      },
      {
        heading: "Wireless access points",
        body: "Access point count is determined by floor area, wall density, and user load. Do not purchase access points without a coverage plan. Specify: WiFi standard (WiFi 5 or WiFi 6), indoor or outdoor type, PoE requirement, controller-based or standalone management, and maximum user capacity. Too few access points create coverage gaps; too many create interference.",
      },
      {
        heading: "Firewalls and routers",
        body: "Firewalls protect your network perimeter. Size firewalls by: concurrent user count, WAN bandwidth, required throughput with security features enabled (not just raw throughput), and specific security features needed (VPN, IPS, web filtering). Router requirements depend on ISP connection type and network topology.",
      },
      {
        heading: "Structured cabling",
        body: "Network equipment is only as good as the cable infrastructure connecting it. Structured cabling — Cat6 or Cat6A for most office deployments — is a long-term investment to plan before equipment procurement. Include cable, patch panels, keystones, and conduit in network project budgets.",
      },
      {
        heading: "What to send",
        body: "Required switch port count (with a buffer for growth), total PoE budget, access point locations or floor area, user count and bandwidth, and whether cabling is included.",
      },
      {
        heading: "What HACIEN checks",
        body: "Sizing against your port count, PoE budget, coverage plan, and firewall throughput with security features on, plus warranty and support terms (on-site vs. advance replacement). Business-grade equipment with a minimum 3-year warranty is recommended for production network deployments. HACIEN replies within 1 business day, with a formal quotation valid 15 days.",
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
    relatedSlugs: ["server-vs-nas-storage", "it-procurement-guide", "business-laptop-procurement-guide"],
    ctaLabel: "Get Network Equipment Quotation",
    ctaUrl: "/quote",
    readingTime: "7 min read",
    updated: "November 2026",
    seoTitle: "How Do I Buy Network Equipment? | HACIEN Insights",
    seoDescription:
      "Buy switches, access points, firewalls, and routers by sizing them to your site: ports, PoE, coverage, users, and bandwidth.",
  },
  {
    slug: "business-laptop-procurement-guide",
    title: "How do I choose business laptops?",
    category: "Technology Sourcing",
    summary:
      "Specify by processor class (not exact model), 16GB RAM, 512GB SSD for primary users, and a warranty the local distributor can actually service.",
    intro:
      "Choose business-class laptops, specify by processor class rather than exact model so equivalents stay possible, and insist on a warranty your local distributor can service. For most business users: 16GB RAM and 512GB SSD.",
    sections: [
      {
        heading: "Consumer vs. business-class laptops",
        body: "Consumer laptops from retail stores are designed for individual use; business-class laptops are designed for corporate environments with stronger build quality, longer support lifecycles, easier manageability, and better warranty options. For organizational procurement, business-class laptops are generally the better investment despite higher initial cost.",
      },
      {
        heading: "Specifying processor and performance",
        body: "Processor generation matters more than model name. Specify by processor class or approved equivalent rather than an exact model number. For office productivity, 16GB RAM handles most workloads. For design, CAD, or data work, specify a higher processor class.",
      },
      {
        heading: "Memory and storage",
        body: "16GB RAM is the practical minimum for business laptops. 8GB is acceptable only for light task users. For storage, 256GB SSD is minimum; 512GB is preferred for users who work with large files. Confirm whether storage is expandable before specifying.",
      },
      {
        heading: "Display and form factor",
        body: "Screen size affects portability vs. productivity. 13–14 inch laptops are best for travel; 15–16 inch for office-primary use. Confirm resolution (FHD 1920x1080 is minimum) and panel type (IPS for color accuracy). For formal procurement, check if the specification allows equivalent display specs.",
      },
      {
        heading: "Warranty and support",
        body: "Business laptops should carry warranty coverage appropriate to the request. Confirm warranty is provided by the local distributor, not just the manufacturer, to ensure serviceability.",
      },
      {
        heading: "What to send",
        body: "User count and user types, processor class, RAM and storage needs, display size and resolution, operating system edition, and required accessories (bag, mouse, adapter).",
      },
      {
        heading: "What HACIEN checks",
        body: "Stock availability before award, a backup equivalent option in case the primary specification is unavailable, warranty terms the local distributor can service, and a formal quotation valid 15 days. Laptop availability fluctuates, and popular configurations may carry 2–4 week lead times. HACIEN replies within 1 business day.",
      },
    ],
    checklist: [
      "Specify processor class (not exact model) to allow equivalents",
      "Minimum 16GB RAM for most business use cases",
      "Minimum 512GB SSD for primary users",
      "State display size, resolution, and type",
      "Specify warranty type and duration (on-site preferred)",
      "Confirm the operating system edition required for the deployment",
      "State required accessories (bag, mouse, adapter)",
      "Include warranty and support documentation requirements",
    ],
    procurementNotes:
      "Laptop availability fluctuates with supply chain conditions. Popular configurations may have 2–4 week lead times. HACIEN recommends confirming stock availability before award and requesting a backup equivalent option in case the primary specification is unavailable.",
    disclaimer:
      "Laptop specifications, pricing, and availability change frequently. Final sourcing depends on supplier stock at time of procurement. Approved equivalent matching may be required if specified configurations are unavailable. Confirm internal requirements before relying on a quotation.",
    relatedSlugs: ["it-procurement-guide", "how-to-prepare-rfq", "approved-equivalent-explained"],
    ctaLabel: "Get Laptop Quotation",
    ctaUrl: "/quote",
    readingTime: "6 min read",
    updated: "November 2026",
    seoTitle: "How Do I Choose Business Laptops? | HACIEN Insights",
    seoDescription:
      "Choose business laptops by processor class, 16GB RAM, 512GB SSD, and a locally serviceable warranty. HACIEN replies within 1 business day.",
  },
];

export function getInsight(slug: string) {
  return insights.find((insight) => insight.slug === slug);
}
