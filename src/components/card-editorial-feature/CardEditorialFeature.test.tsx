import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CardEditorialFeature } from './CardEditorialFeature'

const baseProps = {
  number: '01',
  title: 'Ler territórios',
  description: 'Compreenda relações sociais, ambientais e culturais antes de desenhar soluções.',
}

describe('CardEditorialFeature', () => {
  it('renders number, title, and description', () => {
    render(<CardEditorialFeature {...baseProps} />)
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('Ler territórios')).toBeInTheDocument()
    expect(
      screen.getByText('Compreenda relações sociais, ambientais e culturais antes de desenhar soluções.'),
    ).toBeInTheDocument()
  })

  it('defaults to the vertical layout width', () => {
    const { container } = render(<CardEditorialFeature {...baseProps} />)
    expect(container.firstChild).toHaveClass('w-[378px]')
  })

  it('applies the horizontal layout width and row direction', () => {
    const { container } = render(<CardEditorialFeature {...baseProps} layout="horizontal" />)
    expect(container.firstChild).toHaveClass('w-[640px]')
    expect(container.firstChild).toHaveClass('flex-row')
  })

  it('has no border class', () => {
    const { container } = render(<CardEditorialFeature {...baseProps} />)
    expect(container.firstChild).not.toHaveClass('border')
  })
})
