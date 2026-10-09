import { useId, useRef, useState } from 'react'
import type { FocusEvent, KeyboardEvent } from 'react'

export const useDropdown = () => {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuId = useId()

  const toggle = () => {
    setOpen(!open)
  }

  const close = () => {
    setOpen(false)
  }

  // Escape closes the menu and moves focus back to the button.
  const closeOnEscape = (event: KeyboardEvent<HTMLElement>) => {
    if (open && event.key === 'Escape') {
      close()
      triggerRef.current?.focus()
    }
  }

  // Closes when focus leaves the root: a click elsewhere on the page, or Tab
  // past the last item.
  const closeOnFocusOut = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      close()
    }
  }

  return {
    open,
    menuId,
    triggerRef,
    toggle,
    close,
    closeOnEscape,
    closeOnFocusOut,
  }
}
