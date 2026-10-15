import type { Meta, StoryObj } from '@storybook/react-vite'
import { BUTTON } from '@tzardom-ui/mocks'
import { TzarButton } from '@tzardom-ui/react'
import { fn } from 'storybook/test'

const meta: Meta<typeof TzarButton> = {
  title: 'ReactComponentLibrary/TzarButton',
  component: TzarButton,
  args: {
    children: BUTTON.text,
    onClick: fn(),
  },
}
export default meta

type Story = StoryObj<typeof TzarButton>

export const Secondary: Story = {}

export const Primary: Story = {
  args: { variant: 'primary' },
}

export const Soft: Story = {
  args: { variant: 'soft' },
}

export const Danger: Story = {
  args: { variant: 'danger' },
}

export const Medium: Story = {
  args: { variant: 'primary', size: 'md' },
}

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true },
}
