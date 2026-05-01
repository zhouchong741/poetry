export default function PoemText({ text }: { text: string[] }) {
  return (
    <div className="font-songti text-lg leading-10 text-ink dark:text-zinc-200">
      {text.map((line, i) => (
        <p key={i} className="text-center">
          {line}
        </p>
      ))}
    </div>
  );
}
