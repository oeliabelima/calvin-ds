import type { Meta, StoryObj } from '@storybook/react-vite'

import { TokenUsageOverview } from './TokenUsageOverview'

const meta = {
  title: 'Foundations/Token Usage',
  component: TokenUsageOverview,
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TokenUsageOverview>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {}
