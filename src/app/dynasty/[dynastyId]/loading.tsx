import { PoemCardSkeleton } from '@/components/ui/Skeleton';

export default function DynastyLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 h-8 w-24 animate-pulse rounded bg-inkwash" />
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <PoemCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
