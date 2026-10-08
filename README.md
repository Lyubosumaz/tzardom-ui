# tzardom-ui

Pet component library, mainly for educational purposes: React components built
with semantic HTML and styled with Tailwind CSS v4, plus color themes for them.

## Structure

```
tzardom-ui/            root — private workspace manifest (build/test/lint/clean scripts)
  packages/
    react/      @tzardom-ui/react       React components (published)
    themes/     @tzardom-ui/themes      color themes for the components (published)
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

| Tool                     | Used in     | What it does                                                       |
| ------------------------ | ----------- | ------------------------------------------------------------------ |
| pnpm workspaces          | root        | One install and lockfile for every package; root scripts run in it |
| Tailwind CSS v4          | `react`     | Styles the components; the app's own Tailwind compiles the classes |
| Rollup                   | `react`     | Builds `react` into ESM for publishing                             |
| Vitest + Testing Library | `react`     | Unit tests for the components and the provider, in jsdom           |
| Playwright               | `e2e`       | End-to-end tests in a real browser, run against Storybook          |
| Storybook                | `storybook` | Component docs and manual QA; the e2e tests run against it         |

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

| Command              | Used in                 | What it does                                                                                                                                                                                                                                         |
| -------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm install`       | all packages            | Installs dependencies for every package                                                                                                                                                                                                              |
| `pnpm build`         | `react`                 | Builds every package that has a `build` script (`pnpm -r`); today only `react` does                                                                                                                                                                  |
| `pnpm storybook`     | `storybook`             | Starts Storybook on http://localhost:6006, with the components read straight from `packages/react/src`                                                                                                                                               |
| `pnpm test:coverage` | `react`                 | Unit tests with coverage via Vitest (jsdom). Runs as part of the pre-commit hook. HTML report at `packages/react/coverage/index.html`                                                                                                                |
| `pnpm test:e2e`      | `e2e`                   | End-to-end tests with Playwright in Chromium. Starts Storybook itself, or uses the one already running on port 6006. Runs on PRs into `master` (`release.yml`), not on work PRs or in the pre-commit hook. See [End-to-end tests](#end-to-end-tests) |
| `pnpm lint`          | root                    | Checks formatting with Prettier and lints with ESLint across the whole repo, without changing files. CI runs this                                                                                                                                    |
| `pnpm lint:fix`      | root                    | Same as `pnpm lint`, but fixes formatting and auto-fixable lint problems in place                                                                                                                                                                    |
| `pnpm dev`           | all packages            | Builds the packages, copies them into `../team-capacity-dashboard` and copies them again on every change. Run the app itself with `npm run dev` in its own terminal. See [Trying changes in an app](#trying-changes-in-an-app)                       |
| `pnpm run clean`     | all packages            | Removes every build/generated artifact **and** `node_modules`, keeping `pnpm-lock.yaml`. Run `pnpm install --frozen-lockfile` afterward to get the exact same versions back                                                                          |
| `pnpm license`       | root, `react`, `themes` | Extends each `LICENSE` file's copyright year range to the current year. CI fails a `release/*` → `master` PR if this would change anything                                                                                                           |

Scope any command to one package with `--filter` (or `-F`), e.g.
`pnpm --filter @tzardom-ui/react build`.

## Working on `@tzardom-ui/react`

Each component lives in `packages/react/src/components/<Name>/`, next to its
types and tests. To see the components, open Storybook:

```bash
pnpm storybook
```

Storybook is its own private package, `packages/storybook`, so the react package
doesn't carry Storybook's dependencies. It shows the components straight from
`packages/react/src`, so edits show up without building the package. The stories
are in `packages/storybook/src/stories/`, one file per component, written in
CSF3. Every story runs inside a `TzarProvider` (set in `.storybook/preview.ts`),
and the e2e tests open them in a real browser.

### Styling

Components are styled with Tailwind v4 classes written on their elements. Those
classes are compiled by the **app's** Tailwind, together with one theme from
`@tzardom-ui/themes`:

```css
@import 'tailwindcss';
@import '@tzardom-ui/themes/team-capacity-dashboard.css';
```

Each theme imports `@tzardom-ui/react/tailwind.css`
(`packages/react/tailwind.css`), which tells the app's Tailwind to scan the
React package's build for the classes its components use. So
`@tzardom-ui/themes` has `@tzardom-ui/react` as a peer dependency.

Themes live in `packages/themes/`, their own package:

- `team-capacity-dashboard.css`: names the colors for Tailwind (`bg-background`,
  `text-secondary`, …), sets that app's light (`:root`) and dark
  (`:root[data-theme='dark']`, managed by `TzarProvider`) values, and sets the
  page colors.

To add a theme, copy `team-capacity-dashboard.css`, rename it after the app, and
change the values (keep every variable name and the `tailwind.css` import). Then
add its file name to `files` in `packages/themes/package.json`, so it's
published. Storybook uses the team-capacity-dashboard theme.

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

If a Storybook that didn't shut down still holds port 6006, stop it with
`lsof -ti :6006 | xargs kill`.

On GitHub they run on release PRs into `master`, in the Extensive code check
(`release.yml`). The Chromium download is cached per Playwright version. When
one fails there, the run keeps Playwright's `test-results` folder (what the page
looked like at the failure) as a downloadable artifact.

## Trying changes in an app

Run the library and the app side by side, each in its own terminal:

```bash
# in tzardom-ui
pnpm dev

# in team-capacity-dashboard
npm run dev
```

`pnpm dev` (or `npm run dev`) builds everything and copies `react` and `themes`
into `../team-capacity-dashboard/node_modules/@tzardom-ui/`. Then it keeps
watching both packages: edit a component in `packages/react`, and Rollup
rebuilds it and the fresh output is copied into the app, where Next.js picks it
up. Theme edits are copied over directly. Ctrl+C stops the watching; the app
keeps running.

- Another app: `pnpm dev --app ../other-app` (or `TZARDOM_APP=../other-app`).
- Back to the published versions: in the app, delete `node_modules/@tzardom-ui`
  and run `npm install`. The app's `package.json` and lockfile are never
  touched, so there's nothing to revert in git.

Next.js 16 apps run `next dev` on Turbopack, which doesn't notice files that
appear in `node_modules` while it's running. Edits to files already shipped come
through live, but when you add a new file to a package's output (a new entry in
`"files"`, a new theme in `packages/themes/`), restart the app's `npm run dev`
once. `pnpm dev` in tzardom-ui can keep running.

