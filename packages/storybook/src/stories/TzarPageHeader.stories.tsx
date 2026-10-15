import type { Meta, StoryObj } from '@storybook/react-vite'
import { PAGE_HEADER } from '@tzardom-ui/mocks'
import { TzarPageHeader } from '@tzardom-ui/react'

const meta: Meta<typeof TzarPageHeader> = {
  title: 'ReactComponentLibrary/TzarPageHeader',
  component: TzarPageHeader,
  args: {
    title: PAGE_HEADER.title,
    description: PAGE_HEADER.description,
  },
}
export default meta

type Story = StoryObj<typeof TzarPageHeader>

export const Default: Story = {}

export const SectionHeading: Story = {
  args: { as: 'h2' },
}
