import Link from 'next/link';

export default function ArticlePreview({ article }) {
  return (
    <article className="card">
      <h3>{article.title}</h3>
      <p>{article.summary}</p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
        {article.tags.map((tag) => (
          <span className="tag" key={`${article.slug}-${tag}`}>{tag}</span>
        ))}
      </div>
      <Link href={`/article/${article.slug}`}>
        <span className="link-span" style={{ marginTop: '1rem', display: 'inline-block', fontWeight: 600 }}>Read more →</span>
      </Link>
    </article>
  );
}
