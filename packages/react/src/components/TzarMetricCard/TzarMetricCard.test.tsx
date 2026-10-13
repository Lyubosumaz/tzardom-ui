import { render, screen } from '@testing-library/react'
import { METRIC, TEST_ID } from '@tzardom-ui/mocks'
import { describe, expect, test } from 'vitest'
import { TEST_ID_PREFIXES } from '@/constants/testIdPrefixes'
import { TzarMetricCard } from './TzarMetricCard'

const ROOT_ID = `${TEST_ID_PREFIXES.metricCard}-${TEST_ID}`

const renderCard = (className?: string) =>
  render(
    <TzarMetricCard
      data-testid={TEST_ID}
      label={METRIC.label}
      value={METRIC.value}
      helperText={METRIC.helperText}
      className={className}
    />,
  )

describe('TzarMetricCard', () => {
  test('shows the label as a term, and the value and helper text as its descriptions', () => {
    renderCard()

    expect(screen.getByRole('term').textContent).toBe(METRIC.label)
    expect(
      screen.getAllByRole('definition').map((item) => item.textContent),
    ).toEqual([String(METRIC.value), METRIC.helperText])
  })

  test('shows a text value as it is', () => {
    render(
      <TzarMetricCard
        data-testid={TEST_ID}
        label={METRIC.label}
        value="75%"
        helperText={METRIC.helperText}
      />,
    )

    expect(screen.getByTestId(`${ROOT_ID}-value`).textContent).toBe('75%')
  })

  test('className overrides a conflicting built-in class', () => {
    renderCard('shadow-none')
    const classes = screen.getByTestId(ROOT_ID).className.split(' ')

    expect(classes).toContain('shadow-none')
    expect(classes).not.toContain('shadow-lg')
    expect(classes).toContain('rounded-lg')
  })

  test('passes data-testid to its root element, the dl', () => {
    const { container } = renderCard()

    expect(screen.getByTestId(ROOT_ID)).toBe(container.firstChild)
    expect(screen.getByTestId(ROOT_ID).tagName).toBe('DL')
  })

  test('gives its parts test ids built from data-testid', () => {
    renderCard()

    expect(screen.getByTestId(`${ROOT_ID}-label`).textContent).toBe(
      METRIC.label,
    )
    expect(screen.getByTestId(`${ROOT_ID}-value`).textContent).toBe(
      String(METRIC.value),
    )
    expect(screen.getByTestId(`${ROOT_ID}-helper-text`).textContent).toBe(
      METRIC.helperText,
    )
  })
})
