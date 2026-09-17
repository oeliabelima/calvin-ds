import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Salvar</Button>)
    expect(screen.getByRole('button', { name: 'Salvar' })).toBeInTheDocument()
  })

  it('defaults to the primary variant', () => {
    render(<Button>Salvar</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-brand')
  })

  it('applies danger variant classes', () => {
    render(<Button variant="danger">Excluir</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-error-solid')
  })

  it('applies ghost variant classes', () => {
    render(<Button variant="ghost">Cancelar</Button>)
    const button = screen.getByRole('button')
    expect(button).not.toHaveClass('bg-brand')
    expect(button).not.toHaveClass('border')
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Salvar</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn()
    render(
      <Button onClick={onClick} disabled>
        Salvar
      </Button>,
    )
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('renders a left icon when iconLeft is set', () => {
    render(<Button iconLeft="Plus">Adicionar</Button>)
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument()
  })
})
