export const contactInquiryTypes = [
  "Request a quote",
  "Supplier partnership",
  "Institutional procurement",
  "Systems integration project",
  "Privacy request",
] as const;

export function isContactInquiryType(value: string) {
  return (contactInquiryTypes as readonly string[]).includes(value);
}
