import type { GradeMeta } from '@/types/poem';
import GradeCard from './GradeCard';

export default function GradeGrid({ grades }: { grades: GradeMeta[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {grades.map((grade) => (
        <GradeCard key={grade.id} grade={grade} />
      ))}
    </div>
  );
}
