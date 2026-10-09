import { render, screen } from '@testing-library/react'
import { TEAMS_OVER_CAPACITY, TEST_ID } from '@tzardom-ui/mocks'
import { describe, expect, test } from 'vitest'
import { TEST_ID_PREFIXES } from '@/constants/testIdPrefixes'
import type { TzarWidgetStatus } from '@/support/WidgetSection'
import { TzarTeamsOverCapacity } from './TzarTeamsOverCapacity'

const ROOT_ID = `${TEST_ID_PREFIXES.teamsOverCapacity}-${TEST_ID}`
const { title, teams } = TEAMS_OVER_CAPACITY
const [teamA, teamB] = teams

const renderWidget = (
  status: TzarWidgetStatus,
  shownTeams: typeof teams | [] = teams,
) =>
  render(
    <TzarTeamsOverCapacity
      data-testid={TEST_ID}
      title={title}
      status={status}
      teams={shownTeams}
    />,
  )

describe('TzarTeamsOverCapacity', () => {
  test('is a section named by its heading', () => {
    renderWidget('ready')

    expect(screen.getByRole('region', { name: title })).toBe(
      screen.getByTestId(ROOT_ID),
    )
    expect(screen.getByRole('heading', { level: 2, name: title })).toBeTruthy()
  })

  test('shows the loading text and is busy while loading', () => {
    renderWidget('loading')

    expect(screen.getByTestId(`${ROOT_ID}-loading`).textContent).toBe(
      'Loading capacity data…',
    )
    expect(screen.getByTestId(ROOT_ID).getAttribute('aria-busy')).toBe('true')
    expect(screen.queryByTestId(`${ROOT_ID}-list`)).toBeNull()
  })

  test('shows the error text on error', () => {
    renderWidget('error')

    expect(screen.getByTestId(`${ROOT_ID}-error`).textContent).toBe(
      'Unable to load capacity data right now.',
    )
    expect(screen.queryByTestId(`${ROOT_ID}-list`)).toBeNull()
  })

  test('shows the empty text when no team is over capacity', () => {
    renderWidget('ready', [])

    expect(screen.getByTestId(`${ROOT_ID}-empty`).textContent).toBe(
      'No teams are currently over capacity.',
    )
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
        data-testid={TEST_ID}
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
        data-testid={TEST_ID}
        title={title}
        status="ready"
        teams={[teamA]}
        usedText="mock used"
      />,
    )
    expect(screen.getByRole('definition').textContent).toBe(
      '15/10 (150% mock used)',
    )

    for (const [status, prop, part] of [
      ['loading', 'loadingText', 'loading'],
      ['error', 'errorText', 'error'],
      ['ready', 'emptyText', 'empty'],
    ] as const) {
      rerender(
        <TzarTeamsOverCapacity
          data-testid={TEST_ID}
          title={title}
          status={status}
          teams={[]}
          {...{ [prop]: 'Mock text' }}
        />,
      )
      expect(screen.getByTestId(`${ROOT_ID}-${part}`).textContent).toBe(
        'Mock text',
      )
    }
  })

  test('passes data-testid to its root element, the section', () => {
    const { container } = renderWidget('ready')

    expect(screen.getByTestId(ROOT_ID)).toBe(container.firstChild)
    expect(screen.getByTestId(ROOT_ID).tagName).toBe('SECTION')
  })

  test('gives its parts test ids built from data-testid', () => {
    renderWidget('ready')

    expect(screen.getByTestId(`${ROOT_ID}-title`).textContent).toBe(title)
    expect(screen.getByTestId(`${ROOT_ID}-list`).tagName).toBe('DL')
    for (const team of teams) {
      expect(
        screen.getByTestId(`${ROOT_ID}-team-${team.id}`).textContent,
      ).toContain(team.name)
    }
  })
})
