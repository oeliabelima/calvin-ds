import type { Meta, StoryObj } from '@storybook/react'
import { Tag } from './Tag'

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    docs: {
      description: {
        component:
          'Rótulo estático para categoria, novidade, promoção e status. Não usar como botão — para filtros ou ações interativas, use Chip (fase futura), não Tag.',
      },
    },
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['neutral', 'brand', 'success', 'warning', 'error', 'info'],
    },
    size: { control: 'select', options: ['sm', 'md'] },
  },
}
export default meta

type Story = StoryObj<typeof Tag>

export const Playground: Story = {
  args: { children: 'Novidade', status: 'brand', size: 'sm' },
}

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag status="neutral">Neutral</Tag>
      <Tag status="brand">Brand</Tag>
      <Tag status="success">Success</Tag>
      <Tag status="warning">Warning</Tag>
      <Tag status="error">Error</Tag>
      <Tag status="info">Info</Tag>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Tag status="brand" size="sm">Small</Tag>
      <Tag status="brand" size="md">Medium</Tag>
    </div>
  ),
}

export const WithoutIndicator: Story = {
  args: { children: 'Novidade', status: 'brand', showIndicator: false },
}
