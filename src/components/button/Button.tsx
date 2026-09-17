import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Icon, type IconName, type IconSize } from '../../icons'

// Values below are read directly from the real Figma nodes for each
// Button / <Variant> component set (Core Components file), not approximated:
// height 40/48/56px per size, 16px padding for Small+Medium and 24px for
// Large, 16px/24px-line-height/600-weight text at every size, and the
// documented color per variant/state.
export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-8 rounded-button border-2 border-transparent font-semibold text-base leading-[24px] transition-colors focus-visible:outline-none disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'bg-brand text-text-on-brand hover:bg-brand-hover active:bg-brand-active focus-visible:border-border-focus disabled:bg-surface-disabled disabled:text-text-disabled',
        secondary:
          'bg-surface text-brand-text hover:bg-surface-alt active:bg-state-pressed-brand focus-visible:border-border-focus disabled:bg-surface-disabled disabled:text-text-disabled',
        tertiary:
          'bg-brand-bg-subtle text-brand-text hover:[background-image:linear-gradient(0deg,var(--color-state-hover-brand),var(--color-state-hover-brand)),linear-gradient(0deg,var(--color-brand-bg-subtle),var(--color-brand-bg-subtle))] active:[background-image:linear-gradient(0deg,var(--color-state-pressed-brand),var(--color-state-pressed-brand)),linear-gradient(0deg,var(--color-brand-bg-subtle),var(--color-brand-bg-subtle))] focus-visible:border-border-focus disabled:bg-surface-disabled disabled:text-text-disabled disabled:[background-image:none]',
        ghost:
          'bg-transparent text-brand-text underline hover:bg-state-hover-brand active:bg-state-pressed-brand focus-visible:border-neutral-1000 disabled:text-text-disabled',
        danger:
          'bg-error-solid text-text-inverse hover:[background-image:linear-gradient(0deg,var(--color-state-hover-brand),var(--color-state-hover-brand)),linear-gradient(0deg,var(--color-error-solid),var(--color-error-solid))] active:[background-image:linear-gradient(0deg,var(--color-state-pressed-brand),var(--color-state-pressed-brand)),linear-gradient(0deg,var(--color-error-solid),var(--color-error-solid))] focus-visible:border-border-focus disabled:bg-surface-disabled disabled:text-text-disabled disabled:[background-image:none]',
        inverse:
          'bg-surface text-brand-text hover:[background-image:linear-gradient(0deg,var(--color-state-hover-brand),var(--color-state-hover-brand)),linear-gradient(0deg,var(--color-surface),var(--color-surface))] active:[background-image:linear-gradient(0deg,var(--color-state-pressed-brand),var(--color-state-pressed-brand)),linear-gradient(0deg,var(--color-surface),var(--color-surface))] focus-visible:border-neutral-1000 disabled:opacity-disabled disabled:[background-image:none]',
      },
      size: {
        sm: 'h-[40px] px-16',
        md: 'h-[48px] px-16',
        lg: 'h-[56px] px-24',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

const iconSizeForButtonSize: Record<'sm' | 'md' | 'lg', IconSize> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  iconLeft?: IconName
  iconRight?: IconName
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size = 'md', iconLeft, iconRight, children, ...props }, ref) => {
    const iconSize = iconSizeForButtonSize[size ?? 'md']
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {iconLeft && <Icon name={iconLeft} size={iconSize} aria-hidden />}
        {children}
        {iconRight && <Icon name={iconRight} size={iconSize} aria-hidden />}
      </button>
    )
  },
)
Button.displayName = 'Button'
