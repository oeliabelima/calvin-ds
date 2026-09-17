import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from './Icon'

const meta: Meta<typeof Icon> = {
  title: 'Foundations/Icon',
  component: Icon,
  parameters: {
    docs: {
      description: {
        component:
          'Wrapper sobre @phosphor-icons/react. O tamanho vem sempre dos tokens --icon-size-sm/md/lg/xl, nunca de um valor solto em pixels.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    weight: {
      control: 'select',
      options: ['thin', 'light', 'regular', 'bold', 'fill', 'duotone'],
    },
  },
}
export default meta

type Story = StoryObj<typeof Icon>

export const Playground: Story = {
  args: { name: 'CheckCircle', size: 'md', weight: 'regular' },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Icon name="CheckCircle" size="sm" />
      <Icon name="CheckCircle" size="md" />
      <Icon name="CheckCircle" size="lg" />
      <Icon name="CheckCircle" size="xl" />
    </div>
  ),
}
