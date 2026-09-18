import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Icon, type IconName } from '../../icons'

// Read directly from the real Figma "Alert" component (node 553:2 ->
// frame 553:105). Status icons are outline/regular weight, not "fill"
// — the badge circle already provides the solid color, so a filled
// icon on top doubles up as a visible white disc (confirmed by
// comparing rendered output against get_screenshot on 553:33/553:15).
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

const statusBadgeClass: Record<'neutral' | 'success' | 'info' | 'warning' | 'error', string> = {
  neutral: 'bg-icon-primary',
  success: 'bg-success-solid',
  info: 'bg-info-solid',
  warning: 'bg-warning-solid',
  error: 'bg-error-solid',
}

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
        <span className={cn('flex shrink-0 items-center justify-center rounded-avatar p-4', statusBadgeClass[key])}>
          <Icon name={statusIcon[key]} aria-hidden className="text-icon-on-brand" style={{ width: 16, height: 16 }} />
        </span>
        <div className="flex flex-1 flex-col gap-4">
          <p className="text-base font-semibold">{title}</p>
          <p className="text-sm">{message}</p>
        </div>
        {isStacked && onDismiss && (
          <button type="button" onClick={onDismiss} aria-label="Fechar" className="shrink-0 text-[22px] font-normal leading-normal">
            ×
          </button>
        )}
      </div>
      <div className={cn('flex shrink-0 items-center gap-16', isStacked && 'pl-[36px]')}>
        {onAction && (
          <button type="button" onClick={onAction} className="text-sm font-semibold">
            {actionLabel}
          </button>
        )}
        {!isStacked && onDismiss && (
          <button type="button" onClick={onDismiss} aria-label="Fechar" className="text-[22px] font-normal leading-normal">
            ×
          </button>
        )}
      </div>
    </div>
  )
}
