import { execFileSync, spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { THANK_YOU_MESSAGE } from './CONSTANTS.mjs'

const rootDir = path.resolve(fileURLToPath(import.meta.url), '../..')

// The packages published to npm, as folders in packages/.
const PUBLISHED = ['react', 'themes']

// stdio 'pipe' keeps git's own error text off the console; a failure still
// throws, with that text in its message.
const git = (...args) =>
  execFileSync('git', args, { cwd: rootDir, encoding: 'utf8', stdio: 'pipe' })

const readVersion = (dir) =>
  JSON.parse(readFileSync(path.join(rootDir, dir, 'package.json'), 'utf8'))
    .version

// The version on the base branch, or null if the package isn't there yet.
const readBaseVersion = (dir) => {
  try {
    return JSON.parse(git('show', `FETCH_HEAD:${dir}/package.json`)).version
  } catch {
    return null
  }
}

// True when any file in the folder differs from the base branch.
const changedSinceBase = (dir) =>
  spawnSync('git', ['diff', '--quiet', 'FETCH_HEAD', '--', dir], {
    cwd: rootDir,
  }).status !== 0

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

try {
  const baseBranch = process.env.GITHUB_BASE_REF || 'master'
  git('fetch', '--quiet', '--depth=1', 'origin', baseBranch)

  for (const name of PUBLISHED) {
    const dir = `packages/${name}`
    const version = readVersion(dir)
    const baseVersion = readBaseVersion(dir)

    if (baseVersion === null) {
      console.log(`✔ @tzardom-ui/${name} is new, at ${version}.`)
    } else if (!changedSinceBase(dir)) {
      console.log(
        `ℹ @tzardom-ui/${name} didn't change; it stays at ${version}.`,
      )
    } else if (isHigher(version, baseVersion)) {
      console.log(
        `✔ @tzardom-ui/${name} goes from ${baseVersion} to ${version}.`,
      )
    } else {
      throw new Error(
        `@tzardom-ui/${name} changed, but it's ${version} here and ${baseVersion} on ${baseBranch}. Raise "version" in ${dir}/package.json: the last number for fixes, the middle one for new features or breaking changes.`,
      )
    }
  }
} catch (error) {
  console.error('✖ Package version check failed:', error.message)
  process.exitCode = 1
} finally {
  console.log(THANK_YOU_MESSAGE)
}
