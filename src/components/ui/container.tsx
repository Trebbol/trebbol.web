import * as React from 'react'

type Size = 'sm' | 'md' | 'lg' | 'xl' | 'full'

const sizeClasses: Record<Size, string> = {
  sm:   'max-w-2xl',
  md:   'max-w-4xl',
  lg:   'max-w-5xl',
  xl:   'max-w-7xl',
  full: 'max-w-full',
}

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Ancho máximo del contenedor.
   * - `sm` → 672px · `md` → 896px · `lg` → 1024px · `xl` → 1280px · `full` → sin límite
   * @default 'xl'
   */
  size?: Size
}

/**
 * Contenedor centrado con padding horizontal responsivo.
 * Úsalo para envolver el contenido principal de cada sección o página.
 *
 * @example
 * // Sección con ancho estándar
 * <Container>
 *   <h2>Título de sección</h2>
 * </Container>
 *
 * @example
 * // Contenido de texto más estrecho
 * <Container size="md">
 *   <p>Descripción larga...</p>
 * </Container>
 */
export function Container({
  size = 'xl',
  className = '',
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      {...props}
      className={[
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}
