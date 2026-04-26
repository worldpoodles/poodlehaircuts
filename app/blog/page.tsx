import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Poodle Grooming Blog — Expert Guides & Tips',
  description: 'Expert guides on poodle haircuts, grooming schedules, health tips, and everything you need to keep your poodle looking beautiful.',
}

// In production, fetch from a CMS (Contentful, Sanity, etc.)
// For now, these are the 10 priority blog posts to write
const BLOG_POSTS = [
  {
    slug: 'poodle-teddy-bear-cut-complete-guide',
    title: 'Poodle Teddy Bear Cut: The Complete 2026 Guide',
    excerpt: 'Everything you need to know about the most popular poodle haircut — from what it looks like, to how to maintain it, and whether it\'s right for your dog.',
    category: 'Haircuts',
    readTime: '8 min',
    date: 'April 2026',
    emoji: '🧸',
    featured: true,
  },
  {
    slug: 'poodle-lamb-cut-vs-teddy-bear',
    title: 'Poodle Lamb Cut vs Teddy Bear Cut — Which Is Better?',
    excerpt: 'The two most popular everyday poodle cuts, compared side by side. Maintenance, cost, suitability for different sizes — everything to help you choose.',
    category: 'Haircuts',
    readTime: '6 min',
    date: 'April 2026',
    emoji: '⚖️',
    featured: true,
  },
  {
    slug: 'how-often-should-you-cut-a-poodle-hair',
    title: 'How Often Should You Cut a Poodle\'s Hair? The Complete Schedule',
    excerpt: 'From toy to standard poodles, here is exactly how often you should book grooming appointments — and what happens if you skip them.',
    category: 'Grooming',
    readTime: '7 min',
    date: 'March 2026',
    emoji: '📅',
    featured: true,
  },
  {
    slug: 'poodle-ear-infection-guide',
    title: 'Poodle Ear Infections: Signs, Causes & How to Prevent Them',
    excerpt: 'Nearly 50% of poodle owners report ear infections in their dogs. Learn the signs, what causes them, and the grooming habits that prevent them.',
    category: 'Health',
    readTime: '9 min',
    date: 'March 2026',
    emoji: '👂',
    featured: false,
  },
  {
    slug: 'best-poodle-cuts-for-hot-weather',
    title: 'Best Poodle Haircuts for Hot Weather — US & Canada Summer Guide',
    excerpt: 'Summer is coming. These are the poodle cuts that keep your dog coolest in hot climates across the US and Canada.',
    category: 'Seasonal',
    readTime: '5 min',
    date: 'March 2026',
    emoji: '☀️',
    featured: false,
  },
  {
    slug: 'toy-poodle-haircuts-guide',
    title: 'Toy Poodle Haircuts: Which Styles Work Best for Small Poodles?',
    excerpt: 'Toy poodles need slightly different grooming than standard and miniature poodles. Here are the cuts that work best for the smallest poodle size.',
    category: 'Haircuts',
    readTime: '6 min',
    date: 'February 2026',
    emoji: '🐩',
    featured: false,
  },
  {
    slug: 'poodle-tear-stains-removal',
    title: 'How to Remove Poodle Tear Stains — What Actually Works',
    excerpt: 'Tear stains are one of the most common poodle owner complaints. Here\'s what actually removes them — and what to avoid.',
    category: 'Health',
    readTime: '7 min',
    date: 'February 2026',
    emoji: '💧',
    featured: false,
  },
  {
    slug: 'poodle-grooming-cost-guide',
    title: 'How Much Does Poodle Grooming Cost in 2026?',
    excerpt: 'Professional grooming prices for toy, miniature, and standard poodles across the US and Canada — with tips on saving money without sacrificing quality.',
    category: 'Grooming',
    readTime: '6 min',
    date: 'January 2026',
    emoji: '💰',
    featured: false,
  },
  {
    slug: 'poodle-separation-anxiety-tips',
    title: 'Poodle Separation Anxiety: 7 Proven Strategies That Work',
    excerpt: 'Poodles are among the most separation-anxious dog breeds. These strategies, recommended by trainers, actually help.',
    category: 'Behavior',
    readTime: '8 min',
    date: 'January 2026',
    emoji: '🧠',
    featured: false,
  },
  {
    slug: 'poodle-gifts-for-owners',
    title: 'Best Gifts for Poodle Owners in 2026 (Under $30, $50 & $100)',
    excerpt: 'From personalized accessories to grooming tools — the gifts that poodle owners actually want, at every budget.',
    category: 'Gift Guide',
    readTime: '5 min',
    date: 'December 2025',
    emoji: '🎁',
    featured: false,
  },
]

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  Haircuts: { bg: '#EEEDFE', text: '#3C3489' },
  Grooming: { bg: '#E1F5EE', text: '#085041' },
  Health: { bg: '#FCEBEB', text: '#791F1F' },
  Seasonal: { bg: '#FAEEDA', text: '#633806' },
  Behavior: { bg: '#FBEAF0', text: '#72243E' },
  'Gift Guide': { bg: '#EAF3DE', text: '#27500A' },
}

