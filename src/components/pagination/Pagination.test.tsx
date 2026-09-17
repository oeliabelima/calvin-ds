import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Pagination } from './Pagination'

describe('Pagination', () => {
  it('renders the current page as aria-current', () => {
    render(<Pagination page={3} totalPages={10} onPageChange={() => {}} />)
    expect(screen.getByRole('button', { name: '3' })).toHaveAttribute('aria-current', 'page')
  })

  it('disables the previous control on the first page', () => {
    render(<Pagination page={1} totalPages={10} onPageChange={() => {}} />)
    expect(screen.getByText('← Anterior')).toBeDisabled()
  })

  it('disables the next control on the last page', () => {
    render(<Pagination page={10} totalPages={10} onPageChange={() => {}} />)
    expect(screen.getByText('Próxima →')).toBeDisabled()
  })

  it('calls onPageChange with the clicked page', async () => {
    const onPageChange = vi.fn()
    render(<Pagination page={1} totalPages={5} onPageChange={onPageChange} />)
    await userEvent.click(screen.getByRole('button', { name: '2' }))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('shows an ellipsis when there is a gap between visible pages', () => {
    render(<Pagination page={1} totalPages={10} onPageChange={() => {}} />)
    expect(screen.getByText('…')).toBeInTheDocument()
  })
})
