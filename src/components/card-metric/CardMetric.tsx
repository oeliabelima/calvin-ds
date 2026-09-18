import * as React from 'react'
import { cn } from '../../lib/utils'

// Read directly from the real Figma "Card / Metric" component (fileKey
// yWcYz9Nlr9VsyCiKc2HXu5, node 1002:204 -> frames 1002:84/124/164 for
// the 3 trends, states fetched from 1002:92/100/108/116). Trend colors
// the label and supporting text (success/brand/error-text — Neutral
// trend uses brand-text/red, not a neutral gray, confirmed via Figma),
// but the big value stays text-primary regardless of trend. The chip
// slot is fully consumer-controlled content (Figma's own default
// example always shows a Success Tag regardless of trend — it is not
// derived from trend), so it is NOT auto-derived from `trend` here.
// Interactive states reuse Card's established brand-tinted overlay +
// border-focus pattern; Disabled uses bg-surface-disabled + opacity-40
// + text-disabled uniformly (trend colors are dropped when disabled).
const trendTextClass: Record<'positive' | 'neutral' | 'negative', string> = {
  positive: 'text-success-text',
  neutral: 'text-brand-text',
  negative: 'text-error-text',
}

export interface CardMetricProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: string
  supporting: string
  trend?: 'positive' | 'neutral' | 'negative'
  chip?: React.ReactNode
  disabled?: boolean
}

export function CardMetric({
  className,
  label,
  value,
  supporting,
  trend = 'positive',
  chip,
  disabled,
  ...props
}: CardMetricProps) {
  return (
    <div
      aria-disabled={disabled}
      className={cn(
        'flex w-[320px] flex-col gap-[10px] rounded-card border border-border bg-surface p-24 transition-colors',
        !disabled &&
          'hover:bg-state-hover-brand focus-visible:border-2 focus-visible:border-border-focus focus-visible:bg-state-pressed-brand active:bg-state-pressed-brand focus-visible:outline-none',
        disabled && 'pointer-events-none bg-surface-disabled opacity-40',
        className,
      )}
      {...props}
    >
      <div className="flex h-24 w-full items-start justify-between">
        <p
          className={cn(
            'text-xs font-medium tracking-[0.5px]',
            disabled ? 'text-text-disabled' : trendTextClass[trend],
          )}
        >
          {label}
        </p>
        {chip}
      </div>
      <p
        className={cn(
          'w-full text-4xl font-bold tracking-[-2.5px]',
          disabled ? 'text-text-disabled' : 'text-text-primary',
        )}
      >
        {value}
      </p>
      <p className={cn('w-full text-sm', disabled ? 'text-text-disabled' : trendTextClass[trend])}>
        {supporting}
      </p>
    </div>
  )
}
