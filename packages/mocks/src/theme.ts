// The key TzarProvider saves the theme under.
export const THEME_STORAGE_KEY = 'tzardom-theme'

// Colors from packages/react/themes/team-capacity-dashboard.css, written the
// way the browser reports them (getComputedStyle), so tests can compare them.
export const THEME_COLORS = {
  light: {
    background: 'rgb(249, 250, 251)', // #f9fafb
    mainSoft: 'rgb(253, 242, 255)', // #fdf2ff
    secondary: 'rgb(15, 23, 42)', // #0f172a
    borderSubtle: 'rgb(229, 231, 235)', // #e5e7eb
  },
  dark: {
    background: 'rgb(2, 6, 23)', // #020617
    mainSoft: 'rgb(21, 94, 117)', // #155e75
    secondary: 'rgb(56, 189, 248)', // #38bdf8
    borderSubtle: 'rgb(15, 23, 42)', // #0f172a
  },
} as const
