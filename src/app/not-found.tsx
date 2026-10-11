import Link from 'next/link'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export default function NotFound() {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <div className="not-found-page">

          <header className="pub-header">
            <div className="pub-header__inner">
              <Link href="/nl" className="pub-header__logo" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-gray-900)' }}>Trebbol</span>
              </Link>
              <div className="pub-header__actions">
                <Link href="/nl/login" className="pub-header__login">Log in</Link>
                <Link href="/nl/signup" className="btn-dark btn-sm">Sign up</Link>
              </div>
            </div>
          </header>

          <div className="not-found__stage">
            <div className="not-found__digits" aria-hidden="true">
              <span className="not-found__digit">4</span>
              <span className="not-found__digit">0</span>
              <span className="not-found__digit">4</span>
            </div>
            <div className="not-found__content">
              <h1 className="not-found__title">Page not found</h1>
              <p className="not-found__text">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
              <Link href="/nl" className="btn-dark btn-sm">Back to home →</Link>
            </div>
          </div>

        </div>
      </body>
    </html>
  )
}
