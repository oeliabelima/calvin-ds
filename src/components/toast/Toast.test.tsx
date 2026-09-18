import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toast } from './Toast'

describe('Toast', () => {
  it('renders the message', () => {
    render(<Toast message="A atualização foi concluída." />)
    expect(screen.getByText('A atualização foi concluída.')).toBeInTheDocument()
  })

  it('defaults to the neutral status', () => {
    render(<Toast message="Mensagem" />)
    expect(screen.getByRole('status')).toHaveClass('bg-surface-raised')
  })

  it('applies the requested status', () => {
    render(<Toast message="Mensagem" status="error" />)
    expect(screen.getByRole('status')).toHaveClass('bg-error-bg-subtle')
  })

  it('calls onAction when the action link is clicked', async () => {
    const onAction = vi.fn()
    render(<Toast message="Mensagem" status="success" onAction={onAction} actionLabel="Ver mais" />)
    await userEvent.click(screen.getByText('Ver mais'))
    expect(onAction).toHaveBeenCalledOnce()
  })

  it('omits the action link when onAction is not provided, but always renders the close button', () => {
    render(<Toast message="Mensagem" status="success" />)
    expect(screen.queryByText('Acessar conteúdo')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Fechar' })).toBeInTheDocument()
  })

  it('calls onDismiss when the close button is clicked', async () => {
    const onDismiss = vi.fn()
    render(<Toast message="Mensagem" onDismiss={onDismiss} />)
    await userEvent.click(screen.getByRole('button', { name: 'Fechar' }))
    expect(onDismiss).toHaveBeenCalledOnce()
  })
})
