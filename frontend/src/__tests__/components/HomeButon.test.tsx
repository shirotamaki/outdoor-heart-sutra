import { render, waitFor } from '@testing-library/react'
import HomeButton from '@/components/HomeButton'

describe('HomeButton', () => {
  it('renders the home button', async () => {
    const { getByTestId } = render(<HomeButton width={16} height={16} />)

    await waitFor(() => {
      const homeButton = getByTestId('homebutton-link')
      expect(homeButton).toBeInTheDocument()
    })
  })
})