export default function BlogPage() {
  const featured = BLOG_POSTS.filter(p => p.featured)
  const rest = BLOG_POSTS.filter(p => !p.featured)

  return (
    <div>
      {/* Header */}
      <div style={{ background: 'var(--ink)', color: 'var(--cream)', padding: '64px 0 48px' }}>
        <div className="container" style={{ maxWidth: 700 }}>
          <div className="tag" style={{ background: 'rgba(200,119,58,0.25)', color: '#e8a070', marginBottom: 16 }}>
            Expert guides
          </div>
          <h1 style={{ color: 'var(--cream)', fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: 16 }}>
            Poodle Grooming Blog
          </h1>
          <p style={{ color: 'rgba(250,248,244,0.65)', fontSize: 16, lineHeight: 1.7 }}>
            Expert guides on poodle haircuts, grooming schedules, health, and behavior — everything the US and Canadian poodle owner community is searching for.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px 80px' }}>
        {/* Featured posts */}
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 20, marginBottom: 24, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', fontWeight: 400, letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: 12 }}>
            ✦ Featured
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {featured.map(post => {
              const catColor = CATEGORY_COLORS[post.category] || { bg: 'var(--caramel-light)', text: 'var(--caramel-dark)' }
              return (
                <a key={post.slug} href={`/blog/${post.slug}`} className="card" style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: 'var(--caramel-light)', padding: '40px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 56,
                  }}>
                    {post.emoji}
                  </div>
                  <div style={{ padding: '20px 24px 24px' }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                      <span style={{
                        fontSize: 10, padding: '3px 8px', borderRadius: 100,
                        background: catColor.bg, color: catColor.text, fontWeight: 500,
                      }}>{post.category}</span>
                      <span style={{ fontSize: 11, color: 'var(--ink-faint)' }}>{post.readTime} read</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 19, marginBottom: 8, lineHeight: 1.3 }}>{post.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.6 }}>{post.excerpt}</p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>

        {/* All posts */}
        <div>
          <h2 style={{ fontSize: 12, fontFamily: 'var(--font-body)', fontWeight: 400, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 24 }}>
            All articles
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {rest.map(post => {
              const catColor = CATEGORY_COLORS[post.category] || { bg: 'var(--caramel-light)', text: 'var(--caramel-dark)' }
              return (
                <a key={post.slug} href={`/blog/${post.slug}`} style={{
                  display: 'flex', gap: 20, alignItems: 'flex-start',
                  padding: '20px 0', borderBottom: '1px solid var(--border)',
                  textDecoration: 'none',
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.paddingLeft = '8px'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.paddingLeft = '0'}
                  style={{ display: 'flex', gap: 20, alignItems: 'flex-start', padding: '20px 0', borderBottom: '1px solid var(--border)', textDecoration: 'none', transition: 'padding-left 0.15s' }}
                >
                  <span style={{ fontSize: 32, flexShrink: 0 }}>{post.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'center' }}>
                      <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 100, background: catColor.bg, color: catColor.text, fontWeight: 500 }}>{post.category}</span>
                      <span style={{ fontSize: 11, color: 'var(--ink-faint)' }}>{post.readTime} read · {post.date}</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, marginBottom: 4, lineHeight: 1.3, color: 'var(--ink)' }}>{post.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.5 }}>{post.excerpt}</p>
                  </div>
                  <span style={{ color: 'var(--caramel)', fontSize: 18, flexShrink: 0, marginTop: 4 }}>→</span>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
