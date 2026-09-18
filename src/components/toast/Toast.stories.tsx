import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Toast } from './Toast'

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    docs: {
      description: {
        component: 'Feedback temporário e não bloqueante. Mantenha visível por pelo menos 6 segundos.',
      },
    },
  },
  argTypes: {
    status: { control: 'select', options: ['neutral', 'success', 'info', 'warning', 'error'] },
  },
}
export default meta

type Story = StoryObj<typeof Toast>

export const Playground: Story = {
  args: { status: 'success', message: 'A atualização foi concluída.', onAction: () => {} },
}

const allStatusesSeed = [
  { status: 'neutral', message: 'Notificação neutra.' },
  { status: 'success', message: 'Operação concluída com sucesso.' },
  { status: 'info', message: 'Uma informação relevante.' },
  { status: 'warning', message: 'Atenção com isso.' },
  { status: 'error', message: 'Algo deu errado.' },
] as const

export const AllStatuses: Story = {
  render: () => {
    const [dismissed, setDismissed] = useState<string[]>([])
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {allStatusesSeed
          .filter((item) => !dismissed.includes(item.status))
          .map((item) => (
            <Toast
              key={item.status}
              status={item.status}
              message={item.message}
              onAction={item.status === 'neutral' ? undefined : () => {}}
              onDismiss={() => setDismissed((prev) => [...prev, item.status])}
            />
          ))}
      </div>
    )
  },
}
