'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Link } from '@/i18n/navigation'
import { Badge } from '@/components/ui/badge'

interface HomeHeroProps {
  eyebrow: string
  title: string
  subtitle: string
  ctaPrimary: string
  ctaSecondary: string
}

export function HomeHero({ eyebrow, title, subtitle, ctaPrimary, ctaSecondary }: HomeHeroProps) {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [
          '.home-hero__eyebrow',
          '.home-hero__title',
          '.home-hero__subtitle',
          '.home-hero__actions',
        ],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', stagger: 0.1 }
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="home-hero" ref={heroRef}>
      <div className="home-hero__inner">
        <div className="home-hero__eyebrow" style={{ opacity: 0 }}>
          <Badge variant="brand">{eyebrow}</Badge>
        </div>
        <h1 className="home-hero__title" style={{ opacity: 0 }}>
          {title}
        </h1>
        <p className="home-hero__subtitle" style={{ opacity: 0 }}>
          {subtitle}
        </p>
        <div className="home-hero__actions" style={{ opacity: 0 }}>
          <Link href="/signup" className="btn-primary">{ctaPrimary}</Link>
          <Link href="#explore" className="btn-outline">{ctaSecondary}</Link>
        </div>
      </div>
    </section>
  )
}
