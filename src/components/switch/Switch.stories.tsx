import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './Switch'

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component:
          'Switch CalvinDS para configurações binárias com efeito imediato. Value: Off/On.',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Switch>

export const Playground: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false)
    return <Switch {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />
  },
  args: { label: 'Notificações por e-mail' },
}

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Switch label="Off" checked={false} onChange={() => {}} />
      <Switch label="On" checked onChange={() => {}} />
      <Switch label="Disabled off" disabled />
      <Switch label="Disabled on" checked disabled onChange={() => {}} />
    </div>
  ),
}
