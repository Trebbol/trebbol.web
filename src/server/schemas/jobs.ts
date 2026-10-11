import { z } from 'zod'

export const createJobSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(10).max(5000),
  category: z.string().optional(),
  city: z.string().optional(),
  salary_min: z.number().positive().optional(),
  salary_max: z.number().positive().optional(),
  contract_type: z.string().optional(),
  remote: z.boolean().optional(),
})

export const updateJobSchema = createJobSchema.partial().extend({
  status: z.enum(['active', 'closed', 'draft']).optional(),
})

export type CreateJobInput = z.infer<typeof createJobSchema>
export type UpdateJobInput = z.infer<typeof updateJobSchema>
