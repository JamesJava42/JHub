import Link from 'next/link';
import { getAllArticles, getArticleBySlug, getRelatedArticles } from '../../lib/content';

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

  return (
    <div>
      <section style={{ marginBottom: '2rem' }}>
        <p className="eyebrow">Article</p>
        <h1 className="section-title">{article.title}</h1>
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
