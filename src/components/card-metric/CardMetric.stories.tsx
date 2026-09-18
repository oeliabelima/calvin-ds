import type { Meta, StoryObj } from '@storybook/react'
import { CardMetric } from './CardMetric'
import { Tag } from '../tag'

const meta: Meta<typeof CardMetric> = {
  title: 'Components/CardMetric',
  component: CardMetric,
  parameters: {
    docs: {
      description: {
        component:
          'Card de métrica para big numbers e indicadores. O trend complementa, mas não substitui texto acessível.',
      },
    },
  },
  argTypes: {
    trend: { control: 'select', options: ['positive', 'neutral', 'negative'] },
  },
}
export default meta

type Story = StoryObj<typeof CardMetric>

export const Playground: Story = {
  args: {
    label: 'ALUNOS ATIVOS',
    value: '12.480',
    supporting: '↑ 12,4% vs. mês anterior',
    trend: 'positive',
  },
}

export const Trends: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <CardMetric label="ALUNOS ATIVOS" value="12.480" supporting="↑ 12,4% vs. mês anterior" trend="positive" />
      <CardMetric label="ALUNOS ATIVOS" value="12.480" supporting="Estável vs. mês anterior" trend="neutral" />
      <CardMetric label="ALUNOS ATIVOS" value="12.480" supporting="↓ 3,1% vs. mês anterior" trend="negative" />
    </div>
  ),
}

export const WithChip: Story = {
  args: {
    label: 'ALUNOS ATIVOS',
    value: '12.480',
    supporting: '↑ 12,4% vs. mês anterior',
    trend: 'positive',
    chip: <Tag status="success" size="sm" showIndicator>Meta batida</Tag>,
  },
}

export const Disabled: Story = {
  args: {
    label: 'ALUNOS ATIVOS',
    value: '12.480',
    supporting: '↑ 12,4% vs. mês anterior',
    trend: 'positive',
    disabled: true,
  },
}
