import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Tag } from './Tag'

describe('Tag', () => {
  it('renders its label', () => {
    render(<Tag>Novidade</Tag>)
    expect(screen.getByText('Novidade')).toBeInTheDocument()
  })

  it('defaults to the neutral status', () => {
    render(<Tag>Novidade</Tag>)
    expect(screen.getByText('Novidade')).toHaveClass('bg-surface')
  })

  it('applies the requested status', () => {
    render(<Tag status="success">Aprovado</Tag>)
    expect(screen.getByText('Aprovado')).toHaveClass('bg-success-bg-subtle')
  })

  it('defaults to the small size', () => {
    render(<Tag>Novidade</Tag>)
    expect(screen.getByText('Novidade')).toHaveClass('h-[24px]')
  })

  it('applies the medium size', () => {
    render(<Tag size="md">Novidade</Tag>)
    expect(screen.getByText('Novidade')).toHaveClass('h-[32px]')
  })

  it('omits the indicator dot when showIndicator is false', () => {
    render(<Tag showIndicator={false}>Novidade</Tag>)
    expect(screen.getByText('Novidade').querySelector('.rounded-full')).not.toBeInTheDocument()
  })
})
