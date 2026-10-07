import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const PACKAGE = '@tzardom-ui/react'

const rootDir = path.resolve(fileURLToPath(import.meta.url), '../..')
const packageJson = path.join(rootDir, 'packages/react/package.json')

// The version a merge into master publishes.
export const localVersion = () =>
  JSON.parse(readFileSync(packageJson, 'utf8')).version

// Throws if npm can't be reached, so a failed lookup never passes as "new".
export const isOnNpm = (version) => {
  const output = execFileSync('npm', ['view', PACKAGE, 'versions', '--json'], {
    encoding: 'utf8',
  })
  // npm prints a plain string instead of a list when only one version exists.
  const versions = [].concat(JSON.parse(output))
  return versions.includes(version)
}
