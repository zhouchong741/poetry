'use client';

type Theme = 'light' | 'dark';

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
  localStorage.setItem('theme', theme);
}

export default function ThemeToggle() {
  const toggle = () => {
    const isDark = document.documentElement.classList.contains('dark');
    const nextTheme: Theme = isDark ? 'light' : 'dark';
    applyTheme(nextTheme);
  };

  return (
    <button
      onClick={toggle}
      className="ml-2 rounded-lg p-2 text-zinc-500 transition-colors hover:bg-inkwash hover:text-ink dark:text-zinc-400 dark:hover:text-ink"
      aria-label="切换主题"
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
    </button>
  );
}
