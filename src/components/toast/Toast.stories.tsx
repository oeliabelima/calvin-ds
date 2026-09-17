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

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Toast status="neutral" message="Notificação neutra." />
      <Toast status="success" message="Operação concluída com sucesso." onAction={() => {}} />
      <Toast status="info" message="Uma informação relevante." onAction={() => {}} />
      <Toast status="warning" message="Atenção com isso." onAction={() => {}} />
      <Toast status="error" message="Algo deu errado." onAction={() => {}} />
    </div>
  ),
}
