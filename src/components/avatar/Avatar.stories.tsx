import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarGroup } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component:
          'Avatar responsivo com imagem, iniciais ou ícone. Círculo representa pessoas; quadrado representa entidades (ex. instituições, times).',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    shape: { control: 'select', options: ['circle', 'square'] },
  },
}
export default meta

type Story = StoryObj<typeof Avatar>

export const Playground: Story = {
  args: { initials: 'EL', alt: 'Elia Lima', size: 'md', shape: 'circle' },
}

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Avatar initials="EL" alt="Pessoa" shape="circle" />
      <Avatar initials="MK" alt="Entidade" shape="square" />
    </div>
  ),
}

export const Group: Story = {
  render: () => (
    <AvatarGroup max={3}>
      <Avatar initials="A" alt="Ana" />
      <Avatar initials="B" alt="Bruno" />
      <Avatar initials="C" alt="Carla" />
      <Avatar initials="D" alt="Diego" />
      <Avatar initials="E" alt="Elis" />
    </AvatarGroup>
  ),
}
