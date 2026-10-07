---
'@tzardom-ui/react': patch
---

`@tzardom-ui/react` no longer uses `@tzardom-ui/core`: `TzarThemeToggle` and
`TzarLanguageSelect` are now plain React components built with semantic HTML,
and `TzarIconButton` and `TzarDropdown` are removed. The theme import stays
`@import '@tzardom-ui/react/themes/team-capacity-dashboard.css'`; add
`@import '@tzardom-ui/react/tailwind.css'` right after it, so your Tailwind
generates the classes the components use.
