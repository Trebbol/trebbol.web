# Button

**Archivo:** `src/components/ui/button.tsx`
**Tipo:** Client-compatible (sin lógica de servidor)

Botón reutilizable para acciones del dashboard y páginas públicas.

## Props

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | Estilo visual |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño |
| `loading` | `boolean` | `false` | Muestra spinner y deshabilita el botón |
| `disabled` | `boolean` | — | Deshabilita el botón |
| `className` | `string` | — | Clases adicionales |
| `...props` | `ButtonHTMLAttributes` | — | Props nativos de `<button>` |

## Variantes

| Variante | Uso |
|---|---|
| `primary` | Acción principal (brand-500) |
| `secondary` | Acción secundaria (brand-50) |
| `outline` | Acción terciaria con borde |
| `ghost` | Acción sin fondo |
| `danger` | Acciones destructivas |

## Tamaños

| Tamaño | Alto | Padding | Texto |
|---|---|---|---|
| `sm` | 32px | px-3 | xs |
| `md` | 40px | px-5 | sm |
| `lg` | 48px | px-7 | base |

## Ejemplos

```tsx
// Acción principal
<Button>Guardar cambios</Button>

// Acción destructiva con carga
<Button variant="danger" loading={isPending}>
  Eliminar cuenta
</Button>

// Pequeño con icono
<Button variant="secondary" size="sm">
  <PlusIcon size={14} aria-hidden="true" />
  Añadir
</Button>

// Deshabilitado
<Button disabled>No disponible</Button>
```

## Notas

- Para botones que actúan como enlaces, usa la clase CSS `.btn-primary` o `.btn-white` directamente en un `<a>`.
- El foco es visible con `focus-visible:ring` para accesibilidad por teclado.
