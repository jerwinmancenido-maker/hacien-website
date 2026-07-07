"use client";

import { useRef, useState } from "react";
import { parseDepositSlip, type ParsedDepositSlip } from "@/app/actions/parse-deposit-slip";

type UploadStatus = "idle" | "uploading" | "scanning" | "ready" | "manual-review" | "error";

export function DepositSlipUpload({
  orderId,
  totalAmount,
  onComplete,
}: {
  orderId: string;
  totalAmount: number;
  onComplete?: (data: ParsedDepositSlip & { isManualOverride: boolean }) => void;
}) {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [bankName, setBankName] = useState("");
  const [transactionRef, setTransactionRef] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [confidenceScore, setConfidenceScore] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const allowedExtensions = [".pdf", ".png", ".jpg", ".jpeg"];

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) await processUpload(file);
  }

  async function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) await processUpload(file);
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  async function processUpload(file: File) {
    const lowerName = file.name.toLowerCase();
    const isAllowed = allowedExtensions.some((ext) => lowerName.endsWith(ext));
    if (!isAllowed) {
      setStatus("error");
      setErrorMessage("Unsupported file type. Use PDF, PNG, or JPEG for prototype review.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setStatus("error");
      setErrorMessage("File is too large. Maximum file size is 10MB.");
      return;
    }

    setFileName(file.name);
    setStatus("uploading");
    setProgress(0);
    setFileUrl(file.type.startsWith("image/") ? URL.createObjectURL(file) : null);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 25;
      });
    }, 150);

    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus("scanning");

    const formData = new FormData();
    formData.append("file", file);

    const result = await parseDepositSlip(formData);
    if (!result.success || !result.data) {
      setStatus("error");
      setErrorMessage(result.error || "Failed to process prototype document.");
      return;
    }

    const { data } = result;
    setBankName(data.bankName);
    setTransactionRef(data.transactionRef);
    setPaymentDate(data.paymentDate);
    setAmount(data.amount || totalAmount);
    setConfidenceScore(data.confidenceScore);
    setStatus(data.confidenceScore < 0.7 ? "manual-review" : "ready");
  }

  function handleSubmitManual(event: React.FormEvent) {
    event.preventDefault();
    if (!bankName || !paymentDate) {
      setErrorMessage("Fill in the prototype review fields before recording the sample metadata.");
      return;
    }

    onComplete?.({
      bankName,
      transactionRef,
      paymentDate,
      amount,
      confidenceScore,
      isManualOverride: status === "manual-review",
    });
    setStatus("ready");
  }

  function resetUpload() {
    setStatus("idle");
    setErrorMessage("");
    setFileName("");
    setFileUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div className="surface rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900">Internal transfer document prototype</h3>
      <p className="mt-1 text-sm text-slate-500">
        This disabled prototype tests document upload and metadata review for request {orderId} only.
        It does not publish payment instructions, collect funds, confirm orders, or create official records.
      </p>

      <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        Do not transfer money based on this interface. Payment instructions must come from approved
        transaction-specific communication outside this prototype.
      </div>

      <div className="mt-6 border-t border-slate-100 pt-6">
        {status === "idle" && (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
            className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-4 py-10 transition-all hover:border-[#1457d9] hover:bg-slate-50"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="application/pdf,image/png,image/jpeg"
              className="hidden"
            />
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-[#1457d9]">
              <span className="text-xl font-bold">+</span>
            </div>
            <p className="mt-4 text-sm font-bold text-slate-700">Upload a sample document</p>
            <p className="mt-1 text-xs text-slate-500">PDF, PNG, JPG (max 10MB)</p>
          </div>
        )}

        {(status === "uploading" || status === "scanning") && (
          <div className="relative flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-slate-50/50 p-6">
            {fileUrl ? (
              <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-lg border border-slate-200 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={fileUrl} alt="Prototype document preview" className="h-full w-full object-cover opacity-60" />
              </div>
            ) : null}
            <div className="text-sm font-bold text-slate-700">
              {status === "uploading" ? `Uploading ${fileName}...` : "Reading sample metadata..."}
            </div>
            <div className="mt-3 h-2 w-full max-w-xs overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full bg-[#1457d9] transition-all duration-300"
                style={{ width: `${status === "uploading" ? progress : 100}%` }}
              />
            </div>
          </div>
        )}

        {status === "manual-review" && (
          <form onSubmit={handleSubmitManual} className="space-y-4">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <div className="text-sm font-bold text-amber-800">Manual prototype review needed</div>
              <p className="mt-1 text-xs leading-5 text-amber-700">
                The parser could not confidently read the sample document. Correct the metadata for
                interface testing only.
              </p>
            </div>

            <PrototypeFields
              bankName={bankName}
              setBankName={setBankName}
              transactionRef={transactionRef}
              setTransactionRef={setTransactionRef}
              paymentDate={paymentDate}
              setPaymentDate={setPaymentDate}
              amount={amount}
              setAmount={setAmount}
            />

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={resetUpload}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Upload different file
              </button>
              <button
                type="submit"
                className="rounded-lg bg-[#1457d9] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
              >
                Record sample metadata
              </button>
            </div>
          </form>
        )}

        {status === "ready" && (
          <div className="space-y-4">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <div className="text-sm font-bold text-emerald-800">Sample metadata ready for review</div>
              <p className="mt-1 text-xs leading-5 text-emerald-700">
                Prototype confidence score: {Math.round(confidenceScore * 100)}%. This does not
                confirm payment, order status, receipt status, or accounting treatment.
              </p>
            </div>

            <PrototypeFields
              bankName={bankName}
              setBankName={setBankName}
              transactionRef={transactionRef}
              setTransactionRef={setTransactionRef}
              paymentDate={paymentDate}
              setPaymentDate={setPaymentDate}
              amount={amount}
              setAmount={setAmount}
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={resetUpload}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Change file
              </button>
              <button
                onClick={() =>
                  onComplete?.({
                    bankName,
                    transactionRef,
                    paymentDate,
                    amount,
                    confidenceScore,
                    isManualOverride: false,
                  })
                }
                className="rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-slate-900"
              >
                Save prototype review
              </button>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4">
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <div className="text-sm font-bold text-red-800">Processing error</div>
              <p className="mt-1 text-xs text-red-700">{errorMessage}</p>
            </div>
            <button
              onClick={resetUpload}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function PrototypeFields({
  bankName,
  setBankName,
  transactionRef,
  setTransactionRef,
  paymentDate,
  setPaymentDate,
  amount,
  setAmount,
}: {
  bankName: string;
  setBankName: (value: string) => void;
  transactionRef: string;
  setTransactionRef: (value: string) => void;
  paymentDate: string;
  setPaymentDate: (value: string) => void;
  amount: number;
  setAmount: (value: number) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
        Sample source label
        <input
          type="text"
          value={bankName}
          onChange={(event) => setBankName(event.target.value)}
          className="focus-ring mt-1 min-h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm"
        />
      </label>

      <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
        Sample reference
        <input
          type="text"
          value={transactionRef}
          onChange={(event) => setTransactionRef(event.target.value)}
          className="focus-ring mt-1 min-h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm"
          placeholder="SAMPLE-REF-0001"
        />
      </label>

      <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
        Sample date
        <input
          type="date"
          value={paymentDate}
          onChange={(event) => setPaymentDate(event.target.value)}
          className="focus-ring mt-1 min-h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm"
        />
      </label>

      <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
        Sample amount
        <input
          type="number"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
          className="focus-ring mt-1 min-h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm"
        />
      </label>
    </div>
  );
}
