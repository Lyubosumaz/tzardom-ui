# tzardom-ui

Pet component library, mainly for educational purposes. A multi-framework
monorepo: components are built once as framework-agnostic web components in
`@tzardom-ui/core` (Stencil), with thin per-framework wrapper packages generated
on top.

## Stack

- **Stencil** — compiles components once into Web Components; works natively in
  React, Vue, Angular, Svelte, or plain HTML.
- **`@stencil/react-output-target`** — generates `react`'s components from
  `core`'s build, so they can't drift out of sync.
- **npm workspaces** — links `core` and `react` as real package dependencies, no
  manual `npm link`.
- **Rollup** — bundles `react`'s wrapper into ESM + CJS for publishing.
- **Vitest** (`@stencil/vitest`) — unit tests for `core`, against compiled
  output in jsdom.
- **Playwright** (`@stencil/playwright`) — real-browser e2e for `core`; jsdom
  can't fully replicate Shadow DOM and Custom Elements.
- **Jest + Testing Library** — unit tests for `react`'s wrapper, verifying
  props/events reach the underlying custom element.
- **Storybook** — component docs and manual QA, with CSF3 `play` functions for
  interaction tests.

Vue and Angular wrapper packages are planned, not started.

## Structure

```
tzardom-ui/            root — private workspace manifest (build/test/lint/clean scripts)
  packages/
    core/    @tzardom-ui/core   framework-agnostic components (Stencil)
    react/   @tzardom-ui/react  generated React wrappers + Storybook
```

This is an npm workspace — one `npm run setup` at the repo root installs and
links every package.

## Requirements

Developed against Node 22 and npm 10. No hard minimum is enforced; older LTS
Node versions likely work but aren't verified here.

## Getting started

```bash
npm run setup
```

A bare `npm install` isn't reliable here — a known npm resolver bug
(`Cannot read properties of null (reading 'edgesOut')`, triggered by `vitest`'s
peer-dependency tree) can fail the install. `setup` runs
`npm install --legacy-peer-deps`, which avoids it.

## Scripts (run from repo root)

| Command                              | What it does                                                                                                                                                                                                                                                                                                             |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `npm run setup`                      | Installs dependencies for every package (`npm install --legacy-peer-deps`)                                                                                                                                                                                                                                               |
| `npm run build`                      | Builds every package. `core` (Stencil) always builds first — `react` imports its generated output, so this order is enforced via pre-hooks, not just workspace ordering                                                                                                                                                  |
| `npm test`                           | Runs unit tests in every package: `core` via Vitest (jsdom), `react` via Jest (jsdom)                                                                                                                                                                                                                                    |
| `npm run test:e2e`                   | Runs real-browser e2e tests in every package that has them (currently just `core`, via Playwright)                                                                                                                                                                                                                       |
| `npm run lint`                       | Formats with Prettier and lints with ESLint across the whole repo                                                                                                                                                                                                                                                        |
| `npm run storybook`                  | Starts Storybook for `@tzardom-ui/react`                                                                                                                                                                                                                                                                                 |
| `npm run storybook:build`            | Builds the static Storybook site                                                                                                                                                                                                                                                                                         |
| `npm run clean`                      | Removes every build/generated artifact **and** `node_modules` + `package-lock.json` in every package. Run `npm run setup` afterward                                                                                                                                                                                      |
| `npm run clean:cache`                | Clears build-tool caches (`.vite`, `.cache`) without touching installed packages — no reinstall needed                                                                                                                                                                                                                   |
| `npm run kill-ports`                 | Frees ports `3333` (Stencil dev server) and `6006` (Storybook) — useful when a dev server didn't shut down cleanly                                                                                                                                                                                                       |
| `npm run version:bump <bump\|exact>` | Bumps every package's version (e.g. `patch`, `minor`, or an exact version like `1.0.0`), then keeps `react`'s dependency on `core` in sync. Plain `npm version --workspaces` can't do the sync step itself — it tries to query the real npm registry for `@tzardom-ui/core`, which 404s since it's never published there |

Scope any command to one package with `--workspace`, e.g.
`npm run build --workspace=@tzardom-ui/core`.

## Working on `@tzardom-ui/core`

```bash
npm run start --workspace=@tzardom-ui/core
```

Starts Stencil's dev server with a live-reloading harness page
(`packages/core/src/index.html`) that renders both components directly — useful
for iterating with zero framework involved.

### Testing `core`

- `npm test --workspace=@tzardom-ui/core` — unit/spec tests via
  `@stencil/vitest`, running against the compiled components in a jsdom
  environment.
- `npm run test:e2e --workspace=@tzardom-ui/core` — real-browser tests via
  `@stencil/playwright` (Chromium), against Stencil's own dev server.

Both suites live next to the component they test (`src/components/*/*.spec.tsx`,
`src/components/*/*.e2e.ts`).

## Working on `@tzardom-ui/react`

```bash
npm run storybook --workspace=@tzardom-ui/react
```

Opens Storybook with the current components: `TzarButton`, `TzarHeader`. Their
source under `src/components/*/` is just tests and stories now — the actual
`TzarButton.tsx`/`TzarHeader.tsx` implementations were removed once `core`'s
generated wrappers replaced them. If you need to change what a component looks
like or does, edit it in `packages/core`, not here.

Story files use CSF3 with `play` functions for interaction testing, runnable
interactively from Storybook's Interactions panel. There's no automated e2e
runner wired up for `react` yet — that's blocked on a Storybook 8 → 10 migration
(`@storybook/addon-vitest`, the natural fit, needs Storybook ≥10 and conflicts
with `core`'s Vitest version otherwise).

## A gotcha worth knowing

`@tzardom-ui/core`'s `npm start` (`stencil build --dev --watch --serve`) does
**not** produce the same `dist/` output as a real `npm run build` — dev mode
skips the full `dist-custom-elements` JS output that `react` needs. If you've
been running `core`'s dev server and then try to build or run Storybook for
`react`, you may hit a "module not found" error. `react`'s
`build`/`storybook`/`build-storybook` scripts all have pre-hooks that force a
real `core` rebuild first, so this is generally handled automatically — but it's
worth knowing if you ever bypass those scripts.

## Publishing

Each package publishes independently from its own directory
(`cd packages/react && npm publish`) — there is nothing to publish from the repo
root, which is a private workspace manifest only. Note `core` is at `0.0.1` and
`react` is at `0.2.1` — their versions aren't locked together yet, despite
`react` being fully derived from `core`'s build output.
