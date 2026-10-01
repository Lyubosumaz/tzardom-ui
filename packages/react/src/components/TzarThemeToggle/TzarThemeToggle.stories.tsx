import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { expect, fn, waitFor } from 'storybook/test'
import { ThemeColorMode } from '@tzardom-ui/types'
import { TzarThemeToggle } from './TzarThemeToggle'

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
    const host = canvasElement.querySelector('tzar-icon-button') as HTMLElement

    host.click()

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
