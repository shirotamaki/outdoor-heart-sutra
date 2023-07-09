import { render, screen, waitFor } from '@testing-library/react'
import { useSession } from 'next-auth/react'
import Header from '@/components/Header'

jest.mock('next-auth/react')

describe('Header', () => {
  it('renders DesktopMenu and MobileMenu and HomeButton when isAuthenticated is true', async () => {
    const useSessionMock = useSession as jest.Mock
    useSessionMock.mockReturnValue({ status: 'authenticated' })

    render(<Header />)

    await waitFor(() => {
      const desktopMenu = screen.getByTestId('desktop-menu-link')
      const mobileMenu = screen.getByTestId('mobile-menu-link')
      const homeButtonXl = screen.getByTestId('homebutton-xl-link')
      const homeButtonMd = screen.getByTestId('homebutton-md-link')
      const homeButtonSm = screen.getByTestId('homebutton-sm-link')

      expect(desktopMenu).toBeInTheDocument()
      expect(mobileMenu).toBeInTheDocument()
      expect(homeButtonXl).toBeInTheDocument()
      expect(homeButtonMd).toBeInTheDocument()
      expect(homeButtonSm).toBeInTheDocument()
    })
  })

  it('does not render DesktopMenu and MobileMenu when isAuthenticated is false', async () => {
    const useSessionMock = useSession as jest.Mock
    useSessionMock.mockReturnValue({ status: 'unauthenticated' })

    render(<Header />)

    await waitFor(() => {
      const desktopMenu = screen.queryByTestId('desktop-menu-link')
      const mobileMenu = screen.queryByTestId('mobile-menu-link')
      const homeButtonXl = screen.getByTestId('homebutton-xl-link')
      const homeButtonMd = screen.getByTestId('homebutton-md-link')
      const homeButtonSm = screen.getByTestId('homebutton-sm-link')

      expect(desktopMenu).not.toBeInTheDocument()
      expect(mobileMenu).not.toBeInTheDocument()
      expect(homeButtonXl).toBeInTheDocument()
      expect(homeButtonMd).toBeInTheDocument()
      expect(homeButtonSm).toBeInTheDocument()
    })
  })
})
