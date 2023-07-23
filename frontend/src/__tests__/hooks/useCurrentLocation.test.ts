import { renderHook, act } from '@testing-library/react'
import useCurrentLocation from '@/hooks/useCurrentLocation'

describe('useCurrentLocation', () => {
  let mockGeolocation: jest.SpyInstance

  beforeAll(() => {
    const mockGeoLocation = {
      getCurrentPosition: jest.fn(),
    }
    global.navigator = Object.assign(navigator, {
      geolocation: mockGeoLocation,
    })
  })

  beforeEach(() => {
    mockGeolocation = jest
      .spyOn(navigator.geolocation, 'getCurrentPosition')
      .mockImplementation((success: (position: GeolocationPosition) => void) => {
        const position = {
          coords: {
            latitude: 35.69334,
            longitude: 139.7497,
          },
        } as GeolocationPosition
        success(position)
      })
  })

  afterEach(() => {
    mockGeolocation.mockRestore()
  })

  it('should return current location when geolocation is supported', async () => {
    const { result } = renderHook(() => useCurrentLocation())
    let location
    await act(async () => {
      location = await result.current.fetchCurrentLocation()
    })

    expect(location).toEqual({
      lat: 35.69334,
      lng: 139.7497,
    })
  })
})
