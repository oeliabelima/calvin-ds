import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Radio } from './Radio'

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    docs: {
      description: {
        component:
          'Radio CalvinDS para seleção única em grupos. Alvo interativo de 48px, controle circular de 24px. Sempre use o mesmo `name` para agrupar.',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Radio>

export const Playground: Story = {
  render: () => {
    const [value, setValue] = useState('card')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Radio
          label="Cartão de crédito"
          name="payment"
          checked={value === 'card'}
          onChange={() => setValue('card')}
        />
        <Radio label="Boleto" name="payment" checked={value === 'boleto'} onChange={() => setValue('boleto')} />
        <Radio label="Pix" name="payment" checked={value === 'pix'} onChange={() => setValue('pix')} />
      </div>
    )
  },
}

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Radio label="Unchecked" name="qa1" checked={false} onChange={() => {}} />
      <Radio label="Checked" name="qa2" checked onChange={() => {}} />
      <Radio label="Disabled unchecked" name="qa3" disabled />
      <Radio label="Disabled checked" name="qa4" checked disabled onChange={() => {}} />
    </div>
  ),
}
