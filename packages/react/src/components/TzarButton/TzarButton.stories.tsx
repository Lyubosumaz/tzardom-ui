import { Meta, StoryObj } from '@storybook/react'
import { expect, fn, waitFor } from '@storybook/test'
import { TzarButton } from '../../generated/components'

const meta: Meta<typeof TzarButton> = {
  title: 'ReactComponentLibrary/TzarButton',
  component: TzarButton,
}
export default meta

type Story = StoryObj<typeof TzarButton>

export const HelloWorld: Story = {
  args: {
    label: 'Click me!',
    onThemeChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    // tzar-button renders in a shadow root, so reach through it directly
    // rather than relying on Testing Library queries, which don't pierce it.
    const host = canvasElement.querySelector('tzar-button') as HTMLElement

    await waitFor(() => {
      expect(host.shadowRoot?.textContent).toContain('Click me!')
    })

    const button = host.shadowRoot?.querySelector(
      'button',
    ) as HTMLButtonElement
    button.click()

    await waitFor(() => {
      expect(args.onThemeChange).toHaveBeenCalledTimes(1)
    })
  },
}
