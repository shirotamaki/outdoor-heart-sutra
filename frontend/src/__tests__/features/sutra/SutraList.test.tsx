import { render, screen } from '@testing-library/react'
import SutraList from '@/features/sutra/SutraList'
import useWindowWidth from '@/hooks/useWindowWidth'

jest.mock('@/features/sutra/SutraSmLayout', () => {
  const MockedSutraSmLayout = () => <div>SutraSmLayout</div>
  MockedSutraSmLayout.displayName = 'SutraSmLayout'
  return MockedSutraSmLayout
})

jest.mock('@/features/sutra/SutraMdLayout', () => {
  const MockedSutraMdLayout = () => <div>SutraMdLayout</div>
  MockedSutraMdLayout.displayName = 'SutraMdLayout'
  return MockedSutraMdLayout
})

jest.mock('@/features/sutra/SutraXlLayout', () => {
  const MockedSutraXlLayout = () => <div>SutraXlLayout</div>
  MockedSutraXlLayout.displayName = 'SutraXlLayout'
  return MockedSutraXlLayout
})

jest.mock('@/features/sutra/SutraOverXlLayout', () => {
  const MockedSutraOverXlLayout = () => <div>SutraOverXlLayout</div>
  MockedSutraOverXlLayout.displayName = 'SutraOverXlLayout'
  return MockedSutraOverXlLayout
})

jest.mock('@/hooks/useWindowWidth', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('SutraList', () => {
  it('renders SutraSmLayout for small windows', () => {
    ;(useWindowWidth as jest.Mock).mockImplementation(() => 640)
    render(<SutraList sutras={[]} photos={[]} />)
    expect(screen.getByText('SutraSmLayout')).toBeInTheDocument()
  })

  it('renders SutraMdLayout for medium windows', () => {
    ;(useWindowWidth as jest.Mock).mockImplementation(() => 768)
    render(<SutraList sutras={[]} photos={[]} />)
    expect(screen.getByText('SutraMdLayout')).toBeInTheDocument()
  })

  it('renders SutraXlLayout for large windows', () => {
    ;(useWindowWidth as jest.Mock).mockImplementation(() => 1280)
    render(<SutraList sutras={[]} photos={[]} />)
    expect(screen.getByText('SutraXlLayout')).toBeInTheDocument()
  })

  it('renders SutraOverXlLayout for extra large windows', () => {
    ;(useWindowWidth as jest.Mock).mockImplementation(() => 1281)
    render(<SutraList sutras={[]} photos={[]} />)
    expect(screen.getByText('SutraOverXlLayout')).toBeInTheDocument()
  })
})
