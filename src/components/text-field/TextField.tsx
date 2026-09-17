import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const inputStatusClass = cva(
  'w-full h-12 rounded-input border bg-surface px-16 text-base text-text-primary placeholder:text-text-placeholder transition-colors focus-visible:outline-none focus-visible:border-border-focus disabled:opacity-disabled disabled:pointer-events-none',
  {
    variants: {
      status: {
        neutral: 'border-border',
        success: 'border-success-border',
        info: 'border-info-border',
        warning: 'border-warning-border',
        error: 'border-error-border',
      },
    },
    defaultVariants: { status: 'neutral' },
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

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  status?: 'neutral' | 'success' | 'info' | 'warning' | 'error'
  helperText?: string
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, label, status = 'neutral', helperText, id, ...props }, ref) => {
    const inputId = id ?? React.useId()
    const helperId = helperText ? `${inputId}-helper` : undefined

    return (
      <div className="flex flex-col">
        <label htmlFor={inputId} className="mb-8 text-sm font-medium text-text-primary">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={status === 'error'}
          aria-describedby={helperId}
          className={cn(inputStatusClass({ status, className }))}
          {...props}
        />
        {helperText && (
          <span id={helperId} className={helperTextClass({ status })}>
            {helperText}
          </span>
        )}
      </div>
    )
  },
)
TextField.displayName = 'TextField'
