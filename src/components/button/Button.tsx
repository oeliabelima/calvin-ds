import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Icon, type IconName } from '../../icons'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-[--spacing-icon-text-gap] rounded-button font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus disabled:pointer-events-none disabled:opacity-disabled',
  {
    variants: {
      variant: {
        primary: 'bg-brand text-text-on-brand hover:bg-brand-hover active:bg-brand-active',
        secondary:
          'bg-surface text-text-primary border border-border hover:bg-surface-alt active:bg-surface-sunken',
        tertiary: 'bg-brand-bg-subtle text-brand-text hover:bg-brand-bg-subtle active:bg-brand-bg-subtle',
        ghost: 'bg-transparent text-text-primary hover:bg-state-hover active:bg-state-pressed',
        danger: 'bg-error-solid text-text-on-brand hover:opacity-90 active:opacity-80',
        inverse: 'bg-surface text-brand-text hover:bg-surface-alt active:bg-surface-sunken',
      },
      size: {
        sm: 'h-8 px-8 text-sm',
        md: 'h-12 px-16 text-base',
        lg: 'h-14 px-24 text-md',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  iconLeft?: IconName
  iconRight?: IconName
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, iconLeft, iconRight, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {iconLeft && <Icon name={iconLeft} size="md" aria-hidden />}
        {children}
        {iconRight && <Icon name={iconRight} size="md" aria-hidden />}
      </button>
    )
  },
)
Button.displayName = 'Button'
