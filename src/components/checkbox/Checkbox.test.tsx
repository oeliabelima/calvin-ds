import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('renders a labeled checkbox', () => {
    render(<Checkbox label="Aceito os termos" />)
    expect(screen.getByLabelText('Aceito os termos')).toBeInTheDocument()
  })

  it('is unchecked by default', () => {
    render(<Checkbox label="Aceito os termos" />)
    expect(screen.getByLabelText('Aceito os termos')).not.toBeChecked()
  })

  it('calls onChange when clicked', async () => {
    const onChange = vi.fn()
    render(<Checkbox label="Aceito os termos" onChange={onChange} />)
    await userEvent.click(screen.getByLabelText('Aceito os termos'))
    expect(onChange).toHaveBeenCalled()
  })

  it('does not call onChange when disabled', async () => {
    const onChange = vi.fn()
    render(<Checkbox label="Aceito os termos" onChange={onChange} disabled />)
    await userEvent.click(screen.getByLabelText('Aceito os termos'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('sets the native indeterminate property', () => {
    render(<Checkbox label="Selecionar tudo" indeterminate />)
    expect(screen.getByLabelText('Selecionar tudo')).toHaveProperty('indeterminate', true)
  })
})
