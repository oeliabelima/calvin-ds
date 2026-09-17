import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Icon, type IconName } from '../../icons'
import { buttonVariants } from '../button'

const iconButtonSize = cva(
  'inline-flex items-center justify-center rounded-button transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus disabled:pointer-events-none disabled:opacity-disabled',
  {
    variants: {
      size: {
        sm: 'size-8',
        md: 'size-12',
        lg: 'size-14',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    VariantProps<typeof buttonVariants>,
    VariantProps<typeof iconButtonSize> {
  icon: IconName
  'aria-label': string
}

const iconSizeForButtonSize = { sm: 'sm', md: 'md', lg: 'lg' } as const

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size = 'md', icon, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ variant }),
          iconButtonSize({ size }),
          'p-0',
          className,
        )}
        {...props}
      >
        <Icon name={icon} size={iconSizeForButtonSize[size ?? 'md']} aria-hidden />
      </button>
    )
  },
)

IconButton.displayName = 'IconButton'
