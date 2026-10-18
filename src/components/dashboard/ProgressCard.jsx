export default function ProgressCard({ total, completed, progress }) {
  // SVG circular geometry
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  // Calculate offset safely, clamping between 0 and 100
  const validProgress = Math.min(Math.max(progress || 0, 0), 100);
  const strokeDashoffset = circumference - (validProgress / 100) * circumference;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 sm:p-6 transition-colors">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            Target Completion
          </span>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Overall Practice Progress
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {completed} of {total} completed
          </p>
        </div>

        {/* Circular Progress Ring */}
        <div className="flex items-center gap-4 self-center sm:self-auto">
          <div className="relative w-20 h-20 shrink-0">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              {/* Background ring */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="text-zinc-100 dark:text-zinc-800 stroke-current"
                strokeWidth="8"
                fill="none"
              />
              {/* Active progress ring */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="text-brand stroke-current transition-all duration-700 ease-out"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset,
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
                {validProgress}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
