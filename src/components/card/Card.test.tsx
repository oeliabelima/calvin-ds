import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card, CardBody, CardDescription, CardMedia, CardTitle } from './Card'

describe('Card', () => {
  it('renders title and description', () => {
    render(
      <Card>
        <CardBody>
          <CardTitle>Matrículas abertas</CardTitle>
          <CardDescription>Garanta sua vaga para 2027.</CardDescription>
        </CardBody>
      </Card>,
    )
    expect(screen.getByText('Matrículas abertas')).toBeInTheDocument()
    expect(screen.getByText('Garanta sua vaga para 2027.')).toBeInTheDocument()
  })

  it('renders media when CardMedia is provided', () => {
    render(
      <Card>
        <CardMedia src="/foo.jpg" alt="Campus Mackenzie" />
        <CardBody>
          <CardTitle>Matrículas abertas</CardTitle>
        </CardBody>
      </Card>,
    )
    expect(screen.getByAltText('Campus Mackenzie')).toBeInTheDocument()
  })

  it('omits media entirely when CardMedia is not used', () => {
    render(
      <Card>
        <CardBody>
          <CardTitle>Matrículas abertas</CardTitle>
        </CardBody>
      </Card>,
    )
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})
