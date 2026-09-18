import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AccordionItem } from './Accordion'

describe('AccordionItem', () => {
  it('renders the title', () => {
    render(
      <AccordionItem title="Como acompanho minha matrícula?" expanded={false} onToggle={() => {}}>
        Resposta
      </AccordionItem>,
    )
    expect(screen.getByText('Como acompanho minha matrícula?')).toBeInTheDocument()
  })

  it('hides the body when collapsed', () => {
    render(
      <AccordionItem title="Pergunta" expanded={false} onToggle={() => {}}>
        Resposta oculta
      </AccordionItem>,
    )
    expect(screen.queryByText('Resposta oculta')).not.toBeInTheDocument()
  })

  it('shows the body when expanded', () => {
    render(
      <AccordionItem title="Pergunta" expanded onToggle={() => {}}>
        Resposta visível
      </AccordionItem>,
    )
    expect(screen.getByText('Resposta visível')).toBeInTheDocument()
  })

  it('sets aria-expanded to match the expanded prop', () => {
    render(
      <AccordionItem title="Pergunta" expanded onToggle={() => {}}>
        Resposta
      </AccordionItem>,
    )
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
  })

  it('calls onToggle when clicked', async () => {
    const onToggle = vi.fn()
    render(
      <AccordionItem title="Pergunta" expanded={false} onToggle={onToggle}>
        Resposta
      </AccordionItem>,
    )
    await userEvent.click(screen.getByRole('button'))
    expect(onToggle).toHaveBeenCalledOnce()
  })

  it('does not call onToggle when disabled', async () => {
    const onToggle = vi.fn()
    render(
      <AccordionItem title="Pergunta" expanded={false} onToggle={onToggle} disabled>
        Resposta
      </AccordionItem>,
    )
    await userEvent.click(screen.getByRole('button'))
    expect(onToggle).not.toHaveBeenCalled()
  })
})
