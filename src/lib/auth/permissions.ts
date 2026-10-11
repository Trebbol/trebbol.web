import 'server-only'
import { createClient } from '@/lib/supabase/server'

/**
 * Verifica si el usuario autenticado tiene system_role = 'admin'.
 * Usa la función is_admin() de PostgreSQL que consulta user_profiles.system_role.
 * Retorna false si no hay sesión o si ocurre un error.
 */
export async function isAdmin(): Promise<boolean> {
  const supabase = await createClient()
  const { data, error } = await supabase.rpc('is_admin')
  if (error) return false
  return data === true
}

/**
 * Verifica si el usuario autenticado tiene un profile_type específico.
 */
export async function hasProfileType(
  type: 'neighbor' | 'professional' | 'company'
): Promise<boolean> {
  const supabase = await createClient()
  const { data, error } = await supabase.rpc('has_profile_type', { p_type: type })
  if (error) return false
  return data === true
}
