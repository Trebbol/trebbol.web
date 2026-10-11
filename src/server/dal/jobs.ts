import 'server-only'
import { createClient } from '@/lib/supabase/server'
import type { Tables } from '@/types/database'

export type Job = Tables<'jobs'>

/**
 * Obtiene listado paginado de trabajos activos (público).
 */
export async function getJobs({
  page = 1,
  pageSize = 20,
}: {
  page?: number
  pageSize?: number
} = {}): Promise<Job[]> {
  const supabase = await createClient()
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) return []
  return data
}

/**
 * Obtiene un trabajo por su ID.
 */
export async function getJobById(id: string): Promise<Job | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data
}
