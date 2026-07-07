"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useQuoteCart } from "@/components/QuoteCartProvider";
import { AnimatedCard, StaggerContainer } from "@/components/motion";
import { sendInquiryEmail } from "@/app/actions/send-inquiry";
import { TurnstileField } from "@/components/TurnstileField";
import billingSettings from "@/config/billing-compliance-settings.json";

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
  "Upload formal specifications",
  "Upload existing supplier quote",
  "Upload file / image / ZIP",
  "Reference a technology area",
];

export function QuoteCart({ turnstileSiteKey }: { turnstileSiteKey: string }) {
  const { requirements, removeRequirement, clearRequirements } = useQuoteCart();
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

    const requirementLines = requirements.map((requirement, index) => {
      const fieldLines = Object.entries(requirement.fields)
        .filter(([, value]) => value)
        .map(([key, value]) => `  - ${key}: ${value}`);

      return [
        `${index + 1}. ${requirement.categoryLabel} — quantity/scope: ${requirement.quantity}`,
        `  - Preferred brand/vendor: ${requirement.brandPreference}${requirement.otherBrand ? ` (${requirement.otherBrand})` : ""}`,
        `  - Equivalent options: ${requirement.equivalentAccepted}`,
        requirement.deadline ? `  - Deadline: ${requirement.deadline}` : "",
        requirement.deliveryLocation ? `  - Delivery location: ${requirement.deliveryLocation}` : "",
        ...fieldLines,
        requirement.notes ? `  - Notes: ${requirement.notes}` : "",
      ]
        .filter(Boolean)
        .join("\n");
    });
    const file = data.get("attachment") as File | null;
    const notes = String(data.get("notes") || "").trim();
    const submittedAttachmentInfo =
      file && file.size > 0
        ? `${file.name} (${Math.round(file.size / 1024)} KB, ${file.type || "unknown type"}) — uploaded through RFQ form`
        : "No attachment selected";
    const hasAttachment = Boolean(file && file.size > 0);
    const hasRequirements = requirements.length > 0;

    if (!hasRequirements && !notes && !hasAttachment) {
      setStatus("error");
      setErrorMessage("Describe the requirement, add a requirement block, or attach a file before submitting.");
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
      requirements: requirementLines.join("\n\n"),
      requirementBlocks: requirements,
      requirementCount: requirements.length,
      attachmentInfo: submittedAttachmentInfo,
      attachmentName: hasAttachment ? file?.name : "",
      attachmentType: hasAttachment ? file?.type : "",
      attachmentSizeKb: hasAttachment ? Math.round((file?.size || 0) / 1024) : 0,
      acceptsZeroCatalogProducts: true,
      procurementNote:
        "HACIEN accepts RFQs with or without listed technology. Gateway review comes before Opportunity creation.",
      submittedAt: new Date().toISOString(),
    };

    setStatus("sending");
    const result = await sendInquiryEmail(payload);

    if (result.success) {
      setReferenceNumber(result.referenceNumber || "");
      setStatus("success");
      clearRequirements();
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
      <div className="surface min-w-0 motion-slide-up mx-auto max-w-3xl rounded-2xl p-8 text-center">
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
          href="/technology"
          className="button-glow mt-6 inline-flex rounded-full bg-[#1457d9] px-5 py-3 text-sm font-bold text-white"
        >
          Review technology areas
        </Link>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="surface min-w-0 motion-slide-up mx-auto max-w-3xl rounded-2xl p-8 text-center">
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
          className="mt-6 rounded-full border border-red-300 px-5 py-3 text-sm font-semibold text-red-700 hover:bg-red-100"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
      <div className="surface min-w-0 rounded-2xl p-6 sm:p-8">
        <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#1457d9]">Gateway Package</div>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">Universal RFQ intake</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Your RFQ can start without catalog products. Start with a requirement, BOQ, supplier quote,
          formal specification, image, ZIP file, technology area, or plain description.
        </p>
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-amber-800">
            {billingSettings.quote_validity_badge_label}
          </div>
          <p className="mt-2 text-xs leading-5 text-slate-700">{billingSettings.quote_validity_disclaimer}</p>
          <p className="mt-2 text-xs leading-5 text-slate-600">{billingSettings.compliance_disclaimer}</p>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-5">
          {[
            "Describe or Upload",
            "Optional Reference",
            "Gateway Reference",
            "HACIEN Reviews",
            "Opportunity if Ready",
          ].map((stepText, index) => (
            <div
              key={stepText}
              className="rounded-xl border border-slate-200 bg-white/80 p-3 text-sm shadow-sm"
            >
              <div className="grid h-8 w-8 place-items-center rounded-full bg-[#071426] text-xs font-bold text-white">
                {index + 1}
              </div>
              <div className="mt-2 font-semibold text-slate-800">{stepText}</div>
            </div>
          ))}
        </div>
        {requirements.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-blue-200 bg-blue-50/60 p-8 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white text-lg font-bold text-[#1457d9] shadow-sm">
              RFQ
            </div>
            <p className="mt-4 font-semibold text-slate-800">
              Your RFQ package can start with any requirement.
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Build one or more requirement blocks, describe the requirement, or upload a BOQ, specification, supplier quote, image, or ZIP file.
            </p>
            <Link
              href="/products"
              className="button-glow mt-5 inline-flex rounded-full bg-[#071426] px-5 py-3 text-sm font-bold text-white"
            >
              Build a requirement
            </Link>
          </div>
        ) : (
          <StaggerContainer className="mt-6 grid gap-4">
            {requirements.map((requirement) => (
              <AnimatedCard
                key={requirement.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="font-bold text-slate-950">{requirement.categoryLabel}</div>
                    <div className="mt-1 text-sm text-slate-500">
                      Quantity/scope: {requirement.quantity}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                      <span className="rounded-full bg-slate-100 px-3 py-1">
                        {requirement.brandPreference}
                        {requirement.otherBrand ? `: ${requirement.otherBrand}` : ""}
                      </span>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-[#1457d9]">
                        {requirement.equivalentAccepted}
                      </span>
                    </div>
                    {Object.values(requirement.fields).some(Boolean) ? (
                      <div className="mt-3 grid gap-1 text-sm text-slate-600">
                        {Object.entries(requirement.fields)
                          .filter(([, value]) => value)
                          .slice(0, 4)
                          .map(([key, value]) => (
                            <div key={key}>
                              <span className="font-semibold text-slate-800">{key}:</span> {value}
                            </div>
                          ))}
                      </div>
                    ) : null}
                    {requirement.notes ? (
                      <p className="mt-3 text-sm leading-6 text-slate-600">{requirement.notes}</p>
                    ) : null}
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                      {requirement.deadline ? <span>Deadline: {requirement.deadline}</span> : null}
                      {requirement.deliveryLocation ? <span>Delivery: {requirement.deliveryLocation}</span> : null}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => removeRequirement(requirement.id)}
                      className="rounded-full border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-red-300 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </AnimatedCard>
            ))}
            <div className="rounded-2xl bg-slate-950 p-5 text-white">
              <div className="text-sm text-slate-300">RFQ package note</div>
              <div className="mt-1 text-lg font-bold">Each block stays inside one Gateway submission.</div>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                HACIEN reviews the complete package, recommends suitable options, and clarifies details before preparing a formal quotation.
              </p>
              <Link href="/products" className="mt-4 inline-flex text-sm font-bold text-blue-200 hover:text-white">
                Add another requirement
              </Link>
            </div>
          </StaggerContainer>
        )}
      </div>

      <form
        ref={formRef}
        onFocusCapture={markFormStarted}
        onChangeCapture={markFormStarted}
        onSubmit={handleSubmit}
        className="surface min-w-0 rounded-2xl p-6 sm:p-8"
      >
        <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#1457d9]">Customer Details</div>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">Request a formal quotation review</h2>
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
            <select required name="intakePath" className="focus-ring min-h-12 rounded-xl border border-slate-300 bg-white px-4 font-normal" defaultValue="">
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
                className="focus-ring min-h-12 rounded-xl border border-slate-300 bg-white px-4 font-normal"
              />
            </label>
          ))}
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Procurement type
            <select required name="procurementType" className="focus-ring min-h-12 rounded-xl border border-slate-300 bg-white px-4 font-normal" defaultValue="">
              <option value="" disabled>Select procurement type</option>
              <option>Corporate</option>
              <option>Institutional</option>
              <option>Education</option>
              <option>Project-based</option>
              <option>Reseller / integrator</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Budget range <span className="font-normal text-slate-500">(optional)</span>
            <select name="budgetRange" className="focus-ring min-h-12 rounded-xl border border-slate-300 bg-white px-4 font-normal" defaultValue="">
              <option value="">Not specified</option>
              <option>Under PHP 50,000</option>
              <option>PHP 50,000 - PHP 250,000</option>
              <option>PHP 250,000 - PHP 1,000,000</option>
              <option>Project budget to be discussed</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Requirement details <span className="font-normal text-slate-500">(required unless a file is included)</span>
            <textarea
              name="notes"
              rows={5}
              aria-label="Notes or specifications"
              placeholder="Describe the product, outcome, quantity, model, equivalent options, delivery location, deadline, BOQ context, or anything HACIEN should review."
              className="focus-ring rounded-xl border border-slate-300 bg-white px-4 py-3 font-normal"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Attachment <span className="font-normal text-slate-500">(BOQ, formal specs, supplier quote, PDF, Excel, image, or ZIP)</span>
            <input
              name="attachment"
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.png,.jpg,.jpeg,.zip"
              className="focus-ring rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm font-normal"
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
          <p className="rounded-xl border border-blue-100 bg-blue-50 p-3 text-xs leading-5 text-slate-600">
            Attachment metadata will enter the Gateway with the request. Accepted files: PDF, DOC, DOCX, XLS, XLSX, CSV, PNG, JPG, ZIP. Maximum size: 10MB.
          </p>
          <p className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-5 text-slate-600">
            <span className="font-bold text-slate-800">{billingSettings.quote_summary_label}:</span>{" "}
            {billingSettings.review_notice}
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
            className="button-glow rounded-full bg-[#1457d9] px-6 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {status === "sending" ? "Sending..." : "Submit RFQ"}
          </button>
        </div>
      </form>
    </div>
  );
}
