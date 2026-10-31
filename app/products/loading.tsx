export default function ProductsLoading() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#2563EB]" />
        <p className="mt-6 text-sm font-medium text-slate-500">Loading catalog...</p>
      </div>
    </section>
  );
}