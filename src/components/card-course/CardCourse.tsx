import * as React from 'react'
import { cn } from '../../lib/utils'

// Read directly from the real Figma "Card / Course" component
// (fileKey yWcYz9Nlr9VsyCiKc2HXu5, node 1807:302). Unlike
// CardMetric/CardAction/CardSales, this card's Disabled state matches
// the BASE "Card" component's recipe exactly (bg-surface-disabled +
// opacity-[0.72], confirmed via Figma's own generated code — NOT the
// opacity-40 recipe used by the other specialized cards), because
// Figma's own description says it "Mantém Type e State do Card base".
// Each built-in text field also individually switches to
// text-disabled on top of that opacity, matching what Figma's
// generated code shows (not assumed). `media` is an optional slot
// (omit it for the Text type, pass an image for the Media type) using
// the same optional-slot convention as CardMedia on the base Card.
// Title reuses the same mixed "heading-3" style as CardAction/
// CardSales: text-2xl (33px) paired with a 36px line-height (not
// text-2xl's own 44px) and -1.5px tracking.
export interface CardCourseProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  eyebrow?: string
  description?: string
  classification?: React.ReactNode
  meta?: string
  action?: string
  media?: React.ReactNode
  disabled?: boolean
}

export function CardCourse({
  className,
  title,
  eyebrow,
  description,
  classification,
  meta,
  action,
  media,
  disabled,
  ...props
}: CardCourseProps) {
  return (
    <div
      aria-disabled={disabled}
      className={cn(
        'flex w-[360px] flex-col items-start overflow-hidden rounded-card border border-border bg-surface transition-colors',
        !disabled &&
          'hover:bg-state-hover-brand focus-visible:border-2 focus-visible:border-border-focus focus-visible:bg-state-pressed-brand active:bg-state-pressed-brand focus-visible:outline-none',
        disabled && 'pointer-events-none bg-surface-disabled opacity-[0.72]',
        className,
      )}
      {...props}
    >
      {media && <div className="h-[200px] w-full shrink-0 overflow-hidden">{media}</div>}
      <div className="flex w-full flex-col items-start gap-8 p-24">
        {eyebrow && (
          <p
            className={cn(
              'w-full text-xs font-medium tracking-[0.5px]',
              disabled ? 'text-text-disabled' : 'text-brand-text',
            )}
          >
            {eyebrow}
          </p>
        )}
        <p
          className={cn(
            'w-full text-2xl font-semibold leading-[36px] tracking-[-1.5px]',
            disabled ? 'text-text-disabled' : 'text-text-primary',
          )}
        >
          {title}
        </p>
        {description && (
          <p className={cn('w-full text-sm', disabled ? 'text-text-disabled' : 'text-text-secondary')}>
            {description}
          </p>
        )}
        {classification}
        {meta && (
          <p className={cn('w-full text-base', disabled ? 'text-text-disabled' : 'text-text-secondary')}>
            {meta}
          </p>
        )}
        {action && (
          <p
            className={cn(
              'w-full text-base font-semibold',
              disabled ? 'text-text-disabled' : 'text-brand-text',
            )}
          >
            {action}
          </p>
        )}
      </div>
    </div>
  )
}
