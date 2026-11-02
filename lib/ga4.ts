export const GA4_ID_REGEX = /^G-[A-Z0-9]+$/;

export function isValidGaId(id: string | undefined | null): id is string {
  if (typeof id !== "string") return false;
  return GA4_ID_REGEX.test(id.trim());
}
