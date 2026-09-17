import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Icon, type IconName } from '../../icons'

// Read directly from the real Figma "Text Field / Default" component
// (fileKey yWcYz9Nlr9VsyCiKc2HXu5, node 331:12 -> frame 334:229). Only
// Medium/Large sizes exist (48px/56px) — there is no "sm". "Typing" in
// Figma is visually identical to Focus+filled, so it needs no separate
// CSS state here; :focus-visible already covers it.
export const textFieldVariants = cva(
  'w-full rounded-input border bg-surface-sunken px-16 text-base text-text-primary placeholder:text-text-placeholder transition-colors focus-visible:outline-none focus-visible:border-regular focus-visible:border-border-focus disabled:pointer-events-none disabled:bg-surface-disabled disabled:border-border-disabled disabled:text-text-disabled disabled:placeholder:text-text-disabled',
  {
    variants: {
      size: {
        md: 'h-[48px]',
        lg: 'h-[56px]',
      },
      status: {
        neutral: 'border-border hover:border-border-strong',
        success: 'bg-success-bg-subtle border-success-border',
        info: 'bg-info-bg-subtle border-info-border',
        warning: 'bg-warning-bg-subtle border-warning-border',
        error: 'bg-error-bg-subtle border-error-border',
      },
    },
    defaultVariants: { size: 'md', status: 'neutral' },
  },
)

const helperTextClass = cva('mt-4 text-sm', {
  variants: {
    status: {
      neutral: 'text-text-secondary',
      success: 'text-success-text',
      info: 'text-info-text',
      warning: 'text-warning-text',
      error: 'text-error-text',
    },
  },
  defaultVariants: { status: 'neutral' },
})

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof textFieldVariants> {
  label: string
  helperText?: string
  leadingIcon?: IconName
  trailingIcon?: IconName
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    { className, label, size = 'md', status = 'neutral', helperText, leadingIcon, trailingIcon, id, disabled, ...props },
    ref,
  ) => {
    const inputId = id ?? React.useId()
    const helperId = helperText ? `${inputId}-helper` : undefined
    const iconSize = size === 'lg' ? 'lg' : 'md'

    return (
      <div className="flex flex-col gap-8">
        <label
          htmlFor={inputId}
          className={cn(
            'text-xs font-medium tracking-[0.5px]',
            disabled ? 'text-text-disabled' : 'text-text-primary',
          )}
        >
          {label}
        </label>
        <div
          className={cn(
            textFieldVariants({ size, status, className }),
            'flex items-center gap-8',
          )}
        >
          {leadingIcon && <Icon name={leadingIcon} size={iconSize} aria-hidden className="shrink-0" />}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={status === 'error'}
            aria-describedby={helperId}
            className="w-full min-w-0 flex-1 bg-transparent text-base text-inherit placeholder:text-text-placeholder outline-none disabled:cursor-not-allowed"
            {...props}
          />
          {trailingIcon && <Icon name={trailingIcon} size={iconSize} aria-hidden className="shrink-0" />}
        </div>
        {helperText && (
          <span id={helperId} className={cn(helperTextClass({ status }), disabled && 'text-text-disabled')}>
            {helperText}
          </span>
        )}
      </div>
    )
  },
)
TextField.displayName = 'TextField'
