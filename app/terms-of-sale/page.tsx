import { LegalDocument, legalMetadata } from "@/app/policies/_lib/document";
import { termsOfSalePage } from "@/app/policies/_lib/content";

export const metadata = legalMetadata(termsOfSalePage);

export default function TermsOfSalePage() {
  return <LegalDocument page={termsOfSalePage} />;
}
