# DAL — Data Access Layer

Módulos server-only para acceso a datos desde Supabase. Solo disponibles en Server Components y Server Actions.

**Carpeta:** `src/server/dal/`

---

## users.ts

### getMyProfile

Obtiene el perfil del usuario autenticado desde `user_profiles`.

```ts
import { getMyProfile } from '@/server/dal/users'

const profile = await getMyProfile()
// profile.first_name, profile.city, profile.role, etc.
```

**Retorna:** `UserProfile | null`

> No llames desde rutas públicas sin verificar sesión primero.

---

### getUserProfileById

Obtiene el perfil público de un usuario por su ID. Solo retorna campos públicos.

```ts
import { getUserProfileById } from '@/server/dal/users'

const profile = await getUserProfileById(userId)
```

**Parámetros:**

| Parámetro | Tipo | Descripción |
|---|---|---|
| `userId` | `string` | UUID del usuario |

**Retorna:** `UserProfile | null`

---

## jobs.ts

### getJobs

Obtiene un listado paginado de trabajos con `status = 'active'`, ordenados por fecha de creación descendente.

```ts
import { getJobs } from '@/server/dal/jobs'

const jobs = await getJobs({ page: 1, pageSize: 20 })
```

**Parámetros:**

| Parámetro | Tipo | Default | Descripción |
|---|---|---|---|
| `page` | `number` | `1` | Página actual |
| `pageSize` | `number` | `20` | Resultados por página |

**Retorna:** `Job[]` (vacío si hay error)

---

### getJobById

Obtiene un trabajo por su ID.

```ts
import { getJobById } from '@/server/dal/jobs'

const job = await getJobById(id)
if (!job) notFound()
```

**Parámetros:**

| Parámetro | Tipo | Descripción |
|---|---|---|
| `id` | `string` | UUID del trabajo |

**Retorna:** `Job | null`

---

## products.ts

### getProducts

Obtiene un listado paginado de productos ordenados por fecha de creación descendente.

```ts
import { getProducts } from '@/server/dal/products'

const products = await getProducts({ page: 1, pageSize: 20 })
```

**Parámetros:**

| Parámetro | Tipo | Default | Descripción |
|---|---|---|---|
| `page` | `number` | `1` | Página actual |
| `pageSize` | `number` | `20` | Resultados por página |

**Retorna:** `Product[]` (vacío si hay error)

---

### getProductById

Obtiene un producto por su ID.

```ts
import { getProductById } from '@/server/dal/products'

const product = await getProductById(id)
if (!product) notFound()
```

**Parámetros:**

| Parámetro | Tipo | Descripción |
|---|---|---|
| `id` | `string` | UUID del producto |

**Retorna:** `Product | null`
