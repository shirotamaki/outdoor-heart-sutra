import { render, screen, waitFor } from '@testing-library/react'
import DesktopMenu from '@/components/DesktopMenu'

jest.mock('@/features/auth/Logout', () => {
  return jest.fn(() => <div>ログアウト</div>)
})

describe('DesktopMenu', () => {
  it('renders the desktop menu texts', async () => {
    render(<DesktopMenu />)

    await waitFor(() => {
      expect(screen.getByText('全体地図')).toBeInTheDocument()
      expect(screen.getByText('説明')).toBeInTheDocument()
      expect(screen.getByText('マイページ')).toBeInTheDocument()
      expect(screen.getByText('ログアウト')).toBeInTheDocument()
    })
  })
})
