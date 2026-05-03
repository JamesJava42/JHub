import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'jsh_read_articles';

export function useProgress() {
  const [readArticles, setReadArticles] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setReadArticles(JSON.parse(stored));
    } catch {}
  }, []);

  const markRead = useCallback((slug) => {
    setReadArticles((prev) => {
      if (prev.includes(slug)) return prev;
      const next = [...prev, slug];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const isRead = useCallback((slug) => readArticles.includes(slug), [readArticles]);

  function getTopicProgress(topicSlug, topicArticles) {
    if (!topicArticles || topicArticles.length === 0) return 0;
    const readCount = topicArticles.filter((a) => readArticles.includes(a.slug)).length;
    return Math.round((readCount / topicArticles.length) * 100);
  }

  function getOverallProgress(allTopicsWithArticles) {
    const total = allTopicsWithArticles.reduce((sum, t) => sum + t.articles.length, 0);
    if (total === 0) return 0;
    const read = allTopicsWithArticles.reduce(
      (sum, t) => sum + t.articles.filter((a) => readArticles.includes(a.slug)).length,
      0
    );
    return Math.round((read / total) * 100);
  }

  return { readArticles, markRead, isRead, getTopicProgress, getOverallProgress };
}
