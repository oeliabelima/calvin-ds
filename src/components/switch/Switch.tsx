import * as React from 'react'
import { cn } from '../../lib/utils'

// Read directly from the real Figma "Switch" component (fileKey
// yWcYz9Nlr9VsyCiKc2HXu5, node 388:653 -> frame 391:56) plus
// get_variable_defs on the track nodes (the track itself is exported
// as a flattened vector, not decomposable classes): Off = surface bg +
// border-strong; On = brand bg + white thumb; Disabled (both) =
// surface-disabled bg + border-disabled + icon-disabled thumb. Thumb
// size/inset (24px, 4px inset) are standard proportions inferred from
// the confirmed 52x32 track — not independently confirmed pixel
// values, since Figma didn't expose the thumb as a separate node.
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, checked, disabled, id, ...props }, ref) => {
    const inputId = id ?? React.useId()

    return (
      <label
        htmlFor={inputId}
        className={cn(
          'group inline-flex items-center gap-8',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          className,
        )}
      >
        <span className="relative flex h-[48px] w-[52px] shrink-0 items-center justify-center">
          <input
            ref={ref}
            type="checkbox"
            role="switch"
            id={inputId}
            checked={checked}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <span
            className={cn(
              'flex h-[40px] w-[52px] items-center justify-center rounded-avatar transition-colors',
              !disabled && 'group-hover:bg-state-hover-brand group-active:bg-state-pressed-brand',
              !disabled && 'peer-focus-visible:border-2 peer-focus-visible:border-border-focus peer-focus-visible:bg-state-pressed-brand',
            )}
          >
            <span
              className={cn(
                'relative h-[32px] w-[52px] rounded-avatar border-2 transition-colors',
                disabled
                  ? 'border-border-disabled bg-surface-disabled'
                  : checked
                    ? 'border-brand bg-brand group-hover:bg-brand-hover group-hover:border-brand-hover group-active:bg-brand-active group-active:border-brand-active'
                    : 'border-border-strong bg-surface',
              )}
            >
              <span
                className={cn(
                  'absolute top-1/2 size-[24px] -translate-y-1/2 rounded-avatar transition-all',
                  checked ? 'left-[24px]' : 'left-[4px]',
                  disabled ? 'bg-icon-disabled' : checked ? 'bg-surface' : 'bg-border-strong',
                )}
              />
            </span>
          </span>
        </span>
        {label && (
          <span className={cn('text-base', disabled ? 'text-text-disabled' : 'text-text-primary')}>{label}</span>
        )}
      </label>
    )
  },
)
Switch.displayName = 'Switch'
