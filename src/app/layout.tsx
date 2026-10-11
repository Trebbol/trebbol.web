import type { Metadata } from 'next'

const isProduction = process.env.VERCEL_ENV === 'production'

export const metadata: Metadata = {
  title: 'Coming Soon',
  description: 'Coming Soon.',
  ...(isProduction && {
    robots: {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    },
  }),
}

// Layout raíz mínimo — las rutas con locale usan src/app/[locale]/layout.tsx.
// Este layout solo sirve como shell para rutas que no tienen prefijo de locale.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
