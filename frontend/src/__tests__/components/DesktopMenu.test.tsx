import { render, screen, waitFor } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import DesktopMenu from '@/components/DesktopMenu'

describe('DesktopMenu', () => {
  it('renders the desktop menu texts', async () => {
    render(
      <SessionProvider session={{ user: { name: 'Test User' }, expires: '1' }}>
        <DesktopMenu />
      </SessionProvider>,
    )

    await waitFor(() => {
      expect(screen.getByText('地図')).toBeInTheDocument()
      expect(screen.getByText('説明')).toBeInTheDocument()
      expect(screen.getByText('使い方')).toBeInTheDocument()
      expect(screen.getByText('マイページ')).toBeInTheDocument()
      expect(screen.getByText('ログアウト')).toBeInTheDocument()
    })
  })
})
