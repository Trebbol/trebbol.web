import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['nl', 'en', 'fr', 'es'],
  defaultLocale: 'nl',
  localePrefix: 'always',
})
