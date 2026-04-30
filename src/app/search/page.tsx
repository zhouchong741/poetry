'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getAllPoems } from '@/lib/poems';
import { searchPoems } from '@/lib/utils';
import PoemCard from '@/components/poem/PoemCard';
import EmptyState from '@/components/ui/EmptyState';
import BackButton from '@/components/ui/BackButton';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const poems = useMemo(() => getAllPoems(), []);
  const results = useMemo(() => {
    if (!query.trim()) return poems;
    return searchPoems(poems, query);
  }, [poems, query]);

  const handleChange = (value: string) => {
    setQuery(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set('q', value);
    } else {
      params.delete('q');
    }
    router.replace(`/search?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6">
        <BackButton />
      </div>

      <h1 className="mb-6 text-2xl font-bold text-ink">搜索古诗</h1>

      <div className="relative mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="搜索标题、作者或诗句……"
          className="w-full rounded-lg border border-inkwash bg-white px-4 py-3 pl-10 text-base text-ink outline-none transition-colors focus:border-zinc-400 dark:bg-paper-dark dark:focus:border-zinc-500"
          autoFocus
        />
        <svg
          className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        {query && (
          <button
            onClick={() => handleChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {query.trim() && (
        <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
          搜索 &ldquo;{query}&rdquo;，找到 {results.length} 个结果
        </p>
      )}

      {results.length === 0 ? (
        <EmptyState
          message={query.trim() ? '没有找到匹配的古诗' : '输入关键词开始搜索'}
        />
      ) : (
        <div className="space-y-3">
          {results.map((poem) => (
            <PoemCard key={poem.id} poem={poem} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
