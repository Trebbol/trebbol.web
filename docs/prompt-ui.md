# PROMPT MAESTRO — Trebbol Web Frontend Design System

## 1. Rol y objetivo

Actúa como un Senior Frontend Engineer y UI Engineer especializado en Next.js, React, TypeScript, Tailwind CSS, diseño de sistemas visuales, animaciones web y arquitectura de componentes reutilizables.

Trabaja directamente sobre el repositorio existente de **Trebbol Web**. Tu objetivo es auditar, diseñar e implementar una arquitectura frontend mantenible, consistente, accesible y eficiente, respetando el código y las funcionalidades existentes.

No quiero únicamente recomendaciones, ejemplos aislados ni una propuesta teórica. Debes inspeccionar el proyecto, tomar decisiones técnicas justificadas, implementar los cambios necesarios y ejecutar las comprobaciones disponibles.

## 2. Contexto del proyecto

La arquitectura documentada de Trebbol Web es:

- Next.js 16.4.0 con App Router.
- React 19.3.0.
- TypeScript 5.x con `strict: true`.
- Tailwind CSS 4.x.
- Supabase para autenticación y acceso a datos.
- GSAP para animaciones.
- lucide-react para iconos.
- Inter como fuente principal mediante `next/font/google`.
- Vitest, React Testing Library y ESLint.
- pnpm como gestor de paquetes.
- Vercel para despliegue.
- GitHub Actions para CI.

Estos datos provienen de la documentación del proyecto. **Verifica las versiones y la configuración reales antes de modificar cualquier archivo.**

### Estado actual de shadcn/ui

shadcn/ui **no está instalado actualmente** en el proyecto. Si se decide incorporarlo para el dashboard administrativo, debe instalarse como parte de esta tarea siguiendo la documentación oficial. No asumas que ya existe.

### Separación de interfaces

El proyecto debe conservar dos sistemas de interfaz:

**A. Dashboard administrativo**

Si se instala shadcn/ui, utilizarlo para las páginas dentro de `src/app/(dashboard)/` y los componentes administrativos relacionados.

Adaptar sus variables de tema para que respeten la identidad visual de Trebbol.

**B. Páginas públicas**

Las páginas públicas son:

- Home.
- Jobs.
- Marketplace.
- Freelancer.
- Local.

Estas páginas deben utilizar Tailwind CSS 4 y componentes visuales propios de Trebbol.

No utilizar shadcn/ui como sistema principal de componentes de estas páginas públicas. Se permite compartir infraestructura, tokens y utilidades cuando tenga sentido, pero no acoplar innecesariamente el diseño público al dashboard.

## 3. Buenas prácticas a aplicar

Aplica buenas prácticas de:

- **Diseño de interfaces:** jerarquía visual, consistencia, espaciado, composición y accesibilidad.
- **React y Next.js:** Server Components por defecto, Client Components solo cuando se necesiten estado/eventos/APIs del navegador, rendimiento, carga de datos eficiente.
- **Animaciones GSAP:** timelines, ScrollTrigger, limpieza de recursos, buenas prácticas en React.
- **Microinteracciones:** transiciones CSS nativas para hover, press, estados activos y feedback visual. No se requiere ninguna librería adicional de transiciones.

## 4. Estrategia de estilos: Tailwind CSS 4

Mi principal requisito es evitar que el JSX termine lleno de largas cadenas de clases Tailwind.

Quiero un sistema que mantenga la potencia de Tailwind CSS 4, pero que permita escribir componentes limpios, semánticos y fáciles de mantener.

### Enfoque requerido

Implementa una combinación de:

1. Design tokens definidos en CSS.
2. Configuración CSS-first compatible con Tailwind CSS 4.
3. Clases semánticas reutilizables para patrones visuales estables.
4. Componentes React reutilizables y tipados.
5. Variantes explícitas para los componentes que las necesiten.
6. CSS organizado por responsabilidades.
7. Utilidades Tailwind directas cuando sean apropiadas.

### Ejemplo del resultado esperado

Evita patrones repetitivos como:

```tsx
<article className="group flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
  ...
</article>
```

Prefiere una API como:

```tsx
<Card variant="interactive">
  ...
</Card>
```

O, cuando tenga sentido utilizar una clase semántica:

```tsx
<article className="tb-card tb-card--interactive">
  ...
</article>
```

Estos ejemplos ilustran la dirección deseada. Decide si cada patrón debe resolverse con un componente, una clase semántica o utilidades directas, según su complejidad y reutilización real.

