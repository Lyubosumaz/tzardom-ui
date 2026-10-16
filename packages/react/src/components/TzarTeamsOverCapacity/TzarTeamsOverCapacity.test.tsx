import { render, screen } from '@testing-library/react'
import { TEAMS_OVER_CAPACITY } from '@tzardom-ui/mocks'
import { describe, expect, test } from 'vitest'
import type { TzarWidgetStatus } from '@/components/WidgetSection/WidgetSection.types'
import { TzarTeamsOverCapacity } from './TzarTeamsOverCapacity'

const { title, teams } = TEAMS_OVER_CAPACITY
const [teamA, teamB] = teams

const getWidget = () => screen.getByRole('region', { name: title })

const renderWidget = (
  status: TzarWidgetStatus,
  shownTeams: typeof teams | [] = teams,
) =>
  render(
    <TzarTeamsOverCapacity title={title} status={status} teams={shownTeams} />,
  )

describe('TzarTeamsOverCapacity', () => {
  test('is a section named by its heading', () => {
    renderWidget('ready')

    expect(getWidget().tagName).toBe('SECTION')
    expect(screen.getByRole('heading', { level: 2, name: title })).toBeTruthy()
  })

  test('shows the loading text and is busy while loading', () => {
    renderWidget('loading')

    expect(screen.getByText('Loading capacity data…')).toBeTruthy()
    expect(getWidget().getAttribute('aria-busy')).toBe('true')
    expect(screen.queryByRole('term')).toBeNull()
  })

  test('shows the error text on error', () => {
    renderWidget('error')

    expect(
      screen.getByText('Unable to load capacity data right now.'),
    ).toBeTruthy()
    expect(screen.queryByRole('term')).toBeNull()
  })

  test('shows the empty text when no team is over capacity', () => {
    renderWidget('ready', [])

    expect(
      screen.getByText('No teams are currently over capacity.'),
    ).toBeTruthy()
  })

  test('lists each team with its workload, capacity and percent used', () => {
    renderWidget('ready')

    expect(screen.getAllByRole('term').map((term) => term.textContent)).toEqual(
      [teamA.name, teamB.name],
    )
    expect(
      screen.getAllByRole('definition').map((value) => value.textContent),
    ).toEqual(['15/10 (150% used)', '7/6 (117% used)'])
  })

  test('shows 0% for a team with no capacity', () => {
    render(
      <TzarTeamsOverCapacity
        title={title}
        status="ready"
        teams={[{ ...teamA, capacity: 0 }]}
      />,
    )

    expect(screen.getByRole('definition').textContent).toBe('15/0 (0% used)')
  })

  test('uses custom texts', () => {
    const { rerender } = render(
      <TzarTeamsOverCapacity
        title={title}
        status="ready"
        teams={[teamA]}
        usedText="mock used"
      />,
    )
    expect(screen.getByRole('definition').textContent).toBe(
      '15/10 (150% mock used)',
    )

    for (const [status, prop] of [
      ['loading', 'loadingText'],
      ['error', 'errorText'],
      ['ready', 'emptyText'],
    ] as const) {
      rerender(
        <TzarTeamsOverCapacity
          title={title}
          status={status}
          teams={[]}
          {...{ [prop]: 'Mock text' }}
        />,
      )
      expect(screen.getByText('Mock text')).toBeTruthy()
    }
  })

  test('passes data-testid through to the section', () => {
    render(
      <TzarTeamsOverCapacity
        title={title}
        status="ready"
        teams={teams}
        data-testid="mock"
      />,
    )

    expect(screen.getByTestId('mock')).toBe(getWidget())
  })
})
