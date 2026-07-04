export type SolutionSection = {
  heading: string;
  body: string;
};

export type Solution = {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  summary: string;
  heroCopy: string;
  detail: string;
  outcomes: string[];
  workflow: string[];
  sections: SolutionSection[];
  relatedSlugs: string[];
  ctaLabel: string;
  ctaUrl: string;
  icon: string;
  seoTitle: string;
  seoDescription: string;
};

export const solutions: Solution[] = [
  {
    slug: "it-infrastructure",
    title: "IT Infrastructure",
    shortTitle: "Infrastructure",
    category: "Core",
    summary: "Infrastructure RFQ review for endpoints, servers, networking, power, and site connectivity.",
    heroCopy: "Prepare reliable IT infrastructure requirements for supplier-input review with HACIEN.",
    detail:
      "HACIEN supports IT infrastructure RFQ preparation from bill-of-materials review through supplier-input review and delivery planning. Whether you are upgrading a branch office network, planning a server room, or refreshing workstations across a facility, we help translate requirements into quotation-ready context.",
    outcomes: [
      "Endpoint and workstation RFQ review",
      "Server and storage sizing support",
      "Network equipment requirement review",
      "Power and UPS planning",
      "Cabling and structured connectivity context",
    ],
    workflow: ["Assess requirements", "Map equipment", "Review inputs", "Plan delivery context"],
    sections: [
      {
        heading: "What infrastructure procurement covers",
        body: "IT infrastructure procurement can span everything from individual workstations to full server room buildouts. HACIEN helps clarify bill-of-materials, identify candidate product options, review supplier availability evidence, and organize quotation context for business and institutional buyers.",
      },
      {
        heading: "Approved equivalent matching",
        body: "When exact brand specifications cannot be met due to stock constraints, HACIEN identifies technically equivalent alternatives that meet the original performance and form-factor requirements—subject to buyer review and approval.",
      },
      {
        heading: "Delivery and project coordination",
        body: "Infrastructure projects may involve logistics coordination between suppliers, site readiness, and staged delivery. HACIEN can help review delivery scheduling needs and basic project documentation when those items are part of the formal request.",
      },
    ],
    relatedSlugs: ["network-connectivity", "servers-storage", "systems-integration"],
    ctaLabel: "Submit Infrastructure RFQ",
    ctaUrl: "/quote",
    icon: "INF",
    seoTitle: "IT Infrastructure Procurement | HACIEN",
    seoDescription:
      "HACIEN supports IT infrastructure sourcing including endpoints, servers, networking, power, and connectivity for Philippine organizations.",
  },
  {
    slug: "hardware-software-procurement",
    title: "Hardware & Software Procurement",
    shortTitle: "Procurement",
    category: "Core",
    summary: "RFQ-ready review for hardware, software, accessories, warranties, and project materials.",
    heroCopy: "Turn your IT requirements list into a review-ready procurement package.",
    detail:
      "HACIEN helps buyers translate technical requirements into review-ready requests, compare available options when evidence is available, and organize quotation inputs for business and institutional purchasing.",
    outcomes: [
      "Supplier availability review",
      "Approved equivalent matching",
      "Warranty and lead-time evidence review",
      "Quotation input preparation",
      "Multi-item RFQ coordination",
    ],
    workflow: ["Clarify specs", "Review inputs", "Compare options", "Prepare quotation"],
    sections: [
      {
        heading: "Hardware sourcing",
        body: "HACIEN reviews RFQ requests for business-grade hardware including computers, servers, network equipment, printers, and peripherals. Procurement decisions should be based on buyer specifications and verified supplier inputs.",
      },
      {
        heading: "Software licensing",
        body: "We support review of licensed productivity, endpoint security, and business application software requests. Licensing terms are subject to vendor program rules, user count, and confirmed channel availability.",
      },
      {
        heading: "RFQ and quotation support",
        body: "HACIEN can help organize structured quotation inputs for business purchasing, government procurement, and institutional buying, including item descriptions, unit pricing, lead time, and warranty notes where verified.",
      },
    ],
    relatedSlugs: ["software-licensing", "it-infrastructure", "government-procurement"],
    ctaLabel: "Submit Procurement RFQ",
    ctaUrl: "/quote",
    icon: "RFQ",
    seoTitle: "Hardware & Software Procurement | HACIEN",
    seoDescription:
      "HACIEN provides hardware and software procurement support including RFQ preparation, supplier coordination, and quotation packages for Philippine organizations.",
  },
  {
    slug: "systems-integration",
    title: "Systems Integration",
    shortTitle: "Integration",
    category: "Core",
    summary: "Project coordination for IT rollouts, device deployment, systems setup, and documentation.",
    heroCopy: "From procurement to deployment — HACIEN bridges sourcing and implementation.",
    detail:
      "HACIEN bridges procurement and implementation by coordinating practical setup requirements, project documentation, installation support, and handover needs. Systems integration projects require careful sequencing of equipment delivery, configuration, and sign-off. We help buyers manage that coordination.",
    outcomes: [
      "Endpoint deployment support",
      "Configuration coordination",
      "Project documentation",
      "Handover planning",
      "Rollout sequencing",
    ],
    workflow: ["Plan rollout", "Prepare materials", "Review setup context", "Document handover"],
    sections: [
      {
        heading: "What systems integration means for procurement",
        body: "Systems integration is not just about connecting devices—it is about coordinating all the procurement, delivery, and setup tasks that make a project land successfully. HACIEN supports the procurement side of integration: ensuring equipment arrives on time, accessories are included, and documentation is prepared.",
      },
      {
        heading: "Project coordination support",
        body: "For multi-site or phased deployments, HACIEN helps coordinate supplier delivery schedules, installation material lists, and project status tracking. We do not replace implementation teams but support them with procurement and logistics.",
      },
      {
        heading: "Handover documentation",
        body: "HACIEN can help prepare basic delivery acceptance documentation, serial number logs, and warranty registration support as part of project closeout.",
      },
    ],
    relatedSlugs: ["it-infrastructure", "managed-it-support", "project-delivery-support"],
    ctaLabel: "Discuss Your Integration Project",
    ctaUrl: "/contact",
    icon: "SYS",
    seoTitle: "Systems Integration Support | HACIEN",
    seoDescription:
      "HACIEN supports systems integration projects with procurement coordination, deployment planning, and project documentation for IT rollouts.",
  },
  {
    slug: "managed-it-support",
    title: "Managed IT Support",
    shortTitle: "Support",
    category: "Operations",
    summary: "Practical RFQ and follow-up support for devices, office IT, consumables, replacements, and projects.",
    heroCopy: "Review recurring IT operations requirements through an RFQ-first path.",
    detail:
      "HACIEN supports recurring IT requirement review, device refresh planning, small infrastructure upgrades, and follow-up coordination where a formal request or prior transaction context exists.",
    outcomes: [
      "Device lifecycle RFQ support",
      "Consumables planning",
      "Follow-up coordination",
      "Replacement sourcing",
      "Recurring requirement review",
    ],
    workflow: ["Log requirements", "Prioritize needs", "Review item context", "Route fulfillment context"],
    sections: [
      {
        heading: "Lifecycle procurement support",
        body: "Devices age. Consumables run out. Software licenses expire. HACIEN can help organizations review lifecycle needs and prepare requests for replacements, renewals, and upgrades.",
      },
      {
        heading: "Consumables and accessories",
        body: "From printer toner and ink to patch cords, batteries, and storage media, HACIEN can help organize recurring consumable requirements for offices and facilities.",
      },
      {
        heading: "Reactive and planned sourcing",
        body: "Whether a device fails unexpectedly or your team is planning a scheduled refresh, HACIEN can review reactive requirements and planned technology upgrades through the appropriate inquiry or RFQ path.",
      },
    ],
    relatedSlugs: ["hardware-software-procurement", "it-infrastructure", "project-delivery-support"],
    ctaLabel: "Submit Support RFQ",
    ctaUrl: "/quote",
    icon: "OPS",
    seoTitle: "Managed IT Support Procurement | HACIEN",
    seoDescription:
      "HACIEN provides managed IT support procurement including device lifecycle management, consumables sourcing, and replacement coordination.",
  },
  {
    slug: "network-connectivity",
    title: "Network & Connectivity",
    shortTitle: "Network",
    category: "Infrastructure",
    summary: "Switching, wireless, firewall, structured cabling, and site connectivity sourcing.",
    heroCopy: "Reliable network infrastructure procurement for offices, campuses, and facilities.",
    detail:
      "Network projects require precise equipment specification, PoE budget planning, VLAN design inputs, and cable infrastructure coordination. HACIEN supports network procurement from access layer switches to firewall appliances, wireless access points, and structured cabling materials.",
    outcomes: [
      "Managed switch procurement",
      "Wireless access point sourcing",
      "Firewall and router procurement",
      "Structured cabling materials",
      "PoE and power planning",
    ],
    workflow: ["Review site needs", "Map equipment", "Validate specs", "Plan delivery context"],
    sections: [
      {
        heading: "Switching and access layer",
        body: "HACIEN reviews managed and unmanaged switch requirements for office, campus, and industrial deployments. PoE budget, uplink requirements, and VLAN support should be clarified before quotation.",
      },
      {
        heading: "Wireless infrastructure",
        body: "From single-site offices to multi-floor facilities, HACIEN supports wireless access point procurement with options for controller-based and standalone deployments. Site survey requirements are flagged before sizing.",
      },
      {
        heading: "Firewall and perimeter",
        body: "Network security starts at the perimeter. HACIEN can help review firewall appliance and UTM requirements against user count and traffic profile, subject to vendor program availability.",
      },
    ],
    relatedSlugs: ["it-infrastructure", "cybersecurity", "servers-storage"],
    ctaLabel: "Submit Network RFQ",
    ctaUrl: "/quote",
    icon: "NET",
    seoTitle: "Network & Connectivity Procurement | HACIEN",
    seoDescription:
      "HACIEN provides network and connectivity procurement including switches, wireless access points, firewalls, and structured cabling for Philippine organizations.",
  },
  {
    slug: "servers-storage",
    title: "Servers & Storage",
    shortTitle: "Servers",
    category: "Infrastructure",
    summary: "Entry to midrange server, NAS, backup, and storage expansion sourcing.",
    heroCopy: "Right-sized server and storage procurement for your workload and budget.",
    detail:
      "Server and storage procurement requires workload analysis, redundancy planning, and warranty validation before quotation. HACIEN supports sizing conversations, vendor options comparison, and formal quotation preparation for tower servers, rack servers, NAS appliances, and backup storage systems.",
    outcomes: [
      "Server sizing support",
      "NAS and backup storage sourcing",
      "RAID and redundancy planning",
      "Warranty and support options",
      "Rack and physical planning",
    ],
    workflow: ["Assess workload", "Size hardware", "Compare vendors", "Prepare quotation"],
    sections: [
      {
        heading: "Server procurement for Philippine organizations",
        body: "Entry-level to midrange servers serve file, application, database, and virtualization workloads. HACIEN helps organizations identify the right server class, memory configuration, storage capacity, and warranty level before committing to a purchase.",
      },
      {
        heading: "NAS and backup storage",
        body: "Network-attached storage systems are a cost-effective way to centralize file storage and backups. HACIEN can help review NAS appliance and expansion requirements against retention needs and user count.",
      },
      {
        heading: "Rack and data room planning",
        body: "Physical server deployments require rack space, power, cooling, and cable management planning. HACIEN can help prepare the accessory list for rack-based deployments as part of the procurement package.",
      },
    ],
    relatedSlugs: ["it-infrastructure", "network-connectivity", "systems-integration"],
    ctaLabel: "Submit Server RFQ",
    ctaUrl: "/quote",
    icon: "SRV",
    seoTitle: "Server & Storage Procurement | HACIEN",
    seoDescription:
      "HACIEN reviews RFQ requests for servers, NAS, backup storage, and rack equipment for Philippine organizations.",
  },
  {
    slug: "cloud-productivity",
    title: "Cloud & Productivity",
    shortTitle: "Cloud",
    category: "Software",
    summary: "Licensed productivity, endpoint security, collaboration, and business software RFQ review.",
    heroCopy: "License requirements and renewal planning for your productivity and collaboration tools.",
    detail:
      "HACIEN supports license sourcing and renewal planning for common productivity, security, and business applications. Licensing terms are subject to vendor program rules. We help buyers understand user counts, license types, and subscription options before committing to a purchase.",
    outcomes: [
      "Productivity license review",
      "Renewal coordination",
      "User and admin planning",
      "License type guidance",
      "Subscription management support",
    ],
    workflow: ["Count users", "Validate license terms", "Quote subscriptions", "Support onboarding"],
    sections: [
      {
        heading: "Microsoft 365 and productivity licensing",
        body: "Microsoft 365 licenses are user-based annual or monthly subscriptions. HACIEN helps organizations count active users, review plan tiers, and prepare renewal request context. Licensing must be confirmed through appropriate vendor channels.",
      },
      {
        heading: "Endpoint security software",
        body: "Endpoint protection, antivirus, and security management software may be licensed on a per-device or per-user basis. HACIEN supports review of endpoint security license requests subject to vendor program availability.",
      },
      {
        heading: "Cloud productivity tools",
        body: "Beyond Microsoft, organizations use a range of collaboration and productivity tools. HACIEN can assist with license request review where vendor programs allow participation.",
      },
    ],
    relatedSlugs: ["software-licensing", "cybersecurity", "hardware-software-procurement"],
    ctaLabel: "Get License Quotation",
    ctaUrl: "/quote",
    icon: "SaaS",
    seoTitle: "Cloud & Productivity Licensing | HACIEN",
    seoDescription:
      "HACIEN reviews RFQ requests for Microsoft 365, endpoint security, and cloud productivity licenses for Philippine organizations.",
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    shortTitle: "Cybersecurity",
    category: "Security",
    summary: "Endpoint protection, firewall, security software, and network security sourcing.",
    heroCopy: "Practical cybersecurity procurement for Philippine organizations.",
    detail:
      "Cybersecurity procurement covers endpoint protection software, firewall appliances, network security devices, and security management tools. HACIEN helps organizations clarify security requirements for threat profile and budget before quotation review.",
    outcomes: [
      "Endpoint protection RFQ review",
      "Firewall and UTM requirement review",
      "Network security device request review",
      "Security software licensing",
      "Cybersecurity accessory planning",
    ],
    workflow: ["Assess threat profile", "Identify solutions", "Review product context", "Prepare quotation"],
    sections: [
      {
        heading: "Endpoint protection",
        body: "Endpoint antivirus, anti-malware, and endpoint detection software protect individual devices from threats. HACIEN reviews endpoint security license requirements against per-device or per-user licensing context.",
      },
      {
        heading: "Network security",
        body: "Firewalls, UTM appliances, and network security devices are sized based on user count, traffic profile, and required features. HACIEN supports firewall procurement planning with basic sizing guidance before quotation.",
      },
      {
        heading: "Security procurement notes",
        body: "Cybersecurity procurement requires careful specification. Products vary significantly in capability, licensing model, and vendor support. HACIEN recommends confirming technical requirements with a qualified security professional before finalizing specifications.",
      },
    ],
    relatedSlugs: ["network-connectivity", "cloud-productivity", "security-surveillance"],
    ctaLabel: "Submit Security RFQ",
    ctaUrl: "/quote",
    icon: "SEC",
    seoTitle: "Cybersecurity Procurement | HACIEN",
    seoDescription:
      "HACIEN reviews RFQ requests for endpoint protection, firewall appliances, and network security products for Philippine organizations.",
  },
  {
    slug: "security-surveillance",
    title: "Security & Surveillance",
    shortTitle: "Surveillance",
    category: "Security",
    summary: "CCTV, access control, endpoint protection, and site security technology RFQ review.",
    heroCopy: "Site security technology requirements, from cameras to access control.",
    detail:
      "Security and surveillance projects need clear retention, coverage, cabling, and warranty assumptions. HACIEN helps convert site security needs into review-ready request context covering CCTV cameras, NVR/DVR systems, access control hardware, and monitoring infrastructure.",
    outcomes: [
      "CCTV package planning",
      "NVR/DVR requirement review",
      "Access control requirement review",
      "Storage and retention sizing",
      "Installation accessory list",
    ],
    workflow: ["Assess coverage", "Size equipment", "Review availability context", "Prepare quotation"],
    sections: [
      {
        heading: "CCTV and surveillance systems",
        body: "Camera count, resolution, coverage area, and retention days drive the bill of materials for CCTV deployments. HACIEN reviews camera package, NVR/DVR, and storage expansion requirements based on site context.",
      },
      {
        heading: "Access control",
        body: "Access control systems, including card readers, biometric units, and door controllers, should be reviewed against door count and integration requirements. HACIEN supports RFQ review for access control hardware as part of site security projects.",
      },
      {
        heading: "Cabling and installation materials",
        body: "Security system deployments may require structured cabling, power supplies, mounting hardware, and conduit. Installation material lists should be confirmed through the quotation review process.",
      },
    ],
    relatedSlugs: ["cybersecurity", "it-infrastructure", "network-connectivity"],
    ctaLabel: "Submit Security RFQ",
    ctaUrl: "/quote",
    icon: "CAM",
    seoTitle: "Security & Surveillance Procurement | HACIEN",
    seoDescription:
      "HACIEN reviews RFQ requests for CCTV systems, access control, NVR/DVR equipment, and site security technology.",
  },
  {
    slug: "software-licensing",
    title: "Software Licensing",
    shortTitle: "Licensing",
    category: "Software",
    summary: "Perpetual and subscription license RFQ review for business, productivity, and vertical applications.",
    heroCopy: "Software license requirements reviewed against appropriate vendor channels.",
    detail:
      "HACIEN supports review of business software license requirements including operating systems, productivity suites, endpoint security, and vertical business applications. Licensing terms and availability depend on vendor program participation.",
    outcomes: [
      "Perpetual license review",
      "Subscription management support",
      "Renewal planning",
      "Volume license guidance",
      "OS and productivity software",
    ],
    workflow: ["Identify software needs", "Validate license type", "Review channel context", "Prepare quotation"],
    sections: [
      {
        heading: "Types of software licenses",
        body: "Software is licensed as perpetual (one-time purchase), subscription (annual or monthly), or volume (multi-seat). HACIEN helps buyers identify the appropriate license type for their organization size and use case before requesting quotation.",
      },
      {
        heading: "Operating systems",
        body: "Windows OEM and volume licenses, macOS business purchasing, and operating system upgrade licensing should be reviewed through appropriate vendor channel rules. License type affects transferability and support terms.",
      },
      {
        heading: "Vertical and line-of-business applications",
        body: "Beyond productivity software, organizations use industry-specific applications for accounting, HR, inventory, and operations. HACIEN can assist with license requirement review where vendor programs allow.",
      },
    ],
    relatedSlugs: ["cloud-productivity", "hardware-software-procurement", "cybersecurity"],
    ctaLabel: "Request License Quotation",
    ctaUrl: "/quote",
    icon: "LIC",
    seoTitle: "Software Licensing Procurement | HACIEN",
    seoDescription:
      "HACIEN reviews RFQ requests for software licenses including productivity suites, operating systems, and business applications.",
  },
  {
    slug: "general-merchandise-procurement",
    title: "General Merchandise Procurement",
    shortTitle: "Merchandise",
    category: "General",
    summary: "Non-IT goods, office supplies, and general merchandise RFQ review for business and institutional buyers.",
    heroCopy: "Beyond IT: general merchandise requirements for mixed institutional RFQs.",
    detail:
      "HACIEN can review requirements beyond technology to cover general merchandise and office supplies commonly requested alongside IT projects.",
    outcomes: [
      "Office supply RFQ review",
      "Non-IT goods request review",
      "Mixed procurement packages",
      "Supplier-input review for general goods",
      "Quotation support for institutional buyers",
    ],
    workflow: ["Identify goods", "Review supplier inputs", "Review availability context", "Prepare quotation"],
    sections: [
      {
        heading: "What general merchandise covers",
        body: "General merchandise procurement covers non-IT items that organizations regularly purchase: office supplies, furniture, safety equipment, cleaning materials, and other consumables. HACIEN can review these alongside IT procurement for integrated project quotation context.",
      },
      {
        heading: "Mixed IT and non-IT packages",
        body: "Government and institutional buyers often issue combined procurement packages that include both IT equipment and general goods. HACIEN can help organize sourcing questions for mixed packages to simplify quotation review.",
      },
      {
        heading: "Procurement notes",
        body: "General merchandise availability, pricing, and lead times vary significantly by item type and supplier. Availability and pricing should be confirmed through supplier evidence before issuing or relying on quotations for general goods.",
      },
    ],
    relatedSlugs: ["hardware-software-procurement", "project-delivery-support", "managed-it-support"],
    ctaLabel: "Submit General RFQ",
    ctaUrl: "/quote",
    icon: "GEN",
    seoTitle: "General Merchandise Procurement | HACIEN",
    seoDescription:
      "HACIEN reviews RFQ requests for general merchandise, office supplies, non-IT goods, and mixed procurement packages.",
  },
  {
    slug: "project-delivery-support",
    title: "Project Delivery Support",
    shortTitle: "Delivery",
    category: "Operations",
    summary: "Delivery-context review, logistics planning, acceptance documentation, and project closeout support.",
    heroCopy: "Procurement does not end at the purchase order: delivery context should be reviewed early.",
    detail:
      "Project delivery support covers the logistics and documentation tasks that may follow procurement: scheduling deliveries, coordinating with installation teams, preparing acceptance checklists, and supporting project closeout when included in the formal request.",
    outcomes: [
      "Delivery scheduling review",
      "Supplier logistics support",
      "Acceptance documentation context",
      "Serial number and warranty documentation context",
      "Project closeout support",
    ],
    workflow: ["Review delivery schedule", "Plan logistics context", "Support acceptance context", "Document closeout"],
    sections: [
      {
        heading: "Delivery coordination",
        body: "Large procurement packages may involve multiple suppliers, delivery windows, and site readiness requirements. HACIEN can help review the coordination needed between suppliers and buyers to align delivery schedules with project timelines.",
      },
      {
        heading: "Acceptance and documentation",
        body: "Equipment delivery may require physical inspection, serial number recording, and warranty documentation. HACIEN can help prepare acceptance checklists and delivery documentation when those items are part of project support.",
      },
      {
        heading: "Post-delivery support",
        body: "After delivery, organizations may need follow-up coordination for missing items, warranty questions, or replacement requests. HACIEN can route these questions when product, quotation, supplier, and delivery context is available.",
      },
    ],
    relatedSlugs: ["systems-integration", "managed-it-support", "hardware-software-procurement"],
    ctaLabel: "Discuss Delivery Support",
    ctaUrl: "/contact",
    icon: "DEL",
    seoTitle: "Project Delivery Support | HACIEN",
    seoDescription:
      "HACIEN reviews delivery coordination needs including logistics scheduling, acceptance documentation, and project closeout support.",
  },
];

export function getSolution(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}
