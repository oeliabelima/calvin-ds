import * as React from 'react'
import { cn } from '../../lib/utils'

// Read directly from the real Figma "Radio" component (fileKey
// yWcYz9Nlr9VsyCiKc2HXu5, node 380:2 -> frame 384:52). Same 48px
// target / 40px halo structure as Checkbox, but the 24px control is
// always a circle (radius-avatar), and Checked renders as an outer
// brand-colored ring with a solid white inner dot rather than an icon.
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
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
        <span className="relative flex size-[48px] shrink-0 items-center justify-center">
          <input
            ref={ref}
            type="radio"
            id={inputId}
            checked={checked}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <span
            className={cn(
              'flex size-[40px] items-center justify-center rounded-avatar transition-colors',
              !disabled && 'group-hover:bg-state-hover-brand group-active:bg-state-pressed-brand',
              !disabled && 'peer-focus-visible:border-2 peer-focus-visible:border-border-focus peer-focus-visible:bg-state-pressed-brand',
            )}
          >
            <span
              className={cn(
                'flex size-[24px] items-center justify-center rounded-avatar border-2 bg-surface transition-colors',
                disabled
                  ? 'border-border-disabled bg-surface-disabled'
                  : checked
                    ? 'border-brand group-hover:border-brand-hover group-active:border-brand-active'
                    : 'border-border-strong',
              )}
            >
              {checked && (
                <span
                  className={cn(
                    'size-[10px] rounded-avatar',
                    disabled
                      ? 'bg-icon-disabled'
                      : 'bg-brand group-hover:bg-brand-hover group-active:bg-brand-active',
                  )}
                />
              )}
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
Radio.displayName = 'Radio'
