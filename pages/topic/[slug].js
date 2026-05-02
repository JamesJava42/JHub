import Link from 'next/link';
import { getAllTopics, getTopicBySlug, getArticlesByTopic } from '../../lib/content';
import ArticlePreview from '../../components/ArticlePreview';

export default function TopicPage({ topic, articles }) {
  if (!topic) {
    return (
      <div>
        <h1>Topic not found</h1>
        <Link href="/">
          <span className="link-span">Back to home</span>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <section style={{ marginBottom: '2rem' }}>
        <p style={{ margin: 0, color: '#2563eb', fontWeight: 700 }}>Topic Overview</p>
        <h1 className="section-title">{topic.title}</h1>
        <p className="section-subtitle">{topic.description}</p>
      </section>

      <section>
        <h2 className="section-title">Articles in this topic</h2>
        <div className="grid grid-2" style={{ marginTop: '1rem' }}>
          {articles.map((article) => (
            <ArticlePreview key={article.slug} article={article} />
          ))}
        </div>
      </section>
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
  return {
    props: {
      topic: topic || null,
      articles: topic ? getArticlesByTopic(topic.slug) : [],
    },
  };
}
