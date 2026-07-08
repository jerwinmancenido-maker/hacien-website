export default function Loading() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <div className="surface grid gap-3 rounded-lg p-6">
          <div className="h-3 rounded bg-slate-200" />
          <div className="h-3 rounded bg-slate-100" />
          <div className="h-3 w-2/3 rounded bg-slate-100" />
        </div>
        <p className="mt-6 text-sm font-medium text-slate-500">Preparing the next headquarters view...</p>
      </div>
    </section>
  );
}
