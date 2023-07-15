import { render, screen } from '@testing-library/react'
import Map from '@/features/map/Map'
import { MarkerLocation } from '@/types/types'

jest.mock('@react-google-maps/api', () => ({
  GoogleMap: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid='google-map'>{children}</div>
  ),
  LoadScriptNext: ({ children }: { children?: React.ReactNode }) => children,
  MarkerF: () => <div>MarkerF</div>,
}))

jest.mock('@/config/index', () => ({
  mapsApiKey: 'dummy-api-key',
}))

describe('Map', () => {
  it('renders GoogleMap', () => {
    const markerLocation: MarkerLocation = {
      lat: 35.693556495897084,
      lng: 139.74965396281837,
      img: 'testUrl',
      link: 'testLink',
    }

    render(<Map markerLocation={markerLocation} />)

    const mapElement = screen.getByTestId('google-map')
    expect(mapElement).toBeInTheDocument()
  })
})
