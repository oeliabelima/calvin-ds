import type { Meta, StoryObj } from '@storybook/react'
import { CardEditorialFeature } from './CardEditorialFeature'

const meta: Meta<typeof CardEditorialFeature> = {
  title: 'Components/CardEditorialFeature',
  component: CardEditorialFeature,
  parameters: {
    docs: {
      description: {
        component:
          'Card editorial numerado com layouts vertical e horizontal. Use o índice como apoio à sequência, não como única informação.',
      },
    },
  },
  argTypes: {
    layout: { control: 'select', options: ['vertical', 'horizontal'] },
  },
}
export default meta

type Story = StoryObj<typeof CardEditorialFeature>

const baseArgs = {
  number: '01',
  title: 'Ler territórios',
  description: 'Compreenda relações sociais, ambientais e culturais antes de desenhar soluções.',
}

export const Vertical: Story = {
  args: { ...baseArgs, layout: 'vertical' },
}

export const Horizontal: Story = {
  args: { ...baseArgs, layout: 'horizontal' },
}

export const Sequence: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <CardEditorialFeature
        number="01"
        title="Ler territórios"
        description="Compreenda relações sociais, ambientais e culturais antes de desenhar soluções."
      />
      <CardEditorialFeature
        number="02"
        title="Prototipar rápido"
        description="Teste ideias com baixo custo antes de investir em produção final."
      />
      <CardEditorialFeature
        number="03"
        title="Medir impacto"
        description="Acompanhe indicadores reais para validar decisões de projeto."
      />
    </div>
  ),
}
