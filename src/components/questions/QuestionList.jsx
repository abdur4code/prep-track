import { Plus, ListPlus, SearchX } from 'lucide-react';
import QuestionItem from './QuestionItem';

export default function QuestionList({
  questions,
  filteredQuestions,
  onUpdateStatus,
  onDelete,
  onOpenAddModal,
  onClearFilters,
}) {
  // Empty State: No questions tracked at all
  if (questions.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-12 text-center flex flex-col items-center justify-center transition-colors">
        <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 flex items-center justify-center mb-4">
          <ListPlus className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          No practice questions yet
        </h3>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
          Start your preparation journey by adding your first coding problem or technical topic.
        </p>
        <button
          type="button"
          onClick={onOpenAddModal}
          className="mt-5 h-10 px-4 rounded-lg bg-brand hover:bg-brand-hover text-white dark:text-zinc-950 font-medium text-sm transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add your first question</span>
        </button>
      </div>
    );
  }

  // No-Results State: Questions exist, but current filters match nothing
  if (filteredQuestions.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-12 text-center flex flex-col items-center justify-center transition-colors">
        <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 flex items-center justify-center mb-4">
          <SearchX className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          No questions match your filters
        </h3>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
          Try adjusting your search terms or clearing current filter selections to view questions.
        </p>
        <button
          type="button"
          onClick={onClearFilters}
          className="mt-5 h-10 px-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium text-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          Clear filters
        </button>
      </div>
    );
  }

  // Populated Question List
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden transition-colors">
      {/* Desktop Column Headers */}
      <div className="hidden md:grid md:grid-cols-12 md:gap-4 px-5 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
        <div className="col-span-5">Title</div>
        <div className="col-span-2">Category</div>
        <div className="col-span-2">Difficulty</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-1 text-right">Action</div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
        {filteredQuestions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onUpdateStatus={onUpdateStatus}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
