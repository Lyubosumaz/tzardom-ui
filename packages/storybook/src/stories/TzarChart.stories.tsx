import type { Meta, StoryObj } from '@storybook/react-vite'
import { CHART, TEST_ID } from '@tzardom-ui/mocks'
import { TzarChart } from '@tzardom-ui/react'

const meta: Meta<typeof TzarChart> = {
  title: 'ReactComponentLibrary/TzarChart',
  component: TzarChart,
  args: {
    'data-testid': TEST_ID,
    type: 'line',
    title: CHART.title,
    subtitle: CHART.subtitle,
    data: CHART.data,
    xKey: CHART.xKey,
    xLabel: CHART.xLabel,
    series: CHART.series,
  },
}
export default meta

type Story = StoryObj<typeof TzarChart>

export const Line: Story = {}

export const Bar: Story = {
  args: { type: 'bar' },
}

export const OneSeries: Story = {
  args: { series: [CHART.series[0]] },
}

export const Empty: Story = {
  args: { data: [] },
}
