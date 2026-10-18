import { Trash2 } from 'lucide-react';

export default function QuestionItem({ question, onUpdateStatus, onDelete }) {
  const { id, title, category, difficulty, status } = question;

  // Compute status badge styling: Pending = neutral grey, In Progress = soft amber, Completed = brand
  const getStatusStyle = (currentStatus) => {
    switch (currentStatus) {
      case 'Completed':
        return 'bg-brand-subtle text-brand border-brand/30';
      case 'In Progress':
        return 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60';
      case 'Pending':
      default:
        return 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700';
    }
  };

  return (
    <div className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/30 border-b border-zinc-100 dark:border-zinc-800/60 last:border-b-0 transition-colors">
      {/* Desktop Layout: Aligned Columns */}
      <div className="hidden md:grid md:grid-cols-12 md:items-center md:gap-4 px-5 py-3.5">
        {/* Title */}
        <div className="col-span-5 min-w-0 pr-2">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
            {title}
          </p>
        </div>

        {/* Category (plain neutral outlined chip) */}
        <div className="col-span-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/60">
            {category}
          </span>
        </div>

        {/* Difficulty (plain neutral outlined chip) */}
        <div className="col-span-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/60">
            {difficulty}
          </span>
        </div>

        {/* Status Control */}
        <div className="col-span-2">
          <label htmlFor={`status-desktop-${id}`} className="sr-only">
            Update status for {title}
          </label>
          <select
            id={`status-desktop-${id}`}
            value={status}
            onChange={(e) => onUpdateStatus(id, e.target.value)}
            className={`h-8 px-2.5 text-xs font-medium rounded-md border cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand transition-colors ${getStatusStyle(
              status
            )}`}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Delete Action */}
        <div className="col-span-1 flex justify-end">
          <button
            type="button"
            onClick={() => onDelete(id)}
            aria-label={`Delete question ${title}`}
            title="Delete question"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Layout: Stacked Card */}
      <div className="md:hidden p-4 space-y-3">
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {title}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
            {category}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
            {difficulty}
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div>
            <label htmlFor={`status-mobile-${id}`} className="sr-only">
              Update status for {title}
            </label>
            <select
              id={`status-mobile-${id}`}
              value={status}
              onChange={(e) => onUpdateStatus(id, e.target.value)}
              className={`h-9 px-3 text-xs font-medium rounded-md border cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand transition-colors ${getStatusStyle(
                status
              )}`}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => onDelete(id)}
            aria-label={`Delete question ${title}`}
            className="p-2 rounded-lg text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
