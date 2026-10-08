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
const has = (name) => args.includes(name)
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
  if (has('--no-build')) {
    return
  }
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

const unlink = () => {
  for (const name of PACKAGES) {
    rmSync(destDir(name), { recursive: true, force: true })
  }
  console.log(`➜ Restoring the npm versions in ${appName}…`)
  const result = spawnSync('npm', ['install'], {
    cwd: appDir,
    stdio: 'inherit',
  })
  if (result.status !== 0) {
    throw new Error('npm install failed.')
  }
  console.log(`✔ ${appName} is back on the published @tzardom-ui packages`)
}

const dev = () => {
  build()
  linkAll()

  const children = []
  let stopping = false

  const stop = (code = 0) => {
    if (stopping) {
      return
    }
    stopping = true
    for (const child of children) {
      try {
        process.kill(-child.pid, 'SIGTERM')
      } catch {
        console.error(
          `⚠ Failed to stop ${child.pid}. It may have already exited.`,
        )
      }
    }
    console.log(
      `\nℹ Still linked. Run "pnpm app:unlink" to go back to the npm versions.`,
    )
    process.exit(code)
  }

  const prefixLines = (label, from, to) => {
    let buffer = ''
    from.on('data', (chunk) => {
      buffer += chunk
      const lines = buffer.split('\n')
      buffer = lines.pop()
      for (const line of lines) {
        to.write(`[${label}] ${line}\n`)
      }
    })
  }

  const run = (label, cmd, cmdArgs, cwd = root) => {
    const child = spawn(cmd, cmdArgs, {
      cwd,
      detached: true,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, FORCE_COLOR: '1' },
    })
    prefixLines(label, child.stdout, process.stdout)
    prefixLines(label, child.stderr, process.stderr)
    child.on('exit', (code, signal) => {
      if (stopping) {
        return
      }
      console.error(`[${label}] ✖ stopped (${signal ?? `exit ${code}`})`)
      stop(1)
    })
    children.push(child)
  }

  const filter = (name) => ['--filter', `@tzardom-ui/${name}`, 'exec']
  run('react', 'pnpm', [...filter('react'), 'rollup', '--config', '--watch'])

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

  if (!has('--no-app-server')) {
    run('app', 'npm', ['run', 'dev'], appDir)
  }

  process.on('SIGINT', () => stop(0))
  process.on('SIGTERM', () => stop(0))
  console.log('➜ Watching packages/*. Press Ctrl+C to stop.')
}

try {
  if (!existsSync(path.join(appDir, 'package.json'))) {
    throw new Error(
      `No app found at ${appDir}. Pass --app <path> or set TZARDOM_APP.`,
    )
  }

  if (has('--unlink')) {
    unlink()
  } else if (has('--watch')) {
    dev()
  } else {
    build()
    linkAll()
  }
} catch (error) {
  console.error('✖ Link script failed:', error.message)
  process.exitCode = 1
} finally {
  console.log(THANK_YOU_MESSAGE)
}
