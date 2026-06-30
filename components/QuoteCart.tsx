"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useQuoteCart } from "@/components/QuoteCartProvider";
import { AnimatedCard, StaggerContainer } from "@/components/motion";
import { sendInquiryEmail } from "@/app/actions/send-inquiry";
import { TurnstileField } from "@/components/TurnstileField";

const allowedAttachmentTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
  "image/png",
  "image/jpeg",
  "application/zip",
  "application/x-zip-compressed",
];

const maxAttachmentSize = 10 * 1024 * 1024;

const allowedAttachmentExtensions = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".csv", ".png", ".jpg", ".jpeg", ".zip"];

const intakePaths = [
  "Describe requirements",
  "Upload BOQ",
  "Upload government specifications",
  "Upload existing supplier quote",
  "Upload file / image / ZIP",
  "Use RFQ cart",
];

export function QuoteCart({ turnstileSiteKey }: { turnstileSiteKey: string }) {
  const { items, updateQuantity, removeItem, clearCart } = useQuoteCart();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [fileError, setFileError] = useState("");
  const [attachmentInfo, setAttachmentInfo] = useState("");
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const startedAtInputRef = useRef<HTMLInputElement>(null);
  const formStartedAtRef = useRef<number | null>(null);

  function markFormStarted() {
    if (formStartedAtRef.current) return;
    const startedAt = Date.now();
    formStartedAtRef.current = startedAt;
    if (startedAtInputRef.current) startedAtInputRef.current.value = String(startedAt);
  }

  function resetFormTiming() {
    formStartedAtRef.current = null;
    if (startedAtInputRef.current) startedAtInputRef.current.value = "";
  }

  function isAllowedAttachment(file: File) {
    const lowerName = file.name.toLowerCase();
    return allowedAttachmentTypes.includes(file.type) || allowedAttachmentExtensions.some((extension) => lowerName.endsWith(extension));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    markFormStarted();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot check
    const honeypot = data.get("_website") as string;
    if (honeypot) return;

    const itemLines = items.map((item) => `${item.product.id} — ${item.product.name} x${item.quantity}`);
    const file = data.get("attachment") as File | null;
    const notes = String(data.get("notes") || "").trim();
    const submittedAttachmentInfo =
      file && file.size > 0
        ? `${file.name} (${Math.round(file.size / 1024)} KB, ${file.type || "unknown type"}) — uploaded through RFQ form`
        : "No attachment selected";
    const hasAttachment = Boolean(file && file.size > 0);
    const hasCartItems = items.length > 0;

    if (!hasCartItems && !notes && !hasAttachment) {
      setStatus("error");
      setErrorMessage("Describe the requirement, add a file, or select catalog items before submitting.");
      setTurnstileResetSignal((value) => value + 1);
      resetFormTiming();
      return;
    }

    const payload: Record<string, unknown> = {
      type: "Universal RFQ Gateway Submission",
      website: data.get("_website"),
      formStartedAt: data.get("formStartedAt"),
      turnstileToken: data.get("cf-turnstile-response"),
      name: data.get("name"),
      company: data.get("company"),
      email: data.get("email"),
      phone: data.get("phone"),
      intakePath: data.get("intakePath"),
      procurementType: data.get("procurementType"),
      location: data.get("location"),
      targetDate: data.get("targetDate"),
      budgetRange: data.get("budgetRange"),
      notes,
      items: itemLines.join("\n"),
      cartItemCount: items.length,
      attachmentInfo: submittedAttachmentInfo,
      attachmentName: hasAttachment ? file?.name : "",
      attachmentType: hasAttachment ? file?.type : "",
      attachmentSizeKb: hasAttachment ? Math.round((file?.size || 0) / 1024) : 0,
      acceptsZeroCatalogProducts: true,
      procurementNote:
        "HACIEN accepts RFQs with or without catalog products. Gateway review comes before Opportunity creation.",
      submittedAt: new Date().toISOString(),
    };

    setStatus("sending");
    const result = await sendInquiryEmail(payload);

    if (result.success) {
      setReferenceNumber(result.referenceNumber || "");
      setStatus("success");
      clearCart();
      setTurnstileResetSignal((value) => value + 1);
      resetFormTiming();
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Unable to send. Please try again later.");
      setTurnstileResetSignal((value) => value + 1);
      resetFormTiming();
    }
  }

  if (status === "success") {
    return (
      <div className="surface motion-slide-up mx-auto max-w-3xl rounded-lg p-8 text-center">
        <div className="text-sm font-bold uppercase tracking-[0.18em] text-[#1457d9]">
          RFQ request received
        </div>
        <h1 className="mt-4 text-3xl font-bold text-slate-950">
          Thank you. HACIEN will review your request.
        </h1>
        <p className="mt-4 text-slate-600">
          HACIEN will review availability, equivalent options, warranty, delivery terms, and supplier quotation context before preparing a formal response.
        </p>
        {referenceNumber ? (
          <div className="mx-auto mt-6 max-w-sm rounded border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            Reference: <span className="font-bold">{referenceNumber}</span>
            <Link href={`/track/${referenceNumber}`} className="ml-3 font-bold text-[#1457d9] hover:underline">
              Track request
            </Link>
          </div>
        ) : null}
        <Link
          href="/products"
          className="mt-6 inline-flex rounded bg-[#1457d9] px-5 py-3 text-sm font-bold text-white"
        >
          Continue browsing
        </Link>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="surface motion-slide-up mx-auto max-w-3xl rounded-lg p-8 text-center">
        <div className="text-sm font-bold uppercase tracking-[0.18em] text-red-600">
          Unable to send
        </div>
        <h1 className="mt-4 text-2xl font-bold text-slate-950">
          Your RFQ request could not be sent.
        </h1>
        <p className="mt-4 text-slate-600">
          {errorMessage}
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 rounded border border-red-300 px-5 py-3 text-sm font-semibold text-red-700 hover:bg-red-100"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
      <div className="surface rounded-lg p-6">
        <h2 className="text-xl font-bold text-slate-950">Universal RFQ intake</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Start with a product, a BOQ, a supplier quote, a government specification, an image, a ZIP file, or a plain description. Catalog products are optional.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-5">
          {[
            "Describe or Upload",
            "Optional Catalog",
            "Gateway Reference",
            "HACIEN Reviews",
            "Opportunity if Ready",
          ].map((stepText, index) => (
            <div
              key={stepText}
              className="rounded border border-slate-200 bg-white p-3 text-sm"
            >
              <div className="grid h-8 w-8 place-items-center rounded-full bg-[#071426] text-xs font-bold text-white">
                {index + 1}
              </div>
              <div className="mt-2 font-semibold text-slate-800">{stepText}</div>
            </div>
          ))}
        </div>
        {items.length === 0 ? (
          <div className="mt-6 rounded border border-dashed border-blue-200 bg-blue-50/60 p-8 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white text-lg font-bold text-[#1457d9] shadow-sm">
              RFQ
            </div>
            <p className="mt-4 font-semibold text-slate-800">
              Your RFQ can start without catalog products.
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Describe the requirement or upload a BOQ, specification, supplier quote, image, or ZIP file. The product catalog is a convenience, not a gate.
            </p>
            <Link
              href="/products"
              className="button-glow mt-5 inline-flex rounded bg-[#071426] px-4 py-2 text-sm font-bold text-white"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <StaggerContainer className="mt-6 grid gap-4">
            {items.map((item) => (
              <AnimatedCard
                key={item.product.id}
                className="rounded border border-slate-200 bg-white p-4"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="font-bold text-slate-950">{item.product.name}</div>
                    <div className="mt-1 text-sm text-slate-500">
                      {item.product.id} — For quotation. Subject to brand/model availability.
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(event) =>
                        updateQuantity(item.product.id, Number(event.target.value))
                      }
                      className="w-20 rounded border border-slate-300 px-3 py-2"
                      aria-label={`Quantity for ${item.product.name}`}
                    />
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="rounded border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-red-300 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </AnimatedCard>
            ))}
            <div className="rounded bg-slate-950 p-5 text-white">
              <div className="text-sm text-slate-300">RFQ pricing note</div>
              <div className="mt-1 text-lg font-bold">Final pricing will be confirmed through formal quotation.</div>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Equivalent models may be recommended based on stock, warranty, and specification requirements.
              </p>
            </div>
          </StaggerContainer>
        )}
      </div>

      <form
        ref={formRef}
        onFocusCapture={markFormStarted}
        onChangeCapture={markFormStarted}
        onSubmit={handleSubmit}
        className="surface rounded-lg p-6"
      >
        <h2 className="text-xl font-bold text-slate-950">Request a formal quotation review</h2>
        <p className="mt-2 text-sm text-slate-600">
          No online payment will be collected. Every request enters the Gateway first, receives a reference number, and is reviewed before it becomes an Opportunity.
        </p>

        {/* Honeypot */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label>
            Website
            <input type="text" name="_website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <input ref={startedAtInputRef} type="hidden" name="formStartedAt" />

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Intake path
            <select required name="intakePath" className="rounded border border-slate-300 px-3 py-2 font-normal" defaultValue="">
              <option value="" disabled>Select how this RFQ is starting</option>
              {intakePaths.map((path) => (
                <option key={path}>{path}</option>
              ))}
            </select>
          </label>
          {[
            ["name", "Contact name", "text"],
            ["company", "Company / agency", "text"],
            ["email", "Email", "email"],
            ["phone", "Phone", "tel"],
            ["location", "Delivery location", "text"],
            ["targetDate", "Target date / deadline", "date"],
          ].map(([key, label, type]) => (
            <label key={key} className="grid gap-2 text-sm font-semibold text-slate-700">
              {label}
              <input
                required
                type={type}
                name={key}
                autoComplete={
                  key === "name"
                    ? "name"
                    : key === "company"
                      ? "organization"
                      : key === "email"
                        ? "email"
                        : key === "phone"
                          ? "tel"
                          : undefined
                }
                className="rounded border border-slate-300 px-3 py-2 font-normal"
              />
            </label>
          ))}
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Procurement type
            <select required name="procurementType" className="rounded border border-slate-300 px-3 py-2 font-normal" defaultValue="">
              <option value="" disabled>Select procurement type</option>
              <option>Corporate</option>
              <option>Government</option>
              <option>Education</option>
              <option>Project-based</option>
              <option>Reseller / integrator</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Budget range <span className="font-normal text-slate-500">(optional)</span>
            <select name="budgetRange" className="rounded border border-slate-300 px-3 py-2 font-normal" defaultValue="">
              <option value="">Not specified</option>
              <option>Under PHP 50,000</option>
              <option>PHP 50,000 - PHP 250,000</option>
              <option>PHP 250,000 - PHP 1,000,000</option>
              <option>Project budget to be discussed</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Requirement details <span className="font-normal text-slate-500">(required unless a file or cart item is included)</span>
            <textarea
              name="notes"
              rows={5}
              aria-label="Notes or specifications"
              placeholder="Describe the product, outcome, quantity, model, equivalent options, delivery location, deadline, BOQ context, or anything HACIEN should review."
              className="rounded border border-slate-300 px-3 py-2 font-normal"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Attachment <span className="font-normal text-slate-500">(BOQ, government specs, supplier quote, PDF, Excel, image, or ZIP)</span>
            <input
              name="attachment"
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.png,.jpg,.jpeg,.zip"
              className="rounded border border-dashed border-slate-300 bg-slate-50 px-3 py-3 text-sm font-normal"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                setFileError("");
                setAttachmentInfo("");
                if (!file) return;
                if (!isAllowedAttachment(file)) {
                  setFileError("Unsupported file type. Please use PDF, DOC, DOCX, XLS, XLSX, CSV, PNG, JPG, or ZIP.");
                  event.currentTarget.value = "";
                  return;
                }
                if (file.size > maxAttachmentSize) {
                  setFileError("File is too large. Maximum file size is 10MB.");
                  event.currentTarget.value = "";
                  return;
                }
                setAttachmentInfo(`${file.name} selected (${Math.round(file.size / 1024)} KB).`);
              }}
            />
          </label>
          {fileError ? <p className="text-sm font-semibold text-red-600">{fileError}</p> : null}
          {attachmentInfo ? <p className="text-sm font-semibold text-emerald-700">{attachmentInfo}</p> : null}
          <p className="rounded border border-blue-100 bg-blue-50 p-3 text-xs leading-5 text-slate-600">
            Attachment metadata will enter the Gateway with the request. Accepted files: PDF, DOC, DOCX, XLS, XLSX, CSV, PNG, JPG, ZIP. Maximum size: 10MB.
          </p>

          <p className="text-xs text-slate-500">
            By submitting, you agree to our{" "}
            <Link href="/privacy" className="font-semibold text-[#1457d9] hover:underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="font-semibold text-[#1457d9] hover:underline">
              Terms of Use
            </Link>.
          </p>

          <TurnstileField siteKey={turnstileSiteKey} resetSignal={turnstileResetSignal} />

          <button
            type="submit"
            disabled={status === "sending" || Boolean(fileError)}
            className="button-glow rounded bg-[#1457d9] px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {status === "sending" ? "Sending..." : "Submit RFQ"}
          </button>
        </div>
      </form>
    </div>
  );
}
