import type { ComponentPropsWithoutRef } from 'react'
import type { TzarWidgetStatus } from '../WidgetSection/WidgetSection.types'

export type TzarTeamCapacity = {
  id: string
  name: string
  workload: number
  capacity: number
}

export type TzarTeamsOverCapacityProps = Omit<
  ComponentPropsWithoutRef<'section'>,
  'title' | 'children'
> & {
  title: string
  status: TzarWidgetStatus
  teams: readonly TzarTeamCapacity[]
  loadingText?: string
  errorText?: string
  emptyText?: string
  usedText?: string
}
