'use client';

import { POEM_TYPES } from '@/lib/constants';

interface FilterBarProps {
  dynasties: { label: string; count: number }[];
  selectedDynasty: string;
  selectedType: string;
  requiredOnly: boolean;
  onDynastyChange: (dynasty: string) => void;
  onTypeChange: (type: string) => void;
  onRequiredChange: (required: boolean) => void;
}

export default function FilterBar({
  dynasties,
  selectedDynasty,
  selectedType,
  requiredOnly,
  onDynastyChange,
  onTypeChange,
  onRequiredChange,
}: FilterBarProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <select
        value={selectedDynasty}
        onChange={(e) => onDynastyChange(e.target.value)}
        className="rounded-lg border border-inkwash bg-white px-3 py-1.5 text-sm text-zinc-700 dark:bg-paper-dark dark:text-zinc-300"
      >
        <option value="">全部朝代</option>
        {dynasties.map((d) => (
          <option key={d.label} value={d.label}>
            {d.label}（{d.count}）
          </option>
        ))}
      </select>

      <select
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
        className="rounded-lg border border-inkwash bg-white px-3 py-1.5 text-sm text-zinc-700 dark:bg-paper-dark dark:text-zinc-300"
      >
        <option value="">全部类型</option>
        {POEM_TYPES.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <label className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400">
        <input
          type="checkbox"
          checked={requiredOnly}
          onChange={(e) => onRequiredChange(e.target.checked)}
          className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-600"
        />
        仅看必背
      </label>
    </div>
  );
}
