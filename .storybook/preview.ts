import type { Preview } from '@storybook/react'
import '../src/styles.css'

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    backgrounds: {
      default: 'surface',
      values: [
        { name: 'surface', value: 'var(--color-surface)' },
        { name: 'bg', value: 'var(--color-bg)' },
        { name: 'brand', value: 'var(--color-brand)' },
      ],
    },
  },
}

export default preview
