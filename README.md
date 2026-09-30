# tzardom-ui

Pet component library, mainly for educational purposes. A multi-framework
monorepo: components are built once as framework-agnostic web components in
`@tzardom-ui/core` (Stencil), with thin per-framework wrapper packages generated
on top. Types shared across packages (not owned by any single component) live in
`@tzardom-ui/types`.

## Structure

```
tzardom-ui/            root — private workspace manifest (build/test/lint/clean scripts)
  packages/
    core/    @tzardom-ui/core   framework-agnostic components (Stencil)
    react/   @tzardom-ui/react  generated React wrappers + Storybook
    types/   @tzardom-ui/types  shared, generic types used by core and react
```

Types local to one component live next to it (`ComponentName.types.ts`); types
shared across packages (like `ThemeColorMode`) live in `@tzardom-ui/types`
instead.

### Stack

| Tool                               | Used in          | What it does                                                                                               |
| ---------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| Stencil                            | `core`           | Compiles components once into Web Components; works natively in React, Vue, Angular, Svelte, or plain HTML |
| `@stencil/react-output-target`     | `core` → `react` | Generates `react`'s components from `core`'s build, so they can't drift out of sync                        |
| pnpm workspaces                    | root             | Links `core`, `react`, and `types` as real package dependencies (`workspace:^`), no manual linking         |
| Rollup                             | `react`          | Bundles `react`'s wrapper into ESM + CJS for publishing                                                    |
| Vitest (`@stencil/vitest`)         | `core`           | Unit tests, against compiled output in jsdom                                                               |
| Playwright (`@stencil/playwright`) | `core`           | Real-browser e2e; jsdom can't fully replicate Shadow DOM and Custom Elements                               |
| Jest + Testing Library             | `react`          | Unit tests for the wrapper, verifying props/events reach the underlying custom element                     |
| Storybook                          | `react`          | Component docs and manual QA, with CSF3 `play` functions for interaction tests                             |

Vue and Angular wrapper packages are planned, not started.

## Requirements

