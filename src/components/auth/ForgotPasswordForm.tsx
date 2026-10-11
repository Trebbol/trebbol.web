'use client'

import * as React from 'react'
import Image from 'next/image'
import { useRef, useEffect, useTransition } from 'react'
import { useTranslations } from 'next-intl'
import gsap from 'gsap'
import { forgotPasswordAction } from '@/server/actions/auth'
import { Link } from '@/i18n/navigation'

export function ForgotPasswordForm() {
  const t = useTranslations('forgotPassword')
  const tAuth = useTranslations('auth')

  const [isPending, startTransition] = useTransition()
  const [error, setError] = React.useState<string | undefined>(undefined)
  const [sentTo, setSentTo] = React.useState<string | undefined>(undefined)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.auth-form-section > *',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.07, delay: 0.15 }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(undefined)
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')?.toString() ?? ''
    startTransition(async () => {
      const result = await forgotPasswordAction(formData)
      if (result?.error) {
        setError(result.error ?? t('errorGeneric'))
      } else if (result?.success) {
        setSentTo(email)
      }
    })
  }

  return (
    <div className="auth-layout">

      {/* ── Columna izquierda: formulario ── */}
      <section className="auth-form-section" ref={sectionRef}>
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

        {sentTo ? (
          <div className="auth-success">
            <div className="auth-success__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="auth-success__title">{t('successTitle')}</p>
            <p className="auth-success__subtitle">
              {t('successSubtitle', { email: sentTo })}
            </p>
            <Link href="/login" className="auth-link" style={{ marginTop: '0.25rem' }}>
              {t('backToLogin')}
            </Link>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="auth-form" noValidate>
              <div className="auth-fields">
                <div className="auth-field">
                  <label htmlFor="forgot-email" className="auth-label">
                    {t('emailLabel')}
                  </label>
                  <input
                    id="forgot-email"
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
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="auth-btn-primary"
                aria-label={isPending ? t('sending') : t('sendLink')}
              >
                {isPending ? t('sending') : t('sendLink')}
              </button>
            </form>

            <p className="auth-signup-text">
              <Link href="/login" className="auth-link">{t('backToLogin')}</Link>
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
