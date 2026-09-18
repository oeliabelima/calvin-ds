import type { Meta, StoryObj } from '@storybook/react'
import { SemanticTokensPage } from './SemanticTokensPage'

const meta: Meta<typeof SemanticTokensPage> = {
  title: 'Foundations/Semantic Tokens',
  component: SemanticTokensPage,
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof SemanticTokensPage>

export const Overview: Story = {}
