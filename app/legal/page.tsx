import { LegalDocument, legalMetadata } from "@/app/policies/_lib/document";
import { legalPage } from "@/app/policies/_lib/content";

export const metadata = legalMetadata(legalPage);

export default function LegalPage() {
  return <LegalDocument page={legalPage} />;
}