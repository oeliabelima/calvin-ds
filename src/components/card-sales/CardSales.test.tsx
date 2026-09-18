import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CardSales } from './CardSales'

const baseProps = {
  image: <img alt="" src="https://placehold.co/360x200" />,
  title: 'Curso de curta duração',
  description: 'Aprenda com especialistas do Mackenzie.',
  price: 'R$ 349',
  action: 'Conhecer oferta →',
}

describe('CardSales', () => {
  it('renders title, description, price, and action', () => {
    render(<CardSales {...baseProps} />)
    expect(screen.getByText('Curso de curta duração')).toBeInTheDocument()
    expect(screen.getByText('Aprenda com especialistas do Mackenzie.')).toBeInTheDocument()
    expect(screen.getByText('R$ 349')).toBeInTheDocument()
    expect(screen.getByText('Conhecer oferta →')).toBeInTheDocument()
  })

  it('renders the old price with a line-through style when provided', () => {
    render(<CardSales {...baseProps} oldPrice="R$ 499" />)
    expect(screen.getByText('R$ 499')).toHaveClass('line-through')
  })

  it('omits the old price when not provided', () => {
    render(<CardSales {...baseProps} />)
    expect(screen.queryByText('R$ 499')).not.toBeInTheDocument()
  })

  it('defaults to the media layout width', () => {
    const { container } = render(<CardSales {...baseProps} />)
    expect(container.firstChild).toHaveClass('w-[360px]')
  })

  it('applies the compact layout width and row direction', () => {
    const { container } = render(<CardSales {...baseProps} layout="compact" />)
    expect(container.firstChild).toHaveClass('w-[440px]')
    expect(container.firstChild).toHaveClass('flex-row')
  })

  it('drops brand color from the action link when disabled but leaves the chip slot untouched', () => {
    render(<CardSales {...baseProps} chip={<span className="chip-marker">Novo</span>} disabled />)
    expect(screen.getByText('Conhecer oferta →')).toHaveClass('text-text-disabled')
    expect(screen.getByText('Novo')).toHaveClass('chip-marker')
  })
})
