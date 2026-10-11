import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { LangSwitcher } from '@/components/ui/LangSwitcher'

type ActiveNav = 'personal' | 'business' | 'company'

export async function PublicHeader({ activeNav = 'personal' }: { activeNav?: ActiveNav }) {
  const t = await getTranslations('public.nav')

  return (
    <header className="pub-header">
      <div className="pub-header__inner">
        <Link href="/" className="pub-header__logo">
          <Image src="/logo-dark.png" alt="" width={36} height={36} />
          <span>Trebbol</span>
        </Link>

        <nav className="pub-header__nav" aria-label="Main navigation">
          <Link href="/" className={`pub-header__nav-link${activeNav === 'personal' ? ' pub-header__nav-link--active' : ''}`}>
            {t('personal')}
          </Link>
          <Link href="/" className={`pub-header__nav-link${activeNav === 'business' ? ' pub-header__nav-link--active' : ''}`}>
            {t('business')}
          </Link>
          <Link href="/" className={`pub-header__nav-link${activeNav === 'company' ? ' pub-header__nav-link--active' : ''}`}>
            {t('company')}
          </Link>
        </nav>

        <div className="pub-header__actions">
          <Link href="/login" className="pub-header__login">{t('login')}</Link>
          <Link href="/signup" className="btn-dark btn-sm">{t('signup')}</Link>
          <LangSwitcher />
        </div>
      </div>
    </header>
  )
}
