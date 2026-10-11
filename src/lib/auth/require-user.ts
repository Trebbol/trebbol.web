import 'server-only'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { User } from '@supabase/supabase-js'

/**
 * Obtiene el usuario autenticado verificado desde la sesión del servidor.
 * Si no hay sesión válida, redirige a /login.
 *
 * Úsalo en Server Components y Server Actions que requieran autenticación.
 */
export async function requireUser(): Promise<User> {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  return user
}
