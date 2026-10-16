import type { ComponentPropsWithoutRef } from 'react'
import type { TzarWidgetStatus } from '../WidgetSection/WidgetSection.types'

export type TzarRiskEvent = {
  id: string
  label: string
  teamName?: string
  description: string
  date: string
}

export type TzarUpcomingRiskEventsProps = Omit<
  ComponentPropsWithoutRef<'section'>,
  'title' | 'children'
> & {
  title: string
  status: TzarWidgetStatus
  events: readonly TzarRiskEvent[]
  loadingText?: string
  errorText?: string
  emptyText?: string
}
