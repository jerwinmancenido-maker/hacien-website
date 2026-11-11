/** Match a visitor's words to services already published on the site. */

import { categories } from "@/data/products";
import { solutions } from "@/data/solutions";
import { getIndustriesContent } from "@/lib/cms/content";

const SOLUTION_KEYS: Record<string, string[]> = {
  "it-infrastructure": ["infrastructure", "server room", "cabling"],
  "hardware-software-procurement": ["laptop", "laptops", "desktop", "desktops", "printer", "printers", "hardware"],
  "systems-integration": ["integration", "rollout"],
  "managed-it-support": ["device refresh", "consumables", "toner"],
  "network-connectivity": ["wi-fi", "wifi", "firewall"],
  "servers-storage": ["server", "servers", "nas", "backup"],
  "cloud-productivity": ["microsoft 365"],
  cybersecurity: ["cybersecurity", "endpoint security"],
  "security-surveillance": ["cctv", "camera", "cameras", "surveillance"],
  "software-licensing": ["license", "licenses", "licensing"],
  "general-merchandise-procurement": ["merchandise", "office supplies", "hand tools"],
  "project-delivery-support": ["project delivery", "closeout"],
};

const INDUSTRY_KEYS: Record<string, string[]> = {
  Government: ["government", "philgeps", "lgu", "bidding", "gobyerno"],
  "Schools, Universities & Technical Training": ["school", "university", "laboratory"],
  Healthcare: ["healthcare", "hospital", "clinic"],
  "Contractors, Facilities & Industrial Maintenance": ["contractor", "warehouse"],
  "Corporate & Commercial": ["bpo"],
};

const PLATFORM =
  "Operating platform — This is the system HACIEN runs on, not a product you buy. It is not sold as a product.";

export function matchSiteOfferings(text: string): string[] {
  const hay = text.toLowerCase();
  const lines: string[] = [];
  const push = (line: string) => {
    if (lines.length >= 4 || lines.includes(line)) return;
    lines.push(line);
  };
  for (const solution of solutions) {
    const keys = [solution.title.toLowerCase(), ...(SOLUTION_KEYS[solution.slug] || [])];
    if (keys.some((key) => hay.includes(key))) push(`${solution.title} — ${solution.summary}`);
  }
  for (const category of categories) {
    if (hay.includes(category.name.toLowerCase())) push(`${category.name} — ${category.summary}`);
  }
  for (const card of getIndustriesContent().supportedIndustries.cards) {
    const keys = INDUSTRY_KEYS[card.title] || [];
    if (keys.some((key) => hay.includes(key))) push(`${card.title} — ${card.text}`);
  }
  if (/\berp\b|operating platform/.test(hay)) push(PLATFORM);
  return lines;
}
