'use client';

import { useEffect, useMemo, useState } from 'react';
import type { PoemPreview } from '@/types/poem';
import { SEARCH_INDEX_PATH } from '@/lib/constants';
import { searchPoems } from '@/lib/utils';
import PoemCard from '@/components/poem/PoemCard';
import EmptyState from '@/components/ui/EmptyState';
import BackButton from '@/components/ui/BackButton';

let searchIndexPromise: Promise<PoemPreview[]> | null = null;

async function loadSearchIndex() {
  if (!searchIndexPromise) {
    searchIndexPromise = fetch(SEARCH_INDEX_PATH).then(async (response) => {
      if (!response.ok) {
        throw new Error(`failed to load search index: ${response.status}`);
      }

      return response.json() as Promise<PoemPreview[]>;
    });
  }

  return searchIndexPromise;
}

function readInitialQuery() {
  if (typeof window === 'undefined') {
    return '';
  }

  return new URLSearchParams(window.location.search).get('q') || '';
}

export default function SearchClient() {
  const [query, setQuery] = useState(readInitialQuery);
  const [poems, setPoems] = useState<PoemPreview[] | null>(null);
  const [loading, setLoading] = useState(() => Boolean(readInitialQuery().trim()));
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!query.trim()) return;

    let cancelled = false;
    loadSearchIndex()
      .then((entries) => {
        if (cancelled) return;
        setPoems(entries);
        setLoadError(false);
      })
      .catch(() => {
        if (cancelled) return;
        setLoadError(true);
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [query]);

  const ensureIndexLoaded = async () => {
    if (poems || loading) {
      return;
    }

    setLoading(true);
    try {
      const entries = await loadSearchIndex();
      setPoems(entries);
      setLoadError(false);
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  };

  const updateUrl = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value.trim()) {
      params.set('q', value);
    } else {
      params.delete('q');
    }

    const nextUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
    window.history.replaceState(null, '', nextUrl);
  };

  const handleChange = async (value: string) => {
    setQuery(value);
    updateUrl(value);
    if (value.trim()) {
      await ensureIndexLoaded();
    }
  };

  const results = useMemo(() => {
    if (!query.trim() || !poems) {
      return [];
    }

    return searchPoems(poems, query);
  }, [poems, query]);

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
          onFocus={() => {
            void ensureIndexLoaded();
          }}
          onChange={(event) => {
            void handleChange(event.target.value);
          }}
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
            onClick={() => {
              void handleChange('');
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {!query.trim() ? (
        <EmptyState message="输入关键词开始搜索" />
      ) : loadError ? (
        <EmptyState message="搜索索引加载失败，请刷新后重试" />
      ) : loading && !poems ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">正在加载搜索索引…</p>
      ) : (
        <>
          <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
            搜索 &ldquo;{query}&rdquo;，找到 {results.length} 个结果
          </p>

          {results.length === 0 ? (
            <EmptyState message="没有找到匹配的古诗" />
          ) : (
            <div className="space-y-3">
              {results.map((poem) => (
                <PoemCard key={poem.id} poem={poem} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
