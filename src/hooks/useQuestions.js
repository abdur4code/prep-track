import { useState, useEffect, useMemo } from 'react';
import { initialQuestions } from '../data/initialQuestions';
import { loadFromStorage, saveToStorage } from '../utils/localStorage';

const STORAGE_KEY = 'preptrack_questions';

export function useQuestions() {
  const [questions, setQuestions] = useState(() => {
    return loadFromStorage(STORAGE_KEY, initialQuestions);
  });

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    saveToStorage(STORAGE_KEY, questions);
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return questions.filter((q) => {
      if (query && !q.title.toLowerCase().includes(query)) {
        return false;
      }
      if (categoryFilter !== 'All' && q.category !== categoryFilter) {
        return false;
      }
      if (difficultyFilter !== 'All' && q.difficulty !== difficultyFilter) {
        return false;
      }
      if (statusFilter !== 'All' && q.status !== statusFilter) {
        return false;
      }
      return true;
    });
  }, [questions, searchQuery, categoryFilter, difficultyFilter, statusFilter]);

  const stats = useMemo(() => {
    const initial = {
      total: questions.length,
      completedDsa: 0,
      completedTechnical: 0,
      completed: 0,
    };

    const counts = questions.reduce((acc, q) => {
      if (q.status === 'Completed') {
        acc.completed += 1;
        if (q.category === 'DSA') {
          acc.completedDsa += 1;
        } else if (q.category === 'Technical') {
          acc.completedTechnical += 1;
        }
      }
      return acc;
    }, initial);

    const progress = counts.total > 0
      ? Math.round((counts.completed / counts.total) * 100)
      : 0;

    return {
      ...counts,
      progress,
    };
  }, [questions]);

  const addQuestion = ({ title, category, difficulty, status }) => {
    const newQuestion = {
      id: `q-${crypto.randomUUID()}`,
      title: title.trim(),
      category,
      difficulty,
      status,
    };
    setQuestions((prev) => [newQuestion, ...prev]);
  };

  const updateStatus = (id, newStatus) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
    );
  };

  const deleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setCategoryFilter('All');
    setDifficultyFilter('All');
    setStatusFilter('All');
  };

  const hasActiveFilters = Boolean(
    searchQuery.trim() ||
    categoryFilter !== 'All' ||
    difficultyFilter !== 'All' ||
    statusFilter !== 'All'
  );

  return {
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
  };
}
