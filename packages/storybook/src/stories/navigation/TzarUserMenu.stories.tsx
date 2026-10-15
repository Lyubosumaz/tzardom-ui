import type { Meta, StoryObj } from '@storybook/react-vite'
import { USER } from '@tzardom-ui/mocks'
import { TzarUserMenu } from '@tzardom-ui/react'
import { fn } from 'storybook/test'

const meta: Meta<typeof TzarUserMenu> = {
  title: 'Navigation/TzarUserMenu',
  component: TzarUserMenu,
  args: {
    email: USER.email,
    accountHref: USER.accountHref,
    onLogout: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof TzarUserMenu>

export const Default: Story = {}
