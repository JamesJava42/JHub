import Link from 'next/link';

export default function Layout({ children }) {
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
            <Link href="/search" className="nav-link">Search</Link>
            <a href="#topics" className="nav-link">Topics</a>
            <a href="#articles" className="nav-link">Articles</a>
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
