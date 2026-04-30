import Link from 'next/link';
import type { Poem } from '@/types/poem';
import Badge from '@/components/ui/Badge';

export default function PoemCard({ poem }: { poem: Poem }) {
  const excerpt = poem.text.slice(0, 2).join('');

  return (
    <Link
      href={`/poems/${poem.id}`}
      className="block rounded-lg border border-inkwash bg-white p-5 transition-all hover:border-zinc-300 hover:shadow-sm"
    >
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <h3 className="text-base font-semibold text-ink">{poem.title}</h3>
        <span className="text-xs text-zinc-400">
          {poem.author} · {poem.dynasty}
        </span>
        <div className="flex gap-1">
          <Badge variant="type">{poem.type}</Badge>
          {poem.isRequired && <Badge variant="required">必背</Badge>}
        </div>
      </div>
      <p className="font-songti text-sm leading-relaxed text-zinc-600">
        {excerpt}……
      </p>
    </Link>
  );
}
