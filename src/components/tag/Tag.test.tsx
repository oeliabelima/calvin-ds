import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Tag } from './Tag'

describe('Tag', () => {
  it('renders its label', () => {
    render(<Tag>Novidade</Tag>)
    expect(screen.getByText('Novidade')).toBeInTheDocument()
  })

  it('defaults to the neutral tone', () => {
    render(<Tag>Novidade</Tag>)
    expect(screen.getByText('Novidade')).toHaveClass('bg-surface-alt')
  })

  it('applies the requested tone', () => {
    render(<Tag tone="success">Aprovado</Tag>)
    expect(screen.getByText('Aprovado')).toHaveClass('bg-success-bg-subtle')
  })
})
