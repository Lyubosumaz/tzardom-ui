import { readdirSync, rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { THANK_YOU_MESSAGE } from './CONSTANTS.mjs'

const rootDir = path.resolve(fileURLToPath(import.meta.url), '../..')

const PACKAGE_FOLDERS = [
  'node_modules',
  'dist',
  'coverage',
  'storybook-static',
  'test-results',
]

const remove = (folder) => {
  rmSync(folder, { recursive: true, force: true })
}

try {
  remove(path.join(rootDir, 'node_modules'))

  for (const name of readdirSync(path.join(rootDir, 'packages'))) {
    for (const folder of PACKAGE_FOLDERS) {
      remove(path.join(rootDir, 'packages', name, folder))
    }
  }

  console.log(
    '✔ Cleaned build artifacts and node_modules (pnpm-lock.yaml kept)',
  )
} catch (error) {
  console.error('✖ Clean failed:', error.message)
  process.exitCode = 1
} finally {
  console.log(THANK_YOU_MESSAGE)
}
