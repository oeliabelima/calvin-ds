import { useState } from 'react'
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

const allStatusesSeed = [
  { status: 'neutral', title: 'Neutral', message: 'Mensagem neutra.' },
  { status: 'success', title: 'Success', message: 'Operação concluída.' },
  { status: 'info', title: 'Info', message: 'Uma informação relevante.' },
  { status: 'warning', title: 'Warning', message: 'Atenção com isso.' },
  { status: 'error', title: 'Error', message: 'Algo deu errado.' },
] as const

export const AllStatuses: Story = {
  render: () => {
    const [dismissed, setDismissed] = useState<string[]>([])
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 720 }}>
        {allStatusesSeed
          .filter((item) => !dismissed.includes(item.status))
          .map((item) => (
            <Alert
              key={item.status}
              status={item.status}
              title={item.title}
              message={item.message}
              onDismiss={() => setDismissed((prev) => [...prev, item.status])}
            />
          ))}
      </div>
    )
  },
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
