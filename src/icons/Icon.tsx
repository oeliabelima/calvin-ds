import * as Phosphor from '@phosphor-icons/react'
import { cn } from '../lib/utils'

export type IconName = keyof typeof Phosphor extends infer K
  ? K extends `${string}Icon` | 'Icon' | 'IconContext' | 'IconBase' | 'IconProps' | 'IconWeight'
    ? never
    : K
  : never

export type IconSize = 'sm' | 'md' | 'lg' | 'xl'

const sizeClass: Record<IconSize, string> = {
  sm: 'size-icon-sm',
  md: 'size-icon-md',
  lg: 'size-icon-lg',
  xl: 'size-icon-xl',
}

export interface IconProps extends Omit<Phosphor.IconProps, 'size'> {
  name: IconName
  size?: IconSize
}

export function Icon({ name, size = 'md', weight = 'regular', className, ...props }: IconProps) {
  const Component = Phosphor[name] as Phosphor.Icon
  return (
    <Component
      weight={weight}
      className={cn(sizeClass[size], className)}
      {...props}
    />
  )
}
