import { notFound } from 'next/navigation';
import DynastyPoemPage from '@/components/dynasty/DynastyPoemPage';
import { DYNASTY_ID_MAP } from '@/lib/constants';
import { getDynasties, getPoemsByDynastyPage } from '@/lib/poems';

export async function generateStaticParams() {
  return getDynasties().flatMap((dynasty) => {
    const { totalPages } = getPoemsByDynastyPage(dynasty.label, 1);
    return Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => ({
      dynastyId: dynasty.id,
      pageNumber: String(index + 2),
    }));
  });
}

export default async function DynastyPaginatedPage({
  params,
}: {
  params: Promise<{ dynastyId: string; pageNumber: string }>;
}) {
  const { dynastyId, pageNumber } = await params;
  const label = DYNASTY_ID_MAP[dynastyId];
  if (!label) notFound();

  const page = Number(pageNumber);
  if (!Number.isInteger(page) || page <= 1) notFound();

  const result = getPoemsByDynastyPage(label, page);
  if (result.currentPage !== page) notFound();

  return (
    <DynastyPoemPage
      dynastyId={dynastyId}
      label={label}
      poems={result.poems}
      totalPoems={result.totalPoems}
      totalPages={result.totalPages}
      currentPage={result.currentPage}
    />
  );
}
