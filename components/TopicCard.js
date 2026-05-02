import Link from 'next/link';

export default function TopicCard({ topic }) {
  return (
    <article className="card">
      <h3>{topic.title}</h3>
      <p>{topic.description}</p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
        {topic.tags.map((tag) => (
          <span className="tag" key={tag}>{tag}</span>
        ))}
      </div>
      <Link href={`/topic/${topic.slug}`}>
        <span className="link-span" style={{ marginTop: '1rem', display: 'inline-block', fontWeight: 600 }}>Explore topic →</span>
      </Link>
    </article>
  );
}
