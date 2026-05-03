import Link from 'next/link';

export default function ArticlePreview({ article }) {
  return (
    <article className="card article-preview">
      <div className="article-preview-top">
        <h3>{article.title}</h3>
        <p>{article.summary}</p>
      </div>
      <div className="tag-row" style={{ marginTop: '1rem' }}>
        {article.tags.map((tag) => (
          <span className="tag" key={`${article.slug}-${tag}`}>{tag}</span>
        ))}
      </div>
      <Link href={`/article/${article.slug}`} className="link-cta" style={{ marginTop: '1rem', display: 'inline-block' }}>
        Read more →
      </Link>
    </article>
  );
}
