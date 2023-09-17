import { render } from '@testing-library/react'
import LoadingSpinner from '@/components/LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders Loading Spinner', () => {
    const { getByLabelText } = render(<LoadingSpinner />)

    const loadingSpinner = getByLabelText('Loading Spinner')
    expect(loadingSpinner).toBeInTheDocument()

  })
})
