'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { AltArrowLeftLinearIcon } from '@solar-icons/react'

const messages = [
  { lang: 'EN', text: 'Coming Soon' },
  { lang: 'ES', text: 'Próximamente' },
  { lang: 'FR', text: 'Bientôt disponible' },
  { lang: 'NL', text: 'Binnenkort' },
]

export default function ComingSoonPage() {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1 }
      )

      const items = marqueeRef.current?.querySelectorAll('.marquee-item')
      if (!items?.length) return

      gsap.set(items, { opacity: 0, y: 60 })
      gsap.set(items[0], { opacity: 1, y: 0 })

      const tl = gsap.timeline({ repeat: -1 })

      for (let i = 0; i < items.length; i++) {
        const next = (i + 1) % items.length
        tl.to(items[i], { opacity: 0, y: -40, duration: 1.2, ease: 'power1.inOut' }, '+=5')
        tl.fromTo(items[next], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power1.inOut' }, '-=0.6')
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <main className="coming-soon-page">
      <div className="coming-soon-marquee" ref={marqueeRef}>
        {messages.map((msg) => (
          <div key={msg.lang} className="marquee-item">
            <h1 className="coming-soon-heading">{msg.text}</h1>
          </div>
        ))}
      </div>

      <a
        ref={ctaRef}
        href="https://www.google.com"
        className="coming-soon-cta"
        style={{ opacity: 0 }}
      >
        <AltArrowLeftLinearIcon size={18} aria-hidden="true" />
        Go Back
      </a>
    </main>
  )
}
