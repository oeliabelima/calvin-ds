import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
  useOf,
} from '@storybook/addon-docs/blocks'

import { TokenUsagePanel } from './TokenUsagePanel'

export function CalvinDocsPage() {
  const resolved = useOf('meta', ['meta'])

  return (
    <>
      <Title />
      <Subtitle />
      <Description />
      <Primary />
      <Controls />
      <Stories />
      <TokenUsagePanel title={resolved.preparedMeta.title} />
    </>
  )
}
