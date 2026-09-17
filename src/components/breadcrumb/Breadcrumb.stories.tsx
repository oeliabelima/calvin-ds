import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    docs: {
      description: {
        component:
          'Trilha de navegação hierárquica. Use current apenas no último item — ele não é tratado como link.',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Breadcrumb>

export const Playground: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem href="/">Início</BreadcrumbItem>
      <BreadcrumbItem href="/cursos">Cursos</BreadcrumbItem>
      <BreadcrumbItem href="/cursos/graduacao">Graduação</BreadcrumbItem>
      <BreadcrumbItem current>Administração</BreadcrumbItem>
    </Breadcrumb>
  ),
}

export const WithDisabledItem: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem href="/">Início</BreadcrumbItem>
      <BreadcrumbItem href="/restrito" disabled>
        Área restrita
      </BreadcrumbItem>
      <BreadcrumbItem current>Página atual</BreadcrumbItem>
    </Breadcrumb>
  ),
}
