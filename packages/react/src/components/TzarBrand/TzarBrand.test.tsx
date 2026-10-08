import { render, screen } from '@testing-library/react'
import { BRAND, TEST_ID } from '@tzardom-ui/mocks'
import { Heart } from 'lucide-react'
import { describe, expect, test } from 'vitest'
import { TEST_ID_PREFIXES } from '../../testIdPrefixes'
import { TzarBrand } from './TzarBrand'

const BRAND_ID = `${TEST_ID_PREFIXES.brand}-${TEST_ID}`

const getBrand = () => screen.getByTestId(BRAND_ID)

describe('TzarBrand', () => {
  test('shows the title and the subtitle', () => {
    render(<TzarBrand data-testid={TEST_ID} {...BRAND} />)

    expect(screen.getByText(BRAND.title)).toBeTruthy()
    expect(screen.getByText(BRAND.subtitle)).toBeTruthy()
  })

  test('shows the umbrella by default, hidden from screen readers', () => {
    render(<TzarBrand data-testid={TEST_ID} {...BRAND} />)
    const icon = screen.getByTestId(`${BRAND_ID}-icon`)

    expect(icon.classList.contains('lucide-umbrella')).toBe(true)
    expect(icon.getAttribute('aria-hidden')).toBe('true')
  })

  test('shows the icon passed in instead', () => {
    render(<TzarBrand data-testid={TEST_ID} {...BRAND} icon={Heart} />)
    const icon = screen.getByTestId(`${BRAND_ID}-icon`)

    expect(icon.classList.contains('lucide-heart')).toBe(true)
    expect(icon.classList.contains('lucide-umbrella')).toBe(false)
  })

  test('className overrides a conflicting built-in class', () => {
    render(<TzarBrand data-testid={TEST_ID} {...BRAND} className="gap-5" />)
    const classes = getBrand().className.split(' ')

    expect(classes).toContain('gap-5')
    expect(classes).not.toContain('gap-3')
    expect(classes).toContain('flex')
  })

  test('passes data-testid to its root element, the outer div', () => {
    const { container } = render(<TzarBrand data-testid={TEST_ID} {...BRAND} />)

    expect(getBrand()).toBe(container.firstChild)
  })

  test('gives its parts test ids built from data-testid', () => {
    render(<TzarBrand data-testid={TEST_ID} {...BRAND} />)

    expect(screen.getByTestId(`${BRAND_ID}-icon`).tagName).toBe('svg')
    expect(screen.getByTestId(`${BRAND_ID}-title`).textContent).toBe(
      BRAND.title,
    )
    expect(screen.getByTestId(`${BRAND_ID}-subtitle`).textContent).toBe(
      BRAND.subtitle,
    )
  })
})
