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
  size?: Size
}

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
