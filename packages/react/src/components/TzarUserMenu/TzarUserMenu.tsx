'use client'

import { twMerge } from 'tailwind-merge'
import { TzarCommonLink } from '@/components/TzarCommonLink/TzarCommonLink'
import { useDropdown } from '@/support/useDropdown'
import type { TzarUserMenuProps } from './TzarUserMenu.types'

// Turns TzarCommonLink's pill into a full-width menu row.
const ITEM_CLASSES =
  'block w-full rounded-none px-3 py-2 text-left text-xs font-medium'

export const TzarUserMenu = ({
  email,
  accountHref,
  onLogout,
  linkAs,
  label = 'User menu',
  accountLabel = 'Account',
  logoutLabel = 'Log out',
  className,
  ...rest
}: TzarUserMenuProps) => {
  const {
    open,
    menuId,
    triggerRef,
    toggle,
    close,
    closeOnEscape,
    closeOnFocusOut,
  } = useDropdown()
  const initial = email.charAt(0).toUpperCase()

  const handleLogout = () => {
    close()
    onLogout()
  }

  return (
    <div
      {...rest}
      tabIndex={-1}
      onKeyDown={closeOnEscape}
      onBlur={closeOnFocusOut}
      className={twMerge('relative outline-none', className)}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={`${label}: ${email}`}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={toggle}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-main-soft text-xs font-semibold text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
      >
        {initial}
      </button>

      <div
        id={menuId}
        hidden={!open}
        className="absolute right-0 z-10 mt-2 w-40 rounded-md border border-border-subtle bg-background shadow-md"
      >
        <p className="truncate px-3 py-2 text-xs text-muted">{email}</p>
        <menu>
          <li>
            <TzarCommonLink
              as={linkAs ?? 'a'}
              href={accountHref}
              variant="ghost"
              className={ITEM_CLASSES}
              onClick={close}
            >
              {accountLabel}
            </TzarCommonLink>
          </li>
          <li>
            <TzarCommonLink
              as="button"
              type="button"
              variant="ghost"
              className={ITEM_CLASSES}
              onClick={handleLogout}
            >
              {logoutLabel}
            </TzarCommonLink>
          </li>
        </menu>
      </div>
    </div>
  )
}
