export type SolutionSection = {
  heading: string;
  body: string;
};

export type SolutionWorkflowStep = {
  step: string;
  detail: string;
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
  workflow: SolutionWorkflowStep[];
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
    summary: "A quotation-ready package for an infrastructure build: endpoints, servers, networking, power, and site connectivity.",
    heroCopy: "HACIEN prepares a quotation-ready package for your infrastructure build, from branch networks to server rooms.",
    detail:
      "Whether you are upgrading a branch network, planning a server room, or refreshing workstations across a facility, HACIEN turns your requirements into a package suppliers can quote.",
    outcomes: [
      "Endpoints and workstations",
      "Servers and storage",
      "Network equipment",
      "Power and UPS",
      "Cabling and structured connectivity",
    ],
    workflow: [
      { step: "Assess requirements", detail: "HACIEN confirms the scope, the sites, and the scale of the work." },
      { step: "Map equipment", detail: "HACIEN matches the work to an equipment list, including accessories." },
      { step: "Review inputs", detail: "HACIEN checks supplier availability and pricing evidence for each item." },
      { step: "Plan delivery details", detail: "HACIEN aligns delivery windows with site readiness and staged delivery." },
    ],
    sections: [
      {
        heading: "What this work covers",
        body: "Endpoints and workstations, servers and storage, network equipment, power and UPS, and cabling and structured connectivity, organized into one bill of materials.",
      },
      {
        heading: "Typical situations",
        body: "A branch network upgrade, a server room plan, or a facility-wide workstation refresh.",
      },
      {
        heading: "What to send",
        body: "The sites involved, how many users and devices, and what you are upgrading or adding. A current equipment list helps, but it is not required to start.",
      },
      {
        heading: "What HACIEN checks",
        body: "HACIEN checks your bill of materials against supplier availability evidence. If an exact brand cannot be met, HACIEN identifies a technically equivalent alternative that meets the original performance and form-factor requirements, and only proceeds with your approval. Delivery scheduling, site readiness, and staged delivery are confirmed before quotation.",
      },
    ],
    relatedSlugs: ["network-connectivity", "servers-storage", "systems-integration"],
    ctaLabel: "Submit Infrastructure RFQ",
    ctaUrl: "/quote",
    icon: "INF",
    seoTitle: "IT Infrastructure Procurement",
    seoDescription:
      "HACIEN prepares quotation-ready IT infrastructure packages covering endpoints, servers, networking, power, and connectivity for Philippine organizations.",
  },
  {
    slug: "hardware-software-procurement",
    title: "Hardware & Software Procurement",
    shortTitle: "Procurement",
    category: "Core",
    summary: "One RFQ package for a mixed list: business hardware, software, accessories, and warranties.",
    heroCopy: "HACIEN turns your hardware and software list into one RFQ package suppliers can quote.",
    detail:
      "HACIEN turns a mixed requirements list into one usable RFQ package: business hardware, software, accessories, and warranties, with item descriptions, quantities, and lead-time and warranty notes where verified.",
    outcomes: [
      "Business hardware: computers, servers, network equipment, printers, peripherals",
      "Software: productivity, endpoint security, business applications",
      "Accessories and project materials",
      "Warranty and lead-time notes",
      "Multi-item RFQ coordination",
    ],
    workflow: [
      { step: "Clarify specs", detail: "HACIEN confirms each item, its specification, and its quantity." },
      { step: "Review inputs", detail: "HACIEN checks supplier availability evidence for each item." },
      { step: "Compare options", detail: "HACIEN compares available options where evidence is available, including approved equivalents." },
      { step: "Prepare quotation", detail: "HACIEN organizes the inputs into a quotation package for your review." },
    ],
    sections: [
      {
        heading: "What this work covers",
        body: "Business-grade hardware including computers, servers, network equipment, printers, and peripherals, plus licensed productivity, endpoint security, and business application software, with accessories and project materials in the same package.",
      },
      {
        heading: "Typical situations",
        body: "A new office setup, a mixed refresh list, or a single purchase that spans hardware, software, and accessories.",
      },
      {
        heading: "What to send",
        body: "Your item list with specifications and quantities, and any brand or model you already use. Tell HACIEN which items are fixed and which accept an equivalent.",
      },
      {
        heading: "What HACIEN checks",
        body: "HACIEN checks supplier availability evidence, warranty terms, and lead times for each item. Licensing terms are confirmed against vendor program rules, user count, and confirmed channel availability. Equivalents are offered only with your approval.",
      },
    ],
    relatedSlugs: ["software-licensing", "it-infrastructure", "project-delivery-support"],
    ctaLabel: "Submit Procurement RFQ",
    ctaUrl: "/quote",
    icon: "RFQ",
    seoTitle: "Hardware & Software Procurement",
    seoDescription:
      "HACIEN prepares hardware and software RFQ packages, including supplier coordination and quotation inputs, for Philippine organizations.",
  },
  {
    slug: "systems-integration",
    title: "Systems Integration",
    shortTitle: "Integration",
    category: "Core",
    summary:
      "A quoted project for a floor, a laboratory, or a building: site survey, bill of quantities, supply, installation, testing, turnover, and after-sales.",
    heroCopy:
      "HACIEN quotes IT integration as a sequence: survey the site, write the bill of quantities, supply, install, test, and turn the work over.",
    detail:
      "When the request is a place rather than a single box, HACIEN carries the procurement and the site work that the quotation lists. The sequence is a site survey, a bill of quantities, supply, installation, testing, turnover, and after-sales on the same request. HACIEN does not replace the buyer's IT office or a building electrician. Work that is not written in the quotation is not part of the job.",
    outcomes: [
      "Endpoint deployment support",
      "Configuration coordination",
      "Delivery sequencing",
      "Project documentation",
      "Closeout planning",
    ],
    workflow: [
      { step: "Survey the site", detail: "HACIEN confirms rooms, counts, power, and pathways from a visit or from plans and photos." },
      { step: "Write the quantities", detail: "HACIEN turns that survey into a bill of quantities with equipment, cable, and labor lines." },
      { step: "Supply and install", detail: "HACIEN orders against the accepted quotation and installs only the lines that quotation includes." },
      { step: "Test and turn over", detail: "HACIEN labels, tests, and hands over serials and warranty papers. After-sales stays on the same request." },
    ],
    sections: [
      {
        heading: "What this work covers",
        body: "The quoted scope can include a site survey, a bill of quantities, supply of the equipment, installation, testing against that bill, turnover of serial numbers and warranty papers, and after-sales on the same request. Single-site and multi-site work are both accepted. Each site keeps its own quantities.",
      },
      {
        heading: "Typical situations",
        body: "A laboratory or office floor that needs cable, switching, computers, and power together. A CCTV package that should not arrive before the switch that powers the cameras. A buyer who wants one party to survey, supply, and hand over.",
      },
      {
        heading: "What to send",
        body: "The sites, a plan or photos, the equipment you already know you want, and whether installation is included. If a government office has technical specifications, attach them. Say which lines allow an approved equivalent.",
      },
      {
        heading: "What HACIEN checks",
        body: "HACIEN checks the bill of quantities against distributor availability, checks that accessories are on the same quotation as the equipment they serve, and prepares the acceptance list for turnover. Equivalents are offered only with your approval. HACIEN supports the buyer's team. It does not replace them.",
      },
    ],
    relatedSlugs: ["it-infrastructure", "managed-it-support", "project-delivery-support"],
    ctaLabel: "Discuss Your Integration Project",
    ctaUrl: "/contact",
    icon: "SYS",
    seoTitle: "IT Integration from Survey to Turnover",
    seoDescription:
      "Site survey, bill of quantities, supply, installation, testing, and turnover for IT projects at Philippine offices, schools, and agencies.",
  },
  {
    slug: "managed-it-support",
    title: "Managed IT Support",
    shortTitle: "Support",
    category: "Operations",
    summary: "Recurring IT needs handled as RFQs: device refreshes, consumables, replacements, and renewals.",
    heroCopy: "HACIEN turns recurring IT needs — refreshes, consumables, replacements — into requests you can approve and reorder.",
    detail:
      "HACIEN handles recurring IT requirements as RFQs: device refresh planning, small infrastructure upgrades, consumables, and follow-up coordination where a formal request or prior transaction record exists.",
    outcomes: [
      "Device lifecycle and refresh RFQs",
      "Consumables planning",
      "Replacement review",
      "Renewal planning",
      "Follow-up coordination",
    ],
    workflow: [
      { step: "Log requirements", detail: "HACIEN records the need, the items, and the site it belongs to." },
      { step: "Prioritize needs", detail: "HACIEN orders the list by urgency: failures first, planned refreshes next." },
      { step: "Review item details", detail: "HACIEN checks availability and pricing evidence for each item." },
      { step: "Route the next step", detail: "HACIEN sends the quotation package, or routes the follow-up to the right next step." },
    ],
    sections: [
      {
        heading: "What this work covers",
        body: "Device lifecycle review, consumables from toner and ink to patch cords, batteries, and storage media, replacement requests, and renewal planning for licenses and equipment.",
      },
      {
        heading: "Typical situations",
        body: "A device fails unexpectedly, a scheduled refresh comes due, or consumables run low across offices and facilities.",
      },
      {
        heading: "What to send",
        body: "The device or item, how many you need, the site, and whether it is urgent or planned. For refreshes, the age and count of the devices being replaced helps.",
      },
      {
        heading: "What HACIEN checks",
        body: "HACIEN checks lifecycle needs against your current devices, availability and pricing evidence for replacements and renewals, and whether the request follows the right inquiry or RFQ path for your situation.",
      },
    ],
    relatedSlugs: ["hardware-software-procurement", "it-infrastructure", "project-delivery-support"],
    ctaLabel: "Submit Support RFQ",
    ctaUrl: "/quote",
    icon: "OPS",
    seoTitle: "Managed IT Support Procurement",
    seoDescription:
      "HACIEN handles managed IT support RFQs: device lifecycle needs, consumables, and replacement coordination.",
  },
  {
    slug: "network-connectivity",
    title: "Network & Connectivity",
    shortTitle: "Network",
    category: "Infrastructure",
    summary: "A network build quoted as one package: switching, wireless, firewall, and structured cabling.",
    heroCopy: "HACIEN quotes your network build as one package, from access switches to firewall and cabling.",
    detail:
      "HACIEN quotes network builds covering access layer switches, wireless access points, firewall appliances, and structured cabling materials, with PoE budget, VLAN, and cable infrastructure inputs confirmed before quotation.",
    outcomes: [
      "Managed switches",
      "Wireless access points",
      "Firewall and router appliances",
      "Structured cabling materials",
      "PoE and power planning",
    ],
    workflow: [
      { step: "Review site needs", detail: "HACIEN confirms the site layout, user count, and coverage areas." },
      { step: "Map equipment", detail: "HACIEN maps the site to switches, access points, firewall, and cabling." },
      { step: "Validate specs", detail: "HACIEN checks PoE budget, uplink requirements, and VLAN support before quotation." },
      { step: "Plan delivery details", detail: "HACIEN aligns delivery with site readiness and installation sequence." },
    ],
    sections: [
      {
        heading: "What this work covers",
        body: "Managed and unmanaged switches for office, campus, and industrial sites, wireless access points in controller-based or standalone setups, firewall and UTM appliances, and structured cabling materials.",
      },
      {
        heading: "Typical situations",
        body: "A new office network, a wireless upgrade across floors, or a site that needs switching, firewall, and cabling quoted together.",
      },
      {
        heading: "What to send",
        body: "The site layout, user count, coverage areas, and any PoE, uplink, or VLAN requirements you already know. For wireless, note whether a site survey is needed; HACIEN flags survey requirements before sizing.",
      },
      {
        heading: "What HACIEN checks",
        body: "HACIEN checks PoE budget, uplink requirements, and VLAN support against your user count and site layout, plus firewall sizing against user count and traffic profile, subject to vendor program availability.",
      },
    ],
    relatedSlugs: ["it-infrastructure", "cybersecurity", "servers-storage"],
    ctaLabel: "Submit Network RFQ",
    ctaUrl: "/quote",
    icon: "NET",
    seoTitle: "Network & Connectivity Procurement",
    seoDescription:
      "HACIEN quotes network builds: switches, wireless access points, firewalls, and structured cabling for Philippine organizations.",
  },
  {
    slug: "servers-storage",
    title: "Servers & Storage",
    shortTitle: "Servers",
    category: "Infrastructure",
    summary: "Right-sized servers and storage for your workload: entry to midrange servers, NAS, and backup.",
    heroCopy: "HACIEN sizes servers and storage to your workload and budget, then quotes the full package.",
    detail:
      "HACIEN sizes and quotes entry to midrange servers, NAS appliances, and backup storage. Workload, redundancy, and warranty are confirmed before quotation, so the package matches what the system will actually run.",
    outcomes: [
      "Server sizing support",
      "NAS and backup storage",
      "RAID and redundancy planning",
      "Warranty and support options",
      "Rack and physical planning",
    ],
    workflow: [
      { step: "Assess workload", detail: "HACIEN confirms what the server will run: file, application, database, or virtualization." },
      { step: "Size hardware", detail: "HACIEN matches the workload to server class, memory, storage, and redundancy." },
      { step: "Compare vendors", detail: "HACIEN compares vendor options and warranty levels for the sized package." },
      { step: "Prepare quotation", detail: "HACIEN organizes the package into a quotation for your review." },
    ],
    sections: [
      {
        heading: "What this work covers",
        body: "Tower and rack servers, NAS appliances and expansion, backup storage, RAID and redundancy planning, and the rack accessories for physical deployments: rack space, power, cooling, and cable management.",
      },
      {
        heading: "Typical situations",
        body: "A first server for file and application workloads, a virtualization host, or centralized storage and backup for an office.",
      },
      {
        heading: "What to send",
        body: "The workload, the number of users, retention needs for backups, and the rack space, power, and cooling available on site.",
      },
      {
        heading: "What HACIEN checks",
        body: "HACIEN checks server class, memory configuration, storage capacity, and warranty level against your workload, plus redundancy and retention needs, before any purchase is committed.",
      },
    ],
    relatedSlugs: ["it-infrastructure", "network-connectivity", "systems-integration"],
    ctaLabel: "Submit Server RFQ",
    ctaUrl: "/quote",
    icon: "SRV",
    seoTitle: "Server & Storage Procurement",
    seoDescription:
      "HACIEN sizes and quotes servers, NAS, backup storage, and rack equipment for Philippine organizations.",
  },
  {
    slug: "cloud-productivity",
    title: "Cloud & Productivity",
    shortTitle: "Cloud",
    category: "Software",
    summary: "License counts, renewals, and subscriptions for productivity, security, and collaboration tools.",
    heroCopy: "HACIEN counts your users, confirms the right plan, and quotes your license renewals.",
    detail:
      "HACIEN handles license review and renewal planning for productivity, endpoint security, and business applications. User counts, license types, and subscription options are confirmed before purchase, subject to vendor program rules.",
    outcomes: [
      "Productivity license review",
      "Renewal coordination",
      "User and admin planning",
      "License type guidance",
      "Subscription management support",
    ],
    workflow: [
      { step: "Count users", detail: "HACIEN confirms active users and admins for each product." },
      { step: "Validate license terms", detail: "HACIEN checks plan tiers and license terms against vendor program rules." },
      { step: "Quote subscriptions", detail: "HACIEN quotes the subscription, annual or monthly, for the confirmed user count." },
      { step: "Support onboarding", detail: "HACIEN supports the onboarding details for the quoted subscriptions." },
    ],
    sections: [
      {
        heading: "What this work covers",
        body: "Productivity licenses including Microsoft plans, endpoint security software licensed per device or per user, and collaboration and business tools where vendor programs allow participation.",
      },
      {
        heading: "Typical situations",
        body: "A renewal coming due, a team that grew past its current user count, or a new set of tools for a new office.",
      },
      {
        heading: "What to send",
        body: "The product, the current user count, the renewal date if there is one, and whether you need annual or monthly billing.",
      },
      {
        heading: "What HACIEN checks",
        body: "HACIEN checks plan tiers against your user count, license type, and subscription terms, confirmed through appropriate vendor channels. Licensing is confirmed through vendor channels, not assumed.",
      },
    ],
    relatedSlugs: ["software-licensing", "cybersecurity", "hardware-software-procurement"],
    ctaLabel: "Get License Quotation",
    ctaUrl: "/quote",
    icon: "SaaS",
    seoTitle: "Cloud & Productivity Licensing",
    seoDescription:
      "HACIEN quotes cloud and productivity licenses: user counts, plan tiers, and renewals for Philippine organizations.",
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    shortTitle: "Cybersecurity",
    category: "Security",
    summary: "Security sized to your users and traffic: endpoint protection, firewall, and network security.",
    heroCopy: "HACIEN quotes security to fit your users and traffic: endpoint protection, firewall, and network security.",
    detail:
      "HACIEN quotes endpoint protection software, firewall appliances, network security devices, and security management tools, sized to user count and traffic profile before quotation review.",
    outcomes: [
      "Endpoint protection",
      "Firewall and UTM appliances",
      "Network security devices",
      "Security software licensing",
      "Cybersecurity accessory planning",
    ],
    workflow: [
      { step: "Assess threat profile", detail: "HACIEN confirms what needs protecting: users, devices, and network exposure." },
      { step: "Identify solutions", detail: "HACIEN matches the profile to endpoint, firewall, and network security options." },
      { step: "Review product details", detail: "HACIEN checks capability, licensing model, and vendor support for each option." },
      { step: "Prepare quotation", detail: "HACIEN organizes the sized package into a quotation for your review." },
    ],
    sections: [
      {
        heading: "What this work covers",
        body: "Endpoint antivirus, anti-malware, and detection software licensed per device or per user, firewall and UTM appliances, and network security devices sized to your environment.",
      },
      {
        heading: "Typical situations",
        body: "A company-wide endpoint renewal, a first firewall for a new site, or a security upgrade tied to a network build.",
      },
      {
        heading: "What to send",
        body: "User and device counts, traffic profile, and the systems you need protected. If you already have a security specification, send it as is.",
      },
      {
        heading: "What HACIEN checks",
        body: "HACIEN checks sizing against user count and traffic profile, licensing model, and vendor support terms. Products vary significantly in capability and licensing, so confirm technical requirements with a qualified security professional before finalizing specifications.",
      },
    ],
    relatedSlugs: ["network-connectivity", "cloud-productivity", "security-surveillance"],
    ctaLabel: "Submit Security RFQ",
    ctaUrl: "/quote",
    icon: "SEC",
    seoTitle: "Cybersecurity Procurement",
    seoDescription:
      "HACIEN quotes cybersecurity: endpoint protection, firewall appliances, and network security products.",
  },
  {
    slug: "security-surveillance",
    title: "Security & Surveillance",
    shortTitle: "Surveillance",
    category: "Security",
    summary: "A site security package quoted from your site details: CCTV, access control, storage, and cabling.",
    heroCopy: "HACIEN turns your site details into a security package: cameras, access control, storage, and cabling.",
    detail:
      "HACIEN turns site security needs into usable requests covering CCTV cameras, NVR/DVR systems, access control hardware, and monitoring infrastructure, with retention, coverage, cabling, and warranty assumptions stated up front.",
    outcomes: [
      "CCTV package planning",
      "NVR/DVR requirement review",
      "Access control requirement review",
      "Storage and retention sizing",
      "Installation accessory list",
    ],
    workflow: [
      { step: "Assess coverage", detail: "HACIEN confirms the areas to cover, camera count, and resolution needs." },
      { step: "Size equipment", detail: "HACIEN sizes cameras, NVR/DVR, and storage against coverage and retention days." },
      { step: "Review availability details", detail: "HACIEN checks supplier availability and pricing evidence for the package." },
      { step: "Prepare quotation", detail: "HACIEN organizes the package into a quotation for your review." },
    ],
    sections: [
      {
        heading: "What this work covers",
        body: "CCTV cameras, NVR/DVR systems, storage expansion, access control hardware including card readers, biometric units, and door controllers, plus cabling, power supplies, mounting hardware, and conduit.",
      },
      {
        heading: "Typical situations",
        body: "A new site that needs cameras and access control from day one, or an existing site adding coverage and retention.",
      },
      {
        heading: "What to send",
        body: "Camera count, coverage areas, resolution needs, retention days, door count for access control, and the site layout.",
      },
      {
        heading: "What HACIEN checks",
        body: "HACIEN checks camera package, NVR/DVR, and storage expansion against your site details, access control hardware against door count and integration requirements, and installation material lists through the quotation review process.",
      },
    ],
    relatedSlugs: ["cybersecurity", "it-infrastructure", "network-connectivity"],
    ctaLabel: "Submit Security RFQ",
    ctaUrl: "/quote",
    icon: "CAM",
    seoTitle: "Security & Surveillance Procurement",
    seoDescription:
      "HACIEN quotes site security: CCTV systems, access control, NVR/DVR equipment, and installation materials.",
  },
  {
    slug: "software-licensing",
    title: "Software Licensing",
    shortTitle: "Licensing",
    category: "Software",
    summary: "The right license type for your size and use: perpetual, subscription, or volume.",
    heroCopy: "HACIEN matches your software to the right license type, then quotes it through the right channel.",
    detail:
      "HACIEN reviews business software license requirements including operating systems, productivity suites, endpoint security, and vertical business applications, and matches each one to the right license type before quotation.",
    outcomes: [
      "Perpetual license review",
      "Subscription management support",
      "Renewal planning",
      "Volume license guidance",
      "OS and productivity software",
    ],
    workflow: [
      { step: "Identify software needs", detail: "HACIEN confirms the software, the users, and the use case." },
      { step: "Validate license type", detail: "HACIEN matches the need to perpetual, subscription, or volume licensing." },
      { step: "Review channel rules", detail: "HACIEN checks vendor channel rules, transferability, and support terms." },
      { step: "Prepare quotation", detail: "HACIEN organizes the licenses into a quotation for your review." },
    ],
    sections: [
      {
        heading: "What this work covers",
        body: "Operating system licenses including OEM, volume, and upgrade options, productivity suites, endpoint security, and industry applications for accounting, HR, inventory, and operations.",
      },
      {
        heading: "Typical situations",
        body: "A new company setup, a renewal, or a team that needs licenses added as headcount grows.",
      },
      {
        heading: "What to send",
        body: "The software you need, the user count, and any current licenses you already hold.",
      },
      {
        heading: "What HACIEN checks",
        body: "HACIEN checks license type against your organization size and use case, transferability and support terms, and vendor channel rules. Licensing terms and availability depend on vendor program participation.",
      },
    ],
    relatedSlugs: ["cloud-productivity", "hardware-software-procurement", "cybersecurity"],
    ctaLabel: "Request License Quotation",
    ctaUrl: "/quote",
    icon: "LIC",
    seoTitle: "Software Licensing Procurement",
    seoDescription:
      "HACIEN quotes software licenses: productivity suites, operating systems, and business applications.",
  },
  {
    slug: "general-merchandise-procurement",
    title: "General Merchandise Procurement",
    shortTitle: "Merchandise",
    category: "General",
    summary: "Non-IT goods quoted alongside IT: office supplies, furniture, safety gear, and consumables.",
    heroCopy: "HACIEN quotes general merchandise in the same package as your IT, so one RFQ covers both.",
    detail:
      "HACIEN quotes general merchandise and office supplies alongside IT requirements, so buyers with mixed packages get one integrated quotation package instead of separate requests.",
    outcomes: [
      "Office supply RFQ review",
      "Non-IT goods request review",
      "Mixed procurement packages",
      "Supplier-input review for general goods",
      "Quotation support for institutional buyers",
    ],
    workflow: [
      { step: "Identify goods", detail: "HACIEN confirms the items, quantities, and delivery sites." },
      { step: "Review supplier inputs", detail: "HACIEN checks supplier availability and pricing evidence for each item." },
      { step: "Review availability details", detail: "HACIEN confirms availability, pricing, and lead times before quotation." },
      { step: "Prepare quotation", detail: "HACIEN organizes IT and non-IT items into one quotation package." },
    ],
    sections: [
      {
        heading: "What this work covers",
        body: "Office supplies, furniture, safety equipment, cleaning materials, and other consumables, quoted alone or together with IT equipment in a mixed package.",
      },
      {
        heading: "Typical situations",
        body: "An institutional buyer issuing one package that mixes IT equipment and general goods, or a regular restock of office supplies.",
      },
      {
        heading: "What to send",
        body: "Your item list with quantities and delivery sites, and which items belong with an IT package, if any.",
      },
      {
        heading: "What HACIEN checks",
        body: "HACIEN checks availability, pricing, and lead times through supplier evidence before issuing or relying on quotations. Availability and pricing vary significantly by item type and supplier, so nothing is quoted without that evidence.",
      },
    ],
    relatedSlugs: ["hardware-software-procurement", "project-delivery-support", "managed-it-support"],
    ctaLabel: "Submit General RFQ",
    ctaUrl: "/quote",
    icon: "GEN",
    seoTitle: "General Merchandise Procurement",
    seoDescription:
      "HACIEN quotes general merchandise, office supplies, and mixed IT and non-IT packages.",
  },
  {
    slug: "project-delivery-support",
    title: "Project Delivery Support",
    shortTitle: "Delivery",
    category: "Operations",
    summary: "Delivery reviewed early, not after purchase: schedules, acceptance documents, and closeout.",
    heroCopy: "HACIEN reviews delivery before you order, so schedules, acceptance, and closeout are settled early.",
    detail:
      "HACIEN covers the logistics and documentation tasks that follow procurement: scheduling deliveries, coordinating with installation teams, preparing acceptance checklists, and supporting project closeout when included in the formal request.",
    outcomes: [
      "Delivery scheduling review",
      "Supplier logistics support",
      "Acceptance documentation details",
      "Serial number and warranty documentation details",
      "Project closeout support",
    ],
    workflow: [
      { step: "Review delivery schedule", detail: "HACIEN confirms delivery windows against your project timeline." },
      { step: "Plan logistics details", detail: "HACIEN coordinates suppliers, delivery windows, and site readiness." },
      { step: "Support acceptance review", detail: "HACIEN prepares acceptance checklists and delivery documentation." },
      { step: "Document closeout", detail: "HACIEN prepares serial number logs, warranty documents, and closeout records." },
    ],
    sections: [
      {
        heading: "What this work covers",
        body: "Delivery scheduling across multiple suppliers, logistics coordination with site readiness, acceptance checklists and delivery documentation, serial number and warranty records, and project closeout support.",
      },
      {
        heading: "Typical situations",
        body: "A large package from several suppliers, a delivery tied to an installation schedule, or a project that needs formal acceptance records.",
      },
      {
        heading: "What to send",
        body: "The delivery windows, site readiness requirements, supplier list, and any acceptance or documentation rules your project already has.",
      },
      {
        heading: "What HACIEN checks",
        body: "HACIEN checks delivery schedules against project timelines, physical inspection, serial number recording, and warranty documentation at delivery, plus follow-up routing for missing items, warranty questions, or replacements when product, quotation, supplier, and delivery details are available.",
      },
    ],
    relatedSlugs: ["systems-integration", "managed-it-support", "hardware-software-procurement"],
    ctaLabel: "Discuss Delivery Support",
    ctaUrl: "/contact",
    icon: "DEL",
    seoTitle: "Project Delivery Support",
    seoDescription:
      "HACIEN supports project delivery: logistics scheduling, acceptance documentation, and closeout.",
  },
];

export function getSolution(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}
