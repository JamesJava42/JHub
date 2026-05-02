import Link from 'next/link';
import { getAllArticles, getArticleBySlug, getAllTopics, getRelatedArticles } from '../../lib/content';

function renderSection(section) {
  return (
    <section key={section.title} style={{ marginTop: '1.75rem' }}>
      <h2>{section.title}</h2>
      {section.content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      {section.code ? (
        <pre style={{ background: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '1rem', overflowX: 'auto' }}>
          <code>{section.code}</code>
        </pre>
      ) : null}
      {section.tasks ? (
        <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
          <h3 style={{ color: '#059669', marginTop: 0 }}>💡 Practice Tasks</h3>
          <ul style={{ paddingLeft: '1.5rem' }}>
            {section.tasks.map((task, index) => (
              <li key={index} style={{ marginBottom: '0.5rem' }}>
                <strong>{task.title}</strong>
                <p style={{ margin: '0.25rem 0', color: '#6b7280' }}>{task.description}</p>
                {task.hints && (
                  <details style={{ marginTop: '0.5rem' }}>
                    <summary style={{ cursor: 'pointer', color: '#7c3aed', fontSize: '0.9rem' }}>💡 Hints</summary>
                    <ul style={{ marginTop: '0.5rem', paddingLeft: '1rem' }}>
                      {task.hints.map((hint, hintIndex) => (
                        <li key={hintIndex} style={{ fontSize: '0.9rem', color: '#6b7280' }}>{hint}</li>
                      ))}
                    </ul>
                  </details>
                )}
                {task.solution && (
                  <details style={{ marginTop: '0.5rem' }}>
                    <summary style={{ cursor: 'pointer', color: '#dc2626', fontSize: '0.9rem' }}>🔍 Solution</summary>
                    <pre style={{ background: '#1f2937', color: '#f8fafc', padding: '0.75rem', borderRadius: '0.25rem', marginTop: '0.5rem', fontSize: '0.85rem', overflowX: 'auto' }}>
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
  if (!article) {
    return (
      <div>
        <h1>Article not found</h1>
        <Link href="/">
          <span className="link-span">Back to home</span>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <section style={{ marginBottom: '2rem' }}>
        <p style={{ margin: 0, color: '#2563eb', fontWeight: 700 }}>Article</p>
        <h1 className="section-title">{article.title}</h1>
        <p className="section-subtitle">{article.summary}</p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          {article.tags.map((tag) => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </div>
      </section>

      <article className="card article-content">
        {article.sections.map(renderSection)}
      </article>

      {relatedArticles.length > 0 ? (
        <section style={{ marginTop: '3rem' }}>
          <h2 className="section-title">Related reading</h2>
          <div className="grid grid-2" style={{ marginTop: '1rem' }}>
            {relatedArticles.map((related) => (
              <div key={related.slug} className="card">
                <h3>{related.title}</h3>
                <p>{related.summary}</p>
                <Link href={`/article/${related.slug}`}>
                  <span className="link-span" style={{ marginTop: '1rem', display: 'inline-block', fontWeight: 600 }}>Open article →</span>
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
