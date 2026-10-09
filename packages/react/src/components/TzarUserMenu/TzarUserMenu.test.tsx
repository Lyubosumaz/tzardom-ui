import { fireEvent, render, screen } from '@testing-library/react'
import { TEST_ID, USER } from '@tzardom-ui/mocks'
import type { ComponentPropsWithoutRef } from 'react'
import { describe, expect, test, vi } from 'vitest'
import { TEST_ID_PREFIXES } from '@/constants/testIdPrefixes'
import { TzarUserMenu } from './TzarUserMenu'

const USER_MENU_ID = `${TEST_ID_PREFIXES.userMenu}-${TEST_ID}`
const ACCOUNT_ID = `${TEST_ID_PREFIXES.commonLink}-${USER_MENU_ID}-account`
const LOGOUT_ID = `${TEST_ID_PREFIXES.commonLink}-${USER_MENU_ID}-logout`

const getTrigger = () =>
  screen.getByRole('button', { name: `User menu: ${USER.email}` })
const getMenu = () => screen.getByTestId(`${USER_MENU_ID}-menu`)

const renderUserMenu = (onLogout = vi.fn()) =>
  render(
    <TzarUserMenu
      data-testid={TEST_ID}
      email={USER.email}
      accountHref={USER.accountHref}
      onLogout={onLogout}
    />,
  )

describe('TzarUserMenu', () => {
  test('shows the first letter of the email on the trigger', () => {
    renderUserMenu()

    expect(getTrigger().textContent).toBe('M')
  })

  test('names the trigger with the label and the email', () => {
    render(
      <TzarUserMenu
        data-testid={TEST_ID}
        email={USER.email}
        accountHref={USER.accountHref}
        onLogout={vi.fn()}
        label="Mock label"
      />,
    )

    expect(
      screen.getByRole('button', { name: `Mock label: ${USER.email}` }),
    ).toBeTruthy()
  })

  test('opens from the trigger and shows the email, account link and log out', () => {
    renderUserMenu()
    const trigger = getTrigger()

    expect(getMenu().hidden).toBe(true)
    expect(trigger.getAttribute('aria-controls')).toBe(getMenu().id)

    fireEvent.click(trigger)

    expect(getMenu().hidden).toBe(false)
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    expect(screen.getByText(USER.email)).toBeTruthy()
    expect(
      screen.getByRole('link', { name: 'Account' }).getAttribute('href'),
    ).toBe(USER.accountHref)
    expect(screen.getByRole('button', { name: 'Log out' })).toBeTruthy()
  })

  test('uses custom texts for the account link and log out', () => {
    render(
      <TzarUserMenu
        data-testid={TEST_ID}
        email={USER.email}
        accountHref={USER.accountHref}
        onLogout={vi.fn()}
        accountLabel="Mock account"
        logoutLabel="Mock log out"
      />,
    )

    expect(
      screen.getByRole('link', { name: 'Mock account', hidden: true }),
    ).toBeTruthy()
    expect(
      screen.getByRole('button', { name: 'Mock log out', hidden: true }),
    ).toBeTruthy()
  })

  test('renders the account link with linkAs', () => {
    const MockLink = (props: ComponentPropsWithoutRef<'a'>) => (
      <a {...props} data-mock-link="true" />
    )
    render(
      <TzarUserMenu
        data-testid={TEST_ID}
        email={USER.email}
        accountHref={USER.accountHref}
        onLogout={vi.fn()}
        linkAs={MockLink}
      />,
    )

    expect(screen.getByTestId(ACCOUNT_ID).getAttribute('data-mock-link')).toBe(
      'true',
    )
  })

  test('closes when the account link is clicked', () => {
    renderUserMenu()

    fireEvent.click(getTrigger())
    fireEvent.click(screen.getByRole('link', { name: 'Account' }))

    expect(getMenu().hidden).toBe(true)
  })

  test('calls onLogout and closes when log out is clicked', () => {
    const handleLogout = vi.fn()
    renderUserMenu(handleLogout)

    fireEvent.click(getTrigger())
    fireEvent.click(screen.getByRole('button', { name: 'Log out' }))

    expect(handleLogout).toHaveBeenCalledOnce()
    expect(getMenu().hidden).toBe(true)
  })

  test('closes on Escape and moves focus back to the trigger', () => {
    renderUserMenu()
    const trigger = getTrigger()

    fireEvent.click(trigger)
    fireEvent.keyDown(trigger, { key: 'Escape' })

    expect(getMenu().hidden).toBe(true)
    expect(document.activeElement).toBe(trigger)
  })

  test('closes when focus leaves it, e.g. a click elsewhere', () => {
    renderUserMenu()
    const trigger = getTrigger()

    fireEvent.click(trigger)
    fireEvent.focusOut(trigger, { relatedTarget: document.body })

    expect(getMenu().hidden).toBe(true)
  })

  test('stays open when focus moves to one of its items', () => {
    renderUserMenu()
    const trigger = getTrigger()

    fireEvent.click(trigger)
    fireEvent.focusOut(trigger, {
      relatedTarget: screen.getByTestId(ACCOUNT_ID),
    })

    expect(getMenu().hidden).toBe(false)
  })

  test('passes data-testid to its root element, the outer div', () => {
    const { container } = renderUserMenu()

    expect(screen.getByTestId(USER_MENU_ID)).toBe(container.firstChild)
  })

  test('gives its parts test ids built from data-testid', () => {
    renderUserMenu()

    expect(screen.getByTestId(`${USER_MENU_ID}-trigger`)).toBe(getTrigger())
    expect(screen.getByTestId(`${USER_MENU_ID}-email`).textContent).toBe(
      USER.email,
    )
    expect(screen.getByTestId(ACCOUNT_ID).textContent).toBe('Account')
    expect(screen.getByTestId(LOGOUT_ID).textContent).toBe('Log out')
  })
})
