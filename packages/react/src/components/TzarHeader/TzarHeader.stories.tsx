import { Meta, StoryObj } from '@storybook/react-webpack5'
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
    await waitFor(() => {
      const text = getHeaderText(canvasElement)
      expect(text).toContain('Forest Runner')
      expect(text).toContain('Social')
    })
  },
}

export const LoggedOut: Story = {
  args: {
    isLogged: false,
  },
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      const text = getHeaderText(canvasElement)
      expect(text).toContain('Home')
      expect(text).toContain('Register')
    })
  },
}
