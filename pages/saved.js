import Link from 'next/link';
import { useBookmarks } from '../hooks/useBookmarks';
import { getAllArticles, getAllTopics } from '../lib/content';

export default function Saved({ articles, topics }) {
  const { bookmarks, toggle, isBookmarked } = useBookmarks();

  const savedArticles = articles.filter((a) => bookmarks.includes(a.slug));
  const savedTopics = topics.filter((t) => bookmarks.includes(t.slug));

  return (
    <div>
      <section style={{ marginBottom: '2rem' }}>
        <p className="eyebrow">Saved</p>
        <h1 className="section-title">Your bookmarks</h1>
        <p className="section-subtitle">Articles and topics you saved for later. Bookmarks are stored locally in your browser.</p>
      </section>

      {bookmarks.length === 0 ? (
        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>No bookmarks yet</h2>
          <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>
            Click the &quot;Save&quot; button on any article or topic page to bookmark it here.
          </p>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/roadmap" className="button-primary">Browse roadmap</Link>
            <Link href="/topics" className="secondary-button">Explore topics</Link>
          </div>
        </div>
      ) : (
        <>
          {savedArticles.length > 0 && (
            <section className="section">
              <h2 className="section-title">Saved articles ({savedArticles.length})</h2>
              <div className="grid grid-2" style={{ marginTop: '1rem' }}>
                {savedArticles.map((article) => (
                  <div key={article.slug} className="card" style={{ padding: '1rem' }}>
                    <h3>{article.title}</h3>
                    <p style={{ color: '#4b5563', marginTop: '0.5rem', fontSize: '0.875rem' }}>{article.summary}</p>
                    <div className="tag-row" style={{ marginTop: '0.75rem' }}>
                      {article.tags.map((tag) => (
                        <span className="tag" key={tag}>{tag}</span>
                      ))}
                    </div>
                    <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <Link href={`/article/${article.slug}`} className="link-cta">Open article →</Link>
                      <button
                        className="nav-action"
                        style={{ fontSize: '0.8rem' }}
                        onClick={() => toggle(article.slug)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {savedTopics.length > 0 && (
            <section className="section">
              <h2 className="section-title">Saved topics ({savedTopics.length})</h2>
              <div className="grid grid-2" style={{ marginTop: '1rem' }}>
                {savedTopics.map((topic) => (
                  <div key={topic.slug} className="card" style={{ padding: '1rem' }}>
                    <h3>{topic.title}</h3>
                    <p style={{ color: '#4b5563', marginTop: '0.5rem', fontSize: '0.875rem' }}>{topic.description}</p>
                    <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <Link href={`/topic/${topic.slug}`} className="link-cta">Open topic →</Link>
                      <button
                        className="nav-action"
                        style={{ fontSize: '0.8rem' }}
                        onClick={() => toggle(topic.slug)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

export function getStaticProps() {
  return {
    props: {
      articles: getAllArticles(),
      topics: getAllTopics(),
    },
  };
}
