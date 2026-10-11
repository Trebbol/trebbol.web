import type { Metadata } from 'next'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm'
import { LanguageSelector } from '@/components/auth/LanguageSelector'

export const metadata: Metadata = {
  title: 'Recuperar contraseña — Trebbol',
  description: 'Restablece tu contraseña de Trebbol.',
}

export default function ForgotPasswordPage() {
  const t = useTranslations('forgotPassword')

  return (
    <main className="auth-page">

      <header className="auth-top-bar">
        <Image
          src="/logotipo.svg"
          alt="Trebbol"
          width={32}
          height={32}
          className="auth-wordmark__logo"
        />
        <span className="auth-wordmark__text">Trebbol</span>
      </header>

      <ForgotPasswordForm />

      <footer className="auth-bottom-bar">
        <LanguageSelector />
        <Link href="/privacy" className="auth-bottom-bar__link">
          {t('privacyPolicy')}
        </Link>
      </footer>

    </main>
  )
}
