# Schemas — Validación con Zod

Schemas de validación para entradas de usuario. Usados en Server Actions y API routes.

**Carpeta:** `src/server/schemas/`

---

## jobs.ts

### createJobSchema

Valida los datos para crear un nuevo trabajo.

```ts
import { createJobSchema } from '@/server/schemas/jobs'

const result = createJobSchema.safeParse(formData)
if (!result.success) return { errors: result.error.flatten() }
```

**Campos:**

| Campo | Tipo | Requerido | Validación |
|---|---|---|---|
| `title` | `string` | ✅ | min 3, max 200 |
| `description` | `string` | ✅ | min 10, max 5000 |
| `category` | `string` | — | opcional |
| `city` | `string` | — | opcional |
| `salary_min` | `number` | — | positivo |
| `salary_max` | `number` | — | positivo |
| `contract_type` | `string` | — | opcional |
| `remote` | `boolean` | — | opcional |

---

### updateJobSchema

Versión parcial de `createJobSchema` para actualizaciones. Todos los campos son opcionales, más `status`.

```ts
import { updateJobSchema } from '@/server/schemas/jobs'

const result = updateJobSchema.safeParse({ status: 'closed' })
```

**Campo adicional:**

| Campo | Tipo | Valores |
|---|---|---|
| `status` | `string` | `'active'` \| `'closed'` \| `'draft'` |

---

## products.ts

### createProductSchema

Valida los datos para crear un producto en el marketplace.

```ts
import { createProductSchema } from '@/server/schemas/products'

const result = createProductSchema.safeParse(formData)
```

**Campos:**

| Campo | Tipo | Requerido | Validación |
|---|---|---|---|
| `title` | `string` | ✅ | min 3, max 200 |
| `description` | `string` | — | min 10, max 5000 |
| `price` | `number` | ✅ | positivo |
| `category` | `string` | — | opcional |
| `condition` | `string` | — | `'new'` \| `'used'` \| `'refurbished'` |
| `city` | `string` | — | opcional |

---

### updateProductSchema

Versión parcial de `createProductSchema` para actualizaciones.

**Campo adicional:**

| Campo | Tipo | Valores |
|---|---|---|
| `status` | `string` | `'active'` \| `'sold'` \| `'draft'` |

---

## Tipos exportados

```ts
import type { CreateJobInput, UpdateJobInput } from '@/server/schemas/jobs'
import type { CreateProductInput, UpdateProductInput } from '@/server/schemas/products'
```
