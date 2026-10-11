# Badge

**Archivo:** `src/components/ui/badge.tsx`
**Tipo:** Client-compatible (sin lógica de servidor)

Etiqueta de estado o categoría. Usa variantes semánticas alineadas con los tokens de diseño.

## Props

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `variant` | `'default' \| 'brand' \| 'success' \| 'danger' \| 'warning' \| 'info' \| 'draft'` | `'default'` | Variante semántica |
| `className` | `string` | — | Clases adicionales |
| `...props` | `HTMLAttributes<HTMLSpanElement>` | — | Props nativos de `<span>` |

## Variantes y colores

| Variante | Fondo | Texto | Uso típico |
|---|---|---|---|
| `default` | gray-100 | gray-700 | Estado genérico |
| `brand` | brand-50 | brand-700 | Categoría o etiqueta de marca |
| `success` | success-bg | success | Activo, completado, aprobado |
| `danger` | danger-bg | danger | Vendido, rechazado, error |
| `warning` | warning-bg | warning | Pendiente, en revisión |
| `info` | info-bg | info | Informativo, destacado |
| `draft` | draft-bg | draft | Borrador, inactivo |

## Ejemplos

```tsx
<Badge>Genérico</Badge>
<Badge variant="success">Activo</Badge>
<Badge variant="danger">Vendido</Badge>
<Badge variant="warning">Pendiente</Badge>
<Badge variant="draft">Borrador</Badge>
<Badge variant="brand">Nuevo</Badge>
<Badge variant="info">Destacado</Badge>
```

## Notas

- Renderiza un `<span>` — semánticamente neutro, úsalo dentro de texto o tarjetas.
- No uses más de 2 badges juntos en la misma tarjeta para evitar ruido visual.
