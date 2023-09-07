import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import SutraDetails2XlOrBelowLayout from '@/features/sutra/SutraDetails2XlOrBelowLayout'
import { Sutra, Photo } from '@/types/types'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/sutras/1',
      pathname: '',
      query: {},
      asPath: '',
      push: jest.fn(),
    }
  },
}))

describe('SutraDetails2XlOrBelowLayout', () => {
  const mockSutra: Sutra = { id: 1, kanji: '仏' }

  const mockPhoto: Photo = {
    id: 1,
    note: 'note1',
    address: 'address1',
    longitude: 1,
    latitude: 1,
    image_url: 'http://example.com/imageUrl1',
    cropped_image_url: 'http://example.com/croppedImageUrl1',
    created_at: 'Sun, 13 Aug 2023 01:02:04.195159000 UTC +00:00',
    user_id: 1,
    sutra_id: 1,
  }

  beforeEach(() => {
    render(<SutraDetails2XlOrBelowLayout sutra={mockSutra} photo={mockPhoto} />)
  })

  it('should correctly display the SutraDetails2XlOrBelowLayout component', () => {
    const imageElements = screen.getAllByAltText('capturedImage')
    expect(imageElements).toHaveLength(2)

    expect(screen.getByText('Google Maps APIキーが設定されていません')).toBeInTheDocument()
    expect(screen.getByText('note1')).toBeInTheDocument()
    expect(screen.getByText('メモ編集')).toBeInTheDocument()
    expect(screen.getByText('写真を再選択')).toBeInTheDocument()
    expect(screen.getByText('削除する')).toBeInTheDocument()
  })
})
