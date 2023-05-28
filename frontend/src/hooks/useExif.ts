import { parse } from 'exifr'
import { useState } from 'react'

const useExif = () => {
  const [exifLocation, setExifLocation] = useState<{ lat: number; lng: number } | null>(null)

  const fetchExif = async (file: File) => {
    try {
      const output = await parse(file)
      console.log(output)
      if (output) {
        setExifLocation({ lat: output.latitude, lng: output.longitude })
      } else {
        setExifLocation(null)
      }
    } catch (error) {
      console.error('Exifデータが取得できません:', error)
    }
  }

  return { exifLocation, fetchExif }
}

export default useExif
