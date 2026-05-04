import { useEffect, useState } from 'react';
import Link from 'next/link';
import CommandPalette from './CommandPalette';

export default function Layout({ children }) {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const listener = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, []);

  return (
    <div>
      <header className="header">
        <div className="container navbar">
          <Link href="/">
            <span className="brand">Java Study Hub</span>
          </Link>
          <nav className="site-nav">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/roadmap" className="nav-link">Roadmap</Link>
            <Link href="/topics" className="nav-link">Topics</Link>
            <Link href="/article/reflection-power-risk" className="nav-link">Articles</Link>
            <Link href="/interview-prep" className="nav-link">Interview Prep</Link>
            <Link href="/search" className="nav-link">Search</Link>
          </nav>
          <div className="nav-actions">
            <button className="nav-action" onClick={() => setPaletteOpen(true)}>Cmd+K</button>
            <button className="nav-action">Theme</button>
            <Link href="/ai-mentor" className="nav-action">AI Mentor</Link>
          </div>
        </div>
      </header>
      <main className="container main">{children}</main>
      <footer className="container footer">
        <p>Built for Java learners and interview preparation.</p>
      </footer>
      <nav className="bottom-nav">
        <Link href="/" className="bottom-nav-link">Home</Link>
        <Link href="/roadmap" className="bottom-nav-link">Roadmap</Link>
        <Link href="/search" className="bottom-nav-link">Search</Link>
        <Link href="/interview-prep" className="bottom-nav-link">Practice</Link>
        <Link href="/saved" className="bottom-nav-link">Saved</Link>
      </nav>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}
