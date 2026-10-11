# Página: Home / Coming Soon

**Ruta:** `/`
**Archivo:** `src/app/page.tsx`
**Tipo:** Client Component (`'use client'`)

## Estado actual

Página de "Coming Soon" temporal mientras el producto no está en producción pública. Muestra el nombre del proyecto en 4 idiomas con animación GSAP de tipo marquee vertical.

## Animaciones (GSAP)

- **Marquee vertical:** cicla entre los 4 mensajes con fade + slide usando `gsap.timeline({ repeat: -1 })`
- **CTA fade-in:** el botón entra con `opacity: 0 → 1` y `y: 20 → 0` después de 1 segundo
- Limpieza correcta con `gsap.context()` + `ctx.revert()` en el cleanup de `useEffect`

## Componentes usados

- `AltArrowLeftLinearIcon` de `@solar-icons/react`
- Clases CSS: `.coming-soon-page`, `.coming-soon-marquee`, `.marquee-item`, `.display-1`, `.btn-white`, `.coming-soon-cta`, `.uppercase`

## Datos

No consume datos del servidor — es estática.

## Pendiente

- [ ] Reemplazar con la Home real (Hero + Categorías + Cómo funciona)
- [ ] Mover la Coming Soon a `/coming-soon` (ya existe la ruta)
