'use client'

import * as React from 'react'
import Image from 'next/image'
import { useTransition } from 'react'
import { useTranslations } from 'next-intl'
import { signUpAction } from '@/server/actions/auth'
import { Link } from '@/i18n/navigation'

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
    </svg>
  )
}

export function SignupForm() {
  const t = useTranslations('signup')
  const tAuth = useTranslations('auth')

  const [isPending, startTransition] = useTransition()
  const [error, setError] = React.useState<string | undefined>(undefined)
  const [success, setSuccess] = React.useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(undefined)
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await signUpAction(formData)
      if (result?.error) {
        setError(result.error ?? t('errorGeneric'))
      } else if (result?.success) {
        setSuccess(true)
      }
    })
  }

  return (
    <div className="auth-layout">

      {/* ── Columna izquierda: formulario ── */}
      <section className="auth-form-section">
        <h1 className="auth-title">{t('title')}</h1>
        <p className="auth-subtitle">{t('subtitle')}</p>

        {error && (
          <div role="alert" className="auth-error">
            <svg className="auth-error__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="auth-success">
            <div className="auth-success__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="auth-success__title">¡Cuenta creada!</p>
            <p className="auth-success__subtitle">Revisa tu correo para confirmar tu cuenta antes de iniciar sesión.</p>
            <Link href="/login" className="auth-btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', marginTop: '0.5rem' }}>
              {t('signIn')}
            </Link>
          </div>
        ) : (
          <>
          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <div className="auth-fields">

              <div className="auth-field">
                <label htmlFor="signup-name" className="auth-label">
                  {t('nameLabel')}
                </label>
                <input
                  id="signup-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder={t('namePlaceholder')}
                  required
                  aria-required={true}
                  disabled={isPending}
                  className="auth-input"
                />
              </div>

              <div className="auth-field">
                <label htmlFor="signup-email" className="auth-label">
                  {t('emailLabel')}
                </label>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t('emailPlaceholder')}
                  required
                  aria-required={true}
                  disabled={isPending}
                  className="auth-input"
                />
              </div>

              <div className="auth-field">
                <label htmlFor="signup-password" className="auth-label">
                  {t('passwordLabel')}
                </label>
                <input
                  id="signup-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  required
                  aria-required={true}
                  disabled={isPending}
                  className="auth-input"
                />
              </div>

            </div>

            <button
              type="submit"
              disabled={isPending}
              className="auth-btn-primary"
              aria-label={isPending ? t('creatingAccount') : t('continue')}
            >
              {isPending ? t('creatingAccount') : t('continue')}
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider">
            <span>{tAuth('orContinueWith')}</span>
          </div>

          {/* Social */}
          <div className="auth-social-grid">
            {([
              { label: 'Google',   icon: <GoogleIcon />   },
              { label: 'Apple',    icon: <AppleIcon />    },
              { label: 'Facebook', icon: <FacebookIcon /> },
            ] as const).map(({ label, icon }) => (
              <button
                key={label}
                type="button"
                className="auth-social-btn"
                disabled
                title={tAuth('comingSoon')}
                aria-label={`${label} — ${tAuth('comingSoon')}`}
              >
                <span className="auth-social-btn__icon">{icon}</span>
                <span className="auth-social-btn__label">{label}</span>
              </button>
            ))}
          </div>

          <p className="auth-signup-text">
            {t('alreadyAccount')}{' '}
            <Link href="/login" className="auth-link">{t('signIn')}</Link>
          </p>
          </>
        )}
      </section>

      {/* ── Columna derecha: QR (solo desktop) ── */}
      <aside className="auth-qr-section" aria-label={tAuth('downloadApp')}>
        <div className="auth-qr-card">
          <Image src="/qr.png" alt="QR code" width={148} height={148} unoptimized />
          <p className="auth-qr-title">{tAuth('downloadApp')}</p>
          <p className="auth-qr-subtitle">{tAuth('appStores')}</p>
        </div>
      </aside>

    </div>
  )
}
