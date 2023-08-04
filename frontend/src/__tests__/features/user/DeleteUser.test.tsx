import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/react'
import DeleteUser from '@/features/user/DeleteUser'

jest.mock('next-auth/react')

describe('DeleteUser', () => {
  it('renders the delete account button', () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: {
        session: { user: { email: 'test@example.com' } },
      },
    })

    render(<DeleteUser />)
    expect(screen.getByText('アカウントを削除する')).toBeInTheDocument()
  })
})
