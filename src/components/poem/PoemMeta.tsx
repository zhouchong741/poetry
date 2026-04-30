import Badge from '@/components/ui/Badge';
import type { Poem } from '@/types/poem';

export default function PoemMeta({ poem }: { poem: Poem }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <h3 className="text-base font-semibold text-ink">{poem.title}</h3>
      <span className="text-sm text-zinc-400">
        {poem.author} · {poem.dynasty}
      </span>
      <div className="flex flex-wrap gap-1">
        <Badge variant="type">{poem.type}</Badge>
        {poem.isRequired && <Badge variant="required">必背</Badge>}
      </div>
    </div>
  );
}
