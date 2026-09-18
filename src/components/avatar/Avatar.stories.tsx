import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarGroup } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component:
          'Avatar responsivo com imagem, iniciais ou ícone (fallback). Círculo representa pessoas; quadrado representa entidades (ex. instituições, times). Cinco tamanhos: XS (24px), Small (32px), Medium (40px), Large (56px), XL (72px).',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    shape: { control: 'select', options: ['circle', 'square'] },
  },
}
export default meta

type Story = StoryObj<typeof Avatar>

export const Playground: Story = {
  args: { initials: 'EL', alt: 'Elia Lima', size: 'md', shape: 'circle' },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar initials="EL" alt="Elia Lima" size="xs" />
      <Avatar initials="EL" alt="Elia Lima" size="sm" />
      <Avatar initials="EL" alt="Elia Lima" size="md" />
      <Avatar initials="EL" alt="Elia Lima" size="lg" />
      <Avatar initials="EL" alt="Elia Lima" size="xl" />
    </div>
  ),
}

export const WithPhoto: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar src="https://placehold.co/48x48" alt="Elia Lima" size="xs" />
      <Avatar src="https://placehold.co/64x64" alt="Elia Lima" size="sm" />
      <Avatar src="https://placehold.co/80x80" alt="Elia Lima" size="md" />
      <Avatar src="https://placehold.co/112x112" alt="Elia Lima" size="lg" />
      <Avatar src="https://placehold.co/144x144" alt="Elia Lima" size="xl" />
      <Avatar src="https://placehold.co/80x80" alt="Mackenzie" size="md" shape="square" />
    </div>
  ),
}

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Avatar initials="EL" alt="Pessoa" shape="circle" />
      <Avatar initials="MK" alt="Entidade" shape="square" />
    </div>
  ),
}

export const IconFallback: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Avatar alt="Sem foto nem iniciais" size="md" />
      <Avatar alt="Sem foto nem iniciais" size="lg" />
    </div>
  ),
}

export const WithStatus: Story = {
  args: { initials: 'EL', alt: 'Elia Lima (online)', size: 'md', showStatus: true },
}

export const Group: Story = {
  render: () => (
    <AvatarGroup max={3} size="sm">
      <Avatar initials="A" alt="Ana" size="sm" />
      <Avatar initials="B" alt="Bruno" size="sm" />
      <Avatar initials="C" alt="Carla" size="sm" />
      <Avatar initials="D" alt="Diego" size="sm" />
      <Avatar initials="E" alt="Elis" size="sm" />
    </AvatarGroup>
  ),
}

export const GroupWithPhotos: Story = {
  render: () => (
    <AvatarGroup max={4} size="md">
      <Avatar src="https://placehold.co/80x80" alt="Ana" size="md" />
      <Avatar initials="BR" alt="Bruno" size="md" />
      <Avatar src="https://placehold.co/80x80" alt="Carla" size="md" />
      <Avatar alt="Sem foto nem iniciais" size="md" />
      <Avatar initials="EL" alt="Elis" size="md" />
      <Avatar initials="FA" alt="Fábio" size="md" />
    </AvatarGroup>
  ),
}
