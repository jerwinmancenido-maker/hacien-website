"use client";

import { useState } from "react";
import Link from "next/link";

interface PrototypeReviewItem {
  id: string;
  requestId: string;
  organizationLabel: string;
  expectedAmount: number;
  parsedAmount: number;
  sourceLabel: string;
  referenceLabel: string;
  documentDate: string;
  confidenceScore: number;
  documentName: string;
  status: "REVIEW" | "NEEDS_CONTEXT" | "SAMPLE_CLOSED";
}

const sampleReviewItems: PrototypeReviewItem[] = [
  {
    id: "sample-review-001",
    requestId: "SAMPLE-RFQ-0003",
    organizationLabel: "Sample enterprise account",
    expectedAmount: 1250000,
    parsedAmount: 1250000,
    sourceLabel: "Sample bank source",
    referenceLabel: "SAMPLE-REF-0001",
    documentDate: "2026-07-07",
    confidenceScore: 0.88,
    documentName: "sample-transfer-document.png",
    status: "REVIEW",
  },
  {
    id: "sample-review-002",
    requestId: "SAMPLE-RFQ-0002",
    organizationLabel: "Sample institutional account",
    expectedAmount: 450000,
    parsedAmount: 45000,
    sourceLabel: "Sample bank source",
    referenceLabel: "",
    documentDate: "2026-07-06",
    confidenceScore: 0.48,
    documentName: "sample-low-confidence-document.jpg",
    status: "NEEDS_CONTEXT",
  },
];

