import type { Meta, StoryObj } from '@storybook/react-vite'
import { TEST_ID } from '@tzardom-ui/mocks'
import { TzarThemeToggle } from '@tzardom-ui/react'

const meta: Meta<typeof TzarThemeToggle> = {
  title: 'ReactComponentLibrary/TzarThemeToggle',
  component: TzarThemeToggle,
  args: { 'data-testid': TEST_ID },
}
export default meta

type Story = StoryObj<typeof TzarThemeToggle>

// The e2e tests use this story.
export const Default: Story = {}
