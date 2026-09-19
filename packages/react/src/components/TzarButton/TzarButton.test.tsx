import { render } from '@testing-library/react'
import TzarButton from './TzarButton'

describe('TzarButton', () => {
  test('renders the TzarButton component', () => {
    render(<TzarButton label="Hello world!" />)
  })
})
