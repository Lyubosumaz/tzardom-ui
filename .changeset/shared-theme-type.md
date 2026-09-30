---
'@tzardom-ui/types': minor
'@tzardom-ui/core': minor
'@tzardom-ui/react': minor
---

`ThemeColorMode` in `@tzardom-ui/types` is now a string enum
(`ThemeColorMode.LIGHT` / `ThemeColorMode.DARK`), and the package ships compiled
JavaScript from `dist/`. `tzar-button` uses it; the emitted `themeChange` values
are unchanged (`'light'` / `'dark'`).

`TzarProvider` uses it and defaults to `'light'`, matching `tzar-button`. The
`ThemeColorMode2` enum is removed — use `ThemeColorMode` instead (also
re-exported from `@tzardom-ui/react`).
