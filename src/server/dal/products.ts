import 'server-only'
import { createClient } from '@/lib/supabase/server'
import type { Tables } from '@/types/database'

export type Product = Tables<'products'>

/**
 * Obtiene listado paginado de productos activos (público).
 */
export async function getProducts({
  page = 1,
  pageSize = 20,
}: {
  page?: number
  pageSize?: number
} = {}): Promise<Product[]> {
  const supabase = await createClient()
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) return []
  return data
}

/**
 * Obtiene un producto por su ID.
 */
export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data
}
