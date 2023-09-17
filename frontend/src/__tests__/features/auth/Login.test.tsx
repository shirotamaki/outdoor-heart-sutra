import { render, fireEvent } from '@testing-library/react'
import { useSession, signIn } from 'next-auth/react'
import Login from '@/features/auth/Login'

jest.mock('next-auth/react')

describe('Login', () => {
  let useSessionMock: jest.Mock
  let signInMock: jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
    useSessionMock = useSession as jest.Mock
    signInMock = signIn as jest.Mock
  })

  it('should render sign in button if not authenticated', () => {
    useSessionMock.mockReturnValue({ status: 'unauthenticated' })
    const { getByText } = render(<Login />)
    expect(getByText('Googleでログインして始める')).toBeInTheDocument()
  })

  it('should call signIn when sign in button is clicked', () => {
    useSessionMock.mockReturnValue({ status: 'unauthenticated' })
    const { getByText } = render(<Login />)
    const signInButton = getByText('Googleでログインして始める')
    fireEvent.click(signInButton)
    expect(signInMock).toHaveBeenCalledWith('google', { prompt: 'login', callbackUrl: '/' })
  })

  it('should render null if authenticated', () => {
    useSessionMock.mockReturnValue({ status: 'authenticated' })
    const { container } = render(<Login />)
    expect(container.firstChild).toBeNull()
  })
})
