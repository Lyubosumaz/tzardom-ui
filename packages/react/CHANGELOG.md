# @tzardom-ui/react

## 0.2.7

### Patch Changes

- Changes in this release:

  - remove not needed scripts and separate CI workflow
  - version bump and registering few problems opening github issues/9
  - stricter eslint and lint fix
  - removing duplicate eslint
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
  - @tzardom-ui/core@0.1.7
  - @tzardom-ui/types@0.0.7

## 0.2.6

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
  - @tzardom-ui/core@0.1.6
