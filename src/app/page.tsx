import GradeGrid from '@/components/grade/GradeGrid';
import { getGrades, getStats, getDynasties } from '@/lib/poems';
import Link from 'next/link';

export default function Home() {
  const grades = getGrades();
  const stats = getStats();
  const dynasties = getDynasties();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <section className="mb-10 text-center">
        <h1 className="mb-2 text-3xl font-bold text-ink">
          中国古典诗词
        </h1>
        <p className="text-lg text-zinc-500">
          覆盖 {stats.totalGrades} 个年级 · {stats.totalDynasties} 个朝代 · 共 {stats.totalPoems} 篇
        </p>
      </section>

      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">按年级浏览</h2>
        </div>
        <GradeGrid grades={grades} />
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold text-ink">按朝代浏览</h2>
        <div className="flex flex-wrap gap-2">
          {dynasties.map((d) => (
            <Link
              key={d.id}
              href={`/dynasty/${d.id}`}
              className="rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm text-amber-800 transition-colors hover:bg-amber-100"
            >
              {d.label}（{d.count}）
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
