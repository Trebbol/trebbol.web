import * as React from 'react'

type Variant = 'default' | 'interactive' | 'flat'

const variantClasses: Record<Variant, string> = {
  default:
    'bg-white border border-gray-200 shadow-sm',
  interactive:
    'bg-white border border-gray-200 shadow-sm cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all duration-200',
  flat:
    'bg-gray-50 border border-gray-100',
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Estilo visual de la tarjeta. @default 'default' */
  variant?: Variant
}

/**
 * Contenedor visual tipo tarjeta. Composable con `CardHeader`, `CardTitle` y `CardContent`.
 *
 * @example
 * // Tarjeta estática
 * <Card>
 *   <CardHeader><CardTitle>Título</CardTitle></CardHeader>
 *   <CardContent>Contenido</CardContent>
 * </Card>
 *
 * @example
 * // Tarjeta interactiva (hover lift)
 * <Card variant="interactive" onClick={handleClick}>
 *   <CardTitle>Oferta de trabajo</CardTitle>
 * </Card>
 *
 * @example
 * // Tarjeta plana para fondos grises
 * <Card variant="flat">Contenido</Card>
 */
export function Card({
  variant = 'default',
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={[
        'rounded-card p-5',
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}

/** Cabecera de tarjeta con espaciado inferior. Úsalo para agrupar título y metadatos. */
export function CardHeader({
  className = '',
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={['flex flex-col gap-1 mb-4', className].join(' ')}
    >
      {children}
    </div>
  )
}

/** Título de tarjeta. Renderiza un `<h3>` semántico. */
export function CardTitle({
  className = '',
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      {...props}
      className={['text-base font-semibold text-gray-900 leading-snug', className].join(' ')}
    >
      {children}
    </h3>
  )
}

/** Cuerpo de texto de la tarjeta. Aplica estilos de texto secundario. */
export function CardContent({
  className = '',
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={['text-sm text-gray-600', className].join(' ')}
    >
      {children}
    </div>
  )
}
