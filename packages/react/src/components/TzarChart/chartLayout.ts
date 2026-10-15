// Sizes and math shared by the line and bar plots. Everything is in pixels.

export const CHART_HEIGHT = 240
export const MARGIN = { top: 12, right: 12, bottom: 28, left: 40 }

// Y-axis ticks at round numbers from 0, e.g. a max of 23 → 0, 10, 20, 30.
export const getTicks = (maxValue: number) => {
  const roughStep = Math.max(maxValue, 1) / 4
  const magnitude = 10 ** Math.floor(Math.log10(roughStep))
  const scaled = roughStep / magnitude
  const niceScaled = scaled <= 1 ? 1 : scaled <= 2 ? 2 : scaled <= 5 ? 5 : 10
  const step = niceScaled * magnitude
  const top = Math.ceil(Math.max(maxValue, 1) / step) * step

  const ticks: number[] = []
  for (let tick = 0; tick <= top; tick += step) {
    ticks.push(tick)
  }
  return ticks
}

// 1200 → "1.2K", for axis ticks.
export const formatTick = (value: number) =>
  value >= 1000
    ? `${String(Number((value / 1000).toFixed(1)))}K`
    : String(value)

export const toNumber = (value: string | number | undefined) =>
  typeof value === 'number' ? value : Number(value ?? 0) || 0
