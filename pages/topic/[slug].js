import Link from 'next/link';
import TopicCard from '../../components/TopicCard';
import TopicQuiz from '../../components/TopicQuiz';
import { getAllTopics, getTopicBySlug, getArticlesByTopic } from '../../lib/content';
import { useBookmarks } from '../../hooks/useBookmarks';
import { useQuizResults } from '../../hooks/useQuizResults';
import { quizzes } from '../../data/quizzes';

function getDifficulty(slug) {
  const beginner = [
    'oop-fundamentals',
    'data-types',
    'strings',
    'access-modifiers',
    'constructors',
    'this-super',
    'static-concepts',
    'exception-handling',
  ];
  const intermediate = [
    'polymorphism',
    'encapsulation-abstraction',
    'inheritance',
    'comparison',
    'generics',
    'collections',
    'lambda-functional',
    'streams',
    'networking-http',
    'spring-framework',
    'spring-mvc',
    'annotations',
    'reflection',
  ];
  if (beginner.includes(slug)) return 'Beginner';
  if (intermediate.includes(slug)) return 'Intermediate';
  return 'Advanced';
}

export default function TopicPage({ topic, articles, relatedTopics }) {
  const { isBookmarked, toggle } = useBookmarks();
  const { hasPassed } = useQuizResults();
  const quizQuestions = quizzes[topic?.slug] || [];

  if (!topic) {
    return (
      <div>
        <h1>Topic not found</h1>
        <Link href="/" className="link-span">Back to home</Link>
      </div>
    );
  }

  const difficulty = getDifficulty(topic.slug);
  const totalTime = Math.max(20, articles.length * 10);
  const studyOrder = articles.slice(0, 6);
  const saved = isBookmarked(topic.slug);

  return (
    <div>
      <section style={{ marginBottom: '2rem' }}>
        <nav style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
          <Link href="/topics" className="link-span">Topics</Link>
          {' / '}
          <span>{topic.title}</span>
        </nav>
        <p className="eyebrow">Topic overview</p>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <h1 className="section-title" style={{ margin: 0 }}>{topic.title}</h1>
          <button className="nav-action" onClick={() => toggle(topic.slug)} style={{ flexShrink: 0 }}>
            {saved ? 'Saved ✓' : 'Save'}
          </button>
        </div>
        <p className="section-subtitle">{topic.description}</p>
      </section>

      <div className="grid grid-2" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card topic-summary-card">
          <div className="topic-summary-row" style={{ justifyContent: 'space-between' }}>
            <span className="badge">{difficulty}</span>
            <strong>{articles.length} articles</strong>
          </div>
          <div className="topic-summary-row" style={{ marginTop: '1rem' }}>
            <span>Estimated study time</span>
            <strong>{totalTime} min</strong>
          </div>
          <div className="topic-summary-row" style={{ marginTop: '1rem' }}>
            <span>Recommended mastery</span>
            <strong>Interview-ready</strong>
          </div>
          <div className="topic-actions" style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
            <Link href={`/article/${articles[0]?.slug || 'oop-fundamentals'}`} className="button-primary">Start Topic</Link>
            <Link href="/interview-prep" className="secondary-button">Ask Java Mentor</Link>
          </div>
        </div>

        <div className="card">
          <h2 className="section-title">What you will learn</h2>
          <ul className="list-card" style={{ paddingLeft: '1.4rem', color: '#374151', marginTop: '1rem' }}>
            <li>How this concept works in Java and backend systems.</li>
            <li>When to use it and how to explain it during interviews.</li>
            <li>Which follow-up topics to learn next.</li>
          </ul>
          <div className="tag-row" style={{ marginTop: '1rem' }}>
            {topic.tags.map((tag) => (
              <span className="tag" key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <section className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Recommended study order</h2>
            <p className="section-subtitle">Follow the best learning sequence for this topic</p>
          </div>
        </div>
        <div className="card list-card" style={{ padding: '1rem' }}>
          {studyOrder.map((article, index) => (
            <Link key={article.slug} href={`/article/${article.slug}`} className="topic-row-link">
              <div>
                <strong>{index + 1}. {article.title}</strong>
                <p>{article.summary}</p>
              </div>
              <span>{Math.max(5, Math.round((article.sections?.length || 1) * 2.5))} min</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Articles in this topic</h2>
        <div className="grid grid-2" style={{ marginTop: '1rem' }}>
          {articles.map((article) => (
            <Link key={article.slug} href={`/article/${article.slug}`} className="card article-link-card">
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
              <div className="tag-row" style={{ marginTop: '1rem' }}>
                {article.tags.map((tag) => (
                  <span className="tag" key={`${article.slug}-${tag}`}>{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {relatedTopics.length > 0 ? (
        <section className="section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Related topics</h2>
              <p className="section-subtitle">Continue to adjacent topic clusters once this one is strong.</p>
            </div>
          </div>
          <div className="grid grid-2" style={{ marginTop: '1rem' }}>
            {relatedTopics.map((related) => (
              <TopicCard
                key={related.slug}
                topic={{
                  ...related,
                  difficulty: getDifficulty(related.slug),
                  articleCount: getArticlesByTopic(related.slug).length,
                }}
              />
            ))}
          </div>
        </section>
      ) : null}

      {quizQuestions.length > 0 && (
        <section className="section">
          <div className="section-header">
            <div>
              <h2 className="section-title">
                Test your knowledge
                {hasPassed(topic.slug) && (
                  <span style={{ marginLeft: '0.75rem', fontSize: '1rem', color: '#059669', fontWeight: 600 }}>
                    ✓ Passed
                  </span>
                )}
              </h2>
              <p className="section-subtitle">5 questions — score 80% or above to mark this topic complete.</p>
            </div>
          </div>
          <TopicQuiz topicSlug={topic.slug} questions={quizQuestions} />
        </section>
      )}
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
