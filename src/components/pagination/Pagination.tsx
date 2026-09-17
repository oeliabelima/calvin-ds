import * as React from 'react'
import { cn } from '../../lib/utils'

// Read directly from the real Figma "Pagination / Page" (node 665:3296)
// and "Pagination / Control" (node 665:3313) components.
export interface PaginationPageProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  current?: boolean
}

export function PaginationPage({ className, current, disabled, ...props }: PaginationPageProps) {
  return (
    <button
      type="button"
      aria-current={current ? 'page' : undefined}
      disabled={disabled}
      className={cn(
        'inline-flex size-[40px] items-center justify-center rounded-button border-2 border-transparent text-sm font-bold transition-colors',
        'focus-visible:outline-none focus-visible:border-regular focus-visible:border-border-focus',
        current
          ? 'bg-brand text-text-on-brand'
          : disabled
            ? 'pointer-events-none text-text-disabled'
            : 'text-text-link hover:bg-state-hover-brand hover:text-text-link-hover',
        className,
      )}
      {...props}
    />
  )
}

export interface PaginationControlProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction: 'previous' | 'next'
}

export function PaginationControl({ className, direction, disabled, children, ...props }: PaginationControlProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        'inline-flex h-[40px] items-center justify-center rounded-button border-2 border-transparent px-8 text-sm transition-colors',
        'focus-visible:outline-none focus-visible:border-regular focus-visible:border-border-focus',
        disabled
          ? 'pointer-events-none text-text-disabled'
          : 'text-text-link hover:bg-state-hover-brand hover:text-text-link-hover',
        className,
      )}
      {...props}
    >
      {children ?? (direction === 'previous' ? '← Anterior' : 'Próxima →')}
    </button>
  )
}

export interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

function getVisiblePages(page: number, totalPages: number): (number | 'ellipsis')[] {
  const pages = new Set<number>([1, totalPages, page, page - 1, page + 1])
  const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b)
  const result: (number | 'ellipsis')[] = []
  sorted.forEach((p, index) => {
    if (index > 0 && p - sorted[index - 1] > 1) result.push('ellipsis')
    result.push(p)
  })
  return result
}

export function Pagination({ page, totalPages, onPageChange, className }: PaginationProps) {
  const visible = getVisiblePages(page, totalPages)
  return (
    <nav aria-label="Paginação" className={cn('flex items-center gap-8', className)}>
      <PaginationControl direction="previous" disabled={page <= 1} onClick={() => onPageChange(page - 1)} />
      {visible.map((p, index) =>
        p === 'ellipsis' ? (
          <span key={`ellipsis-${index}`} className="text-sm text-text-secondary" aria-hidden>
            …
          </span>
        ) : (
          <PaginationPage key={p} current={p === page} onClick={() => onPageChange(p)}>
            {p}
          </PaginationPage>
        ),
      )}
      <PaginationControl direction="next" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} />
    </nav>
  )
}
