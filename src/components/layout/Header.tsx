import Link from 'next/link';
import { SITE_TITLE } from '@/lib/constants';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-inkwash bg-paper/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold text-ink">
          {SITE_TITLE}
        </Link>
        <div className="flex items-center gap-4 text-sm text-zinc-600">
          <Link href="/" className="transition-colors hover:text-ink">
            首页
          </Link>
          <Link href="/search" className="transition-colors hover:text-ink">
            搜索
          </Link>
        </div>
      </nav>
    </header>
  );
}
