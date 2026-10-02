import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { TzarCommonLink } from './TzarCommonLink'

const meta: Meta<typeof TzarCommonLink> = {
  title: 'ReactComponentLibrary/TzarCommonLink',
  component: TzarCommonLink,
  args: {
    href: '#login',
    children: 'Log in',
  },
}
export default meta

type Story = StoryObj<typeof TzarCommonLink>

export const Default: Story = {}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Overview',
  },
}
