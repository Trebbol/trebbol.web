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
  variant?: Variant
}

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
