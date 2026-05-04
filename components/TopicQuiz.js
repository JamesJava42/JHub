import { useState } from 'react';
import { useQuizResults } from '../hooks/useQuizResults';

export default function TopicQuiz({ topicSlug, questions }) {
  const { saveResult, getResult } = useQuizResults();
  const prior = getResult(topicSlug);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [passed, setPassed] = useState(false);
  const [retrying, setRetrying] = useState(false);

  if (!questions || questions.length === 0) return null;

  function handleSelect(index) {
    if (selected !== null) return;
    setSelected(index);
  }

  function handleNext() {
    const newAnswers = [...answers, selected];
    if (current + 1 < questions.length) {
      setAnswers(newAnswers);
      setCurrent(current + 1);
      setSelected(null);
    } else {
      const score = newAnswers.filter((a, i) => a === questions[i].answer).length;
      const didPass = saveResult(topicSlug, score, questions.length);
      setPassed(didPass);
      setAnswers(newAnswers);
      setFinished(true);
    }
  }

  function handleRetry() {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setFinished(false);
    setRetrying(true);
  }

  const q = questions[current];
  const isCorrect = selected === q.answer;
  const score = answers.filter((a, i) => a === questions[i].answer).length;

  if (finished) {
    const finalScore = answers.filter((a, i) => a === questions[i].answer).length;
    return (
      <div className="card" style={{ padding: '1.5rem', marginTop: '2rem' }}>
        <p className="eyebrow">Quiz complete</p>
        <h2 className="section-title" style={{ margin: '0 0 0.5rem' }}>
          {passed ? 'Topic complete!' : 'Keep studying'}
        </h2>
        <p className="section-subtitle">
          You scored {finalScore} / {questions.length}.{' '}
          {passed
            ? 'You passed — this topic is marked complete.'
            : `You need ${Math.ceil(questions.length * 0.8)} to pass. Review the topic and try again.`}
        </p>
        <div className="grid grid-2" style={{ marginTop: '1rem' }}>
          {questions.map((question, index) => {
            const userAnswer = answers[index];
            const correct = userAnswer === question.answer;
            return (
              <div
                key={index}
                className="mini-card"
                style={{
                  borderColor: correct ? '#10b981' : '#ef4444',
                  background: correct ? '#f0fdf4' : '#fef2f2',
                }}
              >
                <p style={{ fontWeight: 600, margin: '0 0 0.5rem' }}>{index + 1}. {question.q}</p>
                <p style={{ margin: '0 0 0.25rem', fontSize: '0.875rem', color: correct ? '#065f46' : '#991b1b' }}>
                  Your answer: {question.options[userAnswer]}
                </p>
                {!correct && (
                  <p style={{ margin: '0 0 0.25rem', fontSize: '0.875rem', color: '#065f46' }}>
                    Correct: {question.options[question.answer]}
                  </p>
                )}
                <p style={{ margin: '0.5rem 0 0', fontSize: '0.8rem', color: '#6b7280' }}>
                  {question.explanation}
                </p>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
          <button className="button-primary" style={{ background: '#374151', border: 'none', cursor: 'pointer' }} onClick={handleRetry}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: '1.5rem', marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <p className="eyebrow" style={{ margin: 0 }}>
          Topic quiz · Question {current + 1} of {questions.length}
        </p>
        {prior && !retrying && (
          <span style={{ fontSize: '0.8rem', color: prior.passed ? '#059669' : '#d97706' }}>
            Previous best: {prior.score}/{prior.total}
          </span>
        )}
      </div>

      <div style={{ height: '4px', background: '#e5e7eb', borderRadius: '9999px', marginBottom: '1.5rem' }}>
        <div
          style={{
            height: '100%',
            width: `${((current) / questions.length) * 100}%`,
            background: 'linear-gradient(90deg, #2563eb 0%, #4f46e5 100%)',
            borderRadius: '9999px',
            transition: 'width 0.3s',
          }}
        />
      </div>

      <h3 style={{ margin: '0 0 1.25rem', fontSize: '1.1rem', lineHeight: 1.5 }}>{q.q}</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {q.options.map((option, index) => {
          let bg = '#f8fafc';
          let border = '#e5e7eb';
          let color = '#111827';
          if (selected !== null) {
            if (index === q.answer) { bg = '#f0fdf4'; border = '#10b981'; color = '#065f46'; }
            else if (index === selected && selected !== q.answer) { bg = '#fef2f2'; border = '#ef4444'; color = '#991b1b'; }
          } else if (selected === index) {
            bg = '#eef2ff'; border = '#6366f1';
          }
          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              style={{
                background: bg,
                border: `2px solid ${border}`,
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                textAlign: 'left',
                cursor: selected === null ? 'pointer' : 'default',
                color,
                fontWeight: selected !== null && index === q.answer ? 600 : 400,
                transition: 'all 0.15s',
              }}
            >
              <span style={{ fontWeight: 700, marginRight: '0.5rem' }}>
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div
          style={{
            marginTop: '1rem',
            padding: '0.875rem',
            borderRadius: '12px',
            background: isCorrect ? '#f0fdf4' : '#fef2f2',
            border: `1px solid ${isCorrect ? '#10b981' : '#ef4444'}`,
          }}
        >
          <p style={{ margin: 0, fontWeight: 600, color: isCorrect ? '#065f46' : '#991b1b' }}>
            {isCorrect ? 'Correct!' : 'Not quite.'}
          </p>
          <p style={{ margin: '0.4rem 0 0', fontSize: '0.875rem', color: '#374151' }}>
            {q.explanation}
          </p>
        </div>
      )}

      <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          className="button-primary"
          style={{ border: 'none', cursor: selected === null ? 'not-allowed' : 'pointer', opacity: selected === null ? 0.5 : 1 }}
          disabled={selected === null}
          onClick={handleNext}
        >
          {current + 1 < questions.length ? 'Next question →' : 'See results'}
        </button>
      </div>
    </div>
  );
}
