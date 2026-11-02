"use client";

import { useId, useRef, useState, useTransition } from "react";
import { parseDocument, type ParsedDocumentResult } from "@/app/actions/parse-document";

const tooLargeMessage = "Document is too large. Maximum supported playground size is 10 MB.";

export function documentScanErrorMessage(error: unknown) {
  const text = error instanceof Error ? error.message : "";
  if (text.includes("Body exceeded")) return tooLargeMessage;
  return "The document could not be checked. Please try again.";
}

export function AiDocumentParser() {
  const [result, setResult] = useState<ParsedDocumentResult | null>(null);
  const [fileName, setFileName] = useState("");
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      try {
        const nextResult = await parseDocument(formData);
        setResult(nextResult);
      } catch (error) {
        setResult({ success: false, message: documentScanErrorMessage(error) });
      }
    });
  }

  const fileInputId = useId();

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-950/8">
      <div className="relative bg-[#0A0A0A] p-6 text-white">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-grey-700 via-grey-400 to-grey-200" />
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-grey-400">AI Document Parser Playground</div>
        <h2 className="mt-3 text-2xl font-bold">Scan an RFQ attachment safely</h2>
        <p className="mt-2 text-sm leading-6 text-grey-300">
          Prototype extraction only. Files are checked for format and size, then summarized for manual review.
        </p>
      </div>
      <form ref={formRef} onSubmit={handleSubmit} className="grid gap-5 p-6">
        <label htmlFor={fileInputId} className="grid min-h-[180px] cursor-pointer place-items-center rounded-lg border border-dashed border-grey-300 bg-grey-50 p-6 text-center">
          <span>
            <span className="block text-sm font-bold text-slate-950">{fileName || "Drop or choose a PDF, image, or TXT file"}</span>
            <span className="mt-2 block text-xs leading-5 text-slate-600">Maximum playground size: 10 MB. No official record is created.</span>
          </span>
          <input
            id={fileInputId}
            type="file"
            name="document"
            accept=".pdf,.png,.jpg,.jpeg,.txt"
            className="sr-only"
            onChange={(event) => setFileName(event.currentTarget.files?.[0]?.name || "")}
          />
        </label>
        <button
          type="submit"
          disabled={isPending}
          className="button-glow rounded bg-[#2563EB] px-5 py-3 text-sm font-bold text-white disabled:bg-slate-300 cursor-pointer"
        >
          {isPending ? "Scanning..." : "Run prototype scan"}
        </button>
      </form>
      {result ? (
        <div className="border-t border-slate-200 bg-slate-50 p-6">
          {result.success ? (
            <div>
              <div className="text-sm font-bold text-slate-950">Prototype result for {result.fileName}</div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {Object.entries(result.extractedFields).map(([key, value]) => (
                  <div key={key} className="rounded border border-slate-200 bg-white p-3">
                    <div className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{key}</div>
                    <div className="mt-1 text-sm font-semibold text-slate-800">{value}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm font-semibold text-ink">Confidence: {Math.round(result.confidence * 100)}%</div>
              <ul className="mt-3 grid gap-2 text-xs leading-5 text-slate-600">
                {result.warnings.map((warning) => (
                  <li key={warning}>- {warning}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm font-semibold text-red-700">{result.message}</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
