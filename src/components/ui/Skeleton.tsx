interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`animate-pulse rounded bg-inkwash ${className}`} />
  );
}

export function PoemCardSkeleton() {
  return (
    <div className="rounded-lg border border-inkwash bg-white p-5 dark:bg-paper-dark">
      <Skeleton className="mb-2 h-5 w-28" />
      <Skeleton className="mb-3 h-4 w-20" />
      <Skeleton className="mb-1 h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}

export function PoemDetailSkeleton() {
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-32" />
      <div className="space-y-3 pt-6">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-6 w-4/6" />
        <Skeleton className="h-6 w-3/4" />
      </div>
      <div className="space-y-2 pt-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
