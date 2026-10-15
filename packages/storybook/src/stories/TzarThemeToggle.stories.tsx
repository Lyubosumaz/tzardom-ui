import type { Meta, StoryObj } from '@storybook/react-vite'
import { TzarThemeToggle } from '@tzardom-ui/react'

const meta: Meta<typeof TzarThemeToggle> = {
  title: 'ReactComponentLibrary/TzarThemeToggle',
  component: TzarThemeToggle,
}
export default meta

type Story = StoryObj<typeof TzarThemeToggle>

// The e2e tests use this story.
export const Default: Story = {}
