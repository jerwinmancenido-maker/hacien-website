import { describe, expect, it } from "vitest";

import { parseDocument } from "@/app/actions/parse-document";

const tenMb = 10 * 1024 * 1024;
const tooLargeMessage = "Document is too large. Maximum supported size is 10 MB.";

function documentFile(size: number) {
  return new File([new Uint8Array(size)], "spec.txt", { type: "text/plain" });
}

describe("10 MB upload limit", () => {
  it("accepts a help document of exactly 10 MB when the action is called directly", async () => {
    const formData = new FormData();
    formData.set("document", documentFile(tenMb));

    const result = await parseDocument(formData);

    expect(result.success).toBe(true);
  });

  it("rejects a help document just over 10 MB when the action is called directly", async () => {
    const formData = new FormData();
    formData.set("document", documentFile(tenMb + 1));

    const result = await parseDocument(formData);

    expect(result).toEqual({
      success: false,
      message: tooLargeMessage,
    });
  });

  // The quote form's client-side limit helpers left with the form itself
  // (Step B): the chat's document step is guarded by this same action,
  // whose 10 MB limit the two tests above pin at the exact boundary.
});
