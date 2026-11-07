/** AI chat document contract.
 *
 * A visitor may attach ONE document or photo to a chat turn — a BOQ,
 * an RFQ, a specification sheet, a photo of a list — and the assistant
 * reads it as a requirements document for a quotation request. The
 * file is processed in the moment by the AI provider and is never
 * stored, forwarded, or attached to the submission: only the
 * extracted item list travels, as ordinary intake text, exactly like
 * a typed requirement.
 *
 * Types mirror what the Anthropic Messages API reads natively (PDF
 * documents and images), plus plain text, which is inlined as text.
 * The size cap matches the site's existing document validation.
 */

export const MAX_AI_DOCUMENT_BYTES = 10 * 1024 * 1024;

export type AiDocumentKind = "pdf" | "image" | "text";

export type AiDocumentMedia = {
  kind: AiDocumentKind;
  /** Anthropic media type for pdf/image kinds. */
  mediaType: string;
};

const MEDIA_BY_TYPE: Record<string, AiDocumentMedia> = {
  "application/pdf": { kind: "pdf", mediaType: "application/pdf" },
  "image/png": { kind: "image", mediaType: "image/png" },
  "image/jpeg": { kind: "image", mediaType: "image/jpeg" },
  "image/webp": { kind: "image", mediaType: "image/webp" },
  "image/gif": { kind: "image", mediaType: "image/gif" },
  "text/plain": { kind: "text", mediaType: "text/plain" },
};

const MEDIA_BY_EXTENSION: Record<string, AiDocumentMedia> = {
  ".pdf": MEDIA_BY_TYPE["application/pdf"],
  ".png": MEDIA_BY_TYPE["image/png"],
  ".jpg": MEDIA_BY_TYPE["image/jpeg"],
  ".jpeg": MEDIA_BY_TYPE["image/jpeg"],
  ".webp": MEDIA_BY_TYPE["image/webp"],
  ".gif": MEDIA_BY_TYPE["image/gif"],
  ".txt": MEDIA_BY_TYPE["text/plain"],
};

export const AI_DOCUMENT_ACCEPT =
  ".pdf,.png,.jpg,.jpeg,.webp,.gif,.txt,application/pdf,image/png,image/jpeg,image/webp,image/gif,text/plain";

/** Resolve an uploaded file's type the same way the site's existing
 *  document validation does: declared type first, extension as the
 *  fallback. Returns null for anything the assistant cannot read. */
export function aiDocumentMedia(fileName: string, declaredType: string): AiDocumentMedia | null {
  const byType = MEDIA_BY_TYPE[(declaredType || "").toLowerCase()];
  if (byType) return byType;
  const lower = (fileName || "").toLowerCase();
  const dot = lower.lastIndexOf(".");
  if (dot === -1) return null;
  return MEDIA_BY_EXTENSION[lower.slice(dot)] || null;
}

export function validateAiDocument(input: {
  fileName: string;
  declaredType: string;
  size: number;
}): { ok: true; media: AiDocumentMedia } | { ok: false; message: string } {
  if (!input.size) return { ok: false, message: "The attached file is empty." };
  if (input.size > MAX_AI_DOCUMENT_BYTES) {
    return { ok: false, message: "That file is over 10 MB. Please attach a smaller copy." };
  }
  const media = aiDocumentMedia(input.fileName, input.declaredType);
  if (!media) {
    return {
      ok: false,
      message: "I can read PDF, PNG, JPG, WebP, GIF, or plain text files. Please attach one of those.",
    };
  }
  return { ok: true, media };
}
