# tzardom-ui

Pet component library, mainly for educational purposes: React components built
with semantic HTML and styled with Tailwind CSS v4, plus color themes for them.

## Structure

```
tzardom-ui/            root — private workspace manifest (build/test/lint/clean scripts)
  packages/
    react/   @tzardom-ui/react   React components, color themes + Storybook
```

Each component's types live next to it (`ComponentName.types.ts`). The theme
types (`ThemeColorMode`) live with `TzarProvider`, in
`src/provider/TzarProvider.types.ts`.

### Stack

| Tool                     | Used in | What it does                                                                               |
| ------------------------ | ------- | ------------------------------------------------------------------------------------------ |
| pnpm workspaces          | root    | One install and lockfile for the root tooling and `packages/react`; root scripts run in it |
| Tailwind CSS v4          | `react` | Styles the components; the app's own Tailwind compiles the classes                         |
| Rollup                   | `react` | Bundles `react` into ESM + CJS for publishing                                              |
| Vitest + Testing Library | `react` | Unit tests for the components and the provider, in jsdom                                   |
| Storybook                | `react` | Component docs and manual QA, with CSF3 `play` functions for interaction tests             |

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

| Command                 | Used in        | What it does                                                                                                                                                                |
| ----------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm install`          | all packages   | Installs dependencies for every package                                                                                                                                     |
| `pnpm build`            | `react`        | Builds every package that has a `build` script (`pnpm -r`); today only `react` does                                                                                         |
| `pnpm test:coverage`    | `react`        | Unit tests with coverage via Vitest (jsdom). Runs as part of the pre-commit hook. HTML report at `packages/react/coverage/index.html`                                       |
| `pnpm lint`             | root           | Checks formatting with Prettier and lints with ESLint across the whole repo, without changing files. CI runs this                                                           |
| `pnpm lint:fix`         | root           | Same as `pnpm lint`, but fixes formatting and auto-fixable lint problems in place                                                                                           |
| `pnpm app:dev`          | all packages   | Runs `../team-capacity-dashboard` on your local packages, rebuilding on change. See [Trying changes in an app](#trying-changes-in-an-app)                                   |
| `pnpm app:link`         | all packages   | Builds once and copies the packages into the app, without watching                                                                                                          |
| `pnpm app:unlink`       | all packages   | Puts the app back on the npm-published versions                                                                                                                             |
| `pnpm run clean`        | all packages   | Removes every build/generated artifact **and** `node_modules`, keeping `pnpm-lock.yaml`. Run `pnpm install --frozen-lockfile` afterward to get the exact same versions back |
| `pnpm kill-ports`       | `react`        | Frees port `6006` (Storybook) — useful when a dev server didn't shut down cleanly                                                                                           |
| `pnpm version:packages` | `react`        | Release branch only: turns pending changesets into version bumps and changelogs. See [Publishing](#publishing)                                                              |
| `pnpm license`          | root + `react` | Extends each `LICENSE` file's copyright year range to the current year. CI fails a `release/*` → `master` PR if this would change anything                                  |

Scope any command to one package with `--filter` (or `-F`), e.g.
`pnpm --filter @tzardom-ui/react build`.

## Working on `@tzardom-ui/react`

```bash
pnpm --filter @tzardom-ui/react storybook
```

Opens Storybook with the current components. Each component lives in
`src/components/<Name>/`, next to its types, tests and stories.

Story files use CSF3 with `play` functions for interaction testing, runnable
from Storybook's Interactions panel.

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

Versioning and publishing go through
[Changesets](https://github.com/changesets/changesets), not a manual
`pnpm publish`.

**Day to day**: commit as usual. Before opening a work PR, run
`pnpm changeset:branch` (`scripts/changeset-branch.mjs`) and commit the file it
writes, `.changeset/<branch-name>.md`: a `patch` bump for each package the
branch changed since its `release/*` branch, and a summary listing the branch's
commit messages:

```md
---
'@tzardom-ui/react': patch
---

Changes in this release:

- fix button focus
```

Start tooling-only commit messages with `chore:` (CI, configs, test setup, …).
They don't count as package changes and aren't listed, so they don't publish a
release on their own. A branch with only `chore:` commits gets an empty
changeset, which satisfies CI without a release.

To write your own summary, edit the text under the frontmatter and commit;
re-running the script keeps it and only updates the package list. Run it again
after adding commits. CI (`.github/workflows/ci.yml`) fails a work PR that
touches a package without a changeset, so a missing one can't slip through.

**Branch flow**: work branch (`feature/*`, `bugfix/*`, …) → `release/x.y.z` →
`master`. Every branch runs `ci.yml`; release PRs and `master` add their own
checks on top:

| Workflow      | Runs on              | Checks                                                                              |
| ------------- | -------------------- | ----------------------------------------------------------------------------------- |
| `ci.yml`      | PRs into `release/*` | Changeset present (work PRs only), build, lint, unit tests                          |
| `release.yml` | PRs into `master`    | `ci.yml` + only `release/*` may target `master`, changesets versioned, LICENSE year |
| `master.yml`  | Pushes to `master`   | `ci.yml` + publish to npm                                                           |

**Releasing**: once all work PRs are merged into the release branch, run
`pnpm version:packages` there. It combines every pending changeset — bumping the
right package.json versions, updating each package's `CHANGELOG.md`, and
removing the changeset files. It needs the [GitHub CLI](https://cli.github.com)
logged in (`gh auth login`), because `changelog-github` uses your GitHub token
to link PRs. Also run `pnpm license`, commit both, and open the PR into
`master`.

Merging it triggers `.github/workflows/master.yml`, which re-runs `ci.yml` and
then `changeset publish`. That publishes only the packages with a real version
change. `workspace:^` ranges are replaced with real version ranges (e.g.
`^0.1.6`) in the published packages.

**One-time setup required** (not something either of us can automate): a
`NODE_AUTH_TOKEN` repository secret (an npm
[automation token](https://docs.npmjs.com/creating-and-viewing-access-tokens))
must exist in this repo's GitHub settings before `master.yml` can actually
publish.
