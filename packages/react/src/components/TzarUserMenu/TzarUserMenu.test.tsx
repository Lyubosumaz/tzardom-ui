import { fireEvent, render, screen } from '@testing-library/react'
import { USER } from '@tzardom-ui/mocks'
import type { ComponentPropsWithoutRef } from 'react'
import { describe, expect, test, vi } from 'vitest'
import { TzarUserMenu } from './TzarUserMenu'

const getTrigger = () =>
  screen.getByRole('button', { name: `User menu: ${USER.email}` })
// The menu is the element the trigger controls.
const getMenu = () => {
  const menuId = getTrigger().getAttribute('aria-controls') ?? ''
  const menu = document.getElementById(menuId)
  if (!menu) {
    throw new Error('The trigger should control the menu')
  }
  return menu
}
const getAccountLink = () =>
  screen.getByRole('link', { name: 'Account', hidden: true })

const renderUserMenu = (onLogout = vi.fn()) =>
  render(
    <TzarUserMenu
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
        email={USER.email}
        accountHref={USER.accountHref}
        onLogout={vi.fn()}
        linkAs={MockLink}
      />,
    )

    expect(getAccountLink().getAttribute('data-mock-link')).toBe('true')
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
      relatedTarget: getAccountLink(),
    })

    expect(getMenu().hidden).toBe(false)
  })

  test('passes data-testid through to its root element', () => {
    const { container } = render(
      <TzarUserMenu
        email={USER.email}
        accountHref={USER.accountHref}
        onLogout={vi.fn()}
        data-testid="mock"
      />,
    )

    expect(screen.getByTestId('mock')).toBe(container.firstChild)
  })
})
