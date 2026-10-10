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
  const linkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in link
      gsap.fromTo(
        linkRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1 }
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
          y: -40,
          duration: 1.2,
          ease: 'power1.inOut',
        }, `+=5`)

        tl.fromTo(
          items[next],
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power1.inOut' },
          '-=0.6'
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

      {/* Back to Google link */}
      <a
        ref={linkRef}
        href="https://www.google.com"
        className="mt-10 px-8 py-3 border-2 border-white/40 rounded-full text-white/80 text-sm md:text-base tracking-widest uppercase hover:bg-white/10 hover:border-white/70 transition-all duration-300"
        style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', opacity: 0 }}
      >
        ← Back
      </a>
    </div>
  )
}
