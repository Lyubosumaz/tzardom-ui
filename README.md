# tzardom-ui

Pet component library, mainly for educational purposes: React components built
with semantic HTML and styled with Tailwind CSS v4, plus color themes for them.

## Structure

```
tzardom-ui/            root — private workspace manifest (build/test/lint/clean scripts)
  packages/
    react/      @tzardom-ui/react       React components + color themes (published)
    storybook/  @tzardom-ui/storybook   Storybook for the components (private)
    e2e/        @tzardom-ui/e2e         end-to-end tests in a real browser (private)
    mocks/      @tzardom-ui/mocks       mock data shared by tests and stories (private)
```

Inside the private packages:

```
packages/storybook/
  .storybook/      Storybook's config: main.ts, preview.ts, tailwind.css
  src/stories/     one file per component
  src/decorators.tsx   shared story wrappers (withTzarProvider)
packages/e2e/
  tests/           one spec per component, nothing else
  support/         helpers for the tests (storyUrl)
packages/mocks/
  src/             LANGUAGES, LOGIN_LINK, THEME_STORAGE_KEY, THEME_COLORS, …
```

Mock data (languages, link texts, the theme's storage key and colors) lives in
`@tzardom-ui/mocks`, and the react unit tests, the stories and the e2e tests all
import it from there. It has no build: it exports its TypeScript source, and it
never ends up in the published package.

Inside a package, `@/` points to its own source: `src/` in `react` and
`storybook`, the package folder in `e2e`. Use it instead of `../`; a file in the
same folder is still imported with `./`. The alias lives in each package's
`tsconfig.json` (`paths`), and Vite, Vitest and Playwright read it from there.

Each component's types live next to it (`ComponentName.types.ts`). The theme
types (`ThemeColorMode`) live with `TzarProvider`, in
`src/provider/TzarProvider.types.ts`.

### Stack

| Tool                     | Used in     | What it does                                                                               |
| ------------------------ | ----------- | ------------------------------------------------------------------------------------------ |
| pnpm workspaces          | root        | One install and lockfile for the root tooling and `packages/react`; root scripts run in it |
| Tailwind CSS v4          | `react`     | Styles the components; the app's own Tailwind compiles the classes                         |
| Rollup                   | `react`     | Builds `react` into ESM for publishing                                                     |
| Vitest + Testing Library | `react`     | Unit tests for the components and the provider, in jsdom                                   |
| Playwright               | `e2e`       | End-to-end tests in a real browser, run against Storybook                                  |
| Storybook                | `storybook` | Component docs and manual QA, with CSF3 `play` functions for interaction tests             |

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

| Command              | Used in        | What it does                                                                                                                                                                                                                                         |
| -------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm install`       | all packages   | Installs dependencies for every package                                                                                                                                                                                                              |
| `pnpm build`         | `react`        | Builds every package that has a `build` script (`pnpm -r`); today only `react` does                                                                                                                                                                  |
| `pnpm test:coverage` | `react`        | Unit tests with coverage via Vitest (jsdom). Runs as part of the pre-commit hook. HTML report at `packages/react/coverage/index.html`                                                                                                                |
| `pnpm test:e2e`      | `e2e`          | End-to-end tests with Playwright in Chromium. Starts Storybook itself, or uses the one already running on port 6006. Runs on PRs into `master` (`release.yml`), not on work PRs or in the pre-commit hook. See [End-to-end tests](#end-to-end-tests) |
| `pnpm lint`          | root           | Checks formatting with Prettier and lints with ESLint across the whole repo, without changing files. CI runs this                                                                                                                                    |
| `pnpm lint:fix`      | root           | Same as `pnpm lint`, but fixes formatting and auto-fixable lint problems in place                                                                                                                                                                    |
| `pnpm app:dev`       | all packages   | Runs `../team-capacity-dashboard` on your local packages, rebuilding on change. See [Trying changes in an app](#trying-changes-in-an-app)                                                                                                            |
| `pnpm app:link`      | all packages   | Builds once and copies the packages into the app, without watching                                                                                                                                                                                   |
| `pnpm app:unlink`    | all packages   | Puts the app back on the npm-published versions                                                                                                                                                                                                      |
| `pnpm run clean`     | all packages   | Removes every build/generated artifact **and** `node_modules`, keeping `pnpm-lock.yaml`. Run `pnpm install --frozen-lockfile` afterward to get the exact same versions back                                                                          |
| `pnpm kill-ports`    | `storybook`    | Frees port `6006` (Storybook) — useful when a dev server didn't shut down cleanly                                                                                                                                                                    |
| `pnpm license`       | root + `react` | Extends each `LICENSE` file's copyright year range to the current year. CI fails a `release/*` → `master` PR if this would change anything                                                                                                           |

Scope any command to one package with `--filter` (or `-F`), e.g.
`pnpm --filter @tzardom-ui/react build`.

## Working on `@tzardom-ui/react`

Each component lives in `packages/react/src/components/<Name>/`, next to its
types and tests. To see the components, open Storybook:

```bash
pnpm --filter @tzardom-ui/storybook storybook
```

Storybook is its own private package, `packages/storybook`, so the react package
doesn't carry Storybook's dependencies. It shows the components straight from
`packages/react/src`, so edits show up without building the package. The stories
are in `packages/storybook/src/stories/`, one file per component, and use CSF3
with `play` functions for interaction testing, runnable from Storybook's
Interactions panel.

### Styling

Components are styled with Tailwind v4 classes written on their elements. Those
classes are compiled by the **app's** Tailwind, together with one theme from
`packages/react/themes/`:

```css
@import 'tailwindcss';
@import '@tzardom-ui/react/themes/team-capacity-dashboard.css';
@import '@tzardom-ui/react/tailwind.css';
```

The last line, `packages/react/tailwind.css`, tells the app's Tailwind to scan
the React package's build for the classes its components use.

Themes live in `packages/react/themes/`:

- `team-capacity-dashboard.css`: names the colors for Tailwind (`bg-background`,
  `text-secondary`, …), sets that app's light (`:root`) and dark
  (`:root[data-theme='dark']`, managed by `TzarProvider`) values, and sets the
  page colors.

To add a theme, copy `team-capacity-dashboard.css`, rename it after the app, and
change the values (keep every variable name). Storybook uses the
team-capacity-dashboard theme.

## End-to-end tests

`packages/e2e` holds Playwright tests that open the Storybook stories in a real
Chromium and check what the jsdom unit tests can't: the theme and Tailwind
colors actually applied, keyboard use and focus, and the theme surviving a page
reload.

The first time, download the browser:

```bash
pnpm --filter @tzardom-ui/e2e exec playwright install chromium
```

Then run the tests from the repo root:

```bash
pnpm test:e2e
```

Playwright starts Storybook itself, or uses the one already running on
port 6006. Each test opens one story by its id (see `support/storyUrl.ts`), so
renaming a story or its title means updating the tests too.

On GitHub they run on release PRs into `master`, in the Extensive code check
(`release.yml`). The Chromium download is cached per Playwright version. When
one fails there, the run keeps Playwright's `test-results` folder (what the page
looked like at the failure) as a downloadable artifact.

## Trying changes in an app

```bash
pnpm app:dev
```

Builds everything, copies `react` into
`../team-capacity-dashboard/node_modules/@tzardom-ui/`, and starts that app's
`npm run dev`. After that it watches the package: edit a component in
`packages/react`, and Rollup rebuilds it and the fresh output is copied into the
app, where Next.js picks it up. Theme edits are copied over directly. Ctrl+C
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

## Publishing

There are two versions, both changed by hand on the release branch:

- **The root `package.json` version names the release** and matches its branch:
  `release/0.3.0` has `"version": "0.3.0"`. Nothing is published under it.
- **The `packages/react/package.json` version is what npm gets.** On release,
  `@tzardom-ui/react` is published if npm doesn't have that version yet. It's
  the only package published; `storybook` and `e2e` are private.

So release 0.3.0 might publish `@tzardom-ui/react` 0.4.0.

**Branch flow**: work branch (`feature/*`, `bugfix/*`, …) → `release/x.y.z` →
`master`. Three workflows follow it, one step each:

| Workflow      | Runs on                               | Does                                                                                                                                                                                      |
| ------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ci.yml`      | PRs into `release/*`                  | Code check: build, lint, unit tests                                                                                                                                                       |
| `release.yml` | PRs from `release/*` into `master`    | `ci.yml`, plus the Extensive code check: only `release/*` may target `master`, the root version matches the branch, the react version is higher than on `master`, LICENSE year, e2e tests |
| `master.yml`  | A `release/*` PR merged into `master` | Build, then publish `@tzardom-ui/react` and its GitHub release if its version was bumped. No CI again: the PR already passed                                                              |

Every job installs pnpm, Node and the dependencies through
`.github/actions/setup`.

**Releasing**:

1. When you create `release/x.y.z`, set the root `package.json` version to
   `x.y.z`. `release.yml` checks it (`scripts/check-release-version.mjs`).
2. Before merging into `master`, bump `"version"` in
   `packages/react/package.json`: the last number for fixes (0.3.0 → 0.3.1), the
   middle one for new features or breaking changes while below 1.0 (0.3.0 →
   0.4.0). `release.yml` fails the PR into `master` if it isn't higher than on
   `master` (`scripts/check-react-version.mjs`). Run `pnpm license` and commit.
3. Merge the PR into `master`. `master.yml` runs `scripts/publish.mjs`, which
   publishes `@tzardom-ui/react` if npm doesn't have its version yet and creates
   the GitHub release `v<version>`, with notes GitHub writes from the PRs merged
   since the previous release. If the version wasn't bumped, nothing is
   published.

**One-time setup** in the repo's GitHub settings (not something either of us can
automate): a `NODE_AUTH_TOKEN` repository secret, an npm
[automation token](https://docs.npmjs.com/creating-and-viewing-access-tokens),
for publishing.
