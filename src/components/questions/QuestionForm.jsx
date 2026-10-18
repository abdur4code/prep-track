import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function QuestionForm({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});

  const titleRef = useRef(null);

  // Close on Escape key & trap/restore body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    // Autofocus title input
    titleRef.current?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    if (errors.title) {
      const trimmed = val.trim();
      if (trimmed.length >= 3 && trimmed.length <= 120) {
        setErrors((prev) => ({ ...prev, title: '' }));
      }
    }
  };

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setCategory(val);
    if (errors.category && val) {
      setErrors((prev) => ({ ...prev, category: '' }));
    }
  };

  const handleDifficultyChange = (e) => {
    const val = e.target.value;
    setDifficulty(val);
    if (errors.difficulty && val) {
      setErrors((prev) => ({ ...prev, difficulty: '' }));
    }
  };

  const handleStatusChange = (e) => {
    const val = e.target.value;
    setStatus(val);
    if (errors.status && val) {
      setErrors((prev) => ({ ...prev, status: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const newErrors = {};

    if (!trimmedTitle) {
      newErrors.title = 'Title is required';
    } else if (trimmedTitle.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if (trimmedTitle.length > 120) {
      newErrors.title = 'Title must not exceed 120 characters';
    }

    if (!category) {
      newErrors.category = 'Please select a category';
    }
    if (!difficulty) {
      newErrors.difficulty = 'Please select a difficulty';
    }
    if (!status) {
      newErrors.status = 'Please select a status';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      title: trimmedTitle,
      category,
      difficulty,
      status,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-zinc-950/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-t-2xl sm:rounded-xl shadow-xl overflow-y-auto max-h-[90vh] p-6 transition-all"
      >
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <h2
            id="modal-title"
            className="text-base font-semibold text-zinc-900 dark:text-zinc-100"
          >
            Add Practice Question
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Title Field */}
          <div>
            <label
              htmlFor="question-title"
              className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1"
            >
              Title
            </label>
            <input
              ref={titleRef}
              id="question-title"
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="e.g. Implement Debounce with cancel"
              className={`w-full h-10 px-3 text-sm rounded-lg border bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus-visible:outline-none focus-visible:ring-2 transition-colors ${
                errors.title
                  ? 'border-red-500 focus-visible:ring-red-500'
                  : 'border-zinc-200 dark:border-zinc-800 focus-visible:ring-brand'
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {errors.title}
              </p>
            )}
          </div>

          {/* Category Field */}
          <div>
            <label
              htmlFor="question-category"
              className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1"
            >
              Category
            </label>
            <select
              id="question-category"
              value={category}
              onChange={handleCategoryChange}
              className={`w-full h-10 px-3 text-sm rounded-lg border bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 focus-visible:outline-none focus-visible:ring-2 transition-colors cursor-pointer ${
                errors.category
                  ? 'border-red-500 focus-visible:ring-red-500'
                  : 'border-zinc-200 dark:border-zinc-800 focus-visible:ring-brand'
              }`}
            >
              <option value="">Select category...</option>
              <option value="DSA">DSA</option>
              <option value="Git/GitHub">Git/GitHub</option>
              <option value="Technical">Technical</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {errors.category}
              </p>
            )}
          </div>

          {/* Difficulty Field */}
          <div>
            <label
              htmlFor="question-difficulty"
              className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1"
            >
              Difficulty
            </label>
            <select
              id="question-difficulty"
              value={difficulty}
              onChange={handleDifficultyChange}
              className={`w-full h-10 px-3 text-sm rounded-lg border bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 focus-visible:outline-none focus-visible:ring-2 transition-colors cursor-pointer ${
                errors.difficulty
                  ? 'border-red-500 focus-visible:ring-red-500'
                  : 'border-zinc-200 dark:border-zinc-800 focus-visible:ring-brand'
              }`}
            >
              <option value="">Select difficulty...</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            {errors.difficulty && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {errors.difficulty}
              </p>
            )}
          </div>

          {/* Status Field */}
          <div>
            <label
              htmlFor="question-status"
              className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1"
            >
              Status
            </label>
            <select
              id="question-status"
              value={status}
              onChange={handleStatusChange}
              className={`w-full h-10 px-3 text-sm rounded-lg border bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 focus-visible:outline-none focus-visible:ring-2 transition-colors cursor-pointer ${
                errors.status
                  ? 'border-red-500 focus-visible:ring-red-500'
                  : 'border-zinc-200 dark:border-zinc-800 focus-visible:ring-brand'
              }`}
            >
              <option value="">Select status...</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {errors.status}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-10 px-4 rounded-lg bg-brand hover:bg-brand-hover text-white dark:text-zinc-950 text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900 shadow-xs"
            >
              Add question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
