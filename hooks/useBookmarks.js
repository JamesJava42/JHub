import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'jsh_bookmarks';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setBookmarks(JSON.parse(stored));
    } catch {
      // ignore parse errors
    }
  }, []);

  const toggle = useCallback((slug) => {
    setBookmarks((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const isBookmarked = useCallback((slug) => bookmarks.includes(slug), [bookmarks]);

  return { bookmarks, toggle, isBookmarked };
}
