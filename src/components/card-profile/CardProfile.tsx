import * as React from 'react'
import { cn } from '../../lib/utils'

// Read directly from the real Figma "Card / Profile" component
// (fileKey yWcYz9Nlr9VsyCiKc2HXu5, node 1005:308). Three layouts:
// Vertical (w-340, avatar centered on top, text-centered content
// below), Horizontal (w-520, avatar left + content flex-1, left-
// aligned, NOT centered), and Feature (w-520, no card-level padding,
// edge-to-edge 3:4 photo on the left at w-[195px] h-full, content
// flex-1 with its own p-24 and vertically centered via
// justify-center). `avatar` is a consumer-controlled slot used by
// Vertical/Horizontal (Figma's "Media=Initials" vs "Media=Photo" are
// both just whatever the consumer puts in this slot — e.g. an
// <Avatar initials=".."/> or <Avatar src=".."/> — never derived
// internally). `photo` is a separate slot only used by Feature, since
// Feature's edge-to-edge rectangular treatment is structurally
// different from the circular avatar treatment, not just a differently
// filled circle. Both slots get a `grayscale` filter when disabled —
// same fix as CardAction's icon: a consumer-controlled slot's own
// explicit color (e.g. Avatar's brand-red initials) is set directly on
// its elements and wins over the card's opacity dimming alone, so a
// filter is needed to force it visually neutral. Title reuses the same
// "heading-3" mix already found
// in every other new card this session: text-2xl (33px) paired with a
// 36px line-height and -1.5px tracking. Disabled uses the 40%-opacity
// recipe (bg-surface-disabled + opacity-40 + text-disabled per field),
// confirmed via Figma's generated code for the Vertical/Disabled
// variant — NOT the 72%-opacity recipe CardCourse uses.
export interface CardProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  role: string
  description?: string
  contacts?: string[]
  action?: string
  avatar?: React.ReactNode
  photo?: React.ReactNode
  layout?: 'vertical' | 'horizontal' | 'feature'
  disabled?: boolean
}

export function CardProfile({
  className,
  name,
  role,
  description,
  contacts,
  action,
  avatar,
  photo,
  layout = 'vertical',
  disabled,
  ...props
}: CardProfileProps) {
  const isHorizontal = layout === 'horizontal'
  const isFeature = layout === 'feature'

  const content = (
    <div
      className={cn(
        'flex w-full flex-col items-start gap-8',
        isHorizontal && 'min-w-0 flex-1',
        !isHorizontal && !isFeature && 'text-center',
      )}
    >
      <p
        className={cn(
          'w-full text-2xl font-semibold leading-[36px] tracking-[-1.5px]',
          disabled ? 'text-text-disabled' : 'text-text-primary',
        )}
      >
        {name}
      </p>
      <p
        className={cn(
          'w-full text-xs font-medium tracking-[0.5px]',
          disabled ? 'text-text-disabled' : 'text-brand-text',
        )}
      >
        {role}
      </p>
      {description && (
        <p className={cn('w-full text-sm', disabled ? 'text-text-disabled' : 'text-text-secondary')}>
          {description}
        </p>
      )}
      {contacts && contacts.length > 0 && (
        <div className={cn('w-full text-sm', disabled ? 'text-text-disabled' : 'text-text-secondary')}>
          {contacts.map((contact) => (
            <p key={contact}>{contact}</p>
          ))}
        </div>
      )}
      {action && (
        <p
          className={cn(
            'w-full text-base font-semibold',
            disabled ? 'text-text-disabled' : 'text-brand-text',
          )}
        >
          {action}
        </p>
      )}
    </div>
  )

  if (isFeature) {
    return (
      <div
        aria-disabled={disabled}
        className={cn(
          'flex w-[520px] items-center overflow-hidden rounded-card border border-border bg-surface transition-colors',
          !disabled &&
            'hover:bg-state-hover-brand focus-visible:border-2 focus-visible:border-border-focus focus-visible:bg-state-pressed-brand active:bg-state-pressed-brand focus-visible:outline-none',
          disabled && 'pointer-events-none bg-surface-disabled opacity-40',
          className,
        )}
        {...props}
      >
        {photo && (
          <div className={cn('h-full w-[195px] shrink-0 self-stretch overflow-hidden', disabled && 'grayscale')}>
            {photo}
          </div>
        )}
        <div className="flex flex-1 flex-col items-start justify-center gap-8 p-24">{content}</div>
      </div>
    )
  }

  return (
    <div
      aria-disabled={disabled}
      className={cn(
        'flex overflow-hidden rounded-card border border-border bg-surface p-24 transition-colors',
        isHorizontal ? 'w-[520px] flex-row items-start gap-[20px]' : 'w-[340px] flex-col items-center gap-[20px]',
        !disabled &&
          'hover:bg-state-hover-brand focus-visible:border-2 focus-visible:border-border-focus focus-visible:bg-state-pressed-brand active:bg-state-pressed-brand focus-visible:outline-none',
        disabled && 'pointer-events-none bg-surface-disabled opacity-40',
        className,
      )}
      {...props}
    >
      {avatar && <div className={cn('shrink-0', disabled && 'grayscale')}>{avatar}</div>}
      {content}
    </div>
  )
}
