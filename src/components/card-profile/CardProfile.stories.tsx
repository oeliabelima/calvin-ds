import type { Meta, StoryObj } from '@storybook/react'
import { CardProfile } from './CardProfile'
import { Avatar } from '../avatar'

const meta: Meta<typeof CardProfile> = {
  title: 'Components/CardProfile',
  component: CardProfile,
  parameters: {
    docs: {
      description: {
        component:
          'Card de perfil para pessoa, docente ou contato. Layouts Vertical e Horizontal para identidade compacta; Feature para um retrato 3:4 de destaque ao lado do conteúdo (use a partir de 520px de largura).',
      },
    },
  },
  argTypes: {
    layout: { control: 'select', options: ['vertical', 'horizontal', 'feature'] },
  },
}
export default meta

type Story = StoryObj<typeof CardProfile>

const baseArgs = {
  name: 'Marina Costa',
  role: 'Professora · Arquitetura',
  description: 'Pesquisa inovação urbana e coordena projetos acadêmicos.',
  contacts: ['marina.costa@mackenzie.br', '+55 11 2114-8000'],
  action: 'Ver perfil →',
}

export const Vertical: Story = {
  args: {
    ...baseArgs,
    layout: 'vertical',
    avatar: <Avatar initials="MC" alt="Marina Costa" size="xl" />,
  },
}

export const Horizontal: Story = {
  args: {
    ...baseArgs,
    layout: 'horizontal',
    avatar: <Avatar initials="MC" alt="Marina Costa" size="xl" />,
  },
}

export const Feature: Story = {
  args: {
    ...baseArgs,
    layout: 'feature',
    photo: (
      <img
        alt="Marina Costa"
        src="https://placehold.co/195x260"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    ),
  },
}

export const Layouts: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <CardProfile {...baseArgs} layout="vertical" avatar={<Avatar initials="MC" alt="Marina Costa" size="xl" />} />
      <CardProfile {...baseArgs} layout="horizontal" avatar={<Avatar initials="MC" alt="Marina Costa" size="xl" />} />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    ...baseArgs,
    layout: 'vertical',
    avatar: <Avatar initials="MC" alt="Marina Costa" size="xl" />,
    disabled: true,
  },
}
