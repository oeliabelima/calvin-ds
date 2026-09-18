import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CourseClassification } from './CourseClassification'

describe('CourseClassification', () => {
  it('renders the agency label', () => {
    render(<CourseClassification agency="MEC" display="stars" value={5} />)
    expect(screen.getByText('MEC')).toBeInTheDocument()
  })

  it('renders 5 stars when display is stars', () => {
    const { container } = render(<CourseClassification agency="MEC" display="stars" value={3} />)
    expect(container.querySelectorAll('svg')).toHaveLength(5)
  })

  it('renders the grade label and score when display is grade', () => {
    render(<CourseClassification agency="ENADE" display="grade" score="4" />)
    expect(screen.getByText('Nota')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
  })
})
