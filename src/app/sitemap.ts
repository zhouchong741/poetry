import { MetadataRoute } from 'next';
import { getAllPoems, getDynasties, getGrades, getPoemsByDynastyPage } from '@/lib/poems';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zhouchong741.github.io/poetry';

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 1 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
  ];

  const gradePages = getGrades().map((g) => ({
    url: `${baseUrl}/grade/${g.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const dynastyPages = getDynasties().map((d) => ({
    url: `${baseUrl}/dynasty/${d.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const dynastyPaginationPages = getDynasties().flatMap((d) => {
    const { totalPages } = getPoemsByDynastyPage(d.label, 1);
    return Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => ({
      url: `${baseUrl}/dynasty/${d.id}/${index + 2}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  });

  const poemPages = getAllPoems().map((p) => ({
    url: `${baseUrl}/poems/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...gradePages, ...dynastyPages, ...dynastyPaginationPages, ...poemPages];
}
