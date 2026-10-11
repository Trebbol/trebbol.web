import type { Metadata } from 'next'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { SignupForm } from '@/components/auth/SignupForm'
import { LanguageSelector } from '@/components/auth/LanguageSelector'

export const metadata: Metadata = {
  title: 'Crear cuenta — Trebbol',
  description: 'Crea tu cuenta en Trebbol, el ecosistema digital local.',
}

export default function SignupPage() {
  const t = useTranslations('signup')

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

      <SignupForm />

      <footer className="auth-bottom-bar">
        <LanguageSelector />
        <Link href="/privacy" className="auth-bottom-bar__link">
          {t('privacyPolicy')}
        </Link>
      </footer>

    </main>
  )
}
