# Plan trebbol-web — Dashboard Administrativo

> **Ejecutor:** Claude Haiku
> **Package manager:** **pnpm** — nunca usar npm ni yarn en ningún comando.
> **Regla principal:** Antes de instalar o configurar cualquier librería/herramienta, usar **context7 MCP** para obtener la documentación más reciente. No asumir versiones ni APIs.
> **Diseño visual:** Ver [`design-tokens.md`](./design-tokens.md) para colores, tipografía y configuración de estilos.

---

## Regla context7 — consultar ANTES de usar

Usar context7 MCP para obtener docs actualizadas **antes** de cada una de estas acciones:

| Momento | Qué consultar en context7 |
|---|---|
| Antes de `create-next-app` | `create-next-app` — flags y opciones actuales |
| Antes de instalar `@supabase/ssr` | `@supabase/ssr` — API de `createBrowserClient`, `createServerClient`, middleware |
| Antes de `shadcn init` | `shadcn/ui` — comando init, opciones, estructura generada |
| Antes de agregar componentes shadcn | `shadcn/ui` — nombres de componentes disponibles |
| Antes de configurar Vitest | `vitest` — config con Next.js, jsdom, aliases |
| Antes de generar tipos Supabase | `supabase CLI` — comando `gen types` actualizado |
| Antes de configurar GitHub Actions | `GitHub Actions` — sintaxis YAML, `pnpm/action-setup`, `actions/setup-node` con cache pnpm |
| Antes de deploy en Vercel | `Vercel CLI` — comando `vercel`, env vars, integración con pnpm |
| Antes de configurar Tailwind | `Tailwind CSS` — config v4 vs v3, integración Next.js |

> **No saltarse esta regla.** Si context7 no devuelve resultado, buscar en la web antes de asumir.

---

## Contexto

Dashboard web de administración para **Trebbol** — misma base de datos Supabase que la app Flutter.
No es una app pública: es una herramienta interna para monitorear y gestionar la plataforma.

**Supabase prod:**
- Project ID: `vsrcpvuvvbtyepjqhrny`
- URL: `https://vsrcpvuvvbtyepjqhrny.supabase.co`
- 23 tablas disponibles (ver sección Datos)

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js (App Router) + TypeScript strict |
| Estilos | Tailwind CSS |
| UI Components | shadcn/ui (estilo AdminCN) |
| Auth + Data | Supabase SSR (`@supabase/ssr` + `@supabase/supabase-js`) |
| Package manager | **pnpm** (nunca npm ni yarn) |
| Testing | Vitest + React Testing Library |
| CI | GitHub Actions |
| Deploy | Vercel |
| Docs en tiempo real | **context7 MCP** |

---

## Datos disponibles en Supabase

### Tablas principales

| Tabla | Filas | Propósito |
|---|---|---|
| `user_profiles` | 8 | Usuarios, roles, estado |
| `freelancer_profiles` | 2 | Perfiles freelancers |
| `company_profiles` | 4 | Perfiles empresas |
| `jobs` | 4 | Ofertas de empleo |
| `products` | 4 | Productos marketplace |
| `ads` | 5 | Anuncios |
| `conversations` | 11 | Conversaciones chat |
| `orders` | 0 | Pedidos |
| `job_applications` | 0 | Postulaciones |
| `reviews` | 0 | Reseñas |
| `messages` | 0 | Mensajes chat |
| `notifications` | 0 | Notificaciones |
| `service_requests` | 0 | Solicitudes servicio |
| `favorites` | 2 | Favoritos |

### Enums

- `user_role`: `neighbor`, `freelancer`, `company`, `professional`
- `system_role`: `user`, `admin`
- `profile_type`: `neighbor`, `professional`, `company`

---

## Prerequisitos

```bash
node --version     # >= 20
pnpm --version     # >= 9
git --version
gh --version       # GitHub CLI
```

---

## Fase 0 — Repositorio GitHub

```bash
cd /Volumes/Respando/Developer/web
gh repo create trebbol-web --private --description "Trebbol Admin Dashboard" --clone
cd trebbol-web
```

**Verificar:** directorio tiene `.git/`.

---

## Fase 1 — Crear proyecto Next.js

> Consultar context7 antes de ejecutar.

```bash
pnpm dlx create-next-app@latest trebbol-web \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-turbopack
```

**Verificar:** `package.json` tiene `"next"` y existe `src/`.

---

## Fase 2 — Dependencias

> Consultar context7 antes de cada instalación.

### 2.1 Supabase SSR

```bash
pnpm add @supabase/supabase-js @supabase/ssr
```

### 2.2 shadcn/ui init

```bash
pnpm dlx shadcn@latest init
```

