import type { Meta, StoryObj } from '@storybook/react'
import { CardArticle } from './CardArticle'

const meta: Meta<typeof CardArticle> = {
  title: 'Components/CardArticle',
  component: CardArticle,
  parameters: {
    docs: {
      description: {
        component:
          'Card editorial responsivo para notícias, blog, pesquisa e comunicados do Mackenzie. Use Vertical em grids e carrosséis; Horizontal em listas e destaques.',
      },
    },
  },
  argTypes: {
    layout: { control: 'select', options: ['vertical', 'horizontal'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
}
export default meta

type Story = StoryObj<typeof CardArticle>

const baseArgs = {
  category: 'NOTÍCIAS · MACKENZIE',
  title: 'Pesquisa transforma a experiência universitária',
  summary: 'Conheça iniciativas, histórias e descobertas que conectam a comunidade Mackenzie.',
  date: '25 AGO 2026',
  readingTime: '5 min de leitura',
  author: 'Por Redação Mackenzie',
  action: 'Ler notícia →',
}

const media = (
  <img
    alt="Campus Mackenzie"
    src="https://placehold.co/400x240"
    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
  />
)

export const Vertical: Story = {
  args: { ...baseArgs, layout: 'vertical', size: 'medium', media },
}

export const Horizontal: Story = {
  args: { ...baseArgs, layout: 'horizontal', size: 'medium', media },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <CardArticle {...baseArgs} layout="vertical" size="small" media={media} />
      <CardArticle {...baseArgs} layout="vertical" size="medium" media={media} />
      <CardArticle {...baseArgs} layout="vertical" size="large" media={media} />
    </div>
  ),
}

export const Disabled: Story = {
  args: { ...baseArgs, layout: 'vertical', size: 'medium', media, disabled: true },
}
