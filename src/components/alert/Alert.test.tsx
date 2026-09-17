import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Alert } from './Alert'

describe('Alert', () => {
  it('renders title and message', () => {
    render(<Alert title="Atenção" message="Verifique seus dados." />)
    expect(screen.getByText('Atenção')).toBeInTheDocument()
    expect(screen.getByText('Verifique seus dados.')).toBeInTheDocument()
  })

  it('defaults to the neutral status', () => {
    render(<Alert title="Atenção" message="Mensagem" />)
    expect(screen.getByRole('status')).toHaveClass('bg-surface')
  })

  it('applies the requested status', () => {
    render(<Alert title="Sucesso" message="Mensagem" status="success" />)
    expect(screen.getByRole('status')).toHaveClass('bg-success-bg-subtle')
  })

  it('calls onDismiss when the close button is clicked', async () => {
    const onDismiss = vi.fn()
    render(<Alert title="Atenção" message="Mensagem" onDismiss={onDismiss} />)
    await userEvent.click(screen.getByLabelText('Fechar'))
    expect(onDismiss).toHaveBeenCalledOnce()
  })

  it('calls onAction when the action link is clicked', async () => {
    const onAction = vi.fn()
    render(<Alert title="Atenção" message="Mensagem" onAction={onAction} actionLabel="Ver mais" />)
    await userEvent.click(screen.getByText('Ver mais'))
    expect(onAction).toHaveBeenCalledOnce()
  })
})
