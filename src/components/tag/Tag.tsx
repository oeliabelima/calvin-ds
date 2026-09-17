import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

// Read directly from the real Figma "Tag" component (fileKey
// yWcYz9Nlr9VsyCiKc2HXu5, node 974:2 -> frame 974:43). Every status has
// a matching 1px border (not just a tinted background), Small and
// Medium use different font styles (not just different padding), and
// the status indicator dot's size and color track the status too.
const tagVariants = cva('inline-flex items-center rounded-tag border', {
  variants: {
    status: {
      neutral: 'bg-surface border-border text-text-primary',
      brand: 'bg-brand-bg-subtle border-brand-text text-brand-text',
      success: 'bg-success-bg-subtle border-success-border text-success-text',
      info: 'bg-info-bg-subtle border-info-border text-info-text',
      warning: 'bg-warning-bg-subtle border-warning-border text-warning-text',
      error: 'bg-error-bg-subtle border-error-border text-error-text',
    },
    size: {
      sm: 'h-[24px] px-8 gap-[6px] text-xs font-medium tracking-[0.5px]',
      md: 'h-[32px] px-12 gap-[6px] text-base font-normal',
    },
  },
  defaultVariants: { status: 'neutral', size: 'sm' },
})

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof tagVariants> {
  showIndicator?: boolean
}

export function Tag({ className, status, size = 'sm', showIndicator = true, children, ...props }: TagProps) {
  return (
    <span className={cn(tagVariants({ status, size, className }))} {...props}>
      {showIndicator && (
        <span
          className={cn(
            'shrink-0 rounded-full bg-current',
            size === 'sm' ? 'size-[6px]' : 'size-[8px]',
          )}
        />
      )}
      {children}
    </span>
  )
}
