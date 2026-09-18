import * as React from 'react'
import * as RadixAvatar from 'radix-ui/avatar'
import { cn } from '../../lib/utils'
import { Icon } from '../../icons'

// Read directly from the real Figma "Avatar" (fileKey
// yWcYz9Nlr9VsyCiKc2HXu5, node 990:170 -> frame 990:170) and "Avatar
// Group" (node 1215:2 -> frame 1218:170) components. There are 5 real
// sizes (XS/Small/Medium/Large/XL = 24/32/40/56/72px), not 3, and
// Square uses radius-card, not a generic rounded-md.
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type AvatarShape = 'circle' | 'square'

const sizePx: Record<AvatarSize, number> = { xs: 24, sm: 32, md: 40, lg: 56, xl: 72 }
const dotPx: Record<AvatarSize, number> = { xs: 8, sm: 8, md: 10, lg: 10, xl: 12 }
const iconPx: Record<AvatarSize, number> = { xs: 14, sm: 16, md: 20, lg: 28, xl: 36 }
const initialsTextClass: Record<AvatarSize, string> = {
  xs: 'text-sm',
  sm: 'text-sm',
  md: 'text-base font-semibold',
  lg: 'text-base font-semibold',
  xl: 'text-2xl font-semibold',
}

export function avatarRadiusClass(shape: AvatarShape) {
  return shape === 'circle' ? 'rounded-avatar' : 'rounded-card'
}

export interface AvatarProps {
  src?: string
  alt: string
  initials?: string
  shape?: AvatarShape
  size?: AvatarSize
  showStatus?: boolean
  className?: string
}

export function Avatar({
  src,
  alt,
  initials,
  shape = 'circle',
  size = 'md',
  showStatus = false,
  className,
}: AvatarProps) {
  const px = sizePx[size]

  return (
    <span className={cn('relative inline-block', className)} style={{ width: px, height: px }}>
      <RadixAvatar.Root
        data-shape={shape}
        className={cn(
          'flex size-full items-center justify-center overflow-hidden border border-border',
          avatarRadiusClass(shape),
          initials ? 'bg-brand-bg-subtle text-brand-text' : 'bg-surface-disabled text-text-secondary',
        )}
      >
        {src && <RadixAvatar.Image src={src} alt={alt} className="size-full object-cover" />}
        <RadixAvatar.Fallback
          delayMs={src ? 300 : undefined}
          className={cn('flex items-center justify-center', initials && initialsTextClass[size])}
        >
          {/* Inline style, not a Tailwind class: icon sizes here (14/16/20/28/36px)
              don't match the Icon component's fixed sm/md/lg/xl token scale, and
              inline style safely overrides the default size class regardless. */}
          {initials ?? (
            <Icon name="User" aria-hidden style={{ width: iconPx[size], height: iconPx[size] }} />
          )}
        </RadixAvatar.Fallback>
      </RadixAvatar.Root>
      {showStatus && (
        <span
          className="absolute bottom-0 right-0 rounded-full border-2 border-surface bg-success-solid"
          style={{ width: dotPx[size], height: dotPx[size] }}
          aria-hidden
        />
      )}
    </span>
  )
}

export interface AvatarGroupProps {
  max?: number
  size?: 'sm' | 'md' | 'lg'
  shape?: AvatarShape
  children: React.ReactNode
}

const groupOverlapPx: Record<'sm' | 'md' | 'lg', number> = { sm: 8, md: 10, lg: 14 }
const groupOverflowPaddingPx: Record<'sm' | 'md' | 'lg', number> = { sm: 6, md: 7, lg: 10 }

export function AvatarGroup({ max = 5, size = 'sm', shape = 'circle', children }: AvatarGroupProps) {
  const items = React.Children.toArray(children)
  const visible = items.slice(0, max)
  const remaining = items.length - visible.length
  const px = sizePx[size]
  const overlap = groupOverlapPx[size]

  return (
    <div className="flex items-center">
      {visible.map((child, index) => (
        <div
          key={index}
          className={cn('shrink-0 border-2 border-surface', avatarRadiusClass(shape))}
          style={{ width: px, height: px, marginRight: -overlap }}
        >
          {child}
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            'flex shrink-0 items-center justify-center border-2 border-surface bg-brand-bg-subtle text-sm text-brand-text',
            avatarRadiusClass(shape),
          )}
          style={{ height: px, minWidth: px, paddingInline: groupOverflowPaddingPx[size] }}
        >
          +{remaining}
        </div>
      )}
    </div>
  )
}
