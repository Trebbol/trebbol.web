export const instant = false

import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { PublicHeaderHome } from '@/components/layout/PublicHeaderHome'
import { PublicFooter } from '@/components/layout/PublicFooter'
import { HomeHero } from '@/components/home/HomeHero'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Trebbol — Buy, work and grow in your community',
  description: 'Trebbol connects neighbors, freelancers and local businesses in one platform.',
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Canapé en cuir',
    price: '€ 280',
    rating: 4.8,
    reviews: 48,
    img: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'New',
  },
  {
    id: 2,
    name: 'iPhone 14 Pro',
    price: '€ 650',
    rating: 4.9,
    reviews: 127,
    img: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: null,
  },
  {
    id: 3,
    name: 'Chaise vintage',
    price: '€ 95',
    rating: 4.6,
    reviews: 23,
    img: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'New',
  },
  {
    id: 4,
    name: 'Vélo de route',
    price: '€ 420',
    rating: 4.7,
    reviews: 61,
    img: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: null,
  },
]

const MOCK_JOBS = [
  {
    id: 1,
    company: 'Studio Bruxelles',
    verified: true,
    title: 'Senior UI Designer',
    desc: 'Take advantage of a rare opportunity to join a fast-growing design studio and shape next-gen digital products.',
    location: 'Brussels, BE',
    type: 'Full-time',
    salary: '€ 4 200',
    period: '/mo',
    logoColor: '#EBF5FB',
    logoEmoji: '🎨',
  },
  {
    id: 2,
    company: 'TechCorp BE',
    verified: true,
    title: 'Product Manager',
    desc: 'Lead cross-functional teams to define and ship world-class B2B SaaS products across European markets.',
    location: 'Antwerp, BE',
    type: 'Remote',
    salary: '€ 5 000',
    period: '/mo',
    logoColor: '#EAFAF1',
    logoEmoji: '🚀',
  },
  {
    id: 3,
    company: 'LocalDev',
    verified: false,
    title: 'Full Stack Developer',
    desc: 'Build and maintain high-traffic web applications using Next.js, TypeScript, and Supabase in a startup environment.',
    location: 'Ghent, BE',
    type: 'Full-time',
    salary: '€ 4 800',
    period: '/mo',
    logoColor: '#FEF9E7',
    logoEmoji: '💻',
  },
]

