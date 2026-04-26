import type { Metadata } from 'next'
import './globals.css'
import Nav from './components/Nav'
import Footer from './components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Poodle Haircuts — Find the Perfect Cut for Your Poodle',
    template: '%s | Poodle Haircuts',
  },
  description:
    'The ultimate guide to poodle haircuts. Use our AI tool to preview any cut on your poodle, browse 18+ styles, and get expert grooming advice.',
  keywords:
    'poodle haircuts, poodle cuts, poodle grooming styles, teddy bear cut poodle, poodle hairstyles',
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
