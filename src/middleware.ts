import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'

const intlMiddleware = createIntlMiddleware(routing)

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Sin credenciales: dejar que next-intl maneje el routing, pero bloquear
  // rutas de dashboard con redirección localizada.
  if (!supabaseUrl || !supabaseAnonKey) {
    const segments = path.split('/')
    const locale = segments[1] ?? 'nl'
    const subpath = '/' + segments.slice(2).join('/')
    if (subpath.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
    }
    return intlMiddleware(request)
  }

  // Ejecutar next-intl primero para obtener su respuesta (puede llevar cookies
  // de locale o redirigir /en → /en/). Supabase escribirá sus cookies encima.
  let supabaseResponse = intlMiddleware(request)

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        // Escribir en request para que getUser() vea el token renovado.
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        )
        // Re-ejecutar intlMiddleware con el request actualizado para obtener
        // una respuesta fresca y luego copiar las cookies de Supabase en ella.
        supabaseResponse = intlMiddleware(request)
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  // getUser() verifica y refresca el token en cada request.
  const { data: { user } } = await supabase.auth.getUser()

  // Extraer locale y sub-ruta del path (/nl/login → locale='nl', subpath='/login')
  const segments = path.split('/')
  const locale = segments[1] ?? 'nl'
  const subpath = '/' + segments.slice(2).join('/')

  const isLoginPage = subpath === '/login'
  const isDashboard = subpath.startsWith('/dashboard')

  if (!user && isDashboard) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
  }

  if (user && isLoginPage) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
