import * as React from 'react'

type Variant = 'default' | 'success' | 'danger' | 'warning' | 'info' | 'draft' | 'brand'

const variantClasses: Record<Variant, string> = {
  default: 'bg-gray-100 text-gray-700',
  brand:   'bg-brand-50 text-brand-700',
  success: 'bg-success-bg text-success',
  danger:  'bg-danger-bg text-danger',
  warning: 'bg-warning-bg text-warning',
  info:    'bg-info-bg text-info',
  draft:   'bg-draft-bg text-draft',
}

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Variante semántica del badge. @default 'default' */
  variant?: Variant
}

/**
 * Etiqueta de estado o categoría. Usa variantes semánticas alineadas con los tokens de diseño.
 *
 * @example
 * <Badge variant="success">Activo</Badge>
 * <Badge variant="draft">Borrador</Badge>
 * <Badge variant="danger">Vendido</Badge>
 * <Badge variant="brand">Nuevo</Badge>
 */
export function Badge({
  variant = 'default',
  className = '',
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={[
        'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  )
}
