# Arquitectura del Proyecto — Trebbol Web

> **Versión:** 0.1.1 · **Última actualización:** 2026-10-10
> **Estado:** Fase temprana — esqueleto de dashboard con página Coming Soon activa

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
| **Tailwind CSS** | 4.x | Framework de utilidades CSS |
| **@tailwindcss/turbopack** | 4.x | Integración CSS con Turbopack |

- Usa directivas `@theme` de Tailwind v4
- Design tokens definidos en `globals.css`: colores de marca (11 tonos teal/cyan), colores semánticos (danger, success, warning, info), border-radius personalizados
- Fuente: **Inter** vía `next/font/google`

### Animaciones

| Tecnología | Versión | Propósito |
|---|---|---|
| **GSAP** | 3.15.0 | Animaciones de marquee en Coming Soon |

### Iconos

| Tecnología | Versión | Propósito |
|---|---|---|
| **lucide-react** | 1.54.0 | Iconos SVG para navegación del dashboard |

### Estructura de Carpetas

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Layout raíz (fuente Inter, metadata)
│   ├── page.tsx                # Home → Coming Soon
│   ├── globals.css             # Estilos globales + @theme tokens
│   ├── coming-soon/            # Página de marquee multilenguaje
│   ├── (auth)/
│   │   └── login/              # Página de login
│   └── (dashboard)/            # Dashboard protegido
│       ├── overview/
│       ├── users/
│       ├── jobs/
│       ├── products/
│       ├── ads/
│       ├── orders/
│       ├── conversations/
│       └── reviews/
├── components/
│   ├── layout/
│   │   ├── app-sidebar.tsx     # Sidebar de navegación
│   │   └── nav-items.ts        # Configuración de menú
│   └── features/               # Componentes por feature
│       ├── ads/
│       ├── jobs/
│       ├── overview/
│       ├── products/
│       ├── shared/
│       └── users/
├── types/
│   └── database.ts             # Tipos auto-generados de Supabase
└── middleware.ts                # Middleware de autenticación
```

### Routing

- **App Router** con route groups:
  - `/(auth)` — páginas de autenticación
  - `/(dashboard)` — páginas protegidas del admin
- **Rutas públicas:** `/`, `/coming-soon`
- **Rutas protegidas:** `/dashboard/*` (redirige a `/login` si no autenticado)

### Estado actual

- Página Coming Soon con animaciones GSAP multilenguaje (EN, ES, FR, NL)
- Dashboard con sidebar de 8 secciones, todas placeholder
- Sin estado global (no Redux, no Zustand, no Context API)

---

## Backend

### BaaS (Backend as a Service)

| Tecnología | Versión | Propósito |
|---|---|---|
| **Supabase** | CLI 2.120.0 | Plataforma backend completa |
| **@supabase/supabase-js** | 2.117.3 | Cliente JavaScript |
| **@supabase/ssr** | 0.12.7 | Soporte SSR (cookies, sesiones) |

> No hay API routes custom de Next.js — todo el acceso a datos es vía Supabase.

### Base de Datos (PostgreSQL vía Supabase)

23 tablas principales:

| Tabla | Registros | Descripción |
|---|---|---|
| `user_profiles` | 8 | Perfiles de usuario |
| `freelancer_profiles` | 2 | Perfiles de freelancer |
| `company_profiles` | 4 | Perfiles de empresa |
| `jobs` | 4 | Listados de trabajo |
| `products` | 4 | Productos |
| `ads` | 5 | Anuncios |
| `conversations` | 11 | Conversaciones |
| `orders` | — | Pedidos |
| `job_applications` | — | Solicitudes de empleo |
| `reviews` | — | Reseñas |
| `messages` | — | Mensajes |
| `notifications` | — | Notificaciones |
| `service_requests` | — | Solicitudes de servicio |
| `favorites` | — | Favoritos |

**Enums:** `user_role`, `system_role`, `profile_type`

### Autenticación

- **Supabase Auth** con SSR
- Middleware en `src/middleware.ts` controla acceso por rutas
- Sesiones basadas en cookies
- Flujo: usuario no autenticado → `/login` · usuario autenticado en `/login` → `/dashboard`

### Clientes Supabase

| Cliente | Archivo | Key usada | Uso |
|---|---|---|---|
| **Browser** | `src/lib/supabase/client.ts` | Anon key | Queries desde el cliente |
| **Server** | `src/lib/supabase/server.ts` | Anon key | SSR, manejo de cookies |
| **Admin** | `src/lib/supabase/admin.ts` | Service role key | Operaciones privilegiadas (solo servidor) |

### Variables de Entorno

| Variable | Tipo | Uso |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Pública | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Pública | Key anónima |
| `SUPABASE_SERVICE_ROLE_KEY` | Privada | Key admin (solo servidor) |
| `VERCEL_OIDC_TOKEN` | Privada | Token de despliegue Vercel |

---

## DevOps y Tooling

### Testing

| Tecnología | Versión | Propósito |
|---|---|---|
| **Vitest** | 5.0.3 | Framework de tests |
| **@testing-library/react** | 16.3.3 | Testing de componentes React |
| **@testing-library/jest-dom** | 7.0.1 | Matchers DOM |
| **@testing-library/user-event** | 14.6.7 | Simulación de interacciones |
| **jsdom** | 30.1.2 | Entorno DOM para tests |
| **@vitejs/plugin-react** | 6.1.2 | Plugin React para Vitest |

### Linting y Tipado

| Tecnología | Versión | Propósito |
|---|---|---|
| **ESLint** | 9.x | Linter (FlatConfig) |
| **eslint-config-next** | 16.4.0 | Preset core-web-vitals + TypeScript |
| **TypeScript** | 5.x | Chequeo de tipos (`tsc --noEmit`) |

### CI/CD

**GitHub Actions** (`.github/workflows/ci.yml`):

```
Trigger: push a main + PRs a main
Node: 20.x · pnpm: v9

Pipeline:
  1. Checkout
  2. Setup pnpm + Node + cache
  3. Install (--frozen-lockfile)
  4. Type check (pnpm type-check)
  5. Lint (pnpm lint)
  6. Test (pnpm test)
```

### Despliegue

| Plataforma | Configuración |
|---|---|
| **Vercel** | `vercel.json` con framework `nextjs`, install `pnpm install --frozen-lockfile` |

### Package Manager

| Herramienta | Versión |
|---|---|
| **pnpm** | 10.20.0 (locked) |

### Scripts Disponibles

```bash
pnpm dev          # Servidor de desarrollo
pnpm build        # Build de producción
pnpm start        # Servidor de producción
pnpm lint         # ESLint
pnpm type-check   # TypeScript sin emit
pnpm test         # Tests (una vez)
pnpm test:watch   # Tests en modo watch
```

---

## Resumen de Arquitectura

```
┌─────────────────────────────────────────────┐
│                   Vercel                     │
│              (Hosting + CDN)                 │
├─────────────────────────────────────────────┤
│            Next.js 16 (App Router)           │
│  ┌─────────────┐    ┌────────────────────┐  │
│  │  Frontend    │    │  Middleware (Auth)  │  │
│  │  React 19    │    │  Route protection   │  │
│  │  Tailwind 4  │    └────────┬───────────┘  │
│  │  GSAP        │             │              │
│  └──────┬───────┘             │              │
│         │                     │              │
│         ▼                     ▼              │
│  ┌──────────────────────────────────────┐   │
│  │        Supabase Clients              │   │
│  │   Browser · Server · Admin           │   │
│  └──────────────┬───────────────────────┘   │
└─────────────────┼───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│              Supabase                        │
│  ┌──────────┐  ┌──────┐  ┌──────────────┐  │
│  │ PostgreSQL│  │ Auth │  │  Storage     │  │
│  │ 23 tablas │  │ SSR  │  │  (futuro)    │  │
│  └──────────┘  └──────┘  └──────────────┘  │
└─────────────────────────────────────────────┘
```

**Tipo de arquitectura:** Monolito Next.js con Supabase como backend
**Madurez:** Esqueleto funcional en fase temprana
**Preparación:** Estructura de componentes y abstracciones lista para escalar
