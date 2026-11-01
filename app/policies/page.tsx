import { LegalDocument, legalMetadata } from "@/app/policies/_lib/document";
import { policiesPage } from "@/app/policies/_lib/content";

export const metadata = legalMetadata(policiesPage);

export default function PoliciesPage() {
  return <LegalDocument page={policiesPage} />;
}
