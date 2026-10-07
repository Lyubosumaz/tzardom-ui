import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(fileURLToPath(import.meta.url), '../..')
const rootVersion = JSON.parse(
  readFileSync(path.join(rootDir, 'package.json'), 'utf8'),
).version

const branch =
  process.env.GITHUB_HEAD_REF ||
  execFileSync('git', ['branch', '--show-current'], { encoding: 'utf8' }).trim()

if (!branch.startsWith('release/')) {
  console.error(`${branch} isn't a release branch (release/x.y.z).`)
  process.exit(1)
}

const branchVersion = branch.slice('release/'.length)

if (rootVersion !== branchVersion) {
  console.error(
    `The root package.json says "version": "${rootVersion}", but the branch is ${branch}.`,
  )
  console.error(`Set "version" in the root package.json to "${branchVersion}".`)
  process.exit(1)
}

console.log(`The root version ${rootVersion} matches ${branch}.`)
