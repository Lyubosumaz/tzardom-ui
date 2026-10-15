import type { Meta, StoryObj } from '@storybook/react-vite'
import { TEXT_FIELD } from '@tzardom-ui/mocks'
import { TzarTextField } from '@tzardom-ui/react'

const meta: Meta<typeof TzarTextField> = {
  title: 'ReactComponentLibrary/TzarTextField',
  component: TzarTextField,
  args: {
    label: TEXT_FIELD.label,
  },
}
export default meta

type Story = StoryObj<typeof TzarTextField>

export const Default: Story = {}

export const WithError: Story = {
  args: { error: TEXT_FIELD.error },
}

export const Password: Story = {
  args: { type: 'password' },
}
