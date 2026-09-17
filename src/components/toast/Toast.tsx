import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Icon, type IconName } from '../../icons'

// Read directly from the real Figma "Toast" component (node 554:2 ->
// frame 554:50).
const toastVariants = cva('flex w-[400px] gap-12 rounded-card p-16 shadow-[0px_4px_6px_var(--color-shadow-3)]', {
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

export interface ToastProps extends VariantProps<typeof toastVariants> {
  message: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function Toast({ status = 'neutral', message, actionLabel = 'Acessar conteúdo', onAction, className }: ToastProps) {
  const key = status ?? 'neutral'

  return (
    <div className={cn(toastVariants({ status }), className)} role="status">
      {key !== 'neutral' && (
        <Icon name={statusIcon[key]} weight="fill" aria-hidden className="shrink-0" style={{ width: 20, height: 20 }} />
      )}
      <div className={cn('flex flex-1 flex-col', key !== 'neutral' && 'gap-8')}>
        <p className="text-sm">{message}</p>
        {onAction && (
          <button type="button" onClick={onAction} className="flex items-center gap-4 self-start text-sm font-bold">
            {actionLabel}
            <Icon name="ArrowUpRight" aria-hidden style={{ width: 16, height: 16 }} />
          </button>
        )}
      </div>
    </div>
  )
}
