import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import MobileMenu from '@/components/MobileMenu'

describe('MobileMenu', () => {
  let mockToggleMenu: jest.Mock

  beforeEach(() => {
    mockToggleMenu = jest.fn()
  })

  it('should display the menu when isMenuOpen is true', async () => {
    render(
      <SessionProvider session={{ user: { name: 'Test User' }, expires: '1' }}>
        <MobileMenu isMenuOpen={true} toggleMenu={mockToggleMenu} />
      </SessionProvider>,
    )

    await waitFor(() => {
      expect(screen.getByText('全体地図')).toBeInTheDocument()
      expect(screen.getByText('説明')).toBeInTheDocument()
      expect(screen.getByText('マイページ')).toBeInTheDocument()
      expect(screen.getByText('ログアウト')).toBeInTheDocument()
    })
  })

  it('should not display the menu when isMenuOpen is false', async () => {
    render(
      <SessionProvider session={{ user: { name: 'Test User' }, expires: '1' }}>
        <MobileMenu isMenuOpen={false} toggleMenu={mockToggleMenu} />
      </SessionProvider>,
    )

    await waitFor(() => {
      expect(screen.queryByText('全体地図')).not.toBeVisible()
      expect(screen.queryByText('説明')).not.toBeVisible()
      expect(screen.queryByText('マイページ')).not.toBeVisible()
      expect(screen.queryByText('ログアウト')).not.toBeVisible()
    })
  })

  it('should call toggleMenu function when close icon is clicked', async () => {
    const { getByAltText } = render(
      <SessionProvider session={{ user: { name: 'Test User' }, expires: '1' }}>
        <MobileMenu isMenuOpen={true} toggleMenu={mockToggleMenu} />
      </SessionProvider>,
    )

    await waitFor(() => {
      const closeButton = getByAltText('Close Icon')
      expect(closeButton).toBeInTheDocument()
      fireEvent.click(closeButton)
      expect(mockToggleMenu).toHaveBeenCalled()
    })
  })
})
