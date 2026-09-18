import type { Meta, StoryObj } from '@storybook/react'
import { CardMetricEditorial } from './CardMetricEditorial'

const meta: Meta<typeof CardMetricEditorial> = {
  title: 'Components/CardMetricEditorial',
  component: CardMetricEditorial,
  parameters: {
    docs: {
      description: {
        component:
          'Métrica de narrativa com título e descrição. Para KPIs com tendência, estado e chip, use Card / Metric.',
      },
    },
  },
  argTypes: {
    tone: { control: 'select', options: ['product', 'surface'] },
  },
}
export default meta

type Story = StoryObj<typeof CardMetricEditorial>

const baseArgs = {
  bigNumber: '+30',
  title: 'laboratórios e ateliês',
  description: 'para experimentar materiais, fabricação e representação',
}

export const Product: Story = {
  args: { ...baseArgs, tone: 'product' },
}

export const Surface: Story = {
  args: { ...baseArgs, tone: 'surface' },
}

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <CardMetricEditorial {...baseArgs} tone="product" />
      <CardMetricEditorial {...baseArgs} tone="surface" />
    </div>
  ),
}

export const Vertical: Story = {
  args: { ...baseArgs, tone: 'product', vertical: true },
}
