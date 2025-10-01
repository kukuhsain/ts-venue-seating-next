import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

/**
 * Custom hook to manage dark mode state
 * @returns A tuple of [isDarkMode, toggleDarkMode]
 */
export function useDarkMode(): [boolean, () => void] {
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>('dark-mode', false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return [isDarkMode, toggleDarkMode];
}

