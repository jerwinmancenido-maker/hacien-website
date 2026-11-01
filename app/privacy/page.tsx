import { LegalDocument, legalMetadata } from "@/app/policies/_lib/document";
import { privacyPage } from "@/app/policies/_lib/content";

export const metadata = legalMetadata(privacyPage);

export default function PrivacyPage() {
  return <LegalDocument page={privacyPage} />;
}
