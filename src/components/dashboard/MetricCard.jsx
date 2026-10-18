export default function MetricCard({ label, value, icon: Icon, pill, hint }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 flex flex-col justify-between transition-colors">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          {label}
        </span>
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 flex items-center justify-center">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div>
        {pill ? (
          <div className="flex items-center">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${pill.className}`}
            >
              {pill.hasDot && (
                <span
                  className={`w-1.5 h-1.5 rounded-full mr-1.5 ${pill.dotClassName}`}
                />
              )}
              {pill.label}
            </span>
          </div>
        ) : (
          <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 tabular-nums">
            {value}
          </div>
        )}

        {hint && (
          <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
            {hint}
          </p>
        )}
      </div>
    </div>
  );
}
