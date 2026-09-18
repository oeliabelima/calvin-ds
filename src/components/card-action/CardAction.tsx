import * as React from 'react'
import { cn } from '../../lib/utils'

// Read directly from the real Figma "Card / Action" component (fileKey
// yWcYz9Nlr9VsyCiKc2HXu5, node 1002:275). Two layouts: Vertical
// (w-340, icon+chip row on top, content stacked below) and Horizontal
// (w-440, icon beside content, eyebrow+chip share one row inside
// content). Title uses a mixed "heading-3" style: text-2xl (33px)
// font-size paired with a 36px line-height (NOT text-2xl's own default
// 44px line-height) and -1.5px tracking — confirmed via Figma's own
// generated code, not assumed. Icon and chip are fully consumer-
// controlled slots (Figma exposes both as instance-swap/boolean
// props, not values this component derives). Interactive states reuse
// the same brand-tinted overlay + border-focus pattern already
// established in Card/CardMetric. Disabled drops ALL per-slot color
// (eyebrow's brand-text and action's brand-text both become
// text-disabled too, not just title/description) and dims via
// bg-surface-disabled + opacity-40.
export interface CardActionProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow: string
  title: string
  description: string
  action: string
  icon?: React.ReactNode
  chip?: React.ReactNode
  layout?: 'vertical' | 'horizontal'
  disabled?: boolean
}

export function CardAction({
  className,
  eyebrow,
  title,
  description,
  action,
  icon,
  chip,
  layout = 'vertical',
  disabled,
  ...props
}: CardActionProps) {
  const isHorizontal = layout === 'horizontal'

  const eyebrowEl = (
    <p
      className={cn(
        'text-xs font-medium tracking-[0.5px]',
        isHorizontal && 'flex-1',
        disabled ? 'text-text-disabled' : 'text-brand-text',
      )}
    >
      {eyebrow}
    </p>
  )
  const titleEl = (
    <p
      className={cn(
        'w-full text-2xl font-semibold leading-[36px] tracking-[-1.5px]',
        disabled ? 'text-text-disabled' : 'text-text-primary',
      )}
    >
      {title}
    </p>
  )
  const descriptionEl = (
    <p className={cn('w-full text-sm', disabled ? 'text-text-disabled' : 'text-text-secondary')}>
      {description}
    </p>
  )
  const actionEl = (
    <p
      className={cn(
        'w-full text-base font-semibold',
        disabled ? 'text-text-disabled' : 'text-brand-text',
      )}
    >
      {action}
    </p>
  )

  return (
    <div
      aria-disabled={disabled}
      className={cn(
        'flex rounded-card border border-border bg-surface p-24 transition-colors',
        isHorizontal ? 'w-[440px] flex-row items-center gap-16' : 'w-[340px] flex-col gap-16',
        !disabled &&
          'hover:bg-state-hover-brand focus-visible:border-2 focus-visible:border-border-focus focus-visible:bg-state-pressed-brand active:bg-state-pressed-brand focus-visible:outline-none',
        disabled && 'pointer-events-none bg-surface-disabled opacity-40',
        className,
      )}
      {...props}
    >
      {isHorizontal ? (
        <>
          {icon && <div className="shrink-0">{icon}</div>}
          <div className="flex min-w-0 flex-1 flex-col gap-8">
            <div className="flex w-full items-center gap-8">
              {eyebrowEl}
              {chip}
            </div>
            {titleEl}
            {descriptionEl}
            {actionEl}
          </div>
        </>
      ) : (
        <>
          <div className="flex w-full items-center justify-between">
            {icon}
            {chip}
          </div>
          <div className="flex w-full flex-col gap-8">
            {eyebrowEl}
            {titleEl}
            {descriptionEl}
            {actionEl}
          </div>
        </>
      )}
    </div>
  )
}
