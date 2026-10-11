import 'server-only'
import { createClient } from '@/lib/supabase/server'
import type { Tables } from '@/types/database'

export type UserProfile = Tables<'user_profiles'>

/**
 * Obtiene el perfil del usuario autenticado.
 * Requiere sesión activa — no llames desde rutas públicas sin verificar primero.
 */
export async function getMyProfile(): Promise<UserProfile | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) return null
  return data
}

/**
 * Obtiene el perfil público de un usuario por su ID.
 */
export async function getUserProfileById(userId: string): Promise<UserProfile | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('user_profiles')
    .select('id, first_name, last_name, username, avatar_url, bio, city, rating, total_reviews, role')
    .eq('id', userId)
    .single()

  if (error) return null
  return data as UserProfile
}
