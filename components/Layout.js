import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div>
      <header className="header">
        <div className="container navbar">
          <Link href="/">
            <span className="link-span" style={{ color: 'white', fontWeight: '700', fontSize: '1.25rem' }}>Java Study Hub</span>
          </Link>
          <nav style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/">
              <span className="link-span">Home</span>
            </Link>
            <a href="#topics">Topics</a>
            <a href="#articles">Articles</a>
          </nav>
        </div>
      </header>
      <main className="container main">{children}</main>
      <footer className="container footer">
        <p>Built for Java learners and interview preparation.</p>
      </footer>
    </div>
  );
}
