import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(fileURLToPath(import.meta.url), '../..')
const summaryIntro = 'Changes in this release:'

const packages = [
  { name: '@tzardom-ui/types', dir: 'packages/types' },
  { name: '@tzardom-ui/core', dir: 'packages/core' },
  { name: '@tzardom-ui/react', dir: 'packages/react' },
]

const git = (...args) =>
  execFileSync('git', ['--no-optional-locks', ...args], {
    cwd: rootDir,
    encoding: 'utf8',
  }).trim()

// The release branch this work branch came from: the one it is fewest commits ahead of.
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

const branch = git('branch', '--show-current')
const isWorkBranch =
  branch && branch !== 'master' && !branch.startsWith('release/')
const baseBranch = isWorkBranch && findBaseBranch()

const pathsOf = (dir) => [dir, `:(exclude)${dir}/CHANGELOG.md`]

if (baseBranch) {
  const changedPackages = packages.filter(
    ({ dir }) =>
      git(
        'log',
        '--format=%h',
        `${baseBranch}..HEAD`,
        '--',
        ...pathsOf(dir),
      ) !== '',
  )

  if (changedPackages.length > 0) {
    const filePath = path.join(
      rootDir,
      '.changeset',
      `${branch.replaceAll('/', '-')}.md`,
    )
    const existing = existsSync(filePath) ? readFileSync(filePath, 'utf8') : ''
    const existingSummary = existing.split(/^---$/m)[2]?.trim()

    // Keep a summary you wrote yourself; regenerate the automatic one.
    const summary =
      existingSummary && !existingSummary.startsWith(summaryIntro)
        ? existingSummary
        : `${summaryIntro}\n\n${git(
            'log',
            '--no-merges',
            '--reverse',
            '--format=- %s',
            `${baseBranch}..HEAD`,
            '--',
            ...changedPackages.flatMap(({ dir }) => pathsOf(dir)),
          )}`

    const frontmatter = changedPackages
      .map(({ name }) => `'${name}': patch`)
      .join('\n')
    writeFileSync(filePath, `---\n${frontmatter}\n---\n\n${summary}\n`)
  }
}
