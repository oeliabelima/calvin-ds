import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CardMetricEditorial } from './CardMetricEditorial'

const baseProps = {
  bigNumber: '+30',
  title: 'laboratórios e ateliês',
  description: 'para experimentar materiais, fabricação e representação',
}

describe('CardMetricEditorial', () => {
  it('renders bigNumber, title, and description', () => {
    render(<CardMetricEditorial {...baseProps} />)
    expect(screen.getByText('+30')).toBeInTheDocument()
    expect(screen.getByText('laboratórios e ateliês')).toBeInTheDocument()
    expect(screen.getByText('para experimentar materiais, fabricação e representação')).toBeInTheDocument()
  })

  it('defaults to the product tone (bg-brand, text-on-brand)', () => {
    render(<CardMetricEditorial {...baseProps} />)
    expect(screen.getByText('+30').closest('div[class*="rounded-[20px]"]')).toHaveClass('bg-brand')
    expect(screen.getByText('+30')).toHaveClass('text-4xl')
  })

  it('applies text-primary/text-secondary for the surface tone', () => {
    render(<CardMetricEditorial {...baseProps} tone="surface" />)
    expect(screen.getByText('laboratórios e ateliês')).toHaveClass('text-text-primary')
    expect(screen.getByText('para experimentar materiais, fabricação e representação')).toHaveClass(
      'text-text-secondary',
    )
  })

  it('uses an 8px description gap for product tone and 16px for surface tone', () => {
    const { container: product } = render(<CardMetricEditorial {...baseProps} tone="product" />)
    expect(product.querySelector('.flex-col.items-start.gap-8')).toBeInTheDocument()

    const { container: surface } = render(<CardMetricEditorial {...baseProps} tone="surface" />)
    expect(surface.querySelector('.flex-col.items-start.gap-16')).toBeInTheDocument()
  })

  it('applies the fixed 480px height when vertical is true', () => {
    const { container } = render(<CardMetricEditorial {...baseProps} vertical />)
    expect(container.firstChild).toHaveClass('h-[480px]')
  })
})
