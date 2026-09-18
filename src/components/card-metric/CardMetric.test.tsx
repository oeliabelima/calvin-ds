import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CardMetric } from './CardMetric'

describe('CardMetric', () => {
  it('renders label, value, and supporting text', () => {
    render(<CardMetric label="ALUNOS ATIVOS" value="12.480" supporting="↑ 12,4% vs. mês anterior" />)
    expect(screen.getByText('ALUNOS ATIVOS')).toBeInTheDocument()
    expect(screen.getByText('12.480')).toBeInTheDocument()
    expect(screen.getByText('↑ 12,4% vs. mês anterior')).toBeInTheDocument()
  })

  it('defaults to the positive trend color', () => {
    render(<CardMetric label="Label" value="1" supporting="Supporting" />)
    expect(screen.getByText('Label')).toHaveClass('text-success-text')
  })

  it('applies the neutral trend color (brand-text, not a neutral gray)', () => {
    render(<CardMetric label="Label" value="1" supporting="Supporting" trend="neutral" />)
    expect(screen.getByText('Label')).toHaveClass('text-brand-text')
  })

  it('applies the negative trend color', () => {
    render(<CardMetric label="Label" value="1" supporting="Supporting" trend="negative" />)
    expect(screen.getByText('Label')).toHaveClass('text-error-text')
  })

  it('renders the chip slot when provided', () => {
    render(<CardMetric label="Label" value="1" supporting="Supporting" chip={<span>Meta batida</span>} />)
    expect(screen.getByText('Meta batida')).toBeInTheDocument()
  })

  it('drops trend color and dims when disabled', () => {
    render(<CardMetric label="Label" value="1" supporting="Supporting" trend="positive" disabled />)
    expect(screen.getByText('Label')).toHaveClass('text-text-disabled')
    expect(screen.getByText('Label')).not.toHaveClass('text-success-text')
  })
})