const MOCK_FREELANCERS = [
  {
    id: 1,
    name: 'Sophie Martin',
    specialty: 'Graphic Designer',
    rating: 4.9,
    reviews: 86,
    rate: '€ 65/hr',
    img: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: 2,
    name: 'Thomas Kramer',
    specialty: 'Web Developer',
    rating: 4.8,
    reviews: 112,
    rate: '€ 80/hr',
    img: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: 3,
    name: 'Marie Lambert',
    specialty: 'Brand Strategist',
    rating: 4.7,
    reviews: 54,
    rate: '€ 55/hr',
    img: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: 4,
    name: 'Alex Van Dyck',
    specialty: 'Video Editor',
    rating: 4.9,
    reviews: 73,
    rate: '€ 70/hr',
    img: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
]

const MOCK_BUSINESSES = [
  {
    id: 1,
    name: 'Café du Marché',
    category: '☕ Coffee',
    location: 'Brussels',
    rating: 4.8,
    img: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 2,
    name: 'Boulangerie Léon',
    category: '🥐 Bakery',
    location: 'Ghent',
    rating: 4.9,
    img: 'https://images.pexels.com/photos/1029375/pexels-photo-1029375.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 3,
    name: 'Studio Pixel',
    category: '🎨 Design',
    location: 'Antwerp',
    rating: 4.7,
    img: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 4,
    name: 'FitLife Gym',
    category: '💪 Fitness',
    location: 'Liège',
    rating: 4.6,
    img: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  return (
    <span aria-label={`${rating} stars`}>
      <span className="product-card__stars">{'★'.repeat(full)}</span>
      {'☆'.repeat(5 - full)}
    </span>
  )
}

function IconHeart() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
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

      <HomeHero
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        ctaPrimary={t('ctaPrimary')}
        ctaSecondary={t('ctaSecondary')}
      />

      {/* ── Featured Products ── */}
      <section className="section" id="explore">
        <div className="section__inner">
          <div className="section__header">
            <h2 className="section__title">{t('products.title')}</h2>
            <a href="#" className="section__link">{t('products.cta')} →</a>
          </div>
          <div className="grid-4">
            {MOCK_PRODUCTS.map(p => (
              <a key={p.id} href="#" className="card product-card">
                <div className="card__img card__img--square">
                  {p.badge && (
                    <span className="product-card__badge">
                      <Badge variant="brand">{p.badge}</Badge>
                    </span>
                  )}
                  <button className="product-card__wishlist" aria-label="Add to wishlist">
                    <IconHeart />
                  </button>
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="card__body">
                  <p className="product-card__name">{p.name}</p>
                  <div className="product-card__rating">
                    <Stars rating={p.rating} />
                    <span>({p.reviews})</span>
                  </div>
                  <p className="product-card__price">{p.price}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trending Jobs ── */}
      <section className="section section--alt">
        <div className="section__inner">
          <div className="section__header">
            <h2 className="section__title">{t('jobs.title')}</h2>
            <a href="#" className="section__link">{t('jobs.cta')} →</a>
          </div>
          <div className="grid-3">
            {MOCK_JOBS.map(j => (
              <div key={j.id} className="card job-card card__body--padded">
                <div className="job-card__header">
                  <div className="job-card__info">
                    <div className="job-card__company">
                      {j.company}
                      {j.verified && (
                        <span className="job-card__verified" title="Verified">
                          <IconVerified />
                        </span>
                      )}
                    </div>
                    <p className="job-card__title">{j.title}</p>
                  </div>
                  <div className="job-card__logo" style={{ background: j.logoColor }}>
                    {j.logoEmoji}
                  </div>
                </div>

                <p className="job-card__desc">{j.desc}</p>

                <div className="job-card__tags">
                  <span className="job-card__tag">
                    <IconPin />
                    {j.location}
                  </span>
                  <span className="job-card__tag">
                    <IconBriefcase />
                    {j.type}
                  </span>
                </div>

                <div className="job-card__footer">
                  <p className="job-card__salary">
                    {j.salary}
                    <span className="job-card__salary-period">{j.period}</span>
                  </p>
                  <a href="#" className="job-card__apply">Apply Now</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Freelancers ── */}
      <section className="section">
        <div className="section__inner">
          <div className="section__header">
            <h2 className="section__title">{t('freelancers.title')}</h2>
            <a href="#" className="section__link">{t('freelancers.cta')} →</a>
          </div>
          <div className="grid-4">
            {MOCK_FREELANCERS.map(f => (
              <a key={f.id} href="#" className="card fl-card card__body--padded">
                <div className="fl-card__avatar">
                  <Image
                    src={f.img}
                    alt={f.name}
                    width={72}
                    height={72}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    sizes="72px"
                  />
                </div>
                <p className="fl-card__name">{f.name}</p>
                <p className="fl-card__specialty">{f.specialty}</p>
                <div className="fl-card__rating">
                  <span className="fl-card__stars">★</span>
                  {f.rating} ({f.reviews})
                </div>
                <p className="fl-card__rate">{f.rate}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Local Businesses ── */}
      <section className="section section--alt">
        <div className="section__inner">
          <div className="section__header">
            <h2 className="section__title">{t('businesses.title')}</h2>
            <a href="#" className="section__link">{t('businesses.cta')} →</a>
          </div>
          <div className="grid-4">
            {MOCK_BUSINESSES.map(b => (
              <a key={b.id} href="#" className="card biz-card">
                <div className="card__img card__img--wide">
                  <Image
                    src={b.img}
                    alt={b.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="card__body">
                  <p className="biz-card__name">{b.name}</p>
                  <div className="biz-card__meta">
                    <span>{b.category}</span>
                    <span>·</span>
                    <span>{b.location}</span>
                    <span>·</span>
                    <span className="biz-card__stars">★</span>
                    <span>{b.rating}</span>
                  </div>
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
