import type { Metadata } from "next";
import { DocumentClause, DocumentIntro, DocumentPageShell, DocumentSection } from "@/components/DocumentLayout";
import type { CmsDocumentBullet, CmsDocumentRecord } from "@/lib/cms/documents";
import { getCmsDocumentRecord } from "@/lib/cms/documents";

const privacyDocument = getCmsDocumentRecord("privacy");

export const metadata: Metadata = {
  title: privacyDocument.title,
  description: privacyDocument.description,
};

function bulletText(bullet: CmsDocumentBullet) {
  return typeof bullet === "string" ? bullet : bullet.text;
}

function renderDocumentSections(document: CmsDocumentRecord) {
  return document.sections.map((section, sectionIndex) => (
    <DocumentSection key={section.title} title={section.title} index={sectionIndex}>
      <div className="grid gap-3">
        {section.clauses.map((clause) => (
          <DocumentClause key={clause.heading} title={clause.heading}>
            {clause.status ? (
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#1457d9]">{clause.status}</div>
            ) : null}
            {clause.paragraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {clause.bullets ? (
              <ul className="mt-3 list-disc space-y-2 pl-5">
                {clause.bullets.map((bullet) => (
                  <li key={bulletText(bullet)}>{bulletText(bullet)}</li>
                ))}
              </ul>
            ) : null}
          </DocumentClause>
        ))}
      </div>
    </DocumentSection>
  ));
}

export default function PrivacyPage() {
  return (
    <DocumentPageShell
      eyebrow={privacyDocument.eyebrow}
      title={privacyDocument.title}
      description={privacyDocument.description}
      meta={[
        { label: "Version", value: privacyDocument.version },
        { label: "Effective", value: privacyDocument.effectiveDate },
        { label: "Updated", value: privacyDocument.updatedAt },
      ]}
    >
      <DocumentIntro>
        {privacyDocument.introParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </DocumentIntro>

      {renderDocumentSections(privacyDocument)}

      {privacyDocument.finalNote ? (
        <p className="rounded border border-slate-200 bg-white/88 p-4 text-xs leading-6 text-slate-600">
          {privacyDocument.finalNote}
        </p>
      ) : null}
    </DocumentPageShell>
  );
}
