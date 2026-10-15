import { render, screen } from '@testing-library/react'
import { PAGE_HEADER } from '@tzardom-ui/mocks'
import { describe, expect, test } from 'vitest'
import { TzarPageHeader } from './TzarPageHeader'
import type { TzarPageHeaderProps } from './TzarPageHeader.types'

const { title, description } = PAGE_HEADER

const renderHeader = (props: Partial<TzarPageHeaderProps> = {}) =>
  render(<TzarPageHeader title={title} description={description} {...props} />)

const getHeader = () => document.getElementsByTagName('hgroup')[0]

describe('TzarPageHeader', () => {
  test('groups the title, an h1, with the description below it', () => {
    renderHeader()

    expect(screen.getByRole('heading', { level: 1, name: title })).toBeTruthy()
    expect(screen.getByText(description).tagName).toBe('P')
    expect(getHeader().contains(screen.getByText(description))).toBe(true)
  })

  test('uses the heading level from as, with the smaller style', () => {
    renderHeader({ as: 'h2' })
    const heading = screen.getByRole('heading', { level: 2, name: title })

    expect(heading.className).toContain('text-sm')
    expect(getHeader().className).toContain('space-y-1')
  })

  test('gives an h1 the large page title style', () => {
    renderHeader()

    expect(screen.getByRole('heading', { level: 1 }).className).toContain(
      'text-2xl',
    )
    expect(getHeader().className).toContain('pb-10')
  })

  test('className overrides a conflicting built-in class', () => {
    renderHeader({ className: 'pb-4' })
    const classes = getHeader().className.split(' ')

    expect(classes).toContain('pb-4')
    expect(classes).not.toContain('pb-10')
  })

  test('passes data-testid through to its root element, the hgroup', () => {
    renderHeader({ 'data-testid': 'mock' } as Partial<TzarPageHeaderProps>)

    expect(screen.getByTestId('mock')).toBe(getHeader())
  })
})
