import { render, screen } from '@testing-library/react'
import { TEST_ID, UPCOMING_RISK_EVENTS } from '@tzardom-ui/mocks'
import { describe, expect, test } from 'vitest'
import { TEST_ID_PREFIXES } from '@/constants/testIdPrefixes'
import type { TzarWidgetStatus } from '@/support/WidgetSection'
import { TzarUpcomingRiskEvents } from './TzarUpcomingRiskEvents'
import type { TzarRiskEvent } from './TzarUpcomingRiskEvents.types'

const ROOT_ID = `${TEST_ID_PREFIXES.upcomingRiskEvents}-${TEST_ID}`
const { title, events } = UPCOMING_RISK_EVENTS
const [eventA, eventB] = events

const renderWidget = (
  status: TzarWidgetStatus,
  shownEvents: readonly TzarRiskEvent[] = events,
) =>
  render(
    <TzarUpcomingRiskEvents
      data-testid={TEST_ID}
      title={title}
      status={status}
      events={shownEvents}
    />,
  )

describe('TzarUpcomingRiskEvents', () => {
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
      'Loading upcoming risk events…',
    )
    expect(screen.getByTestId(ROOT_ID).getAttribute('aria-busy')).toBe('true')
    expect(screen.queryByRole('list')).toBeNull()
  })

  test('shows the error text on error', () => {
    renderWidget('error')

    expect(screen.getByTestId(`${ROOT_ID}-error`).textContent).toBe(
      'Unable to load upcoming risk events right now.',
    )
    expect(screen.queryByRole('list')).toBeNull()
  })

  test('shows the empty text when there are no events', () => {
    renderWidget('ready', [])

    expect(screen.getByTestId(`${ROOT_ID}-empty`).textContent).toBe(
      'No upcoming vacations or critical events.',
    )
    expect(screen.queryByRole('list')).toBeNull()
  })

  test('lists each event with its label, team, description and date', () => {
    renderWidget('ready')
    const items = screen.getAllByRole('listitem')

    expect(items.map((item) => item.textContent)).toEqual([
      `${eventA.label} · ${eventA.teamName}${eventA.description} (${eventA.date})`,
      `${eventB.label}${eventB.description} (${eventB.date})`,
    ])
  })

  test('marks each date with a <time> element', () => {
    renderWidget('ready', [eventA])
    const time = screen.getByText(`(${eventA.date})`)

    expect(time.tagName).toBe('TIME')
    expect(time.getAttribute('dateTime')).toBe(eventA.date)
  })

  test('uses custom texts', () => {
    const { rerender } = renderWidget('loading', [])

    for (const [status, prop, part] of [
      ['loading', 'loadingText', 'loading'],
      ['error', 'errorText', 'error'],
      ['ready', 'emptyText', 'empty'],
    ] as const) {
      rerender(
        <TzarUpcomingRiskEvents
          data-testid={TEST_ID}
          title={title}
          status={status}
          events={[]}
          {...{ [prop]: 'Mock text' }}
        />,
      )
      expect(screen.getByTestId(`${ROOT_ID}-${part}`).textContent).toBe(
        'Mock text',
      )
    }
  })

  test('className overrides a conflicting built-in class', () => {
    render(
      <TzarUpcomingRiskEvents
        data-testid={TEST_ID}
        title={title}
        status="ready"
        events={events}
        className="space-y-4"
      />,
    )
    const classes = screen.getByTestId(ROOT_ID).className.split(' ')

    expect(classes).toContain('space-y-4')
    expect(classes).not.toContain('space-y-2')
  })

  test('passes data-testid to its root element, the section', () => {
    const { container } = renderWidget('ready')

    expect(screen.getByTestId(ROOT_ID)).toBe(container.firstChild)
    expect(screen.getByTestId(ROOT_ID).tagName).toBe('SECTION')
  })

  test('gives its parts test ids built from data-testid', () => {
    renderWidget('ready')

    expect(screen.getByTestId(`${ROOT_ID}-title`).textContent).toBe(title)
    expect(screen.getByTestId(`${ROOT_ID}-list`)).toBe(screen.getByRole('list'))
    for (const event of events) {
      expect(
        screen.getByTestId(`${ROOT_ID}-event-${event.id}`).textContent,
      ).toContain(event.description)
    }
  })
})
