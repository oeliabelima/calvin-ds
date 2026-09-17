import type { Preview } from '@storybook/react'
import React from 'react'
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
  globalTypes: {
    theme: {
      description: 'Tema Calvin',
      toolbar: {
        title: 'Tema',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    // Storybook otherwise inherits the OS/browser color-scheme preference,
    // which silently swaps every semantic token to its dark-mode value —
    // this pins the preview to light mode by default; use the toolbar to
    // switch and check dark mode explicitly.
    theme: 'light',
  },
  decorators: [
    (Story, context) => {
      // The light/dark split in tokens/semantic.css keys off <html
      // data-theme="...">, not an arbitrary wrapper element — the OS-driven
      // dark override only checks `:root`. Set it on the real root so the
      // toolbar toggle (and the light default) actually take effect.
      document.documentElement.dataset.theme = context.globals.theme ?? 'light'
      return React.createElement(
        'div',
        { style: { background: 'var(--color-bg)', padding: 16, minHeight: '100%' } },
        React.createElement(Story),
      )
    },
  ],
}

export default preview
