import { notFound } from 'next/navigation';
import { getPoemsByDynastyPage, getDynasties } from '@/lib/poems';
import { DYNASTY_ID_MAP } from '@/lib/constants';
import DynastyPoemPage from '@/components/dynasty/DynastyPoemPage';

export async function generateStaticParams() {
  return getDynasties().map((d) => ({ dynastyId: d.id }));
}

export default async function DynastyPage({ params }: { params: Promise<{ dynastyId: string }> }) {
  const { dynastyId } = await params;
  const label = DYNASTY_ID_MAP[dynastyId];
  if (!label) notFound();

  const { poems, totalPoems, totalPages, currentPage } = getPoemsByDynastyPage(label, 1);

  return (
    <DynastyPoemPage
      dynastyId={dynastyId}
      label={label}
      poems={poems}
      totalPoems={totalPoems}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  );
}
