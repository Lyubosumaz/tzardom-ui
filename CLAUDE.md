# tzardom-ui: rules for Claude

React component library (`@tzardom-ui/react`) and its color themes
(`@tzardom-ui/themes`), used by `../team-capacity-dashboard`. A pnpm workspace:

```
packages/react      @tzardom-ui/react      components (published)
packages/themes     @tzardom-ui/themes     color themes (published)
packages/storybook  @tzardom-ui/storybook  stories (private)
packages/e2e        @tzardom-ui/e2e        Playwright tests against Storybook (private)
packages/mocks      @tzardom-ui/mocks      mock data for tests and stories (private)
scripts/            dev, release and clean scripts
```

## Core rules

1. **Super clean code that a junior engineer can read easily.** Plain code that
   reads top to bottom, with clear names. No clever tricks or abstractions the
   code doesn't need.
2. **A super optimized build: no hacks, and as few libraries as possible.** Fix
   problems at their cause instead of working around a tool. Add a dependency
   only when Node, the platform or the tools already here can't do the job.
3. **Components use fully semantic HTML.** Native elements first (`<button>`,
   `<ul>`, `<nav>`, `<footer>`, …). ARIA only where HTML has no element or
   attribute for it.
4. **Test ids: `tzar-ui`, the component, the app's id, then the part.** Every
   component's props have a required `'data-testid': string`. The root gets
   `{prefix}-{id}` from `TEST_ID_PREFIXES` (`src/constants/testIdPrefixes.ts`),
   inner parts add a fixed suffix (`tzar-ui-brand-header-icon`). Tests, stories
   and e2e pass `TEST_ID` from `@tzardom-ui/mocks` and build ids from
   `TEST_ID_PREFIXES`, never typed by hand.

## Working here

- **Git and GitHub are the user's.** Never commit, push, create branches or open
  PRs. Leave changes in the working tree and say what changed.
- **Ask before big or hard-to-undo changes,** and when the user says "stop" or
  wants to brainstorm, change no code until they say so.
- **Check your work:** `pnpm lint`, `pnpm test:coverage`, `pnpm build`,
  `pnpm test:e2e`.

## Code conventions

- **Imports:** `@/` for anything outside the current folder (`@/constants/…`,
  `@/provider/…`, `@/support/…`), `./` within it. `packages/react/src/index.ts`
  keeps `./`, because its paths end up in the published `.d.ts` files.
- **A component** lives in `packages/react/src/components/<Name>/` as
  `<Name>.tsx`, `<Name>.types.ts` and `<Name>.test.tsx`, plus a story in
  `packages/storybook/src/stories/`. Export it from `components/index.ts`, add
  its prefix to `TEST_ID_PREFIXES`, and document its props and test ids in
  `packages/react/README.md`.
- **Styling:** Tailwind v4 classes on the elements; `className` merged with
  `twMerge`, so the app's classes win. Colors only through theme names
  (`bg-main-soft`, `text-secondary`), never hex values in components.
- **Mock data** lives in `@tzardom-ui/mocks` and is obviously fake
  (`'Mock App'`, `'#mock-login'`, `TEST_ID = 'mock'`). The exception is
  `THEME_COLORS`, which must match the theme CSS.
- **Themes:** one file per app in `packages/themes/`, same variable names, each
  starting with `@import '@tzardom-ui/react/tailwind.css'`. A new theme's file
  name also goes into `files` in `packages/themes/package.json`.
- **Dependencies:** `peerDependencies` list only what the published code imports
  (`react` `^19.0.0`). Development-only packages go in `devDependencies`.

## Scripts (`scripts/*.mjs`)

- Same shape everywhere: work in `try`, a failure is `throw new Error('…')`,
  `catch` prints `✖ <Name> failed: <message>` and sets `process.exitCode = 1`
  (never `process.exit` inside `try`, or `finally` won't run), and `finally`
  prints `THANK_YOU_MESSAGE`.
- Console messages start with a symbol: `✔` done, `✖` failed, `➜` working, `◆`
  note, `▲` warning.
- Node built-ins instead of helper packages (`rmSync`, not `rimraf`).

## Developing with the dashboard

Two terminals: `pnpm dev` in tzardom-ui (builds, copies `react` and `themes`
into the app's `node_modules`, and copies again on every change) and
`npm run dev` in `../team-capacity-dashboard`. When a new file appears in a
package's output, restart only the app's `npm run dev`; Turbopack doesn't notice
new files in `node_modules`.

## Releases

Versions are changed by hand. The root `package.json` version matches the
release branch (`release/x.y.z`). Every published package that changed needs a
higher version than on `master`. When react's middle number goes up, raise the
`@tzardom-ui/react` peer range in `packages/themes/package.json` too. CI checks
and publishes (`.github/workflows/`, `scripts/check-*.mjs`,
`scripts/publish.mjs`).
