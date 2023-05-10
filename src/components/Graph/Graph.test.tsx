import React from 'react'
import { render } from '@testing-library/react'
import Graph, { data } from './Graph'

describe('Graph', () => {
  test('renders the Graph component', () => {
    render(<Graph data={data} />)
  })
})
