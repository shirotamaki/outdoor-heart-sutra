import { parse } from 'exifr'
import { useState } from 'react'
import { LocationProps } from '@/types/location'

const useExifLocation = () => {
  const [exifLocation, setExifLocation] = useState<LocationProps | null>(null)

  const fetchExifLocation = async (file: File) => {
    try {
      const exifData = await parse(file)

      if (
        exifData &&
        'latitude' in exifData &&
        'longitude' in exifData
      ) {
        setExifLocation({ lat: exifData.latitude, lng: exifData.longitude })
      } else {
        setExifLocation(null)
        console.log('latitude・longitude情報が存在しません')
      }
    } catch (error) {
      console.error('Exifデータから位置情報を取得できません:', error)
    }
  }

  return { exifLocation, fetchExifLocation }
}

export default useExifLocation
