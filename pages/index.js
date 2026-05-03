import { useMemo, useState } from 'react';
import Link from 'next/link';
import { getAllTopics, getAllArticles } from '../lib/content';
import TopicCard from '../components/TopicCard';
import ArticlePreview from '../components/ArticlePreview';
import { useProgress } from '../hooks/useProgress';

const suggestedSearches = [
  'HashMap internal working',
  'volatile vs synchronized',
  'Spring Bean lifecycle',
  'ArrayList vs LinkedList',
  'JVM memory model',
];

const goalCards = [
  {
    title: 'I am new to Java',
    description: 'Start with OOP, data types, strings, constructors, access modifiers, and exceptions.',
    href: '/roadmap',
    action: 'Start Beginner Path',
  },
  {
    title: 'I am preparing for interviews',
    description: 'Practice Java, Spring, JVM, SQL, and backend interview questions with model answers.',
    href: '/interview-prep',
    action: 'Start Interview Prep',
  },
  {
    title: 'I want backend Java',
    description: 'Learn Spring, REST APIs, HTTP, SQL, and backend design patterns.',
    href: '/roadmap',
    action: 'Start Backend Path',
  },
  {
    title: 'I want advanced Java',
    description: 'Master JVM, concurrency, reflection, proxies, memory model, and virtual threads.',
    href: '/roadmap',
    action: 'Start Advanced Path',
  },
];

const learningPaths = [
  {
    title: 'Core Java Foundation',
    description: 'OOP, data types, strings, constructors, access control, and exceptions.',
    slugs: [
      'oop-fundamentals',
      'data-types',
      'strings',
      'access-modifiers',
      'constructors',
      'this-super',
      'static-concepts',
      'exception-handling',
      'generics',
    ],
  },
  {
    title: 'Collections & Functional Java',
    description: 'Collections, comparisons, generics, lambdas, streams, and modern Java features.',
    slugs: [
      'collections',
      'comparison',
      'generics',
      'lambda-functional',
      'streams',
      'modern-java',
    ],
  },
  {
    title: 'JVM, Memory & Concurrency',
    description: 'Stack/heap, JVM internals, threading, volatile, and concurrency design.',
    slugs: [
      'method-calls-memory',
      'jvm-architecture',
      'threads-concurrency',
      'concurrency',
      'modern-java',
    ],
  },
  {
    title: 'Spring & Backend',
    description: 'HTTP, Spring, REST, SQL, reflection, annotations, proxies, and design patterns.',
    slugs: [
      'networking-http',
      'spring-framework',
      'spring-mvc',
      'spring-internals',
      'reflection',
      'annotations',
      'patterns',
      'sql-basics',
    ],
  },
];

const featuredInterviewQuestions = [
  {
    question: 'How does HashMap work internally?',
    category: 'Collections',
    difficulty: 'Intermediate',
    frequency: 'High',
  },
  {
    question: 'What is the Java Memory Model and why does it matter?',
    category: 'JVM',
    difficulty: 'Advanced',
    frequency: 'High',
  },
  {
    question: 'How does Spring manage beans and dependency injection?',
    category: 'Spring',
    difficulty: 'Intermediate',
    frequency: 'High',
  },
  {
    question: 'What is the difference between volatile and synchronized?',
    category: 'Concurrency',
    difficulty: 'Intermediate',
    frequency: 'High',
  },
];

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
    'collections',
    'comparison',
    'generics',
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

