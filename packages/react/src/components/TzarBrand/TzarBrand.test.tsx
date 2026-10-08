import { render, screen } from '@testing-library/react'
import { BRAND } from '@tzardom-ui/mocks'
import { Heart } from 'lucide-react'
import { describe, expect, test } from 'vitest'
import { TzarBrand } from './TzarBrand'

const getBrand = () => screen.getByTestId('brand')

describe('TzarBrand', () => {
  test('shows the title and the subtitle', () => {
    render(<TzarBrand {...BRAND} data-testid="brand" />)

    expect(screen.getByText(BRAND.title)).toBeTruthy()
    expect(screen.getByText(BRAND.subtitle)).toBeTruthy()
  })

  test('shows the umbrella by default, hidden from screen readers', () => {
    render(<TzarBrand {...BRAND} data-testid="brand" />)
    const icon = getBrand().querySelector('svg')

    expect(icon?.classList.contains('lucide-umbrella')).toBe(true)
    expect(icon?.getAttribute('aria-hidden')).toBe('true')
  })

  test('shows the icon passed in instead', () => {
    render(<TzarBrand {...BRAND} icon={Heart} data-testid="brand" />)
    const icon = getBrand().querySelector('svg')

    expect(icon?.classList.contains('lucide-heart')).toBe(true)
    expect(icon?.classList.contains('lucide-umbrella')).toBe(false)
  })

  test('className overrides a conflicting built-in class', () => {
    render(<TzarBrand {...BRAND} className="gap-5" data-testid="brand" />)
    const classes = getBrand().className.split(' ')

    expect(classes).toContain('gap-5')
    expect(classes).not.toContain('gap-3')
    expect(classes).toContain('flex')
  })
})
