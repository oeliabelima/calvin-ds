import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from './Alert'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    docs: {
      description: {
        component: 'Feedback persistente dentro do fluxo da página. Use Toast para mensagens temporárias.',
      },
    },
  },
  argTypes: {
    status: { control: 'select', options: ['neutral', 'success', 'info', 'warning', 'error'] },
    layout: { control: 'select', options: ['inline', 'stacked'] },
  },
}
export default meta

type Story = StoryObj<typeof Alert>

export const Playground: Story = {
  args: {
    status: 'info',
    layout: 'inline',
    title: 'Atenção',
    message: 'Esta é uma mensagem de feedback do CalvinDS.',
    actionLabel: 'Ver detalhes',
    onAction: () => {},
    onDismiss: () => {},
  },
}

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 720 }}>
      <Alert status="neutral" title="Neutral" message="Mensagem neutra." onDismiss={() => {}} />
      <Alert status="success" title="Success" message="Operação concluída." onDismiss={() => {}} />
      <Alert status="info" title="Info" message="Uma informação relevante." onDismiss={() => {}} />
      <Alert status="warning" title="Warning" message="Atenção com isso." onDismiss={() => {}} />
      <Alert status="error" title="Error" message="Algo deu errado." onDismiss={() => {}} />
    </div>
  ),
}

export const Stacked: Story = {
  args: {
    status: 'warning',
    layout: 'stacked',
    title: 'Atenção',
    message: 'Esta é uma mensagem de feedback do CalvinDS em layout empilhado, para mobile.',
    actionLabel: 'Ver detalhes',
    onAction: () => {},
    onDismiss: () => {},
  },
  render: (args) => (
    <div style={{ maxWidth: 480 }}>
      <Alert {...args} />
    </div>
  ),
}
