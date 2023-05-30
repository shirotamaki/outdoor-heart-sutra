import { useState, useEffect } from 'react'
import useCurrentLocation from '@/hooks/useCurrentLocation'
import useExifLocation from '@/hooks/useExifLocation'
import { LocationProps } from '@/types/location'

type FetchLocationProps = { file: File | null }

const useFetchLocation = ({ file }: FetchLocationProps): LocationProps => {
  const [location, setLocation] = useState<LocationProps>(null)

  const { exifLocation, fetchExifLocation } = useExifLocation()
  const { currentLocation, fetchCurrentLocation } = useCurrentLocation()

  useEffect(() => {
    if (file) {
      fetchExifLocation(file)
    } else {
      fetchCurrentLocation()
    }
  }, [file, fetchExifLocation, fetchCurrentLocation])

  useEffect(() => {
    const newLocation = exifLocation || currentLocation

    if (newLocation !== null) {
      setLocation({
        lat: newLocation.lat,
        lng: newLocation.lng,
      })
    } else {
      setLocation(null)
    }
  }, [exifLocation, currentLocation])

  return location
}

export default useFetchLocation
