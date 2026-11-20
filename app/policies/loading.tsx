export default function PoliciesLoading() {
  return (
    <div role="status" className="bg-white px-4 py-10 sm:px-6 lg:px-8">
      <span className="sr-only">Loading…</span>
      <div className="mx-auto max-w-7xl">
        <div className="h-3 w-28 animate-pulse rounded bg-grey-100" />
        <div className="mt-4 h-10 w-full max-w-xl animate-pulse rounded bg-grey-100 sm:h-12 sm:max-w-2xl" />
        <div className="mt-3 h-4 w-full max-w-md animate-pulse rounded bg-grey-100" />

        <div className="mt-8 grid gap-4">
          {[0, 1, 2].map((section) => (
            <div
              key={section}
              className="grid gap-3 rounded-lg border border-grey-200 bg-white p-4 sm:p-5 lg:grid-cols-[0.28fr_1fr]"
            >
              <div className="h-5 w-36 animate-pulse rounded bg-grey-100 lg:w-full" />
              <div className="grid gap-2.5">
                <div className="h-3.5 w-full animate-pulse rounded bg-grey-100" />
                <div className="h-3.5 w-[92%] animate-pulse rounded bg-grey-100" />
                <div className="h-3.5 w-[78%] animate-pulse rounded bg-grey-100" />
                {section < 2 ? (
                  <div className="h-3.5 w-[64%] animate-pulse rounded bg-grey-100" />
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