No crees abstracciones innecesarias para cada `div`. Tampoco conviertas toda la aplicación en una colección de componentes genéricos sin significado funcional.

### Reglas de implementación

- Utiliza `@theme` para los tokens compatibles con Tailwind CSS 4.
- Evita depender de la configuración heredada de Tailwind 3.
- Mantén las clases semánticas en archivos CSS organizados y fáciles de localizar.
- Utiliza `@apply` cuando mejore la reutilización de patrones estables, no como una obligación para todas las clases.
- Evita selectores globales excesivamente amplios.
- Evita duplicar estilos entre páginas.
- Mantén las variantes de componentes tipadas y explícitas.
- Utiliza composición de componentes antes de crear APIs excesivamente complejas.
- Si se instala shadcn/ui, conserva la compatibilidad con sus componentes.

## 5. Design tokens oficiales de Trebbol

Utiliza los siguientes valores como fuente de verdad visual. Si ya existen implementaciones equivalentes en el repositorio, audítalas antes de sustituirlas.

### Tipografía

- Familia: Inter.
- Carga mediante `next/font/google`, salvo que el proyecto ya tenga una solución equivalente válida.
- Fallback: `sans-serif`.

### Colores de marca

| Token | Valor |
|---|---|
| `brand-50` | `#E8F8F9` |
| `brand-100` | `#BFEDF0` |
| `brand-200` | `#90DFE6` |
| `brand-300` | `#5DD1DB` |
| `brand-400` | `#2FC5D1` |
| `brand-500` | `#11A5B0` |
| `brand-600` | `#0E8F99` |
| `brand-700` | `#0B7580` |
| `brand-800` | `#085C66` |
| `brand-900` | `#054149` |
| `brand-950` | `#022A30` |

### Grises

| Token | Valor |
|---|---|
| `gray-50` | `#F8F9FB` |
| `gray-100` | `#F1F2F5` |
| `gray-200` | `#E6E8EC` |
| `gray-300` | `#CFD2D9` |
| `gray-400` | `#A6A6A6` |
| `gray-500` | `#757575` |
| `gray-600` | `#414858` |
| `gray-700` | `#2F3542` |
| `gray-800` | `#1E2230` |
| `gray-900` | `#0E1018` |

### Superficies oscuras

- `dark-surface`: `#161418`.
- `dark-surface-2`: `#28282A`.
- `dark-border`: `#2A2A2A`.
- `neutral-900`: `#1E1E1E`.
- `neutral-800`: `#2B2B2B`.

### Colores semánticos

- `danger`: `#D52832`.
- `danger-bg`: `#FFF0F1`.
- `success`: `#119055`.
- `success-bg`: `#ECFDF4`.
- `warning`: `#F27E31`.
- `warning-bg`: `#FCECD8`.
- `info`: `#195DEF`.
- `info-bg`: `#EDF7FD`.
- `draft`: `#414858`.
- `draft-bg`: `#F2F4F7`.
- `rating-gold`: `#FFC107`.

### Radios

- `md`: `6px`.
- `lg`: `8px`.
- `xl`: `12px`.
- `card`: `16px`.
- `3xl`: `20px`.
- `4xl`: `24px`.

### Implementación de tokens

Organiza los tokens para que:

- Las páginas públicas puedan utilizar clases como `bg-brand-500`, `text-danger` y `rounded-card`.
- Si se instala shadcn/ui, sus componentes continúen utilizando sus variables semánticas.
- Los temas claro y oscuro utilicen superficies y colores legibles.
- No existan dos definiciones contradictorias de la misma propiedad.
- Los valores HSL, OKLCH o HEX se validen contra los colores originales.

No copies sin comprobar las equivalencias HSL que aparecen en la documentación. Calcula o verifica los valores cuando se necesiten.

No cambies arbitrariamente los colores de marca.

## 6. Organización de componentes

Inspecciona primero la estructura existente. Adapta la siguiente propuesta únicamente cuando aporte claridad y no implique una migración innecesaria:

```text
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── (public)/
│   │   ├── page.tsx
│   │   ├── jobs/
│   │   ├── marketplace/
│   │   ├── freelancer/
│   │   └── local/
│   ├── (auth)/
│   └── (dashboard)/
├── components/
│   ├── ui/
│   ├── layout/
│   └── features/
│       ├── home/
│       ├── jobs/
│       ├── marketplace/
│       ├── freelancer/
│       └── local/
├── styles/
│   ├── tokens.css
│   └── components.css
├── lib/
└── types/
```

