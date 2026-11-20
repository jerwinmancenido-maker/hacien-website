export default function ProductCategoryLoading() {
  return (
    <div role="status" className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <span className="sr-only">Loading…</span>
      <div className="mx-auto max-w-7xl">
        <div className="h-3 w-48 animate-pulse rounded bg-grey-100" />
        <div className="mt-6 h-3 w-36 animate-pulse rounded bg-grey-100" />
        <div className="mt-4 h-10 w-full max-w-lg animate-pulse rounded bg-grey-100 sm:h-12" />
        <div className="mt-4 h-4 w-full max-w-2xl animate-pulse rounded bg-grey-100" />
        <div className="mt-2 h-4 w-[80%] max-w-xl animate-pulse rounded bg-grey-100" />

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0 flex-1">
            <div className="h-7 w-64 max-w-full animate-pulse rounded bg-grey-100" />
            <div className="mt-2 h-3.5 w-full max-w-md animate-pulse rounded bg-grey-100" />
          </div>
          <div className="h-11 w-28 animate-pulse rounded border border-grey-200 bg-grey-50" />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="overflow-hidden rounded-lg border border-grey-200 bg-white shadow-sm"
            >
              <div className="min-h-[118px] animate-pulse bg-grey-100 sm:min-h-[160px]" />
              <div className="space-y-3 p-4 sm:p-5">
                <div className="h-5 w-3/4 animate-pulse rounded bg-grey-100" />
                <div className="h-3.5 w-full animate-pulse rounded bg-grey-100" />
                <div className="h-3.5 w-[65%] animate-pulse rounded bg-grey-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
