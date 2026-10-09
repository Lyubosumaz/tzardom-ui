import type { ComponentPropsWithoutRef } from 'react'

export interface TzarRiskEvent {
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
  'data-testid': string
  title: string
  status: 'loading' | 'error' | 'ready'
  events: readonly TzarRiskEvent[]
  loadingText?: string
  errorText?: string
  emptyText?: string
}