Esta estructura es una referencia, no una orden para duplicar o mover todos los archivos.

Si ya existen componentes, rutas o carpetas equivalentes, reutilízalos.

### Componentes iniciales

Implementa solo los componentes que sean necesarios para la primera página pública que se construya. No crees componentes anticipadamente.

Cada componente debe tener:

- Tipos TypeScript adecuados.
- Una API clara.
- Variantes explícitas cuando sean necesarias.
- Estados de interacción coherentes.
- Accesibilidad y semántica HTML.
- Estilos consistentes con los design tokens.

Evita duplicar componentes que ya resuelvan la misma necesidad.

## 7. Microinteracciones y animaciones

### Microinteracciones

Utiliza transiciones CSS nativas para:

- Hover y press de botones.
- Transiciones de estados activos.
- Estados de favoritos.
- Feedback visual de filtros.
- Apertura y cierre de elementos interactivos.
- Feedback de formularios.
- Animaciones pequeñas de tarjetas e iconos.

### GSAP

Utiliza GSAP cuando aporte un beneficio claro:

- Animaciones de entrada escalonada.
- Secuencias coordinadas.
- Animaciones de hero.
- Efectos avanzados de scroll.
- Transiciones que requieran controlar timelines.

No utilices GSAP para todo.

### Reglas de movimiento

- Mantén duraciones y curvas de aceleración coherentes.
- Evita movimientos exagerados o innecesarios.
- Respeta `prefers-reduced-motion`.
- Prioriza `transform` y `opacity` cuando sean adecuados.
- Limpia timelines, listeners y ScrollTriggers cuando corresponda.
- Evita inicializaciones duplicadas en React Strict Mode.
- No cargues GSAP globalmente si solo lo utiliza una página o componente.
- Mantén las animaciones separadas de la lógica de negocio.

## 8. Reglas de React y Next.js

- Mantén Server Components como opción predeterminada.
- Utiliza Client Components únicamente cuando se necesiten estado, eventos o APIs del navegador.
- Evita añadir `"use client"` a layouts completos sin justificación.
- Separa la presentación de la lógica de datos.
- Evita prop drilling innecesario sin introducir una librería global de estado por anticipado.
- No añadas Redux o Zustand sin una necesidad demostrable.
- Evita duplicar consultas de datos.
- Mantén el tipado estricto.
- Evita `any` salvo casos justificados.
- Conserva la seguridad existente de autenticación y autorización.
- No expongas secretos de Supabase al cliente.
- No debilites los controles del dashboard para facilitar la implementación del frontend público.

No cambies la arquitectura del backend como parte de esta tarea salvo que sea imprescindible para una funcionalidad frontend concreta y esté debidamente justificado.

## 9. Calidad y pruebas

Utiliza los scripts reales del `package.json`. No supongas que todos existen ni inventes resultados.

Después de cada conjunto significativo de cambios:

1. Ejecuta el chequeo de tipos.
2. Ejecuta ESLint.
3. Ejecuta las pruebas disponibles.
4. Ejecuta el build de producción cuando sea viable.
5. Revisa los errores de integración CSS.
6. Comprueba que las rutas y componentes existentes sigan funcionando.

Añade pruebas para las variantes y comportamientos relevantes de los componentes cuando sea razonable.

No modifiques tests para ocultar fallos reales.

Si alguna comprobación no puede ejecutarse, informa exactamente qué faltó o qué error se produjo.

## 10. Forma de trabajo obligatoria

Trabaja en estas etapas:

### Etapa A — Auditoría inicial

Inspecciona:

- `package.json`.
- `src/app/globals.css`.
- `src/app/layout.tsx`.
- Configuración actual de Tailwind.
- Componentes reutilizables existentes.
- Estructura de páginas públicas.
- Dependencias y usos de GSAP.
- Configuración de TypeScript, ESLint y Vitest.

Entrega un resumen breve de los hallazgos, riesgos e inconsistencias reales.

### Etapa B — Plan de cambios

Antes de realizar cambios amplios, identifica:

- Archivos que deben modificarse.
- Archivos nuevos necesarios.
- Componentes que pueden reutilizarse.
- Riesgos de incompatibilidad.
- Dependencias que realmente deban añadirse (incluyendo shadcn/ui si procede).

No sustituyas configuraciones completas cuando baste con una modificación localizada.

### Etapa C — Implementación

Implementa las mejoras en el repositorio.

Prioriza:

