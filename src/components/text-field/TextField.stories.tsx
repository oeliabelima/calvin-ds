import type { Meta, StoryObj } from '@storybook/react'
import { TextField } from './TextField'

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    docs: {
      description: {
        component:
          'Campo de texto de linha única. Status (Neutral/Success/Info/Warning/Error) reflete feedback de validação. Estados de interação (hover/focus/disabled) vêm de pseudo-classes CSS nativas, não de props.',
      },
    },
  },
  argTypes: {
    status: { control: 'select', options: ['neutral', 'success', 'info', 'warning', 'error'] },
  },
}
export default meta

type Story = StoryObj<typeof TextField>

export const Playground: Story = {
  args: { label: 'E-mail', placeholder: 'voce@mackenzie.br' },
}

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      <TextField label="Neutral" status="neutral" helperText="Texto de apoio" />
      <TextField label="Success" status="success" helperText="Tudo certo" defaultValue="ok@mackenzie.br" />
      <TextField label="Info" status="info" helperText="Uma informação" />
      <TextField label="Warning" status="warning" helperText="Atenção com isso" />
      <TextField label="Error" status="error" helperText="E-mail inválido" />
    </div>
  ),
}

export const Disabled: Story = {
  args: { label: 'E-mail', disabled: true, defaultValue: 'voce@mackenzie.br' },
}
