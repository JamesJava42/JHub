import { useMemo, useState } from 'react';
import TopicCard from '../components/TopicCard';
import ArticlePreview from '../components/ArticlePreview';
import { getAllTopics, getAllArticles } from '../lib/content';

export default function SearchPage({ topics, articles }) {
  const [query, setQuery] = useState('');
  const text = query.toLowerCase().trim();

  const filteredTopics = useMemo(() => {
    if (!text) return topics;
    return topics.filter((topic) => {
      return (
        topic.title.toLowerCase().includes(text) ||
        topic.description.toLowerCase().includes(text) ||
        topic.tags.some((tag) => tag.toLowerCase().includes(text))
      );
    });
  }, [topics, text]);

  const filteredArticles = useMemo(() => {
    if (!text) return articles;
    return articles.filter((article) => {
      return (
        article.title.toLowerCase().includes(text) ||
        article.summary.toLowerCase().includes(text) ||
        article.tags.some((tag) => tag.toLowerCase().includes(text))
      );
    });
  }, [articles, text]);

  return (
    <div>
      <section style={{ marginBottom: '2rem' }}>
        <p className="eyebrow">Search</p>
        <h1 className="section-title">Find the Java concept or article you need</h1>
        <p className="section-subtitle">Search across topics, tags, and article summaries to go directly to the best learning resource.</p>
      </section>

      <div style={{ marginBottom: '2rem' }}>
        <input
          type="search"
          className="search-input"
          placeholder="Search topics, tags, or keywords like reflection, concurrency, Spring..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <section style={{ marginBottom: '2rem' }}>
        <div className="section-header">
          <div>
            <h2 className="section-title">Topics</h2>
            <p className="section-subtitle">Browse matching topic clusters.</p>
          </div>
          <span style={{ color: '#6b7280' }}>{filteredTopics.length} results</span>
        </div>
        <div className="grid grid-2">
          {filteredTopics.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} />
          ))}
        </div>
      </section>

      <section>
        <div className="section-header">
          <div>
            <h2 className="section-title">Articles</h2>
            <p className="section-subtitle">Read the most relevant article content for your search.</p>
          </div>
          <span style={{ color: '#6b7280' }}>{filteredArticles.length} results</span>
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
