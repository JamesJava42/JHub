import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const commands = [
  { title: 'Search Java topics', subtitle: 'Find concepts, tags, and articles', href: '/search' },
  { title: 'Open roadmap', subtitle: 'Follow the guided Java study path', href: '/roadmap' },
  { title: 'Interview prep', subtitle: 'Practice interview questions and answers', href: '/interview-prep' },
  { title: 'Continue learning', subtitle: 'Resume your current track', href: '/roadmap' },
  { title: 'Start backend path', subtitle: 'Learn Spring, REST, SQL, and backend design', href: '/roadmap' },
  { title: 'Ask AI mentor', subtitle: 'Get a contextual Java explanation', href: '/interview-prep' },
];

export default function CommandPalette({ open, onClose }) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!open) return;

    const listener = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [open, onClose]);

  if (!open) return null;

  const lowerQuery = query.toLowerCase().trim();
  const visibleCommands = commands.filter((command) => {
    if (!lowerQuery) return true;
    return (
      command.title.toLowerCase().includes(lowerQuery) ||
      command.subtitle.toLowerCase().includes(lowerQuery)
    );
  });

  return (
    <div className="command-palette-overlay" onClick={onClose}>
      <div className="command-palette-panel" onClick={(event) => event.stopPropagation()}>
        <div className="command-palette-header">
          <div>
            <p className="eyebrow">Command palette</p>
            <h2 className="section-title" style={{ margin: 0, fontSize: '1.5rem' }}>Press Enter to run a command</h2>
          </div>
          <button className="nav-action" onClick={onClose}>Close</button>
        </div>
        <input
          autoFocus
          className="search-input command-input"
          placeholder="Search commands or jump to a page..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && visibleCommands[0]) {
              router.push(visibleCommands[0].href);
              onClose();
            }
          }}
        />
        <div className="command-list">
          {visibleCommands.map((command) => (
            <button
              key={command.title}
              className="command-item"
              onClick={() => {
                router.push(command.href);
                onClose();
              }}
            >
              <div>
                <strong>{command.title}</strong>
                <p>{command.subtitle}</p>
              </div>
            </button>
          ))}
          {visibleCommands.length === 0 ? (
            <div className="command-item empty-state">No matching commands found.</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
