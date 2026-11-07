/** Shared formatting for quote requirement blocks (the cart items a buyer added
 *  from /products). Used by both the full QuoteCart form and the guided chat so
 *  the text HACIEN receives is identical either way. */

export type QuoteRequirementInput = {
  categoryLabel: string;
  quantity: string;
  brandPreference: string;
  otherBrand?: string;
  equivalentAccepted: string;
  deadline?: string;
  deliveryLocation?: string;
  notes?: string;
  fields: Record<string, string>;
};

export function formatRequirementLines(requirements: QuoteRequirementInput[]): string {
  return requirements
    .map((requirement, index) => {
      const fieldLines = Object.entries(requirement.fields)
        .filter(([, value]) => value)
        .map(([key, value]) => `  - ${key}: ${value}`);

      return [
        `${index + 1}. ${requirement.categoryLabel} — quantity/scope: ${requirement.quantity}`,
        `  - Preferred brand/vendor: ${requirement.brandPreference}${requirement.otherBrand ? ` (${requirement.otherBrand})` : ""}`,
        `  - Equivalent options: ${requirement.equivalentAccepted}`,
        requirement.deadline ? `  - Deadline: ${requirement.deadline}` : "",
        requirement.deliveryLocation ? `  - Delivery location: ${requirement.deliveryLocation}` : "",
        ...fieldLines,
        requirement.notes ? `  - Notes: ${requirement.notes}` : "",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");
}
