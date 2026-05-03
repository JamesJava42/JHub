import Link from 'next/link';

export default function TopicCard({ topic }) {
  const difficulty = topic.difficulty || topic.level || 'Beginner';
  const articleCount = topic.articleCount ?? topic.articles ?? 0;
  const questionCount = topic.interviewCount ?? topic.questions ?? 0;
  const readingTime = topic.readingTime;
  const progress = topic.progress;

  return (
    <article className="card topic-card">
      <div className="topic-card-header">
        <div className="topic-badges">
          <span className="badge">{difficulty}</span>
          {topic.badges?.map((badge) => (
            <span key={badge} className="badge secondary">{badge}</span>
          ))}
        </div>
        <h3>{topic.title}</h3>
        <p>{topic.description}</p>
      </div>
      <div className="topic-meta-row">
        {articleCount ? <span>{articleCount} articles</span> : null}
        {questionCount ? <span>{questionCount} questions</span> : null}
        {readingTime ? <span>{readingTime} min read</span> : null}
      </div>
      {progress ? (
        <div className="progress-bar-wrapper">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
          <span className="progress-label">Progress: {progress}%</span>
        </div>
      ) : null}
      <div className="tag-row" style={{ marginTop: '1rem' }}>
        {topic.tags.map((tag) => (
          <span className="tag" key={`${topic.slug}-${tag}`}>{tag}</span>
        ))}
      </div>
      <div className="topic-card-actions">
        <Link href={`/topic/${topic.slug}`} className="link-cta">Start Topic</Link>
        <Link href="/interview-prep" className="link-cta">Practice Questions</Link>
      </div>
    </article>
  );
}
