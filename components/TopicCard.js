import Link from 'next/link';

export default function TopicCard({ topic }) {
  return (
    <article className="card topic-card">
      <div className="topic-card-header">
        <h3>{topic.title}</h3>
        <p>{topic.description}</p>
      </div>
      <div className="tag-row" style={{ marginTop: '1rem' }}>
        {topic.tags.map((tag) => (
          <span className="tag" key={`${topic.slug}-${tag}`}>{tag}</span>
        ))}
      </div>
      <Link href={`/topic/${topic.slug}`} className="tag-link" style={{ marginTop: '1rem', display: 'inline-block' }}>
        Explore topic →
      </Link>
    </article>
  );
}
