import Link from 'next/link';
import { GRADE_COLORS } from '@/lib/constants';
import type { GradeMeta } from '@/types/poem';

export default function GradeCard({ grade }: { grade: GradeMeta }) {
  const stage = grade.id <= 6 ? '小学' : grade.id <= 9 ? '初中' : '高中';
  const colorClasses = GRADE_COLORS[grade.id] || 'bg-zinc-50 border-zinc-200';

  return (
    <Link
      href={`/grade/${grade.id}`}
      className={`group flex flex-col gap-1 rounded-lg border-2 p-5 transition-all ${colorClasses}`}
    >
      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{stage}</span>
      <span className="text-xl font-bold text-ink">{grade.label}</span>
      <span className="text-sm text-zinc-500 dark:text-zinc-400">
        {grade.poemCount} 首 · {grade.requiredCount} 首必背
      </span>
    </Link>
  );
}
