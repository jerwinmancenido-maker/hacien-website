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

/** Soft first-turn reply when the message is too thin to classify —
 *  ask what they need instead of refusing (owner decision, 2026-11-20). */
export const SCOPE_CLARIFY =
  "Happy to help — could you tell me a bit more about what you need from HACIEN? A quotation, a product question, support, or something else?";

export type ScopeDecision = "in-scope" | "off-topic" | "injection" | "clarify";

const INJECTION = [
  // Instruction targets only — RFQ "prompt payment" / "prompt delivery"
  // must not match (Bugbot High, PR #88 at 4027aba). Ignore/disregard of
  // instructions|rules requires an assistant/system target so RFQ lines
  // like "bidders must not ignore the instructions" stay in scope
  // (Bugbot Medium at e14aa70). Bare "the prompt" / "prompt" still
  // catches jailbreaks like "ignore the prompt" / "reveal prompt"
  // (Bugbot High at e14aa70).
  /ignore\s+(all\s+)?(your\s+|my\s+)((previous|prior|above)\s+)?(instructions|rules)\b/i,
  /ignore\s+(all\s+)?(the\s+)?(previous|prior|above)\s+(instructions|rules)\b/i,
  /ignore\s+all\s+(the\s+)?(instructions|rules)\b/i,
  /disregard\s+(all\s+)?(your\s+|my\s+)((previous|prior|above)\s+)?(instructions|rules)\b/i,
  /disregard\s+(all\s+)?(the\s+)?(previous|prior|above)\s+(instructions|rules)\b/i,
  // Bare "disregard the rules" is a jailbreak; RFQ "must not disregard
  // the instructions" is excluded by the not/never lookbehind.
  /(?<!\b(?:not|never|don'?t|dont)\s+)disregard\s+(the\s+)?(instructions|rules)\b/i,
  /ignore\s+(your\s+|the\s+)?system\s+prompt\b/i,
  /disregard\s+(your\s+|the\s+)?system\s+prompt\b/i,
  /ignore\s+(your\s+|the\s+)?prompt\b(?!\s+(payment|delivery))/i,
  /disregard\s+(your\s+|the\s+)?prompt\b(?!\s+(payment|delivery))/i,
  /reveal\s+((your|the)\s+)?system\s+prompt\b/i,
  /reveal\s+(your\s+|the\s+)?prompt\b(?!\s+(payment|delivery))/i,
  /(show|print|repeat|dump)\s+(me\s+)?((your|the)\s+)?system\s+prompt\b/i,
  /(show|print|repeat|dump)\s+(me\s+)?(your|the)\s+prompt\b(?!\s+(payment|delivery))/i,
  // "print your instructions" is injection; printing product install
  // instructions for an RFQ is not.
  /(show|print|repeat|dump)\s+(me\s+)?your\s+(instructions|rules)\b/i,
  // Ask/tell for the system prompt is injection; a bid-form line that
  // merely mentions "system prompt" is not (Bugbot Medium, PR #88 at
  // cdaa1d4). Output guard remains the leak screen for echoed state.
  /\b(tell|ask)\s+(me\s+|us\s+)?(for\s+)?((your|the)\s+)?system\s+prompt\b/i,
  /\b(tell|ask)\s+(me\s+|us\s+)?(for\s+)?(your|the)\s+prompt\b(?!\s+(payment|delivery))/i,
  /\bwhat\s+(is|'s|are)\s+((your|the)\s+)?system\s+prompt\b/i,
  /\bwhat\s+(is|'s|are)\s+(your|the)\s+prompt\b(?!\s+(payment|delivery))/i,
  // Persona takeover only: "you are now a/the/my …", a named persona,
  // or a mode switch. Ordinary procurement phrasing ("you are now
  // requested to submit a quotation") is not an injection.
  /you are now\s+(a\s|an\s|the\s|my\s|dan\b|chatgpt\b|gpt\b|in\s+(developer|dan|jailbreak))/i,
  /\b(jailbreak|developer mode|do anything now)\b/i,
  /kalimutan mo\s+(ang\s+|yung\s+)?(instructions|utos|rules)\b/i,
  /kalimutan mo\s+(ang\s+|yung\s+)?(system\s+)?prompt\b/i,
  /ignore mo\s+(ang\s+|yung\s+)?(instructions|rules)\b/i,
  /ignore mo\s+(ang\s+|yung\s+)?(system\s+)?prompt\b/i,
  /(ipakita|sabihin)\s+(mo\s+)?(ang\s+|yung\s+)?system\s+prompt\b/i,
  /(ipakita|sabihin)\s+(mo\s+)?(ang\s+|yung\s+)?(instructions|utos|rules)\b/i,
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
  // Optional pronoun then optional article: "write a class", "write me
  // a class", "write us a class". School "write a quotation for our
  // computer class" still misses this (Bugbot Medium, PR #88 at cdaa1d4).
  /\b(write|debug|compile)\s+((me|us|him|her|them|my|your|this)\s+)?(a\s+|an\s+|the\s+)?class\b/i,
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
  // Clear general-knowledge asks stay refused (owner clarify-first is
  // only for thin / product-adjacent first messages, not essays or
  // relationship advice). Weather/cook/recipe sit in HARD_CONTEXT so
  // product-anchored "all-weather" / "weather-resistant" CCTV quotes
  // stay in scope (Bugbot High at e14aa70).
  /\brelationship advice\b/i,
  /\b(write|draft)\b[^.]{0,48}\b(essay|poem)\b/i,
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
  // After product anchors: plain weather/cooking asks refuse; anchored
  // "all-weather CCTV" / outdoor equipment quotes pass.
  /\bweather\b/i,
  /\b(cook|how to cook|recipe)\b/i,
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
  // No product/HACIEN anchor and not clearly off-topic — ask for a
  // clearer request instead of refusing (owner, 2026-11-20).
  return "clarify";
}

export function mentionsComparison(text: string): boolean {
  return /\b(better than|worse than|versus|vs\.?|compared? (to|with)|cheaper than|competitor)\b/i.test(text);
}
