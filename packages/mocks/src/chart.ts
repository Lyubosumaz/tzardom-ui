// The data TzarChart is shown with.
export const CHART = {
  title: 'Mock chart',
  subtitle: 'Mock subtitle',
  xKey: 'name',
  xLabel: 'Mock name',
  series: [
    { key: 'capacity', label: 'Mock capacity', color: 'rgb(1, 2, 3)' },
    { key: 'workload', label: 'Mock workload', color: 'rgb(4, 5, 6)' },
  ],
  data: [
    { name: 'Mock A', capacity: 10, workload: 8 },
    { name: 'Mock B', capacity: 12, workload: 15 },
    { name: 'Mock C', capacity: 9, workload: 9 },
  ],
} as const
