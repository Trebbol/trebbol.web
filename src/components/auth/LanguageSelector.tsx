'use client'

import * as React from 'react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { LOCALE_DEFS, type Locale } from '@/lib/i18n/locales'

/**
 * LanguageSelector — cambia el idioma navegando a la misma ruta bajo el
 * nuevo prefijo de locale (/nl/login → /en/login).
 * Se abre hacia arriba (está en la barra inferior de la pantalla).
 */
export function LanguageSelector() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()

  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  const current = LOCALE_DEFS.find(l => l.code === locale) ?? LOCALE_DEFS[0]

  // Cierra al hacer click fuera
  React.useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  // Cierra con Escape
  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  function select(code: Locale) {
    router.replace(pathname, { locale: code })
    setOpen(false)
  }

  return (
    <div className="auth-lang-wrap" ref={ref}>

      {/* ── Dropdown ── */}
      {open && (
        <div className="auth-lang-dropdown" role="listbox" aria-label="Seleccionar idioma">
          <ul className="auth-lang-list">
            {LOCALE_DEFS.map(lang => (
              <li key={lang.code} role="option" aria-selected={lang.code === locale}>
                <button
                  type="button"
                  className={`auth-lang-option${lang.code === locale ? ' auth-lang-option--active' : ''}`}
                  onClick={() => select(lang.code)}
                >
                  <span className="auth-lang-flag" aria-hidden="true">{lang.flag}</span>
                  <span className="auth-lang-option-label">{lang.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Trigger ── */}
      <button
        type="button"
        className="auth-lang-trigger"
        onClick={() => setOpen(prev => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Idioma seleccionado: ${current.label}. Haz clic para cambiar`}
      >
        <span className="auth-lang-flag" aria-hidden="true">{current.flag}</span>
        <span className="auth-lang-trigger-label">{current.label}</span>
        <svg
          className={`auth-lang-chevron${open ? ' auth-lang-chevron--up' : ''}`}
          width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"
        >
          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

    </div>
  )
}
