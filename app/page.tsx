import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Poodle Haircuts — Find the Perfect Cut for Your Poodle',
}

const FEATURED_CUTS = [
  { name: 'Teddy Bear Cut', slug: 'teddy-bear-cut', emoji: '🧸', difficulty: 'Easy', desc: 'Round, fluffy, irresistible. The most popular cut on Instagram.' },
  { name: 'Lamb Cut', slug: 'lamb-cut', emoji: '🐑', difficulty: 'Easy', desc: 'Even all over, slightly fuller legs. Natural and elegant.' },
  { name: 'Continental Cut', slug: 'continental-cut', emoji: '🏆', difficulty: 'Advanced', desc: 'The iconic show ring look. Dramatic and unforgettable.' },
  { name: 'Miami / Bikini Cut', slug: 'miami-cut', emoji: '🌴', difficulty: 'Easy', desc: 'Short body, chic pom-poms. Perfect for warm climates.' },
  { name: 'Puppy Cut', slug: 'puppy-cut', emoji: '🐾', difficulty: 'Easy', desc: 'Uniform length all over. Classic, simple, always perfect.' },
  { name: 'Asian Fusion Cut', slug: 'asian-fusion-cut', emoji: '✨', difficulty: 'Medium', desc: 'Round head, sculpted ears. The trendiest look of 2026.' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        background: `radial-gradient(ellipse at 70% 50%, var(--caramel-light) 0%, transparent 60%), var(--cream)`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', right: -80, top: '15%',
          width: 500, height: 500,
          borderRadius: '50%',
          border: '1px solid var(--border)',
          opacity: 0.5,
        }} />
        <div style={{
          position: 'absolute', right: 40, top: '25%',
          width: 300, height: 300,
          borderRadius: '50%',
          border: '1px solid var(--border-dark)',
          opacity: 0.4,
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '80px 24px' }}>
          <div style={{ maxWidth: 680 }}>
            <div className="tag animate-fade-up" style={{ marginBottom: 24 }}>
              ✦ AI-powered style preview
            </div>
            <h1 className="animate-fade-up-delay" style={{ fontSize: 'clamp(48px, 7vw, 80px)', lineHeight: 1.05, marginBottom: 28 }}>
              Find the perfect cut for your{' '}
              <em style={{ color: 'var(--caramel)', fontStyle: 'italic' }}>poodle.</em>
            </h1>
            <p style={{
              fontSize: 18, color: 'var(--ink-muted)', maxWidth: 500,
              marginBottom: 40, lineHeight: 1.7, fontWeight: 300,
              animation: 'fadeUp 0.5s ease 0.2s both',
            }}>
              Upload your poodle's photo, pick any of 18+ haircut styles, and see an AI preview — before your next grooming appointment.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', animation: 'fadeUp 0.5s ease 0.3s both' }}>
              <a href="/style-finder" className="btn-primary">
                Try the AI Tool — it's free
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="/cuts" className="btn-outline">Browse all 18 cuts</a>
            </div>

            {/* Social proof */}
            <div style={{ marginTop: 48, display: 'flex', gap: 32, alignItems: 'center' }}>
              {[
                ['18+', 'poodle cut styles'],
                ['AI', 'photo preview'],
                ['Free', 'to use'],
              ].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 500 }}>{val}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-faint)', marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Tool teaser */}
      <section style={{ background: 'var(--ink)', padding: '80px 0', color: 'var(--cream)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div className="tag" style={{ background: 'rgba(200,119,58,0.2)', color: 'var(--caramel)', marginBottom: 20 }}>
                ✦ Before / After AI
              </div>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: 20, color: 'var(--cream)' }}>
                See any haircut on your own poodle
              </h2>
              <p style={{ color: 'rgba(250,248,244,0.65)', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
                Upload a photo of your poodle. Choose from 18 professionally defined cuts. Our AI — powered by FLUX Kontext — transforms your image while keeping your poodle's unique features and color intact.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
                {[
                  '🖼️  Upload your poodle photo',
                  '✂️  Choose from 18 haircut styles',
                  '✨  AI generates the before & after',
                  '📤  Share on TikTok or Instagram',
                ].map(step => (
                  <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: 'rgba(250,248,244,0.8)' }}>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
              <a href="/style-finder" className="btn-primary">
                Try it free — no account needed
              </a>
            </div>
            {/* Visual mockup of before/after */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {['Before', 'After'].map((label) => (
                <div key={label} style={{
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  aspectRatio: '3/4',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                  padding: 24,
                }}>
                  <div style={{ fontSize: 64 }}>{label === 'Before' ? '🐩' : '✨'}</div>
                  <div style={{
                    fontSize: 12, fontWeight: 500, letterSpacing: '0.08em',
                    textTransform: 'uppercase', color: 'rgba(250,248,244,0.4)',
                  }}>{label}</div>
                  {label === 'After' && (
                    <div style={{
                      fontSize: 11, color: 'var(--caramel)',
                      fontWeight: 500, letterSpacing: '0.04em',
                    }}>Teddy Bear Cut</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured cuts */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
            <div>
              <div className="tag" style={{ marginBottom: 12 }}>Styles</div>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)' }}>Most popular poodle cuts</h2>
            </div>
            <a href="/cuts" style={{ fontSize: 14, color: 'var(--caramel)', fontWeight: 500 }}>
              See all 18 cuts →
            </a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {FEATURED_CUTS.map((cut) => (
              <a key={cut.slug} href={`/cuts/${cut.slug}`} className="card" style={{ textDecoration: 'none' }}>
                {/* Cut visual header */}
                <div style={{
                  background: 'var(--caramel-light)',
                  padding: '40px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 56,
                }}>
                  {cut.emoji}
                </div>
                <div style={{ padding: '20px 24px 24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 500 }}>{cut.name}</h3>
                    <span style={{
                      fontSize: 11, padding: '3px 8px', borderRadius: 100,
                      background: cut.difficulty === 'Easy' ? 'var(--sage-light)' : cut.difficulty === 'Advanced' ? 'var(--blush)' : 'var(--caramel-light)',
                      color: cut.difficulty === 'Easy' ? 'var(--sage)' : cut.difficulty === 'Advanced' ? '#b55' : 'var(--caramel-dark)',
                      fontWeight: 500,
                    }}>{cut.difficulty}</span>
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.5, marginBottom: 16 }}>{cut.desc}</p>
                  <span style={{ fontSize: 13, color: 'var(--caramel)', fontWeight: 500 }}>
                    Full guide + AI preview →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ background: 'var(--caramel-light)', padding: '64px 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          <div className="tag" style={{ marginBottom: 20 }}>Shop</div>
          <h2 style={{ fontSize: 'clamp(28px, 3vw, 40px)', marginBottom: 16 }}>
            Find accessories for your poodle's style
          </h2>
          <p style={{ color: 'var(--ink-muted)', fontSize: 16, marginBottom: 32 }}>
            Grooming tools, clothing with poodle motifs, and accessories for every cut — all on Poodles World.
          </p>
          <a href="https://poodlesworld.com?utm_source=poodlehaircuts&utm_medium=cta&utm_campaign=homepage"
            target="_blank" rel="noopener" className="btn-primary">
            Shop Poodles World
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>
    </>
  )
}
