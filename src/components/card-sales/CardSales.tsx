import * as React from 'react'
import { cn } from '../../lib/utils'

// Read directly from the real Figma "Card / Sales" component (fileKey
// yWcYz9Nlr9VsyCiKc2HXu5, node 1005:197). Two layouts: Media (w-360,
// 200px-tall image full-width on top, content below) and Compact
// (w-440, 160x260 image on the left, content flex-1 on the right).
// Title reuses the same "heading-3" mix as CardAction: text-2xl (33px)
// paired with a 36px line-height and -1.5px tracking, confirmed via
// Figma's own generated code. The chip slot is fully consumer-
// controlled (like CardMetric/CardAction) — confirmed NOT to change
// color when disabled (unlike CardAction's built-in eyebrow), so
// disabled only dims the whole card via opacity-40 and recolors the
// built-in text fields (title/description/price/oldPrice/action),
// never the chip itself.
export interface CardSalesProps extends React.HTMLAttributes<HTMLDivElement> {
  image: React.ReactNode
  title: string
  description: string
  price: string
  oldPrice?: string
  action: string
  chip?: React.ReactNode
  layout?: 'media' | 'compact'
  disabled?: boolean
}

export function CardSales({
  className,
  image,
  title,
  description,
  price,
  oldPrice,
  action,
  chip,
  layout = 'media',
  disabled,
  ...props
}: CardSalesProps) {
  const isCompact = layout === 'compact'

  return (
    <div
      aria-disabled={disabled}
      className={cn(
        'flex overflow-hidden rounded-card border border-border bg-surface transition-colors',
        isCompact ? 'w-[440px] flex-row items-start' : 'w-[360px] flex-col items-start',
        !disabled &&
          'hover:bg-state-hover-brand focus-visible:border-2 focus-visible:border-border-focus focus-visible:bg-state-pressed-brand active:bg-state-pressed-brand focus-visible:outline-none',
        disabled && 'pointer-events-none bg-surface-disabled opacity-40',
        className,
      )}
      {...props}
    >
      <div className={cn('shrink-0 overflow-hidden', isCompact ? 'h-[260px] w-[160px]' : 'h-[200px] w-full')}>
        {image}
      </div>
      <div
        className={cn(
          'flex flex-col items-start gap-8 p-[20px]',
          isCompact ? 'min-w-0 flex-1' : 'w-full',
        )}
      >
        {chip}
        <p
          className={cn(
            'w-full text-2xl font-semibold leading-[36px] tracking-[-1.5px]',
            disabled ? 'text-text-disabled' : 'text-text-primary',
          )}
        >
          {title}
        </p>
        <p className={cn('w-full text-sm', disabled ? 'text-text-disabled' : 'text-text-secondary')}>
          {description}
        </p>
        <div className="flex items-baseline gap-8">
          <p
            className={cn(
              'text-base font-semibold',
              disabled ? 'text-text-disabled' : 'text-text-primary',
            )}
          >
            {price}
          </p>
          {oldPrice && (
            <p
              className={cn(
                'text-sm line-through',
                disabled ? 'text-text-disabled' : 'text-text-secondary',
              )}
            >
              {oldPrice}
            </p>
          )}
        </div>
        <p
          className={cn(
            'w-full text-base font-semibold',
            disabled ? 'text-text-disabled' : 'text-brand-text',
          )}
        >
          {action}
        </p>
      </div>
    </div>
  )
}
