import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CardAction } from './CardAction'

const baseProps = {
  eyebrow: 'Tarefas',
  title: 'Iniciar nova solicitação',
  description: 'Acesse rapidamente a próxima tarefa do seu fluxo.',
  action: 'Começar agora →',
}

describe('CardAction', () => {
  it('renders eyebrow, title, description, and action', () => {
    render(<CardAction {...baseProps} />)
    expect(screen.getByText('Tarefas')).toBeInTheDocument()
    expect(screen.getByText('Iniciar nova solicitação')).toBeInTheDocument()
    expect(screen.getByText('Acesse rapidamente a próxima tarefa do seu fluxo.')).toBeInTheDocument()
    expect(screen.getByText('Começar agora →')).toBeInTheDocument()
  })

  it('defaults to the vertical layout width', () => {
    const { container } = render(<CardAction {...baseProps} />)
    expect(container.firstChild).toHaveClass('w-[340px]')
  })

  it('applies the horizontal layout width and row direction', () => {
    const { container } = render(<CardAction {...baseProps} layout="horizontal" />)
    expect(container.firstChild).toHaveClass('w-[440px]')
    expect(container.firstChild).toHaveClass('flex-row')
  })

  it('renders the icon and chip slots when provided', () => {
    render(<CardAction {...baseProps} icon={<span>icon-slot</span>} chip={<span>chip-slot</span>} />)
    expect(screen.getByText('icon-slot')).toBeInTheDocument()
    expect(screen.getByText('chip-slot')).toBeInTheDocument()
  })

  it('drops brand color from eyebrow and action when disabled', () => {
    render(<CardAction {...baseProps} disabled />)
    expect(screen.getByText('Tarefas')).toHaveClass('text-text-disabled')
    expect(screen.getByText('Começar agora →')).toHaveClass('text-text-disabled')
    expect(screen.getByText('Tarefas')).not.toHaveClass('text-brand-text')
  })
})
