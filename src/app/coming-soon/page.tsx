'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ChevronDown } from 'lucide-react'

const translations = {
  en: {
    title: 'Coming Soon',
    subtitle: 'We\'re building something amazing',
    description: 'Trebbol Admin Dashboard is launching very soon. Stay tuned for updates.',
    notify: 'Notify Me',
    email: 'Enter your email',
  },
  es: {
    title: 'Próximamente',
    subtitle: 'Estamos construyendo algo increíble',
    description: 'El Dashboard de Administración de Trebbol se lanzará muy pronto. Mantente atento a las actualizaciones.',
    notify: 'Notificarme',
    email: 'Ingresa tu correo',
  },
  fr: {
    title: 'Bientôt Disponible',
    subtitle: 'Nous construisons quelque chose d\'incroyable',
    description: 'Le Dashboard Admin de Trebbol sera bientôt disponible. Restez à l\'écoute pour les mises à jour.',
    notify: 'Me Notifier',
    email: 'Entrez votre email',
  },
  nl: {
    title: 'Binnenkort',
    subtitle: 'We bouwen iets geweldigs',
    description: 'Het Trebbol Admin Dashboard wordt binnenkort gelanceerd. Blijf op de hoogte voor updates.',
    notify: 'Meld Mij Aan',
    email: 'Voer je e-mail in',
  },
}

type Language = 'en' | 'es' | 'fr' | 'nl'
const LANGS: Language[] = ['en', 'es', 'fr', 'nl']
const TITLES = LANGS.map(l => translations[l].title)

const TYPE_SPEED = 80
const DELETE_SPEED = 40
const PAUSE_AFTER_TYPE = 2200
const PAUSE_AFTER_DELETE = 400

export default function ComingSoonPage() {
  const [lang, setLang] = useState<Language>('en')
  const [email, setEmail] = useState('')

  // Typewriter state
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [langIndex, setLangIndex] = useState(0)

  const curtainRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const t = translations[lang]

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(curtainRef.current, { scaleY: 1 }, { scaleY: 0, duration: 1, ease: 'power3.inOut' })
      gsap.fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.7 })
      gsap.fromTo(descRef.current,     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.9 })
      gsap.fromTo(formRef.current,     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1.1 })
    })
    return () => ctx.revert()
  }, [])

  // Typewriter loop
  useEffect(() => {
    const fullText = TITLES[langIndex]

    if (!isDeleting && displayed === fullText) {
      const pause = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE)
      return () => clearTimeout(pause)
    }

    if (isDeleting && displayed === '') {
      const nextIndex = (langIndex + 1) % LANGS.length
      const pause = setTimeout(() => {
        setLangIndex(nextIndex)
        setLang(LANGS[nextIndex])
        setIsDeleting(false)
      }, PAUSE_AFTER_DELETE)
      return () => clearTimeout(pause)
    }

    const speed = isDeleting ? DELETE_SPEED : TYPE_SPEED
    const timer = setTimeout(() => {
      setDisplayed(prev =>
        isDeleting ? prev.slice(0, -1) : fullText.slice(0, prev.length + 1)
      )
    }, speed)

    return () => clearTimeout(timer)
  }, [displayed, isDeleting, langIndex])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail('')
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-brand-50 via-white to-brand-100">
      {/* Curtain */}
      <div
        ref={curtainRef}
        className="fixed inset-0 bg-gradient-to-b from-brand-600 to-brand-500 origin-top z-50 pointer-events-none"
        style={{ transformOrigin: 'top' }}
      />

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">

          {/* Typewriter title */}
          <h1 className="display-1 mb-6">
            {displayed}
            <span className="coming-soon__cursor" aria-hidden="true">|</span>
          </h1>

          {/* Subtitle */}
          <h2
            ref={subtitleRef}
            className="text-2xl md:text-3xl text-gray-700 font-semibold mb-4"
            style={{ opacity: 0 }}
          >
            {t.subtitle}
          </h2>

          {/* Description */}
          <p
            ref={descRef}
            className="text-lg text-gray-600 mb-12 leading-relaxed"
            style={{ opacity: 0 }}
          >
            {t.description}
          </p>

          {/* Form */}
          <div ref={formRef} className="flex flex-col sm:flex-row gap-3 justify-center mb-12" style={{ opacity: 0 }}>
            <form onSubmit={handleSubmit} className="flex gap-3 w-full sm:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.email}
                required
                className="flex-1 px-6 py-3 rounded-full border-2 border-brand-200 focus:border-brand-500 focus:outline-none transition placeholder-gray-400 font-medium"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white rounded-full font-semibold hover:shadow-lg hover:from-brand-700 hover:to-brand-600 transition-all transform hover:scale-105"
              >
                {t.notify}
              </button>
            </form>
          </div>

          <div className="animate-bounce text-brand-500 flex justify-center">
            <ChevronDown className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-brand-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
      </div>
    </div>
  )
}
