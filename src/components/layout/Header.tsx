import Link from 'next/link';
import { SITE_TITLE } from '@/lib/constants';
import ThemeToggle from '@/components/layout/ThemeToggle';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-inkwash bg-paper/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold text-ink">
          {SITE_TITLE}
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/" className="rounded-lg px-2 py-1 text-zinc-600 transition-colors hover:bg-inkwash/60 hover:text-ink dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white">
            首页
          </Link>
          <Link href="/search" className="rounded-lg px-2 py-1 text-zinc-600 transition-colors hover:bg-inkwash/60 hover:text-ink dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white">
            搜索
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
