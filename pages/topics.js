import Link from 'next/link';
import { getAllTopics, getArticlesByTopic } from '../lib/content';

const topicCategories = [
  {
    title: 'Foundations',
    description: 'Java basics, object structure, and safe code patterns.',
    slugs: [
      'oop-fundamentals',
      'data-types',
      'strings',
      'keywords-immutability',
      'access-modifiers',
      'constructors',
      'this-super',
      'method-calls-memory',
      'static-concepts',
      'exception-handling',
    ],
  },
  {
    title: 'Core Object Patterns',
    description: 'Object-oriented design, polymorphism, generics, and collections.',
    slugs: [
      'polymorphism',
      'encapsulation-abstraction',
      'inheritance',
      'comparison',
      'generics',
      'collections',
      'lambda-functional',
      'streams',
      'design-patterns',
    ],
  },
  {
    title: 'Advanced Java & Frameworks',
    description: 'Concurrency, the JVM, Spring, reflection, and modern Java features.',
    slugs: [
      'threads-concurrency',
      'jvm-architecture',
      'modern-java',
      'networking-http',
      'spring-framework',
      'spring-mvc',
      'reflection',
      'annotations',
      'concurrency',
      'patterns',
      'spring-internals',
      'sql-basics',
    ],
  },
];

const difficultyMap = {
  'oop-fundamentals': 'Beginner',
  'data-types': 'Beginner',
  'strings': 'Beginner',
  'keywords-immutability': 'Beginner',
  'access-modifiers': 'Beginner',
  'constructors': 'Beginner',
  'this-super': 'Beginner',
  'method-calls-memory': 'Beginner',
  'static-concepts': 'Beginner',
  'exception-handling': 'Beginner',
  'polymorphism': 'Intermediate',
  'encapsulation-abstraction': 'Intermediate',
  'inheritance': 'Intermediate',
  'comparison': 'Intermediate',
  'generics': 'Intermediate',
  'collections': 'Intermediate',
  'lambda-functional': 'Intermediate',
  'streams': 'Intermediate',
  'networking-http': 'Intermediate',
  'spring-framework': 'Intermediate',
  'spring-mvc': 'Intermediate',
  'annotations': 'Intermediate',
  'reflection': 'Intermediate',
};

export default function TopicsIndex({ enrichedCategories, totalTopics, totalArticles }) {
  return (
    <div>
      <section style={{ marginBottom: '2rem' }}>
        <p className="eyebrow">All topics</p>
        <h1 className="section-title">Java topics by category</h1>
        <p className="section-subtitle">
          {totalTopics} topics across 3 learning stages — from Java basics to advanced frameworks.
        </p>
      </section>

      <section className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="mini-card">
          <h3>{totalTopics} topics</h3>
          <p>Covering core Java, Spring, JVM, and concurrency.</p>
        </div>
        <div className="mini-card">
          <h3>{totalArticles} articles</h3>
          <p>Deep-dive articles with interview focus and code examples.</p>
        </div>
        <div className="mini-card">
          <h3>3 stages</h3>
          <p>Sequenced from beginner to advanced for structured learning.</p>
        </div>
      </section>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {enrichedCategories.map((category) => (
          <section key={category.title} className="card" style={{ padding: '1.5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <h2 className="section-title">{category.title}</h2>
              <p className="section-subtitle">{category.description}</p>
            </div>
            <div className="grid grid-2" style={{ marginTop: '1rem' }}>
              {category.topics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/topic/${topic.slug}`}
                  className="mini-card"
                  style={{ padding: '1rem', display: 'block', textDecoration: 'none' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ margin: 0 }}>{topic.title}</h3>
                    <span className="badge" style={{ marginLeft: '0.5rem', flexShrink: 0 }}>
                      {topic.difficulty}
                    </span>
                  </div>
                  <p style={{ margin: '0.5rem 0', color: '#4b5563', fontSize: '0.875rem' }}>
                    {topic.description}
                  </p>
                  <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                    {topic.articleCount} {topic.articleCount === 1 ? 'article' : 'articles'} · {topic.readTime} min read
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section style={{ marginTop: '2rem' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 className="section-title">Not sure where to start?</h2>
          <p className="section-subtitle">Follow the sequenced roadmap to move through topics in the right order.</p>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
            <Link href="/roadmap" className="button-primary">View roadmap</Link>
            <Link href="/interview-prep" className="secondary-button">Interview prep</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export function getStaticProps() {
  const allTopics = getAllTopics();

  const enrichedCategories = topicCategories.map((category) => ({
    ...category,
    topics: category.slugs
      .map((slug) => {
        const topic = allTopics.find((t) => t.slug === slug);
        if (!topic) return null;
        const articleCount = getArticlesByTopic(slug).length;
        return {
          ...topic,
          difficulty: difficultyMap[slug] || 'Advanced',
          articleCount,
          readTime: Math.max(20, articleCount * 8),
        };
      })
      .filter(Boolean),
  }));

  const totalTopics = enrichedCategories.reduce((sum, cat) => sum + cat.topics.length, 0);
  const totalArticles = enrichedCategories.reduce(
    (sum, cat) => sum + cat.topics.reduce((s, t) => s + t.articleCount, 0),
    0
  );

  return {
    props: { enrichedCategories, totalTopics, totalArticles },
  };
}
