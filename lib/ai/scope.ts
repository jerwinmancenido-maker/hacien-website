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
  // Persona takeover only: "you are now a/the/my …", a named persona,
  // or a mode switch. Ordinary procurement phrasing ("you are now
  // requested to submit a quotation") is not an injection.
  /you are now\s+(a\s|an\s|the\s|my\s|dan\b|chatgpt\b|gpt\b|in\s+(developer|dan|jailbreak))/i,
  /\b(jailbreak|developer mode|do anything now)\b/i,
  // A bare "system prompt" mention in an RFQ/spec is not injection —
  // only ask/reveal/dump phrasing above (and the Tagalog forms below).
  // The output guard remains the leak screen for any reply that echoes
  // internal prompt state (Bugbot High, PR #88 at a16f881).
  /kalimutan mo\s+(ang\s+|yung\s+)?(instructions|utos|rules|prompt)/i,
  /ignore mo\s+(ang\s+|yung\s+)?(instructions|rules|prompt)/i,
  /(ipakita|sabihin)\s+(mo\s+)?(ang\s+|yung\s+)?(system\s+)?prompt/i,
];

// Refused even when the message also names a product or brand —
// a share-price question about Apple or a hack request naming a
// server is not a HACIEN inquiry however it is dressed up.
const HARD_ALWAYS_OFF_TOPIC = [
  // Code-writing requests. "program of work" is an RFQ/construction
  // document, not code (CTO review R1). Bare "class" is omitted from
  // the proximity list so a school quote ("write a quotation for our
  // computer class") stays in scope; "write a class …" is caught by
  // the dedicated programming-class pattern below (Bugbot High,
  // PR #88 at a16f881).
  /\b(write|debug|compile)\b[^.]{0,48}\b(code|function|script|program(?!\s+of\s+work)|algorithm)\b/i,
  /\b(write|debug|compile)\s+(me\s+|us\s+|a\s+|an\s+|the\s+|my\s+|this\s+)?class\b/i,
  /\bmy code\b/i,
  // "this function hall" is a venue, not a programming ask.
  /\bthis function\b(?!\s+(hall|room|area|venue|building|center|centre|space))/i,
  /\b(gawa|gumawa|gawan)\b[^.]{0,40}\b(code|program(?!\s+of\s+work)|script)\b/i,
  // "no joke" / "not a joke" is emphasis on a real request, not a
  // comedy ask (Bugbot High, PR #88 at a16f881).
  /\b(jokes|knock-knock|magbiro)\b/i,
  /(?<!\bno\s)(?<!\bnot\s+a\s)\bjoke\b/i,
  /\b(who should i vote|politician|pulitika)\b/i,
  /\b(girlfriend|boyfriend|break up)\b/i,
  /\b(stock price|share price)\b/i,
  /\b(hack\s+(into|a\b|an\b|the\b|someone)|how to hack|hacking tutorial|create malware|write (an? )?exploit)\b/i,
  /\b(bedtime story|quantum physics|world cup)\b/i,
];

// Refused only when the message carries no product anchor: a school
// asking for laptops for its Python classes (or a homework-heavy
// training lab) is a quote, not an off-topic request (Bugbot,
// PR #88 at bd245d21 — these tokens used to beat the anchors).
const HARD_CONTEXT_OFF_TOPIC = [
  // A bare "biro" is idiom as often as it is a joke request ("Hindi
  // biro, kailangan namin ng 20 laptops" = "seriously, we need 20
  // laptops"), so it only refuses without an anchor or an open path
  // (CTO review R1). "magbiro" (to joke) stays always-refused above.
  /\bbiro\b/i,
  /\b(python|javascript|typescript|leetcode)\b/i,
  /\b(homework|term paper|quiz|coursework)\b/i,
  /\b(solve|sagutan)\b[^.]{0,24}\b(equation|math|calculus)\b/i,
  /\b(weather forecast|recipe for|horoscope|capital of|capital ng|translate this)\b/i,
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

function productAnchors(): string[] {
  return [
    ...STATIC_ANCHORS,
    ...solutions.map((solution) => solution.title),
    ...categories.map((category) => category.name),
  ];
}

export function isInjectionText(text: string): boolean {
  return INJECTION.some((pattern) => pattern.test(text));
}

const BARE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function classifyUserTurn(text: string, path: string | null = null): ScopeDecision {
  const trimmed = text.trim();
  if (!trimmed) return "off-topic";
  // The chat opens by sending the visitor's work email on its own —
  // that turn is the intake email step, never off-topic (Bugbot High,
  // PR #88 at bd245d21).
  if (BARE_EMAIL.test(trimmed)) return "in-scope";
  if (isInjectionText(trimmed)) return "injection";
  if (HARD_ALWAYS_OFF_TOPIC.some((pattern) => pattern.test(trimmed))) return "off-topic";
  if (path === "quote" || path === "inquiry" || path === "callback") return "in-scope";
  if (GREETING.test(trimmed)) return "in-scope";
  if (mentionsComparison(trimmed)) return "in-scope";
  // Product anchors before the context list: a real quote line that
  // names a product or industry stays in scope even when it also
  // carries a token like "python" or "homework" (a school's Python
  // lab is still a quote). The context list still refuses
  // anchorless requests outright.
  if (productAnchors().some((anchor) => hasAnchor(trimmed, anchor))) return "in-scope";
  if (HARD_CONTEXT_OFF_TOPIC.some((pattern) => pattern.test(trimmed))) return "off-topic";
  if (carriedBrands.some((brand) => hasAnchor(trimmed, brand))) return "in-scope";
  return "off-topic";
}

export function mentionsComparison(text: string): boolean {
  return /\b(better than|worse than|versus|vs\.?|compared? (to|with)|cheaper than|competitor)\b/i.test(text);
}
