import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { THANK_YOU_MESSAGE } from './CONSTANTS.mjs'

const rootDir = path.resolve(fileURLToPath(import.meta.url), '../..')
const shouldFix = process.argv.includes('--fix')
const currentYear = new Date().getFullYear()

const licenseFiles = [
  'LICENSE',
  'packages/core/LICENSE',
  'packages/react/LICENSE',
  'packages/types/LICENSE',
].map((relativePath) => path.join(rootDir, relativePath))

const COPYRIGHT_PATTERN = /Copyright \(c\) (\d{4})(?:-(\d{4}))? (.+)/

try {
  let staleCount = 0

  for (const filePath of licenseFiles) {
    const content = readFileSync(filePath, 'utf8')
    const match = content.match(COPYRIGHT_PATTERN)

    if (!match) {
      throw new Error(
        `No "Copyright (c) YYYY[-YYYY] Name" line found in ${filePath}`,
      )
    }

    const [fullMatch, startYear, endYear, holder] = match
    const latestYear = Number(endYear ?? startYear)

    if (latestYear >= currentYear) {
      continue
    }

    staleCount += 1
    const newLine = `Copyright (c) ${startYear}-${currentYear} ${holder}`

    if (shouldFix) {
      writeFileSync(filePath, content.replace(fullMatch, newLine))
      console.log(`Bumped ${filePath}: "${fullMatch}" -> "${newLine}"`)
    } else {
      console.error(
        `Stale: ${filePath} says "${fullMatch}", expected "${newLine}"`,
      )
    }
  }

  if (staleCount > 0 && !shouldFix) {
    console.error(
      `\n${staleCount} LICENSE file(s) need a year bump. Run \`npm run license:bump\` to fix.`,
    )
    process.exit(1)
  }

  if (staleCount === 0) {
    console.log('All LICENSE files have a current copyright year.')
  }
} catch (error) {
  console.error('License year check failed:', error)
  process.exit(1)
} finally {
  console.log(THANK_YOU_MESSAGE)
}
