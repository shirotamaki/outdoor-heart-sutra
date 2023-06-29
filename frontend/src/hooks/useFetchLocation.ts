import { parse } from 'exifr'
import { useState } from 'react'
import useCurrentLocation from '@/hooks/useCurrentLocation'
import useExifLocation from '@/hooks/useExifLocation'
import { LocationProps, FetchLocationProps } from '@/types/types'

const useFetchLocation = () => {
  const [location, setLocation] = useState<LocationProps>(null)
  const { fetchExifLocation } = useExifLocation()
  const { fetchCurrentLocation } = useCurrentLocation()

  const fetchLocation = async ({ file }: FetchLocationProps) => {
    let newLocation: LocationProps | null = null

    if (file) {
      try {
        const exifData = await parse(file)
        if (exifData && 'latitude' in exifData && 'longitude' in exifData) {
          newLocation = await fetchExifLocation(file)
        } else {
          console.log('fileにExifデータが含まれていません')
        }
      } catch (error) {
        console.error('fileを読み込めません: ', error)
      }
    }

    if (!newLocation) {
      newLocation = await fetchCurrentLocation()
    }

    setLocation(newLocation)
  }
  return { location, fetchLocation }
}

export default useFetchLocation
