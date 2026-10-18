import { useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/localStorage';

const THEME_KEY = 'preptrack_theme';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const isSystemDark =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    return loadFromStorage(THEME_KEY, isSystemDark ? 'dark' : 'light');
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    saveToStorage(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
}
