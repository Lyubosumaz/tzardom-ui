import type { Meta, StoryObj } from '@storybook/react-vite'
import { WIDGET_SECTION } from '@tzardom-ui/mocks'
// Internal, so not exported from @tzardom-ui/react: imported from the source.
import { WidgetSection } from '@/components/WidgetSection/WidgetSection'

// A stand-in for the real content, only to show where `children` goes.
const MockContent = () => (
  <ul className="space-y-1 text-sm">
    {WIDGET_SECTION.rows.map((row) => (
      <li key={row}>{row}</li>
    ))}
  </ul>
)

const meta: Meta<typeof WidgetSection> = {
  title: 'Internal/WidgetSection',
  component: WidgetSection,
  parameters: {
    docs: {
      description: {
        component:
          'Internal frame shared by TzarTeamsOverCapacity and TzarUpcomingRiskEvents. Not exported from the package.',
      },
    },
  },
  args: {
    title: WIDGET_SECTION.title,
    status: 'ready',
    isEmpty: false,
    loadingText: WIDGET_SECTION.loadingText,
    errorText: WIDGET_SECTION.errorText,
    emptyText: WIDGET_SECTION.emptyText,
    children: <MockContent />,
  },
}
export default meta

type Story = StoryObj<typeof WidgetSection>

export const Ready: Story = {}

export const Empty: Story = {
  args: { isEmpty: true },
}

export const Loading: Story = {
  args: { status: 'loading' },
}

export const ErrorState: Story = {
  args: { status: 'error' },
}
