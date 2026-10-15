import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})

// jsdom has <dialog> but not its methods. This stand-in only toggles the
// `open` attribute; Playwright tests the real browser behavior.
const dialogPrototype: Partial<HTMLDialogElement> = HTMLDialogElement.prototype
if (!dialogPrototype.showModal) {
  Object.defineProperty(HTMLDialogElement.prototype, 'open', {
    get(this: HTMLDialogElement) {
      return this.hasAttribute('open')
    },
  })
  HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
    this.setAttribute('open', '')
  }
  HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
    this.removeAttribute('open')
  }
}
