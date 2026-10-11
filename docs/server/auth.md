# Auth — Helpers de autenticación

Módulos server-only para verificar sesión y permisos. Solo disponibles en Server Components y Server Actions.

---

## requireUser

**Archivo:** `src/lib/auth/require-user.ts`

Obtiene el usuario autenticado verificado desde la sesión del servidor. Si no hay sesión válida, redirige a `/login`.

```ts
import { requireUser } from '@/lib/auth/require-user'

const user = await requireUser()
// user.id, user.email, etc.
```

### Cuándo usarlo

- En cualquier Server Component de rutas protegidas (`/dashboard/*`)
- Al inicio de Server Actions que requieran identidad del usuario
- NO lo uses en rutas públicas — redirigirá a cualquier usuario no autenticado

---

## isAdmin

**Archivo:** `src/lib/auth/permissions.ts`

Verifica si el usuario autenticado tiene `system_role = 'admin'` en `user_profiles`. Usa la función PostgreSQL `is_admin()`.

```ts
import { isAdmin } from '@/lib/auth/permissions'

const admin = await isAdmin()
if (!admin) notFound()
```

### Retorna
- `true` si el usuario tiene rol admin
- `false` si no hay sesión, no tiene el rol, o hay error

---

## hasProfileType

**Archivo:** `src/lib/auth/permissions.ts`

Verifica si el usuario autenticado tiene un tipo de perfil específico. Usa la función PostgreSQL `has_profile_type(p_type)`.

```ts
import { hasProfileType } from '@/lib/auth/permissions'

const isPro = await hasProfileType('professional')
```

### Parámetros

| Parámetro | Tipo | Descripción |
|---|---|---|
| `type` | `'neighbor' \| 'professional' \| 'company'` | Tipo de perfil a verificar |

### Retorna
- `true` si el usuario tiene ese tipo de perfil activo
- `false` en cualquier otro caso o error
