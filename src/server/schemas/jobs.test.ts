import { describe, it, expect } from 'vitest'
import { createJobSchema, updateJobSchema } from './jobs'

describe('createJobSchema', () => {
  it('acepta datos válidos', () => {
    const result = createJobSchema.safeParse({
      title: 'Desarrollador Frontend',
      description: 'Buscamos desarrollador con experiencia en React y TypeScript.',
      city: 'Bruselas',
      remote: true,
    })
    expect(result.success).toBe(true)
  })

  it('rechaza título demasiado corto', () => {
    const result = createJobSchema.safeParse({
      title: 'Ab',
      description: 'Descripción suficientemente larga para pasar la validación.',
    })
    expect(result.success).toBe(false)
  })

  it('rechaza descripción demasiado corta', () => {
    const result = createJobSchema.safeParse({
      title: 'Título válido',
      description: 'Corta',
    })
    expect(result.success).toBe(false)
  })

  it('rechaza salary_max negativo', () => {
    const result = createJobSchema.safeParse({
      title: 'Título válido',
      description: 'Descripción suficientemente larga para pasar la validación.',
      salary_max: -1000,
    })
    expect(result.success).toBe(false)
  })
})

describe('updateJobSchema', () => {
  it('acepta actualización parcial', () => {
    const result = updateJobSchema.safeParse({ title: 'Nuevo título' })
    expect(result.success).toBe(true)
  })

  it('acepta cambio de status a closed', () => {
    const result = updateJobSchema.safeParse({ status: 'closed' })
    expect(result.success).toBe(true)
  })

  it('rechaza status inválido', () => {
    const result = updateJobSchema.safeParse({ status: 'eliminado' })
    expect(result.success).toBe(false)
  })
})
