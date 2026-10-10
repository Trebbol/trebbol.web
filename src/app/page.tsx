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

export default function ComingSoonPage() {
  const [lang, setLang] = useState<Language>('en')
  const [email, setEmail] = useState('')
  const curtainRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const t = translations[lang]

  useEffect(() => {
    // Entrada inicial: cortina que se abre
    const ctx = gsap.context(() => {
      gsap.fromTo(
        curtainRef.current,
        { scaleY: 1 },
        { scaleY: 0, duration: 1, ease: 'power3.inOut' }
      )

      // Animar contenido después de que la cortina se abre
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
      )

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.7 }
      )

      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.9 }
      )

      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1.1 }
      )
    })

    return () => ctx.revert()
  }, [])

  // Transición al cambiar idioma
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setLang(lang)
          gsap.to(contentRef.current, {
            opacity: 1,
            duration: 0.3,
          })
        },
      })
    })

    return () => ctx.revert()
  }, [lang])

  const handleLanguageChange = (newLang: Language) => {
    if (newLang !== lang) {
      gsap.to(contentRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setLang(newLang)
        },
      })

      setTimeout(() => {
        gsap.to(contentRef.current, {
          opacity: 1,
          duration: 0.3,
        })
      }, 300)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar el email
    alert(`${t.notify}: ${email}`)
    setEmail('')
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-brand-50 via-white to-brand-100">
      {/* Cortina de apertura GSAP */}
      <div
        ref={curtainRef}
        className="fixed inset-0 bg-gradient-to-b from-brand-600 to-brand-500 origin-top z-50 pointer-events-none"
        style={{ transformOrigin: 'top' }}
      />

      {/* Selector de idioma flotante */}
      <div className="fixed top-6 right-6 z-40 flex gap-2 bg-white rounded-full p-1 shadow-lg border border-brand-200">
        {(['en', 'es', 'fr', 'nl'] as Language[]).map((l) => (
          <button
            key={l}
            onClick={() => handleLanguageChange(l)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              lang === l
                ? 'bg-brand-500 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Contenido principal */}
      <div ref={contentRef} className="relative min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* Decoración superior */}
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full opacity-20 blur-2xl" />
          </div>

          {/* Título principal */}
          <h1
            ref={titleRef}
            className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent mb-6"
          >
            {t.title}
          </h1>

          {/* Subtítulo */}
          <h2
            ref={subtitleRef}
            className="text-2xl md:text-3xl text-gray-700 font-semibold mb-4"
          >
            {t.subtitle}
          </h2>

          {/* Descripción */}
          <p
            ref={descRef}
            className="text-lg text-gray-600 mb-12 leading-relaxed"
          >
            {t.description}
          </p>

          {/* Formulario */}
          <div ref={formRef} className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
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

          {/* Animación de flecha flotante */}
          <div className="animate-bounce text-brand-500 flex justify-center">
            <ChevronDown className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Fondo decorativo con gradientes */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-brand-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000" />
      </div>
    </div>
  )
}
