import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { POODLE_CUTS, getCutBySlug } from '../../../lib/cuts'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return POODLE_CUTS.map(cut => ({ slug: cut.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cut = getCutBySlug(params.slug)
  if (!cut) return {}
  return {
    title: `${cut.name} for Poodles — Complete Guide`,
    description: `${cut.longDesc.slice(0, 155)}...`,
    keywords: `${cut.name.toLowerCase()}, poodle ${cut.name.toLowerCase()}, poodle haircuts, poodle grooming`,
    openGraph: {
      title: `${cut.name} — Poodle Haircut Guide`,
      description: cut.desc,
    },
  }
}

const DIFFICULTY_COLORS = {
  Easy: { bg: '#ddeadf', text: '#3b6d11' },
  Medium: { bg: '#f0d9c4', text: '#9e5a24' },
  Advanced: { bg: '#e8c4c4', text: '#a03333' },
}

export default function CutPage({ params }: Props) {
  const cut = getCutBySlug(params.slug)
  if (!cut) notFound()

  const diff = DIFFICULTY_COLORS[cut.difficulty]

  // Related cuts (same category, different slug)
  const related = POODLE_CUTS.filter(c => c.category === cut.category && c.slug !== cut.slug).slice(0, 3)

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--warm-white)', borderBottom: '1px solid var(--border)', padding: '12px 0' }}>
        <div className="container">
          <nav style={{ fontSize: 13, color: 'var(--ink-faint)' }}>
            <a href="/" style={{ color: 'var(--ink-faint)' }}>Home</a>
            <span style={{ margin: '0 8px' }}>›</span>
            <a href="/cuts" style={{ color: 'var(--ink-faint)' }}>Haircuts</a>
            <span style={{ margin: '0 8px' }}>›</span>
            <span style={{ color: 'var(--ink)' }}>{cut.name}</span>
          </nav>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 64, alignItems: 'start' }}>
          {/* Main content */}
          <article>
            {/* Header */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
                <span className="tag">{cut.category}</span>
                <span style={{
                  fontSize: 11, padding: '4px 10px', borderRadius: 100,
                  background: diff.bg, color: diff.text, fontWeight: 500,
                }}>{cut.difficulty}</span>
              </div>
              <h1 style={{ fontSize: 'clamp(32px, 4vw, 52px)', marginBottom: 16 }}>
                {cut.emoji} {cut.name}
              </h1>
              <p style={{ fontSize: 18, color: 'var(--ink-muted)', lineHeight: 1.7 }}>
                {cut.longDesc}
              </p>
            </div>

            {/* Quick stats */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 1, background: 'var(--border)',
              borderRadius: 'var(--radius-md)', overflow: 'hidden',
              marginBottom: 48, border: '1px solid var(--border)',
            }}>
              {[
                ['Maintenance', cut.maintenance],
                ['Grooming frequency', cut.frequency],
                ['Best for', cut.bestFor],
              ].map(([label, value]) => (
                <div key={label} style={{ padding: '20px', background: 'var(--warm-white)', textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{label}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>{value}</div>
                </div>
              ))}
            </div>

            {/* Guide sections */}
            <section style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 24, marginBottom: 16 }}>What is the {cut.name}?</h2>
              <p style={{ fontSize: 16, color: 'var(--ink-muted)', lineHeight: 1.8 }}>{cut.longDesc}</p>
            </section>

            <section style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 24, marginBottom: 20 }}>Is the {cut.name} right for your poodle?</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  [`✓ Your poodle is ${cut.bestFor.toLowerCase()}`, true],
                  [`✓ You can groom every ${cut.frequency.toLowerCase()}`, true],
                  [`✓ You prefer ${cut.maintenance.toLowerCase()} maintenance`, true],
                  ['✗ You need a show-standard AKC cut', cut.category === 'Show' ? false : true],
                ].map(([text, isGood]) => (
                  <div key={String(text)} style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    background: isGood ? 'var(--sage-light)' : 'var(--blush)',
                    color: isGood ? '#27500a' : '#a03333',
                    fontSize: 14,
                  }}>{String(text)}</div>
                ))}
              </div>
            </section>

            <section style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 24, marginBottom: 16 }}>Maintenance tips for the {cut.name}</h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  `Brush your poodle ${cut.maintenance === 'Low' ? '2–3 times per week' : 'daily or every other day'} to prevent matting`,
                  `Schedule professional grooming ${cut.frequency.toLowerCase()}`,
                  `Clean ears weekly — poodles are prone to ear infections`,
                  `Trim nails every 3–4 weeks`,
                  cut.difficulty === 'Easy'
                    ? 'This cut can be maintained at home with practice'
                    : 'Professional grooming is strongly recommended for best results',
                ].map((tip, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--caramel)', flexShrink: 0, fontWeight: 500 }}>→</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </section>

            {/* FAQ — good for SEO */}
            <section>
              <h2 style={{ fontSize: 24, marginBottom: 24 }}>Frequently asked questions</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  [`How often should I groom my poodle with the ${cut.name}?`, `The ${cut.name} requires professional grooming ${cut.frequency.toLowerCase()}. Between appointments, brush regularly to prevent matting.`],
                  [`Is the ${cut.name} suitable for all poodle sizes?`, `The ${cut.name} works best for ${cut.bestFor.toLowerCase()}. It can be adapted for other sizes but may look different depending on coat density.`],
                  [`Can I do the ${cut.name} at home?`, cut.difficulty === 'Easy' ? `Yes, with the right tools (clippers, scissors, slicker brush) and some practice, you can maintain the ${cut.name} at home. Start with professional guidance first.` : `The ${cut.name} is best left to professional groomers due to its complexity. Attempting it at home may result in uneven results.`],
                  [`How much does the ${cut.name} cost at a groomer?`, `Professional grooming for the ${cut.name} typically costs $50–$150+ depending on your poodle's size, location, and the groomer's experience.`],
                ].map(([q, a]) => (
                  <details key={String(q)} style={{
                    background: 'var(--warm-white)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                  }}>
                    <summary style={{
                      padding: '16px 20px', fontWeight: 500, fontSize: 15,
                      cursor: 'pointer', listStyle: 'none',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }}>
                      {String(q)}
                      <span style={{ fontSize: 18, color: 'var(--ink-faint)', flexShrink: 0, marginLeft: 16 }}>+</span>
                    </summary>
                    <div style={{ padding: '0 20px 16px', fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.7, borderTop: '1px solid var(--border)' }}>
                      {String(a)}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </article>

          {/* Sidebar */}
          <aside style={{ position: 'sticky', top: 80 }}>
            {/* AI Tool CTA */}
            <div style={{
              background: 'var(--ink)', color: 'var(--cream)',
              borderRadius: 'var(--radius-lg)', padding: '28px 24px', marginBottom: 20,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>{cut.emoji}</div>
              <h3 style={{ color: 'var(--cream)', fontSize: 18, marginBottom: 10 }}>
                See this cut on your poodle
              </h3>
              <p style={{ color: 'rgba(250,248,244,0.65)', fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
                Upload your poodle's photo and our AI will show you how the {cut.name} would look.
              </p>
              <a
                href={`/style-finder`}
                style={{
                  display: 'block', padding: '12px 20px',
                  background: 'var(--caramel)', color: 'var(--cream)',
                  borderRadius: 'var(--radius-md)', fontSize: 14, fontWeight: 500,
                  textDecoration: 'none', textAlign: 'center',
                }}
              >
                Try AI Preview — Free ✦
              </a>
            </div>

            {/* Shop CTA */}
            <div style={{
              background: 'var(--caramel-light)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: 20,
            }}>
              <h3 style={{ fontSize: 16, marginBottom: 8 }}>Shop for this style</h3>
              <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 16, lineHeight: 1.5 }}>
                Grooming tools, accessories, and poodle-themed products on Poodles World.
              </p>
              <a
                href={cut.shopLink}
                target="_blank" rel="noopener"
                className="btn-primary"
                style={{ display: 'block', textAlign: 'center', fontSize: 13 }}
              >
                Shop Poodles World →
              </a>
            </div>

            {/* Related cuts */}
            {related.length > 0 && (
              <div style={{ background: 'var(--warm-white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px 24px' }}>
                <h3 style={{ fontSize: 15, marginBottom: 16 }}>Similar styles</h3>
                {related.map(r => (
                  <a key={r.slug} href={`/cuts/${r.slug}`} style={{
                    display: 'flex', gap: 12, alignItems: 'center',
                    padding: '10px 0', borderBottom: '1px solid var(--border)',
                    textDecoration: 'none',
                  }}>
                    <span style={{ fontSize: 24, flexShrink: 0 }}>{r.emoji}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{r.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--ink-faint)' }}>{r.difficulty} · {r.frequency}</div>
                    </div>
                  </a>
                ))}
                <a href="/cuts" style={{ display: 'block', textAlign: 'center', fontSize: 12, color: 'var(--caramel)', marginTop: 12, fontWeight: 500 }}>
                  See all 18 cuts →
                </a>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
