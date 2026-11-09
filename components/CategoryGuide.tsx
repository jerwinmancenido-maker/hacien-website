import Link from "next/link";
import type { CategoryGuide as CategoryGuideData } from "@/data/categoryGuides";

export function CategoryGuide({ guide, categoryName }: { guide: CategoryGuideData; categoryName: string }) {
  return (
    <div className="mt-12 space-y-12">
      <section>
        <h2 className="text-2xl font-bold tracking-tight text-ink">What {categoryName.toLowerCase()} covers</h2>
        <div className="mt-4 max-w-3xl space-y-4 text-base leading-7 text-grey-700">
          {guide.whatItIs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight text-ink">Where Philippine buyers use it</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {guide.useCases.map((item) => (
            <article key={item.title} className="rounded border border-grey-200 bg-white p-5">
              <h3 className="text-base font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-grey-700">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight text-ink">Specifications worth deciding before you order</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-grey-700">
          These are industry baselines buyers use to write a request. The quotation replaces them with an exact model.
        </p>
        <div className="mt-4 overflow-x-auto rounded border border-grey-200">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <caption className="sr-only">Specification guide for {categoryName}</caption>
            <thead className="bg-grey-50 text-ink">
              <tr>
                <th scope="col" className="w-[28%] px-4 py-3 font-bold">
                  Topic
                </th>
                <th scope="col" className="px-4 py-3 font-bold">
                  What buyers should know
                </th>
              </tr>
            </thead>
            <tbody>
              {guide.specs.map((row) => (
                <tr key={row.topic} className="border-t border-grey-200 align-top">
                  <th scope="row" className="px-4 py-3 font-bold text-ink">
                    {row.topic}
                  </th>
                  <td className="px-4 py-3 leading-6 text-grey-700">{row.guidance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight text-ink">What HACIEN does beyond the box</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {guide.beyond.map((item) => (
            <article key={item.title} className="rounded border border-grey-200 bg-grey-50 p-5">
              <h3 className="text-base font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-grey-700">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded border border-grey-200 bg-white p-5 sm:p-6">
        <h2 className="text-2xl font-bold tracking-tight text-ink">What to include in your RFQ</h2>
        <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-sm leading-6 text-grey-700">
          {guide.rfqChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center">
          <Link
            href="/quote"
            className="inline-flex min-h-11 items-center justify-center rounded bg-blue px-6 py-3 text-center text-sm font-medium text-white hover:bg-blue-dark"
          >
            Request a quotation for {categoryName.toLowerCase()}
          </Link>
          <Link href="/solutions/systems-integration" className="inline-flex min-h-11 items-center text-sm font-bold text-blue hover:underline">
            Need survey, installation, and turnover?
          </Link>
        </div>
      </section>
    </div>
  );
}
