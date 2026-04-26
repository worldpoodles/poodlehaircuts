'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Cuts', href: '/cuts' },
  { label: 'Blog', href: '/blog' },
  { label: 'Gallery', href: '/gallery' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(250,248,244,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 64,
      }}>
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          textDecoration: 'none',
        }}>
          <span style={{ fontSize: 22 }}>🐩</span>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
          }}>
            Poodle Haircuts
          </span>
        </Link>

        <nav style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                style={{
                  padding: '6px 14px',
                  fontSize: 14,
                  borderRadius: 6,
                  textDecoration: 'none',
                  color: active ? 'var(--ink)' : 'var(--ink-muted)',
                  background: active ? 'var(--border)' : 'transparent',
                  fontWeight: active ? 500 : 400,
                  transition: 'color 0.15s, background 0.15s',
                }}
              >
                {label}
              </Link>
            )
          })}
          <Link
            href="/style-finder"
            style={{
              marginLeft: 8,
              padding: '8px 18px',
              fontSize: 13,
              fontWeight: 500,
              borderRadius: 8,
              textDecoration: 'none',
              background: 'var(--ink)',
              color: 'var(--cream)',
              transition: 'background 0.2s',
            }}
          >
            Try AI Tool ✦
          </Link>
        </nav>
      </div>
    </header>
  )
}
