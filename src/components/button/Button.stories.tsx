import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'Seis variantes, cada uma correspondendo 1:1 a um component set do Figma "CalvinDS - Core Components": Primary (ação mais importante do contexto), Secondary (ação importante sem competir com a primária), Tertiary (apoio, baixa ênfase), Ghost (baixa ênfase, sem preenchimento), Danger (ações destrutivas) e Inverse (CTA sobre fundos de marca/fortes).',
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

type Story = StoryObj<typeof Button>

export const Playground: Story = {
  args: { children: 'Salvar alterações', variant: 'primary', size: 'md' },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="inverse">Inverse</Button>
    </div>
  ),
}

export const Inverse: Story = {
  render: () => (
    <div style={{ background: 'var(--color-brand)', padding: 24, display: 'flex', gap: 16 }}>
      <Button variant="inverse">Inverse</Button>
    </div>
  ),
}

export const Disabled: Story = {
  args: { children: 'Salvar alterações', disabled: true },
}

export const WithIcons: Story = {
  args: { children: 'Adicionar', iconLeft: 'Plus' },
}
