import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'jsh_quiz_results';

export function useQuizResults() {
  const [results, setResults] = useState({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setResults(JSON.parse(stored));
    } catch {}
  }, []);

  const saveResult = useCallback((topicSlug, score, total) => {
    const passed = score >= Math.ceil(total * 0.8);
    setResults((prev) => {
      const next = {
        ...prev,
        [topicSlug]: { score, total, passed, completedAt: new Date().toISOString() },
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
    return passed;
  }, []);

  const getResult = useCallback((topicSlug) => results[topicSlug] || null, [results]);
  const hasPassed = useCallback((topicSlug) => results[topicSlug]?.passed === true, [results]);

  return { results, saveResult, getResult, hasPassed };
}
