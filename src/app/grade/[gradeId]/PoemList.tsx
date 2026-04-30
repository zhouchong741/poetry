'use client';

import { useState, useMemo } from 'react';
import type { Poem } from '@/types/poem';
import PoemCard from '@/components/poem/PoemCard';
import FilterBar from '@/components/ui/FilterBar';
import EmptyState from '@/components/ui/EmptyState';

export default function PoemList({ poems }: { poems: Poem[] }) {
  const [selectedDynasty, setSelectedDynasty] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [requiredOnly, setRequiredOnly] = useState(false);

  const dynasties = useMemo(() => {
    const map = new Map<string, number>();
    poems.forEach((p) => map.set(p.dynasty, (map.get(p.dynasty) || 0) + 1));
    return Array.from(map.entries()).map(([label, count]) => ({ label, count }));
  }, [poems]);

  const filtered = useMemo(() => {
    return poems.filter((p) => {
      if (selectedDynasty && p.dynasty !== selectedDynasty) return false;
      if (selectedType && p.type !== selectedType) return false;
      if (requiredOnly && !p.isRequired) return false;
      return true;
    });
  }, [poems, selectedDynasty, selectedType, requiredOnly]);

  return (
    <>
      <FilterBar
        dynasties={dynasties}
        selectedDynasty={selectedDynasty}
        selectedType={selectedType}
        requiredOnly={requiredOnly}
        onDynastyChange={setSelectedDynasty}
        onTypeChange={setSelectedType}
        onRequiredChange={setRequiredOnly}
      />

      {filtered.length === 0 ? (
        <EmptyState message="没有找到匹配的古诗，试试其他筛选条件吧" />
      ) : (
        <div className="space-y-3">
          {filtered.map((poem) => (
            <PoemCard key={poem.id} poem={poem} />
          ))}
        </div>
      )}
    </>
  );
}
