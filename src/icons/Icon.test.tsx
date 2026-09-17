import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Icon } from './Icon'

describe('Icon', () => {
  it('renders the requested Phosphor icon', () => {
    render(<Icon name="CheckCircle" aria-label="concluído" />)
    expect(screen.getByLabelText('concluído')).toBeInTheDocument()
  })

  it('applies the medium size token by default', () => {
    render(<Icon name="Info" aria-label="informação" />)
    const svg = screen.getByLabelText('informação')
    expect(svg).toHaveClass('size-icon-md')
  })

  it('applies the requested size token', () => {
    render(<Icon name="Info" size="lg" aria-label="informação grande" />)
    const svg = screen.getByLabelText('informação grande')
    expect(svg).toHaveClass('size-icon-lg')
  })
})
