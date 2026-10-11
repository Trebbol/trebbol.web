// @vitest-environment node
import { describe, it, expect } from 'vitest'
import { createProductSchema, updateProductSchema } from './products'

describe('createProductSchema', () => {
  it('acepta datos válidos', () => {
    const result = createProductSchema.safeParse({
      title: 'Bicicleta de montaña',
      description: 'Bicicleta en buen estado, poco uso, incluye accesorios.',
      price: 250,
      condition: 'used',
      city: 'Gante',
    })
    expect(result.success).toBe(true)
  })

  it('rechaza precio negativo', () => {
    const result = createProductSchema.safeParse({
      title: 'Bicicleta de montaña',
      price: -50,
    })
    expect(result.success).toBe(false)
  })

  it('rechaza condition inválida', () => {
    const result = createProductSchema.safeParse({
      title: 'Bicicleta de montaña',
      price: 250,
      condition: 'roto',
    })
    expect(result.success).toBe(false)
  })
})

describe('updateProductSchema', () => {
  it('acepta actualización parcial sin precio', () => {
    const result = updateProductSchema.safeParse({ title: 'Nuevo título' })
    expect(result.success).toBe(true)
  })

  it('acepta cambio de status a sold', () => {
    const result = updateProductSchema.safeParse({ status: 'sold' })
    expect(result.success).toBe(true)
  })
})
