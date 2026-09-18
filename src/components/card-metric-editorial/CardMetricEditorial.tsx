import * as React from 'react'
import { cn } from '../../lib/utils'

// Read directly from the real Figma "Card / Metric Editorial"
// component (fileKey yWcYz9Nlr9VsyCiKc2HXu5, node 1618:617). Two
// tones: Product (bg-brand, everything text-on-brand) and Surface
// (bg-surface, text-primary for number/title, text-secondary for
// description) — no border on either (same borderless convention as
// CardEditorialFeature). Real, confirmed difference between tones
// (not a guess): the gap between title and description inside the
// "Description" wrapper is 8px for Product but 16px for Surface —
// found by direct comparison of Figma's generated code for both, not
// assumed to be the same. `vertical` is a fixed-height (480px)
// variant that pins bigNumber to the top and the description block to
// the bottom via justify-between/justify-end, used for grid-row
// alignment — `vertical={false}` (the default) just hugs its content
// height. rounded-[20px] is the same one-off radius used by
// CardEditorialFeature, not part of the registered scale.
export interface CardMetricEditorialProps extends React.HTMLAttributes<HTMLDivElement> {
  bigNumber: string
  title: string
  description: string
  tone?: 'product' | 'surface'
  vertical?: boolean
}

export function CardMetricEditorial({
  className,
  bigNumber,
  title,
  description,
  tone = 'product',
  vertical,
  ...props
}: CardMetricEditorialProps) {
  const isProduct = tone === 'product'

  return (
    <div
      className={cn(
        'flex w-[389px] flex-col items-start gap-16 overflow-hidden rounded-[20px] p-32',
        isProduct ? 'bg-brand text-text-on-brand' : 'bg-surface',
        vertical && 'h-[480px] justify-between',
        className,
      )}
      {...props}
    >
      <p
        className={cn(
          'w-full text-4xl font-bold leading-[56px] tracking-[-2.5px]',
          !isProduct && 'text-text-primary',
        )}
      >
        {bigNumber}
      </p>
      <div
        className={cn(
          'flex w-full flex-col items-start',
          isProduct ? 'gap-8' : 'gap-16',
          vertical && 'justify-end',
        )}
      >
        <p
          className={cn(
            'w-full text-2xl font-semibold leading-[36px] tracking-[-1.5px]',
            !isProduct && 'text-text-primary',
          )}
        >
          {title}
        </p>
        <p className={cn('w-full text-base', !isProduct && 'text-text-secondary')}>{description}</p>
      </div>
    </div>
  )
}
