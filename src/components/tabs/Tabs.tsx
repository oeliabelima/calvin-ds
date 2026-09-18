import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

// Read directly from the real Figma "Tabs / Item" component (node
// 656:2 -> frame 657:3274). Known simplification: this is a
// controlled-composition wrapper (value/onChange), not a full
// roving-tabindex keyboard implementation (arrow-key navigation
// between tabs isn't implemented) — flagged here rather than silently
// left out.
const tabsItemVariants = cva(
  'relative inline-flex items-center justify-center whitespace-nowrap px-16 text-base font-semibold border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:border-regular focus-visible:border-border-focus',
  {
    variants: {
      size: {
        md: 'h-[40px]',
        lg: 'h-[48px]',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

export interface TabsItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof tabsItemVariants> {
  value: string
  selected?: boolean
  disabled?: boolean
}

export function TabsItem({ className, size, selected = false, disabled = false, value, ...props }: TabsItemProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      disabled={disabled}
      data-value={value}
      className={cn(
        tabsItemVariants({ size }),
        selected ? 'text-brand-text' : 'text-text-secondary hover:text-text-primary',
        disabled && 'pointer-events-none text-text-disabled',
        className,
      )}
      {...props}
    >
      {props.children}
      {selected && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-brand" />}
    </button>
  )
}

export interface TabsProps {
  value: string
  onChange: (value: string) => void
  size?: 'md' | 'lg'
  children: React.ReactElement<TabsItemProps> | React.ReactElement<TabsItemProps>[]
  className?: string
}

export function Tabs({ value, onChange, size = 'md', children, className }: TabsProps) {
  return (
    <div role="tablist" className={cn('flex items-center overflow-x-auto', className)}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          size: child.props.size ?? size,
          selected: child.props.value === value,
          onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
            child.props.onClick?.(event)
            onChange(child.props.value)
          },
        }),
      )}
    </div>
  )
}
