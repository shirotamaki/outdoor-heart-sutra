import { render, screen } from '@testing-library/react'
import SutraCalculator from '@/features/sutra/SutraCalculator'
import { Photo } from '@/types/types'

describe('SutraCalculator', () => {
  it('displays the correct number of sutras got', () => {
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

    render(<SutraCalculator photos={mockPhotos} />)
    expect(screen.getByText(`${mockPhotos.length} / 278文字`)).toBeInTheDocument()
  })
})
