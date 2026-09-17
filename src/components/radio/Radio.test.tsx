import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Radio } from './Radio'

describe('Radio', () => {
  it('renders a labeled radio', () => {
    render(<Radio label="Cartão de crédito" name="payment" />)
    expect(screen.getByLabelText('Cartão de crédito')).toBeInTheDocument()
  })

  it('is unchecked by default', () => {
    render(<Radio label="Cartão de crédito" name="payment" />)
    expect(screen.getByLabelText('Cartão de crédito')).not.toBeChecked()
  })

  it('only allows one radio checked per group', async () => {
    render(
      <>
        <Radio label="Cartão" name="payment" defaultChecked />
        <Radio label="Boleto" name="payment" />
      </>,
    )
    const boleto = screen.getByLabelText('Boleto')
    await userEvent.click(boleto)
    expect(boleto).toBeChecked()
    expect(screen.getByLabelText('Cartão')).not.toBeChecked()
  })

  it('does not call onChange when disabled', async () => {
    const onChange = vi.fn()
    render(<Radio label="Cartão" name="payment" onChange={onChange} disabled />)
    await userEvent.click(screen.getByLabelText('Cartão'))
    expect(onChange).not.toHaveBeenCalled()
  })
})