Responder: Style **Default** / Base color **Slate** / CSS variables **Yes**.

### 2.3 Componentes shadcn

```bash
pnpm dlx shadcn@latest add \
  button card table badge avatar dropdown-menu sidebar sheet \
  input label separator skeleton tooltip dialog select tabs \
  breadcrumb progress
```

### 2.4 Testing

```bash
pnpm add -D vitest @vitejs/plugin-react jsdom \
  @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### 2.5 Tipos adicionales

```bash
pnpm add -D @types/node
```

**Verificar:** `node_modules/.pnpm/` existe sin errores.

---

## Fase 3 — Variables de entorno

### 3.1 Crear `.env.local`

```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://vsrcpvuvvbtyepjqhrny.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<pedir al usuario>
SUPABASE_SERVICE_ROLE_KEY=<pedir al usuario>
EOF
```

> **IMPORTANTE:** `SUPABASE_SERVICE_ROLE_KEY` es secreto. Nunca en variables `NEXT_PUBLIC_*`. Solo en Server Components, Server Actions y Route Handlers.

### 3.2 Crear `.env.local.example`

```bash
cat > .env.local.example << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
EOF
```

### 3.3 Verificar `.gitignore`

Confirmar que `.env.local` está incluido (Next.js lo agrega por defecto).

---

## Fase 4 — Configurar clientes Supabase

> Consultar context7 para `@supabase/ssr` antes de escribir.

### 4.1 Browser client — `src/lib/supabase/client.ts`

```ts
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### 4.2 Server client — `src/lib/supabase/server.ts`

```ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch { /* Server Component — read-only */ }
        },
      },
    }
  )
}
```

### 4.3 Admin client — `src/lib/supabase/admin.ts`

```ts
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error('Missing Supabase admin credentials')
  }

  return createSupabaseClient<Database>(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
```

---

## Fase 5 — Tipos TypeScript de Supabase

```bash
pnpm add -D supabase
pnpm supabase gen types typescript \
  --project-id vsrcpvuvvbtyepjqhrny \
  > src/types/database.ts
```

**Verificar:** `src/types/database.ts` tiene las 23 tablas.
Si pide login: `pnpm supabase login` primero.

---

## Fase 6 — Middleware de auth

> Consultar context7 para middleware de `@supabase/ssr`.

Crear `src/middleware.ts`:

```ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname
  const isLoginPage = path === '/login'
  const isDashboard = path.startsWith('/dashboard')

  if (!user && isDashboard) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (user && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

---

## Fase 7 — Estructura de carpetas

```
src/
├── app/
│   ├── (auth)/login/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx              ← Sidebar + header
│   │   ├── page.tsx                ← Redirect a /dashboard/overview
│   │   ├── overview/page.tsx       ← Stats generales
│   │   ├── users/
│   │   │   ├── page.tsx            ← Lista user_profiles
│   │   │   └── [id]/page.tsx       ← Detalle usuario
│   │   ├── jobs/page.tsx
│   │   ├── products/page.tsx
│   │   ├── ads/page.tsx
│   │   ├── orders/page.tsx
│   │   ├── conversations/page.tsx
│   │   └── reviews/page.tsx
│   ├── layout.tsx                  ← Root layout
│   └── globals.css
├── components/
│   ├── ui/                         ← shadcn (auto)
│   ├── layout/
│   │   ├── app-sidebar.tsx
│   │   ├── app-header.tsx
│   │   └── nav-items.ts
│   └── features/
│       ├── overview/stats-cards.tsx
│       ├── users/users-table.tsx
│       ├── jobs/jobs-table.tsx
│       ├── products/products-table.tsx
│       ├── ads/ads-table.tsx
│       └── shared/
│           ├── status-badge.tsx
│           └── data-table.tsx
├── lib/
│   ├── supabase/{client,server,admin}.ts
│   └── utils.ts
├── types/database.ts
└── middleware.ts
```

```bash
mkdir -p src/app/\(auth\)/login
mkdir -p src/app/\(dashboard\)/{overview,users/\[id\],jobs,products,ads,orders,conversations,reviews}
mkdir -p src/components/{layout,features/{overview,users,jobs,products,ads,shared}}
mkdir -p src/lib/supabase src/types
```

---

## Fase 8 — Implementar páginas

### 8.1 Login — `src/app/(auth)/login/page.tsx`

- `'use client'`
- Form con email + password
- `supabase.auth.signInWithPassword()`
- Redirect a `/dashboard/overview` on success

### 8.2 Navegación — `src/components/layout/nav-items.ts`

Items: Overview, Usuarios, Empleos, Productos, Anuncios, Pedidos, Conversaciones, Reseñas.
Iconos de `lucide-react`.

### 8.3 Sidebar — `src/components/layout/app-sidebar.tsx`

- `'use client'`
- Usa componentes shadcn `Sidebar*`
- Marca activo según `pathname`

### 8.4 Dashboard layout — `src/app/(dashboard)/layout.tsx`

- Server Component
- Verifica auth con `getUser()`
- Verifica `system_role === 'admin'` en `user_profiles`
- Redirect a `/login?error=unauthorized` si no es admin
- Renderiza `SidebarProvider` + `AppSidebar` + children

### 8.5 Dashboard root — redirect a `/dashboard/overview`

### 8.6 Overview — `src/app/(dashboard)/overview/page.tsx`

- Server Component con `createAdminClient()`
- `Promise.all` de counts: users, jobs, products, ads, orders, conversations
- Grid de stat cards

### 8.7 Usuarios — `src/app/(dashboard)/users/page.tsx`

- Server Component
- Tabla: nombre, email, rol (badge), system_role, perfil completo, fecha

### 8.8 Resto de páginas (mismo patrón)

| Página | Columnas |
|---|---|
| **jobs** | title, company_name, employment_type, city, status, applications_count, created_at |
| **products** | title, price, category, condition, stock, status, created_at |
| **ads** | title, price, category, operation_type, status, likes_count, created_at |
| **orders** | title, price, quantity, status, created_at |
| **conversations** | id (8 chars), updated_at |
| **reviews** | rating, comment, context_type, created_at |

---

## Fase 9 — Configurar Vitest

> Consultar context7 para Vitest + Next.js.

### `vitest.config.ts`

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: { '@': resolve(__dirname, './src') },
  },
})
```