The packages are copied rather than symlinked on purpose. A symlink would make
the app resolve `react` from `packages/react/node_modules`, which loads a second
copy of React and breaks hooks.

## Publishing

The root version and each published package's version are changed by hand on the
release branch:

- **The root `package.json` version names the release** and matches its branch:
  `release/0.3.0` has `"version": "0.3.0"`. Nothing is published under it.
- **Each published package's version is what npm gets.** Two packages are
  published, `@tzardom-ui/react` and `@tzardom-ui/themes`; each goes to npm only
  if npm doesn't have its version yet. `storybook`, `e2e` and `mocks` are
  private.

So release 0.3.0 might publish `@tzardom-ui/react` 0.4.0 and leave
`@tzardom-ui/themes` as it was.

**Branch flow**: work branch (`feature/*`, `bugfix/*`, …) → `release/x.y.z` →
`master`. Three workflows follow it, one step each:

| Workflow      | Runs on                               | Does                                                                                                                                                                                                     |
| ------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ci.yml`      | PRs into `release/*`                  | Code check: build, lint, unit tests                                                                                                                                                                      |
| `release.yml` | PRs from `release/*` into `master`    | `ci.yml`, plus the Extensive code check: only `release/*` may target `master`, the root version matches the branch, every changed package has a higher version than on `master`, LICENSE year, e2e tests |
| `master.yml`  | A `release/*` PR merged into `master` | Build, then publish each package whose version was bumped, with a GitHub release for each. No CI again: the PR already passed                                                                            |

Every job installs pnpm, Node and the dependencies through
`.github/actions/setup`.

**Releasing**:

1. When you create `release/x.y.z`, set the root `package.json` version to
   `x.y.z`. `release.yml` checks it (`scripts/check-release-version.mjs`).
2. Before merging into `master`, bump `"version"` in the `package.json` of each
   published package you changed (`packages/react`, `packages/themes`): the last
   number for fixes (0.3.0 → 0.3.1), the middle one for new features or breaking
   changes while below 1.0 (0.3.0 → 0.4.0). `release.yml` fails the PR into
   `master` if a changed package isn't higher than on `master`
   (`scripts/check-package-versions.mjs`). When react's middle number goes up
   (0.3 → 0.4), also raise `@tzardom-ui/react` in `peerDependencies` of
   `packages/themes/package.json` (`^0.4.0`) and bump themes, since `^0.3.0`
   doesn't accept 0.4. Run `pnpm license` and commit.
3. Merge the PR into `master`. `master.yml` runs `scripts/publish.mjs`, which
   publishes each package npm doesn't have that version of yet, and creates a
   GitHub release for each: `v<version>` for react, `themes-v<version>` for
   themes, with notes GitHub writes from the PRs merged since the previous
   release. If no version was bumped, nothing is published.

**One-time setup** in the repo's GitHub settings (not something either of us can
automate): a `NODE_AUTH_TOKEN` repository secret, an npm
[automation token](https://docs.npmjs.com/creating-and-viewing-access-tokens),
for publishing.
