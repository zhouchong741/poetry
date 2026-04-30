import Link from 'next/link';

export default function PoemNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h2 className="mb-4 text-2xl font-bold text-ink">未找到该古诗</h2>
      <p className="mb-6 text-zinc-500 dark:text-zinc-400">您访问的古诗不存在或已被移除</p>
      <Link
        href="/"
        className="rounded-lg bg-ink px-6 py-2 text-sm text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600"
      >
        返回首页
      </Link>
    </div>
  );
}
