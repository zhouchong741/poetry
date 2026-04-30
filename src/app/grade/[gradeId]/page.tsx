import { notFound } from 'next/navigation';
import { getPoemsByGrade, getGrades } from '@/lib/poems';
import PoemList from './PoemList';

export async function generateStaticParams() {
  return Array.from({ length: 12 }, (_, i) => ({ gradeId: String(i + 1) }));
}

export default async function GradePage({ params }: { params: Promise<{ gradeId: string }> }) {
  const { gradeId } = await params;
  const gradeNum = Number(gradeId);
  if (isNaN(gradeNum) || gradeNum < 1 || gradeNum > 12) notFound();

  const grades = getGrades();
  const grade = grades.find((g) => g.id === gradeNum);
  if (!grade) notFound();

  const poems = getPoemsByGrade(gradeNum);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-1 text-2xl font-bold text-ink">{grade.label}</h1>
      <p className="mb-6 text-sm text-zinc-500">
        共 {poems.length} 首，{poems.filter((p) => p.isRequired).length} 首必背
      </p>

      <PoemList poems={poems} />
    </div>
  );
}
