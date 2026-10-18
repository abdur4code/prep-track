import { LayoutDashboard, ListTodo } from 'lucide-react';

export default function Sidebar({ activeSection = 'overview' }) {
  const navItems = [
    { id: 'overview', label: 'Overview', href: '#overview', icon: LayoutDashboard },
    { id: 'questions', label: 'Questions', href: '#questions', icon: ListTodo },
  ];

  return (
    <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 w-60 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-5 z-30 justify-between">
      <div>
        {/* Brand mark and name */}
        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 flex items-center justify-center font-semibold text-xs tracking-wider">
            PT
          </div>
          <span className="font-semibold text-base tracking-tight text-zinc-900 dark:text-zinc-100">
            PrepTrack
          </span>
        </div>

        {/* Navigation items */}
        <nav className="mt-8 space-y-1">
          {navItems.map(({ id, label, href, icon: Icon }) => {
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-brand-subtle text-brand font-medium'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{label}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
