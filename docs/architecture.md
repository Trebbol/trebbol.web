# Arquitectura del Proyecto — Trebbol Web

> **Versión:** 0.2.0 · **Última actualización:** 2026-10-11
> **Estado:** Design system fundacional implementado — Coming Soon activa, Home en construcción

---

## Frontend

### Framework y Core

| Tecnología | Versión | Propósito |
|---|---|---|
| **Next.js** | 16.4.0 | Framework principal (App Router) |
| **React** | 19.3.0 | Librería UI |
| **TypeScript** | 5.x | Tipado estricto (`strict: true`) |

### Styling

| Tecnología | Versión | Propósito |
|---|---|---|
| **Tailwind CSS** | 4.x | Framework de utilidades CSS (CSS-first) |
| **@tailwindcss/postcss** | 4.x | Plugin PostCSS para procesamiento en dev y build |

**Configuración:**
- `postcss.config.mjs` procesa Tailwind v4 en todos los entornos
- Tokens definidos en `src/app/globals.css` bajo `@theme`
- Sin `tailwind.config.ts` — configuración 100% CSS-first

**Design tokens en `globals.css`:**
- Colores de marca: `brand-50` a `brand-950` (teal/cyan `#11A5B0`)
- Grises personalizados: `gray-50` a `gray-900`
- Superficies oscuras: `dark-surface`, `dark-surface-2`, `dark-border`
- Semánticos: `danger`, `success`, `warning`, `info`, `draft`, `rating-gold`
- Border radius: `--radius-card` (16px), `--radius-3xl` (20px), `--radius-4xl` (24px)

**Clases semánticas reutilizables:**

| Clase | Propósito |
|---|---|
| `.btn-primary` | Botón con fondo brand-500 |
| `.btn-white` | Botón blanco (sobre fondos de color) |
| `.display-1` | Tipografía grande — League Spartan, 800, clamp(3rem–8rem) |
| `.uppercase` | Texto en mayúsculas |
| `.coming-soon-*` | Clases específicas de la página Coming Soon |

### Tipografía

| Fuente | Variable CSS | Uso |
|---|---|---|
| **Inter** | `--font-inter` / `--font-sans` | Fuente principal (cuerpo, UI) |
| **League Spartan** | `--font-league-spartan` / `--font-display` | Fuente display (headings grandes) |

Ambas cargadas con `next/font/google` en `src/app/layout.tsx`.

### Iconos

| Librería | Versión | Uso |
|---|---|---|
| **@solar-icons/react** | 2.3.2 | Páginas públicas (Home, Jobs, Marketplace, etc.) |
| **lucide-react** | 1.54.0 | Dashboard administrativo |

### Animaciones

| Tecnología | Versión | Uso |
|---|---|---|
| **GSAP** | 3.15.0 | Animaciones de entrada, marquee, scroll |

- Siempre con `gsap.context()` + `ctx.revert()` para limpieza en React
- Skills instalados en `.agents/skills/gsap-*` (core, frameworks, performance, plugins, react, scrolltrigger, timeline, utils)

### Componentes UI (`src/components/ui/`)

| Componente | Variantes | Doc |
|---|---|---|
| `Button` | primary, secondary, outline, ghost, danger · sm/md/lg | `docs/components/button.md` |
| `Card` + `CardHeader` + `CardTitle` + `CardContent` | default, interactive, flat | `docs/components/card.md` |
| `Badge` | default, brand, success, danger, warning, info, draft | `docs/components/badge.md` |
| `Container` | sm, md, lg, xl, full | `docs/components/container.md` |

### Agent Skills (`.agents/skills/`)

| Skill | Propósito |
|---|---|
| `interface-design` | Diseño de interfaces, jerarquía visual, design systems |
| `vercel-react-best-practices` | Optimización React/Next.js |
| `gsap-core/react/timeline/scrolltrigger/plugins/performance/frameworks/utils` | Guías oficiales GSAP |

