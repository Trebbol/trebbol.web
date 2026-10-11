import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { PublicHeader } from '@/components/layout/PublicHeader'
import { PublicFooter } from '@/components/layout/PublicFooter'

export default async function NotFound() {
  const t = await getTranslations('notFound')

  return (
    <div className="not-found-page">

      <PublicHeader />

      <div className="not-found__stage">
        <div className="not-found__digits" aria-hidden="true">
          <span className="not-found__digit">4</span>
          <span className="not-found__digit">0</span>
          <span className="not-found__digit">4</span>
        </div>

        <div className="not-found__content">
          <h1 className="not-found__title">{t('title')}</h1>
          <p className="not-found__text">{t('text')}</p>
          <Link href="/" className="btn-dark btn-sm">{t('back')} →</Link>
        </div>
      </div>

      <PublicFooter />

    </div>
  )
}
