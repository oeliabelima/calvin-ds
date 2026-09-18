import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CardProfile } from './CardProfile'

describe('CardProfile', () => {
  it('renders name and role', () => {
    render(<CardProfile name="Marina Costa" role="Professora · Arquitetura" />)
    expect(screen.getByText('Marina Costa')).toBeInTheDocument()
    expect(screen.getByText('Professora · Arquitetura')).toBeInTheDocument()
  })

  it('renders each contact line', () => {
    render(
      <CardProfile
        name="Marina Costa"
        role="Professora"
        contacts={['marina.costa@mackenzie.br', '+55 11 2114-8000']}
      />,
    )
    expect(screen.getByText('marina.costa@mackenzie.br')).toBeInTheDocument()
    expect(screen.getByText('+55 11 2114-8000')).toBeInTheDocument()
  })

  it('centers text in the vertical layout but not in horizontal', () => {
    const { container: vertical } = render(<CardProfile name="Marina Costa" role="Professora" />)
    expect(vertical.querySelector('.flex-col.items-start.gap-8')).toHaveClass('text-center')

    const { container: horizontal } = render(
      <CardProfile name="Marina Costa" role="Professora" layout="horizontal" />,
    )
    expect(horizontal.querySelector('.flex-col.items-start.gap-8')).not.toHaveClass('text-center')
  })

  it('renders the avatar slot for vertical/horizontal and the photo slot for feature', () => {
    render(<CardProfile name="Marina Costa" role="Professora" avatar={<span>avatar-slot</span>} />)
    expect(screen.getByText('avatar-slot')).toBeInTheDocument()

    render(
      <CardProfile name="Marina Costa" role="Professora" layout="feature" photo={<span>photo-slot</span>} />,
    )
    expect(screen.getByText('photo-slot')).toBeInTheDocument()
  })

  it('applies the 340px vertical width, 520px horizontal width, and 520px feature width', () => {
    const { container: vertical } = render(<CardProfile name="Marina Costa" role="Professora" />)
    expect(vertical.firstChild).toHaveClass('w-[340px]')

    const { container: horizontal } = render(
      <CardProfile name="Marina Costa" role="Professora" layout="horizontal" />,
    )
    expect(horizontal.firstChild).toHaveClass('w-[520px]')

    const { container: feature } = render(
      <CardProfile name="Marina Costa" role="Professora" layout="feature" />,
    )
    expect(feature.firstChild).toHaveClass('w-[520px]')
  })

  it('drops brand color from role and action when disabled', () => {
    render(<CardProfile name="Marina Costa" role="Professora" action="Ver perfil →" disabled />)
    expect(screen.getByText('Professora')).toHaveClass('text-text-disabled')
    expect(screen.getByText('Ver perfil →')).toHaveClass('text-text-disabled')
  })
})