Node 22 or newer and [pnpm](https://pnpm.io) 11. The exact pnpm version is
pinned in `package.json` (`packageManager`), and pnpm switches to it
automatically. To install pnpm: `npm install -g pnpm`, then run `pnpm setup`
once.

## Getting started

```bash
pnpm install
```

Only the packages listed under `allowBuilds` in `pnpm-workspace.yaml` may run
install scripts; if a new dependency needs one, pnpm will say so. Approve it
with `pnpm approve-builds`.

## Scripts (run from repo root)

| Command                 | Used in                  | What it does                                                                                                                                                             |
| ----------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `pnpm install`          | all packages             | Installs dependencies for every package                                                                                                                                  |
| `pnpm build`            | `core` → `react`         | Builds every package; `core` (Stencil) always builds first since `react` imports its generated output — enforced via pre-hooks and pnpm's dependency-ordered `-r` runs   |
| `pnpm test:coverage`    | `core`, `react`          | Unit tests with coverage: `core` via Vitest (jsdom), `react` via Jest (jsdom). Runs as part of the pre-commit hook. HTML report at `packages/<name>/coverage/index.html` |
| `pnpm test:e2e`         | `core`                   | Real-browser e2e tests (currently only `core` has them, via Playwright)                                                                                                  |
| `pnpm lint`             | root                     | Formats with Prettier and lints with ESLint across the whole repo                                                                                                        |
| `pnpm storybook`        | `react`                  | Starts Storybook                                                                                                                                                         |
| `pnpm storybook:build`  | `react`                  | Builds the static Storybook site                                                                                                                                         |
| `pnpm run clean`        | all packages             | Removes every build/generated artifact **and** `node_modules` + `pnpm-lock.yaml`. Run `pnpm install` afterward                                                           |
| `pnpm kill-ports`       | `core`, `react`          | Frees ports `3333` (Stencil dev server) and `6006` (Storybook) — useful when a dev server didn't shut down cleanly                                                       |
| `pnpm version:packages` | `core`, `react`, `types` | Release branch only: turns pending changesets into version bumps and changelogs. See [Publishing](#publishing)                                                           |
| `pnpm license`          | root + 3 packages        | Extends each `LICENSE` file's copyright year range to the current year. CI fails a `release/*` → `master` PR if this would change anything                               |

Scope any command to one package with `--filter` (or `-F`), e.g.
`pnpm --filter @tzardom-ui/core build`.

## Working on `@tzardom-ui/core`

```bash
pnpm --filter @tzardom-ui/core start
```

Starts Stencil's dev server with a live-reloading harness page
(`packages/core/src/index.html`) that renders both components directly — useful
for iterating with zero framework involved.

### Testing `core`

- `pnpm --filter @tzardom-ui/core test` — unit/spec tests via `@stencil/vitest`,
  running against the compiled components in a jsdom environment.
- `pnpm --filter @tzardom-ui/core test:e2e` — real-browser tests via
  `@stencil/playwright` (Chromium), against Stencil's own dev server.

Both suites live next to the component they test (`src/components/*/*.spec.tsx`,
`src/components/*/*.e2e.ts`).

## Working on `@tzardom-ui/react`

```bash
pnpm --filter @tzardom-ui/react storybook
```

Opens Storybook with the current components: `TzarButton`, `TzarHeader`. Their
source under `src/components/*/` is just tests and stories now — the actual
`TzarButton.tsx`/`TzarHeader.tsx` implementations were removed once `core`'s
generated wrappers replaced them. If you need to change what a component looks
like or does, edit it in `packages/core`, not here.

Story files use CSF3 with `play` functions for interaction testing, runnable
interactively from Storybook's Interactions panel. There's no automated e2e
runner wired up for `react` yet — `react` was upgraded to Storybook 10, so
`@storybook/addon-vitest` (the natural fit, needs Storybook ≥10) is no longer
blocked by a Vitest version conflict with `core`. It just hasn't been added.

## A gotcha worth knowing

`@tzardom-ui/core`'s `pnpm start` (`stencil build --dev --watch --serve`) does
**not** produce the same `dist/` output as a real `pnpm build` — dev mode skips
the full `dist-custom-elements` JS output that `react` needs. If you've been
running `core`'s dev server and then try to build or run Storybook for `react`,
you may hit a "module not found" error. `react`'s
`build`/`storybook`/`build-storybook` scripts all have pre-hooks that force a
real `core` rebuild first, so this is generally handled automatically — but it's
worth knowing if you ever bypass those scripts.

## Publishing

Versioning and publishing go through
[Changesets](https://github.com/changesets/changesets), not a manual
`pnpm publish`.

**Day to day**: nothing to do. On a work branch, the `post-commit` hook
(`.githooks/post-commit` → `scripts/changeset-branch.mjs`) keeps
`.changeset/<branch-name>.md` up to date after every commit: a `patch` bump for
each package the branch changed since its `release/*` branch, and a summary
listing the branch's commit messages. It adds the file into the commit you just
made, so it's always there when you open the PR:

```md
---
'@tzardom-ui/core': patch
---

Changes in this release:

- fix button focus
```

To write your own summary, edit the text under the frontmatter and commit. The
hook keeps your text from then on and only updates the package list. CI
(`.github/workflows/ci.yml`) fails a work PR that touches a package without a
changeset.

**Branch flow**: work branch (`feature/*`, `bugfix/*`, …) → `release/x.y.z` →
`master`. Every branch runs `ci.yml`; release PRs and `master` add their own
checks on top:

| Workflow      | Runs on              | Checks                                                                                         |
| ------------- | -------------------- | ---------------------------------------------------------------------------------------------- |
| `ci.yml`      | PRs into `release/*` | Changeset present (work PRs only), build, lint, unit tests                                     |
| `release.yml` | PRs into `master`    | `ci.yml` + only `release/*` may target `master`, changesets versioned, LICENSE year, e2e tests |
| `master.yml`  | Pushes to `master`   | `ci.yml` + publish to npm                                                                      |

**Releasing**: once all work PRs are merged into the release branch, run
`pnpm version:packages` there. It combines every pending changeset — bumping the
right package.json versions, updating each package's `CHANGELOG.md`, and
removing the changeset files. It needs the [GitHub CLI](https://cli.github.com)
logged in (`gh auth login`), because `changelog-github` uses your GitHub token
to link PRs. Also run `pnpm license`, commit both, and open the PR into
`master`.

Merging it triggers `.github/workflows/master.yml`, which re-runs `ci.yml` and
then `changeset publish`. That publishes only the packages with a real version
change, in the correct dependency order (`types` → `core` → `react`).
`workspace:^` ranges are replaced with real version ranges (e.g. `^0.1.6`) in
the published packages.

Nothing cascades by default — `react` depending on `core` doesn't force a
`react` version bump just because `core` changed, unless `core`'s new version
actually falls outside `react`'s declared range.

**One-time setup required** (not something either of us can automate): a
`NODE_AUTH_TOKEN` repository secret (an npm
[automation token](https://docs.npmjs.com/creating-and-viewing-access-tokens))
must exist in this repo's GitHub settings before `master.yml` can actually
publish.
