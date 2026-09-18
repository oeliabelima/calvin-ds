import * as React from 'react'
import { cn } from '../../lib/utils'

// Read directly from the real Figma "Card / Editorial Feature"
// component (fileKey yWcYz9Nlr9VsyCiKc2HXu5, node 1618:606). No
// border (unlike every other card built this session — confirmed:
// Figma's generated code has no border class at all here, just
// bg-surface), no hover/focus/pressed/disabled states (purely
// informational, not interactive — Figma exposes no State property
// for this component). rounded-[20px] is a one-off radius not part of
// the registered scale (card=12px, xl=24px), so it's arbitrary.
// Vertical: w-378, flex-col, p-32, gap-16. Horizontal: w-640,
// flex-row, p-[28px], gap-24 (28 isn't in the registered spacing
// scale either).
export interface CardEditorialFeatureProps extends React.HTMLAttributes<HTMLDivElement> {
  number: string
  title: string
  description: string
  layout?: 'vertical' | 'horizontal'
}

export function CardEditorialFeature({
  className,
  number,
  title,
  description,
  layout = 'vertical',
  ...props
}: CardEditorialFeatureProps) {
  const isHorizontal = layout === 'horizontal'

  return (
    <div
      className={cn(
        'flex items-start overflow-hidden rounded-[20px] bg-surface',
        isHorizontal ? 'w-[640px] flex-row gap-24 p-[28px]' : 'w-[378px] flex-col gap-16 p-32',
        className,
      )}
      {...props}
    >
      <div className="flex size-[44px] shrink-0 items-center justify-center rounded-full bg-brand">
        <p className="text-base font-semibold text-text-on-brand">{number}</p>
      </div>
      <div className={cn('flex flex-col items-start gap-8', isHorizontal && 'min-w-0 flex-1')}>
        <p className="w-full text-2xl font-semibold leading-[36px] tracking-[-1.5px] text-text-primary">
          {title}
        </p>
        <p className="w-full text-base text-text-secondary">{description}</p>
      </div>
    </div>
  )
}
