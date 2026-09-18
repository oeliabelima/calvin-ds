import type { Meta, StoryObj } from '@storybook/react'
import { CardSales } from './CardSales'
import { Tag } from '../tag'

const meta: Meta<typeof CardSales> = {
  title: 'Components/CardSales',
  component: CardSales,
  parameters: {
    docs: {
      description: {
        component: 'Card de venda ou oferta com mídia, preço, desconto e Tag opcional.',
      },
    },
  },
  argTypes: {
    layout: { control: 'select', options: ['media', 'compact'] },
  },
}
export default meta

type Story = StoryObj<typeof CardSales>

const image = <img alt="Prédio histórico do Mackenzie" src="https://placehold.co/360x260" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
const chip = (
  <Tag status="brand" size="sm">
    Categoria
  </Tag>
)

export const Playground: Story = {
  args: {
    image,
    title: 'Curso de curta duração',
    description: 'Aprenda com especialistas do Mackenzie.',
    price: 'R$ 349',
    oldPrice: 'R$ 499',
    action: 'Conhecer oferta →',
    layout: 'media',
    chip,
  },
}

export const Layouts: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <CardSales
        image={image}
        title="Curso de curta duração"
        description="Aprenda com especialistas do Mackenzie."
        price="R$ 349"
        oldPrice="R$ 499"
        action="Conhecer oferta →"
        layout="media"
        chip={chip}
      />
      <CardSales
        image={image}
        title="Curso de curta duração"
        description="Aprenda com especialistas do Mackenzie."
        price="R$ 349"
        oldPrice="R$ 499"
        action="Conhecer oferta →"
        layout="compact"
        chip={chip}
      />
    </div>
  ),
}

export const WithoutDiscount: Story = {
  args: {
    image,
    title: 'Curso de curta duração',
    description: 'Aprenda com especialistas do Mackenzie.',
    price: 'R$ 349',
    action: 'Conhecer oferta →',
    layout: 'media',
    chip,
  },
}

export const Disabled: Story = {
  args: {
    image,
    title: 'Curso de curta duração',
    description: 'Aprenda com especialistas do Mackenzie.',
    price: 'R$ 349',
    oldPrice: 'R$ 499',
    action: 'Conhecer oferta →',
    layout: 'media',
    chip,
    disabled: true,
  },
}
