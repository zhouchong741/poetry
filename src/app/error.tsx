'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h2 className="mb-4 text-2xl font-bold text-ink">出错了</h2>
      <p className="mb-6 text-zinc-500">页面加载出现问题，请稍后重试</p>
      <button
        onClick={reset}
        className="rounded-lg bg-ink px-6 py-2 text-sm text-white transition-colors hover:bg-zinc-700"
      >
        重新加载
      </button>
    </div>
  );
}
