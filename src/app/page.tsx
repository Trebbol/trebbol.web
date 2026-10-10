'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const messages = [
  { lang: 'EN', text: 'COMING SOON' },
  { lang: 'ES', text: 'PRÓXIMAMENTE' },
  { lang: 'FR', text: 'BIENTÔT DISPONIBLE' },
  { lang: 'NL', text: 'BINNENKORT' },
]

export default function ComingSoonPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in subtitle
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
      )

      // Marquee: cycle through languages
      const items = marqueeRef.current?.querySelectorAll('.marquee-item')
      if (!items || items.length === 0) return

      // Set all items invisible initially except first
      gsap.set(items, { opacity: 0, y: 60 })
      gsap.set(items[0], { opacity: 1, y: 0 })

      const tl = gsap.timeline({ repeat: -1 })

      for (let i = 0; i < items.length; i++) {
        const next = (i + 1) % items.length

        tl.to(items[i], {
          opacity: 0,
          y: -60,
          duration: 0.6,
          ease: 'power2.in',
        }, `+=2.5`)

        tl.fromTo(
          items[next],
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: '#11A5B0' }}
    >
      {/* Marquee container */}
      <div className="relative h-[120px] md:h-[160px] lg:h-[200px] overflow-hidden flex items-center justify-center w-full">
        <div ref={marqueeRef} className="relative w-full">
          {messages.map((msg, i) => (
            <div
              key={msg.lang}
              className="marquee-item absolute inset-0 flex items-center justify-center"
              style={i === 0 ? {} : { opacity: 0 }}
            >
              <h1
                className="text-white font-bold text-center tracking-tight whitespace-nowrap"
                style={{
                  fontSize: 'clamp(3rem, 10vw, 8rem)',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  letterSpacing: '-0.02em',
                }}
              >
                {msg.text}
              </h1>
            </div>
          ))}
        </div>
      </div>

      {/* Subtitle */}
      <p
        ref={subtitleRef}
        className="text-white/70 text-lg md:text-xl tracking-[0.3em] uppercase mt-6"
        style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
      >
        stay tuned
      </p>
    </div>
  )
}
