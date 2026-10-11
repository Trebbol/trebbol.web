# Card

**Archivo:** `src/components/ui/card.tsx`
**Tipo:** Client-compatible (sin lógica de servidor)

Contenedor visual tipo tarjeta. Composable con `CardHeader`, `CardTitle` y `CardContent`.

## Componentes exportados

- `Card` — contenedor principal
- `CardHeader` — cabecera con espaciado inferior
- `CardTitle` — título semántico (`<h3>`)
- `CardContent` — cuerpo de texto secundario

## Props de `Card`

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `variant` | `'default' \| 'interactive' \| 'flat'` | `'default'` | Estilo visual |
| `className` | `string` | — | Clases adicionales |
| `...props` | `HTMLAttributes<HTMLDivElement>` | — | Props nativos de `<div>` |

## Variantes

| Variante | Uso |
|---|---|
| `default` | Tarjeta estática con borde y sombra leve |
| `interactive` | Con hover lift — para tarjetas clicables |
| `flat` | Sin sombra, fondo gris-50 — para fondos claros |

## Ejemplos

```tsx
// Tarjeta completa
<Card>
  <CardHeader>
    <CardTitle>Oferta de trabajo</CardTitle>
  </CardHeader>
  <CardContent>
    Descripción del puesto y condiciones.
  </CardContent>
</Card>

// Tarjeta interactiva
<Card variant="interactive" onClick={handleClick}>
  <CardTitle>Ver producto</CardTitle>
</Card>

// Tarjeta plana con badge
<Card variant="flat">
  <Badge variant="success">Activo</Badge>
  <CardContent>Contenido en sección gris</CardContent>
</Card>
```

## Notas

- Usa `rounded-card` (16px) como radio de borde.
- `interactive` incluye `cursor-pointer` y `transition` — no añadas eventos sin este variant.
- `CardTitle` renderiza `<h3>`. Ajusta la jerarquía semántica según el contexto de la página.
