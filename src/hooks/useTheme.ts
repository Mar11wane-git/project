import { useCallback, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';
const KEY = 'theme';

function read(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(read);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f5f6f1' : '#0e110f');
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      /* storage unavailable: theme simply isn't remembered */
    }
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);
  return { theme, setTheme, toggle };
}
