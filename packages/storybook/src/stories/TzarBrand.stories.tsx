import type { Meta, StoryObj } from '@storybook/react-vite'
import { BRAND, TEST_ID } from '@tzardom-ui/mocks'
import { TzarBrand } from '@tzardom-ui/react'

const meta: Meta<typeof TzarBrand> = {
  title: 'ReactComponentLibrary/TzarBrand',
  component: TzarBrand,
  args: { ...BRAND, 'data-testid': TEST_ID },
  argTypes: { icon: { control: false } },
}
export default meta

type Story = StoryObj<typeof TzarBrand>

export const Default: Story = {}
