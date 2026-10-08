import type { Preview } from '@storybook/react-vite'
import { withTzarProvider } from '@/decorators'
import './tailwind.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  // Every story runs inside a TzarProvider, as an app would.
  decorators: [withTzarProvider],
  tags: ['autodocs'],
}

export default preview
