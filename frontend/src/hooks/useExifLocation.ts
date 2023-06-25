import { parse } from 'exifr'
import { LocationProps } from '@/types/types'

const useExifLocation = () => {
  const fetchExifLocation = async (file: File): Promise<LocationProps | null> => {
    try {
      const exifData = await parse(file)

      if (exifData && 'latitude' in exifData && 'longitude' in exifData) {
        return { lat: exifData.latitude, lng: exifData.longitude }
      } else {
        console.log('latitude・longitude情報が存在しません')
        return null
      }
    } catch (error) {
      console.error('Exifデータから位置情報を取得できません:', error)
      return null
    }
  }
  return { fetchExifLocation }
}

export default useExifLocation
