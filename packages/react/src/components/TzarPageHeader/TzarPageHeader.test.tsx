import { render, screen } from '@testing-library/react'
import { PAGE_HEADER, TEST_ID } from '@tzardom-ui/mocks'
import { describe, expect, test } from 'vitest'
import { TEST_ID_PREFIXES } from '@/constants/testIdPrefixes'
import { TzarPageHeader } from './TzarPageHeader'

const ROOT_ID = `${TEST_ID_PREFIXES.pageHeader}-${TEST_ID}`
const { title, description } = PAGE_HEADER

describe('TzarPageHeader', () => {
  test('shows the title as an h1 and the description below it', () => {
    render(
      <TzarPageHeader
        data-testid={TEST_ID}
        title={title}
        description={description}
      />,
    )

    expect(screen.getByRole('heading', { level: 1, name: title })).toBeTruthy()
    expect(screen.getByTestId(`${ROOT_ID}-description`).textContent).toBe(
      description,
    )
  })

  test('uses the heading level from as, with the smaller style', () => {
    render(
      <TzarPageHeader
        data-testid={TEST_ID}
        title={title}
        description={description}
        as="h2"
      />,
    )
    const heading = screen.getByRole('heading', { level: 2, name: title })

    expect(heading.className).toContain('text-sm')
    expect(screen.getByTestId(ROOT_ID).className).toContain('space-y-1')
  })

  test('gives an h1 the large page title style', () => {
    render(
      <TzarPageHeader
        data-testid={TEST_ID}
        title={title}
        description={description}
      />,
    )

    expect(screen.getByRole('heading', { level: 1 }).className).toContain(
      'text-2xl',
    )
    expect(screen.getByTestId(ROOT_ID).className).toContain('pb-10')
  })

  test('className overrides a conflicting built-in class', () => {
    render(
      <TzarPageHeader
        data-testid={TEST_ID}
        title={title}
        description={description}
        className="pb-4"
      />,
    )
    const classes = screen.getByTestId(ROOT_ID).className.split(' ')

    expect(classes).toContain('pb-4')
    expect(classes).not.toContain('pb-10')
  })

  test('passes data-testid to its root element, the hgroup', () => {
    const { container } = render(
      <TzarPageHeader
        data-testid={TEST_ID}
        title={title}
        description={description}
      />,
    )

    expect(screen.getByTestId(ROOT_ID)).toBe(container.firstChild)
    expect(screen.getByTestId(ROOT_ID).tagName).toBe('HGROUP')
  })

  test('gives its parts test ids built from data-testid', () => {
    render(
      <TzarPageHeader
        data-testid={TEST_ID}
        title={title}
        description={description}
      />,
    )

    expect(screen.getByTestId(`${ROOT_ID}-title`)).toBe(
      screen.getByRole('heading', { name: title }),
    )
    expect(screen.getByTestId(`${ROOT_ID}-description`).tagName).toBe('P')
  })
})
