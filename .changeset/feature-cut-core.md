---
'@tzardom-ui/themes': patch
'@tzardom-ui/react': patch
---

`@tzardom-ui/react` no longer uses `@tzardom-ui/core`: `TzarThemeToggle` and
`TzarLanguageSelect` are now plain React components built with semantic HTML,
and `TzarIconButton` and `TzarDropdown` are removed. Themes moved to the new
`@tzardom-ui/themes` package: replace
`@import '@tzardom-ui/react/themes/team-capacity-dashboard.css'` with
`@import '@tzardom-ui/themes/team-capacity-dashboard.css'` followed by
`@import '@tzardom-ui/react/tailwind.css'`.
