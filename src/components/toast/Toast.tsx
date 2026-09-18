import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Icon, type IconName } from '../../icons'

// Read directly from the real Figma "Toast" component (node 554:2 ->
// frame 554:50, single-instance frame 554:26 for the exact Success
// screenshot). Two details only get-variable-defs revealed, not the
// screenshot alone: the close (X) icon always uses the status's
// "-solid" token (not "-text" — they only coincide for Success), and
// the trailing action-link arrow is always brand red regardless of
// status, while the action label text stays status-colored.
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
          weight="fill"
          aria-hidden
          className={cn('shrink-0', statusSolidClass[key])}
          style={{ width: 20, height: 20 }}
        />
      )}
      <div className="flex flex-1 flex-col gap-8">
        <div className="flex items-start gap-[12px]">
          <p className="flex-1 text-sm">{message}</p>
          <button type="button" onClick={onDismiss} aria-label="Fechar" className="shrink-0">
            <Icon name="X" aria-hidden className={statusSolidClass[key]} style={{ width: 20, height: 20 }} />
          </button>
        </div>
        {hasStatusIcon && onAction && (
          <button type="button" onClick={onAction} className="flex items-center gap-4 self-start text-sm font-bold">
            {actionLabel}
            <Icon name="ArrowUpRight" aria-hidden className="text-brand" style={{ width: 20, height: 20 }} />
          </button>
        )}
      </div>
    </div>
  )
}
