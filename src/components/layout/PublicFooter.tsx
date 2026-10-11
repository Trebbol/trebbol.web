import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'

function IconFacebook() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function IconX() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25z" />
    </svg>
  )
}

function IconLinkedIn() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function IconTikTok() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.35 6.35 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.53V6.77a4.85 4.85 0 01-1.02-.08z" />
    </svg>
  )
}

export async function PublicFooter() {
  const t = await getTranslations('public.footer')

  return (
    <footer className="pub-footer">
      <div className="pub-footer__inner">

        <div className="pub-footer__top">
          <Link href="/" className="pub-footer__wordmark">
            <Image src="/logo-dark.png" alt="Trebbol" width={36} height={36} style={{ filter: 'brightness(0) invert(1)' }} />
            <span>Trebbol</span>
          </Link>
          <div className="pub-footer__socials">
            <a href="#" className="pub-footer__social" aria-label="Facebook"><IconFacebook /></a>
            <a href="#" className="pub-footer__social" aria-label="Instagram"><IconInstagram /></a>
            <a href="#" className="pub-footer__social" aria-label="X"><IconX /></a>
            <a href="#" className="pub-footer__social" aria-label="LinkedIn"><IconLinkedIn /></a>
            <a href="#" className="pub-footer__social" aria-label="TikTok"><IconTikTok /></a>
          </div>
        </div>

        <div className="pub-footer__mid">
          <span className="pub-footer__region">{t('region')}</span>
          <a href="#" className="pub-footer__legal-link">{t('websiteTerms')}</a>
          <a href="#" className="pub-footer__legal-link">{t('legalAgreements')}</a>
          <a href="#" className="pub-footer__legal-link">{t('complaints')}</a>
          <Link href="/privacy" className="pub-footer__legal-link">{t('privacyLink')}</Link>
          <a href="#" className="pub-footer__legal-link">{t('dataPrivacy')}</a>
        </div>

        <div className="pub-footer__bottom">
          <p className="pub-footer__copyright">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <p className="pub-footer__legal-text">{t('legal1')}</p>
          <p className="pub-footer__legal-text">{t('legal2')}</p>

          <div className="pub-footer__links-grid">
            <div>
              <p className="pub-footer__links-title">{t('col1Title')}</p>
              <a href="#" className="pub-footer__link">{t('col1Link1')}</a>
              <a href="#" className="pub-footer__link">{t('col1Link2')}</a>
              <a href="#" className="pub-footer__link">{t('col1Link3')}</a>
              <a href="#" className="pub-footer__link">{t('col1Link4')}</a>
            </div>
            <div>
              <p className="pub-footer__links-title">{t('col2Title')}</p>
              <a href="#" className="pub-footer__link">{t('col2Link1')}</a>
              <a href="#" className="pub-footer__link">{t('col2Link2')}</a>
              <a href="#" className="pub-footer__link">{t('col2Link3')}</a>
              <a href="#" className="pub-footer__link">{t('col2Link4')}</a>
            </div>
            <div>
              <p className="pub-footer__links-title">{t('col3Title')}</p>
              <a href="#" className="pub-footer__link">{t('col3Link1')}</a>
              <a href="#" className="pub-footer__link">{t('col3Link2')}</a>
              <a href="#" className="pub-footer__link">{t('col3Link3')}</a>
              <a href="#" className="pub-footer__link">{t('col3Link4')}</a>
            </div>
            <div>
              <p className="pub-footer__links-title">{t('col4Title')}</p>
              <a href="#" className="pub-footer__link">{t('col4Link1')}</a>
              <a href="#" className="pub-footer__link">{t('col4Link2')}</a>
              <a href="#" className="pub-footer__link">{t('col4Link3')}</a>
              <a href="#" className="pub-footer__link">{t('col4Link4')}</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