### `src/test/setup.ts`

```ts
import '@testing-library/jest-dom'
```

### Scripts en `package.json`

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui"
  }
}
```

---

## Fase 10 — GitHub Actions CI

Crear `.github/workflows/ci.yml`:

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  ci:
    name: Type check, lint & test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm type-check
      - run: pnpm lint
      - run: pnpm test
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
          SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
```

> Después del primer push: GitHub → Settings → Secrets → agregar los 3 secrets.

---

## Fase 11 — Deploy en Vercel

```bash
pnpm dlx vercel
```

Variables en Vercel dashboard:

| Variable | Entornos |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | Production, Preview (NO exponer al browser) |

Conectar repo GitHub para deploy automático en push a `main`.

---

## Fase 12 — Commit inicial y push

```bash
git add .
git commit -m "feat: initial trebbol-web setup

- Next.js App Router + TypeScript + Tailwind
- shadcn/ui components (AdminCN style)
- Supabase SSR integration (client + server + admin)
- Dashboard layout with sidebar navigation
- Pages: overview, users, jobs, products, ads, orders, conversations, reviews
- Vitest + React Testing Library setup
- GitHub Actions CI workflow"

git push origin main
```

---

## Checklist final

- [ ] `pnpm dev` arranca sin errores en `localhost:3000`
- [ ] `/login` carga correctamente
- [ ] Login con admin redirige a `/dashboard/overview`
- [ ] Overview muestra 6 stat cards con datos reales
- [ ] `/dashboard/users` muestra tabla con 8 usuarios
- [ ] Usuario sin `system_role = 'admin'` → redirect a `/login?error=unauthorized`
- [ ] `pnpm type-check` pasa
- [ ] `pnpm lint` pasa
- [ ] `pnpm test` corre sin error
- [ ] GitHub Actions CI en verde
- [ ] Deploy en Vercel accesible

---

## Notas para el ejecutor

1. **context7 SIEMPRE primero** — antes de instalar cualquier paquete o configurar cualquier herramienta (ver tabla "Regla context7" arriba)
2. **pnpm siempre** — nunca npm o yarn. Todos los comandos: `pnpm add`, `pnpm dlx`, `pnpm run`, etc.
3. **GitHub Actions con pnpm** — usar `pnpm/action-setup@v4` + cache pnpm en `actions/setup-node`. Consultar context7 para la sintaxis actual.
4. **Vercel con pnpm** — Vercel detecta pnpm automáticamente si existe `pnpm-lock.yaml`. Consultar context7 para CLI y config actualizada.
5. **Service role solo en servidor** — `createAdminClient()` nunca en `'use client'`
6. **TypeScript estricto** — no usar `any`
7. **Server Components por defecto** — solo `'use client'` donde sea necesario
8. **Si algo falla** — no reintentar, leer error y buscar en context7
9. **Service role key es secreto** — nunca log ni exponer al browser
10. **Diseño visual** — seguir [`design-tokens.md`](./design-tokens.md)
