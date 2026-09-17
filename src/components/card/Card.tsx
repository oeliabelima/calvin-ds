import * as React from 'react'
import { cn } from '../../lib/utils'

// Read directly from the real Figma "Card" component (fileKey
// yWcYz9Nlr9VsyCiKc2HXu5, node 899:2 -> frame 905:2, Type=Text/Media x
// State=Default/Hover/Focus/Pressed/Disabled). Interaction states use
// the brand-tinted state-layer tokens (state-hover-brand/
// state-pressed-brand), not the neutral ones; Focus and Pressed share
// the same background value and differ only in border.
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
}

export function Card({ className, disabled, ...props }: CardProps) {
  return (
    <div
      aria-disabled={disabled}
      className={cn(
        'flex flex-col overflow-hidden rounded-card border border-border bg-surface transition-colors',
        !disabled &&
          'hover:bg-state-hover-brand focus-visible:border-2 focus-visible:border-border-focus focus-visible:bg-state-pressed-brand active:bg-state-pressed-brand focus-visible:outline-none',
        disabled && 'pointer-events-none bg-surface-disabled opacity-[0.72]',
        className,
      )}
      {...props}
    />
  )
}

export function CardMedia({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return <img alt={alt} className={cn('h-[200px] w-full object-cover', className)} {...props} />
}

export function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-8 p-24', className)} {...props} />
}

export function CardEyebrow({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-xs font-medium tracking-[0.5px] text-brand-text', className)}
      {...props}
    />
  )
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-2xl font-semibold tracking-[-1.5px] text-text-primary', className)}
      {...props}
    />
  )
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-text-secondary', className)} {...props} />
}

export function CardMeta({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-base text-text-secondary', className)} {...props} />
}

export function CardAction({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-base font-semibold text-brand-text', className)} {...props} />
}
