# Trebbol Web

Ecosistema digital local que conecta **Vecinos, Freelancers y Empresas** en una sola plataforma — marketplace de productos, servicios profesionales, bolsa de empleo, publicidad, reputación y mensajería en tiempo real.

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16.4 · React 19 · TypeScript strict |
| Estilos | Tailwind CSS v4 (CSS-first `@theme`) |
| Tipografía | Inter (body) · League Spartan (display) |
| Iconos | @solar-icons/react (público) · lucide-react (dashboard) |
| Animaciones | GSAP 3.15 |
| Backend | Supabase (PostgreSQL · Auth SSR · RLS) |
| Validación | Zod |
| Testing | Vitest · React Testing Library |
| CI/CD | GitHub Actions · Vercel |
| Package manager | pnpm 10.20 |

---

## Inicio rápido

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

### Variables de entorno

Crea `.env.local` con:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

### Scripts

```bash
pnpm dev          # Servidor de desarrollo
pnpm build        # Build de producción
pnpm type-check   # TypeScript
pnpm lint         # ESLint
pnpm test         # Tests
```

---

## Flujo Git

```
feature/* ──→ staging (merge directo)
                 └──→ main (PR + CI obligatorio)
```

`main` tiene branch protection — nunca pushear directo, siempre por PR.

---

## Documentación

| Archivo | Contenido |
|---|---|
| [`docs/objetivo.md`](docs/objetivo.md) | Visión del producto, módulos y modelo de negocio |
| [`docs/architecture.md`](docs/architecture.md) | Arquitectura técnica completa (frontend, backend, DevOps) |
| [`docs/design-tokens.md`](docs/design-tokens.md) | Tokens de diseño (colores, tipografía, radios) |
| [`docs/components/button.md`](docs/components/button.md) | Componente Button — variantes, props, ejemplos |
| [`docs/components/card.md`](docs/components/card.md) | Componente Card — variantes, composición |
| [`docs/components/badge.md`](docs/components/badge.md) | Componente Badge — variantes semánticas |
| [`docs/components/container.md`](docs/components/container.md) | Componente Container — tamaños, uso |
| [`docs/server/auth.md`](docs/server/auth.md) | requireUser, isAdmin, hasProfileType |
| [`docs/server/dal.md`](docs/server/dal.md) | Data Access Layer — funciones de acceso a datos |
| [`docs/server/schemas.md`](docs/server/schemas.md) | Schemas Zod — validación de entradas |
| [`docs/pages/home.md`](docs/pages/home.md) | Página Home / Coming Soon |
