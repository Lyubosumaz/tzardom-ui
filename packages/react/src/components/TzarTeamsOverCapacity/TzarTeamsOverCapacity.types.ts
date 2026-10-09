import type { ComponentPropsWithoutRef } from 'react'

export interface TzarTeamCapacity {
  id: string
  name: string
  workload: number
  capacity: number
}

export type TzarTeamsOverCapacityProps = Omit<
  ComponentPropsWithoutRef<'section'>,
  'title' | 'children'
> & {
  'data-testid': string
  title: string
  status: 'loading' | 'error' | 'ready'
  teams: readonly TzarTeamCapacity[]
  loadingText?: string
  errorText?: string
  emptyText?: string
  usedText?: string
}