export default function Home({ topics, articles }) {
  const [query, setQuery] = useState('');
  const text = query.toLowerCase().trim();
  const { getTopicProgress, getOverallProgress } = useProgress();

  const enrichedTopics = topics.map((topic) => {
    const topicArticles = articles.filter((article) => article.topic === topic.slug);
    const articleCount = topicArticles.length;
    return {
      ...topic,
      difficulty: getDifficulty(topic.slug),
      articleCount,
      interviewCount: Math.max(1, Math.round(articleCount * 2.5)),
      readingTime: Math.max(20, articleCount * 8),
      progress: getTopicProgress(topic.slug, topicArticles),
      badges: articleCount > 0 ? ['Interview Focused'] : [],
    };
  });

  const filteredArticles = useMemo(() => {
    if (!text) return articles;
    return articles.filter((article) => {
      return (
        article.title.toLowerCase().includes(text) ||
        article.summary.toLowerCase().includes(text) ||
        article.tags.some((tag) => tag.toLowerCase().includes(text))
      );
    });
  }, [articles, text]);

  const featuredTopics = enrichedTopics.slice(0, 6);
  const featuredArticles = filteredArticles.slice(0, 8);

  const coreFoundationArticles = articles.filter((a) =>
    ['oop-fundamentals', 'data-types', 'strings', 'access-modifiers', 'constructors', 'this-super', 'static-concepts', 'exception-handling'].includes(a.topic)
  );
  const coreCompletion = getTopicProgress('core-foundation', coreFoundationArticles);
  const overallCompletion = getOverallProgress(
    topics.map((t) => ({ slug: t.slug, articles: articles.filter((a) => a.topic === t.slug) }))
  );

  const progressPanel = {
    path: 'Core Java Foundation',
    completion: overallCompletion,
    next: 'Collections Framework',
    status: 'Interview focused',
  };

  return (
    <div>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Java interview & backend mastery</p>
          <h1>Master Java for interviews and backend development.</h1>
          <p className="section-subtitle">Follow guided Java, Spring, SQL, JVM, and concurrency paths with clear articles, interview questions, quizzes, and AI-powered explanations.</p>
          <div className="hero-actions">
            <Link href="/roadmap" className="button-primary">Start Java Roadmap</Link>
            <Link href="/interview-prep" className="secondary-button">Practice Interview Questions</Link>
          </div>
          <div className="hero-search-wrapper">
            <input
              type="search"
              className="search-input hero-search"
              placeholder="Search Java topics, interview questions, code examples..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <div className="search-suggestions">
              {suggestedSearches.map((item) => (
                <button key={item} type="button" className="suggestion-pill" onClick={() => setQuery(item)}>
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="hero-card card progress-card">
          <p className="eyebrow">Your Java path</p>
          <h2>Roadmap progress</h2>
          <div className="progress-overview">
            <div>
              <strong>{topics.length}</strong>
              <p>Topics available</p>
            </div>
            <div>
              <strong>Interview focused</strong>
              <p>Trusted study flow</p>
            </div>
            <div>
              <strong>Beginner to advanced</strong>
              <p>31 topics covered</p>
            </div>
          </div>
          <div className="progress-card-row">
            <div>
              <span>Core Java Foundation</span>
              <strong>{progressPanel.completion}%</strong>
            </div>
            <div className="progress-bar-wrapper">
              <div className="progress-bar" style={{ width: `${progressPanel.completion}%` }} />
            </div>
          </div>
          <div className="status-list">
            <div><span>Core Java Foundation</span><strong>{getTopicProgress('core', coreFoundationArticles)}%</strong></div>
            <div><span>Collections Framework</span><Link href="/topic/collections" className="link-cta" style={{ fontSize: '0.875rem' }}>Start →</Link></div>
            <div><span>JVM &amp; Memory</span><Link href="/topic/jvm-architecture" className="link-cta" style={{ fontSize: '0.875rem' }}>Start →</Link></div>
            <div><span>Spring Backend</span><Link href="/topic/spring-framework" className="link-cta" style={{ fontSize: '0.875rem' }}>Start →</Link></div>
          </div>
        </aside>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Choose your goal</h2>
            <p className="section-subtitle">Start from the path that matches your interview or backend learning goal.</p>
          </div>
        </div>
        <div className="goal-grid">
          {goalCards.map((goal) => (
            <article key={goal.title} className="card goal-card">
              <h3>{goal.title}</h3>
              <p>{goal.description}</p>
              <Link href={goal.href} className="link-cta">{goal.action} →</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Learning paths</h2>
            <p className="section-subtitle">Curated sequences to move through your study plan with confidence.</p>
          </div>
          <span className="section-note">Pick the lane that fits your current goal.</span>
        </div>
        <div className="path-grid">
          {learningPaths.map((path) => (
            <article key={path.title} className="card path-card">
              <h3>{path.title}</h3>
              <p>{path.description}</p>
              <div className="tag-row" style={{ marginTop: '1rem' }}>
                {topics.filter((topic) => path.slugs.includes(topic.slug)).slice(0, 4).map((topic) => (
                  <span className="tag" key={topic.slug}>{topic.title}</span>
                ))}
              </div>
              <div className="path-footer">
                <span>{path.slugs.length} topics</span>
                <Link href="/roadmap" className="link-cta">Start path →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section two-column-panel">
        <div className="card progress-panel">
          <h2>Continue learning</h2>
          <p className="section-subtitle">Resume the path that you started and keep your momentum.</p>
          <div className="progress-card-row">
            <div><span>Current track</span><strong>{progressPanel.path}</strong></div>
            <div><span>Next topic</span><strong>{progressPanel.next}</strong></div>
          </div>
          <div className="progress-card-row">
            <div><span>Status</span><strong>{progressPanel.status}</strong></div>
            <div><span>Overall completion</span><strong>{progressPanel.completion}%</strong></div>
          </div>
          <Link href="/roadmap" className="button-primary">Continue learning</Link>
        </div>
        <div className="card question-panel">
          <div className="section-header">
            <div>
              <h2 className="section-title">Featured interview questions</h2>
              <p className="section-subtitle">Practice high-frequency Java questions that appear in backend and system design interviews.</p>
            </div>
            <Link href="/interview-prep" className="link-cta">See all questions →</Link>
          </div>
          <div className="question-grid">
            {featuredInterviewQuestions.map((item) => (
              <article key={item.question} className="question-card">
                <p className="question-label">Question</p>
                <h3>{item.question}</h3>
                <div className="question-meta">
                  <span>{item.category}</span>
                  <span>{item.difficulty}</span>
                  <span>{item.frequency}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="topics" className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Popular topics</h2>
            <p className="section-subtitle">High-value Java and Spring topics for interview preparation.</p>
          </div>
          <Link href="/topic/oop-fundamentals" className="link-cta">Explore all topics →</Link>
        </div>
        <div className="grid grid-2" style={{ marginTop: '1rem' }}>
          {featuredTopics.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Featured articles</h2>
            <p className="section-subtitle">Move from concept to example with guided articles and practice tasks.</p>
          </div>
          <Link href="/search" className="link-cta">Search all articles →</Link>
        </div>
        <div className="grid grid-2" style={{ marginTop: '1rem' }}>
          {featuredArticles.map((article) => (
            <ArticlePreview key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}

export function getStaticProps() {
  const topics = getAllTopics();
  const articles = getAllArticles().map((article) => ({
    ...article,
    readingTime: Math.max(5, Math.round(article.sections.length * 2.25 + 2)),
    difficulty: ['jmm-concurrency-primitives', 'proxy-vs-decorator', 'reflection-power-risk', 'annotations-custom-metadata'].includes(article.slug)
      ? 'Advanced'
      : article.tags.includes('Spring') || article.tags.includes('Stream') || article.tags.includes('JMM')
      ? 'Intermediate'
      : 'Beginner',
  }));

  return {
    props: {
      topics,
      articles,
    },
  };
}
