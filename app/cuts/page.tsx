import type { Metadata } from 'next'
import { POODLE_CUTS } from '../../lib/cuts'

export const metadata: Metadata = {
  title: 'All Poodle Haircuts — 18 Styles with Guides',
  description: 'Browse all 18 poodle haircut styles — from the popular Teddy Bear Cut to the elegant Continental. Each style includes a complete guide, maintenance tips, and AI preview.',
}

const DIFFICULTY_COLORS = {
  Easy: { bg: 'var(--sage-light)', text: 'var(--sage)' },
  Medium: { bg: 'var(--caramel-light)', text: 'var(--caramel-dark)' },
  Advanced: { bg: 'var(--blush)', text: '#b55' },
}

const CATEGORIES = ['All', 'Popular', 'Trending', 'Warm Weather', 'Cold Weather', 'Classic', 'Show', 'Practical', 'Creative']

export default function CutsPage() {
  const grouped = CATEGORIES.slice(1).reduce((acc, cat) => {
    const cuts = POODLE_CUTS.filter(c => c.category === cat)
    if (cuts.length > 0) acc[cat] = cuts
    return acc
  }, {} as Record<string, typeof POODLE_CUTS>)

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--caramel-light)', padding: '64px 0 48px', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: 700 }}>
          <div className="tag" style={{ marginBottom: 16 }}>18 styles</div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', marginBottom: 16 }}>
            Every poodle haircut, explained
          </h1>
          <p style={{ fontSize: 17, color: 'var(--ink-muted)', lineHeight: 1.7 }}>
            From the everyday Teddy Bear Cut to the dramatic Continental show clip — find the perfect style for your poodle's lifestyle, climate, and your grooming schedule.
          </p>
          <a href="/style-finder" className="btn-primary" style={{ marginTop: 28, display: 'inline-flex' }}>
            Try the AI preview tool ✦
          </a>
        </div>
      </div>

      {/* All cuts by category */}
      <div className="container" style={{ padding: '64px 24px' }}>
        {Object.entries(grouped).map(([category, cuts]) => (
          <div key={category} style={{ marginBottom: 64 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
              <h2 style={{ fontSize: 'clamp(22px, 2.5vw, 30px)' }}>{category}</h2>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              <span style={{ fontSize: 12, color: 'var(--ink-faint)' }}>{cuts.length} style{cuts.length > 1 ? 's' : ''}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {cuts.map(cut => {
                const diff = DIFFICULTY_COLORS[cut.difficulty]
                return (
                  <a key={cut.slug} href={`/cuts/${cut.slug}`} className="card" style={{ textDecoration: 'none' }}>
                    <div style={{
                      background: 'var(--caramel-light)',
                      padding: '36px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 52, position: 'relative',
                    }}>
                      {cut.emoji}
                      <span style={{
                        position: 'absolute', top: 12, right: 12,
                        fontSize: 10, padding: '3px 8px', borderRadius: 100,
                        background: diff.bg, color: diff.text, fontWeight: 500,
                      }}>{cut.difficulty}</span>
                    </div>
                    <div style={{ padding: '18px 20px 20px' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 19, marginBottom: 6 }}>{cut.name}</h3>
                      <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 12, lineHeight: 1.5 }}>{cut.desc}</p>
                      <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--ink-faint)' }}>
                        <span>⏱ {cut.frequency}</span>
                        <span>🔧 {cut.maintenance}</span>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
