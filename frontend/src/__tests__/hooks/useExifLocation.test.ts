import { parse } from 'exifr'
import useExifLocation from '@/hooks/useExifLocation'
import { LocationProps } from '@/types/types'

jest.mock('exifr', () => ({
  parse: jest.fn(() => Promise.resolve({})),
}))

describe('useExifLocation', () => {
  let file: File
  let fetchExifLocation: (file: File) => Promise<LocationProps>

  beforeEach(() => {
    file = new File([''], 'filename.heic', { type: 'image/heic' })
    fetchExifLocation = useExifLocation().fetchExifLocation
  })

  it('should return location when exif data contains latitude and longitude', async () => {
    ;(parse as jest.Mock).mockResolvedValue({ latitude: 35.69334, longitude: 139.7497 })

    const result = await fetchExifLocation(file)

    expect(result).toEqual({ lat: 35.69334, lng: 139.7497 })
  })
})
