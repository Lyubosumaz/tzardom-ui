const LIBRARY_TEST_ID_PREFIX = 'tzar-ui'

// Each component's test ids start with its prefix, then the app's data-testid:
// <TzarBrand data-testid="header" /> → "tzar-ui-brand-header".
export const TEST_ID_PREFIXES = {
  brand: `${LIBRARY_TEST_ID_PREFIX}-brand`,
  commonLink: `${LIBRARY_TEST_ID_PREFIX}-common-link`,
  languageSelect: `${LIBRARY_TEST_ID_PREFIX}-language-select`,
  themeToggle: `${LIBRARY_TEST_ID_PREFIX}-theme-toggle`,
} as const
