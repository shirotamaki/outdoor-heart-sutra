import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import AllMaps from '@/features/map/AllMaps'
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

jest.mock('next/router', () => ({
  useRouter: () => ({
    route: '/',
    pathname: '/',
    query: '',
    asPath: '/',
  }),
}))

describe('AllMaps', () => {
  it('renders GoogleMap', () => {
    const markerLocations: MarkerLocation[] = [
      {
        lat: 35.693556495897084,
        lng: 139.74965396281837,
        img: 'testUrl',
        link: 'testLink',
      },
    ]

    render(<AllMaps markerLocations={markerLocations} />)

    const mapElement = screen.getByTestId('google-map')
    expect(mapElement).toBeInTheDocument()
  })
})
