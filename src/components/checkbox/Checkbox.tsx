import * as React from 'react'
import { cn } from '../../lib/utils'
import { Icon } from '../../icons'

// Read directly from the real Figma "Checkbox" component (fileKey
// yWcYz9Nlr9VsyCiKc2HXu5, node 359:2 -> frame 365:12). 48px hit target,
// 40px hover/focus/pressed halo ("state layer"), 24px control square
// (radius-input, not radius-avatar — Checkbox's control is a
// rounded square, unlike Radio's circle).
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
  indeterminate?: boolean
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, indeterminate = false, checked, disabled, id, ...props }, ref) => {
    const inputId = id ?? React.useId()
    const innerRef = React.useRef<HTMLInputElement>(null)

    React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement)
    React.useEffect(() => {
      if (innerRef.current) innerRef.current.indeterminate = indeterminate
    }, [indeterminate])

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
            ref={innerRef}
            type="checkbox"
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
                'flex size-[24px] items-center justify-center rounded-input border-2 transition-colors',
                disabled
                  ? 'border-border-disabled bg-surface-disabled'
                  : checked || indeterminate
                    ? 'border-brand bg-brand group-hover:bg-brand-hover group-hover:border-brand-hover group-active:bg-brand-active group-active:border-brand-active'
                    : 'border-border-strong bg-surface',
              )}
            >
              {!disabled && indeterminate && <span className="h-[2px] w-[12px] rounded-full bg-icon-on-brand" />}
              {!disabled && !indeterminate && checked && (
                <Icon name="Check" weight="bold" aria-hidden style={{ width: 16, height: 16 }} className="text-text-on-brand" />
              )}
              {disabled && indeterminate && <span className="h-[2px] w-[12px] rounded-full bg-icon-disabled" />}
              {disabled && !indeterminate && checked && (
                <Icon name="Check" weight="bold" aria-hidden style={{ width: 16, height: 16 }} className="text-icon-disabled" />
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
Checkbox.displayName = 'Checkbox'
