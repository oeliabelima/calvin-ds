import type { Meta, StoryObj } from '@storybook/react'
import { IconButton } from './IconButton'

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    docs: {
      description: {
        component:
          'Botão somente com ícone, nas mesmas 6 variantes de cor do Button. Sempre exige aria-label — sem texto visível, o nome acessível é obrigatório.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'danger', 'inverse'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof IconButton>

export const Playground: Story = {
  args: { icon: 'Trash', 'aria-label': 'Excluir item', variant: 'primary', size: 'md' },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <IconButton icon="Trash" aria-label="Excluir" variant="primary" />
      <IconButton icon="Trash" aria-label="Excluir" variant="secondary" />
      <IconButton icon="Trash" aria-label="Excluir" variant="tertiary" />
      <IconButton icon="Trash" aria-label="Excluir" variant="ghost" />
      <IconButton icon="Trash" aria-label="Excluir" variant="danger" />
      <IconButton icon="Trash" aria-label="Excluir" variant="inverse" />
    </div>
  ),
}
