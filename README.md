# tzardom-ui

A small React component library, built to learn from: semantic HTML, Tailwind
CSS v4 and color themes.

## Packages

| Folder               | Package                 | What it is                               |
| -------------------- | ----------------------- | ---------------------------------------- |
| `packages/react`     | `@tzardom-ui/react`     | The components (published)               |
| `packages/themes`    | `@tzardom-ui/themes`    | Color themes for them (published)        |
| `packages/storybook` | `@tzardom-ui/storybook` | Storybook, to see the components         |
| `packages/e2e`       | `@tzardom-ui/e2e`       | Browser tests that run against Storybook |
| `packages/mocks`     | `@tzardom-ui/mocks`     | Fake data for the tests and stories      |

The last three are private and never published. Tools: pnpm workspaces, Rollup
(build), Vitest and Testing Library (unit tests), Storybook, Playwright (browser
tests).

## Setup

You need Node 22+ and pnpm 11 (`npm install -g pnpm`). The exact pnpm version is
pinned in `package.json`, and pnpm switches to it by itself.

```bash
pnpm install
```

This also turns on the pre-commit hook: it lints and formats the files you
commit and runs the unit tests.

## Scripts

Run them from the repo root.

| Command              | What it does                                                                                            |
| -------------------- | ------------------------------------------------------------------------------------------------------- |
| `pnpm dev`           | Copies the packages into the dashboard and keeps them updated; see [below](#working-with-the-dashboard) |
| `pnpm storybook`     | Storybook on http://localhost:6006, straight from the source                                            |
| `pnpm build`         | Builds `packages/react`                                                                                 |
| `pnpm test:coverage` | Unit tests with coverage (report: `packages/react/coverage/index.html`)                                 |
| `pnpm test:e2e`      | Browser tests; starts Storybook if it isn't running                                                     |
| `pnpm lint`          | Checks formatting (Prettier) and code (ESLint); `pnpm lint:fix` fixes what it can                       |
| `pnpm run clean`     | Deletes `node_modules` and all build output; run `pnpm install` after                                   |
| `pnpm license`       | Updates the year in every `LICENSE` file                                                                |

For one package only: `pnpm --filter @tzardom-ui/react build`.

## Writing code

- A component lives in `packages/react/src/components/<Name>/` as `<Name>.tsx`,
  `<Name>.types.ts` and `<Name>.test.tsx`. Its story goes in
  `packages/storybook/src/stories/`.
- Imports: `@/` for another folder of the same package
  (`@/constants/testIdPrefixes`), `./` for the same folder.
- Test and story data comes from `@tzardom-ui/mocks` and is obviously fake
  (`'Mock App'`).
- Every component needs a `data-testid`; see
  [Test ids](packages/react/README.md#test-ids).

## Styling and themes

Components use Tailwind classes, but the **app's** Tailwind turns them into CSS.
An app imports Tailwind and one theme:

```css
@import 'tailwindcss';
@import '@tzardom-ui/themes/team-capacity-dashboard.css';
```

The theme sets the colors (light on `:root`, dark on `:root[data-theme='dark']`)
and imports `@tzardom-ui/react/tailwind.css`, which makes the app's Tailwind
generate the components' classes.

To add a theme, copy `packages/themes/team-capacity-dashboard.css`, name it
after the app and change the values. Keep every variable name and the import,
and add the file name to `files` in `packages/themes/package.json`.

## Working with the dashboard

Use two terminals:

```bash
pnpm dev       # in tzardom-ui
npm run dev    # in team-capacity-dashboard
```

`pnpm dev` copies `react` and `themes` into the dashboard's
`node_modules/@tzardom-ui/`, then copies them again after every change, so the
dashboard updates by itself. Ctrl+C stops it.

- **Another app:** `pnpm dev --app ../other-app`.
- **Added a new file to a package** (e.g. a theme)? Restart the dashboard's
  `npm run dev` once. Next.js doesn't see new files in `node_modules` while it
  runs.
- **Back to the npm versions:** in the dashboard, delete
  `node_modules/@tzardom-ui` and run `npm install`.

The packages are copied, not symlinked: a symlink would load a second copy of
React, which breaks hooks.

## Browser tests

The tests in `packages/e2e` open the stories in a real Chromium and check what
unit tests can't: the real colors, keyboard and focus, and the theme after a
reload.

```bash
pnpm --filter @tzardom-ui/e2e exec playwright install chromium   # once
pnpm test:e2e
```

Each test opens a story by its id, so renaming a story means updating its test.
If port 6006 stays taken, free it with `lsof -ti :6006 | xargs kill`.

## Releasing

Branches go `feature/*` → `release/x.y.z` → `master`. Versions are set by hand.

1. Create `release/x.y.z` and set the root `package.json` version to `x.y.z`.
2. Before merging into `master`, raise the version of each published package you
   changed (`packages/react`, `packages/themes`): the last number for fixes, the
   middle one for new features or breaking changes (while below 1.0). If react's
   middle number goes up, also raise `@tzardom-ui/react` in `peerDependencies`
   of `packages/themes/package.json`. Run `pnpm license` and commit.
3. Merge into `master`. Each package with a new version goes to npm and gets a
   GitHub release (`v0.4.0` for react, `themes-v0.2.0` for themes).

GitHub checks every step:

| Workflow      | When                              | What it does                                                      |
| ------------- | --------------------------------- | ----------------------------------------------------------------- |
| `ci.yml`      | PR into `release/*`               | Build, lint, unit tests                                           |
| `release.yml` | PR from `release/*` into `master` | The same, plus the version and `LICENSE` checks and browser tests |
| `master.yml`  | That PR is merged                 | Builds and publishes                                              |

Publishing needs a `NODE_AUTH_TOKEN` repository secret, an npm
[automation token](https://docs.npmjs.com/creating-and-viewing-access-tokens),
in the repo's GitHub settings.
