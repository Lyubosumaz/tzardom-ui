import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { THANK_YOU_MESSAGE } from './CONSTANTS.mjs'

const rootDir = path.resolve(fileURLToPath(import.meta.url), '../..')
const currentYear = new Date().getFullYear()

const licenseFiles = [
  'LICENSE',
  'packages/react/LICENSE',
  'packages/types/LICENSE',
].map((relativePath) => path.join(rootDir, relativePath))

const COPYRIGHT_PATTERN = /Copyright \(c\) (\d{4})(?:-(\d{4}))? (.+)/

try {
  const staleLicenses = licenseFiles
    .map((filePath) => {
      const content = readFileSync(filePath, 'utf8')
      const match = content.match(COPYRIGHT_PATTERN)

      if (!match) {
        throw new Error(
          `No "Copyright (c) YYYY[-YYYY] Name" line found in ${filePath}`,
        )
      }

      const [fullMatch, startYear, endYear, holder] = match
      const latestYear = Number(endYear ?? startYear)
      const newLine = `Copyright (c) ${startYear}-${currentYear} ${holder}`

      return { filePath, content, fullMatch, newLine, latestYear }
    })
    .filter(({ latestYear }) => latestYear < currentYear)

  if (staleLicenses.length === 0) {
    console.log('All LICENSE files have a current copyright year.')
  }

  for (const { filePath, content, fullMatch, newLine } of staleLicenses) {
    writeFileSync(filePath, content.replace(fullMatch, newLine))
    console.log(`Bumped ${filePath}: "${fullMatch}" -> "${newLine}"`)
  }
} catch (error) {
  console.error('License year update failed:', error)
  process.exit(1)
} finally {
  console.log(THANK_YOU_MESSAGE)
}
