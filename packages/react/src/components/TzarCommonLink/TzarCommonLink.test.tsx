import { render, screen } from '@testing-library/react'
import type { AnchorHTMLAttributes } from 'react'
import { TzarCommonLink } from './TzarCommonLink'

describe('TzarCommonLink', () => {
  test('renders a plain link by default', () => {
    render(<TzarCommonLink href="/login">Log in</TzarCommonLink>)
    const link = screen.getByRole('link', { name: 'Log in' })

    expect(link.tagName).toBe('A')
    expect(link.getAttribute('href')).toBe('/login')
    expect(link.className).toContain('rounded-full')
  })

  test('renders the component passed as `as`', () => {
    const AppLink = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a data-app-link="" {...props} />
    )

    render(
      <TzarCommonLink as={AppLink} href="/teams">
        Teams
      </TzarCommonLink>,
    )

    expect(
      screen.getByRole('link', { name: 'Teams' }).hasAttribute('data-app-link'),
    ).toBe(true)
  })

  test('adds className after its own classes', () => {
    render(
      <TzarCommonLink href="/" className="ml-2">
        Home
      </TzarCommonLink>,
    )
    const classes = screen.getByRole('link').className.trim().split(' ')

    expect(classes[classes.length - 1]).toBe('ml-2')
  })

  test('the ghost variant has no border or background', () => {
    render(
      <TzarCommonLink href="/risk" variant="ghost">
        Risk
      </TzarCommonLink>,
    )
    const classes = screen.getByRole('link').className.split(' ')

    expect(classes).toContain('rounded-full')
    expect(classes).not.toContain('border')
    expect(classes).not.toContain('bg-background')
  })
})
