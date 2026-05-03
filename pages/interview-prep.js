import { useState } from 'react';
import Link from 'next/link';
import { getAllArticles, getAllTopics } from '../lib/content';

const sampleQuestionSets = [
  {
    theme: 'Core Java Fundamentals',
    questions: [
      {
        q: 'What is the difference between == and equals() in Java?',
        a: '== compares object references (memory addresses). equals() compares object content — its behaviour depends on how the class overrides it. For String, equals() checks character-by-character equality. Always use equals() when comparing object values; reserve == for primitives or intentional reference checks.',
      },
      {
        q: 'How do access modifiers affect encapsulation?',
        a: 'Access modifiers (private, package-private, protected, public) control visibility. private hides fields from all outside code, forcing access through getter/setter methods. This lets you validate or change internal representation without breaking callers — the core goal of encapsulation.',
      },
      {
        q: 'Explain exception handling and checked vs unchecked exceptions.',
        a: 'Checked exceptions (extend Exception) must be declared or caught — they represent recoverable conditions like IOException. Unchecked exceptions (extend RuntimeException) represent programming errors like NullPointerException and don\'t require explicit handling. Use checked when callers should be forced to handle the failure; use unchecked for bugs.',
      },
    ],
  },
  {
    theme: 'Collections & Generics',
    questions: [
      {
        q: 'How does HashMap compute and use hash codes?',
        a: 'HashMap calls hashCode() on the key, then spreads the bits with a supplemental hash to determine a bucket index. If multiple keys land in the same bucket (collision), they\'re stored in a linked list (or a red-black tree once the list exceeds 8 entries in Java 8+). get() locates the bucket then uses equals() to find the exact entry.',
      },
      {
        q: 'What is the difference between ArrayList and LinkedList?',
        a: 'ArrayList is backed by an array — O(1) random access, O(n) insertions/deletions in the middle. LinkedList is a doubly-linked list — O(1) insertions at head/tail, O(n) random access. In practice, ArrayList is faster for most workloads due to CPU cache locality. Prefer LinkedList only when frequent insertions at arbitrary positions outweigh traversal cost.',
      },
      {
        q: 'Why do we use generics in Java? Give an example.',
        a: 'Generics provide compile-time type safety and eliminate casts. Without them, a List stores Object and you\'d need to cast every retrieval, risking ClassCastException at runtime. With generics, List<String> guarantees only Strings are added. Type information is erased at compile time (type erasure) so there\'s no runtime overhead.',
      },
    ],
  },
  {
    theme: 'Spring & Backend',
    questions: [
      {
        q: 'How does Spring manage dependency injection?',
        a: 'Spring scans for components annotated with @Component (or @Service, @Repository, @Controller) and registers them in the ApplicationContext. When a bean requires a dependency, Spring injects it via constructor injection (preferred), setter, or field injection. Constructor injection is best because it makes dependencies explicit and supports immutability.',
      },
      {
        q: 'Describe the Spring Bean lifecycle.',
        a: 'Spring instantiates the bean, injects dependencies, then calls @PostConstruct (or InitializingBean.afterPropertiesSet()). The bean is now ready to use. On shutdown, Spring calls @PreDestroy (or DisposableBean.destroy()) before removing the bean. You can hook into these phases to open/close resources like DB connections.',
      },
      {
        q: 'What is the difference between @Component, @Service, and @Repository?',
        a: 'All three are specialisations of @Component and result in the same Spring bean registration. @Service signals business logic, @Repository signals data-access and enables Spring\'s persistence exception translation (wrapping JDBC exceptions into DataAccessException). Using the right annotation communicates intent to readers and enables AOP pointcuts targeting specific layers.',
      },
    ],
  },
  {
    theme: 'JVM and Concurrency',
    questions: [
      {
        q: 'What does the Java Memory Model guarantee?',
        a: 'The JMM defines when writes by one thread become visible to others. Without synchronisation, the JVM and CPU can reorder instructions. The JMM guarantees happens-before relationships: a write to a volatile variable happens-before any subsequent read of that variable, and a monitor unlock happens-before any subsequent lock. This prevents data races when using these constructs correctly.',
      },
      {
        q: 'How do volatile and synchronized differ?',
        a: 'volatile guarantees visibility and prevents instruction reordering for a single variable, but does not guarantee atomicity for compound actions (e.g., i++). synchronized provides both mutual exclusion and visibility — only one thread can hold the lock, and all writes made inside the block are visible to the next thread that acquires the same lock. Use volatile for simple flags; synchronized for compound operations.',
      },
      {
        q: 'Describe a thread-safe collection and when to use it.',
        a: 'ConcurrentHashMap uses segment-level (Java 7) or CAS + fine-grained locks (Java 8+) so reads are non-blocking and writes lock only the affected bucket. Use it over Collections.synchronizedMap when many threads read concurrently. CopyOnWriteArrayList copies the whole array on every write — ideal for small lists with frequent reads and rare writes, like event listener registries.',
      },
    ],
  },
];

function FlashcardSet({ set }) {
  const [revealed, setRevealed] = useState({});

  function toggle(index) {
    setRevealed((prev) => ({ ...prev, [index]: !prev[index] }));
  }

  return (
    <article className="card question-panel">
      <h3>{set.theme}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
        {set.questions.map((item, index) => (
          <div
            key={index}
            className="mini-card"
            style={{ padding: '0.875rem', cursor: 'pointer' }}
            onClick={() => toggle(index)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
              <p style={{ margin: 0, fontWeight: 500 }}>{item.q}</p>
              <span style={{ flexShrink: 0, fontSize: '0.8rem', color: '#6b7280' }}>
                {revealed[index] ? 'Hide ▲' : 'Show answer ▼'}
              </span>
            </div>
            {revealed[index] && (
              <p style={{ margin: '0.75rem 0 0', color: '#374151', fontSize: '0.9rem', lineHeight: 1.6, borderTop: '1px solid #e5e7eb', paddingTop: '0.75rem' }}>
                {item.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}

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
        <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.5rem' }}>Click any question to reveal the answer.</p>
        <div className="grid grid-2" style={{ marginTop: '1rem' }}>
          {sampleQuestionSets.map((set) => (
            <FlashcardSet key={set.theme} set={set} />
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
