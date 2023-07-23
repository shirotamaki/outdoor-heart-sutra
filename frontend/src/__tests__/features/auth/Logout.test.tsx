import { render, fireEvent } from '@testing-library/react'
import { useSession, signOut } from 'next-auth/react'
import Logout from '@/features/auth/Logout'

jest.mock('next-auth/react')

describe('Logout', () => {
  let useSessionMock: jest.Mock
  let signOutMock: jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
    useSessionMock = useSession as jest.Mock
    signOutMock = signOut as jest.Mock
  })

  it('should render logout text if authenticated', () => {
    useSessionMock.mockReturnValue({ status: 'authenticated' })
    const { getByText } = render(<Logout />)
    expect(getByText('ログアウト')).toBeInTheDocument()
  })

  it('should call signOut when logout text is clicked', () => {
    useSessionMock.mockReturnValue({ status: 'authenticated' })
    const { getByText } = render(<Logout />)
    const logoutText = getByText('ログアウト')
    fireEvent.click(logoutText)
    expect(signOutMock).toHaveBeenCalled()
  })

  it('should render null if not authenticated', () => {
    useSessionMock.mockReturnValue({ status: 'unauthenticated' })
    const { container } = render(<Logout />)
    expect(container.firstChild).toBeNull()
  })
})
