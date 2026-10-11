import type { Metadata } from "next"
import { Inter, Noto_Sans } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
})

export const metadata: Metadata = {
  title: "Coming Soon",
  description: "Trebbol is coming soon. Stay tuned.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${notoSans.variable}`}>
      <body className="min-h-screen bg-white text-gray-900">
        {children}
      </body>
    </html>
  )
}
