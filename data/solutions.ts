export type Solution = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  detail: string;
  outcomes: string[];
  workflow: string[];
  icon: string;
};

export const solutions: Solution[] = [
  {
    slug: "it-procurement",
    title: "IT Procurement",
    shortTitle: "Procurement",
    summary: "RFQ-ready sourcing for hardware, software, accessories, warranties, and project materials.",
    detail:
      "HACIEN helps buyers translate requirements into supplier-ready requests, compare available options, and prepare quotation packages for business and institutional purchasing.",
    outcomes: ["Supplier availability checks", "Approved equivalent matching", "Warranty and lead-time validation"],
    workflow: ["Clarify specs", "Source suppliers", "Compare options", "Prepare formal quotation"],
    icon: "RFQ",
  },
  {
    slug: "infrastructure-network",
    title: "Infrastructure & Network",
    shortTitle: "Infrastructure",
    summary: "Endpoint, switching, wireless, firewall, server, storage, and site connectivity support.",
    detail:
      "For network and infrastructure projects, HACIEN supports bill-of-material review, brand/model matching, deployment coordination, and practical site-readiness planning.",
    outcomes: ["Network equipment sourcing", "Server and storage sizing", "Deployment accessory planning"],
    workflow: ["Review site needs", "Map equipment", "Coordinate delivery", "Support rollout"],
    icon: "NET",
  },
  {
    slug: "systems-integration",
    title: "Systems Integration",
    shortTitle: "Integration",
    summary: "Project coordination for IT rollouts, device deployment, systems setup, and documentation.",
    detail:
      "HACIEN bridges procurement and implementation by coordinating practical setup requirements, project documentation, installation support, and handover needs.",
    outcomes: ["Endpoint deployment support", "Configuration coordination", "Project documentation"],
    workflow: ["Plan rollout", "Prepare materials", "Coordinate setup", "Document handover"],
    icon: "SYS",
  },
  {
    slug: "cloud-productivity",
    title: "Cloud & Productivity",
    shortTitle: "Cloud",
    summary: "Licensed productivity, endpoint security, collaboration, and business software sourcing.",
    detail:
      "HACIEN supports license sourcing and renewal planning for common productivity, security, and business applications, subject to vendor program rules.",
    outcomes: ["License sourcing", "Renewal coordination", "User and admin planning"],
    workflow: ["Count users", "Validate license terms", "Quote subscriptions", "Support onboarding"],
    icon: "SaaS",
  },
  {
    slug: "security-surveillance",
    title: "Security & Surveillance",
    shortTitle: "Security",
    summary: "CCTV, access control, endpoint protection, and site security technology sourcing.",
    detail:
      "Security projects need clear retention, coverage, cabling, and warranty assumptions. HACIEN helps convert those needs into supplier-ready packages.",
    outcomes: ["CCTV package planning", "Security software sourcing", "Storage and retention sizing"],
    workflow: ["Assess coverage", "Size equipment", "Check stock", "Prepare quotation"],
    icon: "SEC",
  },
  {
    slug: "managed-it-support",
    title: "Managed IT Support",
    shortTitle: "Support",
    summary: "Practical lifecycle support for devices, office IT, consumables, replacements, and projects.",
    detail:
      "HACIEN can support recurring IT procurement needs, device refresh planning, small infrastructure upgrades, and follow-up coordination after delivery.",
    outcomes: ["Device lifecycle support", "Consumables planning", "Follow-up coordination"],
    workflow: ["Log requirements", "Prioritize needs", "Source items", "Coordinate fulfillment"],
    icon: "OPS",
  },
];

export function getSolution(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}
