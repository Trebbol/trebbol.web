import * as React from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 shadow-sm',
  secondary:
    'bg-brand-50 text-brand-700 hover:bg-brand-100 active:bg-brand-200',
  outline:
    'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 active:bg-gray-100',
  ghost:
    'text-gray-700 hover:bg-gray-100 active:bg-gray-200',
  danger:
    'bg-danger text-white hover:bg-red-700 active:bg-red-800 shadow-sm',
}

const sizeClasses: Record<Size, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-10 px-5 text-sm gap-2',
  lg: 'h-12 px-7 text-base gap-2.5',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Estilo visual del botón. @default 'primary' */
  variant?: Variant
  /** Tamaño del botón. @default 'md' */
  size?: Size
  /** Muestra un spinner y deshabilita el botón mientras carga. @default false */
  loading?: boolean
}

/**
 * Botón reutilizable para acciones del dashboard y páginas públicas.
 *
 * @example
 * // Botón primario estándar
 * <Button>Guardar</Button>
 *
 * @example
 * // Botón destructivo con estado de carga
 * <Button variant="danger" loading={isPending}>Eliminar</Button>
 *
 * @example
 * // Botón pequeño secundario con icono
 * <Button variant="secondary" size="sm">
 *   <PlusIcon size={14} aria-hidden="true" /> Añadir
 * </Button>
 */
export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={[
        'inline-flex items-center justify-center font-semibold rounded-xl',
        'transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {loading ? (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      ) : null}
      {children}
    </button>
  )
}
