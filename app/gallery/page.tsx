import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Poodle Haircut Gallery — Real Before & After Photos',
  description: 'Browse real before and after poodle grooming photos submitted by the community. Get inspired for your next haircut appointment.',
}

// In production these come from a database
// Community uploads would be moderated before showing
const SAMPLE_GALLERY = [
  { id: 1, cut: 'Teddy Bear Cut', size: 'Toy', color: 'Apricot', emoji: '🧸', votes: 234 },
  { id: 2, cut: 'Lamb Cut', size: 'Miniature', color: 'White', emoji: '🐑', votes: 187 },
  { id: 3, cut: 'Continental Cut', size: 'Standard', color: 'Black', emoji: '🏆', votes: 156 },
  { id: 4, cut: 'Asian Fusion Cut', size: 'Toy', color: 'Brown', emoji: '✨', votes: 312 },
  { id: 5, cut: 'Puppy Cut', size: 'Miniature', color: 'Cream', emoji: '🐾', votes: 198 },
  { id: 6, cut: 'Miami Cut', size: 'Standard', color: 'Silver', emoji: '🌴', votes: 143 },
]

export default function GalleryPage() {
  return (
    <div>
      {/* Header */}
      <div style={{ background: 'var(--cream)', borderBottom: '1px solid var(--border)', padding: '64px 0 48px' }}>
        <div className="container" style={{ maxWidth: 700 }}>
          <div className="tag" style={{ marginBottom: 16 }}>Community</div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: 16 }}>
            Before & After Gallery
          </h1>
          <p style={{ fontSize: 16, color: 'var(--ink-muted)', lineHeight: 1.7, marginBottom: 28 }}>
            Real poodle transformations submitted by owners like you. Get inspired — then try the AI tool to see any cut on your own poodle.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="/style-finder" className="btn-primary">
              Try AI Preview ✦
            </a>
            <button className="btn-outline" style={{ cursor: 'pointer' }}>
              Submit your poodle →
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px 80px' }}>
        {/* Submit CTA */}
        <div style={{
          background: 'var(--caramel-light)',
          border: '2px dashed var(--caramel)',
          borderRadius: 'var(--radius-lg)',
          padding: '32px',
          textAlign: 'center',
          marginBottom: 48,
        }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📸</div>
          <h2 style={{ fontSize: 22, marginBottom: 8 }}>Share your poodle's transformation</h2>
          <p style={{ color: 'var(--ink-muted)', fontSize: 14, maxWidth: 400, margin: '0 auto 20px', lineHeight: 1.6 }}>
            Got a great before & after from your last grooming appointment? Share it with the community.
          </p>
          <button className="btn-primary" style={{ cursor: 'pointer' }}>
            Submit before & after photos
          </button>
          <p style={{ fontSize: 11, color: 'var(--ink-faint)', marginTop: 12 }}>
            All submissions are reviewed before publishing · 100% free
          </p>
        </div>

        {/* Gallery grid — placeholder entries */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, marginBottom: 24 }}>Community photos</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {SAMPLE_GALLERY.map(entry => (
              <div key={entry.id} className="card">
                {/* Before/After side by side */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  {['Before', 'After'].map(label => (
                    <div key={label} style={{
                      background: label === 'After' ? 'var(--caramel-light)' : 'var(--border)',
                      aspectRatio: '1',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', gap: 8,
                      position: 'relative',
                    }}>
                      <span style={{ fontSize: label === 'After' ? 48 : 40, opacity: label === 'After' ? 1 : 0.5 }}>
                        {label === 'After' ? entry.emoji : '🐩'}
                      </span>
                      <span style={{
                        position: 'absolute', bottom: 8, left: 0, right: 0,
                        textAlign: 'center', fontSize: 10,
                        color: label === 'After' ? 'var(--caramel-dark)' : 'var(--ink-faint)',
                        fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase',
                      }}>{label}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{entry.cut}</div>
                      <div style={{ fontSize: 11, color: 'var(--ink-faint)' }}>{entry.size} · {entry.color}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--ink-muted)' }}>
                      <span>❤️</span>
                      <span>{entry.votes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Load more placeholder */}
        <div style={{ textAlign: 'center', padding: '32px 0' }}>
          <p style={{ color: 'var(--ink-muted)', fontSize: 14, marginBottom: 16 }}>
            Be the first to submit real photos from your community!
          </p>
          <a href="/style-finder" className="btn-outline">
            Create an AI preview instead →
          </a>
        </div>
      </div>
    </div>
  )
}
