/** Cheap scope check before a model call. No extra dependency.
 *
 * Once a request path is open, ordinary answers (a name, a city, "looks
 * right") stay in scope. Injection and clearly off-topic requests do not.
 */

import { carriedBrands } from "@/data/companyContact";
import { categories } from "@/data/products";
import { solutions } from "@/data/solutions";

export const SCOPE_REFUSAL =
  "I can only help with HACIEN IT products and services, quotes, orders, delivery, support, and contact — what can I help you with?";

export type ScopeDecision = "in-scope" | "off-topic" | "injection";

const INJECTION = [
  /ignore\s+(all\s+|your\s+|the\s+)?(previous\s+|prior\s+|above\s+)?(instructions|rules|prompt)/i,
  /disregard\s+(your\s+|the\s+)?(instructions|rules|prompt)/i,
  /reveal\s+(your\s+|the\s+)?(system\s+)?prompt/i,
  /(show|print|repeat|dump)\s+(me\s+)?(your\s+|the\s+)?(system\s+)?prompt/i,
  /you are now\b/i,
  /\b(jailbreak|developer mode|do anything now)\b/i,
  /\bsystem prompt\b/i,
  /kalimutan mo\s+(ang\s+|yung\s+)?(instructions|utos|rules|prompt)/i,
  /ignore mo\s+(ang\s+|yung\s+)?(instructions|rules|prompt)/i,
  /(ipakita|sabihin)\s+(mo\s+)?(ang\s+|yung\s+)?(system\s+)?prompt/i,
];

const HARD_OFF_TOPIC = [
  /\b(write|debug|compile)\b[^.]{0,48}\b(code|function|script|program|class|algorithm)\b/i,
  /\b(python|javascript|typescript|leetcode)\b/i,
  /\b(my code|this function)\b/i,
  /\b(gawa|gumawa|gawan)\b[^.]{0,40}\b(code|program|script)\b/i,
  /\b(homework|term paper|quiz|coursework)\b/i,
  /\b(solve|sagutan)\b[^.]{0,24}\b(equation|math|calculus)\b/i,
  /\b(joke|jokes|knock-knock|magbiro)\b|\bbiro\b/i,
  /\b(weather forecast|recipe for|horoscope|capital of|capital ng|translate this)\b/i,
  /\b(who should i vote|politician|pulitika)\b/i,
  /\b(girlfriend|boyfriend|break up)\b/i,
  /\b(stock price|share price)\b/i,
  /\b(hack\s+(into|a\b|an\b|the\b|someone)|how to hack|hacking tutorial|create malware|write (an? )?exploit)\b/i,
  /\b(bedtime story|quantum physics|world cup)\b/i,
];

const GREETING =
  /^(hi|hello|hey|yo|kumusta|kamusta|magandang\s+\w+|good\s+(morning|afternoon|evening)|salamat|thank you|thanks|ok|okay|sige|looks right|needs changes|arrange a callback)[!.?\s]*$/i;

const STATIC_ANCHORS = [
  "hacien",
  "quote",
  "quotation",
  "rfq",
  "boq",
  "philgeps",
  "government",
  "gobyerno",
  "lgu",
  "warranty",
  "delivery",
  "deliver",
  "office",
  "opisina",
  "ortigas",
  "pasig",
  "contact",
  "support",
  "laptop",
  "desktop",
  "server",
  "printer",
  "switch",
  "brand",
  "cctv",
  "network",
  "software",
  "hardware",
  "license",
  "callback",
  "inquiry",
  "hours",
  "cabling",
  "nas",
  "wifi",
  "ups",
  "discount",
  "price",
  "order",
  "bid",
  "presyo",
  "magkano",
  "kailangan",
  "serbisyo",
  "produkto",
  "computer",
  "kompyuter",
  "eskwela",
  "paaralan",
  "company",
  "service",
  "product",
  "email",
  "warranty",
  "erp",
  "platform",
  "anti-malware",
  "antivirus",
  "firewall",
  "endpoint",
  "protection",
  "exploit",
  "diagnose",
  "diagnosis",
  "equipment",
  "cybersecurity",
  "security",
];

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hasAnchor(text: string, anchor: string): boolean {
  const needle = anchor.trim().toLowerCase();
  if (needle.length < 3) return false;
  if (needle.length <= 4) return new RegExp(`\\b${escapeRegExp(needle)}\\b`, "i").test(text);
  return text.toLowerCase().includes(needle);
}

function anchors(): string[] {
  return [
    ...STATIC_ANCHORS,
    ...carriedBrands,
    ...solutions.map((solution) => solution.title),
    ...categories.map((category) => category.name),
  ];
}

export function isInjectionText(text: string): boolean {
  return INJECTION.some((pattern) => pattern.test(text));
}

export function classifyUserTurn(text: string, path: string | null = null): ScopeDecision {
  const trimmed = text.trim();
  if (!trimmed) return "off-topic";
  if (isInjectionText(trimmed)) return "injection";
  if (HARD_OFF_TOPIC.some((pattern) => pattern.test(trimmed))) return "off-topic";
  if (path === "quote" || path === "inquiry" || path === "callback") return "in-scope";
  if (GREETING.test(trimmed)) return "in-scope";
  if (mentionsComparison(trimmed)) return "in-scope";
  if (anchors().some((anchor) => hasAnchor(trimmed, anchor))) return "in-scope";
  return "off-topic";
}

export function mentionsComparison(text: string): boolean {
  return /\b(better than|worse than|versus|vs\.?|compared? (to|with)|cheaper than|competitor)\b/i.test(text);
}
