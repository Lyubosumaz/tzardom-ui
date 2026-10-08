import { render, screen } from '@testing-library/react'
import { FOOTER, TEST_ID } from '@tzardom-ui/mocks'
import { describe, expect, test } from 'vitest'
import { TEST_ID_PREFIXES } from '@/constants/testIdPrefixes'
import { TzarFooter } from './TzarFooter'

const FOOTER_ID = `${TEST_ID_PREFIXES.footer}-${TEST_ID}`

const getFooter = () => screen.getByTestId(FOOTER_ID)

describe('TzarFooter', () => {
  test('shows the copyright, the app name and what it is built with', () => {
    render(<TzarFooter data-testid={TEST_ID} {...FOOTER} />)

    expect(screen.getByText(FOOTER.copyright)).toBeTruthy()
    expect(screen.getByText(FOOTER.appName)).toBeTruthy()
    expect(screen.getByText(FOOTER.builtWith)).toBeTruthy()
  })

  test('is a <footer>, so screen readers find it as the page footer', () => {
    render(<TzarFooter data-testid={TEST_ID} {...FOOTER} />)

    expect(getFooter().tagName).toBe('FOOTER')
  })

  test('className overrides a conflicting built-in class', () => {
    render(<TzarFooter data-testid={TEST_ID} {...FOOTER} className="mt-0" />)
    const classes = getFooter().className.split(' ')

    expect(classes).toContain('mt-0')
    expect(classes).not.toContain('mt-auto')
    expect(classes).toContain('border-t')
  })

  test('passes data-testid to its root element, the <footer>', () => {
    const { container } = render(
      <TzarFooter data-testid={TEST_ID} {...FOOTER} />,
    )

    expect(getFooter()).toBe(container.firstChild)
  })

  test('gives its parts test ids built from data-testid', () => {
    render(<TzarFooter data-testid={TEST_ID} {...FOOTER} />)

    expect(screen.getByTestId(`${FOOTER_ID}-copyright`).textContent).toBe(
      FOOTER.copyright,
    )
    expect(screen.getByTestId(`${FOOTER_ID}-app-name`).textContent).toBe(
      FOOTER.appName,
    )
    expect(screen.getByTestId(`${FOOTER_ID}-built-with`).textContent).toBe(
      FOOTER.builtWith,
    )
  })
})
