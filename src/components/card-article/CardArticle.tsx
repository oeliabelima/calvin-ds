import * as React from 'react'
import { cn } from '../../lib/utils'

// Read directly from the real Figma "Card / Article" component
// (fileKey yWcYz9Nlr9VsyCiKc2HXu5, node 1510:452). Two layouts
// (Vertical: media on top full-width; Horizontal: media as a fixed-
// width self-stretch column on the left) times three sizes that
// control both container width AND title typography — confirmed via
// Figma's own generated code, not assumed:
//   - Small: title stays text-base (16px/24lh) semibold in BOTH layouts.
//   - Medium and Large: title switches to the "heading-3" mix used
//     everywhere else in this session (text-2xl/33px paired with a
//     36px line-height and -1.5px tracking) in BOTH layouts.
// Width/media-size table (all confirmed via get_design_context, not
// guessed):
//   Vertical:   Small w-240 media-h-128 | Medium w-320 media-h-180 | Large w-400 media-h-240
//   Horizontal: Small w-360 media-w-120 | Medium w-560 media-w-200 | Large w-760 media-w-288
// Disabled uses the 72%-opacity "base Card family" recipe (matching
// CardCourse, NOT CardMetric/CardAction/CardSales/CardProfile's 40%
// recipe) — confirmed via Figma's generated code for the Disabled
// state, which shows NO per-field text-disabled overrides at all
// (title/summary/author/action keep their normal colors; only the
// container's bg-surface-disabled + opacity-[0.72] does the dimming).
const verticalWidth: Record<'small' | 'medium' | 'large', number> = { small: 240, medium: 320, large: 400 }
const verticalMediaHeight: Record<'small' | 'medium' | 'large', number> = { small: 128, medium: 180, large: 240 }
const horizontalWidth: Record<'small' | 'medium' | 'large', number> = { small: 360, medium: 560, large: 760 }
const horizontalMediaWidth: Record<'small' | 'medium' | 'large', number> = { small: 120, medium: 200, large: 288 }

export interface CardArticleProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  category?: string
  summary?: string
  date?: string
  readingTime?: string
  author?: string
  action?: string
  media?: React.ReactNode
  layout?: 'vertical' | 'horizontal'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

export function CardArticle({
  className,
  title,
  category,
  summary,
  date,
  readingTime,
  author,
  action,
  media,
  layout = 'vertical',
  size = 'small',
  disabled,
  ...props
}: CardArticleProps) {
  const isHorizontal = layout === 'horizontal'
  const titleClass =
    size === 'small'
      ? 'text-base font-semibold'
      : 'text-2xl font-semibold leading-[36px] tracking-[-1.5px]'

  const content = (
    <div
      className={cn(
        'flex flex-col items-start gap-8 p-24',
        isHorizontal ? 'min-w-0 flex-1' : 'w-full',
      )}
    >
      {category && <p className="w-full text-xs font-medium tracking-[0.5px] text-brand-text">{category}</p>}
      <p className={cn('w-full text-text-primary', titleClass)}>{title}</p>
      {summary && <p className="w-full text-sm text-text-secondary">{summary}</p>}
      {(date || readingTime) && (
        <div className="flex w-full flex-wrap items-start gap-x-8 gap-y-4 text-sm">
          {date && <p className="text-text-primary">{date}</p>}
          {date && readingTime && <p className="text-text-secondary">·</p>}
          {readingTime && <p className="text-text-primary">{readingTime}</p>}
        </div>
      )}
      {author && <p className="w-full text-sm text-text-placeholder">{author}</p>}
      {action && <p className="w-full text-base font-semibold text-brand-text">{action}</p>}
    </div>
  )

  return (
    <div
      aria-disabled={disabled}
      className={cn(
        'flex overflow-hidden rounded-card border border-border bg-surface transition-colors',
        isHorizontal ? 'flex-row items-start' : 'flex-col items-start',
        !disabled &&
          'hover:bg-state-hover-brand focus-visible:border-2 focus-visible:border-border-focus focus-visible:bg-state-pressed-brand active:bg-state-pressed-brand focus-visible:outline-none',
        disabled && 'pointer-events-none bg-surface-disabled opacity-[0.72]',
        className,
      )}
      style={{ width: isHorizontal ? horizontalWidth[size] : verticalWidth[size] }}
      {...props}
    >
      {media &&
        (isHorizontal ? (
          <div className="shrink-0 self-stretch overflow-hidden" style={{ width: horizontalMediaWidth[size] }}>
            {media}
          </div>
        ) : (
          <div className="w-full shrink-0 overflow-hidden" style={{ height: verticalMediaHeight[size] }}>
            {media}
          </div>
        ))}
      {content}
    </div>
  )
}
