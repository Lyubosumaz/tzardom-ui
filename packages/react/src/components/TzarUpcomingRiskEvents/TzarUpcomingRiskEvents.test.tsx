import { render, screen } from '@testing-library/react'
import { UPCOMING_RISK_EVENTS } from '@tzardom-ui/mocks'
import { describe, expect, test } from 'vitest'
import type { TzarWidgetStatus } from '@/support/WidgetSection'
import { TzarUpcomingRiskEvents } from './TzarUpcomingRiskEvents'
import type { TzarRiskEvent } from './TzarUpcomingRiskEvents.types'

const { title, events } = UPCOMING_RISK_EVENTS
const [eventA, eventB] = events

const getWidget = () => screen.getByRole('region', { name: title })

const renderWidget = (
  status: TzarWidgetStatus,
  shownEvents: readonly TzarRiskEvent[] = events,
) =>
  render(
    <TzarUpcomingRiskEvents
      title={title}
      status={status}
      events={shownEvents}
    />,
  )

describe('TzarUpcomingRiskEvents', () => {
  test('is a section named by its heading', () => {
    renderWidget('ready')

    expect(getWidget().tagName).toBe('SECTION')
    expect(screen.getByRole('heading', { level: 2, name: title })).toBeTruthy()
  })

  test('shows the loading text and is busy while loading', () => {
    renderWidget('loading')

    expect(screen.getByText('Loading upcoming risk events…')).toBeTruthy()
    expect(getWidget().getAttribute('aria-busy')).toBe('true')
    expect(screen.queryByRole('list')).toBeNull()
  })

  test('shows the error text on error', () => {
    renderWidget('error')

    expect(
      screen.getByText('Unable to load upcoming risk events right now.'),
    ).toBeTruthy()
    expect(screen.queryByRole('list')).toBeNull()
  })

  test('shows the empty text when there are no events', () => {
    renderWidget('ready', [])

    expect(
      screen.getByText('No upcoming vacations or critical events.'),
    ).toBeTruthy()
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

    for (const [status, prop] of [
      ['loading', 'loadingText'],
      ['error', 'errorText'],
      ['ready', 'emptyText'],
    ] as const) {
      rerender(
        <TzarUpcomingRiskEvents
          title={title}
          status={status}
          events={[]}
          {...{ [prop]: 'Mock text' }}
        />,
      )
      expect(screen.getByText('Mock text')).toBeTruthy()
    }
  })

  test('className overrides a conflicting built-in class', () => {
    render(
      <TzarUpcomingRiskEvents
        title={title}
        status="ready"
        events={events}
        className="space-y-4"
      />,
    )
    const classes = getWidget().className.split(' ')

    expect(classes).toContain('space-y-4')
    expect(classes).not.toContain('space-y-2')
  })

  test('passes data-testid through to the section', () => {
    render(
      <TzarUpcomingRiskEvents
        title={title}
        status="ready"
        events={events}
        data-testid="mock"
      />,
    )

    expect(screen.getByTestId('mock')).toBe(getWidget())
  })
})
