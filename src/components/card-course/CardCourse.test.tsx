import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CardCourse } from './CardCourse'

describe('CardCourse', () => {
  it('renders the title', () => {
    render(<CardCourse title="Uma experiência com mais contexto" />)
    expect(screen.getByText('Uma experiência com mais contexto')).toBeInTheDocument()
  })

  it('omits optional fields when not provided', () => {
    render(<CardCourse title="Título" />)
    expect(screen.queryByText('MACKENZIE · EXPERIÊNCIA')).not.toBeInTheDocument()
  })

  it('renders eyebrow, description, meta, and action when provided', () => {
    render(
      <CardCourse
        title="Título"
        eyebrow="MACKENZIE · EXPERIÊNCIA"
        description="Descrição do curso."
        meta="5 min de leitura"
        action="Conhecer conteúdo"
      />,
    )
    expect(screen.getByText('MACKENZIE · EXPERIÊNCIA')).toBeInTheDocument()
    expect(screen.getByText('Descrição do curso.')).toBeInTheDocument()
    expect(screen.getByText('5 min de leitura')).toBeInTheDocument()
    expect(screen.getByText('Conhecer conteúdo')).toBeInTheDocument()
  })

  it('renders the media slot when provided', () => {
    render(<CardCourse title="Título" media={<img alt="capa" src="https://placehold.co/360x200" />} />)
    expect(screen.getByAltText('capa')).toBeInTheDocument()
  })

  it('renders the classification slot when provided', () => {
    render(<CardCourse title="Título" classification={<span>classification-slot</span>} />)
    expect(screen.getByText('classification-slot')).toBeInTheDocument()
  })

  it('uses the 0.72 opacity + text-disabled recipe when disabled (matching the base Card, not the 40% recipe)', () => {
    const { container } = render(
      <CardCourse title="Título" eyebrow="Eyebrow" action="Ação" disabled />,
    )
    expect(container.firstChild).toHaveClass('opacity-[0.72]')
    expect(container.firstChild).toHaveClass('bg-surface-disabled')
    expect(screen.getByText('Eyebrow')).toHaveClass('text-text-disabled')
    expect(screen.getByText('Ação')).toHaveClass('text-text-disabled')
  })
})
