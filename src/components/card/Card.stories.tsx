import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardBody, CardDescription, CardMedia, CardTitle } from './Card'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          'Card responsivo para conteúdo textual ou editorial com mídia. Componha com CardMedia (opcional), CardBody, CardTitle e CardDescription — omitir CardMedia gera o layout sem imagem.',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Card>

export const WithMedia: Story = {
  render: () => (
    <Card style={{ maxWidth: 320 }}>
      <CardMedia src="https://placehold.co/320x160" alt="Campus Mackenzie" />
      <CardBody>
        <CardTitle>Matrículas abertas</CardTitle>
        <CardDescription>Garanta sua vaga para 2027.</CardDescription>
      </CardBody>
    </Card>
  ),
}

export const WithoutMedia: Story = {
  render: () => (
    <Card style={{ maxWidth: 320 }}>
      <CardBody>
        <CardTitle>Matrículas abertas</CardTitle>
        <CardDescription>Garanta sua vaga para 2027.</CardDescription>
      </CardBody>
    </Card>
  ),
}
