"use client";

import { useState } from "react";
import {
  FileText,
  Truck,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  Download,
  Eye,
  ChevronRight,
  FileCheck
} from "lucide-react";
import Link from "next/link";

type TabType = "rfqs" | "orders" | "tickets" | "documents";

export function InteractivePortalPreview() {
  const [activeTab, setActiveTab] = useState<TabType>("rfqs");
  const [selectedRfq, setSelectedRfq] = useState<string>("SAMPLE-RFQ-0003");

  const rfqs = [
    {
      id: "SAMPLE-RFQ-0003",
      date: "Sample date",
      title: "IT refresh request - laptops and network equipment",
      status: "Quote Review",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      totalAmount: "Estimate pending",
      itemsCount: 3,
      items: [
        { name: "Business laptop class device", qty: 24, unitPrice: "For validation" },
        { name: "Managed network switch class", qty: 4, unitPrice: "For validation" },
        { name: "WiFi access point kit", qty: 8, unitPrice: "For validation" },
      ],
      notes: "Illustrative status only. Final pricing, availability, validity, and terms require HACIEN review and supplier evidence."
    },
    {
      id: "SAMPLE-RFQ-0002",
      date: "Sample date",
      title: "Backup appliance and UPS sizing request",
      status: "Sourcing Review",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      totalAmount: "Estimate pending",
      itemsCount: 2,
      items: [
        { name: "NAS backup appliance class", qty: 1, unitPrice: "For validation" },
        { name: "Online UPS class", qty: 2, unitPrice: "For validation" },
      ],
      notes: "Illustrative workflow state. Procurement and fulfillment records are created only after confirmed business approval."
    },
    {
      id: "SAMPLE-RFQ-0001",
      date: "Sample date",
      title: "Endpoint security license request",
      status: "Closed Sample",
      badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
      totalAmount: "Estimate pending",
      itemsCount: 1,
      items: [
        { name: "Endpoint security license class", qty: 1, unitPrice: "For validation" },
      ],
      notes: "Sample closed state for interface demonstration. This preview does not represent paid work, license fulfillment, or regulated documentation."
    }
  ];

  const orders = [
    {
      id: "SAMPLE-ORDER-0001",
      rfqRef: "SAMPLE-RFQ-0002",
      date: "Sample date",
      status: "Planning Preview",
      eta: "Not scheduled",
      carrier: "To be confirmed after approved procurement",
      steps: [
        { label: "Requirement captured", date: "Sample", completed: true },
        { label: "Commercial review", date: "Sample", completed: true },
        { label: "Supplier evidence pending", date: "Sample", current: true },
        { label: "Fulfillment not yet committed", date: "Future", current: false },
      ]
    }
  ];

  const tickets = [
    {
      id: "SAMPLE-TICKET-002",
      date: "Sample date",
      subject: "RAM Upgrade Inquiry for Business Laptops",
      category: "Technical Consultation",
      status: "Open / In Review",
      priority: "Normal",
      lastUpdate: "Sample activity"
    },
    {
      id: "SAMPLE-TICKET-001",
      date: "Sample date",
      subject: "Request for quotation clarification",
      category: "Quotation Support",
      status: "Closed Sample",
      priority: "Normal",
      lastUpdate: "Sample activity"
    }
  ];

  const documents = [
    { name: "Sample_RFQ_Summary.pdf", type: "Draft request summary", size: "Sample", date: "Sample date" },
    { name: "Sample_Specification_Notes.pdf", type: "Requirement notes", size: "Sample", date: "Sample date" },
    { name: "Sample_Supplier_Evidence_Checklist.pdf", type: "Evidence checklist", size: "Sample", date: "Sample date" },
    { name: "Sample_Support_Context.pdf", type: "Support context", size: "Sample", date: "Sample date" }
  ];

  const selectedRfqData = rfqs.find(r => r.id === selectedRfq) || rfqs[0];

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-950/5 overflow-hidden">
      {/* Top Banner */}
      <div className="bg-[#071426] p-6 text-white sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300 border border-blue-400/30">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Illustrative Portal Preview
            </span>
            <span className="text-xs text-slate-400">Sample workspace data</span>
          </div>
          <h3 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
            Sample Customer Workspace
          </h3>
          <p className="mt-1 text-xs text-slate-300">
            Preview of RFQ visibility, support context, and evidence-gated procurement workflow states.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/quote"
            className="rounded-full bg-[#1457d9] px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-blue-600 transition"
          >
            New RFQ Intake
          </Link>
          <Link
            href={`/track/${selectedRfq}`}
            className="rounded-full border border-slate-600 px-4 py-2 text-xs font-semibold text-slate-200 hover:border-slate-400 hover:text-white transition"
          >
            Public Status Check
          </Link>
        </div>
      </div>

      {/* Tabs Header */}
      <div className="border-b border-slate-200 bg-slate-50/70 px-6 pt-4">
        <div className="flex flex-wrap gap-2 sm:gap-6">
          <button
            onClick={() => setActiveTab("rfqs")}
            className={`flex items-center gap-2 border-b-2 pb-3 text-sm font-semibold transition ${
              activeTab === "rfqs"
                ? "border-[#1457d9] text-[#1457d9]"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <FileText className="h-4 w-4" />
            Sample RFQs & Quotes
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700 font-bold">
              {rfqs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 border-b-2 pb-3 text-sm font-semibold transition ${
              activeTab === "orders"
                ? "border-[#1457d9] text-[#1457d9]"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Truck className="h-4 w-4" />
            Procurement Planning
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700 font-bold">
              1 Active
            </span>
          </button>

          <button
            onClick={() => setActiveTab("tickets")}
            className={`flex items-center gap-2 border-b-2 pb-3 text-sm font-semibold transition ${
              activeTab === "tickets"
                ? "border-[#1457d9] text-[#1457d9]"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <HelpCircle className="h-4 w-4" />
            Support Tickets
            <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs text-slate-700 font-bold">
              {tickets.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("documents")}
            className={`flex items-center gap-2 border-b-2 pb-3 text-sm font-semibold transition ${
              activeTab === "documents"
                ? "border-[#1457d9] text-[#1457d9]"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            Evidence Vault
            <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs text-slate-700 font-bold">
              4
            </span>
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="p-6 sm:p-8 bg-white">
        {/* RFQ TAB */}
        {activeTab === "rfqs" && (
          <div className="grid gap-6 lg:grid-cols-12">
            {/* RFQ List */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Sample Procurement Requests
              </h4>
              {rfqs.map((rfq) => (
                <button
                  key={rfq.id}
                  onClick={() => setSelectedRfq(rfq.id)}
                  className={`text-left rounded-xl border p-4 transition ${
                    selectedRfq === rfq.id
                      ? "border-[#1457d9] bg-blue-50/40 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">{rfq.id}</span>
                    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${rfq.badgeColor}`}>
                      {rfq.status}
                    </span>
                  </div>
                  <h5 className="mt-2 text-sm font-bold text-slate-900 line-clamp-1">
                    {rfq.title}
                  </h5>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <span>{rfq.itemsCount} line items</span>
                    <span className="font-semibold text-slate-800">{rfq.totalAmount}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* RFQ Details Pane */}
            <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xs font-bold text-[#1457d9]">{selectedRfqData.id}</span>
                  <h4 className="text-base font-bold text-slate-950">{selectedRfqData.title}</h4>
                  <p className="text-xs text-slate-500">Created: {selectedRfqData.date}</p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/track/${selectedRfqData.id}`}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
                  >
                    <Eye className="h-3.5 w-3.5" /> View Public Track
                  </Link>
                </div>
              </div>

              {/* Items Table */}
              <div className="mt-4">
                <h5 className="text-xs font-bold text-slate-700 mb-2">Requested Specifications & Items</h5>
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100/80 text-slate-600 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">Item Description</th>
                        <th className="py-2.5 px-3 text-center">Qty</th>
                        <th className="py-2.5 px-3 text-right">Estimated Unit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-800">
                      {selectedRfqData.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="py-2.5 px-3 font-medium">{item.name}</td>
                          <td className="py-2.5 px-3 text-center">{item.qty}</td>
                          <td className="py-2.5 px-3 text-right font-mono">{item.unitPrice}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Notes */}
              <div className="mt-4 rounded-xl border border-blue-200/80 bg-blue-50/60 p-3.5 text-xs text-blue-900">
                <span className="font-bold">Status Note: </span>
                {selectedRfqData.notes}
              </div>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === "orders" && (
          <div className="flex flex-col gap-6">
            {orders.map((order) => (
              <div key={order.id} className="rounded-2xl border border-slate-200 p-6 bg-slate-50/40">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500">{order.id}</span>
                      <span className="rounded-full bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                        {order.status}
                      </span>
                    </div>
                    <h4 className="mt-1 text-base font-bold text-slate-900">
                      Planning view for {order.rfqRef}
                    </h4>
                  </div>
                  <div className="text-right text-xs">
                    <span className="block text-slate-500">Fulfillment Status</span>
                    <span className="font-bold text-slate-900">{order.eta}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-6">
                  <h5 className="text-xs font-bold text-slate-600 mb-4">Milestone Progress</h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {order.steps.map((step, idx) => (
                      <div key={idx} className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <div
                            className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${
                              step.completed
                                ? "bg-emerald-600 text-white"
                                : step.current
                                ? "bg-[#1457d9] text-white ring-4 ring-blue-100 animate-pulse"
                                : "bg-slate-200 text-slate-500"
                            }`}
                          >
                            {step.completed ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                          </div>
                          <div className={`h-1 flex-1 rounded-full ${step.completed ? "bg-emerald-500" : "bg-slate-200"}`} />
                        </div>
                        <span className="mt-1 text-xs font-bold text-slate-800">{step.label}</span>
                        <span className="text-[11px] text-slate-500">{step.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TICKETS TAB */}
        {activeTab === "tickets" && (
          <div className="overflow-hidden rounded-xl border border-slate-200 text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Ticket ID</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Last Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {tickets.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-mono font-bold text-[#1457d9]">{t.id}</td>
                    <td className="py-3 px-4 font-medium">{t.subject}</td>
                    <td className="py-3 px-4 text-slate-600">{t.category}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        t.status.includes("Resolved") ? "bg-slate-100 text-slate-700 border border-slate-300" : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-slate-500">{t.lastUpdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab === "documents" && (
          <div className="grid gap-4 md:grid-cols-2">
            {documents.map((doc, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-xl border border-slate-200 p-4 bg-slate-50/50 hover:bg-white hover:shadow-sm transition">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-blue-100 text-[#1457d9]">
                    <FileCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{doc.name}</h5>
                    <p className="text-[11px] text-slate-500">{doc.type} • {doc.size} • {doc.date}</p>
                  </div>
                </div>
                <button className="flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition">
                  <Download className="h-3.5 w-3.5" /> PDF
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span>Need assistance with a request? Contact HACIEN support for RFQ follow-up and clarification.</span>
        <Link href="/contact" className="font-bold text-[#1457d9] hover:underline flex items-center gap-1">
          Support Desk <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
