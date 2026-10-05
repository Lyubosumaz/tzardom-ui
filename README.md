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
| Vitest + Testing Library           | `react`          | Unit tests for the wrapper, verifying props/events reach the underlying custom element                     |
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

| Command                 | Used in                    | What it does                                                                                                                                                                |
| ----------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm install`          | all packages               | Installs dependencies for every package                                                                                                                                     |
| `pnpm build`            | `types` → `core` → `react` | Builds every package once, in dependency order (`pnpm -r`), so `core` (Stencil) is built before `react`, which imports its generated output                                 |
| `pnpm test:coverage`    | `core`, `react`            | Unit tests with coverage: `core` and `react` both run on Vitest, inside jsdom. Runs as part of the pre-commit hook. HTML report at `packages/<name>/coverage/index.html`    |
| `pnpm test:e2e`         | `core`                     | Real-browser e2e tests (currently only `core` has them, via Playwright)                                                                                                     |
| `pnpm lint`             | root                       | Checks formatting with Prettier and lints with ESLint across the whole repo, without changing files. CI runs this                                                           |
| `pnpm lint:fix`         | root                       | Same as `pnpm lint`, but fixes formatting and auto-fixable lint problems in place                                                                                           |
| `pnpm storybook`        | `react`                    | Starts Storybook                                                                                                                                                            |
| `pnpm storybook:build`  | `react`                    | Builds the static Storybook site                                                                                                                                            |
| `pnpm app:dev`          | all packages               | Runs `../team-capacity-dashboard` on your local packages, rebuilding on change. See [Trying changes in an app](#trying-changes-in-an-app)                                   |
| `pnpm app:link`         | all packages               | Builds once and copies the packages into the app, without watching                                                                                                          |
| `pnpm app:unlink`       | all packages               | Puts the app back on the npm-published versions                                                                                                                             |
| `pnpm run clean`        | all packages               | Removes every build/generated artifact **and** `node_modules`, keeping `pnpm-lock.yaml`. Run `pnpm install --frozen-lockfile` afterward to get the exact same versions back |
| `pnpm kill-ports`       | `core`, `react`            | Frees ports `3333` (Stencil dev server) and `6006` (Storybook) — useful when a dev server didn't shut down cleanly                                                          |
| `pnpm version:packages` | `core`, `react`, `types`   | Release branch only: turns pending changesets into version bumps and changelogs. See [Publishing](#publishing)                                                              |
| `pnpm license`          | root + 3 packages          | Extends each `LICENSE` file's copyright year range to the current year. CI fails a `release/*` → `master` PR if this would change anything                                  |

Scope any command to one package with `--filter` (or `-F`), e.g.
`pnpm --filter @tzardom-ui/core build`. A package's `build` only builds that
package; add `...` to build its dependencies first, each once:
`pnpm --filter "@tzardom-ui/react..." build` builds `types`, `core`, then
`react`.

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

Opens Storybook with the current components. Behavior and markup live in
`packages/core` (unstyled Stencil skeletons such as `tzar-icon-button`); the
React package wraps them in `src/components/*/` with the Tailwind look and
React-side logic (`TzarThemeToggle`, `TzarLanguageSelect`), or are React-only
(`TzarCommonLink`).

Story files use CSF3 with `play` functions for interaction testing, runnable
interactively from Storybook's Interactions panel. There's no automated e2e
runner wired up for `react` yet — `react` was upgraded to Storybook 10, so
`@storybook/addon-vitest` (the natural fit, needs Storybook ≥10) is no longer
blocked by a Vitest version conflict with `core`. It just hasn't been added.

### Styling

`core` components ship a bare skeleton (no stylesheet). The look of React
components such as `TzarThemeToggle` is written in Tailwind v4 classes that
target the native element inside the shadow DOM through `::part()`, e.g.
`[&::part(button)]:rounded-full`. Those classes are compiled by the **app's**
Tailwind, together with one tzardom-ui theme:

```css
@import 'tailwindcss';
@import '@tzardom-ui/react/themes/team-capacity-dashboard.css';
```

Themes live in `packages/react/themes/`:

- `base.css`: shared by every theme. Maps the palette to Tailwind colors
  (`bg-background`, `text-secondary`, …), sets the page colors, and tells
  Tailwind to scan the package's build for classes. Not imported directly.
- `team-capacity-dashboard.css`: that app's light (`:root`) and dark
  (`:root[data-theme='dark']`, managed by `TzarProvider`) palettes.

To add a theme, copy `team-capacity-dashboard.css`, rename it after the app, and
change the values; keep every variable name. Storybook uses the
team-capacity-dashboard theme.

## Trying changes in an app

```bash
pnpm app:dev
```

Builds everything, copies `types`, `core` and `react` into
`../team-capacity-dashboard/node_modules/@tzardom-ui/`, and starts that app's
`npm run dev`. After that it watches all three packages: edit a component in
`packages/core`, and Stencil rebuilds it, Rollup rebuilds the React wrappers,
and the fresh output is copied into the app, where Next.js picks it up. Ctrl+C
stops everything.

- Another app: `pnpm app:dev --app ../other-app` (or
  `TZARDOM_APP=../other-app`).
- Run the app's dev server yourself: `pnpm app:dev --no-app-server`.
- Back to the published versions: `pnpm app:unlink` (removes the copies and runs
  `npm install` in the app). The app's `package.json` and lockfile are never
  touched, so there's nothing to revert in git.

Next.js 16 apps run `next dev` on Turbopack, which doesn't notice files that
appear in `node_modules` while it's running. Edits to files already shipped come
through live, but when you add a new file to a package's output (a new entry in
`"files"`, a new theme in `packages/react/themes/`), restart `pnpm app:dev`
once.

The packages are copied rather than symlinked on purpose. A symlink would make
the app resolve `react` from `packages/react/node_modules`, which loads a second
copy of React and breaks hooks.

## A gotcha worth knowing

`@tzardom-ui/core`'s `pnpm start` (`stencil build --dev --watch --serve`) does
**not** produce the same `dist/` output as a real `pnpm build` — dev mode skips
the full `dist-custom-elements` JS output that `react` needs. If you've been
running `core`'s dev server and then build `react` on its own, you may hit a
"module not found" error: run `pnpm --filter "@tzardom-ui/react..." build` (or
the root `pnpm build`) to rebuild `core` properly first. `react`'s `storybook`
and `build-storybook` do that for `core` automatically, through their pre-hooks.

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
