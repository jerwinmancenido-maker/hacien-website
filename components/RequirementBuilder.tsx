"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useQuoteCart } from "@/components/QuoteCartProvider";

type FieldDefinition = {
  key: string;
  label: string;
  type?: "text" | "select" | "textarea";
  options?: string[];
};

type TemplateDefinition = {
  key: string;
  label: string;
  description: string;
  brands: string[];
  fields: FieldDefinition[];
};

const commonBrands = [
  "Any suitable option",
  "Not sure",
  "Dell",
  "HP",
  "Lenovo",
  "Asus",
  "Acer",
  "Apple",
  "Other / not listed",
];

const templates: TemplateDefinition[] = [
  {
    key: "computers-laptops",
    label: "Computers & Laptops",
    description: "Laptops, desktops, workstations, mini PCs, all-in-ones, and endpoint packages.",
    brands: commonBrands,
    fields: [
      { key: "deviceType", label: "Device type", type: "select", options: ["Not sure", "Laptop", "Desktop", "Workstation", "Mini PC", "All-in-one", "Other / not listed"] },
      { key: "useCase", label: "Use case", type: "select", options: ["Not sure", "Office work", "Field work", "Design / creative", "Engineering", "School / classroom", "Executive", "General use", "Other / not listed"] },
      { key: "processor", label: "Processor class", type: "select", options: ["Any suitable option", "Not sure", "Entry processor class", "Office processor class", "Higher processor class", "Workstation class", "Other / not listed"] },
      { key: "memory", label: "Memory", type: "select", options: ["Any suitable option", "Not sure", "8GB", "16GB", "32GB", "64GB+", "Other / not listed"] },
      { key: "storage", label: "Storage", type: "select", options: ["Any suitable option", "Not sure", "256GB SSD", "512GB SSD", "1TB SSD", "Larger storage", "Other / not listed"] },
      { key: "accessories", label: "Accessories", type: "text" },
    ],
  },
  {
    key: "servers-storage",
    label: "Servers & Storage",
    description: "Servers, NAS, backup storage, drives, storage expansion, and continuity requirements.",
    brands: ["Any suitable option", "Not sure", "Dell", "Lenovo", "Other / not listed"],
    fields: [
      { key: "serverType", label: "Requirement type", type: "select", options: ["Not sure", "Tower server", "Rack server", "NAS", "Backup storage", "Drive expansion", "Other / not listed"] },
      { key: "capacity", label: "Storage capacity", type: "text" },
      { key: "memory", label: "Memory target", type: "select", options: ["Any suitable option", "Not sure", "16GB", "32GB", "64GB", "128GB+", "Other / not listed"] },
      { key: "redundancy", label: "Redundancy / RAID", type: "select", options: ["Not sure", "Required", "Preferred", "Not required", "Other / not listed"] },
      { key: "backupNeed", label: "Backup need", type: "text" },
    ],
  },
  {
    key: "network-equipment",
    label: "Networking",
    description: "Switches, routers, firewalls, access points, racks, and connectivity infrastructure.",
    brands: ["Any suitable option", "Not sure", "Cisco", "Ubiquiti", "TP-Link", "MikroTik", "Other / not listed"],
    fields: [
      { key: "networkType", label: "Device type", type: "select", options: ["Not sure", "Switch", "Router", "Firewall", "Access point", "Controller", "Rack accessory", "Other / not listed"] },
      { key: "ports", label: "Port count", type: "select", options: ["Not sure", "8 ports", "16 ports", "24 ports", "48 ports", "Other / not listed"] },
      { key: "poe", label: "PoE needed", type: "select", options: ["Not sure", "Yes", "No", "Some ports only"] },
      { key: "speed", label: "Speed / uplink", type: "select", options: ["Any suitable option", "Not sure", "Gigabit", "2.5G", "10G uplink", "Other / not listed"] },
      { key: "networkNeeds", label: "VLAN, security, Wi-Fi, or site notes", type: "textarea" },
    ],
  },
  {
    key: "licensed-software",
    label: "Software",
    description: "Productivity, security, OS, design, accounting, backup, collaboration, and SaaS.",
    brands: ["Any suitable option", "Not sure", "Microsoft", "Other / not listed"],
    fields: [
      { key: "softwareType", label: "Software type", type: "select", options: ["Not sure", "Productivity", "Security", "Operating system", "Design / creative", "Accounting", "Backup", "Cloud / SaaS", "Collaboration", "Other / not listed"] },
      { key: "licenseType", label: "License type", type: "select", options: ["Not sure", "New license", "Renewal", "Upgrade", "Subscription", "Perpetual", "Other / not listed"] },
      { key: "usersDevices", label: "Users / devices", type: "text" },
      { key: "term", label: "Term", type: "select", options: ["Not sure", "Monthly", "Annual", "Multi-year", "Other / not listed"] },
      { key: "deployment", label: "Deployment", type: "select", options: ["Not sure", "Cloud", "Device-based", "User-based", "Server-based", "Other / not listed"] },
    ],
  },
  {
    key: "security-surveillance",
    label: "Cybersecurity & Surveillance",
    description: "Endpoint protection, firewalls, email security, CCTV, access control, and monitoring.",
    brands: ["Any suitable option", "Not sure", "Ubiquiti", "Hikvision", "Dahua", "Other / not listed"],
    fields: [
      { key: "securityType", label: "Security type", type: "select", options: ["Not sure", "Endpoint protection", "Firewall", "Email security", "CCTV", "NVR / DVR", "Access control", "Other / not listed"] },
      { key: "scope", label: "Users / devices / cameras", type: "text" },
      { key: "monitoring", label: "Monitoring needed", type: "select", options: ["Not sure", "Yes", "No", "Maybe later"] },
      { key: "deployment", label: "Deployment type", type: "text" },
    ],
  },
  {
    key: "power-ups",
    label: "Power & UPS",
    description: "UPS, AVR, PDU, rack power, and power protection for technology environments.",
    brands: ["Any suitable option", "Not sure", "APC", "CyberPower", "Eaton", "Other / not listed"],
    fields: [
      { key: "powerType", label: "Power requirement", type: "select", options: ["Not sure", "UPS", "AVR", "PDU", "Rack power", "Power protection", "Other / not listed"] },
      { key: "load", label: "Load / devices protected", type: "text" },
      { key: "runtime", label: "Runtime target", type: "select", options: ["Not sure", "5-10 minutes", "15-30 minutes", "30+ minutes", "Other / not listed"] },
      { key: "formFactor", label: "Form factor", type: "select", options: ["Not sure", "Tower", "Rackmount", "Either"] },
    ],
  },
  {
    key: "printers-peripherals",
    label: "Printers & Peripherals",
    description: "Printers, scanners, monitors, keyboards, mice, headsets, docks, and office IT devices.",
    brands: ["Any suitable option", "Not sure", "Dell", "HP", "Lenovo", "Epson", "Brother", "Canon", "Other / not listed"],
    fields: [
      { key: "peripheralType", label: "Peripheral type", type: "select", options: ["Not sure", "Printer", "Scanner", "Monitor", "Keyboard / mouse", "Headset", "Dock", "Other / not listed"] },
      { key: "volume", label: "Volume / size", type: "text" },
      { key: "color", label: "Color / mono", type: "select", options: ["Not sure", "Color", "Mono", "Not applicable"] },
      { key: "paperOrSize", label: "Paper size / screen size / accessory notes", type: "text" },
    ],
  },
  {
    key: "structured-cabling",
    label: "Structured Cabling",
    description: "Network points, cables, patch panels, racks, cabinets, faceplates, and installation materials.",
    brands: ["Any suitable option", "Not sure", "TP-Link", "Other / not listed"],
    fields: [
      { key: "nodes", label: "Number of nodes", type: "text" },
      { key: "cableType", label: "Cable type", type: "select", options: ["Not sure", "Cat6", "Cat6A", "Fiber", "Other / not listed"] },
      { key: "rackCabinet", label: "Rack / cabinet needed", type: "select", options: ["Not sure", "Yes", "No", "Already available"] },
      { key: "installationLocation", label: "Installation location", type: "text" },
    ],
  },
  {
    key: "accessories-consumables",
    label: "Accessories & Consumables",
    description: "Cables, adapters, printer supplies, storage media, labels, and deployment essentials.",
    brands: ["Any suitable option", "Not sure", "HP", "TP-Link", "Epson", "Canon", "Other / not listed"],
    fields: [
      { key: "itemType", label: "Item type", type: "select", options: ["Not sure", "Cable", "Adapter", "Printer supply", "Storage media", "Label / cable management", "Deployment accessory", "Other / not listed"] },
      { key: "specification", label: "Specification or compatibility", type: "text" },
      { key: "packaging", label: "Unit / packaging", type: "text" },
      { key: "usage", label: "Where it will be used", type: "text" },
    ],
  },
  {
    key: "general-merchandise",
    label: "General Merchandise",
    description: "Non-IT goods, office supplies, and mixed institutional procurement items related to a broader requirement.",
    brands: ["Any suitable option", "Not sure", "Other / not listed"],
    fields: [
      { key: "itemType", label: "Item type", type: "text" },
      { key: "specification", label: "Specification", type: "textarea" },
      { key: "unit", label: "Unit / packaging", type: "text" },
      { key: "context", label: "Procurement context", type: "textarea" },
    ],
  },
  {
    key: "professional-services",
    label: "Professional Services",
    description: "Installation, configuration, migration, deployment, maintenance, and support work.",
    brands: ["Not applicable", "Not sure", "Other / not listed"],
    fields: [
      { key: "serviceType", label: "Service type", type: "select", options: ["Not sure", "Installation", "Configuration", "Migration", "Maintenance", "Support", "Deployment", "Other / not listed"] },
      { key: "siteLocation", label: "Site location", type: "text" },
      { key: "schedule", label: "Preferred schedule", type: "text" },
      { key: "scope", label: "Scope", type: "textarea" },
    ],
  },
  {
    key: "other",
    label: "Other / Not Listed",
    description: "Anything not covered by the common technology areas.",
    brands: ["Any suitable option", "Not sure", "Other / not listed"],
    fields: [
      { key: "requirement", label: "Describe what you need", type: "textarea" },
      { key: "reference", label: "Brand, model, link, or reference if available", type: "text" },
    ],
  },
];

