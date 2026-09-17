import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Avatar, AvatarGroup } from './Avatar'

describe('Avatar', () => {
  it('renders initials as fallback', () => {
    render(<Avatar initials="EL" alt="Elia Lima" />)
    expect(screen.getByText('EL')).toBeInTheDocument()
  })

  it('defaults to circle shape', () => {
    render(<Avatar initials="EL" alt="Elia Lima" />)
    expect(screen.getByText('EL').closest('[data-shape]')).toHaveAttribute('data-shape', 'circle')
  })

  it('applies square shape when requested', () => {
    render(<Avatar initials="MK" alt="Mackenzie" shape="square" />)
    expect(screen.getByText('MK').closest('[data-shape]')).toHaveAttribute('data-shape', 'square')
  })
})

describe('AvatarGroup', () => {
  it('shows up to max avatars and a counter for the rest', () => {
    render(
      <AvatarGroup max={3}>
        <Avatar initials="A" alt="A" />
        <Avatar initials="B" alt="B" />
        <Avatar initials="C" alt="C" />
        <Avatar initials="D" alt="D" />
        <Avatar initials="E" alt="E" />
      </AvatarGroup>,
    )
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
    expect(screen.getByText('C')).toBeInTheDocument()
    expect(screen.queryByText('D')).not.toBeInTheDocument()
    expect(screen.getByText('+2')).toBeInTheDocument()
  })
})
