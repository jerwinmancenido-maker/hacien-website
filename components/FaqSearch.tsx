"use client";

import { useId, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

export type FaqSection = {
  title: string;
  items: {
    question: string;
    answer: string;
  }[];
};

export function FaqSearch({ sections }: { sections: FaqSection[] }) {
  const [query, setQuery] = useState("");
  const searchInputId = useId();
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
      <div>
        <label htmlFor={searchInputId} className="block text-sm font-bold text-ink mb-2">
          Search help topics
        </label>
        <input
          id={searchInputId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
          placeholder="Search RFQ, payment, warranty, tracking..."
          className="focus-ring min-h-12 w-full rounded-lg border border-grey-200 bg-white px-4 font-normal text-ink"
        />
      </div>
      <div className="mt-8 grid gap-8">
        {filteredSections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-bold text-ink">{section.title}</h2>
            <div className="mt-4 grid gap-4">
              {section.items.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-lg border border-grey-200 bg-white p-5 shadow-sm transition-colors"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 rounded [&::-webkit-details-marker]:hidden">
                    <span>{item.question}</span>
                    <ChevronDown
                      className="h-5 w-5 shrink-0 text-grey-600 transition-transform duration-200 group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-grey-700">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
        {filteredSections.length === 0 ? (
          <div className="rounded-lg border border-dashed border-grey-200 bg-grey-50 p-8 text-center text-sm font-semibold text-grey-600">
            No FAQ results found. Try RFQ, payment, warranty, or tracking.
          </div>
        ) : null}
      </div>
    </div>
  );
}
