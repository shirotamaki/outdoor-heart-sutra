import { render, screen } from '@testing-library/react'
import SutraOver2XlLayout from '@/features/sutra/SutraOver2XlLayout'
import { Sutra, Photo } from '@/types/types'

jest.mock('next/image', () => {
  return {
    __esModule: true,
    default: (props: any) => {
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      return <img {...props} style={{ display: 'none' }} />
    },
  }
})

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => children,
}))

describe('SutraOver2XlLayout', () => {
  it('renders sutras and photos without crashing', () => {
    const mockSutras: Sutra[] = [
      { id: 1, kanji: '仏' },
      { id: 2, kanji: '説' },
      { id: 3, kanji: '摩' },
    ]

    const mockPhotos: Photo[] = [
      {
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
      },
    ]

    render(<SutraOver2XlLayout sutras={mockSutras} photos={mockPhotos} />)

    mockSutras.forEach((sutra) => {
      const correspondingPhoto = mockPhotos.find((photo) => photo.sutra_id === sutra.id)

      if (correspondingPhoto && correspondingPhoto.cropped_image_url) {
        expect(screen.getByAltText('Captured Image')).toBeInTheDocument()
      } else {
        expect(screen.getByText(sutra.kanji)).toBeInTheDocument()
      }
    })
  })
})
