import { PoemCardSkeleton } from '@/components/ui/Skeleton';

export default function GradeLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 h-8 w-32 animate-pulse rounded bg-inkwash" />
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <PoemCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
