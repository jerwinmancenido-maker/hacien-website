/** Extra company facts for the chat, taken from the site's own pages.
 *
 * The standing FACTS sheet stays as written. This section only adds
 * detail that is already published, so the assistant can answer from
 * the site without inventing anything.
 */

import billingSettings from "@/config/billing-compliance-settings.json";
import { categories, products } from "@/data/products";
import { solutions } from "@/data/solutions";
import { getIndustriesContent } from "@/lib/cms/content";

const PLATFORM = [
  "This is the system HACIEN runs on, not a product you buy. It keeps your requests, quotations, deliveries, and support tied to one account record.",
  "HACIEN runs its own operations on this platform. It is not sold as a product.",
];

export function buildCompanyKnowledge(): string {
  const industries = getIndustriesContent();
  return [
    `Industries: ${industries.supportedIndustries.cards.map((card) => `${card.title} — ${card.text}`).join(" ")}`,
    `Engagement detail: ${solutions.map((solution) => `${solution.title} — ${solution.summary}`).join(" ")}`,
    `Technology categories, all for quotation, with no price published on the website: ${categories
      .map((category) => {
        const names = products
          .filter((product) => product.categorySlug === category.slug)
          .map((product) => product.name)
          .join(", ");
        return `${category.name} — ${category.summary} Profiles: ${names}.`;
      })
      .join(" ")}`,
    `Quotation page: describe the product, quantity, delivery location, and deadline. Every request is reviewed before a quotation is prepared. No online payment is collected. A reference number is issued after the request is sent. ${billingSettings.quote_validity_disclaimer}`,
    `Operating platform, not for sale: ${PLATFORM.join(" ")}`,
  ].join("\n");
}