1. Normalización de los tokens.
2. Compatibilidad con Tailwind CSS 4.
3. Instalación y configuración de shadcn/ui si se decide incorporarlo.
4. Sistema de clases semánticas.
5. Componentes React reutilizables (solo los necesarios para la primera página pública).
6. Microinteracciones con CSS nativo.
7. Integración selectiva de GSAP.

No te limites a generar snippets: modifica los archivos correspondientes.

### Etapa D — Validación

Ejecuta las comprobaciones disponibles y corrige los errores causados por tus cambios.

No afirmes que una prueba, instalación o build fue exitoso si no lo ejecutaste y verificaste.

### Etapa E — Informe final

Al terminar, entrega:

- Resumen de lo implementado.
- Archivos creados y modificados.
- Decisiones arquitectónicas relevantes.
- Dependencias añadidas, eliminadas o conservadas.
- Resultados reales de tipado, lint, tests y build.
- Problemas pendientes.
- Recomendaciones para continuar con Home, Jobs, Marketplace, Freelancer y Local.

## 11. Restricciones importantes

- No reescribas todo el proyecto.
- No introduzcas librerías redundantes.
- No dupliques design tokens.
- No conviertas todos los componentes en Client Components.
- No elimines funcionalidades existentes.
- No modifiques el esquema de Supabase sin necesidad.
- No cambies las rutas públicas o privadas sin justificación.
- No inventes información sobre el repositorio.
- No hagas cambios destructivos ni sobrescribas trabajo existente sin revisarlo.
- Mantén los cambios enfocados en el frontend y en la arquitectura visual.

## Resultado esperado

Un frontend de Trebbol Web con:

- Tailwind CSS 4 correctamente configurado.
- Design tokens centralizados y coherentes.
- shadcn/ui instalado y configurado para el dashboard (si se decide incorporarlo).
- Páginas públicas con un sistema visual independiente.
- JSX limpio y componentes React tipados.
- Clases semánticas reutilizables para patrones visuales.
- Microinteracciones con CSS nativo.
- GSAP aplicado selectivamente.
- Código accesible, mantenible y validado mediante las herramientas existentes.

**Empieza inspeccionando el repositorio. Después ejecuta el plan de forma incremental y modifica el código real. Prioriza la compatibilidad y la calidad antes que la cantidad de abstracciones.**

## Requisito adicional — Tipografía e iconografía

### 1. Tipografía oficial: Inter

La fuente oficial de Trebbol Web es **Inter**, cargada mediante `next/font/google`.

Configuración requerida:

- Familia: Inter.
- Fallback: `sans-serif`.
- Utilizar la variable CSS de la fuente de forma consistente en toda la aplicación.
- Mantener la tipografía coherente entre dashboard y páginas públicas.
- No introducir otras fuentes sin una necesidad de diseño justificada.
- Evitar cargar la misma fuente varias veces.

Verifica la implementación actual antes de modificarla y conserva una única configuración coherente de la fuente.

### 2. Iconografía

**A. Dashboard administrativo**

Conservar `lucide-react` para el dashboard y los componentes administrativos.

**B. Páginas públicas — Solar Icons**

Para Home, Jobs, Marketplace, Freelancer y Local, utilizar **Solar Icons** como biblioteca principal de iconos.

Paquete instalado: `@solar-icons/react` (ya disponible en el proyecto).

Uso:
```tsx
import { HomeAngleBoldDuotone } from '@solar-icons/react'
// o variantes: Bold, Linear, Outline, BoldDuotone, etc.
```

Referencia: https://solar-icons.vercel.app/icons

- No instales `@iconify/react` ni `@iconify-json/solar` — ya han sido eliminados.
- No inventes nombres de paquetes, componentes ni nombres de iconos.
- Evita cargar la biblioteca completa si basta con importaciones individuales.
- Mantén tamaños, alineación y color consistentes.
- Los iconos decorativos deben ser ignorados por lectores de pantalla (`aria-hidden="true"`).
- Los iconos que actúen como botones deben tener un nombre accesible.

No mezcles arbitrariamente Lucide y Solar Icons dentro de una misma página.

### 3. Criterios de aceptación

Al terminar, verifica que:

- Inter sea la fuente principal en dashboard y páginas públicas.
- El dashboard conserve `lucide-react`.
- Las páginas públicas utilicen Solar Icons.
- No existan dependencias de iconos duplicadas o innecesarias.
- La carga de iconos no incremente injustificadamente el JavaScript del cliente.
- Los iconos mantengan una escala, alineación y accesibilidad coherentes.
- La implementación respete los componentes existentes y no introduzca regresiones visuales.
