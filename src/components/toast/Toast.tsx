import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Icon, type IconName } from '../../icons'

// Read directly from the real Figma "Toast" component (node 554:2 ->
// frame 554:50, single-instance frame 554:26 for the exact Success
// screenshot, re-verified 2026-09-18 after the designer updated the
// Figma file). Status icons use the outline/regular weight (not
// "fill") — Figma renders them hollow, not as a solid disc — and both
// the close (X) icon and the action-link arrow use the status's
// "-solid" token (not "-text" — they only coincide for Success).
const toastVariants = cva('flex w-[400px] items-start gap-[12px] rounded-card p-16 shadow-[0px_4px_12px_-2px_var(--color-shadow-3)]', {
  variants: {
    status: {
      neutral: 'bg-surface-raised text-text-primary',
      success: 'bg-success-bg-subtle text-success-text',
      info: 'bg-info-bg-subtle text-info-text',
      warning: 'bg-warning-bg-subtle text-warning-text',
      error: 'bg-error-bg-subtle text-error-text',
    },
  },
  defaultVariants: { status: 'neutral' },
})

const statusIcon: Record<'success' | 'info' | 'warning' | 'error', IconName> = {
  success: 'CheckCircle',
  info: 'Info',
  warning: 'WarningCircle',
  error: 'XCircle',
}

const statusSolidClass: Record<'neutral' | 'success' | 'info' | 'warning' | 'error', string> = {
  neutral: 'text-icon-primary',
  success: 'text-success-solid',
  info: 'text-info-solid',
  warning: 'text-warning-solid',
  error: 'text-error-solid',
}

// Same interaction language as Alert: the action link underlines on
// hover/focus/active per the real "Link / Standalone" Figma states
// (node 603:45), and the close button gets the library-wide
// border-2/focus-visible:border-border-focus treatment plus a neutral
// circular hover/pressed backdrop.
const actionLinkClass =
  'flex items-center gap-4 self-start rounded-xs border-2 border-transparent text-sm font-bold underline-offset-2 hover:underline focus-visible:underline focus-visible:outline-none focus-visible:border-border-focus active:underline'
const closeButtonClass =
  'flex size-[24px] shrink-0 items-center justify-center rounded-full border-2 border-transparent hover:bg-state-hover focus-visible:outline-none focus-visible:border-border-focus active:bg-state-pressed'

export interface ToastProps extends VariantProps<typeof toastVariants> {
  message: string
  actionLabel?: string
  onAction?: () => void
  onDismiss?: () => void
  className?: string
}

export function Toast({
  status = 'neutral',
  message,
  actionLabel = 'Acessar conteúdo',
  onAction,
  onDismiss,
  className,
}: ToastProps) {
  const key = status ?? 'neutral'
  const hasStatusIcon = key !== 'neutral'

  return (
    <div className={cn(toastVariants({ status }), className)} role="status">
      {hasStatusIcon && (
        <Icon
          name={statusIcon[key]}
          aria-hidden
          className={cn('shrink-0', statusSolidClass[key])}
          style={{ width: 20, height: 20 }}
        />
      )}
      <div className="flex flex-1 flex-col gap-8">
        <div className="flex items-start gap-[12px]">
          <p className="flex-1 text-sm">{message}</p>
          <button type="button" onClick={onDismiss} aria-label="Fechar" className={closeButtonClass}>
            <Icon name="X" aria-hidden className={statusSolidClass[key]} style={{ width: 20, height: 20 }} />
          </button>
        </div>
        {hasStatusIcon && onAction && (
          <button type="button" onClick={onAction} className={actionLinkClass}>
            {actionLabel}
            <Icon name="ArrowUpRight" aria-hidden className={statusSolidClass[key]} style={{ width: 20, height: 20 }} />
          </button>
        )}
      </div>
    </div>
  )
}
