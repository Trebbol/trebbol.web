export const instant = false

import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { PublicHeaderHome } from '@/components/layout/PublicHeaderHome'
import { PublicFooter } from '@/components/layout/PublicFooter'
import { HomeHero } from '@/components/home/HomeHero'
import { HeroBanner } from '@/components/home/HeroBanner'
import { SliderPromo } from '@/components/home/SliderPromo'
import { Badge } from '@/components/ui/badge'
import { HeartLinearIcon, StarBoldIcon, CalendarLinearIcon, UsersGroupRoundedLinearIcon, VerifiedCheckBoldIcon, ArrowRightLinearIcon, ArrowRightUpLinearIcon, DialogBoldIcon, UserLinearIcon, ClipboardLinearIcon } from '@solar-icons/react'

export const metadata: Metadata = {
  title: 'Trebbol — Buy, work and grow in your community',
  description: 'Trebbol connects neighbors, freelancers and local businesses in one platform.',
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_PRODUCTS = [
  { id: 1, name: 'Wireless Earbuds IPX8', price: '89', originalPrice: '119', discount: '-25%', rating: 4.8, img: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 2, name: 'AirPods Max', price: '559', originalPrice: '699', discount: '-20%', rating: 4.9, img: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 3, name: 'Bose QuietComfort', price: '289', originalPrice: '349', discount: '-17%', rating: 4.7, img: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 4, name: 'VIVEFOX Headphones', price: '39', originalPrice: '59', discount: '-34%', rating: 4.5, img: 'https://images.pexels.com/photos/1649772/pexels-photo-1649772.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 5, name: 'JBL TUNE 600BT', price: '59', originalPrice: '79', discount: '-25%', rating: 4.6, img: 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 6, name: 'TAGRY Bone Conduction', price: '109', originalPrice: '149', discount: '-27%', rating: 4.4, img: 'https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 7, name: 'Monster MNFLEX ANC', price: '89', originalPrice: '129', discount: '-31%', rating: 4.7, img: 'https://images.pexels.com/photos/3394659/pexels-photo-3394659.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 8, name: 'Mpow Kids Headset', price: '29', originalPrice: '45', discount: '-36%', rating: 4.8, img: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400' },
]

const MOCK_JOBS = [
  { id: 1, title: 'Senior UI Designer', company: 'Studio Bruxelles', verified: true, location: 'Brussels, Belgium', salary: '€4.2K/mo', tags: ['Full-time', 'On-Site', '3+ years'], avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100', postedAgo: '30 min ago', applications: 24 },
  { id: 2, title: 'Product Designer', company: 'Bechance BE', verified: true, location: 'Antwerp, Belgium', salary: '€5.0K/mo', tags: ['Remote', 'Contract', '2+ years'], avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100', postedAgo: '2 hours ago', applications: 58 },
  { id: 3, title: 'Marketing Officer', company: 'Mailchimp BE', verified: false, location: 'Ghent, Belgium', salary: '€3.8K/mo', tags: ['Full-time', 'Hybrid', '1+ year'], avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100', postedAgo: '5 hours ago', applications: 13 },
  { id: 4, title: 'Mobile Developer', company: 'StartupBE', verified: false, location: 'Liège, Belgium', salary: '€4.5K/mo', tags: ['Full-time', 'Remote', '2+ years'], avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100', postedAgo: '1 day ago', applications: 41 },
  { id: 5, title: 'UX Engineer', company: 'DesignLab', verified: true, location: 'Brussels, Belgium', salary: '€5.2K/mo', tags: ['Part-time', 'Remote', '3+ years'], avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100', postedAgo: '2 days ago', applications: 89 },
  { id: 6, title: 'Data Analyst', company: 'AnalyticsBE', verified: true, location: 'Namur, Belgium', salary: '€2.8K/mo', tags: ['Full-time', 'On-Site', '1+ year'], avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100', postedAgo: '3 days ago', applications: 32 },
]

const FL_STATUS = {
  online:  { label: 'En línea',     dot: '#22c55e', text: '#16a34a', bg: 'rgba(220,252,231,0.92)' },
  busy:    { label: 'Ocupado',      dot: '#f97316', text: '#ea580c', bg: 'rgba(255,237,213,0.92)' },
  away:    { label: 'Ausente',      dot: '#eab308', text: '#a16207', bg: 'rgba(254,249,195,0.92)' },
  offline: { label: 'Desconectado', dot: '#9ca3af', text: '#6b7280', bg: 'rgba(243,244,246,0.92)' },
} as const

const MOCK_FREELANCERS = [
  { id: 1, name: 'Carlos Méndez', verified: true, status: 'online' as const, type: 'Electricista', specialty: 'Reparaciones del hogar', projects: 38, followers: 214, img: 'https://images.pexels.com/photos/8961065/pexels-photo-8961065.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 2, name: 'Ahmed Karimi', verified: true, status: 'busy' as const, type: 'Peluquero', specialty: 'Cortes a domicilio', projects: 48, followers: 312, img: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 3, name: 'Luca Ferrari', verified: false, status: 'away' as const, type: 'Jardinero', specialty: 'Diseño de exteriores', projects: 27, followers: 189, img: 'https://images.pexels.com/photos/1453499/pexels-photo-1453499.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 4, name: 'Sofia Reyes', verified: true, status: 'offline' as const, type: 'Diseñadora UI/UX', specialty: 'Sistemas de diseño', projects: 61, followers: 478, img: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=600' },
]

const MOCK_BUSINESSES = [
  {
    id: 1,
    name: 'Café du Marché',
    category: 'Coffee & Pastries',
    desc: 'Artisan coffee and fresh pastries in the heart of Brussels. A neighborhood favorite since 2012, open every morning.',
    img: 'https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 2,
    name: 'Boulangerie Léon',
    category: 'Artisan Bakery',
    desc: 'Handcrafted bread and viennoiseries baked fresh every morning. Ghent\'s most beloved bakery since 1998.',
    img: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 3,
    name: 'Studio Pixel',
    category: 'Design Agency',
    desc: 'Brand identity, web design and creative direction for startups and established brands across Belgium.',
    img: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  return (
    <span className="product-card__stars" aria-label={`${rating} stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <StarBoldIcon key={i} width={11} height={11} />
      ))}
    </span>
  )
}

function IconPin() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function IconBriefcase() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

function IconVerified() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2L13.09 8.26L19 7L15.45 11.36L21 13L15.45 14.64L19 19L13.09 15.74L12 22L10.91 15.74L5 19L8.55 14.64L3 13L8.55 11.36L5 7L10.91 8.26L12 2Z" />
    </svg>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  // Hidden in production — only accessible in staging/local preview
  if (process.env.VERCEL_ENV === 'production') redirect('/')

  const t = await getTranslations('home')

  return (
    <div className="home-page">
      <PublicHeaderHome />

      <HeroBanner />

      {/* ── Featured Products ── */}
      <section className="section" id="explore">
        <div className="section__inner">
          <div className="section__header">
            <div className="section__heading">
              <p className="section__eyebrow">{t('products.eyebrow')}</p>
              <h2 className="section__title">{t('products.title')}</h2>
            </div>
            <a href="#" className="section__read-more-link">
              <span className="section__read-more-text">{t('products.cta')}</span>
              <span className="section__read-more-icon"><ArrowRightUpLinearIcon width={14} height={14} /></span>
            </a>
          </div>
          <div className="grid-4">
            {MOCK_PRODUCTS.map(p => (
              <a key={p.id} href="#" className="product-card">
                <div className="product-card__img">
                  <button className="product-card__wishlist" aria-label="Add to wishlist">
                    <HeartLinearIcon width={20} height={20} />
                  </button>
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="product-card__body">
                  <p className="product-card__name">{p.name}</p>
                  <div className="product-card__rating">
                    <Stars rating={p.rating} />
                    <span className="product-card__rating-val">{p.rating}/5</span>
                  </div>
                  <div className="product-card__price-row">
                    <span className="product-card__price">€{p.price}</span>
                    <span className="product-card__original">€{p.originalPrice}</span>
                    <span className="product-card__badge">{p.discount}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <SliderPromo />

      {/* ── Featured Jobs ── */}
      <section className="section">
        <div className="section__inner">
          <div className="section__header">
            <div className="section__heading">
              <p className="section__eyebrow">{t('jobs.eyebrow')}</p>
              <h2 className="section__title">{t('jobs.title')}</h2>
            </div>
            <a href="#" className="section__read-more-link">
              <span className="section__read-more-text">{t('jobs.cta')}</span>
              <span className="section__read-more-icon"><ArrowRightUpLinearIcon width={14} height={14} /></span>
            </a>
          </div>
          <div className="grid-3">
            {MOCK_JOBS.map(j => (
              <a key={j.id} href="#" className="card job-card card__body--padded">
                <div className="job-card__top">
                  <div className="job-card__avatar">
                    <Image src={j.avatar} alt={j.company} fill style={{ objectFit: 'cover' }} sizes="48px" />
                  </div>
                  <div className="job-card__info">
                    <p className="job-card__title">{j.title}</p>
                    <p className="job-card__company">
                      {j.company}
                      {j.verified && <VerifiedCheckBoldIcon width={14} height={14} className="job-card__verified" />}
                      <span className="job-card__dot">·</span>{j.location}
                    </p>
                  </div>
                  <p className="job-card__salary">{j.salary}</p>
                </div>

                <div className="job-card__tags">
                  {j.tags.map(tag => <span key={tag} className="job-card__tag">{tag}</span>)}
                </div>

                <div className="job-card__footer">
                  <div className="job-card__meta">
                    <span><CalendarLinearIcon width={10} height={10} />{j.postedAgo}</span>
                    <span><UsersGroupRoundedLinearIcon width={10} height={10} />{j.applications} applicants</span>
                  </div>
                  <span className="btn-primary btn-sm">Apply Now</span>
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>

      <HomeHero
        eyebrow={t('eyebrow')}
        subtitle={t('subtitle')}
        ctaPrimary={t('ctaPrimary')}
        ctaSecondary={t('ctaSecondary')}
        words={t.raw('typewriter') as string[]}
      />

      {/* ── Featured Freelancers ── */}
      <section className="section">
        <div className="section__inner">
          <div className="section__header">
            <div className="section__heading">
              <p className="section__eyebrow">{t('freelancers.eyebrow')}</p>
              <h2 className="section__title">{t('freelancers.title')}</h2>
            </div>
            <a href="#" className="section__read-more-link">
              <span className="section__read-more-text">{t('freelancers.cta')}</span>
              <span className="section__read-more-icon"><ArrowRightUpLinearIcon width={14} height={14} /></span>
            </a>
          </div>
          <div className="grid-4">
            {MOCK_FREELANCERS.map(f => (
              <a key={f.id} href="#" className="fl-card">
                <Image src={f.img} alt={f.name} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 25vw" />
                <div className="fl-card__overlay" />
                {(() => { const s = FL_STATUS[f.status]; return (
                  <div className="fl-card__status" style={{ background: s.bg, color: s.text }}>
                    <span className="fl-card__status-dot" style={{ background: s.dot }} />
                    {s.label}
                  </div>
                ) })()}
                <div className="fl-card__content">
                  <div className="fl-card__namerow">
                    <p className="fl-card__name">{f.name}</p>
                    {f.verified && <VerifiedCheckBoldIcon size={20} className="fl-card__verified" />}
                  </div>
                  <p className="fl-card__type">{f.type}</p>
                  <p className="fl-card__specialty">{f.specialty}</p>
                  <div className="fl-card__footer">
                    <div className="fl-card__stats">
                      <span className="fl-card__stat">
                        <ClipboardLinearIcon size={20} />
                        {f.projects}
                      </span>
                      <span className="fl-card__stat">
                        <UsersGroupRoundedLinearIcon size={20} />
                        {f.followers}
                      </span>
                    </div>
                    <div className="fl-card__msg" role="button" tabIndex={0} aria-label={`Mensaje a ${f.name}`}>
                      <DialogBoldIcon size={20} />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Local Businesses ── */}
      <section className="section">
        <div className="section__inner">
          <div className="section__header">
            <div className="section__heading">
              <p className="section__eyebrow">{t('businesses.eyebrow')}</p>
              <h2 className="section__title">{t('businesses.title')}</h2>
            </div>
            <a href="#" className="section__read-more-link">
              <span className="section__read-more-text">{t('businesses.cta')}</span>
              <span className="section__read-more-icon"><ArrowRightUpLinearIcon width={14} height={14} /></span>
            </a>
          </div>
          <div className="grid-3">
            {MOCK_BUSINESSES.map(b => (
              <a key={b.id} href="#" className="biz-card biz-card--featured">
                <div className="biz-card__content">
                  <p className="biz-card__category">{b.category}</p>
                  <p className="biz-card__name">{b.name}</p>
                  <p className="biz-card__desc">{b.desc}</p>
                  <div className="biz-card__footer">
                    <span className="biz-card__cta-text">Discover</span>
                    <span className="biz-card__arrow biz-card__arrow--green">
                      <ArrowRightLinearIcon width={16} height={16} />
                    </span>
                  </div>
                </div>
                <div className="biz-card__img">
                  <Image src={b.img} alt={b.name} fill style={{ objectFit: 'cover' }} sizes="180px" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
