import { render } from '@testing-library/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import PhotoUploadAndPreview from '@/features/photo/PhotoUploadAndPreview'

jest.mock('axios')

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    route: '/',
    pathname: '',
    query: '',
    asPath: '',
    reload: jest.fn(),
  })),
}))

jest.mock('next-auth/react')

describe('PhotoUploadAndPreview', () => {
  ;(useSession as jest.Mock).mockReturnValue({
    data: {
      session: { user: { email: 'test@example.com' } },
    },
  })
  const sutra = { id: 1, kanji: '仏' }
  const sutraId = 1
  const photoId = 1

  it('renders correctly', () => {
    const { getByText } = render(
      <PhotoUploadAndPreview sutraId={sutraId} photoId={photoId} sutra={sutra} />,
    )
    expect(getByText('仏')).toBeInTheDocument()
  })
})
