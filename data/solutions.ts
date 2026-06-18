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
    summary: "End-to-end infrastructure sourcing for endpoints, servers, networking, power, and site connectivity.",
    heroCopy: "Build reliable IT infrastructure with supplier-ready procurement support from HACIEN.",
    detail:
      "HACIEN supports IT infrastructure projects from bill-of-materials review through supplier coordination and delivery planning. Whether you are upgrading a branch office network, deploying a server room, or refreshing workstations across a facility, we help translate requirements into actionable procurement packages.",
    outcomes: [
      "Endpoint and workstation sourcing",
      "Server and storage sizing support",
      "Network equipment procurement",
      "Power and UPS planning",
      "Cabling and structured connectivity",
    ],
    workflow: ["Assess requirements", "Map equipment", "Source suppliers", "Coordinate delivery"],
    sections: [
      {
        heading: "What infrastructure procurement covers",
        body: "IT infrastructure procurement spans everything from individual workstations to full server room buildouts. HACIEN helps clarify bill-of-materials, identify compliant product options, validate supplier availability, and prepare formal quotation packages for business and institutional buyers.",
      },
      {
        heading: "Approved equivalent matching",
        body: "When exact brand specifications cannot be met due to stock constraints, HACIEN identifies technically equivalent alternatives that meet the original performance and form-factor requirements—subject to buyer review and approval.",
      },
      {
        heading: "Delivery and project coordination",
        body: "Infrastructure projects involve logistics coordination between suppliers, site readiness, and staged delivery. HACIEN supports delivery scheduling and basic project documentation to ensure smooth handover.",
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
    summary: "RFQ-ready sourcing for hardware, software, accessories, warranties, and project materials.",
    heroCopy: "Turn your IT requirements list into a supplier-ready procurement package.",
    detail:
      "HACIEN helps buyers translate technical requirements into supplier-ready requests, compare available options, and prepare formal quotation packages for business and institutional purchasing. We support procurement of computers, peripherals, licensed software, network equipment, and general IT materials.",
    outcomes: [
      "Supplier availability checks",
      "Approved equivalent matching",
      "Warranty and lead-time validation",
      "Formal quotation preparation",
      "Multi-item procurement coordination",
    ],
    workflow: ["Clarify specs", "Source suppliers", "Compare options", "Prepare quotation"],
    sections: [
      {
        heading: "Hardware sourcing",
        body: "HACIEN sources business-grade hardware including computers, servers, network equipment, printers, and peripherals. Procurement is based on buyer specifications with options for approved equivalent products where original brands are unavailable.",
      },
      {
        heading: "Software licensing",
        body: "We support sourcing of licensed productivity, endpoint security, and business application software. Licensing terms are subject to vendor program rules and user count. HACIEN does not resell software outside authorized channels.",
      },
      {
        heading: "RFQ and quotation support",
        body: "HACIEN prepares structured quotation packages suitable for business purchasing, government procurement, and institutional buying—including item descriptions, unit pricing, lead time, and warranty notes.",
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
    workflow: ["Plan rollout", "Prepare materials", "Coordinate setup", "Document handover"],
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
    summary: "Practical lifecycle support for devices, office IT, consumables, replacements, and projects.",
    heroCopy: "Ongoing procurement support for your IT operations lifecycle.",
    detail:
      "HACIEN supports recurring IT procurement needs, device refresh planning, small infrastructure upgrades, and follow-up coordination after delivery. For organizations without a dedicated IT buyer, we serve as a practical sourcing partner for day-to-day and project-based technology needs.",
    outcomes: [
      "Device lifecycle support",
      "Consumables planning",
      "Follow-up coordination",
      "Replacement sourcing",
      "Recurring procurement management",
    ],
    workflow: ["Log requirements", "Prioritize needs", "Source items", "Coordinate fulfillment"],
    sections: [
      {
        heading: "Lifecycle procurement support",
        body: "Devices age. Consumables run out. Software licenses expire. HACIEN provides ongoing procurement support to help organizations stay ahead of lifecycle needs—sourcing replacements, renewals, and upgrades as requirements arise.",
      },
      {
        heading: "Consumables and accessories",
        body: "From printer toner and ink to patch cords, batteries, and storage media, HACIEN can coordinate recurring consumable procurement for offices and facilities.",
      },
      {
        heading: "Reactive and planned sourcing",
        body: "Whether a device fails unexpectedly or your team is planning a scheduled refresh, HACIEN can respond to both reactive procurement needs and planned technology upgrades.",
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
    workflow: ["Review site needs", "Map equipment", "Validate specs", "Coordinate delivery"],
    sections: [
      {
        heading: "Switching and access layer",
        body: "HACIEN sources managed and unmanaged switches for office, campus, and industrial deployments. PoE budget, uplink requirements, and VLAN support are clarified before quotation to ensure the right equipment is specified.",
      },
      {
        heading: "Wireless infrastructure",
        body: "From single-site offices to multi-floor facilities, HACIEN supports wireless access point procurement with options for controller-based and standalone deployments. Site survey requirements are flagged before sizing.",
      },
      {
        heading: "Firewall and perimeter",
        body: "Network security starts at the perimeter. HACIEN sources firewall appliances and UTM devices sized for your user count and traffic profile—subject to vendor program availability.",
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
        body: "Network-attached storage systems are a cost-effective way to centralize file storage and backups. HACIEN sources NAS appliances and expansion units sized for your retention requirements and user count.",
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
      "HACIEN sources servers, NAS, backup storage, and rack equipment for Philippine organizations. Workload sizing and warranty planning included.",
  },
  {
    slug: "cloud-productivity",
    title: "Cloud & Productivity",
    shortTitle: "Cloud",
    category: "Software",
    summary: "Licensed productivity, endpoint security, collaboration, and business software sourcing.",
    heroCopy: "License sourcing and renewal planning for your productivity and collaboration tools.",
    detail:
      "HACIEN supports license sourcing and renewal planning for common productivity, security, and business applications. Licensing terms are subject to vendor program rules. We help buyers understand user counts, license types, and subscription options before committing to a purchase.",
    outcomes: [
      "Productivity license sourcing",
      "Renewal coordination",
      "User and admin planning",
      "License type guidance",
      "Subscription management support",
    ],
    workflow: ["Count users", "Validate license terms", "Quote subscriptions", "Support onboarding"],
    sections: [
      {
        heading: "Microsoft 365 and productivity licensing",
        body: "Microsoft 365 licenses are user-based annual or monthly subscriptions. HACIEN helps organizations count active users, select the right plan tier, and prepare renewal packages. Licensing is sourced through authorized channels.",
      },
      {
        heading: "Endpoint security software",
        body: "Endpoint protection, antivirus, and security management software are sourced on a per-device or per-user basis. HACIEN supports sourcing of endpoint security licenses subject to vendor program availability.",
      },
      {
        heading: "Cloud productivity tools",
        body: "Beyond Microsoft, organizations use a range of collaboration and productivity tools. HACIEN can assist with license sourcing for business applications where vendor programs allow reseller participation.",
      },
    ],
    relatedSlugs: ["software-licensing", "cybersecurity", "hardware-software-procurement"],
    ctaLabel: "Get License Quotation",
    ctaUrl: "/quote",
    icon: "SaaS",
    seoTitle: "Cloud & Productivity Licensing | HACIEN",
    seoDescription:
      "HACIEN sources Microsoft 365, endpoint security, and cloud productivity licenses for Philippine organizations. Renewal coordination included.",
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    shortTitle: "Cybersecurity",
    category: "Security",
    summary: "Endpoint protection, firewall, security software, and network security sourcing.",
    heroCopy: "Practical cybersecurity procurement for Philippine organizations.",
    detail:
      "Cybersecurity procurement covers endpoint protection software, firewall appliances, network security devices, and security management tools. HACIEN helps organizations identify the right security products for their threat profile and budget, and prepares supplier-ready quotation packages.",
    outcomes: [
      "Endpoint protection sourcing",
      "Firewall and UTM procurement",
      "Network security device sourcing",
      "Security software licensing",
      "Cybersecurity accessory planning",
    ],
    workflow: ["Assess threat profile", "Identify solutions", "Source products", "Prepare quotation"],
    sections: [
      {
        heading: "Endpoint protection",
        body: "Endpoint antivirus, anti-malware, and endpoint detection software protect individual devices from threats. HACIEN sources endpoint security licenses on a per-device or per-user basis through appropriate vendor channels.",
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
      "HACIEN sources endpoint protection, firewall appliances, and network security products for Philippine organizations.",
  },
  {
    slug: "security-surveillance",
    title: "Security & Surveillance",
    shortTitle: "Surveillance",
    category: "Security",
    summary: "CCTV, access control, endpoint protection, and site security technology sourcing.",
    heroCopy: "Site security technology procurement — from cameras to access control.",
    detail:
      "Security and surveillance projects need clear retention, coverage, cabling, and warranty assumptions. HACIEN helps convert site security needs into supplier-ready packages covering CCTV cameras, NVR/DVR systems, access control hardware, and monitoring infrastructure.",
    outcomes: [
      "CCTV package planning",
      "NVR/DVR sourcing",
      "Access control procurement",
      "Storage and retention sizing",
      "Installation accessory list",
    ],
    workflow: ["Assess coverage", "Size equipment", "Check stock", "Prepare quotation"],
    sections: [
      {
        heading: "CCTV and surveillance systems",
        body: "Camera count, resolution, coverage area, and retention days drive the bill of materials for CCTV deployments. HACIEN sources camera packages, NVR/DVR units, and storage expansion based on site requirements.",
      },
      {
        heading: "Access control",
        body: "Access control systems—including card readers, biometric units, and door controllers—are sourced based on door count and integration requirements. HACIEN supports procurement of access control hardware as part of site security projects.",
      },
      {
        heading: "Cabling and installation materials",
        body: "Security system deployments require structured cabling, power supplies, mounting hardware, and conduit. HACIEN includes installation material lists in security project quotations.",
      },
    ],
    relatedSlugs: ["cybersecurity", "it-infrastructure", "network-connectivity"],
    ctaLabel: "Submit Security RFQ",
    ctaUrl: "/quote",
    icon: "CAM",
    seoTitle: "Security & Surveillance Procurement | HACIEN",
    seoDescription:
      "HACIEN sources CCTV systems, access control, NVR/DVR equipment, and site security technology for Philippine organizations.",
  },
  {
    slug: "software-licensing",
    title: "Software Licensing",
    shortTitle: "Licensing",
    category: "Software",
    summary: "Perpetual and subscription license sourcing for business, productivity, and vertical applications.",
    heroCopy: "Software license procurement through appropriate vendor channels.",
    detail:
      "HACIEN supports sourcing of business software licenses including operating systems, productivity suites, endpoint security, and vertical business applications. Licensing terms and availability depend on vendor program participation. We help buyers understand license types and prepare renewal-ready quotation packages.",
    outcomes: [
      "Perpetual license sourcing",
      "Subscription management support",
      "Renewal planning",
      "Volume license guidance",
      "OS and productivity software",
    ],
    workflow: ["Identify software needs", "Validate license type", "Source through channels", "Prepare quotation"],
    sections: [
      {
        heading: "Types of software licenses",
        body: "Software is licensed as perpetual (one-time purchase), subscription (annual or monthly), or volume (multi-seat). HACIEN helps buyers identify the appropriate license type for their organization size and use case before requesting quotation.",
      },
      {
        heading: "Operating systems",
        body: "Windows OEM and volume licenses, macOS business purchasing, and operating system upgrade licensing are sourced through appropriate vendor channels. License type affects transferability and support terms.",
      },
      {
        heading: "Vertical and line-of-business applications",
        body: "Beyond productivity software, organizations use industry-specific applications for accounting, HR, inventory, and operations. HACIEN can assist with license procurement for supported vertical applications where vendor programs allow.",
      },
    ],
    relatedSlugs: ["cloud-productivity", "hardware-software-procurement", "cybersecurity"],
    ctaLabel: "Request License Quotation",
    ctaUrl: "/quote",
    icon: "LIC",
    seoTitle: "Software Licensing Procurement | HACIEN",
    seoDescription:
      "HACIEN sources software licenses including productivity suites, operating systems, and business applications for Philippine organizations.",
  },
  {
    slug: "general-merchandise-procurement",
    title: "General Merchandise Procurement",
    shortTitle: "Merchandise",
    category: "General",
    summary: "Non-IT goods, office supplies, and general merchandise sourcing for business and institutional buyers.",
    heroCopy: "Beyond IT — general merchandise procurement for complete institutional requirements.",
    detail:
      "HACIEN extends procurement support beyond technology to cover general merchandise and office supplies commonly required alongside IT projects. This includes office furniture, consumables, safety equipment, and other non-IT items that appear in mixed procurement packages for government and institutional buyers.",
    outcomes: [
      "Office supply procurement",
      "Non-IT goods sourcing",
      "Mixed procurement packages",
      "Supplier coordination for general goods",
      "Quotation support for institutional buyers",
    ],
    workflow: ["Identify goods", "Source suppliers", "Validate availability", "Prepare quotation"],
    sections: [
      {
        heading: "What general merchandise covers",
        body: "General merchandise procurement covers non-IT items that organizations regularly purchase: office supplies, furniture, safety equipment, cleaning materials, and other consumables. HACIEN supports sourcing these alongside IT procurement for integrated project quotations.",
      },
      {
        heading: "Mixed IT and non-IT packages",
        body: "Government and institutional buyers often issue combined procurement packages that include both IT equipment and general goods. HACIEN can coordinate sourcing for mixed packages to simplify the quotation process for buyers.",
      },
      {
        heading: "Procurement notes",
        body: "General merchandise availability, pricing, and lead times vary significantly by item type and supplier. HACIEN confirms availability and pricing before issuing quotations for general goods.",
      },
    ],
    relatedSlugs: ["hardware-software-procurement", "project-delivery-support", "managed-it-support"],
    ctaLabel: "Submit General RFQ",
    ctaUrl: "/quote",
    icon: "GEN",
    seoTitle: "General Merchandise Procurement | HACIEN",
    seoDescription:
      "HACIEN provides general merchandise procurement support including office supplies, non-IT goods, and mixed procurement packages for institutional buyers.",
  },
  {
    slug: "project-delivery-support",
    title: "Project Delivery Support",
    shortTitle: "Delivery",
    category: "Operations",
    summary: "Logistics coordination, delivery scheduling, acceptance documentation, and project closeout support.",
    heroCopy: "Procurement does not end at the purchase order — HACIEN supports through delivery.",
    detail:
      "Project delivery support covers the logistics and documentation tasks that follow procurement: scheduling deliveries, coordinating with installation teams, preparing acceptance checklists, and supporting project closeout. HACIEN acts as the coordination layer between suppliers and buyers for complex multi-item deliveries.",
    outcomes: [
      "Delivery scheduling coordination",
      "Supplier logistics support",
      "Acceptance documentation",
      "Serial number and warranty tracking",
      "Project closeout support",
    ],
    workflow: ["Confirm delivery schedule", "Coordinate logistics", "Support acceptance", "Document closeout"],
    sections: [
      {
        heading: "Delivery coordination",
        body: "Large procurement packages involve multiple suppliers, delivery windows, and site readiness requirements. HACIEN coordinates between suppliers and buyers to align delivery schedules with project timelines.",
      },
      {
        heading: "Acceptance and documentation",
        body: "Equipment delivery requires physical inspection, serial number recording, and warranty activation. HACIEN can help prepare acceptance checklists and delivery documentation as part of project support.",
      },
      {
        heading: "Post-delivery support",
        body: "After delivery, organizations may need follow-up coordination for missing items, warranty claims, or replacement requests. HACIEN provides post-delivery support as part of ongoing procurement relationships.",
      },
    ],
    relatedSlugs: ["systems-integration", "managed-it-support", "hardware-software-procurement"],
    ctaLabel: "Discuss Delivery Support",
    ctaUrl: "/contact",
    icon: "DEL",
    seoTitle: "Project Delivery Support | HACIEN",
    seoDescription:
      "HACIEN provides project delivery coordination including logistics scheduling, acceptance documentation, and project closeout support.",
  },
];

export function getSolution(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}
