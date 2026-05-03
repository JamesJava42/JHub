import Link from 'next/link';
import { getAllArticles, getAllTopics } from '../lib/content';

const sampleQuestionSets = [
  {
    theme: 'Core Java Fundamentals',
    questions: [
      'What is the difference between == and equals() in Java?',
      'How do access modifiers affect encapsulation?',
      'Explain exception handling and checked vs unchecked exceptions.',
    ],
  },
  {
    theme: 'Collections & Generics',
    questions: [
      'How does HashMap compute and use hash codes?',
      'What is the difference between ArrayList and LinkedList?',
      'Why do we use generics in Java? Give an example.',
    ],
  },
  {
    theme: 'Spring & Backend',
    questions: [
      'How does Spring manage dependency injection?',
      'Describe the Spring Bean lifecycle.',
      'What is the difference between @Component, @Service, and @Repository?',
    ],
  },
  {
    theme: 'JVM and Concurrency',
    questions: [
      'What does the Java Memory Model guarantee?',
      'How do volatile and synchronized differ?',
      'Describe a thread-safe collection and when to use it.',
    ],
  },
];

export default function InterviewPrep({ articles, topics }) {
  const quickLinks = [
    { label: 'Java fundamentals', href: '/topic/oop-fundamentals' },
    { label: 'Collections', href: '/topic/collections' },
    { label: 'Spring', href: '/topic/spring-framework' },
    { label: 'JVM', href: '/topic/jvm-architecture' },
  ];

  return (
    <div>
      <section className="hero" style={{ paddingTop: '1.5rem', paddingBottom: '2rem' }}>
        <div className="hero-copy">
          <p className="eyebrow">Interview prep</p>
          <h1>Practice Java interview questions with guided answers and study strategies.</h1>
          <p className="section-subtitle">Use question sets, article-backed explanations, and quick review prompts designed for backend and full-stack interviews.</p>
          <div className="hero-actions">
            <Link href="/roadmap" className="button-primary">Browse learning roadmap</Link>
            <Link href="/search" className="secondary-button">Search by topic</Link>
          </div>
        </div>
        <aside className="hero-card card">
          <p className="eyebrow">Interview coach</p>
          <h2>How to use this page</h2>
          <ol className="roadmap-list">
            <li>Choose a question theme from the sets below.</li>
            <li>Read the linked article to deepen your answer.</li>
            <li>Practice the follow-up prompt in your own words.</li>
          </ol>
        </aside>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Question themes</h2>
            <p className="section-subtitle">Focus on the topics most likely to show up in Java backend interviews.</p>
          </div>
        </div>
        <div className="grid grid-2" style={{ marginTop: '1rem' }}>
          {sampleQuestionSets.map((set) => (
            <article key={set.theme} className="card question-panel">
              <h3>{set.theme}</h3>
              <ul className="list-card" style={{ paddingLeft: '1.4rem', marginTop: '1rem' }}>
                {set.questions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section two-column-panel" style={{ gap: '1.5rem' }}>
        <div className="card progress-panel">
          <h2>Your study boost</h2>
          <p className="section-subtitle">Connect question themes to actual articles for stronger answers.</p>
          <div className="progress-card-row">
            <div><span>Available articles</span><strong>{articles.length}</strong></div>
            <div><span>Topic clusters</span><strong>{topics.length}</strong></div>
          </div>
          <div className="progress-card-row">
            <div><span>Focus areas</span><strong>Java, Spring, JVM, SQL</strong></div>
            <div><span>Practice mode</span><strong>Guided</strong></div>
          </div>
          <Link href="/search" className="button-primary">Find supporting articles</Link>
        </div>

        <div className="card">
          <h2 className="section-title">Quick interview prompts</h2>
          <div className="list-card" style={{ paddingLeft: '1.4rem', marginTop: '1rem' }}>
            <li>Explain the Java Memory Model in simple terms.</li>
            <li>Compare HashMap and ConcurrentHashMap for multithreading.</li>
            <li>Describe how Spring Bean lifecycle events work.</li>
            <li>Show when to use @Transactional in backend APIs.</li>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <Link href="/roadmap" className="link-cta">Match questions to roadmap topics →</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Jump to a topic</h2>
            <p className="section-subtitle">Open the key topics that support strong interview answers.</p>
          </div>
        </div>
        <div className="tag-grid" style={{ marginTop: '1rem' }}>
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href} className="tag-link">
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export function getStaticProps() {
  return {
    props: {
      articles: getAllArticles(),
      topics: getAllTopics(),
    },
  };
}
