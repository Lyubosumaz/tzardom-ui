// Run by master.yml after CI. Publishes the version in packages/react/package.json
// to npm and creates its GitHub release, unless npm already has it (for example
// when the workflow is re-run).
import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import path from 'node:path'
import { isOnNpm, localVersion, PACKAGE } from './react-version.mjs'

// It writes ~/.npmrc, so it only runs on CI.
if (!process.env.CI) {
  console.error(
    'Publishing runs on CI only, from .github/workflows/master.yml.',
  )
  process.exit(1)
}

const version = localVersion()

if (isOnNpm(version)) {
  console.log(
    `npm already has ${PACKAGE} ${version}, so there's nothing to publish.`,
  )
  process.exit(0)
}

const run = (command, args) => {
  execFileSync(command, args, { stdio: 'inherit' })
}

// npm fills in ${NODE_AUTH_TOKEN} from the environment, so the token itself is
// never written to disk.
writeFileSync(
  path.join(homedir(), '.npmrc'),
  '//registry.npmjs.org/:_authToken=${NODE_AUTH_TOKEN}\n',
)

// --no-git-checks: pnpm's branch and clean-tree checks are meant for publishing
// from your own machine; here the checkout is the merged commit.
run('pnpm', ['--filter', PACKAGE, 'publish', '--no-git-checks'])

// The release notes list the PRs merged since the previous release.
run('gh', [
  'release',
  'create',
  `v${version}`,
  '--target',
  process.env.GITHUB_SHA,
  '--title',
  `v${version}`,
  '--generate-notes',
])
