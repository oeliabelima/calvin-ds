import type { Meta, StoryObj } from '@storybook/react'
import { PrimitiveTokensPage } from './PrimitiveTokensPage'

const meta: Meta<typeof PrimitiveTokensPage> = {
  title: 'Foundations/Primitive Tokens',
  component: PrimitiveTokensPage,
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof PrimitiveTokensPage>

export const Overview: Story = {}
