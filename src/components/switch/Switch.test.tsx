import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Switch } from './Switch'

describe('Switch', () => {
  it('renders a labeled switch', () => {
    render(<Switch label="Notificações por e-mail" />)
    expect(screen.getByLabelText('Notificações por e-mail')).toBeInTheDocument()
  })

  it('exposes the switch role', () => {
    render(<Switch label="Notificações por e-mail" />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('is off by default', () => {
    render(<Switch label="Notificações por e-mail" />)
    expect(screen.getByRole('switch')).not.toBeChecked()
  })

  it('calls onChange when clicked', async () => {
    const onChange = vi.fn()
    render(<Switch label="Notificações por e-mail" onChange={onChange} />)
    await userEvent.click(screen.getByRole('switch'))
    expect(onChange).toHaveBeenCalled()
  })

  it('does not call onChange when disabled', async () => {
    const onChange = vi.fn()
    render(<Switch label="Notificações por e-mail" onChange={onChange} disabled />)
    await userEvent.click(screen.getByRole('switch'))
    expect(onChange).not.toHaveBeenCalled()
  })
})
