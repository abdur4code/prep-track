import { Sun, Moon, Plus } from 'lucide-react';

export default function Header({ onOpenAddModal, theme, onToggleTheme }) {
  return (
    <header className="sticky top-0 z-20 h-16 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xs border-b border-zinc-200 dark:border-zinc-800 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Mobile brand (sidebar is hidden below lg) */}
      <div className="flex items-center gap-2.5 lg:hidden">
        <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 flex items-center justify-center font-semibold text-xs tracking-wider">
          PT
        </div>
        <span className="font-semibold text-base tracking-tight text-zinc-900 dark:text-zinc-100">
          PrepTrack
        </span>
      </div>

      {/* Desktop view title */}
      <div className="hidden lg:block">
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Practice Dashboard
        </h1>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="w-10 h-10 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>

        <button
          type="button"
          onClick={onOpenAddModal}
          className="h-10 px-4 rounded-lg bg-brand hover:bg-brand-hover text-white dark:text-zinc-950 font-medium text-sm transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900 shadow-xs"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span className="hidden sm:inline">Add question</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
    </header>
  );
}
