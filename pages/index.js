import { useMemo, useState } from 'react';
import Link from 'next/link';
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

  const featuredTopics = topics.slice(0, 6);
  const featuredArticles = filteredArticles.slice(0, 8);

  return (
    <div>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Java Learning Hub</p>
          <h1>Master Java faster with guided topic paths, interview-ready notes, and practice tasks.</h1>
          <p className="section-subtitle">Use the roadmap to pin the best next article, search instantly by topic or tag, and build durable Java knowledge.</p>
          <div className="hero-actions">
            <Link href="/roadmap" className="button-primary">Follow the Java roadmap</Link>
            <Link href="/search" className="secondary-button">Search the library</Link>
          </div>
          <div className="hero-stats">
            <div>
              <strong>{topics.length}+</strong>
              <p>Topic clusters</p>
            </div>
            <div>
              <strong>{articles.length}+</strong>
              <p>Deep concept articles</p>
            </div>
            <div>
              <strong>Practice</strong>
              <p>Tasks and review notes</p>
            </div>
          </div>
        </div>

        <aside className="hero-card card">
          <p className="eyebrow">Learning path</p>
          <h2>Get study-ready in 3 steps</h2>
          <ol className="roadmap-list">
            <li>Pick a topic from the roadmap and read a finished article.</li>
            <li>Practice the guided task and review the key takeaways.</li>
            <li>Move to the next concept with interview-ready summary notes.</li>
          </ol>
          <div style={{ marginTop: '1.5rem' }}>
            <Link href="/roadmap" className="link-cta">Open the full roadmap →</Link>
          </div>
        </aside>
      </section>

      <section id="articles" className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Search and learn</h2>
            <p className="section-subtitle">Find the exact Java concept you need, from reflection to concurrency and Spring internals.</p>
          </div>
        </div>
        <input
          type="search"
          className="search-input"
          placeholder="Search reflection, volatile, proxy, annotations..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="grid grid-2" style={{ marginTop: '1.5rem' }}>
          {featuredArticles.map((article) => (
            <ArticlePreview key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section id="topics" className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Learning paths</h2>
            <p className="section-subtitle">Follow sequenced topic clusters that work well together for interviews and real projects.</p>
          </div>
          <span style={{ color: '#6b7280' }}>{topics.length} total topics</span>
        </div>
        <div className="grid grid-2" style={{ marginTop: '1rem' }}>
          {featuredTopics.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Interview-ready practice</h2>
            <p className="section-subtitle">Turn concept review into strong answers with simple reminders and real-world examples.</p>
          </div>
        </div>
        <div className="stats-grid">
          <div className="mini-card">
            <h3>Fast answer drills</h3>
            <p>Build confidence by routing every concept through one clear interview takeaway.</p>
          </div>
          <div className="mini-card">
            <h3>Key concept summaries</h3>
            <p>Learn the difference between what Java does, why it matters, and how to explain it clearly.</p>
          </div>
          <div className="mini-card">
            <h3>Follow-up practice</h3>
            <p>Each article includes task-based practice to turn knowledge into real code skills.</p>
          </div>
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
