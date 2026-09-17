import type { Meta, StoryObj } from '@storybook/react'
import { Tag } from './Tag'

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    docs: {
      description: {
        component:
          'Rótulo estático para categoria, novidade, promoção e status. Para filtros ou ações interativas, use Chip (fase futura), não Tag.',
      },
    },
  },
  argTypes: {
    tone: {
      control: 'select',
      options: ['neutral', 'brand', 'success', 'warning', 'error', 'info'],
    },
  },
}
export default meta

type Story = StoryObj<typeof Tag>

export const Playground: Story = {
  args: { children: 'Novidade', tone: 'brand' },
}

export const AllTones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Tag tone="neutral">Neutral</Tag>
      <Tag tone="brand">Brand</Tag>
      <Tag tone="success">Success</Tag>
      <Tag tone="warning">Warning</Tag>
      <Tag tone="error">Error</Tag>
      <Tag tone="info">Info</Tag>
    </div>
  ),
}
