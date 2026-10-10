# Design Tokens — Trebbol Web

> Referencia visual para el dashboard. Extraído del sistema de diseño de la app Flutter.

---

## Fuente

| Propiedad | Valor |
|---|---|
| Familia | **Inter** (Google Fonts) |
| Instalación web | `next/font/google` → `Inter` |
| Fallback | `sans-serif` |

---

## Paleta de colores

### Brand (Primary)

| Token | Hex | Uso |
|---|---|---|
| `primary-50` | `#E8F8F9` | Fondo tint suave |
| `primary-100` | `#BFEDF0` | — |
| `primary-200` | `#90DFE6` | — |
| `primary-300` | `#5DD1DB` | Cursor / selection |
| `primary-400` | `#2FC5D1` | — |
| `primary-500` | `#11A5B0` | **Brand base — color principal** |
| `primary-600` | `#0E8F99` | Hover / action default |
| `primary-700` | `#0B7580` | — |
| `primary-800` | `#085C66` | — |
| `primary-900` | `#054149` | — |
| `primary-950` | `#022A30` | — |

### Grises

| Token | Hex | Uso |
|---|---|---|
| `gray-50` | `#F8F9FB` | Input fill / app bg / card bg (light) |
| `gray-100` | `#F1F2F5` | — |
| `gray-200` | `#E6E8EC` | Border light |
| `gray-300` | `#CFD2D9` | Dark contrast light |
| `gray-400` | `#A6A6A6` | Paragraph dark / text muted dark |
| `gray-500` | `#757575` | — |
| `gray-600` | `#414858` | Paragraph light / text muted light |
| `gray-700` | `#2F3542` | — |
| `gray-800` | `#1E2230` | — |
| `gray-900` | `#0E1018` | — |

### Superficies oscuras (Dark mode)

| Token | Hex | Uso |
|---|---|---|
| `dark-surface` | `#161418` | Fondo principal dark |
| `dark-surface-2` | `#28282A` | Cards / input fill dark |
| `dark-border` | `#2A2A2A` | Border dark |
| `neutral-900` | `#1E1E1E` | — |
| `neutral-800` | `#2B2B2B` | — |

### Semánticos (fijos en ambos temas)

| Token | Hex | Uso |
|---|---|---|
| `danger` | `#D52832` | Error / destructivo |
| `danger-bg` | `#FFF0F1` | Fondo badge error |
| `success` | `#119055` | Éxito |
| `success-bg` | `#ECFDF4` | Fondo badge éxito |
| `warning` | `#F27E31` | Advertencia |
| `warning-bg` | `#FCECD8` | Fondo badge warning |
| `info` | `#195DEF` | Informativo |
| `info-bg` | `#EDF7FD` | Fondo badge info |
| `draft` | `#414858` | Badge draft |
| `draft-bg` | `#F2F4F7` | Fondo badge draft |
| `rating-gold` | `#FFC107` | Estrellas de rating |

---

## Border Radius

| Token | Valor |
|---|---|
| `md` | `6px` |
| `lg` | `8px` |
| `xl` | `12px` |
| `3xl` | `20px` |
| `4xl` | `24px` |
| `card` | `16px` |

---

## Configuración Tailwind (`tailwind.config.ts`)

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  // ...
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'var(--font-inter)', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#E8F8F9',
          100: '#BFEDF0',
          200: '#90DFE6',
          300: '#5DD1DB',
          400: '#2FC5D1',
          500: '#11A5B0', // primary
          600: '#0E8F99',
          700: '#0B7580',
          800: '#085C66',
          900: '#054149',
          950: '#022A30',
        },
        danger:  '#D52832',
        success: '#119055',
        warning: '#F27E31',
        info:    '#195DEF',
      },
      borderRadius: {
        md:  '6px',
        lg:  '8px',
        xl:  '12px',
        '3xl': '20px',
        '4xl': '24px',
        card:  '16px',
      },
    },
  },
}
export default config
```

---

## CSS Variables para shadcn (`globals.css`)

Reemplazar los colores por defecto de shadcn con los de Trebbol:

```css
@layer base {
  :root {
    /* brand primary → hsl equivalente de #11A5B0 */
    --primary: 185 82% 37%;
    --primary-foreground: 0 0% 100%;

    --background: 0 0% 100%;
    --foreground: 0 0% 0%;

    --muted: 220 14% 96%;          /* gray-50 #F8F9FB */
    --muted-foreground: 225 14% 31%; /* gray-600 #414858 */

    --border: 220 14% 91%;          /* gray-200 #E6E8EC */
    --input:  220 14% 96%;          /* gray-50  #F8F9FB */

    --destructive: 357 70% 50%;    /* danger #D52832 */
    --destructive-foreground: 0 0% 100%;
  }

  .dark {
    --primary: 185 82% 37%;
    --primary-foreground: 0 0% 100%;

    --background: 290 6% 9%;       /* dark-surface #161418 */
    --foreground: 0 0% 100%;

    --muted: 240 2% 16%;           /* dark-surface-2 #28282A */
    --muted-foreground: 0 0% 65%;  /* gray-400 #A6A6A6 */

    --border: 240 2% 17%;          /* dark-border #2A2A2A */
    --input:  240 2% 16%;          /* dark-surface-2 */
  }
}
```

> **Nota:** Al hacer `shadcn init`, elegir **Custom** en base color y luego sobrescribir `globals.css` con estos valores.
