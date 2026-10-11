import { z } from 'zod'

export const createProductSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(10).max(5000).optional(),
  price: z.number().positive(),
  category: z.string().optional(),
  condition: z.enum(['new', 'used', 'refurbished']).optional(),
  city: z.string().optional(),
})

export const updateProductSchema = createProductSchema.partial().extend({
  status: z.enum(['active', 'sold', 'draft']).optional(),
})

export type CreateProductInput = z.infer<typeof createProductSchema>
export type UpdateProductInput = z.infer<typeof updateProductSchema>
