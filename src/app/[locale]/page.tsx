'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

const TITLES = [
  'Coming Soon',
  'Próximamente',
  'Bientôt disponible',
  'Binnenkort',
]

const TYPE_SPEED = 80
const DELETE_SPEED = 40
const PAUSE_AFTER_TYPE = 2200
const PAUSE_AFTER_DELETE = 400

export default function ComingSoonPage() {
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [index, setIndex] = useState(0)

  const mainRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      )
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.4 }
      )
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const fullText = TITLES[index]

    if (!isDeleting && displayed === fullText) {
      const t = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE)
      return () => clearTimeout(t)
    }

    if (isDeleting && displayed === '') {
      const t = setTimeout(() => {
        setIndex(i => (i + 1) % TITLES.length)
        setIsDeleting(false)
      }, PAUSE_AFTER_DELETE)
      return () => clearTimeout(t)
    }

    const speed = isDeleting ? DELETE_SPEED : TYPE_SPEED
    const t = setTimeout(() => {
      setDisplayed(prev =>
        isDeleting ? prev.slice(0, -1) : fullText.slice(0, prev.length + 1)
      )
    }, speed)

    return () => clearTimeout(t)
  }, [displayed, isDeleting, index])

  return (
    <main className="coming-soon-page" ref={mainRef} style={{ opacity: 0 }}>
      <h1 className="display-1">
        {displayed}
        <span className="coming-soon__cursor" aria-hidden="true" />
      </h1>

      <a
        ref={ctaRef}
        href="https://www.google.com"
        className="btn-primary coming-soon-cta"
        style={{ opacity: 0 }}
      >
        Go Back
      </a>
    </main>
  )
}
