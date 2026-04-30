import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h2 className="mb-4 text-2xl font-bold text-ink">页面未找到</h2>
      <p className="mb-6 text-zinc-500 dark:text-zinc-400">您访问的页面不存在</p>
      <Link
        href="/"
        className="rounded-lg bg-ink px-6 py-2 text-sm text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600"
      >
        返回首页
      </Link>
    </div>
  );
}
