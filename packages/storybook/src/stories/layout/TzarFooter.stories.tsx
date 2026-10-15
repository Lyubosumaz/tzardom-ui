import type { Meta, StoryObj } from '@storybook/react-vite'
import { FOOTER } from '@tzardom-ui/mocks'
import { TzarFooter } from '@tzardom-ui/react'

const meta: Meta<typeof TzarFooter> = {
  title: 'Layout/TzarFooter',
  component: TzarFooter,
  args: { ...FOOTER },
}
export default meta

type Story = StoryObj<typeof TzarFooter>

export const Default: Story = {}
