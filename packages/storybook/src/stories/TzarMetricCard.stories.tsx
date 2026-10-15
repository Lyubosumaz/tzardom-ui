import type { Meta, StoryObj } from '@storybook/react-vite'
import { METRIC } from '@tzardom-ui/mocks'
import { TzarMetricCard } from '@tzardom-ui/react'

const meta: Meta<typeof TzarMetricCard> = {
  title: 'ReactComponentLibrary/TzarMetricCard',
  component: TzarMetricCard,
  args: {
    label: METRIC.label,
    value: METRIC.value,
    helperText: METRIC.helperText,
  },
}
export default meta

type Story = StoryObj<typeof TzarMetricCard>

export const Default: Story = {}
