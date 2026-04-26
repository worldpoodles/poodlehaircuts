import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Poodle Haircuts — Find the Perfect Cut for Your Poodle', template: '%s | Poodle Haircuts' },
  description: 'The ultimate guide to poodle haircuts. Use our AI tool to preview any cut on your poodle, browse 18+ styles, and get expert grooming advice.',
  keywords: 'poodle haircuts, poodle cuts, poodle grooming styles, teddy bear cut poodle, poodle hairstyles',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://poodlehaircuts.com',
    siteName: 'Poodle Haircuts',
    title: 'Poodle Haircuts — Find the Perfect Cut for Your Poodle',
    description: 'AI-powered poodle haircut preview tool + expert guides for every style.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

function Nav() {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(250,248,244,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 22 }}>🐩</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500, letterSpacing: '-0.02em' }}>
            Poodle Haircuts
          </span>
        </a>
        <nav style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {[
            ['Cuts', '/cuts'],
            ['Blog', '/blog'],
            ['Gallery', '/gallery'],
          ].map(([label, href]) => (
            <a key={href} href={href} style={{
              padding: '6px 14px',
              fontSize: 14,
              color: 'var(--ink-muted)',
              borderRadius: 'var(--radius-sm)',
              transition: 'color 0.15s, background 0.15s',
            }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = 'var(--ink)'; (e.target as HTMLElement).style.background = 'var(--border)'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = 'var(--ink-muted)'; (e.target as HTMLElement).style.background = 'transparent'; }}
            >{label}</a>
          ))}
          <a href="/style-finder" className="btn-primary" style={{ padding: '8px 18px', fontSize: 13 }}>
            Try AI Tool ✦
          </a>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', marginTop: 80, padding: '48px 0 32px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, marginBottom: 12 }}>🐩 Poodle Haircuts</div>
            <p style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.6 }}>
              The #1 resource for poodle grooming styles. AI-powered style preview, expert guides, and community photos.
            </p>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 14 }}>Explore</div>
            {[['All Cuts', '/cuts'], ['Style Finder', '/style-finder'], ['Blog', '/blog'], ['Gallery', '/gallery']].map(([l, h]) => (
              <div key={h} style={{ marginBottom: 8 }}>
                <a href={h} style={{ fontSize: 14, color: 'var(--ink-muted)' }}>{l}</a>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 14 }}>Shop</div>
            <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 12 }}>
              Find grooming accessories, clothing with poodle motifs, and more.
            </p>
            <a href="https://poodlesworld.com?utm_source=poodlehaircuts&utm_medium=footer" target="_blank" rel="noopener"
              style={{ fontSize: 14, color: 'var(--caramel)', fontWeight: 500 }}>
              Visit Poodles World →
            </a>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: 12, color: 'var(--ink-faint)' }}>© 2026 PoodleHaircuts.com — All rights reserved</p>
          <p style={{ fontSize: 12, color: 'var(--ink-faint)' }}>Made for poodle lovers 🐾</p>
        </div>
      </div>
    </footer>
  )
}
