import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Icon, type IconName } from '../../icons'

// Read directly from the real Figma "Alert" component (node 553:2 ->
// frame 553:105), re-verified 2026-09-18 after the designer removed
// the solid-color badge background: the status icon now sits directly
// on the alert's own background, at 24px (not 16px), colored with the
// status's "-solid" token (confirmed via get_variable_defs on
// 544:3308/544:3371/544:3301 — same token family the close button
// already used). Status icons are outline/regular weight, not "fill".
const alertVariants = cva('flex gap-16 rounded-[12px] border px-[20px] py-16', {
  variants: {
    status: {
      neutral: 'bg-surface border-border text-icon-primary',
      success: 'bg-success-bg-subtle border-success-border text-success-text',
      info: 'bg-info-bg-subtle border-info-border text-info-text',
      warning: 'bg-warning-bg-subtle border-warning-border text-warning-text',
      error: 'bg-error-bg-subtle border-error-border text-error-text',
    },
    layout: {
      inline: 'w-[720px] items-center',
      stacked: 'w-[480px] flex-col items-start',
    },
  },
  defaultVariants: { status: 'neutral', layout: 'inline' },
})

const statusIcon: Record<'neutral' | 'success' | 'info' | 'warning' | 'error', IconName> = {
  neutral: 'Info',
  success: 'CheckCircle',
  info: 'Info',
  warning: 'WarningCircle',
  error: 'XCircle',
}

const statusIconClass: Record<'neutral' | 'success' | 'info' | 'warning' | 'error', string> = {
  neutral: 'text-icon-primary',
  success: 'text-success-solid',
  info: 'text-info-solid',
  warning: 'text-warning-solid',
  error: 'text-error-solid',
}

// "Ver detalhes" reuses the real Figma "Link / Standalone" states
// (node 603:45): underlined on hover/focus/active, not by default.
// The close "×" has no dedicated Figma states component, so it gets
// the same border-2/focus-visible:border-border-focus treatment used
// by every other interactive element in this library (Button,
// IconButton, Checkbox, ...), plus a neutral circular hover/pressed
// backdrop since Alert's background color varies per status.
const actionLinkClass =
  'rounded-xs border-2 border-transparent text-sm font-semibold underline-offset-2 hover:underline focus-visible:underline focus-visible:outline-none focus-visible:border-border-focus active:underline'
const closeButtonClass =
  'flex size-[24px] shrink-0 items-center justify-center rounded-full border-2 border-transparent text-[22px] font-normal hover:bg-state-hover focus-visible:outline-none focus-visible:border-border-focus active:bg-state-pressed'

export interface AlertProps extends VariantProps<typeof alertVariants> {
  title: string
  message: string
  actionLabel?: string
  onAction?: () => void
  onDismiss?: () => void
  className?: string
}

export function Alert({
  status = 'neutral',
  layout = 'inline',
  title,
  message,
  actionLabel = 'Ver detalhes',
  onAction,
  onDismiss,
  className,
}: AlertProps) {
  const key = status ?? 'neutral'
  const isStacked = layout === 'stacked'

  return (
    <div className={cn(alertVariants({ status, layout }), className)} role="status">
      <div className={cn('flex gap-[12px]', isStacked ? 'w-full items-start' : 'flex-1 items-center')}>
        <span className="flex shrink-0 items-center justify-center p-4">
          <Icon name={statusIcon[key]} aria-hidden className={statusIconClass[key]} style={{ width: 24, height: 24 }} />
        </span>
        <div className="flex flex-1 flex-col gap-4">
          <p className="text-base font-semibold">{title}</p>
          <p className="text-sm">{message}</p>
        </div>
        {isStacked && onDismiss && (
          <button type="button" onClick={onDismiss} aria-label="Fechar" className={cn('shrink-0', closeButtonClass)}>
            ×
          </button>
        )}
      </div>
      <div className={cn('flex shrink-0 items-center gap-16', isStacked && 'pl-[36px]')}>
        {onAction && (
          <button type="button" onClick={onAction} className={actionLinkClass}>
            {actionLabel}
          </button>
        )}
        {!isStacked && onDismiss && (
          <button type="button" onClick={onDismiss} aria-label="Fechar" className={closeButtonClass}>
            ×
          </button>
        )}
      </div>
    </div>
  )
}
