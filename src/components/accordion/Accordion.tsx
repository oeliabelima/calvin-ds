import * as React from 'react'
import { cn } from '../../lib/utils'
import { Icon } from '../../icons'

// Read directly from the real Figma "Accordion / Item" component (node
// 884:2 -> frame 887:1847).
export interface AccordionItemProps {
  value?: string
  eyebrow?: string
  title: string
  children: React.ReactNode
  // Optional here because an <AccordionItem> authored as a child of
  // <Accordion> never sets these directly — Accordion reads its props
  // and re-renders it with expanded/onToggle synthesized from `value`.
  expanded?: boolean
  onToggle?: () => void
  disabled?: boolean
  className?: string
}

export function AccordionItem({
  eyebrow,
  title,
  children,
  expanded = false,
  onToggle,
  disabled,
  className,
}: AccordionItemProps) {
  const contentId = React.useId()

  return (
    <div
      className={cn(
        'flex flex-col border-b border-border transition-colors',
        disabled && 'pointer-events-none bg-surface-disabled opacity-[0.72]',
        className,
      )}
    >
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={contentId}
        disabled={disabled}
        onClick={onToggle}
        className={cn(
          'flex min-h-[64px] w-full items-center justify-between gap-8 p-16 text-left border-2 border-transparent transition-colors',
          'focus-visible:outline-none focus-visible:border-regular focus-visible:border-border-focus focus-visible:bg-state-pressed-brand',
          !disabled && 'hover:bg-state-hover-brand',
        )}
      >
        <span className="flex flex-col gap-8">
          {eyebrow && (
            <span
              className={cn(
                'text-xs font-medium tracking-[0.5px]',
                disabled ? 'text-text-disabled' : 'text-text-secondary',
              )}
            >
              {eyebrow}
            </span>
          )}
          <span
            className={cn(
              'text-base font-semibold',
              disabled ? 'text-text-disabled' : expanded ? 'text-brand-text' : 'text-text-primary',
            )}
          >
            {title}
          </span>
        </span>
        <Icon
          name={expanded ? 'Minus' : 'Plus'}
          aria-hidden
          className={disabled ? 'text-icon-disabled' : 'text-icon-primary'}
          style={{ width: 20, height: 20 }}
        />
      </button>
      {expanded && (
        <div id={contentId} className="px-16 pb-16">
          <p className={cn('text-base', disabled ? 'text-text-disabled' : 'text-text-secondary')}>{children}</p>
        </div>
      )}
    </div>
  )
}

export interface AccordionProps {
  type?: 'single' | 'multiple'
  value: string[]
  onChange: (value: string[]) => void
  children: React.ReactElement<{ value: string } & Omit<AccordionItemProps, 'expanded' | 'onToggle'>>[]
  className?: string
}

export function Accordion({ type = 'single', value, onChange, children, className }: AccordionProps) {
  function toggle(itemValue: string) {
    const isOpen = value.includes(itemValue)
    if (type === 'single') {
      onChange(isOpen ? [] : [itemValue])
    } else {
      onChange(isOpen ? value.filter((v) => v !== itemValue) : [...value, itemValue])
    }
  }

  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        const { value: itemValue, ...rest } = child.props as { value: string } & Record<string, unknown>
        return (
          <AccordionItem
            {...(rest as Omit<AccordionItemProps, 'expanded' | 'onToggle'>)}
            expanded={value.includes(itemValue)}
            onToggle={() => toggle(itemValue)}
          />
        )
      })}
    </div>
  )
}
