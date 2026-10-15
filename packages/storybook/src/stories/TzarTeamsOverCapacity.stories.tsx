import type { Meta, StoryObj } from '@storybook/react-vite'
import { TEAMS_OVER_CAPACITY } from '@tzardom-ui/mocks'
import { TzarTeamsOverCapacity } from '@tzardom-ui/react'

const meta: Meta<typeof TzarTeamsOverCapacity> = {
  title: 'ReactComponentLibrary/TzarTeamsOverCapacity',
  component: TzarTeamsOverCapacity,
  args: {
    title: TEAMS_OVER_CAPACITY.title,
    status: 'ready',
    teams: TEAMS_OVER_CAPACITY.teams,
  },
}
export default meta

type Story = StoryObj<typeof TzarTeamsOverCapacity>

export const Default: Story = {}

export const Empty: Story = {
  args: { teams: [] },
}

export const Loading: Story = {
  args: { status: 'loading' },
}

export const ErrorState: Story = {
  args: { status: 'error' },
}
