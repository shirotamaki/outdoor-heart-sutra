import { parse } from 'exifr'
import { useState } from 'react'

const useExifLocation = () => {
  const [exifLocation, setExifLocation] = useState<{ lat: number; lng: number } | null>(null)

  const fetchExifLocation = async (file: File) => {
    try {
      const exifData = await parse(file)
      console.log(exifData)
      if (exifData) {
        setExifLocation({ lat: exifData.latitude, lng: exifData.longitude })
      } else {
        setExifLocation(null)
      }
    } catch (error) {
      console.error('Exifデータから位置情報を取得できません:', error)
    }
  }

  return { exifLocation, fetchExifLocation }
}

export default useExifLocation
