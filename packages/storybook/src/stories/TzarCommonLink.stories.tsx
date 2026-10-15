import type { Meta, StoryObj } from '@storybook/react-vite'
import { LOGIN_LINK, OVERVIEW_LINK } from '@tzardom-ui/mocks'
import { TzarCommonLink } from '@tzardom-ui/react'

const meta: Meta<typeof TzarCommonLink> = {
  title: 'ReactComponentLibrary/TzarCommonLink',
  component: TzarCommonLink,
  args: {
    href: LOGIN_LINK.href,
    children: LOGIN_LINK.text,
  },
}
export default meta

type Story = StoryObj<typeof TzarCommonLink>

export const Default: Story = {}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    href: OVERVIEW_LINK.href,
    children: OVERVIEW_LINK.text,
  },
}
