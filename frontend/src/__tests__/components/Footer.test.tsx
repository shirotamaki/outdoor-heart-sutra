import { render, screen, waitFor } from '@testing-library/react'
import Footer from '@/components/Footer'

describe('Footer', () => {
  it('renders the footer and checks the text', async () => {
    render(<Footer />)

    await waitFor(() => {
      expect(screen.getByText('利用規約')).toBeInTheDocument()
      expect(screen.getByText('プライバシーポリシー')).toBeInTheDocument()
      expect(screen.getByText('© 2023 shirotamaki')).toBeInTheDocument()

      expect(screen.getByTestId('twitter-link')).toBeInTheDocument()
      expect(screen.getByTestId('github-link')).toBeInTheDocument()
    })
  })
})
