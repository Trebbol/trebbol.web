import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import type { ReactNode } from 'react'
import { PublicHeader } from '@/components/layout/PublicHeader'
import { PublicFooter } from '@/components/layout/PublicFooter'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('privacy.meta')
  return {
    title: t('title'),
    description: t('description'),
  }
}


function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

const emailLink = (chunks: ReactNode) => (
  <a href="mailto:privacy@trebbol.com" className="priv-closing__link">{chunks}</a>
)

export default async function PrivacyPage() {
  const t = await getTranslations('privacy')

  return (
    <div className="privacy-page">

      <PublicHeader />

      {/* ══ Hero ══ */}
      <section className="priv-hero">
        <h1 className="priv-hero__title">{t('hero.title')}</h1>
        <p className="priv-hero__subtitle">{t('hero.subtitle')}</p>
      </section>

      {/* ══ Group 1 ══ */}
      <div className="priv-group">
        <p className="priv-group__title">{t('group1')}</p>
      </div>

      {/* Your data — image left */}
      <div className="priv-split">
        <div className="priv-split__img">
          <Image
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
            alt="People working together"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="priv-split__content">
          <h2 className="priv-split__title">{t('yourData.title')}</h2>
          <p className="priv-split__text">{t('yourData.text')}</p>
        </div>
      </div>

      {/* Your rights — content left */}
      <div className="priv-split">
        <div className="priv-split__content">
          <h2 className="priv-split__title">{t('yourRights.title')}</h2>
          <p className="priv-split__text">
            {t.rich('yourRights.text', { email: emailLink })}
          </p>
        </div>
        <div className="priv-split__img">
          <Image
            src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
            alt="People sharing a moment"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* ══ Group 2 ══ */}
      <div className="priv-group">
        <p className="priv-group__title">{t('group2')}</p>
      </div>

      {/* Keeping in loop — image left */}
      <div className="priv-split">
        <div className="priv-split__img">
          <Image
            src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
            alt="Team collaboration"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="priv-split__content">
          <h2 className="priv-split__title">{t('keepingInLoop.title')}</h2>
          <p className="priv-split__text">{t('keepingInLoop.text')}</p>
        </div>
      </div>

      {/* Right to choose — content left */}
      <div className="priv-split">
        <div className="priv-split__content">
          <h2 className="priv-split__title">{t('rightToChoose.title')}</h2>
          <p className="priv-split__text">{t('rightToChoose.text')}</p>
        </div>
        <div className="priv-split__img">
          <Image
            src="https://images.pexels.com/photos/4492126/pexels-photo-4492126.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
            alt="Privacy settings on phone"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Protecting data — image left */}
      <div className="priv-split">
        <div className="priv-split__img">
          <Image
            src="https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
            alt="Person using a smartphone"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="priv-split__content">
          <h2 className="priv-split__title">{t('protectingData.title')}</h2>
          <p className="priv-split__text">{t('protectingData.text')}</p>
        </div>
      </div>

      {/* Customers first — content left */}
      <div className="priv-split">
        <div className="priv-split__content">
          <h2 className="priv-split__title">{t('customersFirst.title')}</h2>
          <p className="priv-split__text">{t('customersFirst.text')}</p>
        </div>
        <div className="priv-split__img">
          <Image
            src="https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
            alt="Customer enjoying the service"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* ══ Notices ══ */}
      <section className="priv-notices">
        <h2 className="priv-notices__title">{t('notices.title')}</h2>

        <div className="priv-notices__section">
          <p className="priv-notices__subtitle">{t('notices.personalSubtitle')}</p>
          <div className="priv-notices__grid">
            <a href="#" className="priv-notice-card">
              <span>{t('notices.card1')}</span>
              <span className="priv-notice-card__arrow"><IconArrow /></span>
            </a>
            <a href="#" className="priv-notice-card">
              <span>{t('notices.card2')}</span>
              <span className="priv-notice-card__arrow"><IconArrow /></span>
            </a>
          </div>
        </div>

        <div className="priv-notices__section">
          <p className="priv-notices__subtitle">{t('notices.businessSubtitle')}</p>
          <div className="priv-notices__grid">
            <a href="#" className="priv-notice-card">
              <span>{t('notices.card3')}</span>
              <span className="priv-notice-card__arrow"><IconArrow /></span>
            </a>
            <a href="#" className="priv-notice-card">
              <span>{t('notices.card4')}</span>
              <span className="priv-notice-card__arrow"><IconArrow /></span>
            </a>
          </div>
        </div>
      </section>

      {/* ══ Closing ══ */}
      <div className="priv-closing">
        <p className="priv-closing__text">{t('closing.line1')}</p>
        <p className="priv-closing__text">{t('closing.line2')}</p>
        <p className="priv-closing__text">
          {t.rich('closing.line3', { email: emailLink })}
        </p>
      </div>

      <PublicFooter />

    </div>
  )
}
