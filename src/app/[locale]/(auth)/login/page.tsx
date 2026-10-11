import type { Metadata } from 'next'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { LoginForm } from '@/components/auth/LoginForm'
import { LanguageSelector } from '@/components/auth/LanguageSelector'

export const instant = false

export const metadata: Metadata = {
  title: 'Iniciar sesión — Trebbol',
  description: 'Accede a tu cuenta en Trebbol, el ecosistema digital local.',
}

export default function LoginPage() {
  const t = useTranslations('auth')

  return (
    <main className="auth-page">

      {/* Wordmark top-left */}
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

      {/* Contenido: formulario + QR */}
      <LoginForm />

      {/* Barra inferior: selector de idioma + política de privacidad */}
      <footer className="auth-bottom-bar">
        <LanguageSelector />
        <Link href="/privacy" className="auth-bottom-bar__link">
          {t('privacyPolicy')}
        </Link>
      </footer>

    </main>
  )
}
