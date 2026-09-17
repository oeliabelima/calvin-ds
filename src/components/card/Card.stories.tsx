import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardAction, CardBody, CardDescription, CardEyebrow, CardMedia, CardMeta, CardTitle } from './Card'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          'Card responsivo para conteúdo textual ou editorial com mídia. Componha com CardMedia (opcional), CardBody, CardEyebrow, CardTitle, CardDescription, CardMeta e CardAction — omitir CardMedia gera o layout sem imagem. O card em si aceita foco/hover/disabled quando usado como acionável.',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Card>

export const WithMedia: Story = {
  render: () => (
    <Card tabIndex={0} style={{ maxWidth: 320 }}>
      <CardMedia src="https://placehold.co/320x200" alt="Campus Mackenzie" />
      <CardBody>
        <CardEyebrow>MACKENZIE · EXPERIÊNCIA</CardEyebrow>
        <CardTitle>Uma experiência com mais contexto</CardTitle>
        <CardDescription>
          Conteúdo editorial com hierarquia clara, leitura confortável e comportamento responsivo.
        </CardDescription>
        <CardMeta>5 min de leitura</CardMeta>
        <CardAction>Conhecer conteúdo</CardAction>
      </CardBody>
    </Card>
  ),
}

export const WithoutMedia: Story = {
  render: () => (
    <Card tabIndex={0} style={{ maxWidth: 320 }}>
      <CardBody>
        <CardEyebrow>MACKENZIE · EXPERIÊNCIA</CardEyebrow>
        <CardTitle>Uma experiência com mais contexto</CardTitle>
        <CardDescription>
          Conteúdo editorial com hierarquia clara, leitura confortável e comportamento responsivo.
        </CardDescription>
      </CardBody>
    </Card>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Card disabled style={{ maxWidth: 320 }}>
      <CardBody>
        <CardEyebrow>MACKENZIE · EXPERIÊNCIA</CardEyebrow>
        <CardTitle>Uma experiência com mais contexto</CardTitle>
        <CardDescription>
          Conteúdo editorial com hierarquia clara, leitura confortável e comportamento responsivo.
        </CardDescription>
      </CardBody>
    </Card>
  ),
}
