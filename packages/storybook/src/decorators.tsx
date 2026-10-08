import type { Decorator } from '@storybook/react-vite'
import { THEME_STORAGE_KEY } from '@tzardom-ui/mocks'
import { TzarProvider } from '@tzardom-ui/react'

export const withTzarProvider: Decorator = (Story) => (
  <TzarProvider storageKey={THEME_STORAGE_KEY}>
    <Story />
  </TzarProvider>
)
