import type { Meta, StoryObj } from '@storybook/react'
import { CardAction } from './CardAction'
import { Icon } from '../../icons'
import { Tag } from '../tag'

const meta: Meta<typeof CardAction> = {
  title: 'Components/CardAction',
  component: CardAction,
  parameters: {
    docs: {
      description: {
        component:
          'Card para ação contextual. A superfície inteira pode ser acionável; mantenha um único destino principal.',
      },
    },
  },
  argTypes: {
    layout: { control: 'select', options: ['vertical', 'horizontal'] },
  },
}
export default meta

type Story = StoryObj<typeof CardAction>

const icon = <Icon name="PlusCircle" aria-hidden className="text-brand" style={{ width: 36, height: 36 }} />
const chip = (
  <Tag status="info" size="sm" showIndicator={false}>
    Novo
  </Tag>
)

export const Playground: Story = {
  args: {
    eyebrow: 'Tarefas',
    title: 'Iniciar nova solicitação',
    description: 'Acesse rapidamente a próxima tarefa do seu fluxo.',
    action: 'Começar agora →',
    layout: 'vertical',
    icon,
  },
}

export const Layouts: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <CardAction
        eyebrow="Tarefas"
        title="Iniciar nova solicitação"
        description="Acesse rapidamente a próxima tarefa do seu fluxo."
        action="Começar agora →"
        layout="vertical"
        icon={icon}
      />
      <CardAction
        eyebrow="Tarefas"
        title="Iniciar nova solicitação"
        description="Acesse rapidamente a próxima tarefa do seu fluxo."
        action="Começar agora →"
        layout="horizontal"
        icon={icon}
      />
    </div>
  ),
}

export const WithChip: Story = {
  args: {
    eyebrow: 'Tarefas',
    title: 'Iniciar nova solicitação',
    description: 'Acesse rapidamente a próxima tarefa do seu fluxo.',
    action: 'Começar agora →',
    layout: 'vertical',
    icon,
    chip,
  },
}

export const Disabled: Story = {
  args: {
    eyebrow: 'Tarefas',
    title: 'Iniciar nova solicitação',
    description: 'Acesse rapidamente a próxima tarefa do seu fluxo.',
    action: 'Começar agora →',
    layout: 'vertical',
    icon,
    disabled: true,
  },
}
