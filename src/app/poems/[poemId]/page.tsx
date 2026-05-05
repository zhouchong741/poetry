import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import { getPoemById, getAllPoems } from '@/lib/poems';
import BackButton from '@/components/ui/BackButton';
import Badge from '@/components/ui/Badge';
import PoemText from '@/components/poem/PoemText';
import AnnotationsAccordion from '@/components/poem/AnnotationsAccordion';
import TranslationBlock from '@/components/poem/TranslationBlock';
import { displayDynasty } from '@/lib/utils';

export async function generateStaticParams() {
  return getAllPoems().map((p) => ({ poemId: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ poemId: string }> }): Promise<Metadata> {
  const { poemId } = await params;
  const poem = getPoemById(poemId);
  if (!poem) return {};
  return {
    title: poem.title,
    description: `${displayDynasty(poem.dynasty)} · ${poem.author} · ${poem.text.slice(0, 2).join('')}`,
  };
}

export default async function PoemPage({ params }: { params: Promise<{ poemId: string }> }) {
  const { poemId } = await params;
  const poem = getPoemById(poemId);
  if (!poem) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6">
        <BackButton />
      </div>

      <header className="mb-6 text-center">
        <h1 className="mb-2 text-3xl font-bold text-ink">{poem.title}</h1>
        <p className="mb-3 text-base text-zinc-500 dark:text-zinc-400">
          {displayDynasty(poem.dynasty)} · {poem.author}
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="type">{poem.type}</Badge>
          {poem.isRequired && <Badge variant="required">必背</Badge>}
        </div>
      </header>

      <section
        className={`relative mb-8 overflow-hidden rounded-lg shadow-sm ${poem.image ? 'bg-transparent' : 'bg-white dark:bg-paper-dark'}`}
      >
        {poem.image && (
          <>
            <Image
              src={poem.image}
              alt=""
              fill
              unoptimized
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ transform: 'scale(1.15)' }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/60 to-white/80 dark:from-black/80 dark:via-black/70 dark:to-black/85" aria-hidden="true" />
            <div className="relative z-10 flex min-h-[280px] items-center justify-center px-6 py-8">
              <PoemText text={poem.text} />
            </div>
          </>
        )}
        {!poem.image && (
          <div className="p-6">
            <PoemText text={poem.text} />
          </div>
        )}
      </section>

      <div className="space-y-4">
        <AnnotationsAccordion annotations={poem.annotations} />

        <section className="rounded-lg border border-inkwash bg-white p-4 dark:bg-paper-dark">
          <TranslationBlock translation={poem.translation} />
        </section>

        {poem.background && (
          <section className="rounded-lg border border-inkwash bg-white p-4 dark:bg-paper-dark">
            <h3 className="mb-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">创作背景</h3>
            <p className="text-sm leading-6 text-ink">{poem.background}</p>
          </section>
        )}

        {poem.appreciation && (
          <section className="rounded-lg border border-inkwash bg-white p-4 dark:bg-paper-dark">
            <h3 className="mb-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">赏析</h3>
            <p className="text-sm leading-6 text-ink">{poem.appreciation}</p>
          </section>
        )}
      </div>
    </article>
  );
}
