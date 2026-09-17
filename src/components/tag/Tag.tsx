import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const tagVariants = cva('inline-flex items-center rounded-tag px-8 h-6 text-xs font-medium', {
  variants: {
    tone: {
      neutral: 'bg-surface-alt text-text-secondary',
      brand: 'bg-brand-bg-subtle text-brand-text',
      success: 'bg-success-bg-subtle text-success-text',
      warning: 'bg-warning-bg-subtle text-warning-text',
      error: 'bg-error-bg-subtle text-error-text',
      info: 'bg-info-bg-subtle text-info-text',
    },
  },
  defaultVariants: { tone: 'neutral' },
})

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof tagVariants> {}

export function Tag({ className, tone, ...props }: TagProps) {
  return <span className={cn(tagVariants({ tone, className }))} {...props} />
}
