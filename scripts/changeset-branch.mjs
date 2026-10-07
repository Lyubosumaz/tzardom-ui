import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(fileURLToPath(import.meta.url), '../..')
const summaryIntro = 'Changes in this release:'
const toolingOnly = /^chore(\([^)]*\))?!?:/i

const packages = [{ name: '@tzardom-ui/react', dir: 'packages/react' }]

const git = (...args) =>
  execFileSync('git', ['--no-optional-locks', ...args], {
    cwd: rootDir,
    encoding: 'utf8',
  }).trim()

const findBaseBranch = () =>
  git(
    'for-each-ref',
    '--format=%(refname:short)',
    'refs/heads/release',
    'refs/remotes/origin/release',
  )
    .split('\n')
    .filter(Boolean)
    .map((ref) => ({
      ref,
      ahead: Number(git('rev-list', '--count', `${ref}..HEAD`)),
    }))
    .sort((a, b) => a.ahead - b.ahead)[0]?.ref

const pathsOf = (dir) => [dir, `:(exclude)${dir}/CHANGELOG.md`]

const commitSubjects = (baseBranch, dirs) =>
  git(
    'log',
    '--no-merges',
    '--reverse',
    '--format=%s',
    `${baseBranch}..HEAD`,
    '--',
    ...dirs.flatMap(pathsOf),
  )
    .split('\n')
    .filter(Boolean)

const branch = git('branch', '--show-current')
const isWorkBranch =
  branch && branch !== 'master' && !branch.startsWith('release/')

if (!isWorkBranch) {
  console.log(
    `Not on a work branch (${branch || 'detached HEAD'}); nothing to do.`,
  )
  process.exit(0)
}

const baseBranch = findBaseBranch()
if (!baseBranch) {
  console.error('No release/* branch found to compare against.')
  process.exit(1)
}

const touched = packages.filter(
  ({ dir }) => commitSubjects(baseBranch, [dir]).length > 0,
)
if (touched.length === 0) {
  console.log(`No package changes since ${baseBranch}; no changeset needed.`)
  process.exit(0)
}

const released = touched.filter(({ dir }) =>
  commitSubjects(baseBranch, [dir]).some((s) => !toolingOnly.test(s)),
)

const filePath = path.join(
  rootDir,
  '.changeset',
  `${branch.replaceAll('/', '-')}.md`,
)

if (released.length === 0) {
  writeFileSync(
    filePath,
    '---\n---\n\nTooling-only changes (chore: commits), no release.\n',
  )
  console.log(
    `Wrote ${path.relative(rootDir, filePath)}: empty changeset, only chore: commits since ${baseBranch}.`,
  )
  process.exit(0)
}

const existing = existsSync(filePath) ? readFileSync(filePath, 'utf8') : ''
const existingSummary = existing.split(/^---$/m)[2]?.trim()
const keepOwnSummary =
  existingSummary &&
  !existingSummary.startsWith(summaryIntro) &&
  !existingSummary.startsWith('Tooling-only changes')

const summary = keepOwnSummary
  ? existingSummary
  : `${summaryIntro}\n\n${commitSubjects(
      baseBranch,
      released.map(({ dir }) => dir),
    )
      .filter((s) => !toolingOnly.test(s))
      .map((s) => `- ${s}`)
      .join('\n')}`

const frontmatter = released.map(({ name }) => `'${name}': patch`).join('\n')
writeFileSync(filePath, `---\n${frontmatter}\n---\n\n${summary}\n`)

console.log(
  `Wrote ${path.relative(rootDir, filePath)}: patch for ${released
    .map(({ name }) => name)
    .join(', ')}${keepOwnSummary ? ' (kept your summary)' : ''}.`,
)
