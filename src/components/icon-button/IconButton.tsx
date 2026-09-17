import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Icon, type IconName, type IconSize } from '../../icons'

// Read directly from the real Figma "Icon Button" page (fileKey
// yWcYz9Nlr9VsyCiKc2HXu5, node 550:2 — one page holds all 6 variants).
// Icon Button is its own component, not a reskin of Button: it's a circle
// (rounded-full, not radius-button) and several variants have different
// hover/pressed treatment than their Button counterpart (e.g. Danger has
// no hover/pressed change at all; Secondary/Tertiary/Ghost/Inverse use a
// flat translucent overlay, not Button's stacked-gradient-over-solid trick).
export const iconButtonVariants = cva(
  'inline-flex items-center justify-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:bg-surface-disabled disabled:text-text-disabled disabled:border-transparent',
  {
    variants: {
      variant: {
        primary:
          'bg-brand text-text-on-brand hover:bg-brand-hover active:bg-brand-active focus-visible:border-border-focus',
        secondary:
          'bg-surface text-brand-text hover:bg-state-hover-brand active:bg-state-pressed-brand focus-visible:border-border-focus',
        tertiary:
          'bg-brand-bg-subtle text-brand-text hover:bg-state-hover-brand active:bg-state-pressed-brand focus-visible:border-border-focus',
        ghost:
          'bg-transparent text-brand-text hover:bg-state-hover-brand active:bg-state-pressed-brand focus-visible:border-border-focus',
        danger: 'bg-error-solid text-text-inverse focus-visible:border-border-focus',
        inverse:
          'bg-surface text-brand-text hover:bg-state-hover-brand active:bg-state-pressed-brand focus-visible:border-neutral-1000',
      },
      size: {
        sm: 'size-[40px]',
        md: 'size-[48px]',
        lg: 'size-[56px]',
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

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    VariantProps<typeof iconButtonVariants> {
  icon: IconName
  'aria-label': string
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size = 'md', icon, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(iconButtonVariants({ variant, size, className }))}
        {...props}
      >
        <Icon name={icon} size={iconSizeForButtonSize[size ?? 'md']} aria-hidden />
      </button>
    )
  },
)

IconButton.displayName = 'IconButton'
