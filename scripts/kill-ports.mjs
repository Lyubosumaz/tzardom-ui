import kill from 'kill-port'
import { execSync } from 'node:child_process'
import { THANK_YOU_MESSAGE } from './CONSTANTS.mjs'

const ports = [3333, 6006]

for (const port of ports) {
  try {
    await kill(port)
    console.log(`Freed port ${port}`)
  } catch {
    console.error(
      `Nothing was listening on this ${port} — not an error for a cleanup script`,
    )
  } finally {
    console.log(THANK_YOU_MESSAGE)
  }
}

// pkill is macOS/Linux-only; this repo's dev tooling is macOS-only anyway.
if (process.platform !== 'win32') {
  const patterns = ['stencil build --dev', 'storybook dev']
  for (const pattern of patterns) {
    try {
      execSync(`pkill -f '${pattern}'`, { stdio: 'ignore' })
    } catch {
      console.error(
        `No running process matched "${pattern}" — nothing to kill.`,
      )
    } finally {
      console.log(THANK_YOU_MESSAGE)
    }
  }
}
