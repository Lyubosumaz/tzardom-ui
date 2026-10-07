// Run by release.yml on PRs into master. Merging publishes the version in
// packages/react/package.json, so npm mustn't have it yet.
import { isOnNpm, localVersion, PACKAGE } from './react-version.mjs'

const version = localVersion()

if (isOnNpm(version)) {
  console.error(`npm already has ${PACKAGE} ${version}.`)
  console.error(
    'Change "version" in packages/react/package.json on the release branch.',
  )
  process.exit(1)
}

console.log(`${PACKAGE} ${version} is new, so merging will publish it.`)
