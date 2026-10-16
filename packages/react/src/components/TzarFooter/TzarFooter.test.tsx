import { render, screen } from '@testing-library/react'
import { FOOTER } from '@tzardom-ui/mocks'
import { describe, expect, test } from 'vitest'
import { TzarFooter } from './TzarFooter'

const renderFooter = (props = {}) =>
  render(<TzarFooter {...FOOTER} {...props} />)

describe('TzarFooter', () => {
  test('shows the copyright, the app name and what it is built with', () => {
    renderFooter()

    expect(screen.getByText(FOOTER.copyright)).toBeTruthy()
    expect(screen.getByText(FOOTER.appName)).toBeTruthy()
    expect(screen.getByText(FOOTER.builtWith)).toBeTruthy()
  })

  test('is the page footer for screen readers, with the copyright as small print', () => {
    renderFooter()

    expect(screen.getByRole('contentinfo').tagName).toBe('FOOTER')
    expect(screen.getByText(FOOTER.copyright).tagName).toBe('SMALL')
  })

  test('className overrides a conflicting built-in class', () => {
    renderFooter({ className: 'mt-0' })
    const classes = screen.getByRole('contentinfo').className.split(' ')

    expect(classes).toContain('mt-0')
    expect(classes).not.toContain('mt-auto')
    expect(classes).toContain('border-t')
  })

  test('passes data-testid through to its root element', () => {
    renderFooter({ 'data-testid': 'mock' })

    expect(screen.getByTestId('mock')).toBe(screen.getByRole('contentinfo'))
  })
})
