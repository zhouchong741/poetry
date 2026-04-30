'use client';

import { useState } from 'react';
import type { Annotation } from '@/types/poem';

export default function AnnotationsAccordion({ annotations }: { annotations: Annotation[] }) {
  const [open, setOpen] = useState(false);

  if (annotations.length === 0) return null;

  return (
    <div className="rounded-lg border border-inkwash bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-ink transition-colors hover:bg-zinc-50"
      >
        <span>注释（{annotations.length}）</span>
        <svg
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && (
        <div className="border-t border-inkwash px-4 py-3">
          <dl className="space-y-2">
            {annotations.map((a, i) => (
              <div key={i} className="flex gap-2 text-sm">
                <dt className="shrink-0 font-medium text-crimson">{a.term}</dt>
                <dd className="text-zinc-600">{a.explanation}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
