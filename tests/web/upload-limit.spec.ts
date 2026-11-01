import { describe, expect, it } from "vitest";

import { parseDocument } from "@/app/actions/parse-document";
import { exceedsQuoteAttachmentLimit, maxAttachmentSize } from "@/components/QuoteCart";

const tenMb = 10 * 1024 * 1024;

function documentFile(size: number) {
  return new File([new Uint8Array(size)], "spec.txt", { type: "text/plain" });
}

describe("10 MB upload limit", () => {
  it("accepts a help document of exactly 10 MB", async () => {
    const formData = new FormData();
    formData.set("document", documentFile(tenMb));

    const result = await parseDocument(formData);

    expect(result.success).toBe(true);
  });

  it("rejects a help document just over 10 MB", async () => {
    const formData = new FormData();
    formData.set("document", documentFile(tenMb + 1));

    const result = await parseDocument(formData);

    expect(result).toEqual({
      success: false,
      message: "Document is too large. Maximum supported playground size is 10 MB.",
    });
  });

  it("accepts a quote attachment of exactly 10 MB and rejects one byte over", () => {
    expect(maxAttachmentSize).toBe(tenMb);
    expect(exceedsQuoteAttachmentLimit(tenMb)).toBe(false);
    expect(exceedsQuoteAttachmentLimit(tenMb + 1)).toBe(true);
  });
});
