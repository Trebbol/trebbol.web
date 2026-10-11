import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { LangSwitcher } from '@/components/ui/LangSwitcher'

function IconSearch() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}

export async function PublicHeaderHome() {
  const tNav = await getTranslations('public.nav')
  const tSearch = await getTranslations('home.search')

  return (
    <header className="home-header">
      <div className="home-header__inner">
        <Link href="/" className="pub-header__logo">
          <Image src="/logo-dark.png" alt="" width={36} height={36} />
          <span>Trebbol</span>
        </Link>

        <div className="home-header__search">
          <span className="home-header__search-icon">
            <IconSearch />
          </span>
          <input
            type="search"
            className="home-header__search-input"
            placeholder={tSearch('placeholder')}
            aria-label={tSearch('placeholder')}
          />
        </div>

        <div className="pub-header__actions">
          <Link href="/login" className="pub-header__login">{tNav('login')}</Link>
          <Link href="/signup" className="btn-dark btn-sm">{tNav('signup')}</Link>
          <LangSwitcher />
        </div>
      </div>
    </header>
  )
}
