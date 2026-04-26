const EXPLORE_LINKS = [
  { label: 'All Cuts', href: '/cuts' },
  { label: 'Style Finder', href: '/style-finder' },
  { label: 'Blog', href: '/blog' },
  { label: 'Gallery', href: '/gallery' },
]

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      marginTop: 80,
      padding: '48px 0 32px',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 40,
          marginBottom: 48,
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 16,
              marginBottom: 12,
              color: 'var(--ink)',
            }}>
              🐩 Poodle Haircuts
            </div>
            <p style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.6 }}>
              The #1 resource for poodle grooming styles. AI-powered style preview, expert
              guides, and community photos.
            </p>
          </div>

          <div>
            <div style={{
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--ink-faint)',
              marginBottom: 14,
            }}>
              Explore
            </div>
            {EXPLORE_LINKS.map(({ label, href }) => (
              <div key={href} style={{ marginBottom: 8 }}>
                <a href={href} style={{ fontSize: 14, color: 'var(--ink-muted)', textDecoration: 'none' }}>
                  {label}
                </a>
              </div>
            ))}
          </div>

          <div>
            <div style={{
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--ink-faint)',
              marginBottom: 14,
            }}>
              Shop
            </div>
            <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 12, lineHeight: 1.5 }}>
              Grooming accessories, clothing with poodle motifs, and more.
            </p>
            <a
              href="https://poodlesworld.com?utm_source=poodlehaircuts&utm_medium=footer"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 14, color: 'var(--caramel)', fontWeight: 500, textDecoration: 'none' }}
            >
              Visit Poodles World →
            </a>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 8,
        }}>
          <p style={{ fontSize: 12, color: 'var(--ink-faint)' }}>
            © 2026 PoodleHaircuts.com — All rights reserved
          </p>
          <p style={{ fontSize: 12, color: 'var(--ink-faint)' }}>
            Made for poodle lovers 🐾
          </p>
        </div>
      </div>
    </footer>
  )
}
