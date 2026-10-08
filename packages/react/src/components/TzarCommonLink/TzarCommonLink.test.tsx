import { render, screen } from '@testing-library/react'
import { LOGIN_LINK, TEST_ID } from '@tzardom-ui/mocks'
import type { AnchorHTMLAttributes } from 'react'
import { describe, expect, test } from 'vitest'
import { TEST_ID_PREFIXES } from '@/constants/testIdPrefixes'
import { TzarCommonLink } from './TzarCommonLink'

const LINK_ID = `${TEST_ID_PREFIXES.commonLink}-${TEST_ID}`

describe('TzarCommonLink', () => {
  test('renders a plain link by default', () => {
    render(
      <TzarCommonLink data-testid={TEST_ID} href={LOGIN_LINK.href}>
        {LOGIN_LINK.text}
      </TzarCommonLink>,
    )
    const link = screen.getByRole('link', { name: LOGIN_LINK.text })

    expect(link.tagName).toBe('A')
    expect(link.getAttribute('href')).toBe(LOGIN_LINK.href)
    expect(link.className).toContain('rounded-full')
  })

  test('renders the component passed as `as`', () => {
    const AppLink = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a data-app-link="" {...props} />
    )

    render(
      <TzarCommonLink data-testid={TEST_ID} as={AppLink} href="/teams">
        Teams
      </TzarCommonLink>,
    )

    expect(
      screen.getByRole('link', { name: 'Teams' }).hasAttribute('data-app-link'),
    ).toBe(true)
  })

  test('className overrides a conflicting built-in class', () => {
    render(
      <TzarCommonLink data-testid={TEST_ID} href="/" className="px-5 ml-2">
        Home
      </TzarCommonLink>,
    )
    const classes = screen.getByRole('link').className.split(' ')

    expect(classes).toContain('px-5')
    expect(classes).not.toContain('px-3')
    expect(classes).toContain('ml-2')
    expect(classes).toContain('py-1')
  })

  test('the ghost variant has no border or background', () => {
    render(
      <TzarCommonLink data-testid={TEST_ID} href="/risk" variant="ghost">
        Risk
      </TzarCommonLink>,
    )
    const classes = screen.getByRole('link').className.split(' ')

    expect(classes).toContain('rounded-full')
    expect(classes).not.toContain('border')
    expect(classes).not.toContain('bg-background')
  })

  test('passes data-testid to its root element, the link', () => {
    render(
      <TzarCommonLink data-testid={TEST_ID} href="/">
        Home
      </TzarCommonLink>,
    )

    expect(screen.getByTestId(LINK_ID)).toBe(screen.getByRole('link'))
  })
})
