import { render, screen } from '@testing-library/react'
import { METRIC } from '@tzardom-ui/mocks'
import { describe, expect, test } from 'vitest'
import { TzarMetricCard } from './TzarMetricCard'
import type { TzarMetricCardProps } from './TzarMetricCard.types'

const renderCard = (props: Partial<TzarMetricCardProps> = {}) =>
  render(
    <TzarMetricCard
      label={METRIC.label}
      value={METRIC.value}
      helperText={METRIC.helperText}
      {...props}
    />,
  )

const getCard = () => screen.getByRole('term').closest('dl') as HTMLElement

describe('TzarMetricCard', () => {
  test('shows the label as a term, and the value and helper text as its descriptions', () => {
    renderCard()

    expect(screen.getByRole('term').textContent).toBe(METRIC.label)
    expect(
      screen.getAllByRole('definition').map((item) => item.textContent),
    ).toEqual([String(METRIC.value), METRIC.helperText])
  })

  test('shows a text value as it is', () => {
    renderCard({ value: '75%' })

    expect(screen.getAllByRole('definition')[0].textContent).toBe('75%')
  })

  test('className overrides a conflicting built-in class', () => {
    renderCard({ className: 'shadow-none' })
    const classes = getCard().className.split(' ')

    expect(classes).toContain('shadow-none')
    expect(classes).not.toContain('shadow-lg')
    expect(classes).toContain('rounded-lg')
  })

  test('passes data-testid through to its root element, the dl', () => {
    renderCard({ 'data-testid': 'mock' } as Partial<TzarMetricCardProps>)

    expect(screen.getByTestId('mock')).toBe(getCard())
  })
})
