import { useState, useEffect } from 'react';
import { ListTodo, Code2, Terminal, Sparkles } from 'lucide-react';
import { useQuestions } from './hooks/useQuestions';
import { useTheme } from './hooks/useTheme';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import MetricCard from './components/dashboard/MetricCard';
import ProgressCard from './components/dashboard/ProgressCard';
import QuestionFilters from './components/questions/QuestionFilters';
import QuestionList from './components/questions/QuestionList';
import QuestionForm from './components/questions/QuestionForm';

export default function App() {
  const {
    questions,
    filteredQuestions,
    stats,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    difficultyFilter,
    setDifficultyFilter,
    statusFilter,
    setStatusFilter,
    addQuestion,
    updateStatus,
    deleteQuestion,
    clearFilters,
    hasActiveFilters,
  } = useQuestions();

  const { theme, toggleTheme } = useTheme();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  // Track active section on scroll for sidebar navigation highlights
  useEffect(() => {
    const handleScroll = () => {
      const questionsEl = document.getElementById('questions');
      if (questionsEl) {
        const rect = questionsEl.getBoundingClientRect();
        if (rect.top <= 180) {
          setActiveSection('questions');
          return;
        }
      }
      setActiveSection('overview');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Machine-coding status indicator derived from completion percentage
  const getMachineCodingPill = (progress) => {
    if (progress === 0) {
      return {
        label: 'Not started',
        hasDot: false,
        className: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700',
      };
    }
    if (progress === 100) {
      return {
        label: 'Ready',
        hasDot: true,
        className: 'bg-brand-subtle text-brand border border-brand/30',
        dotClassName: 'bg-brand',
      };
    }
    return {
      label: 'In progress',
      hasDot: true,
      className: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60',
      dotClassName: 'bg-amber-500',
    };
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 flex">
      {/* Fixed Left Sidebar (lg and up) */}
      <Sidebar activeSection={activeSection} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-60 flex flex-col min-h-screen min-w-0">
        <Header
          onOpenAddModal={() => setIsAddModalOpen(true)}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-8">
          {/* Dashboard Overview Section */}
          <section id="overview" className="scroll-mt-20 space-y-4">
            <div>
              <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                Practice Overview
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Real-time tracking across interview topics and completion goals
              </p>
            </div>

            {/* 4 Metric Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <MetricCard
                label="Total Questions"
                value={stats.total}
                icon={ListTodo}
                hint="In your practice pipeline"
              />
              <MetricCard
                label="Completed DSA"
                value={stats.completedDsa}
                icon={Code2}
                hint="Data structures & algorithms"
              />
              <MetricCard
                label="Completed Technical"
                value={stats.completedTechnical}
                icon={Terminal}
                hint="Full-stack & system topics"
              />
              <MetricCard
                label="Machine Coding"
                pill={getMachineCodingPill(stats.progress)}
                icon={Sparkles}
                hint={`${stats.progress}% overall completion`}
              />
            </div>

            {/* Circular Progress Card */}
            <ProgressCard
              total={stats.total}
              completed={stats.completed}
              progress={stats.progress}
            />
          </section>

          {/* Questions Section */}
          <section id="questions" className="scroll-mt-20 space-y-4">
            <div>
              <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                Practice Questions
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Filter by topic, update progress, and curate your preparation list
              </p>
            </div>

            {/* Search and Filters */}
            <QuestionFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              difficultyFilter={difficultyFilter}
              setDifficultyFilter={setDifficultyFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              resultCount={filteredQuestions.length}
              totalCount={questions.length}
              onClearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
            />

            {/* Question List / Empty States */}
            <QuestionList
              questions={questions}
              filteredQuestions={filteredQuestions}
              onUpdateStatus={updateStatus}
              onDelete={deleteQuestion}
              onOpenAddModal={() => setIsAddModalOpen(true)}
              onClearFilters={clearFilters}
            />
          </section>
        </main>
      </div>

      {/* Add Question Modal */}
      <QuestionForm
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={addQuestion}
      />
    </div>
  );
}
