export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-10 text-center">
        <div className="mx-auto mb-2 h-9 w-48 animate-pulse rounded bg-inkwash" />
        <div className="mx-auto h-5 w-64 animate-pulse rounded bg-inkwash" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-lg border border-inkwash bg-zinc-50"
          />
        ))}
      </div>
    </div>
  );
}
