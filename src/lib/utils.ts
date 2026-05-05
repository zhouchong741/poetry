import type { PoemPreview } from '@/types/poem';

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function searchPoems<T extends Pick<PoemPreview, 'title' | 'author' | 'text'>>(
  poems: readonly T[],
  query: string,
): T[] {
  const q = query.trim().toLowerCase();
  if (!q) return [...poems];

  const scored = poems.map((poem) => {
    let score = 0;
    const titleLower = poem.title.toLowerCase();
    const authorLower = poem.author.toLowerCase();
    const textJoined = poem.text.join('').toLowerCase();

    if (titleLower === q) score += 100;
    else if (titleLower.startsWith(q)) score += 80;
    else if (titleLower.includes(q)) score += 60;

    if (authorLower.includes(q)) score += 40;

    if (textJoined.includes(q)) score += 20;

    return { poem, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.poem);
}

export function getGradeRange(grade: number): string {
  const age = grade + 5;
  return `${age}-${age + 1}岁`;
}

export function displayDynasty(dynasty: string): string {
  const short: Record<string, string> = {
    '唐代': '唐',
    '宋代': '宋',
    '元代': '元',
    '明代': '明',
    '清代': '清',
  };
  return short[dynasty] || dynasty;
}
