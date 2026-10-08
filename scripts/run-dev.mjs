import { spawn, spawnSync } from 'node:child_process'
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  watch,
  writeFileSync,
} from 'node:fs'
import path from 'node:path'
import { clearTimeout, setTimeout } from 'node:timers'
import { fileURLToPath } from 'node:url'
import { THANK_YOU_MESSAGE } from './CONSTANTS.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PACKAGES = ['react', 'themes']
const DEBOUNCE_MS = 400

const args = process.argv.slice(2)
const option = (name) => {
  const i = args.indexOf(name)
  return i === -1 ? undefined : args[i + 1]
}

const appDir = path.resolve(
  root,
  option('--app') ?? process.env.TZARDOM_APP ?? '../team-capacity-dashboard',
)
const appName = path.basename(appDir)

const readJson = (file) => JSON.parse(readFileSync(file, 'utf8'))
const pkgDir = (name) => path.join(root, 'packages', name)
const pkgJson = (name) => readJson(path.join(pkgDir(name), 'package.json'))
const destDir = (name) => path.join(appDir, 'node_modules', '@tzardom-ui', name)
const shipped = (pkg) =>
  (pkg.files ?? ['dist']).map((entry) => entry.replace(/\/+$/, ''))

const resolveWorkspaceRanges = (pkg) => {
  const versions = Object.fromEntries(
    PACKAGES.map((name) => [`@tzardom-ui/${name}`, pkgJson(name).version]),
  )
  for (const field of ['dependencies', 'peerDependencies']) {
    for (const [dep, range] of Object.entries(pkg[field] ?? {})) {
      if (!range.startsWith('workspace:')) {
        continue
      }
      const spec = range.slice('workspace:'.length)
      const version = versions[dep]
      pkg[field][dep] =
        spec === '*'
          ? version
          : spec === '^' || spec === '~'
            ? spec + version
            : spec
    }
  }
  delete pkg.devDependencies
  delete pkg.scripts
  return pkg
}

const copyPackage = (name) => {
  const src = pkgDir(name)
  const dest = destDir(name)
  const pkg = pkgJson(name)
  const entries = shipped(pkg)

  const missing = entries.filter((entry) => !existsSync(path.join(src, entry)))
  if (missing.length) {
    throw new Error(
      `packages/${name} has no ${missing.join(', ')} yet. Build it first.`,
    )
  }

  mkdirSync(dest, { recursive: true })
  for (const item of readdirSync(dest)) {
    if (item !== 'node_modules') {
      rmSync(path.join(dest, item), { recursive: true, force: true })
    }
  }
  for (const entry of entries) {
    cpSync(path.join(src, entry), path.join(dest, entry), { recursive: true })
  }
  writeFileSync(
    path.join(dest, 'package.json'),
    `${JSON.stringify(resolveWorkspaceRanges(pkg), null, 2)}\n`,
  )
  return pkg.version
}

const missingDeps = () =>
  PACKAGES.flatMap((name) =>
    Object.entries(pkgJson(name).dependencies ?? {})
      .filter(([dep]) => !dep.startsWith('@tzardom-ui/'))
      .filter(
        ([dep]) =>
          !existsSync(path.join(appDir, 'node_modules', dep, 'package.json')),
      )
      .map(([dep, range]) => `${dep}@${range}`),
  )

const linkAll = () => {
  const copy = () => PACKAGES.map((name) => `${name}@${copyPackage(name)}`)
  let linked = copy()

  const missing = missingDeps()
  if (missing.length > 0) {
    console.log(`➜ Installing in ${appName}: ${missing.join(', ')}…`)
    const result = spawnSync('npm', ['install', '--no-save', ...missing], {
      cwd: appDir,
      stdio: 'inherit',
    })
    if (result.status !== 0) {
      throw new Error(`npm install ${missing.join(' ')} failed in ${appName}.`)
    }
    linked = copy()
  }

  console.log(`✔ Linked into ${appName}: ${linked.join(', ')}`)
}

const build = () => {
  console.log('➜ Building @tzardom-ui/react…')
  const result = spawnSync(
    'pnpm',
    ['--filter', '@tzardom-ui/react...', 'run', 'build'],
    { cwd: root, stdio: 'inherit' },
  )
  if (result.status !== 0) {
    throw new Error('Build failed.')
  }
}

const watchPackages = () => {
  build()
  linkAll()

  let stopping = false
  const stop = (code) => {
    stopping = true
    console.log(
      `\nℹ Still linked. To go back to the npm versions, delete node_modules/@tzardom-ui in ${appName} and run "npm install" there.`,
    )
    process.exit(code)
  }

  const rollup = spawn(
    'pnpm',
    ['--filter', '@tzardom-ui/react', 'exec', 'rollup', '--config', '--watch'],
    { cwd: root, stdio: 'inherit' },
  )
  rollup.on('error', (error) => {
    console.error(`✖ Couldn't start Rollup: ${error.message}`)
    stop(1)
  })
  rollup.on('exit', (code) => {
    if (!stopping) {
      console.error(`✖ Rollup stopped (exit ${code}).`)
      stop(1)
    }
  })
  process.on('SIGINT', () => {
    stop(0)
  })

  const timers = {}
  for (const name of PACKAGES) {
    watch(pkgDir(name), { recursive: true }, (_event, file) => {
      let watched
      try {
        watched = [...shipped(pkgJson(name)), 'package.json']
      } catch {
        return // package.json mid-save; the next event will catch up
      }
      if (!file || !watched.some((out) => file.startsWith(out))) {
        return
      }
      clearTimeout(timers[name])
      timers[name] = setTimeout(() => {
        try {
          copyPackage(name)
          console.log(`[link] ✔ @tzardom-ui/${name} → ${appName}`)
        } catch (error) {
          console.error(`[link] ✖ @tzardom-ui/${name}: ${error.message}`)
        }
      }, DEBOUNCE_MS)
    })
  }

  console.log(
    `➜ Watching packages/*. Run "npm run dev" in ${appName} to see the changes. Ctrl+C stops watching.`,
  )
}

try {
  if (!existsSync(path.join(appDir, 'package.json'))) {
    throw new Error(
      `No app found at ${appDir}. Pass --app <path> or set TZARDOM_APP.`,
    )
  }

  watchPackages()
} catch (error) {
  console.error('✖ Dev script failed:', error.message)
  process.exitCode = 1
} finally {
  console.log(THANK_YOU_MESSAGE)
}