const equivalentOptions = [
  "Yes, equivalent options may be reviewed",
  "No, exact brand/model only",
  "Not sure",
];

/** Select values shown on the public requirement form. */
export function requirementBuilderOptions(): string[] {
  const options = new Set<string>(equivalentOptions);
  for (const template of templates) {
    for (const brand of template.brands) options.add(brand);
    for (const field of template.fields) {
      for (const option of field.options ?? []) options.add(option);
    }
  }
  return [...options];
}

function getTemplate(key: string) {
  return templates.find((template) => template.key === key) || templates[0];
}

function FieldControl({
  field,
  value,
  onChange,
}: {
  field: FieldDefinition;
  value: string;
  onChange: (value: string) => void;
}) {
  if (field.type === "textarea") {
    return (
      <textarea
        rows={3}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded border border-grey-200 px-3 py-2 font-normal"
      />
    );
  }

  if (field.type === "select") {
    return (
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded border border-grey-200 px-3 py-2 font-normal"
      >
        {field.options?.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    );
  }

  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="rounded border border-grey-200 px-3 py-2 font-normal"
    />
  );
}

export function RequirementBuilder({ initialCategory = "computers-laptops" }: { initialCategory?: string }) {
  const { addRequirement, totalRequirements } = useQuoteCart();
  const [category, setCategory] = useState(initialCategory);
  const template = getTemplate(category);
  const [quantity, setQuantity] = useState("1");
  const [brandPreference, setBrandPreference] = useState("Any suitable option");
  const [otherBrand, setOtherBrand] = useState("");
  const [equivalentAccepted, setEquivalentAccepted] = useState("Not sure");
  const [deadline, setDeadline] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [added, setAdded] = useState(false);
  const [fields, setFields] = useState<Record<string, string>>({});

  const activeFields = useMemo(() => {
    return Object.fromEntries(template.fields.map((field) => [field.key, fields[field.key] || field.options?.[0] || ""]));
  }, [fields, template.fields]);

  function resetForCategory(nextCategory: string) {
    setCategory(nextCategory);
    setBrandPreference("Any suitable option");
    setOtherBrand("");
    setFields({});
    setAdded(false);
  }

  function handleAddRequirement() {
    const labeledFields = Object.fromEntries(
      template.fields.map((field) => [field.label, activeFields[field.key] || ""])
    );

    addRequirement({
      category,
      categoryLabel: template.label,
      quantity: quantity || "1",
      brandPreference,
      otherBrand: brandPreference === "Other / not listed" ? otherBrand : "",
      equivalentAccepted,
      deadline,
      deliveryLocation,
      notes,
      fields: labeledFields,
    });
    setAdded(true);
    setQuantity("1");
    setNotes("");
  }

  return (
    <section className="rounded-lg border border-grey-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue">Technology RFQ Builder</div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:mt-3 sm:text-3xl">Build a requirement package.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-grey-600 sm:mt-3">
            Add one or more technology requirements, then submit them together as one RFQ. Lists help speed up intake; they never limit what you can request.
          </p>
        </div>
        <div className="rounded border border-blue-100 bg-blue-tint px-3 py-2 text-sm font-bold text-blue sm:px-4 sm:py-3">
          {totalRequirements} requirement{totalRequirements === 1 ? "" : "s"} in RFQ
        </div>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2 lg:gap-4">
        <label className="grid gap-2 text-sm font-semibold text-grey-700">
          Technology area
          <select
            value={category}
            onChange={(event) => resetForCategory(event.target.value)}
            className="rounded border border-grey-200 px-3 py-2 font-normal"
          >
            {templates.map((item) => (
              <option key={item.key} value={item.key}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-semibold text-grey-700">
          Quantity / scope
          <input
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            className="rounded border border-grey-200 px-3 py-2 font-normal"
          />
        </label>
      </div>

      <p className="mt-3 rounded border border-grey-200 bg-grey-100 p-3 text-sm leading-6 text-grey-600 sm:mt-4 sm:p-4">
        {template.description}
      </p>

      <div className="mt-4 grid gap-3 lg:grid-cols-2 lg:gap-4">
        <label className="grid gap-1.5 text-sm font-semibold text-grey-700 sm:gap-2">
          Preferred brand / vendor
          <select
            value={brandPreference}
            onChange={(event) => setBrandPreference(event.target.value)}
            className="rounded border border-grey-200 px-3 py-2 font-normal"
          >
            {template.brands.map((brand) => (
              <option key={brand}>{brand}</option>
            ))}
          </select>
        </label>

        <label className="grid gap-1.5 text-sm font-semibold text-grey-700 sm:gap-2">
          Equivalent options accepted?
          <select
            value={equivalentAccepted}
            onChange={(event) => setEquivalentAccepted(event.target.value)}
            className="rounded border border-grey-200 px-3 py-2 font-normal"
          >
            {equivalentOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>

        {brandPreference === "Other / not listed" ? (
          <label className="grid gap-1.5 text-sm font-semibold text-grey-700 sm:gap-2 lg:col-span-2">
            Specify brand, vendor, model, or reference
            <input
              value={otherBrand}
              onChange={(event) => setOtherBrand(event.target.value)}
              className="rounded border border-grey-200 px-3 py-2 font-normal"
            />
          </label>
        ) : null}

        {template.fields.map((field) => (
          <label key={field.key} className="grid gap-1.5 text-sm font-semibold text-grey-700 sm:gap-2">
            {field.label}
            <FieldControl
              field={field}
              value={activeFields[field.key]}
              onChange={(value) => setFields((current) => ({ ...current, [field.key]: value }))}
            />
          </label>
        ))}

        <label className="grid gap-1.5 text-sm font-semibold text-grey-700 sm:gap-2">
          Deadline <span className="font-normal text-grey-600">(optional)</span>
          <input
            type="date"
            value={deadline}
            onChange={(event) => setDeadline(event.target.value)}
            className="rounded border border-grey-200 px-3 py-2 font-normal"
          />
        </label>

        <label className="grid gap-1.5 text-sm font-semibold text-grey-700 sm:gap-2">
          Delivery location <span className="font-normal text-grey-600">(optional)</span>
          <input
            value={deliveryLocation}
            onChange={(event) => setDeliveryLocation(event.target.value)}
            className="rounded border border-grey-200 px-3 py-2 font-normal"
          />
        </label>

        <label className="grid gap-1.5 text-sm font-semibold text-grey-700 sm:gap-2 lg:col-span-2">
          Notes <span className="font-normal text-grey-600">(optional)</span>
          <textarea
            rows={2}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Add details, BOQ references, exact model requirements, preferred warranty, site context, or anything HACIEN should review."
            className="rounded border border-grey-200 px-3 py-2 font-normal"
          />
        </label>
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:items-center sm:gap-3">
        <button
          type="button"
          onClick={handleAddRequirement}
          className="button-glow rounded bg-blue px-5 py-3 text-sm font-bold text-white"
        >
          Add requirement to RFQ
        </button>
        <Link
          href="/quote"
          className="interactive-link rounded border border-grey-200 px-5 py-3 text-center text-sm font-bold text-ink"
        >
          Continue to submit
        </Link>
        {added ? (
          <span className="rounded border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            Requirement added. Add another or continue to submit.
          </span>
        ) : null}
      </div>
    </section>
  );
}
