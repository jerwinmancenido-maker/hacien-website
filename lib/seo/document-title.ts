/** Matches `app/layout.tsx` metadata.title.template */
export const DOCUMENT_TITLE_TEMPLATE = "%s | HACIEN";

/** Matches `app/layout.tsx` metadata.title.default */
export const DOCUMENT_TITLE_DEFAULT = "HACIEN Information Technology Solutions";

export function renderDocumentTitle(segment: string): string {
  return DOCUMENT_TITLE_TEMPLATE.replace("%s", segment);
}

export function countHacienMentions(title: string): number {
  return (title.match(/HACIEN/g) ?? []).length;
}
