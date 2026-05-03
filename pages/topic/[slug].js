import Link from 'next/link';
import { getAllTopics, getTopicBySlug, getArticlesByTopic } from '../../lib/content';
import ArticlePreview from '../../components/ArticlePreview';

export default function TopicPage({ topic, articles, relatedTopics }) {
  if (!topic) {
    return (
      <div>
        <h1>Topic not found</h1>
        <Link href="/" className="link-span">Back to home</Link>
      </div>
    );
  }

  return (
    <div>
      <section style={{ marginBottom: '2rem' }}>
        <p className="eyebrow">Topic overview</p>
        <h1 className="section-title">{topic.title}</h1>
        <p className="section-subtitle">{topic.description}</p>
      </section>

      <div className="grid grid-2" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card">
          <h2 className="section-title">What you'll learn</h2>
          <ul style={{ paddingLeft: '1.4rem', color: '#374151' }}>
            <li>Explain the most important Java concept behind this topic.</li>
            <li>Apply it through a complete article with examples.</li>
            <li>Use targeted review notes for interviews.</li>
          </ul>
          <div className="tag-row" style={{ marginTop: '1rem' }}>
            {topic.tags.map((tag) => (
              <span className="tag" key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="section-title">Recommended study path</h2>
          <div className="list-card">
            {articles.map((article, index) => (
              <Link key={article.slug} href={`/article/${article.slug}`} className="tag-link" style={{ marginBottom: '0.75rem' }}>
                {index + 1}. {article.title}
              </Link>
            ))}
          </div>
          <div style={{ marginTop: '1.25rem' }}>
            <Link href="/roadmap" className="link-cta">See the full Java roadmap →</Link>
          </div>
        </div>
      </div>

      <section style={{ marginBottom: '2rem' }}>
        <h2 className="section-title">Articles in this topic</h2>
        <div className="grid grid-2" style={{ marginTop: '1rem' }}>
          {articles.map((article) => (
            <ArticlePreview key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {relatedTopics.length > 0 ? (
        <section>
          <h2 className="section-title">Related topic clusters</h2>
          <div className="grid grid-2" style={{ marginTop: '1rem' }}>
            {relatedTopics.map((related) => (
              <ArticlePreview
                key={related.slug}
                article={{
                  slug: related.slug,
                  title: related.title,
                  summary: related.description,
                  tags: related.tags,
                }}
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

export function getStaticPaths() {
  const topics = getAllTopics();
  return {
    paths: topics.map((topic) => ({ params: { slug: topic.slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const topic = getTopicBySlug(params.slug);
  const allTopics = getAllTopics();
  const relatedTopics = topic
    ? allTopics.filter(
        (otherTopic) =>
          otherTopic.slug !== topic.slug &&
          otherTopic.tags.some((tag) => topic.tags.includes(tag))
      ).slice(0, 4)
    : [];

  return {
    props: {
      topic: topic || null,
      articles: topic ? getArticlesByTopic(topic.slug) : [],
      relatedTopics,
    },
  };
}
