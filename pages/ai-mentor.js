import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const SUGGESTED_QUESTIONS = [
  'How does HashMap work internally?',
  'Explain the Java Memory Model',
  'How does Spring dependency injection work?',
  'What is the difference between volatile and synchronized?',
  'How do virtual threads differ from OS threads?',
  'What is the N+1 query problem and how do you fix it?',
];

function MessageBubble({ role, content }) {
  const isUser = role === 'user';
  const lines = content.split('\n');
  const parts = [];
  let codeBuffer = [];
  let inCode = false;
  let langHint = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('```')) {
      if (!inCode) {
        inCode = true;
        langHint = line.slice(3).trim();
      } else {
        parts.push({ type: 'code', content: codeBuffer.join('\n'), lang: langHint });
        codeBuffer = [];
        inCode = false;
        langHint = '';
      }
    } else if (inCode) {
      codeBuffer.push(line);
    } else {
      if (line.trim()) parts.push({ type: 'text', content: line });
      else if (parts.length > 0 && parts[parts.length - 1].type !== 'spacer') parts.push({ type: 'spacer' });
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '1rem',
      }}
    >
      <div
        style={{
          maxWidth: '85%',
          background: isUser ? '#2563eb' : '#ffffff',
          color: isUser ? '#ffffff' : '#111827',
          border: isUser ? 'none' : '1px solid #e5e7eb',
          borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          padding: '0.875rem 1.125rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
        }}
      >
        {isUser ? (
          <p style={{ margin: 0, lineHeight: 1.5 }}>{content}</p>
        ) : (
          parts.map((part, i) => {
            if (part.type === 'code') {
              return (
                <pre
                  key={i}
                  style={{
                    background: '#111827',
                    color: '#f8fafc',
                    padding: '0.875rem',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    overflowX: 'auto',
                    margin: '0.5rem 0',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  <code>{part.content}</code>
                </pre>
              );
            }
            if (part.type === 'spacer') return <div key={i} style={{ height: '0.5rem' }} />;
            return <p key={i} style={{ margin: 0, lineHeight: 1.6 }}>{part.content}</p>;
          })
        )}
      </div>
    </div>
  );
}

export default function AIMentor() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [configured, setConfigured] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function send(text) {
    const question = (text || input).trim();
    if (!question || loading) return;
    setInput('');

    const newMessages = [...messages, { role: 'user', content: question }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch('/api/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 503) setConfigured(false);
        setMessages([...newMessages, { role: 'assistant', content: data.error || 'Something went wrong.' }]);
      } else {
        setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
      }
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Network error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)', maxHeight: '820px' }}>
      <section style={{ marginBottom: '1rem' }}>
        <p className="eyebrow">AI Mentor</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h1 className="section-title" style={{ margin: 0 }}>Java AI Mentor</h1>
          <Link href="/interview-prep" className="link-cta" style={{ fontSize: '0.875rem' }}>← Interview Prep</Link>
        </div>
        <p className="section-subtitle">Ask any Java, Spring, JVM, or backend question. Answers are focused on interview readiness and real-world usage.</p>
      </section>

      {!configured && (
        <div className="card" style={{ padding: '1rem', marginBottom: '1rem', background: '#fffbeb', borderColor: '#f59e0b' }}>
          <strong>AI Mentor not configured.</strong> Add <code>ANTHROPIC_API_KEY</code> to your <code>.env.local</code> file to enable this feature.
        </div>
      )}

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1rem',
          background: '#f5f7fb',
          borderRadius: '16px',
          border: '1px solid #e5e7eb',
          marginBottom: '1rem',
        }}
      >
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Ask a question or pick a suggestion below to get started.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  className="suggestion-pill"
                  onClick={() => send(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} content={msg.content} />
        ))}

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem' }}>
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '18px 18px 18px 4px',
                padding: '0.875rem 1.125rem',
                color: '#6b7280',
                fontSize: '0.9rem',
              }}
            >
              Thinking…
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask a Java question… (Enter to send, Shift+Enter for new line)"
          rows={2}
          style={{
            flex: 1,
            padding: '0.85rem 1rem',
            borderRadius: '14px',
            border: '1px solid #d1d5db',
            background: '#ffffff',
            resize: 'none',
            fontFamily: 'inherit',
            fontSize: '1rem',
            lineHeight: 1.5,
          }}
        />
        <button
          onClick={() => send()}
          disabled={!input.trim() || loading}
          className="button-primary"
          style={{
            border: 'none',
            cursor: !input.trim() || loading ? 'not-allowed' : 'pointer',
            opacity: !input.trim() || loading ? 0.5 : 1,
            padding: '0.85rem 1.5rem',
            height: 'fit-content',
          }}
        >
          Send
        </button>
      </div>

      {messages.length > 0 && (
        <button
          onClick={() => setMessages([])}
          style={{ marginTop: '0.5rem', background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: '0.8rem', textAlign: 'right' }}
        >
          Clear conversation
        </button>
      )}
    </div>
  );
}
