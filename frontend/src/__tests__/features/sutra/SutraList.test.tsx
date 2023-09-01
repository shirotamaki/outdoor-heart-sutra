import { render, screen } from '@testing-library/react'
import SutraList from '@/features/sutra/SutraList'
import useWindowWidth from '@/hooks/useWindowWidth'

jest.mock('@/features/sutra/SutraSmOrBelowLayout', () => {
  const MockedSutraSmOrBelowLayout = () => <div>SutraSmOrBelowLayout</div>
  MockedSutraSmOrBelowLayout.displayName = 'SutraSmOrBelowLayout'
  return MockedSutraSmOrBelowLayout
})

jest.mock('@/features/sutra/SutraSmToLgLayout', () => {
  const MockedSutraSmToLgLayout = () => <div>SutraSmToLgLayout</div>
  MockedSutraSmToLgLayout.displayName = 'SutraSmToLgLayout'
  return MockedSutraSmToLgLayout
})

jest.mock('@/features/sutra/SutraLgTo2XlLayout', () => {
  const MockedSutraLgTo2XlLayout = () => <div>SutraLgTo2XlLayout</div>
  MockedSutraLgTo2XlLayout.displayName = 'SutraLgTo2XlLayout'
  return MockedSutraLgTo2XlLayout
})

jest.mock('@/features/sutra/SutraOver2XlLayout', () => {
  const MockedSutraOver2XlLayout = () => <div>SutraOver2XlLayout</div>
  MockedSutraOver2XlLayout.displayName = 'SutraOver2XlLayout'
  return MockedSutraOver2XlLayout
})

jest.mock('@/hooks/useWindowWidth', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('SutraList', () => {
  it('renders SutraSmOrBelowLayout for sm or below windows', () => {
    ;(useWindowWidth as jest.Mock).mockImplementation(() => 640)
    render(<SutraList sutras={[]} photos={[]} />)
    expect(screen.getByText('SutraSmOrBelowLayout')).toBeInTheDocument()
  })

  it('renders SutraSmToLgLayout for sm to lg windows', () => {
    ;(useWindowWidth as jest.Mock).mockImplementation(() => 1024)
    render(<SutraList sutras={[]} photos={[]} />)
    expect(screen.getByText('SutraSmToLgLayout')).toBeInTheDocument()
  })

  it('renders SutraLgTo2XlLayout for lg to 2xl windows', () => {
    ;(useWindowWidth as jest.Mock).mockImplementation(() => 1536)
    render(<SutraList sutras={[]} photos={[]} />)
    expect(screen.getByText('SutraLgTo2XlLayout')).toBeInTheDocument()
  })

  it('renders SutraOver2XlLayout for over 2xl windows', () => {
    ;(useWindowWidth as jest.Mock).mockImplementation(() => 1537)
    render(<SutraList sutras={[]} photos={[]} />)
    expect(screen.getByText('SutraOver2XlLayout')).toBeInTheDocument()
  })
})
