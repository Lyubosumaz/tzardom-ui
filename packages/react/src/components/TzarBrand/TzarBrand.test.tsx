import { render, screen } from '@testing-library/react'
import { BRAND } from '@tzardom-ui/mocks'
import { Heart } from 'lucide-react'
import { describe, expect, test } from 'vitest'
import { TzarBrand } from './TzarBrand'

const renderBrand = (props = {}) => render(<TzarBrand {...BRAND} {...props} />)

describe('TzarBrand', () => {
  test('shows the title and the subtitle', () => {
    renderBrand()

    expect(screen.getByText(BRAND.title)).toBeTruthy()
    expect(screen.getByText(BRAND.subtitle)).toBeTruthy()
  })

  test('shows the umbrella by default, hidden from screen readers', () => {
    const { container } = renderBrand()
    const icon = container.querySelector('svg')

    expect(icon?.classList.contains('lucide-umbrella')).toBe(true)
    expect(icon?.getAttribute('aria-hidden')).toBe('true')
  })

  test('shows the icon passed in instead', () => {
    const { container } = renderBrand({ icon: Heart })
    const icon = container.querySelector('svg')

    expect(icon?.classList.contains('lucide-heart')).toBe(true)
    expect(icon?.classList.contains('lucide-umbrella')).toBe(false)
  })

  test('className overrides a conflicting built-in class', () => {
    const { container } = renderBrand({ className: 'gap-5' })
    const classes = (container.firstChild as HTMLElement).className.split(' ')

    expect(classes).toContain('gap-5')
    expect(classes).not.toContain('gap-3')
    expect(classes).toContain('flex')
  })

  test('passes data-testid through to its root element', () => {
    const { container } = renderBrand({ 'data-testid': 'mock' })

    expect(screen.getByTestId('mock')).toBe(container.firstChild)
  })
})
