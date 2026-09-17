import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component:
          'Checkbox CalvinDS com alvo interativo de 48px e controle visual de 24px. Selection: Unchecked/Checked/Indeterminate.',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Checkbox>

export const Playground: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false)
    return <Checkbox {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />
  },
  args: { label: 'Aceito os termos' },
}

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Checkbox label="Unchecked" checked={false} onChange={() => {}} />
      <Checkbox label="Checked" checked onChange={() => {}} />
      <Checkbox label="Indeterminate" indeterminate onChange={() => {}} />
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" checked disabled onChange={() => {}} />
    </div>
  ),
}
