import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TextField } from './TextField'

describe('TextField', () => {
  it('renders a labeled input', () => {
    render(<TextField label="E-mail" />)
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument()
  })

  it('shows helper text when provided', () => {
    render(<TextField label="E-mail" helperText="Usamos só para contato" />)
    expect(screen.getByText('Usamos só para contato')).toBeInTheDocument()
  })

  it('applies error status classes and marks the input invalid', () => {
    render(<TextField label="E-mail" status="error" helperText="E-mail inválido" />)
    const input = screen.getByLabelText('E-mail')
    expect(input).toHaveClass('border-error-border')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('calls onChange when typing', async () => {
    const onChange = vi.fn()
    render(<TextField label="E-mail" onChange={onChange} />)
    await userEvent.type(screen.getByLabelText('E-mail'), 'a')
    expect(onChange).toHaveBeenCalled()
  })

  it('disables the input when disabled is set', () => {
    render(<TextField label="E-mail" disabled />)
    expect(screen.getByLabelText('E-mail')).toBeDisabled()
  })
})
