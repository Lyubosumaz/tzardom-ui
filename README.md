# tzardom-ui

Pet component library, mainly for educational purposes. A multi-framework
monorepo: components are built once as framework-agnostic web components in
`@tzardom-ui/core`, with thin per-framework wrapper packages on top.

## Status

- **`@tzardom-ui/core`** — a Stencil web component (`<tzr-button>`) exists as
  a standalone proof of concept. It is not yet wired to the React package.
- **`@tzardom-ui/react`** — the working package. Its components
  (`TzarButton`, `TzarHeader`) are still hand-written React, not yet
  generated from `core`.
- Vue and Angular wrapper packages are planned, not started.

## Structure

```
packages/
  core/    @tzardom-ui/core   framework-agnostic components (Stencil)
  react/   @tzardom-ui/react  React components + Storybook
```

This is an npm workspace — one `npm install` at the repo root installs and
links every package.

## Requirements

Developed against Node 22 and npm 10. No hard minimum is enforced; older
LTS Node versions likely work but aren't verified here.

## Getting started

```bash
npm install
```

## Scripts (run from repo root)

| Command | What it does |
| --- | --- |
| `npm run build` | Builds every package (`core` via Stencil, `react` via Rollup) |
| `npm test` | Runs tests in every package that has them |
| `npm run lint` | Formats with Prettier and lints with ESLint across the whole repo |
| `npm run storybook` | Starts Storybook for `@tzardom-ui/react` |
| `npm run build-storybook` | Builds the static Storybook site |

Scope any command to one package with `--workspace`, e.g.
`npm run build --workspace=@tzardom-ui/core`.

## Working on `@tzardom-ui/core`

```bash
npm run start --workspace=@tzardom-ui/core
```

Starts Stencil's dev server with a live-reloading harness page
(`packages/core/src/index.html`) that renders `<tzr-button>` directly —
useful for iterating on a component with zero framework involved.

## Working on `@tzardom-ui/react`

```bash
npm run storybook --workspace=@tzardom-ui/react
```

Opens Storybook with the current components: `TzarButton`, `TzarHeader`.

## Publishing

Each package publishes independently from its own directory
(`cd packages/react && npm publish`) — there is nothing to publish from the
repo root, which is a private workspace manifest only.
