import * as React from 'react'
import * as RadixAvatar from 'radix-ui/avatar'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const avatarSize = cva('inline-flex items-center justify-center overflow-hidden bg-surface-alt text-text-secondary font-medium', {
  variants: {
    size: {
      sm: 'size-8 text-xs',
      md: 'size-12 text-sm',
      lg: 'size-16 text-base',
    },
    shape: {
      circle: 'rounded-avatar',
      square: 'rounded-md',
    },
  },
  defaultVariants: { size: 'md', shape: 'circle' },
})

export interface AvatarProps extends VariantProps<typeof avatarSize> {
  src?: string
  alt: string
  initials?: string
}

export function Avatar({ src, alt, initials, size, shape = 'circle' }: AvatarProps) {
  return (
    <RadixAvatar.Root
      data-shape={shape}
      className={cn(avatarSize({ size, shape }))}
    >
      {src && <RadixAvatar.Image src={src} alt={alt} className="h-full w-full object-cover" />}
      <RadixAvatar.Fallback delayMs={src ? 300 : undefined}>{initials}</RadixAvatar.Fallback>
    </RadixAvatar.Root>
  )
}

export interface AvatarGroupProps {
  max?: number
  children: React.ReactNode
}

export function AvatarGroup({ max = 5, children }: AvatarGroupProps) {
  const items = React.Children.toArray(children)
  const visible = items.slice(0, max)
  const remaining = items.length - visible.length

  return (
    <div className="flex -space-x-8">
      {visible.map((child, index) => (
        <div key={index} className="ring-2 ring-surface rounded-avatar">
          {child}
        </div>
      ))}
      {remaining > 0 && (
        <div className={cn(avatarSize({ size: 'md', shape: 'circle' }), 'ring-2 ring-surface')}>
          +{remaining}
        </div>
      )}
    </div>
  )
}
