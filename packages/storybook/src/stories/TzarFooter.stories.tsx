import type { Meta, StoryObj } from '@storybook/react-vite'
import { FOOTER, TEST_ID } from '@tzardom-ui/mocks'
import { TzarFooter } from '@tzardom-ui/react'

const meta: Meta<typeof TzarFooter> = {
  title: 'ReactComponentLibrary/TzarFooter',
  component: TzarFooter,
  args: { ...FOOTER, 'data-testid': TEST_ID },
}
export default meta

type Story = StoryObj<typeof TzarFooter>

export const Default: Story = {}
