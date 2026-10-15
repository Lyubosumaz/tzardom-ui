import { TEST_ID } from '@tzardom-ui/mocks'
import { describe, expect, test } from 'vitest'
import { TEST_ID_PREFIXES, tzrTestId } from './testIdPrefixes'

describe('TEST_ID_PREFIXES', () => {
  test('starts every prefix with the library prefix', () => {
    for (const value of Object.values(TEST_ID_PREFIXES)) {
      expect(value).toMatch(/^tzr-[a-z]+(-[a-z]+)*$/)
    }
  })

  test('gives every component its own prefix', () => {
    const values = Object.values(TEST_ID_PREFIXES)

    expect(new Set(values).size).toBe(values.length)
  })
})

describe('tzrTestId', () => {
  test("builds a component's root id from its data-testid", () => {
    expect(tzrTestId('brand', TEST_ID)).toBe(
      `${TEST_ID_PREFIXES.brand}-${TEST_ID}`,
    )
  })

  test('adds a part after the root id', () => {
    expect(tzrTestId('brand', TEST_ID, 'title')).toBe(
      `${TEST_ID_PREFIXES.brand}-${TEST_ID}-title`,
    )
  })
})
