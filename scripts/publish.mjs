import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

if (!process.env.CI) {
  console.error(
    'Publishing runs on CI only, from .github/workflows/master.yml.',
  )
  process.exit(1)
}

const rootDir = path.resolve(fileURLToPath(import.meta.url), '../..')

const run = (command, args) => {
  execFileSync(command, args, { cwd: rootDir, stdio: 'inherit' })
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
  'publish',
  '--report-summary',
  '--no-git-checks',
])

const summaryFile = path.join(rootDir, 'pnpm-publish-summary.json')
const [react] = existsSync(summaryFile)
  ? JSON.parse(readFileSync(summaryFile, 'utf8')).publishedPackages
  : []

if (!react) {
  console.log(
    "The @tzardom-ui/react version wasn't bumped, so nothing was published.",
  )
  process.exit(0)
}

run('gh', [
  'release',
  'create',
  `v${react.version}`,
  '--target',
  releaseCommit,
  '--title',
  `v${react.version}`,
  '--generate-notes',
])
