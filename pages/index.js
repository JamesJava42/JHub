import { useMemo, useState } from 'react';
import { getAllTopics, getAllArticles } from '../lib/content';
import TopicCard from '../components/TopicCard';
import ArticlePreview from '../components/ArticlePreview';

export default function Home({ topics, articles }) {
  const [query, setQuery] = useState('');

  const filteredArticles = useMemo(() => {
    const text = query.toLowerCase().trim();
    if (!text) return articles;
    return articles.filter((article) => {
      return (
        article.title.toLowerCase().includes(text) ||
        article.summary.toLowerCase().includes(text) ||
        article.tags.some((tag) => tag.toLowerCase().includes(text))
      );
    });
  }, [articles, query]);

  return (
    <div>
      <section style={{ marginBottom: '2.5rem' }}>
        <p style={{ margin: 0, color: '#2563eb', fontWeight: 700 }}>Java Learning Hub</p>
        <h1 className="section-title">Learn Java concepts with clear, search-driven articles.</h1>
        <p className="section-subtitle">A topic-first study experience, built for interview prep and deep conceptual understanding.</p>
      </section>

      <section id="topics" style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem' }}>
          <div>
            <h2 className="section-title">Core Java Topics</h2>
            <p className="section-subtitle">Browse the major topic clusters and open the articles that matter most.</p>
          </div>
          <span style={{ color: '#6b7280' }}>{topics.length} topics available</span>
        </div>
        <div className="grid grid-2" style={{ marginTop: '1rem' }}>
          {topics.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} />
          ))}
        </div>
      </section>

      <section id="articles">
        <div style={{ marginBottom: '1rem' }}>
          <h2 className="section-title">Featured Articles</h2>
          <p className="section-subtitle">Search by keyword, topic, or tag.</p>
          <input
            type="search"
            className="search-input"
            placeholder="Search reflection, volatile, proxy, annotations..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <div className="grid grid-2">
          {filteredArticles.map((article) => (
            <ArticlePreview key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}

export function getStaticProps() {
  return {
    props: {
      topics: getAllTopics(),
      articles: getAllArticles(),
    },
  };
}
