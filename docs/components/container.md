# Container

**Archivo:** `src/components/ui/container.tsx`
**Tipo:** Client-compatible (sin lógica de servidor)

Contenedor centrado con padding horizontal responsivo. Úsalo para envolver el contenido principal de secciones y páginas.

## Props

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'xl'` | Ancho máximo |
| `className` | `string` | — | Clases adicionales |
| `...props` | `HTMLAttributes<HTMLDivElement>` | — | Props nativos de `<div>` |

## Tamaños

| Size | max-width | Uso típico |
|---|---|---|
| `sm` | 672px | Texto largo, formularios, artículos |
| `md` | 896px | Contenido con sidebar o dos columnas |
| `lg` | 1024px | Grids de 3 columnas |
| `xl` | 1280px | Layout principal de página (default) |
| `full` | sin límite | Secciones full-width con fondo |

## Padding responsivo

Siempre aplica: `px-4` (móvil) → `px-6` (tablet) → `px-8` (desktop).

## Ejemplos

```tsx
// Sección estándar
<section>
  <Container>
    <h2>Categorías</h2>
    <div className="grid grid-cols-4 gap-4">...</div>
  </Container>
</section>

// Texto de blog o descripción
<Container size="sm">
  <p>Descripción larga del servicio...</p>
</Container>

// Full-width con fondo, contenido centrado
<section className="bg-brand-500">
  <Container>
    <h1>Hero title</h1>
  </Container>
</section>
```

## Notas

- El fondo o color de sección va en el `<section>` padre, nunca en el `Container`.
- Nunca anides dos `Container` — solo úsalo una vez por sección.
