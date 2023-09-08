import { render, screen } from '@testing-library/react'
import SutraItem from '@/features/sutra/SutraItem'

describe('SutraItem', () => {
  it('renders CapturedImage when correspondingPhoto.cropped_image_url exists', () => {
    const mockSutraItem = {
      sutraId: 1,
      sutraKanji: '仏',
      correspondingPhoto: {
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
      width: 48,
      height: 48,
    }

    render(<SutraItem {...mockSutraItem} />)

    expect(screen.getByTestId('kanji')).toContainElement(screen.getByAltText('capturedImage'))
  })

  it('renders sutraKanji text when no corresponding image or SVG exists', () => {
    const mockSutraItem = {
      sutraId: 1,
      sutraKanji: '仏',
      correspondingPhoto: null,
      width: 48,
      height: 48,
    }

    render(<SutraItem {...mockSutraItem} />)

    expect(screen.getByTestId('kanji')).toHaveTextContent('仏')
  })

  it('renders SVG image when sutraKanji "埵" exists in replaceMapping', () => {
    const mockSutraItem = {
      sutraId: 155,
      sutraKanji: '埵',
      correspondingPhoto: null,
      width: 48,
      height: 48,
    }

    render(<SutraItem {...mockSutraItem} />)

    expect(screen.getByTestId('kanji')).toContainElement(screen.getByAltText('埵'))
  })

  it('renders SVG image when sutraKanji "罣" exists in replaceMapping', () => {
    const mockSutraItem = {
      sutraId: 166,
      sutraKanji: '罣',
      correspondingPhoto: null,
      width: 48,
      height: 48,
    }

    render(<SutraItem {...mockSutraItem} />)

    expect(screen.getByTestId('kanji')).toContainElement(screen.getByAltText('罣'))
  })
})
