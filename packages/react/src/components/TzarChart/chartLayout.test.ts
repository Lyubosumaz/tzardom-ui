import { describe, expect, test } from 'vitest'
import { formatTick, getTicks, toNumber } from './chartLayout'

describe('getTicks', () => {
  test('steps from 0 past the max in round numbers', () => {
    expect(getTicks(23)).toEqual([0, 10, 20, 30])
    expect(getTicks(8)).toEqual([0, 2, 4, 6, 8])
    expect(getTicks(1500)).toEqual([0, 500, 1000, 1500])
  })

  test('still draws an axis when every value is 0', () => {
    expect(getTicks(0)).toEqual([0, 0.5, 1])
  })
})

describe('formatTick', () => {
  test('shortens big numbers', () => {
    expect(formatTick(20)).toBe('20')
    expect(formatTick(1200)).toBe('1.2K')
  })
})

describe('toNumber', () => {
  test('reads numbers and numeric text, and falls back to 0', () => {
    expect(toNumber(7)).toBe(7)
    expect(toNumber('7')).toBe(7)
    expect(toNumber('mock')).toBe(0)
    expect(toNumber(undefined)).toBe(0)
  })
})
