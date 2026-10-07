import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(fileURLToPath(import.meta.url), '../..')
const PACKAGE_JSON = 'packages/react/package.json'

const git = (...args) =>
  execFileSync('git', args, { cwd: rootDir, encoding: 'utf8' })

const baseBranch = process.env.GITHUB_BASE_REF || 'master'
git('fetch', '--quiet', '--depth=1', 'origin', baseBranch)

const newVersion = JSON.parse(
  readFileSync(path.join(rootDir, PACKAGE_JSON), 'utf8'),
).version
const baseVersion = JSON.parse(
  git('show', `FETCH_HEAD:${PACKAGE_JSON}`),
).version

// Compares two x.y.z versions, number by number.
const isHigher = (version, than) => {
  const [major, minor, patch] = version.split('.').map(Number)
  const [baseMajor, baseMinor, basePatch] = than.split('.').map(Number)
  if (major !== baseMajor) {
    return major > baseMajor
  }
  if (minor !== baseMinor) {
    return minor > baseMinor
  }
  return patch > basePatch
}

if (!isHigher(newVersion, baseVersion)) {
  console.error(
    `@tzardom-ui/react is ${newVersion} here and ${baseVersion} on ${baseBranch}.`,
  )
  console.error(
    'Raise "version" in packages/react/package.json: the last number for fixes, the middle one for new features or breaking changes.',
  )
  process.exit(1)
}

console.log(`@tzardom-ui/react goes from ${baseVersion} to ${newVersion}.`)