export default function PrototypeDocumentReviewDashboard() {
  const [items, setItems] = useState<PrototypeReviewItem[]>(sampleReviewItems);
  const initialItem = sampleReviewItems[0];
  const [selectedId, setSelectedId] = useState<string>(initialItem?.id || "");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [reviewNote, setReviewNote] = useState("");
  const [editSource, setEditSource] = useState(initialItem?.sourceLabel || "");
  const [editAmount, setEditAmount] = useState(initialItem?.parsedAmount || 0);
  const [editRef, setEditRef] = useState(initialItem?.referenceLabel || "");
  const [editDate, setEditDate] = useState(initialItem?.documentDate || "");

  const selectedItem = items.find((item) => item.id === selectedId);

  function handleSelectItem(id: string) {
    setSelectedId(id);
    const item = items.find((candidate) => candidate.id === id);
    if (!item) return;
    setEditSource(item.sourceLabel);
    setEditAmount(item.parsedAmount);
    setEditRef(item.referenceLabel);
    setEditDate(item.documentDate);
    setReviewNote("");
  }

  function handleMarkReviewed() {
    setItems((prev) =>
      prev.map((item) =>
        item.id === selectedId ? { ...item, status: "SAMPLE_CLOSED" } : item,
      ),
    );
    setReviewNote("Sample metadata was marked reviewed locally. No payment, order, receipt, invoice, or accounting record was created.");
  }

  function handleNeedsContext() {
    setItems((prev) =>
      prev.map((item) =>
        item.id === selectedId ? { ...item, status: "NEEDS_CONTEXT" } : item,
      ),
    );
    setReviewNote("Sample metadata was flagged for more context. No customer notification was sent.");
  }

  return (
    <div className="min-h-screen bg-[#08080C] text-white">
      <header className="flex items-center justify-between border-b border-slate-800 bg-[#08080C] px-6 py-4">
        <div className="flex items-center gap-4">
          <Link href="/access" className="flex items-center gap-1 text-sm text-slate-400 hover:text-white">
            Back
          </Link>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Internal Document Review Prototype</h1>
            <p className="mt-1 text-xs text-slate-500">
              Disabled sample console. Not connected to payment collection, production records, or customer notifications.
            </p>
          </div>
        </div>
        <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300">
          Prototype only
        </span>
      </header>

      <div className="grid min-h-[calc(100vh-76px)] lg:grid-cols-[320px_1fr]">
        <aside className="space-y-4 border-r border-slate-800 bg-[#08080C] p-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Sample review queue ({items.filter((item) => item.status !== "SAMPLE_CLOSED").length})
          </h2>

          <div className="space-y-2">
            {items.map((item) => {
              const isSelected = item.id === selectedId;
              const isLowConfidence = item.confidenceScore < 0.7;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectItem(item.id)}
                  className={`w-full rounded-xl border p-3 text-left transition-all ${
                    isSelected
                      ? "border-[#00F2FE] bg-[#00F2FE]/5"
                      : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-sm font-bold text-white">{item.requestId}</span>
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                        item.status === "SAMPLE_CLOSED"
                          ? "border border-slate-500/20 bg-slate-500/10 text-slate-300"
                          : isLowConfidence
                            ? "border border-amber-500/20 bg-amber-500/10 text-amber-400"
                            : "border border-blue-500/20 bg-blue-500/10 text-blue-400"
                      }`}
                    >
                      {item.status === "REVIEW" && !isLowConfidence ? "SAMPLE READY" : item.status}
                    </span>
                  </div>
                  <div className="mt-1 truncate text-xs text-slate-400">{item.organizationLabel}</div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-200">
                      PHP {item.expectedAmount.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-500">{item.documentDate}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {selectedItem ? (
          <main className="grid md:grid-cols-2">
            <section className="flex h-full flex-col border-r border-slate-800 bg-[#08080C] p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Sample document: {selectedItem.documentName}
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoomLevel((prev) => Math.max(0.5, prev - 0.2))}
                    className="rounded border border-slate-800 bg-slate-900 p-1 text-xs hover:bg-slate-800"
                  >
                    Zoom Out
                  </button>
                  <span className="text-xs text-slate-400">{Math.round(zoomLevel * 100)}%</span>
                  <button
                    onClick={() => setZoomLevel((prev) => Math.min(2, prev + 0.2))}
                    className="rounded border border-slate-800 bg-slate-900 p-1 text-xs hover:bg-slate-800"
                  >
                    Zoom In
                  </button>
                </div>
              </div>

              <div className="relative flex min-h-[350px] flex-1 items-center justify-center overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
                <div className="p-4 transition-transform duration-200" style={{ transform: `scale(${zoomLevel})` }}>
                  <div className="w-[300px] space-y-4 rounded-xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md">
                    <div className="border-b border-white/10 pb-4">
                      <div className="text-xs font-bold uppercase tracking-widest text-[#00F2FE]">
                        Sample transfer document
                      </div>
                      <div className="mt-0.5 text-[10px] text-slate-400">
                        Interface placeholder. Not a receipt or proof of collection.
                      </div>
                    </div>
                    <div className="space-y-3">
                      <PrototypeDetail label="Source" value={selectedItem.sourceLabel} />
                      <PrototypeDetail
                        label="Sample amount"
                        value={`PHP ${selectedItem.expectedAmount.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}`}
                      />
                      <PrototypeDetail label="Reference" value={selectedItem.referenceLabel || "Unreadable"} />
                      <PrototypeDetail label="Date" value={selectedItem.documentDate} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="flex flex-col justify-between bg-[#08080C] p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Prototype metadata comparison
                  </h3>
                  <div className="mt-2 flex items-center gap-4">
                    <span className="text-2xl font-bold tracking-tight">{selectedItem.requestId}</span>
                    <span className="text-slate-500">/</span>
                    <span className="text-sm text-slate-300">{selectedItem.organizationLabel}</span>
                  </div>
                </div>

                {selectedItem.confidenceScore < 0.7 ? (
                  <div className="space-y-1 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                    <span className="text-sm font-bold text-amber-400">
                      Manual prototype review needed ({Math.round(selectedItem.confidenceScore * 100)}%)
                    </span>
                    <p className="text-xs leading-relaxed text-slate-400">
                      The sample parser did not read every field confidently. Correct metadata for interface testing only.
                    </p>
                  </div>
                ) : null}

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <PrototypeInput label="Expected amount" value={`PHP ${selectedItem.expectedAmount.toLocaleString()}`} readOnly />
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                      Parsed sample amount
                      <input
                        type="number"
                        value={editAmount}
                        onChange={(event) => setEditAmount(Number(event.target.value))}
                        className="focus-ring mt-2 min-h-[44px] w-full rounded-lg border border-slate-800 bg-slate-900/40 px-3 text-sm text-slate-300"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                      Source label
                      <input
                        type="text"
                        value={editSource}
                        onChange={(event) => setEditSource(event.target.value)}
                        className="focus-ring mt-2 min-h-[44px] w-full rounded-lg border border-slate-800 bg-slate-900/40 px-3 text-sm text-slate-300"
                      />
                    </label>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                      Sample date
                      <input
                        type="text"
                        value={editDate}
                        onChange={(event) => setEditDate(event.target.value)}
                        className="focus-ring mt-2 min-h-[44px] w-full rounded-lg border border-slate-800 bg-slate-900/40 px-3 text-sm text-slate-300"
                      />
                    </label>
                  </div>

                  <label className="block border-t border-slate-800 pt-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Sample reference
                    <input
                      type="text"
                      value={editRef}
                      onChange={(event) => setEditRef(event.target.value)}
                      className="focus-ring mt-2 min-h-[44px] w-full rounded-lg border border-slate-800 bg-slate-900/40 px-3 text-sm text-slate-300"
                      placeholder="SAMPLE-REF-0001"
                    />
                    <span className="mt-1 block text-[10px] text-slate-500">
                      Review-only metadata. This does not confirm payment, collection, receipt, invoice, or tax status.
                    </span>
                  </label>
                </div>

                {reviewNote ? (
                  <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 text-xs text-blue-200">
                    {reviewNote}
                  </div>
                ) : null}
              </div>

              <div className="mt-6 flex gap-4 border-t border-slate-800 pt-6">
                <button
                  type="button"
                  onClick={handleNeedsContext}
                  className="flex-1 rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-3 text-sm font-bold text-amber-300 hover:bg-amber-500/10"
                >
                  Flag More Context
                </button>
                <button
                  type="button"
                  onClick={handleMarkReviewed}
                  className="flex-1 rounded-xl bg-slate-700 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-600"
                >
                  Mark Sample Reviewed
                </button>
              </div>
            </section>
          </main>
        ) : (
          <div className="flex items-center justify-center text-slate-500">
            Select a sample document from the queue to review prototype metadata.
          </div>
        )}
      </div>
    </div>
  );
}

function PrototypeDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-mono uppercase text-slate-500">{label}:</div>
      <div className="text-xs font-bold">{value}</div>
    </div>
  );
}

function PrototypeInput({
  label,
  value,
  readOnly = false,
}: {
  label: string;
  value: string;
  readOnly?: boolean;
}) {
  return (
    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
      {label}
      <input
        type="text"
        value={value}
        readOnly={readOnly}
        className="mt-2 min-h-[44px] w-full rounded-lg border border-slate-800 bg-slate-900/20 px-3 text-sm font-bold text-slate-300"
      />
    </label>
  );
}
