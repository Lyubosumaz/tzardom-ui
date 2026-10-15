import type { Meta, StoryObj } from '@storybook/react-vite'
import { UPCOMING_RISK_EVENTS } from '@tzardom-ui/mocks'
import { TzarUpcomingRiskEvents } from '@tzardom-ui/react'

const meta: Meta<typeof TzarUpcomingRiskEvents> = {
  title: 'ReactComponentLibrary/TzarUpcomingRiskEvents',
  component: TzarUpcomingRiskEvents,
  args: {
    title: UPCOMING_RISK_EVENTS.title,
    status: 'ready',
    events: UPCOMING_RISK_EVENTS.events,
  },
}
export default meta

type Story = StoryObj<typeof TzarUpcomingRiskEvents>

export const Default: Story = {}

export const Empty: Story = {
  args: { events: [] },
}

export const Loading: Story = {
  args: { status: 'loading' },
}

export const ErrorState: Story = {
  args: { status: 'error' },
}
