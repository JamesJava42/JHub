import { useEffect } from 'react';
import Link from 'next/link';
import { getAllArticles, getArticleBySlug, getRelatedArticles } from '../../lib/content';
import { useBookmarks } from '../../hooks/useBookmarks';
import { useProgress } from '../../hooks/useProgress';

function renderSection(section) {
  return (
    <section key={section.title} style={{ marginTop: '1.75rem' }}>
      <h2>{section.title}</h2>
      {section.content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      {section.code ? (
        <pre className="code-block">
          <code>{section.code}</code>
        </pre>
      ) : null}
      {section.tasks ? (
        <div className="task-panel">
          <h3>💡 Practice Tasks</h3>
          <ul>
            {section.tasks.map((task, index) => (
              <li key={index}>
                <strong>{task.title}</strong>
                <p>{task.description}</p>
                {task.hints && (
                  <details>
                    <summary>💡 Hints</summary>
                    <ul>
                      {task.hints.map((hint, hintIndex) => (
                        <li key={hintIndex}>{hint}</li>
                      ))}
                    </ul>
                  </details>
                )}
                {task.solution && (
                  <details>
                    <summary>🔍 Solution</summary>
                    <pre className="code-block small">
                      <code>{task.solution}</code>
                    </pre>
                  </details>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

export default function ArticlePage({ article, relatedArticles }) {
  const { isBookmarked, toggle } = useBookmarks();
  const { markRead } = useProgress();

  useEffect(() => {
    if (article?.slug) markRead(article.slug);
  }, [article?.slug]);

  if (!article) {
    return (
      <div>
        <h1>Article not found</h1>
        <Link href="/" className="link-span">Back to home</Link>
      </div>
    );
  }

  const summaryPoints = article.sections.slice(0, 3).map((section) => section.title);
  const focusPoints = article.tags.map((tag) => `Explain how ${tag} matters in Java and interviews.`);
  const readingTime = Math.max(5, Math.round(article.sections.length * 2.25 + 2));
  const saved = isBookmarked(article.slug);

  return (
    <div>
      <section style={{ marginBottom: '2rem' }}>
        <nav style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
          <Link href="/roadmap" className="link-span">Roadmap</Link>
          {' / '}
          {article.topic && (
            <>
              <Link href={`/topic/${article.topic}`} className="link-span">{article.topic.replace(/-/g, ' ')}</Link>
              {' / '}
            </>
          )}
          <span>{article.title}</span>
        </nav>
        <p className="eyebrow">Article · {readingTime} min read</p>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <h1 className="section-title" style={{ margin: 0 }}>{article.title}</h1>
          <button
            className="nav-action"
            onClick={() => { toggle(article.slug); markRead(article.slug); }}
            style={{ flexShrink: 0 }}
          >
            {saved ? 'Saved ✓' : 'Save'}
          </button>
        </div>
        <p className="section-subtitle">{article.summary}</p>
        <div className="tag-row" style={{ marginTop: '1rem' }}>
          {article.tags.map((tag) => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </div>
      </section>

      <div className="grid grid-2" style={{ gap: '1.5rem' }}>
        <aside className="mini-card">
          <h2 className="section-title">Quick review</h2>
          <ul>
            {summaryPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <div style={{ marginTop: '1.25rem' }}>
            <h3 className="section-subtitle">Interview focus</h3>
            <ul>
              {focusPoints.slice(0, 4).map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <Link href="/roadmap" className="link-cta">Continue with the roadmap →</Link>
          </div>
        </aside>

        <article className="card article-content">
          {article.sections.map(renderSection)}
        </article>
      </div>

      {relatedArticles.length > 0 ? (
        <section style={{ marginTop: '3rem' }}>
          <h2 className="section-title">Related reading</h2>
          <div className="grid grid-2" style={{ marginTop: '1rem' }}>
            {relatedArticles.map((related) => (
              <div key={related.slug} className="card">
                <h3>{related.title}</h3>
                <p>{related.summary}</p>
                <Link href={`/article/${related.slug}`} className="link-cta">
                  Open article →
                </Link>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

export function getStaticPaths() {
  const articles = getAllArticles();
  return {
    paths: articles.map((article) => ({ params: { slug: article.slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const article = getArticleBySlug(params.slug);
  return {
    props: {
      article: article || null,
      relatedArticles: article ? getRelatedArticles(article) : [],
    },
  };
}
