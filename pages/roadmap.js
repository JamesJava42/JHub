import Link from 'next/link';
import { getAllTopics, getArticlesByTopic } from '../lib/content';

const roadmapStages = [
  {
    title: 'Foundations',
    description: 'Start with Java basics, object structure, and safe code patterns.',
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
    description: 'Solidify object-oriented design, polymorphism, generics, and collections.',
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
    description: 'Tackle concurrency, the JVM, Spring, reflection, and modern Java features.',
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

export default function Roadmap({ topics }) {
  const stages = roadmapStages.map((stage) => ({
    ...stage,
    topics: stage.slugs
      .map((slug) => topics.find((topic) => topic.slug === slug))
      .filter(Boolean),
  }));

  return (
    <div>
      <section style={{ marginBottom: '2rem' }}>
        <p className="eyebrow">Roadmap</p>
        <h1 className="section-title">Java study roadmap</h1>
        <p className="section-subtitle">A sequenced path that takes you from foundational concepts to advanced frameworks and interview prep.</p>
      </section>

      <section className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="mini-card">
          <h3>Path sequence</h3>
          <p>Follow the roadmap stage-by-stage, starting with fundamentals and moving into advanced topics.</p>
        </div>
        <div className="mini-card">
          <h3>Interview focus</h3>
          <p>Each stage is designed to build strong answers for Java system design and behavior questions.</p>
        </div>
        <div className="mini-card">
          <h3>Practical learning</h3>
          <p>Every topic includes concrete practice tasks or example code to apply what you learn.</p>
        </div>
      </section>

      <div className="grid" style={{ gap: '1.5rem' }}>
        {stages.map((stage) => (
          <section key={stage.title} className="card" style={{ padding: '1.5rem' }}>
            <h2 className="section-title">{stage.title}</h2>
            <p className="section-subtitle">{stage.description}</p>
            <div className="grid grid-2" style={{ marginTop: '1rem' }}>
              {stage.topics.map((topic) => (
                <div key={topic.slug} className="mini-card" style={{ padding: '1rem' }}>
                  <h3>{topic.title}</h3>
                  <p style={{ margin: '0.5rem 0', color: '#4b5563' }}>{topic.description}</p>
                  <p style={{ margin: '0 0 0.75rem', fontSize: '0.8rem', color: '#6b7280' }}>
                    {topic.articleCount} {topic.articleCount === 1 ? 'article' : 'articles'} · {topic.readTime} min read
                  </p>
                  <Link href={`/topic/${topic.slug}`} className="link-cta">
                    Open topic →
                  </Link>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section style={{ marginTop: '2rem' }}>
        <h2 className="section-title">How to use this roadmap</h2>
        <ul style={{ paddingLeft: '1.4rem', color: '#374151' }}>
          <li>Read one topic at a time and complete the practice task for better retention.</li>
          <li>Use the search page to jump to specific terms when prepping for interviews.</li>
          <li>Revisit the advanced stage after you have a strong core understanding.</li>
        </ul>
      </section>
    </div>
  );
}

export function getStaticProps() {
  const topics = getAllTopics().map((topic) => {
    const articles = getArticlesByTopic(topic.slug);
    return {
      ...topic,
      articleCount: articles.length,
      readTime: Math.max(20, articles.length * 8),
    };
  });
  return { props: { topics } };
}
