import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trebbol',
  description: 'Trebbol — ecosistema digital local.',
}

// Layout raíz mínimo — las rutas con locale usan src/app/[locale]/layout.tsx.
// Este layout solo sirve como shell para rutas que no tienen prefijo de locale.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
