const LIBRARY_TEST_ID_PREFIX = 'tzr'

export const TEST_ID_PREFIXES = {
  // Header
  brand: `${LIBRARY_TEST_ID_PREFIX}-brand`,
  commonLink: `${LIBRARY_TEST_ID_PREFIX}-link`,
  languageSelect: `${LIBRARY_TEST_ID_PREFIX}-lang`,
  themeToggle: `${LIBRARY_TEST_ID_PREFIX}-theme`,
  userMenu: `${LIBRARY_TEST_ID_PREFIX}-user`,
  // Forms
  button: `${LIBRARY_TEST_ID_PREFIX}-button`,
  textField: `${LIBRARY_TEST_ID_PREFIX}-text-field`,
  dialog: `${LIBRARY_TEST_ID_PREFIX}-dialog`,
  // Page
  pageHeader: `${LIBRARY_TEST_ID_PREFIX}-page`,
  // Widgets
  chart: `${LIBRARY_TEST_ID_PREFIX}-chart`,
  metricCard: `${LIBRARY_TEST_ID_PREFIX}-metric`,
  teamsOverCapacity: `${LIBRARY_TEST_ID_PREFIX}-capacity`,
  upcomingRiskEvents: `${LIBRARY_TEST_ID_PREFIX}-events`,
  // Footer
  footer: `${LIBRARY_TEST_ID_PREFIX}-footer`,
} as const

export type TzarTestIdComponent = keyof typeof TEST_ID_PREFIXES

// Gets a component's test id in tests, so you don't type it by hand:
// tzrTestId('brand', 'header', 'title') → 'tzr-brand-header-title'
export const tzrTestId = (
  component: TzarTestIdComponent,
  id: string,
  part?: string,
) => {
  const rootId = `${TEST_ID_PREFIXES[component]}-${id}`
  return part ? `${rootId}-${part}` : rootId
}
