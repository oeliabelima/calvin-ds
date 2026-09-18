import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CardArticle } from './CardArticle'

describe('CardArticle', () => {
  it('renders the title', () => {
    render(<CardArticle title="Pesquisa transforma a experiência universitária" />)
    expect(screen.getByText('Pesquisa transforma a experiência universitária')).toBeInTheDocument()
  })

  it('uses text-base for small size and the heading-3 mix for medium/large', () => {
    render(<CardArticle title="Título pequeno" size="small" />)
    expect(screen.getByText('Título pequeno')).toHaveClass('text-base')

    render(<CardArticle title="Título médio" size="medium" />)
    expect(screen.getByText('Título médio')).toHaveClass('text-2xl', 'leading-[36px]', 'tracking-[-1.5px]')

    render(<CardArticle title="Título grande" size="large" />)
    expect(screen.getByText('Título grande')).toHaveClass('text-2xl', 'leading-[36px]', 'tracking-[-1.5px]')
  })

  it('applies the correct width per layout and size', () => {
    const { container: a } = render(<CardArticle title="A" layout="vertical" size="small" />)
    expect(a.firstChild).toHaveStyle({ width: '240px' })

    const { container: b } = render(<CardArticle title="B" layout="horizontal" size="large" />)
    expect(b.firstChild).toHaveStyle({ width: '760px' })
  })

  it('renders date and reading time separated by a middot only when both are present', () => {
    render(<CardArticle title="A" date="25 AGO 2026" readingTime="5 min de leitura" />)
    expect(screen.getByText('25 AGO 2026')).toBeInTheDocument()
    expect(screen.getByText('·')).toBeInTheDocument()
    expect(screen.getByText('5 min de leitura')).toBeInTheDocument()
  })

  it('omits the middot when only one of date/readingTime is present', () => {
    render(<CardArticle title="A" date="25 AGO 2026" />)
    expect(screen.queryByText('·')).not.toBeInTheDocument()
  })

  it('uses the 0.72 opacity recipe when disabled, without recoloring individual fields', () => {
    const { container } = render(<CardArticle title="A" category="Categoria" action="Ler →" disabled />)
    expect(container.firstChild).toHaveClass('opacity-[0.72]')
    expect(container.firstChild).toHaveClass('bg-surface-disabled')
    expect(screen.getByText('Categoria')).toHaveClass('text-brand-text')
    expect(screen.getByText('Ler →')).toHaveClass('text-brand-text')
  })
})
