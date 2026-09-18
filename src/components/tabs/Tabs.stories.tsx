import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsItem } from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component: 'Navegação por abas. Use Selected em exatamente um item por tablist.',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Tabs>

export const Playground: Story = {
  render: () => {
    const [value, setValue] = useState('overview')
    return (
      <Tabs value={value} onChange={setValue}>
        <TabsItem value="overview">Visão geral</TabsItem>
        <TabsItem value="curriculum">Matriz curricular</TabsItem>
        <TabsItem value="market">Mercado</TabsItem>
        <TabsItem value="disabled" disabled>
          Indisponível
        </TabsItem>
      </Tabs>
    )
  },
}

export const Large: Story = {
  render: () => {
    const [value, setValue] = useState('overview')
    return (
      <Tabs value={value} onChange={setValue} size="lg">
        <TabsItem value="overview">Visão geral</TabsItem>
        <TabsItem value="curriculum">Matriz curricular</TabsItem>
      </Tabs>
    )
  },
}
