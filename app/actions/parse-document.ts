"use server";

const allowedTypes = new Set(["application/pdf", "image/png", "image/jpeg", "text/plain"]);
const maxFileSize = 10 * 1024 * 1024;
const tooLargeMessage = "Document is too large. Maximum supported size is 10 MB.";

export type ParsedDocumentResult =
  | {
      success: true;
      fileName: string;
      confidence: number;
      extractedFields: {
        documentType: string;
        likelyBuyerContext: string;
        lineItemSignal: string;
        reviewStatus: string;
      };
      warnings: string[];
    }
  | {
      success: false;
      message: string;
    };

export async function parseDocument(formData: FormData): Promise<ParsedDocumentResult> {
  const file = formData.get("document");

  if (!(file instanceof File) || file.size === 0) {
    return { success: false, message: "Attach a PDF, image, or text file before scanning." };
  }

  const lowerName = file.name.toLowerCase();
  const extensionAllowed = [".pdf", ".png", ".jpg", ".jpeg", ".txt"].some((extension) => lowerName.endsWith(extension));

  if (!allowedTypes.has(file.type) && !extensionAllowed) {
    return { success: false, message: "Unsupported document type. Use PDF, PNG, JPG, JPEG, or TXT." };
  }

  if (file.size > maxFileSize) {
    return { success: false, message: tooLargeMessage };
  }

  const fileName = file.name || "uploaded-document";
  const lower = fileName.toLowerCase();
  const documentType = lower.includes("po")
    ? "Purchase order candidate"
    : lower.includes("boq")
      ? "BOQ candidate"
      : lower.includes("quote")
        ? "Supplier quote candidate"
        : "Specification or attachment candidate";

  return {
    success: true,
    fileName,
    confidence: lower.endsWith(".txt") ? 0.66 : 0.74,
    extractedFields: {
      documentType,
      likelyBuyerContext: "Requires manual review before Gateway or ERP use",
      lineItemSignal: "Possible product, quantity, and delivery fields detected",
      reviewStatus: "Prototype extraction only",
    },
    warnings: [
      "This check does not create an RFQ, order, invoice, receipt, or payment record.",
      "Extracted values must be reviewed by HACIEN before use in business records.",
    ],
  };
}
