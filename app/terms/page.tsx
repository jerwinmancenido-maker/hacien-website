import type { Metadata } from "next";
import { DocumentClause, DocumentIntro, DocumentPageShell, DocumentSection } from "@/components/DocumentLayout";
import type { CmsDocumentBullet, CmsDocumentRecord } from "@/lib/cms/documents";
import { getCmsDocumentRecord } from "@/lib/cms/documents";

const termsDocument = getCmsDocumentRecord("terms");

export const metadata: Metadata = {
  title: termsDocument.title,
  description: termsDocument.description,
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
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#2563EB]">{clause.status}</div>
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

export default function TermsPage() {
  return (
    <DocumentPageShell
      eyebrow={termsDocument.eyebrow}
      title={termsDocument.title}
      description={termsDocument.description}
      meta={[
        { label: "Version", value: termsDocument.version },
        { label: "Effective", value: termsDocument.effectiveDate },
        { label: "Updated", value: termsDocument.updatedAt },
      ]}
    >
      <DocumentIntro>
        {termsDocument.introParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </DocumentIntro>

      {renderDocumentSections(termsDocument)}

      {termsDocument.finalNote ? (
        <p className="rounded border border-slate-200 bg-white/88 p-4 text-xs leading-6 text-slate-600">
          {termsDocument.finalNote}
        </p>
      ) : null}
    </DocumentPageShell>
  );
}
