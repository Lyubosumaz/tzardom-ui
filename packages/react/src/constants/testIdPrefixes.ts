const LIBRARY_TEST_ID_PREFIX = 'tzr'

export const TEST_ID_PREFIXES = {
  // Header
  brand: `${LIBRARY_TEST_ID_PREFIX}-brand`,
  commonLink: `${LIBRARY_TEST_ID_PREFIX}-common-link`,
  languageSelect: `${LIBRARY_TEST_ID_PREFIX}-language-select`,
  themeToggle: `${LIBRARY_TEST_ID_PREFIX}-theme-toggle`,
  userMenu: `${LIBRARY_TEST_ID_PREFIX}-user-menu`,
  // Page
  pageHeader: `${LIBRARY_TEST_ID_PREFIX}-page-header`,
  // Widgets
  metricCard: `${LIBRARY_TEST_ID_PREFIX}-metric-card`,
  teamsOverCapacity: `${LIBRARY_TEST_ID_PREFIX}-teams-over-capacity`,
  upcomingRiskEvents: `${LIBRARY_TEST_ID_PREFIX}-upcoming-risk-events`,
  // Footer
  footer: `${LIBRARY_TEST_ID_PREFIX}-footer`,
} as const
