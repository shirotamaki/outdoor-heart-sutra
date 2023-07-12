import { renderHook, act, waitFor } from '@testing-library/react'
import { parse } from 'exifr'
import useCurrentLocation from '@/hooks/useCurrentLocation'
import useExifLocation from '@/hooks/useExifLocation'
import useFetchLocation from '@/hooks/useFetchLocation'

jest.mock('exifr')
jest.mock('@/hooks/useCurrentLocation')
jest.mock('@/hooks/useExifLocation')

const mockExifLocation = { lat: 35.69334, lng: 139.7497 }
const mockCurrentLocation = { lat: 26.217227757241556, lng: 127.71947257682015 }
const mockFile = new File([''], 'mock_filename.heic', { type: 'image/heic' })

describe('useFetchLocation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(parse as jest.Mock).mockResolvedValue({
      latitude: mockExifLocation.lat,
      longitude: mockExifLocation.lng,
    })
    ;(useExifLocation as jest.Mock).mockReturnValue({
      fetchExifLocation: jest.fn().mockResolvedValue(mockExifLocation),
    })
    ;(useCurrentLocation as jest.Mock).mockReturnValue({
      fetchCurrentLocation: jest.fn().mockResolvedValue(mockCurrentLocation),
    })
  })

  it('should return Exif location if Exif data is available', async () => {
    const { result } = renderHook(() => useFetchLocation())

    act(() => {
      result.current.fetchLocation({ file: mockFile })
    })

    await waitFor(() => expect(result.current.location).toEqual(mockExifLocation))
  })

  it('should return current location if Exif data is not available', async () => {
    ;(parse as jest.Mock).mockResolvedValueOnce(null)

    const { result } = renderHook(() => useFetchLocation())

    act(() => {
      result.current.fetchLocation({ file: mockFile })
    })

    await waitFor(() => expect(result.current.location).toEqual(mockCurrentLocation))
  })
})
