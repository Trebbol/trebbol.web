export const LOCALES = ['nl', 'en', 'fr', 'es'] as const
export type Locale = (typeof LOCALES)[number]

export interface LocaleDef {
  code: Locale
  label: string
  flag: string
}

export const LOCALE_DEFS: LocaleDef[] = [
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'en', label: 'English',    flag: '🇬🇧' },
  { code: 'fr', label: 'Français',   flag: '🇫🇷' },
  { code: 'es', label: 'Español',    flag: '🇪🇸' },
]

export const DEFAULT_LOCALE: Locale = 'nl'