### Estructura de Carpetas

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Inter + League Spartan, metadata)
│   ├── page.tsx                # Home → Coming Soon (Client Component, GSAP)
│   ├── globals.css             # @theme tokens + clases semánticas
│   ├── coming-soon/            # Página coming soon alternativa
│   ├── (auth)/
│   │   └── login/              # Página de login
│   └── (dashboard)/            # Dashboard protegido
│       ├── overview/
│       ├── users/[id]/
│       ├── jobs/
│       ├── products/
│       ├── ads/
│       ├── orders/
│       ├── conversations/
│       └── reviews/
├── components/
│   ├── ui/                     # Button, Card, Badge, Container
│   ├── layout/
│   │   ├── app-sidebar.tsx     # Sidebar de navegación del dashboard
│   │   └── nav-items.ts        # Configuración de menú
│   └── features/               # Componentes por sección (home, jobs, marketplace...)
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Browser client (anon key)
│   │   ├── server.ts           # Server client (SSR + cookies)
│   │   └── admin.ts            # Admin client (service role, server-only)
│   └── auth/
│       ├── require-user.ts     # Helper: obtiene usuario o redirige a /login
│       └── permissions.ts      # isAdmin(), hasProfileType()
├── server/
│   ├── dal/
│   │   ├── users.ts            # getMyProfile(), getUserProfileById()
│   │   ├── jobs.ts             # getJobs(), getJobById()
│   │   └── products.ts         # getProducts(), getProductById()
│   └── schemas/
│       ├── jobs.ts             # createJobSchema, updateJobSchema (Zod)
│       ├── jobs.test.ts        # Tests Vitest
│       ├── products.ts         # createProductSchema, updateProductSchema (Zod)
│       └── products.test.ts    # Tests Vitest
├── types/
│   └── database.ts             # Tipos auto-generados de Supabase
└── middleware.ts               # Middleware de autenticación
```

### Routing

- **App Router** con route groups:
  - `/(auth)` — páginas de autenticación
  - `/(dashboard)` — dashboard protegido
- **Rutas públicas:** `/`, `/coming-soon`
- **Rutas protegidas:** `/dashboard/*` → redirige a `/login` si no autenticado

---

## Backend

### BaaS (Backend as a Service)

| Tecnología | Versión | Propósito |
|---|---|---|
| **Supabase** | CLI 2.120.0 | Plataforma backend completa |
| **@supabase/supabase-js** | 2.117.3 | Cliente JavaScript |
| **@supabase/ssr** | 0.12.7 | Soporte SSR (cookies, sesiones) |
| **server-only** | 0.0.1 | Protege módulos server del bundle del cliente |
| **Zod** | 4.6.5 | Validación de entradas en Server Actions |

> No hay API routes custom de Next.js — todo el acceso a datos es vía Supabase.

### Base de Datos (PostgreSQL vía Supabase)

23 tablas principales:

| Tabla | Descripción |
|---|---|
| `user_profiles` | Perfiles de usuario con `user_role` y `system_role` |
| `freelancer_profiles` | Perfiles de freelancer |
| `company_profiles` | Perfiles de empresa |
| `user_profile_types` | Tipos de perfil por usuario |
| `jobs` | Listados de trabajo |
| `job_applications` | Solicitudes de empleo |
| `products` | Productos del marketplace |
| `ads` | Anuncios |
| `orders` | Pedidos |
| `conversations` + `conversation_participants` | Mensajería |
| `messages` | Mensajes individuales |
| `reviews` | Reseñas |
| `notifications` | Notificaciones |
| `service_requests` + `service_proposals` | Solicitudes de servicio |
| `service_categories` | Categorías de servicios |
| `profile_services` | Servicios por perfil |
| `skills_catalog` | Catálogo de habilidades |
| `vacation_periods` | Periodos de vacaciones |
| `work_experiences` | Experiencia laboral |

**Enums:** `user_role` · `system_role` · `profile_type`

**Funciones PostgreSQL:**
- `is_admin()` → boolean
- `has_profile_type(p_type)` → boolean
- `get_my_conversations()` → tabla
- `get_or_create_conversation(other_user_id)` → string
- `get_my_unread_count()` → number
- `add_to_quotation_room(p_freelancer_id, p_request_id)` → string

### Autenticación

- **Supabase Auth** con SSR, sesiones basadas en cookies
- `src/middleware.ts` protege rutas `/dashboard/*`
- `requireUser()` en Server Components → redirige a `/login` si no hay sesión
- `isAdmin()` / `hasProfileType()` para control de permisos granular

### Clientes Supabase

| Cliente | Archivo | Key | Uso |
|---|---|---|---|
| **Browser** | `src/lib/supabase/client.ts` | Anon key | Queries desde el cliente |
| **Server** | `src/lib/supabase/server.ts` | Anon key | SSR, manejo de cookies |
| **Admin** | `src/lib/supabase/admin.ts` | Service role key | Operaciones privilegiadas (server-only) |

### Capa de Acceso a Datos (DAL)

Módulos en `src/server/dal/` con `import 'server-only'`. Documentados en `docs/server/dal.md`.

### Validación (Zod)

Schemas en `src/server/schemas/`. Documentados en `docs/server/schemas.md`.
Tests en `*.test.ts` con `// @vitest-environment node`.

### Variables de Entorno

| Variable | Tipo | Uso |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Pública | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Pública | Key anónima |
| `SUPABASE_SERVICE_ROLE_KEY` | Privada | Key admin (solo servidor) |

---

## DevOps y Tooling

### Testing

| Tecnología | Versión | Propósito |
|---|---|---|
| **Vitest** | 5.0.3 | Framework de tests |
| **@testing-library/react** | 16.3.3 | Testing de componentes React |
| **@testing-library/jest-dom** | 7.0.1 | Matchers DOM |
| **@testing-library/user-event** | 14.6.7 | Simulación de interacciones |
| **jsdom** | 30.1.2 | Entorno DOM (usa `// @vitest-environment node` para tests sin DOM) |

### Linting y Tipado

| Tecnología | Versión | Propósito |
|---|---|---|
| **ESLint** | 9.x | Linter (FlatConfig) |
| **eslint-config-next** | 16.4.0 | Preset core-web-vitals + TypeScript |
| **TypeScript** | 5.x | Chequeo de tipos (`tsc --noEmit`) |

### CI/CD

**GitHub Actions** (`.github/workflows/ci.yml`):

```
Trigger: push/PR a main y staging
Node: 20.x · pnpm: 10.20.0

Pipeline:
  1. Checkout
  2. Setup pnpm 10.20.0 + Node 20 + cache
  3. Install (--frozen-lockfile)
  4. Type check
  5. Lint
  6. Test
  7. Build (con secrets de Supabase)
```

**Protección de ramas:**
- `main` — requiere PR + CI "Type check, lint, test & build" en verde
- `staging` — merge directo permitido, CI ejecuta en push

### Flujo Git

```
feature/* ──→ staging (merge directo)
                  │
                  └──→ main (PR obligatorio + CI)
```

1. `git checkout -b feature/nombre` desde `staging`
2. Desarrollo + commits
3. `git push origin feature/nombre`
4. Merge directo a `staging`
5. PR de `staging` → `main` desde GitHub
6. CI pasa → merge → deploy automático a producción

### Despliegue

| Plataforma | Rama | URL |
|---|---|---|
| **Vercel** (producción) | `main` | `www.trebbol.com` |
| **Vercel** (preview) | cualquier rama | URL automática de Vercel |

### Scripts Disponibles

```bash
pnpm dev          # Servidor de desarrollo (Turbopack)
pnpm build        # Build de producción
pnpm start        # Servidor de producción
pnpm lint         # ESLint
pnpm type-check   # TypeScript sin emit
pnpm test         # Tests (una vez)
pnpm test:watch   # Tests en modo watch
```

---

## Documentación

```
docs/
├── architecture.md       # Este archivo
├── design-tokens.md      # Tokens de diseño (colores, tipografía)
├── components/
│   ├── button.md
│   ├── card.md
│   ├── badge.md
│   └── container.md
├── server/
│   ├── auth.md           # requireUser, isAdmin, hasProfileType
│   ├── dal.md            # getJobs, getProducts, getUserProfile...
│   └── schemas.md        # Zod schemas y tipos
└── pages/
    └── home.md
```

---

## Diagrama de Arquitectura

```
┌────────────────────────────────────────────────────┐
│                      Vercel                         │
│                  (Hosting + CDN)                    │
├────────────────────────────────────────────────────┤
│              Next.js 16 (App Router)                │
│                                                     │
│  ┌──────────────────┐    ┌───────────────────────┐  │
│  │  Páginas Públicas │    │  Middleware (Auth)     │  │
│  │  React 19        │    │  Protección de rutas   │  │
│  │  Tailwind v4     │    └──────────┬────────────┘  │
│  │  GSAP + Solar    │               │               │
│  └────────┬─────────┘               │               │
│           │                         │               │
│  ┌──────────────────┐    ┌──────────▼────────────┐  │
│  │  Dashboard Admin  │    │  Auth Helpers         │  │
│  │  lucide-react    │    │  requireUser()        │  │
│  └────────┬─────────┘    │  isAdmin()            │  │
│           │              └──────────┬────────────┘  │
│           │                         │               │
│  ┌────────▼─────────────────────────▼────────────┐  │
│  │              DAL + Schemas (Zod)               │  │
│  │         src/server/dal/ + src/server/schemas/  │  │
│  └────────────────────┬───────────────────────────┘  │
│                       │                              │
│  ┌────────────────────▼───────────────────────────┐  │
│  │           Supabase Clients                      │  │
│  │      Browser · Server · Admin (server-only)    │  │
│  └────────────────────┬───────────────────────────┘  │
└───────────────────────┼────────────────────────────┘
                        │
                        ▼
┌────────────────────────────────────────────────────┐
│                   Supabase                          │
│  ┌───────────┐  ┌──────┐  ┌──────────────────────┐ │
│  │ PostgreSQL │  │ Auth │  │  Storage (futuro)     │ │
│  │ 23 tablas  │  │ SSR  │  │                      │ │
│  │ RLS + RPCs │  │      │  │                      │ │
│  └───────────┘  └──────┘  └──────────────────────┘ │
└────────────────────────────────────────────────────┘
```

**Tipo de arquitectura:** Monolito Next.js con Supabase como backend
**Madurez:** Design system fundacional implementado, páginas públicas en construcción
**Storybook:** Pendiente — se evaluará cuando haya 10+ componentes
