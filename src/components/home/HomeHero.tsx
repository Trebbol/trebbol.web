'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Link } from '@/i18n/navigation'
import { Badge } from '@/components/ui/badge'

const TYPE_SPEED = 75
const DELETE_SPEED = 38
const PAUSE_AFTER_TYPE = 2000
const PAUSE_AFTER_DELETE = 350

interface HomeHeroProps {
  eyebrow: string
  subtitle: string
  ctaPrimary: string
  ctaSecondary: string
  words: string[]
}

export function HomeHero({ eyebrow, subtitle, ctaPrimary, ctaSecondary, words }: HomeHeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ['.home-hero__eyebrow', '.home-hero__typewriter', '.home-hero__subtitle', '.home-hero__actions'],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', stagger: 0.1 }
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const fullText = words[index]

    if (!isDeleting && displayed === fullText) {
      const t = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE)
      return () => clearTimeout(t)
    }
    if (isDeleting && displayed === '') {
      const t = setTimeout(() => {
        setIndex(i => (i + 1) % words.length)
        setIsDeleting(false)
      }, PAUSE_AFTER_DELETE)
      return () => clearTimeout(t)
    }

    const speed = isDeleting ? DELETE_SPEED : TYPE_SPEED
    const t = setTimeout(() => {
      setDisplayed(prev => isDeleting ? prev.slice(0, -1) : fullText.slice(0, prev.length + 1))
    }, speed)
    return () => clearTimeout(t)
  }, [displayed, isDeleting, index])

  return (
    <section className="home-hero" ref={heroRef}>
      <div className="home-hero__inner">
        <div className="home-hero__eyebrow" style={{ opacity: 0 }}>
          <Badge variant="brand" className="!bg-white/15 !text-white border border-white/25 !rounded-full !px-4 !py-1.5 !text-sm !gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-dark.svg" alt="" width={15} height={15} style={{ filter: 'brightness(0) invert(1)', flexShrink: 0 }} />
            {eyebrow}
          </Badge>
        </div>
        <p className="home-hero__typewriter" style={{ opacity: 0 }} aria-live="polite">
          {displayed}
          <span className="home-hero__cursor" aria-hidden="true">|</span>
        </p>
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
