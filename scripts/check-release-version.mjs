import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { THANK_YOU_MESSAGE } from './CONSTANTS.mjs'

const rootDir = path.resolve(fileURLToPath(import.meta.url), '../..')

try {
  const rootVersion = JSON.parse(
    readFileSync(path.join(rootDir, 'package.json'), 'utf8'),
  ).version

  const branch =
    process.env.GITHUB_HEAD_REF ||
    execFileSync('git', ['branch', '--show-current'], {
      encoding: 'utf8',
    }).trim()

  if (!branch.startsWith('release/')) {
    throw new Error(`${branch} isn't a release branch (release/x.y.z).`)
  }

  const branchVersion = branch.slice('release/'.length)

  if (rootVersion !== branchVersion) {
    throw new Error(
      `The root package.json says "version": "${rootVersion}", but the branch is ${branch}. Set it to "${branchVersion}".`,
    )
  }

  console.log(`✔ The root version ${rootVersion} matches ${branch}.`)
} catch (error) {
  console.error('✖ Release version check failed:', error.message)
  process.exitCode = 1
} finally {
  console.log(THANK_YOU_MESSAGE)
}
