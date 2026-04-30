'use client';

import type { Poem } from '@/types/poem';
import PoemCard from '@/components/poem/PoemCard';
import EmptyState from '@/components/ui/EmptyState';

export default function PoemList({ poems }: { poems: Poem[] }) {
  return poems.length === 0 ? (
    <EmptyState message="没有找到匹配的古诗，试试其他筛选条件吧" />
  ) : (
    <div className="space-y-3">
      {poems.map((poem) => (
        <PoemCard key={poem.id} poem={poem} />
      ))}
    </div>
  );
}
