import Link from 'next/link';
import type { PoemPreview } from '@/types/poem';
import PoemCard from '@/components/poem/PoemCard';
import BackButton from '@/components/ui/BackButton';

interface DynastyPoemPageProps {
  dynastyId: string;
  label: string;
  poems: ReadonlyArray<PoemPreview>;
  totalPoems: number;
  currentPage: number;
  totalPages: number;
}

function buildDynastyHref(dynastyId: string, pageNumber: number) {
  return pageNumber <= 1 ? `/dynasty/${dynastyId}` : `/dynasty/${dynastyId}/${pageNumber}`;
}

export default function DynastyPoemPage({
  dynastyId,
  label,
  poems,
  totalPoems,
  currentPage,
  totalPages,
}: DynastyPoemPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6">
        <BackButton />
      </div>

      <h1 className="mb-1 text-2xl font-bold text-ink">{label}</h1>
      <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
        共收录 {totalPoems} 首
      </p>
      {totalPages > 1 && (
        <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
          第 {currentPage} / {totalPages} 页
        </p>
      )}

      {poems.length === 0 ? (
        <p className="py-12 text-center text-zinc-500 dark:text-zinc-400">该朝代暂无收录古诗</p>
      ) : (
        <div className="space-y-3">
          {poems.map((poem) => (
            <PoemCard key={poem.id} poem={poem} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <nav className="mt-8 flex flex-wrap items-center gap-2">
          {currentPage > 1 && (
            <Link
              href={buildDynastyHref(dynastyId, currentPage - 1)}
              className="rounded-lg border border-inkwash px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-inkwash/60 hover:text-ink dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              上一页
            </Link>
          )}

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <Link
              key={pageNumber}
              href={buildDynastyHref(dynastyId, pageNumber)}
              aria-current={pageNumber === currentPage ? 'page' : undefined}
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                pageNumber === currentPage
                  ? 'bg-ink text-white'
                  : 'border border-inkwash text-zinc-600 hover:bg-inkwash/60 hover:text-ink dark:text-zinc-300 dark:hover:bg-zinc-700'
              }`}
            >
              {pageNumber}
            </Link>
          ))}

          {currentPage < totalPages && (
            <Link
              href={buildDynastyHref(dynastyId, currentPage + 1)}
              className="rounded-lg border border-inkwash px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-inkwash/60 hover:text-ink dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              下一页
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}
