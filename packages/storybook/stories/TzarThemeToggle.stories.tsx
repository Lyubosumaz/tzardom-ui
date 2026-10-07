import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  ThemeColorMode,
  TzarProvider,
  TzarThemeToggle,
} from '@tzardom-ui/react'
import { expect, fn, waitFor } from 'storybook/test'

const meta: Meta<typeof TzarThemeToggle> = {
  title: 'ReactComponentLibrary/TzarThemeToggle',
  component: TzarThemeToggle,
  argTypes: {
    theme: {
      control: 'inline-radio',
      options: [ThemeColorMode.LIGHT, ThemeColorMode.DARK],
    },
  },
}
export default meta

type Story = StoryObj<typeof TzarThemeToggle>

export const Uncontrolled: Story = {
  args: {
    onThemeChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const button = canvasElement.querySelector('button') as HTMLButtonElement

    button.click()

    await waitFor(async () => {
      await expect(args.onThemeChange).toHaveBeenCalledWith(ThemeColorMode.DARK)
    })
  },
}

export const Dark: Story = {
  args: {
    theme: ThemeColorMode.DARK,
  },
}

// Inside a TzarProvider: the theme goes on <html data-theme> and is saved, so
// it survives a reload. The e2e tests use this story.
export const WithProvider: Story = {
  decorators: [
    (Story) => (
      <TzarProvider storageKey="tzardom-storybook-theme">
        <Story />
      </TzarProvider>
    ),
  ],
}
