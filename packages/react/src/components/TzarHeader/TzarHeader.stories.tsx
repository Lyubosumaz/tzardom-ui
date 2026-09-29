import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { expect, waitFor } from 'storybook/test'
import { TzarHeader } from '@/generated/components'

const meta: Meta<typeof TzarHeader> = {
  title: 'ReactComponentLibrary/TzarHeader',
  component: TzarHeader,
}
export default meta

type Story = StoryObj<typeof TzarHeader>

const getHeaderText = (canvasElement: HTMLElement) => {
  const host = canvasElement.querySelector('tzar-header') as HTMLElement
  return host.shadowRoot?.textContent ?? ''
}

export const Header: Story = {
  args: {
    isLogged: true,
  },
  play: async ({ canvasElement }) => {
    await waitFor(async () => {
      const text = getHeaderText(canvasElement)
      await expect(text).toContain('Forest Runner')
      await expect(text).toContain('Social')
    })
  },
}

export const LoggedOut: Story = {
  args: {
    isLogged: false,
  },
  play: async ({ canvasElement }) => {
    await waitFor(async () => {
      const text = getHeaderText(canvasElement)
      await expect(text).toContain('Home')
      await expect(text).toContain('Register')
    })
  },
}
