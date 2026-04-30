export default function TranslationBlock({ translation }: { translation: string }) {
  return (
    <section>
      <h3 className="mb-2 text-sm font-medium text-zinc-500">白话译文</h3>
      <p className="font-songti text-base leading-7 text-ink">{translation}</p>
    </section>
  );
}
