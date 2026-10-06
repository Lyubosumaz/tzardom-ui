# @tzardom-ui/core

## 0.1.9

### Patch Changes

- [#17](https://github.com/Lyubosumaz/tzardom-ui/pull/17)
  [`6a193aa`](https://github.com/Lyubosumaz/tzardom-ui/commit/6a193aa663254550a5a499da7a3f807237985f95)
  Thanks [@Lyubosumaz](https://github.com/Lyubosumaz)! - Changes in this
  release:

  - keep 'use client' per component for Next.js Server Components
  - removed the two dead excludes
  - remove comments that are extended
  - switch to vitest in packages/react
  - removing bable and switching to vite from webpack5
  - create type files
  - remove pre builds
  - adding pretest script to run lint and typecheck before running tests

## 0.1.8

### Patch Changes

- [#15](https://github.com/Lyubosumaz/tzardom-ui/pull/15)
  [`a04c84d`](https://github.com/Lyubosumaz/tzardom-ui/commit/a04c84d61d2bd5f4da667ba326bb9ed0f146d98d)
  Thanks [@Lyubosumaz](https://github.com/Lyubosumaz)! - Changes in this
  release:

  - migrate toggle theme btn and update the TzarProvider
  - migrate language selection
  - migrate into new themes styles from team-capacity-dashboard
  - migrate nav link buttons
  - delete skeleton of this old header component

## 0.1.7

### Patch Changes

- Changes in this release:

  - remove not needed scripts and separate CI workflow
  - version bump and registering few problems opening github issues/9
  - stricter eslint and lint fix
  - moving to pnpm package manager
  - remove ThemeColorMode2

- [#10](https://github.com/Lyubosumaz/tzardom-ui/pull/10)
  [`22234fd`](https://github.com/Lyubosumaz/tzardom-ui/commit/22234fd2f0d0787e45f1674bac24e09d73bb2287)
  Thanks [@Lyubosumaz](https://github.com/Lyubosumaz)! - `ThemeColorMode` in
  `@tzardom-ui/types` is now a string enum (`ThemeColorMode.LIGHT` /
  `ThemeColorMode.DARK`), and the package ships compiled JavaScript from
  `dist/`. `tzar-button` uses it; the emitted `themeChange` values are unchanged
  (`'light'` / `'dark'`).

  `TzarProvider` uses it and defaults to `'light'`, matching `tzar-button`. The
  `ThemeColorMode2` enum is removed — use `ThemeColorMode` instead (also
  re-exported from `@tzardom-ui/react`).

- Updated dependencies
  [[`22234fd`](https://github.com/Lyubosumaz/tzardom-ui/commit/22234fd2f0d0787e45f1674bac24e09d73bb2287)]:
  - @tzardom-ui/types@0.0.7

## 0.1.6

### Patch Changes

- [#4](https://github.com/Lyubosumaz/tzardom-ui/pull/4)
  [`647a343`](https://github.com/Lyubosumaz/tzardom-ui/commit/647a343f8f75ba4aa848dade40b2491a8983ec74)
  Thanks [@Lyubosumaz](https://github.com/Lyubosumaz)! - Add a `LICENSE` and
  `README.md` to each package, and `publishConfig.access: "public"` so scoped
  packages actually publish on a free npm account. Prep work for the first real
  release — no runtime behavior changes.
- Updated dependencies
  [[`647a343`](https://github.com/Lyubosumaz/tzardom-ui/commit/647a343f8f75ba4aa848dade40b2491a8983ec74)]:
  - @tzardom-ui/types@0.0.6
