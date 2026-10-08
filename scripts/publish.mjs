import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { THANK_YOU_MESSAGE } from './CONSTANTS.mjs'

const rootDir = path.resolve(fileURLToPath(import.meta.url), '../..')

// How each package's GitHub release is tagged, e.g. v0.3.1 or themes-v0.1.0.
const RELEASE_TAG_PREFIX = {
  '@tzardom-ui/react': 'v',
  '@tzardom-ui/themes': 'themes-v',
}

const run = (command, args) => {
  execFileSync(command, args, { cwd: rootDir, stdio: 'inherit' })
}

try {
  if (!process.env.CI) {
    throw new Error(
      'Publishing runs on CI only, from .github/workflows/master.yml.',
    )
  }

  const releaseCommit = execFileSync('git', ['rev-parse', 'HEAD'], {
    cwd: rootDir,
    encoding: 'utf8',
  }).trim()

  writeFileSync(
    path.join(homedir(), '.npmrc'),
    '//registry.npmjs.org/:_authToken=${NODE_AUTH_TOKEN}\n',
  )

  run('pnpm', [
    '--recursive',
    '--filter',
    '@tzardom-ui/react',
    '--filter',
    '@tzardom-ui/themes',
    'publish',
    '--report-summary',
    '--no-git-checks',
  ])

  // pnpm skips a package whose version npm already has, and lists the rest here.
  const summaryFile = path.join(rootDir, 'pnpm-publish-summary.json')
  const published = existsSync(summaryFile)
    ? JSON.parse(readFileSync(summaryFile, 'utf8')).publishedPackages
    : []

  if (published.length === 0) {
    console.log('ℹ No package version was bumped, so nothing was published.')
  }

  for (const { name, version } of published) {
    const tag = `${RELEASE_TAG_PREFIX[name]}${version}`
    run('gh', [
      'release',
      'create',
      tag,
      '--target',
      releaseCommit,
      '--title',
      tag,
      '--generate-notes',
    ])
  }
} catch (error) {
  console.error('✖ Publish failed:', error.message)
  process.exitCode = 1
} finally {
  console.log(THANK_YOU_MESSAGE)
}
