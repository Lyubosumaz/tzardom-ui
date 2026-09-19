import { render } from '@testing-library/react'
import { TzarButton } from '../../generated/components'

describe('TzarButton', () => {
  test('renders the TzarButton component', () => {
    render(<TzarButton label="Hello world!" />)
  })
})
