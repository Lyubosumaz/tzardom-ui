import type { Page } from '@playwright/test'

// What a theme variable resolves to on the page
export const themeColor = (page: Page, name: string) =>
  page.evaluate((variable) => {
    const root = getComputedStyle(document.documentElement)
    if (!root.getPropertyValue(`--${variable}`)) {
      throw new Error(`The theme has no --${variable}`)
    }
    const probe = document.createElement('span')
    probe.style.color = `var(--${variable})`
    document.body.append(probe)
    const color = getComputedStyle(probe).color
    probe.remove()
    return color
  }, name)
