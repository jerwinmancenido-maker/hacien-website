import { LegalDocument, legalMetadata } from "@/app/policies/_lib/document";
import { warrantyPage } from "@/app/policies/_lib/content";

export const metadata = legalMetadata(warrantyPage);

export default function WarrantyPage() {
  return <LegalDocument page={warrantyPage} />;
}
