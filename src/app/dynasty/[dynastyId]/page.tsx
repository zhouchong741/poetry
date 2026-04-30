import { notFound } from 'next/navigation';
import { getPoemsByDynasty, getDynasties } from '@/lib/poems';
import { DYNASTY_ID_MAP } from '@/lib/constants';
import PoemCard from '@/components/poem/PoemCard';

export async function generateStaticParams() {
  return getDynasties().map((d) => ({ dynastyId: d.id }));
}

export default async function DynastyPage({ params }: { params: Promise<{ dynastyId: string }> }) {
  const { dynastyId } = await params;
  const label = DYNASTY_ID_MAP[dynastyId];
  if (!label) notFound();

  const poems = getPoemsByDynasty(label);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-1 text-2xl font-bold text-ink">{label}</h1>
      <p className="mb-6 text-sm text-zinc-500">
        共收录 {poems.length} 首
      </p>

      {poems.length === 0 ? (
        <p className="py-12 text-center text-zinc-500">该朝代暂无收录古诗</p>
      ) : (
        <div className="space-y-3">
          {poems.map((poem) => (
            <PoemCard key={poem.id} poem={poem} />
          ))}
        </div>
      )}
    </div>
  );
}
