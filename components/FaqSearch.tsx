"use client";

import { useMemo, useState } from "react";

export type FaqSection = {
  title: string;
  items: {
    question: string;
    answer: string;
  }[];
};

export function FaqSearch({ sections }: { sections: FaqSection[] }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredSections = useMemo(
    () =>
      sections
        .map((section) => ({
          ...section,
          items: section.items.filter((item) =>
            `${section.title} ${item.question} ${item.answer}`.toLowerCase().includes(normalizedQuery),
          ),
        }))
        .filter((section) => section.items.length > 0),
    [normalizedQuery, sections],
  );

  return (
    <div>
      <label className="grid gap-2 text-sm font-bold text-slate-800">
        Search help topics
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
          placeholder="Search RFQ, payment, warranty, tracking..."
          className="focus-ring min-h-12 rounded-lg border border-slate-300 bg-white px-4 font-normal"
        />
      </label>
      <div className="mt-8 grid gap-8">
        {filteredSections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-bold text-slate-950">{section.title}</h2>
            <div className="mt-4 grid gap-4">
              {section.items.map((item) => (
                <details key={item.question} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer text-sm font-bold text-slate-950">{item.question}</summary>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
        {filteredSections.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm font-semibold text-slate-600">
            No FAQ results found. Try RFQ, payment, warranty, or tracking.
          </div>
        ) : null}
      </div>
    </div>
  );
}
