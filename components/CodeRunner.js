import { useState } from 'react';

export default function CodeRunner({ code }) {
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function run() {
    setLoading(true);
    setError(null);
    setOutput(null);
    try {
      const res = await fetch('/api/run-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Run failed');
      } else {
        setOutput(data);
      }
    } catch {
      setError('Network error — could not reach the code runner.');
    } finally {
      setLoading(false);
    }
  }

  const hasOutput = output && (output.stdout || output.stderr);

  return (
    <div style={{ marginTop: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 600, letterSpacing: '0.05em' }}>JAVA</span>
        <button
          onClick={run}
          disabled={loading}
          style={{
            background: loading ? '#374151' : '#2563eb',
            color: '#ffffff',
            border: 'none',
            borderRadius: '9999px',
            padding: '0.3rem 0.85rem',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: loading ? 'wait' : 'pointer',
          }}
        >
          {loading ? 'Running…' : '▶ Run'}
        </button>
      </div>

      <pre className="code-block">
        <code>{code}</code>
      </pre>

      {error && (
        <div style={{ marginTop: '0.5rem', padding: '0.75rem', background: '#fef2f2', border: '1px solid #ef4444', borderRadius: '12px', color: '#991b1b', fontSize: '0.875rem' }}>
          {error}
        </div>
      )}

      {hasOutput && (
        <div style={{ marginTop: '0.5rem' }}>
          {output.stdout && (
            <pre
              style={{
                background: '#0f172a',
                color: '#4ade80',
                padding: '0.85rem 1rem',
                borderRadius: '12px',
                fontSize: '0.875rem',
                overflowX: 'auto',
                margin: 0,
                whiteSpace: 'pre-wrap',
              }}
            >
              {output.stdout}
            </pre>
          )}
          {output.stderr && (
            <pre
              style={{
                background: '#1c1917',
                color: '#fca5a5',
                padding: '0.85rem 1rem',
                borderRadius: '12px',
                fontSize: '0.875rem',
                overflowX: 'auto',
                margin: output.stdout ? '0.5rem 0 0' : 0,
                whiteSpace: 'pre-wrap',
              }}
            >
              {output.stderr}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
