import * as React from 'react'
import { Fragment } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

// Read directly from the real Figma "Breadcrumb / Item" (node 663:3286)
// and "Breadcrumb / Separator" (node 663:3287) components.
const breadcrumbItemVariants = cva(
  'inline-flex items-center justify-center rounded-[var(--radius-button)] p-8 text-sm border-2 border-transparent focus-visible:outline-none focus-visible:border-regular focus-visible:border-border-focus',
  {
    variants: {
      current: {
        true: 'text-text-primary cursor-default',
        false: 'text-text-link hover:text-text-link-hover',
      },
      disabled: {
        true: 'pointer-events-none text-text-disabled',
        false: '',
      },
    },
    defaultVariants: { current: false, disabled: false },
  },
)

export interface BreadcrumbItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof breadcrumbItemVariants> {
  current?: boolean
  disabled?: boolean
}

export function BreadcrumbItem({ className, current, disabled, ...props }: BreadcrumbItemProps) {
  if (current) {
    return (
      <span
        aria-current="page"
        className={cn(breadcrumbItemVariants({ current: true, disabled }), className)}
      >
        {props.children}
      </span>
    )
  }
  return (
    <a
      className={cn(breadcrumbItemVariants({ current: false, disabled }), className)}
      aria-disabled={disabled}
      {...props}
    />
  )
}

export function BreadcrumbSeparator() {
  return (
    <span aria-hidden className="flex h-[36px] w-[12px] items-center justify-center text-sm text-text-secondary">
      /
    </span>
  )
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export function Breadcrumb({ className, children, ...props }: BreadcrumbProps) {
  const items = React.Children.toArray(children)
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center', className)} {...props}>
      {items.map((child, index) => (
        <Fragment key={index}>
          {child}
          {index < items.length - 1 && <BreadcrumbSeparator />}
        </Fragment>
      ))}
    </nav>
  )
}
