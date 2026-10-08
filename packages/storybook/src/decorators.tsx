import type { Decorator } from '@storybook/react-vite'
import { THEME_STORAGE_KEY } from '@tzardom-ui/mocks'
import { TzarProvider } from '@tzardom-ui/react'

// Wraps a story in a TzarProvider: the theme goes on <html data-theme> and is
// saved, so it survives a reload.
export const withTzarProvider: Decorator = (Story) => (
  <TzarProvider storageKey={THEME_STORAGE_KEY}>
    <Story />
  </TzarProvider>
)
