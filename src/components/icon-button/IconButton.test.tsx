import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IconButton } from './IconButton'

describe('IconButton', () => {
  it('requires an accessible name via aria-label', () => {
    render(<IconButton icon="Trash" aria-label="Excluir item" />)
    expect(screen.getByRole('button', { name: 'Excluir item' })).toBeInTheDocument()
  })

  it('renders the requested icon', () => {
    render(<IconButton icon="Trash" aria-label="Excluir item" />)
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument()
  })

  it('defaults to the primary variant', () => {
    render(<IconButton icon="Trash" aria-label="Excluir item" />)
    expect(screen.getByRole('button')).toHaveClass('bg-brand')
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    render(<IconButton icon="Trash" aria-label="Excluir item" onClick={onClick} />)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn()
    render(<IconButton icon="Trash" aria-label="Excluir item" onClick={onClick} disabled />)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })
})
