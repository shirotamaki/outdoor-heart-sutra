import { render, screen } from '@testing-library/react'
import SutraKanji from '@/features/sutra/SutraKanji'

describe('SutraKanji', () => {
  it('renders SVG image when sutraKanji "埵" exists in replaceMapping', () => {
    const mockSutraKanji = {
      sutraKanji: '埵',
      width: 48,
      height: 48,
    }

    render(<SutraKanji {...mockSutraKanji} />)

    const imageElement = screen.getByAltText('埵')
    expect(imageElement).toBeInTheDocument()
  })

  it('renders SVG image when sutraKanji "罣" exists in replaceMapping', () => {
    const mockSutraKanji = {
      sutraKanji: '罣',
      width: 48,
      height: 48,
    }

    render(<SutraKanji {...mockSutraKanji} />)

    const imageElement = screen.getByAltText('罣')
    expect(imageElement).toBeInTheDocument()
  })

  it('renders sutraKanji text when no sutraKanji exists in replaceMapping', () => {
    const mockSutraKanji = {
      sutraKanji: '仏',
      width: 48,
      height: 48,
    }

    render(<SutraKanji {...mockSutraKanji} />)

    const kanjiElement = screen.getByText('仏')
    expect(kanjiElement).toBeInTheDocument()
  })
})
