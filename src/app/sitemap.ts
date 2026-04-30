import { MetadataRoute } from 'next';
import { getAllPoems, getDynasties, getGrades } from '@/lib/poems';

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

  const poemPages = getAllPoems().map((p) => ({
    url: `${baseUrl}/poems/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...gradePages, ...dynastyPages, ...poemPages];
}
