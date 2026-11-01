import { LegalDocument, legalMetadata } from "@/app/policies/_lib/document";
import { termsPage } from "@/app/policies/_lib/content";

export const metadata = legalMetadata(termsPage);

export default function TermsPage() {
  return <LegalDocument page={termsPage} />;
}
